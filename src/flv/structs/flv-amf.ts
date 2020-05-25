/**
 * @file: created at Sunday, 24th May 2020 2:21:46 am
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */

import DataViewReader from '../../util/dv';
import logger from '../../util/logger';

export function AMFdeSerialize(data: Uint8Array) {
    let result = {};
    let item = parseData_(data);
    result[item.key] = item.value;
    return result;
}

function parseData_(source: Uint8Array, isString = false) {
    let key = null,
        value = null,
        data = null;

    if (isString) {
        try {
            data = new Uint8Array(source.length + 1);
        } catch (e) {
            logger.error(`flv parseData failed: ${e.message}`);
        }
        data[0] = 2;
        data.set(source, 1, source.length);
    } else {
        data = source;
    }
    key = deSerialize_(data);
    if (isString) {
        key.valueLength -= 1;
    }
    let temp = source.subarray(key.valueLength, source.byteLength);
    value = deSerialize_(temp);

    return {
        key: key.value,
        value: value.value,
        valueLength: key.valueLength + value.valueLength
    };
}

type SerializeResult = Partial<{
    value: any;
    valueLength: number;
}>;

function deSerialize_(data: Uint8Array) {
    let result: SerializeResult = {};
    let valueLength = 0;
    let a = new DataViewReader();

    switch (data[0]) {
        case 0:
            valueLength = 8;
            result.value = uint8ToDouble_(data.subarray(1, 9));
            result.valueLength = 1 + valueLength;
            break;
        case 1:
            valueLength = 1;
            result.value = data[1] !== 0;
            result.valueLength = 1 + valueLength;
            break;
        case 2:
            valueLength = (data[1] << 8) | data[2];
            result.value = uint8ToStr_(data.subarray(3, 3 + valueLength));
            result.valueLength = 1 + 2 + valueLength;
            break;
        case 3:
            valueLength = 1;
            result.value = {};
            while (data[valueLength] != 0x00 || data[valueLength + 1] != 0x00 || data[valueLength + 2] != 0x09) {
                let objData = data.subarray(valueLength, data.byteLength);
                let item = parseData_(objData, true);
                result.value[item.key] = item.value;
                valueLength += item.valueLength;
                objData = null;
            }
            valueLength += 3;
            result.valueLength = valueLength;
            break;
        case 4:
            valueLength = (data[1] << 8) | data[2];
            result.value = uint8ToStr_(data.subarray(3, 3 + valueLength));
            result.valueLength = 1 + 2 + valueLength;
            break;
        case 5:
            result.value = null;
            valueLength = 1;
            result.valueLength = valueLength;
            break;
        case 6:
            result.value = undefined;
            valueLength = 1;
            result.valueLength = valueLength;
            break;
        case 7:
            result.value = a.readUint16(data, 1);
            valueLength = 2 + 1;
            result.valueLength = valueLength;
            break;
        case 8:
            {
                let arrLength = (data[1] << 24) | (data[2] << 16) | (data[3] << 8) | data[4];
                valueLength = 1 + 4;
                result.value = {};
                for (let count = 0; count < arrLength; count++) {
                    let itemData = data.subarray(valueLength, data.byteLength);
                    let item2 = parseData_(itemData, true);
                    result.value[item2.key] = item2.value;
                    valueLength += item2.valueLength;
                }
                valueLength += 3;
                result.valueLength = valueLength;
            }
            break;
        case 9:
            break;
        case 10:
            {
                let arr = [];
                let arrLength2 = a.readUint32(data, 1);
                for (let i = 0; i < arrLength2; i++) {
                    let objData2 = data.subarray(i * 9 + 4 + 1, data.byteLength);
                    arr.push(deSerialize_(objData2).value);
                }
                result.value = arr;
                valueLength = arr.length * 9 + 4 + 1;
                result.valueLength = valueLength;
            }
            break;
        case 11:
            result.value = uint8ToDouble_(data.subarray(0, 8));
            valueLength = 8 + 1 + 2;
            result.valueLength = valueLength;
            break;
        case 12:
            valueLength = (data[1] << 24) | (data[2] << 16) | (data[3] << 8) | data[4];
            result.value = uint8ToStr_(data.subarray(5, 5 + valueLength));
            result.valueLength = 1 + 4 + valueLength;
            break;
        default:
            return null;
    }
    a = null;
    return result;
}

function uint8ToStr_(data: Uint8Array) {
    return String.fromCharCode.apply(null, data);
}

function uint8ToDouble_(data: Uint8Array) {
    let temp = new Uint8Array(data);
    let dv = new DataView(temp.buffer);
    let str = dv.getFloat64(0);
    dv = null;
    temp = null;
    return str;
}
