// Generated by dts-bundle-generator v9.5.1

export interface SelectorBinding extends WebAssembly.Exports {
    memory: WebAssembly.Memory;
    __wbg_scopeselector_free: (a: number, b: number) => void;
    scopeselector_matches: (a: number, b: number, c: number) => number;
    scopeselector_get_prefix: (a: number, b: number, c: number) => number;
    parse: (a: number, b: number) => number;
    __wbindgen_export_0: WebAssembly.Table;
    __wbindgen_malloc: (a: number, b: number) => number;
    __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
    __wbindgen_start: () => void;
}

export declare function __wbg_set_wasm(val: SelectorBinding): void;

/**
 * @param {string} selector
 * @returns {ScopeSelector}
 */
export declare function parse(selector: string): ScopeSelector;

export declare class ScopeSelector {
    free(): void;

	/**
     * @param {string} scope
     * @returns {boolean}
     */
    matches(scope: string): boolean;

	/**
     * @param {string} scope
     * @returns {string | undefined}
     */
    get_prefix(scope: string): string | void;
}

export declare function __wbindgen_init_externref_table(): void;

export declare function __wbindgen_throw(arg0: number, arg1: number): void;

export declare function __wbg_get_imports(): WebAssembly.Imports;

export interface InstantiatorOptions {
    instantiator: WebAssemblyInstantiator;
}

export interface DataOptions {
    data: ArrayBufferView | ArrayBuffer | Response;
}

export type Options = InstantiatorOptions | DataOptions;

export declare function loadWASM(options: Options): Promise<void>;

export declare function loadWASM(data: ArrayBufferView | ArrayBuffer | Response): Promise<void>;

export interface WebAssemblyInstantiator {
    (importObject?: WebAssembly.Imports): Promise<WebAssembly.WebAssemblyInstantiatedSource>;
}

export as namespace selector;

export {};
