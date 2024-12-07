'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.__wbg_get_imports = exports.__wbindgen_throw = exports.__wbindgen_init_externref_table = exports.ScopeSelector = exports.parse = exports.__wbg_set_wasm = void 0;
let wasm;
function __wbg_set_wasm(val) {
    wasm = val;
}
exports.__wbg_set_wasm = __wbg_set_wasm;
let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });
cachedTextDecoder.decode();
let cachedUint8ArrayMemory0 = null;
function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
}
function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}
let WASM_VECTOR_LEN = 0;
let cachedTextEncoder = new TextEncoder();
const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
        return cachedTextEncoder.encodeInto(arg, view);
    }
    : function (arg, view) {
        const buf = cachedTextEncoder.encode(arg);
        view.set(buf);
        return {
            read: arg.length,
            written: buf.length
        };
    });
function passStringToWasm0(arg, malloc, realloc) {
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
        if (code > 0x7F)
            break;
        mem[ptr + offset] = code;
    }
    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
        const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);
        offset += ret.written;
        ptr = realloc(ptr, len, offset, 1) >>> 0;
    }
    WASM_VECTOR_LEN = offset;
    return ptr;
}
/**
 * @param {string} selector
 * @returns {ScopeSelector}
 */
function parse(selector) {
    const ptr0 = passStringToWasm0(selector, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.parse(ptr0, len0);
    return ScopeSelector.__wrap(ret);
}
exports.parse = parse;
const ScopeSelectorFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => { }, unregister: () => { } }
    : new FinalizationRegistry((ptr) => wasm.__wbg_scopeselector_free(ptr >>> 0, 1));
class ScopeSelector {
    /** @private */
    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(ScopeSelector.prototype);
        obj.__wbg_ptr = ptr;
        ScopeSelectorFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ScopeSelectorFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_scopeselector_free(ptr, 0);
    }
    /**
     * @param {string} scope
     * @returns {boolean}
     */
    matches(scope) {
        const ptr0 = passStringToWasm0(scope, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.scopeselector_matches(this.__wbg_ptr, ptr0, len0);
        return ret !== 0;
    }
    /**
     * @param {string} scope
     * @returns {string | undefined}
     */
    get_prefix(scope) {
        const ptr0 = passStringToWasm0(scope, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.scopeselector_get_prefix(this.__wbg_ptr, ptr0, len0);
        return ret === 0xFFFFFF ? undefined : String.fromCodePoint(ret);
    }
}
exports.ScopeSelector = ScopeSelector;
function __wbindgen_init_externref_table() {
    const table = wasm.__wbindgen_export_0;
    const offset = table.grow(4);
    table.set(0, undefined);
    table.set(offset + 0, undefined);
    table.set(offset + 1, null);
    table.set(offset + 2, true);
    table.set(offset + 3, false);
    ;
}
exports.__wbindgen_init_externref_table = __wbindgen_init_externref_table;
;
function __wbindgen_throw(arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
}
exports.__wbindgen_throw = __wbindgen_throw;
;
function __wbg_get_imports() {
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbindgen_init_externref_table = __wbindgen_init_externref_table;
    imports.wbg.__wbindgen_throw = __wbindgen_throw;
    return imports;
}
exports.__wbg_get_imports = __wbg_get_imports;
