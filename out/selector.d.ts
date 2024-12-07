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
    private __wbg_ptr;
    /** @private */
    static __wrap(ptr: number): ScopeSelector;
    private __destroy_into_raw;
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
