# A tool for demux ts/mp4/flv by typescript.

> This tool can be used on platforms such as HTML5 players or Node.js

[![npm version](https://badge.fury.io/js/demuxer.svg)](https://www.npmjs.com/package/demuxer)
[![Downloads](https://img.shields.io/npm/dm/demuxer.svg)](https://www.npmjs.com/package/demuxer)
[![Build Status](https://travis-ci.org/goldvideo/demuxer.svg?branch=master)](https://travis-ci.org/github/goldvideo/demuxer)

## Data flow diagram

![](./doc/design/dataflow.gv.png)

## Feature

-   Support push streaming-data to demux
-   Tree-shakable (The version coded with full code does not need to worry about the reference size. When the business only refers to a certain format of decoding, the overall code supports tree-shaking)

-   Any-combination packaging (These formats can be packaged according to requirements, users do not need to package all the code)

## Demos

-   [Demux MP4](./doc/examples/demux-mp4.html)
-   [Demux TS](./doc/examples/demux-ts.html)
-   [Demux FLV](./doc/examples/demux-flv.html)

## How to start?

1. install

    ```shell
    npm i demuxer
    ```

2. Setup

    ```js
    import { TSDemux, FLVDemux, MP4Demux, Events } from 'demuxer';

    const demux = new TSDemux();
    // const demux = new FLVDemux();
    // const demux = new MP4Demux();

    // The data is spit out in a streaming manner,
    // and the first data is emitted as soon as possible.
    demux.on(Events.DEMUX_DATA, (e) => {
        console.log(e);

        // if (e.stream_type === 15) {
        //     console.log(e)
        // }
    });

    demux.on(Events.DONE, (e) => {
        // consumed & flushed all piped buffer.
    });

    // buffer -> video bytes ArrayBuffer
    demux.push(buffer, {
        // Support push part of the data for parsing
        // When done is set to true, if the data is decoded and there is no remaining data, the data is considered to have been pushed and Events.DONE will be emitted.
        // When done is set to false, Events.DONE will not be emit, waiting for subsequent data push
        done: true
    });
    ```

3. Debug

    ```$js
    var demuxer = new TSDemux({
        debug: true
    });
    ```

4. Demuxer Options

    ```$js
    let options = {
        // Setting options.debug = true; will turn on debug logs on JS console.
        debug: true
    };

    var demuxer = new TSDemux(options);
    // var demuxer = new MP4Demux(options);
    // var demuxer = new FLVDemux(options);
    ```

## About decoding MP4 raw data (h264/hevc/aac)

Developer should parse the data of the mp4 header, and then locate the pos of the data information in the mdat according to the information described in the mp4 header.

## About how to integrate Demuxer with Worker

Because the third party is likely to be internally built by the worker tool, in order not to conflict and redundancy with the worker tool, the worker is implemented by the user.

## Lang

[中文文档](./README_ZH.md)

## LICENSE

[MIT](LICENSE)
