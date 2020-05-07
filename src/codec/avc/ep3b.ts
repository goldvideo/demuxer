/**
 * @file: ep3b.js, created at Monday, 23rd December 2019 3:47:23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */

/**
 * discard the emulation_prevention_three_byte
 * @param data
 */
export default function discardEP3B(data: Uint8Array): Uint8Array {
	let length = data.byteLength,
		emulationPreventionBytesPositions = [],
		i = 1,
		newLength: number,
		newData = new Uint8Array(0);

	// Find all `Emulation Prevention Bytes`
	while (i < length - 2) {
		if (data[i] === 0 && data[i + 1] === 0 && data[i + 2] === 0x03) {
			emulationPreventionBytesPositions.push(i + 2);
			i += 2;
		} else {
			i++;
		}
	}

	// If no Emulation Prevention Bytes were found just return the original
	// array
	if (emulationPreventionBytesPositions.length === 0) {
		return data;
	}

	// Create a new array to hold the NAL unit data
	newLength = length - emulationPreventionBytesPositions.length;

	try {
		newData = new Uint8Array(newLength);
	} catch (e) {
		throw `epsb alloc mem error ${newLength}`;
	}
	let sourceIndex = 0;

	for (i = 0; i < newLength; sourceIndex++, i++) {
		if (sourceIndex === emulationPreventionBytesPositions[0]) {
			// Skip this byte
			sourceIndex++;
			// Remove this position index
			emulationPreventionBytesPositions.shift();
		}
		newData[i] = data[sourceIndex];
	}

	return newData;
}
