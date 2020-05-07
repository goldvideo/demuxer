export interface AACFrame {
	pts: number;
	dts: number;
	sampleCount: number;
	audioObjectType: number;
	channelCount: number;
	sampleRate: number;
	samplingFrequencyIndex: number;
	// assume ISO/IEC 14496-12 AudioSampleEntry default of 16
	sampleSize: number;
	data: Uint8Array;
}
