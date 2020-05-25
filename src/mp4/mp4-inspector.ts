/**
 * @file: mp4-inspector.js, created at Monday, 23rd December 2019 3:47:23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */

/* eslint-disable */
let /**
     * Returns the string representation of an ASCII encoded four byte buffer.
     * @param buffer - a four-byte buffer to translate
     * @return the corresponding string
     */
    parseType = function (buffer: Uint8Array): string {
        let result = '';
        result += String.fromCharCode(buffer[0]);
        result += String.fromCharCode(buffer[1]);
        result += String.fromCharCode(buffer[2]);
        result += String.fromCharCode(buffer[3]);
        return result;
    },
    parseMp4Date = function (seconds: number): Date {
        return new Date(seconds * 1000 - 2082844800000);
    },
    parseSampleFlags = function (flags: Uint8Array) {
        return {
            isLeading: (flags[0] & 0x0c) >>> 2,
            dependsOn: flags[0] & 0x03,
            isDependedOn: (flags[1] & 0xc0) >>> 6,
            hasRedundancy: (flags[1] & 0x30) >>> 4,
            paddingValue: (flags[1] & 0x0e) >>> 1,
            isNonSyncSample: flags[1] & 0x01,
            degradationPriority: (flags[2] << 8) | flags[3]
        };
    },
    nalParse = function (avcStream) {
        let avcView = new DataView(avcStream.buffer, avcStream.byteOffset, avcStream.byteLength),
            result = [],
            i,
            length;
        for (i = 0; i < avcStream.length; i += length) {
            length = avcView.getUint32(i);
            i += 4;
            switch (avcStream[i] & 0x1f) {
                case 0x01:
                    result.push('NDR');
                    break;
                case 0x05:
                    result.push('IDR');
                    break;
                case 0x06:
                    result.push('SEI');
                    break;
                case 0x07:
                    result.push('SPS');
                    break;
                case 0x08:
                    result.push('PPS');
                    break;
                case 0x09:
                    result.push('AUD');
                    break;
                default:
                    result.push(avcStream[i] & 0x1f);
                    break;
            }
        }
        return result;
    },
    // registry of handlers for individual mp4 box types
    parse = {
        // codingname, not a first-class box type. stsd entries share the
        // same format as real boxes so the parsing infrastructure can be
        // shared
        avc1: function (data) {
            let view = new DataView(data.buffer, data.byteOffset, data.byteLength);
            return {
                dataReferenceIndex: view.getUint16(6),
                width: view.getUint16(24),
                height: view.getUint16(26),
                horizresolution: view.getUint16(28) + view.getUint16(30) / 16,
                vertresolution: view.getUint16(32) + view.getUint16(34) / 16,
                frameCount: view.getUint16(40),
                depth: view.getUint16(74),
                config: mp4toJSON(data.subarray(78, data.byteLength))
            };
        },
        avcC: function (data) {
            let view = new DataView(data.buffer, data.byteOffset, data.byteLength),
                result = {
                    configurationVersion: data[0],
                    avcProfileIndication: data[1],
                    profileCompatibility: data[2],
                    avcLevelIndication: data[3],
                    lengthSizeMinusOne: data[4] & 0x03,
                    sps: [],
                    pps: []
                },
                numOfSequenceParameterSets = data[5] & 0x1f,
                numOfPictureParameterSets,
                nalSize,
                offset,
                i;

            // iterate past any SPSs
            offset = 6;
            for (i = 0; i < numOfSequenceParameterSets; i++) {
                nalSize = view.getUint16(offset);
                offset += 2;
                result.sps.push(new Uint8Array(data.subarray(offset, offset + nalSize)));
                offset += nalSize;
            }
            // iterate past any PPSs
            numOfPictureParameterSets = data[offset];
            offset++;
            for (i = 0; i < numOfPictureParameterSets; i++) {
                nalSize = view.getUint16(offset);
                offset += 2;
                result.pps.push(new Uint8Array(data.subarray(offset, offset + nalSize)));
                offset += nalSize;
            }
            return result;
        },
        btrt: function (data) {
            let view = new DataView(data.buffer, data.byteOffset, data.byteLength);
            return {
                bufferSizeDB: view.getUint32(0),
                maxBitrate: view.getUint32(4),
                avgBitrate: view.getUint32(8)
            };
        },
        esds: function (data) {
            let view = new DataView(data.buffer, data.byteOffset, data.byteLength);
            return {
                version: data[0],
                flags: new Uint8Array(data.subarray(1, 4)),
                esId: (data[6] << 8) | data[7],
                streamPriority: data[8] & 0x1f,
                decoderConfig: {
                    objectProfileIndication: data[11],
                    streamType: (data[12] >>> 2) & 0x3f,
                    bufferSize: (data[13] << 16) | (data[14] << 8) | data[15],
                    maxBitrate: (data[16] << 24) | (data[17] << 16) | (data[18] << 8) | data[19],
                    avgBitrate: (data[20] << 24) | (data[21] << 16) | (data[22] << 8) | data[23],
                    decoderConfigDescriptor: {
                        tag: data[24],
                        length: data[25],
                        // audioObjectType: (data[26] >>> 3) & 0x1f,
                        // samplingFrequencyIndex: ((data[26] & 0x07) << 1) |
                        //   ((data[27] >>> 7) & 0x01),
                        // channelConfiguration: (data[27] >>> 3) & 0x0f,
                        // FIXME
                        audioObjectType: (data[35] >>> 3) & 0x1f,
                        samplingFrequencyIndex: ((data[35] & 0x07) << (8 + (data[36] & 0x80))) >> 7,
                        channelConfiguration: (data[36] & 0x78) >> 3
                    }
                }
            };
        },
        ftyp: function (data) {
            let view = new DataView(data.buffer, data.byteOffset, data.byteLength),
                result = {
                    majorBrand: parseType(data.subarray(0, 4)),
                    minorVersion: view.getUint32(4),
                    compatibleBrands: []
                },
                i = 8;
            while (i < data.byteLength) {
                result.compatibleBrands.push(parseType(data.subarray(i, i + 4)));
                i += 4;
            }
            return result;
        },
        dinf: function (data) {
            return {
                boxes: mp4toJSON(data)
            };
        },
        dref: function (data) {
            return {
                version: data[0],
                flags: new Uint8Array(data.subarray(1, 4)),
                dataReferences: mp4toJSON(data.subarray(8))
            };
        },
        hdlr: function (data) {
            let view = new DataView(data.buffer, data.byteOffset, data.byteLength),
                result = {
                    version: view.getUint8(0),
                    flags: new Uint8Array(data.subarray(1, 4)),
                    handlerType: parseType(data.subarray(8, 12)),
                    name: ''
                },
                i = 8;

            // parse out the name field
            for (i = 24; i < data.byteLength; i++) {
                if (data[i] === 0x00) {
                    // the name field is null-terminated
                    i++;
                    break;
                }
                result.name += String.fromCharCode(data[i]);
            }
            // decode UTF-8 to javascript's internal representation
            // see http://ecmanaut.blogspot.com/2006/07/encoding-decoding-utf8-in-javascript.html
            result.name = decodeURIComponent(decodeURIComponent(result.name));

            return result;
        },
        // mdat: function(data) {
        // 	return {
        // 		byteLength: data.byteLength,
        // 		nals: nalParse(data),
        // 		realData: data
        // 	};
        // },
        mdhd: function (data) {
            let view = new DataView(data.buffer, data.byteOffset, data.byteLength),
                i = 4,
                language,
                result = {
                    version: view.getUint8(0),
                    flags: new Uint8Array(data.subarray(1, 4)),
                    language: '',
                    creationTime: new Date(),
                    modificationTime: new Date(),
                    timescale: 0,
                    duration: 0
                };
            if (result.version === 1) {
                i += 4;
                result.creationTime = parseMp4Date(view.getUint32(i)); // truncating top 4 bytes
                i += 8;
                result.modificationTime = parseMp4Date(view.getUint32(i)); // truncating top 4 bytes
                i += 4;
                result.timescale = view.getUint32(i);
                i += 8;
                result.duration = view.getUint32(i); // truncating top 4 bytes
            } else {
                result.creationTime = parseMp4Date(view.getUint32(i));
                i += 4;
                result.modificationTime = parseMp4Date(view.getUint32(i));
                i += 4;
                result.timescale = view.getUint32(i);
                i += 4;
                result.duration = view.getUint32(i);
            }
            i += 4;
            // language is stored as an ISO-639-2/T code in an array of three 5-bit fields
            // each field is the packed difference between its ASCII value and 0x60
            language = view.getUint16(i);
            result.language += String.fromCharCode((language >> 10) + 0x60);
            result.language += String.fromCharCode(((language & 0x03c0) >> 5) + 0x60);
            result.language += String.fromCharCode((language & 0x1f) + 0x60);

            return result;
        },
        mdia: function (data) {
            return {
                boxes: mp4toJSON(data)
            };
        },
        mfhd: function (data) {
            return {
                version: data[0],
                flags: new Uint8Array(data.subarray(1, 4)),
                sequenceNumber: (data[4] << 24) | (data[5] << 16) | (data[6] << 8) | data[7]
            };
        },
        minf: function (data) {
            return {
                boxes: mp4toJSON(data)
            };
        },
        // codingname, not a first-class box type. stsd entries share the
        // same format as real boxes so the parsing infrastructure can be
        // shared
        mp4a: function (data) {
            let view = new DataView(data.buffer, data.byteOffset, data.byteLength),
                result = {
                    // 6 bytes reserved
                    dataReferenceIndex: view.getUint16(6),
                    // 4 + 4 bytes reserved
                    channelcount: view.getUint16(16),
                    samplesize: view.getUint16(18),
                    // 2 bytes pre_defined
                    // 2 bytes reserved
                    samplerate: view.getUint16(24) + view.getUint16(26) / 65536,
                    streamDescriptor: undefined
                };

            // if there are more bytes to process, assume this is an ISO/IEC
            // 14496-14 MP4AudioSampleEntry and parse the ESDBox
            if (data.byteLength > 28) {
                result.streamDescriptor = mp4toJSON(data.subarray(28))[0];
            }
            return result;
        },
        moof: function (data) {
            return {
                boxes: mp4toJSON(data)
            };
        },
        moov: function (data) {
            return {
                boxes: mp4toJSON(data)
            };
        },
        mvex: function (data) {
            return {
                boxes: mp4toJSON(data)
            };
        },
        mvhd: function (data) {
            let view = new DataView(data.buffer, data.byteOffset, data.byteLength),
                i = 4,
                result = {
                    version: view.getUint8(0),
                    flags: new Uint8Array(data.subarray(1, 4)),
                    creationTime: new Date(),
                    modificationTime: new Date(),
                    timescale: 0,
                    duration: 0,
                    rate: 0,
                    volume: 0,
                    matrix: new Uint32Array(0),
                    nextTrackId: 0
                };

            if (result.version === 1) {
                i += 4;
                result.creationTime = parseMp4Date(view.getUint32(i)); // truncating top 4 bytes
                i += 8;
                result.modificationTime = parseMp4Date(view.getUint32(i)); // truncating top 4 bytes
                i += 4;
                result.timescale = view.getUint32(i);
                i += 8;
                result.duration = view.getUint32(i); // truncating top 4 bytes
            } else {
                result.creationTime = parseMp4Date(view.getUint32(i));
                i += 4;
                result.modificationTime = parseMp4Date(view.getUint32(i));
                i += 4;
                result.timescale = view.getUint32(i);
                i += 4;
                result.duration = view.getUint32(i);
            }
            i += 4;

            // convert fixed-point, base 16 back to a number
            result.rate = view.getUint16(i) + view.getUint16(i + 2) / 16;
            i += 4;
            result.volume = view.getUint8(i) + view.getUint8(i + 1) / 8;
            i += 2;
            i += 2;
            i += 2 * 4;
            result.matrix = new Uint32Array(data.subarray(i, i + 9 * 4));
            i += 9 * 4;
            i += 6 * 4;
            result.nextTrackId = view.getUint32(i);
            return result;
        },
        pdin: function (data) {
            let view = new DataView(data.buffer, data.byteOffset, data.byteLength);
            return {
                version: view.getUint8(0),
                flags: new Uint8Array(data.subarray(1, 4)),
                rate: view.getUint32(4),
                initialDelay: view.getUint32(8)
            };
        },
        sdtp: function (data) {
            let result = {
                    version: data[0],
                    flags: new Uint8Array(data.subarray(1, 4)),
                    samples: []
                },
                i;

            for (i = 4; i < data.byteLength; i++) {
                result.samples.push({
                    dependsOn: (data[i] & 0x30) >> 4,
                    isDependedOn: (data[i] & 0x0c) >> 2,
                    hasRedundancy: data[i] & 0x03
                });
            }
            return result;
        },
        sidx: function (data) {
            let view = new DataView(data.buffer, data.byteOffset, data.byteLength),
                result = {
                    version: data[0],
                    flags: new Uint8Array(data.subarray(1, 4)),
                    references: [],
                    referenceId: view.getUint32(4),
                    timescale: view.getUint32(8),
                    earliestPresentationTime: view.getUint32(12),
                    firstOffset: view.getUint32(16)
                },
                referenceCount = view.getUint16(22),
                i;

            for (i = 24; referenceCount; i += 12, referenceCount--) {
                result.references.push({
                    referenceType: (data[i] & 0x80) >>> 7,
                    referencedSize: view.getUint32(i) & 0x7fffffff,
                    subsegmentDuration: view.getUint32(i + 4),
                    startsWithSap: !!(data[i + 8] & 0x80),
                    sapType: (data[i + 8] & 0x70) >>> 4,
                    sapDeltaTime: view.getUint32(i + 8) & 0x0fffffff
                });
            }

            return result;
        },
        stbl: function (data) {
            return {
                boxes: mp4toJSON(data)
            };
        },
        stco: function (data) {
            let view = new DataView(data.buffer, data.byteOffset, data.byteLength);
            let entryCount = view.getUint32(4);
            let result = {
                version: data[0],
                flags: new Uint8Array(data.subarray(1, 4)),
                entryCount: entryCount,
                chunkOffsets: []
            };
            for (let i = 8; entryCount; i += 4, entryCount--) {
                result.chunkOffsets.push(view.getUint32(i));
            }
            return result;
        },
        stsc: function (data) {
            let view = new DataView(data.buffer, data.byteOffset, data.byteLength),
                entryCount = view.getUint32(4),
                result = {
                    version: data[0],
                    flags: new Uint8Array(data.subarray(1, 4)),
                    sampleToChunks: []
                },
                i;
            for (i = 8; entryCount; i += 12, entryCount--) {
                result.sampleToChunks.push({
                    firstChunk: view.getUint32(i),
                    samplesPerChunk: view.getUint32(i + 4),
                    sampleDescriptionIndex: view.getUint32(i + 8)
                });
            }
            return result;
        },
        stsd: function (data) {
            return {
                version: data[0],
                flags: new Uint8Array(data.subarray(1, 4)),
                boxes: mp4toJSON(data.subarray(8))
            };
        },
        stsz: function (data) {
            let view = new DataView(data.buffer, data.byteOffset, data.byteLength),
                result = {
                    version: data[0],
                    flags: new Uint8Array(data.subarray(1, 4)),
                    sampleSize: view.getUint32(4),
                    entries: []
                },
                i;
            for (i = 12; i < data.byteLength; i += 4) {
                result.entries.push(view.getUint32(i));
            }
            return result;
        },
        stts: function (data) {
            let view = new DataView(data.buffer, data.byteOffset, data.byteLength),
                result = {
                    version: data[0],
                    flags: new Uint8Array(data.subarray(1, 4)),
                    timeToSamples: []
                },
                entryCount = view.getUint32(4),
                i;

            for (i = 8; entryCount; i += 8, entryCount--) {
                result.timeToSamples.push({
                    sampleCount: view.getUint32(i),
                    sampleDelta: view.getUint32(i + 4)
                });
            }
            return result;
        },
        styp: function (data) {
            return parse.ftyp(data);
        },
        tfdt: function (data) {
            return {
                version: data[0],
                flags: new Uint8Array(data.subarray(1, 4)),
                baseMediaDecodeTime: (data[4] << 24) | (data[5] << 16) | (data[6] << 8) | data[7]
            };
        },
        tfhd: function (data) {
            let view = new DataView(data.buffer, data.byteOffset, data.byteLength),
                result: {
                    version: number;
                    flags: Uint8Array;
                    trackId: number;
                    baseDataOffset?: number;
                    sampleDescriptionIndex?: number;
                    defaultSampleDuration?: number;
                    defaultSampleSize?: number;
                    defaultSampleFlags?: number;
                } = {
                    version: data[0],
                    flags: new Uint8Array(data.subarray(1, 4)),
                    trackId: view.getUint32(4)
                },
                baseDataOffsetPresent = result.flags[2] & 0x01,
                sampleDescriptionIndexPresent = result.flags[2] & 0x02,
                defaultSampleDurationPresent = result.flags[2] & 0x08,
                defaultSampleSizePresent = result.flags[2] & 0x10,
                defaultSampleFlagsPresent = result.flags[2] & 0x20,
                i;

            i = 8;
            if (baseDataOffsetPresent) {
                i += 4; // truncate top 4 bytes
                result.baseDataOffset = view.getUint32(12);
                i += 4;
            }
            if (sampleDescriptionIndexPresent) {
                result.sampleDescriptionIndex = view.getUint32(i);
                i += 4;
            }
            if (defaultSampleDurationPresent) {
                result.defaultSampleDuration = view.getUint32(i);
                i += 4;
            }
            if (defaultSampleSizePresent) {
                result.defaultSampleSize = view.getUint32(i);
                i += 4;
            }
            if (defaultSampleFlagsPresent) {
                result.defaultSampleFlags = view.getUint32(i);
            }
            return result;
        },
        tkhd: function (data) {
            let view = new DataView(data.buffer, data.byteOffset, data.byteLength),
                i = 4,
                result = {
                    version: view.getUint8(0),
                    flags: new Uint8Array(data.subarray(1, 4)),
                    creationTime: new Date(),
                    modificationTime: new Date(),
                    trackId: 0,
                    duration: 0,
                    layer: 0,
                    alternateGroup: 0,
                    volume: 0,
                    width: 0,
                    height: 0,
                    matrix: new Uint32Array(0)
                };
            if (result.version === 1) {
                i += 4;
                result.creationTime = parseMp4Date(view.getUint32(i)); // truncating top 4 bytes
                i += 8;
                result.modificationTime = parseMp4Date(view.getUint32(i)); // truncating top 4 bytes
                i += 4;
                result.trackId = view.getUint32(i);
                i += 4;
                i += 8;
                result.duration = view.getUint32(i); // truncating top 4 bytes
            } else {
                result.creationTime = parseMp4Date(view.getUint32(i));
                i += 4;
                result.modificationTime = parseMp4Date(view.getUint32(i));
                i += 4;
                result.trackId = view.getUint32(i);
                i += 4;
                i += 4;
                result.duration = view.getUint32(i);
            }
            i += 4;
            i += 2 * 4;
            result.layer = view.getUint16(i);
            i += 2;
            result.alternateGroup = view.getUint16(i);
            i += 2;
            // convert fixed-point, base 16 back to a number
            result.volume = view.getUint8(i) + view.getUint8(i + 1) / 8;
            i += 2;
            i += 2;
            result.matrix = new Uint32Array(data.subarray(i, i + 9 * 4));
            i += 9 * 4;
            result.width = view.getUint16(i) + view.getUint16(i + 2) / 16;
            i += 4;
            result.height = view.getUint16(i) + view.getUint16(i + 2) / 16;
            return result;
        },
        traf: function (data) {
            return {
                boxes: mp4toJSON(data)
            };
        },
        trak: function (data) {
            return {
                boxes: mp4toJSON(data)
            };
        },
        trex: function (data) {
            let view = new DataView(data.buffer, data.byteOffset, data.byteLength);
            return {
                version: data[0],
                flags: new Uint8Array(data.subarray(1, 4)),
                trackId: view.getUint32(4),
                defaultSampleDescriptionIndex: view.getUint32(8),
                defaultSampleDuration: view.getUint32(12),
                defaultSampleSize: view.getUint32(16),
                sampleDependsOn: data[20] & 0x03,
                sampleIsDependedOn: (data[21] & 0xc0) >> 6,
                sampleHasRedundancy: (data[21] & 0x30) >> 4,
                samplePaddingValue: (data[21] & 0x0e) >> 1,
                sampleIsDifferenceSample: !!(data[21] & 0x01),
                sampleDegradationPriority: view.getUint16(22)
            };
        },
        trun: function (data) {
            let result: {
                    version: number;
                    flags: Uint8Array;
                    samples: Array<any>;
                    dataOffset?: number;
                } = {
                    version: data[0],
                    flags: new Uint8Array(data.subarray(1, 4)),
                    samples: []
                },
                view = new DataView(data.buffer, data.byteOffset, data.byteLength),
                dataOffsetPresent = result.flags[2] & 0x01,
                firstSampleFlagsPresent = result.flags[2] & 0x04,
                sampleDurationPresent = result.flags[1] & 0x01,
                sampleSizePresent = result.flags[1] & 0x02,
                sampleFlagsPresent = result.flags[1] & 0x04,
                sampleCompositionTimeOffsetPresent = result.flags[1] & 0x08,
                sampleCount = view.getUint32(4),
                offset = 8,
                sample;

            if (dataOffsetPresent) {
                result.dataOffset = view.getUint32(offset);
                offset += 4;
            }
            if (firstSampleFlagsPresent && sampleCount) {
                sample = {
                    flags: parseSampleFlags(data.subarray(offset, offset + 4))
                };
                offset += 4;
                if (sampleDurationPresent) {
                    sample.duration = view.getUint32(offset);
                    offset += 4;
                }
                if (sampleSizePresent) {
                    sample.size = view.getUint32(offset);
                    offset += 4;
                }
                if (sampleCompositionTimeOffsetPresent) {
                    sample.compositionTimeOffset = view.getUint32(offset);
                    offset += 4;
                }
                result.samples.push(sample);
                sampleCount--;
            }
            while (sampleCount--) {
                sample = {};
                if (sampleDurationPresent) {
                    sample.duration = view.getUint32(offset);
                    offset += 4;
                }
                if (sampleSizePresent) {
                    sample.size = view.getUint32(offset);
                    offset += 4;
                }
                if (sampleFlagsPresent) {
                    sample.flags = parseSampleFlags(data.subarray(offset, offset + 4));
                    offset += 4;
                }
                if (sampleCompositionTimeOffsetPresent) {
                    sample.compositionTimeOffset = view.getUint32(offset);
                    offset += 4;
                }
                result.samples.push(sample);
            }
            return result;
        },
        'url ': function (data) {
            return {
                version: data[0],
                flags: new Uint8Array(data.subarray(1, 4))
            };
        },
        vmhd: function (data) {
            //let view = new DataView(data.buffer, data.byteOffset, data.byteLength);
            return {
                version: data[0],
                flags: new Uint8Array(data.subarray(1, 4))
                //graphicsmode: view.getUint16(4),
                //opcolor: new Uint16Array([view.getUint16(6),
                //                          view.getUint16(8),
                //                          view.getUint16(10)])
            };
        }
    };

/**
 * Return a javascript array of box objects parsed from an ISO base media file.
 * @param data - the binary data of the media to be inspected
 * @return a javascript array of potentially nested box objects
 */
let mp4toJSON = function (data: Uint8Array): Array<any> {
    let i = 0,
        result = [],
        view = new DataView(data.buffer, data.byteOffset, data.byteLength),
        size,
        type,
        end,
        box;

    while (i < data.byteLength) {
        // parse box data
        (size = view.getUint32(i)), (type = parseType(data.subarray(i + 4, i + 8)));
        end = size > 1 ? i + size : data.byteLength;

        // parse type-specific data
        box = (
            parse[type] ||
            function (data) {
                return {
                    data: data
                };
            }
        )(data.subarray(i + 8, end));
        box.size = size;
        box.type = type;

        // store this box and move to the next
        result.push(box);
        i = end;
    }
    return result;
};

export const MP4Inspect = {
    mp4toJSON: mp4toJSON
};
