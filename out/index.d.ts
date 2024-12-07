interface InstantiatorOptions {
    instantiator: WebAssemblyInstantiator;
}
interface DataOptions {
    data: ArrayBufferView | ArrayBuffer | Response;
}
export type Options = InstantiatorOptions | DataOptions;
export declare function loadWASM(options: Options): Promise<void>;
export declare function loadWASM(data: ArrayBufferView | ArrayBuffer | Response): Promise<void>;
export interface WebAssemblyInstantiator {
    (importObject?: WebAssembly.Imports): Promise<WebAssembly.WebAssemblyInstantiatedSource>;
}
export * from './selector.js';
