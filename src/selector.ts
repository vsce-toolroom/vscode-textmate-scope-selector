'use strict';

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

let wasm: SelectorBinding;
export function __wbg_set_wasm(val: SelectorBinding) {
    wasm = val;
}

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

let cachedUint8ArrayMemory0: Uint8Array | null = null;

function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
}

function getStringFromWasm0(ptr: number, len: number) {
    ptr = ptr >>> 0;
    return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}

let WASM_VECTOR_LEN = 0;

let cachedTextEncoder = new TextEncoder();

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg: any, view: any) {
        return cachedTextEncoder.encodeInto(arg, view);
    }
    : function (arg: string, view: { set: (arg0: any) => void; }) {
        const buf = cachedTextEncoder.encode(arg);
        view.set(buf);
        return {
            read: arg.length,
            written: buf.length
        };
    }
);

function passStringToWasm0(arg: string, malloc: typeof wasm.__wbindgen_malloc, realloc: typeof wasm.__wbindgen_realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length, 1) >>> 0;
        getUint8ArrayMemory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;

    const mem = getUint8ArrayMemory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
        const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written!;
        ptr = realloc(ptr, len, offset, 1) >>> 0;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}
/**
 * @param {string} selector
 * @returns {ScopeSelector}
 */
export function parse(selector: string): ScopeSelector {
    const ptr0 = passStringToWasm0(selector, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.parse(ptr0, len0);
    return ScopeSelector.__wrap(ret);
}

const ScopeSelectorFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry((ptr: number) => wasm.__wbg_scopeselector_free(ptr >>> 0, 1));

export class ScopeSelector {
    private __wbg_ptr!: number;
    /** @private */
    static __wrap(ptr: number): ScopeSelector {
        ptr = ptr >>> 0;
        const obj = Object.create(ScopeSelector.prototype);
        obj.__wbg_ptr = ptr;
        ScopeSelectorFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    private __destroy_into_raw(): number {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ScopeSelectorFinalization.unregister(this);
        return ptr;
    }

    free(): void {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_scopeselector_free(ptr, 0);
    }
    /**
     * @param {string} scope
     * @returns {boolean}
     */
    matches(scope: string): boolean {
        const ptr0 = passStringToWasm0(scope, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.scopeselector_matches(this.__wbg_ptr, ptr0, len0);
        return ret !== 0;
    }
    /**
     * @param {string} scope
     * @returns {string | undefined}
     */
    get_prefix(scope: string): string | void {
        const ptr0 = passStringToWasm0(scope, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.scopeselector_get_prefix(this.__wbg_ptr, ptr0, len0);
        return ret === 0xFFFFFF ? undefined : String.fromCodePoint(ret);
    }
}

export function __wbindgen_init_externref_table() {
    const table = wasm.__wbindgen_export_0;
    const offset = table.grow(4);
    table.set(0, undefined);
    table.set(offset + 0, undefined);
    table.set(offset + 1, null);
    table.set(offset + 2, true);
    table.set(offset + 3, false);
    ;
};

export function __wbindgen_throw(arg0: number, arg1: number) {
    throw new Error(getStringFromWasm0(arg0, arg1));
};

export function __wbg_get_imports(): WebAssembly.Imports {
    const imports: WebAssembly.Imports = {};
    imports.wbg = {};
    imports.wbg.__wbindgen_init_externref_table = __wbindgen_init_externref_table;
    imports.wbg.__wbindgen_throw = __wbindgen_throw;

    return imports;
}