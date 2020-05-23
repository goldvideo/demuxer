/**
 * @file: created at Wednesday, 13th May 2020 4:15:40 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */

export const HEAD_LEN = 9;
export const MIN_BODY_LEN = 4;
export const PREVIOUS_TAG_SIZE = 4;
export const MIN_TAG_LEN = PREVIOUS_TAG_SIZE;

export enum FLVParseStage {
	HEAD = 0,
	BODY
}
