export declare function isPowerOfTwo(num: any): boolean;
export declare function error(message: any): void;
export declare function pointwiseBufferMult(a: any, b: any): number[];
export declare function applyWindow(signal: any, windowname: any): any;
export declare function createBarkScale(length: any, sampleRate: any, bufferSize: any): Float32Array;
export declare function typedToArray(t: any): any[];
export declare function arrayToTyped(t: any): Float32Array;
export declare function _normalize(num: any, range: any): number;
export declare function normalize(a: any, range: any): any;
export declare function normalizeToOne(a: any): any;
export declare function mean(a: any): number;
export declare function melToFreq(mV: any): number;
export declare function freqToMel(fV: any): number;
export declare function createMelFilterBank(numFilters: number, sampleRate: number, bufferSize: number): number[][];
export declare function hzToOctaves(freq: any, A440: any): number;
export declare function normalizeByColumn(a: any): any;
export declare function createChromaFilterBank(numFilters: any, sampleRate: any, bufferSize: any, centerOctave?: number, octaveWidth?: number, baseC?: boolean, A440?: number): number[][];
export declare function frame(buffer: any, frameLength: any, hopLength: any): any[];