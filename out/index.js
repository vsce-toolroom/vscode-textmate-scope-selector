'use strict';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadWASM = void 0;
const selector_js_1 = require("./selector.js");
function isInstantiatorOptionsObject(dataOrOptions) {
    return (typeof dataOrOptions.instantiator === 'function');
}
function isDataOptionsObject(dataOrOptions) {
    return (typeof dataOrOptions.data !== 'undefined');
}
function isResponse(dataOrOptions) {
    return (typeof Response !== 'undefined' && dataOrOptions instanceof Response);
}
let initCalled = false;
let initPromise = null;
function loadWASM(dataOrOptions) {
    if (initCalled) {
        // Already initialized
        return initPromise;
    }
    initCalled = true;
    let loader;
    if (isInstantiatorOptionsObject(dataOrOptions)) {
        loader = dataOrOptions.instantiator;
    }
    else {
        let data;
        if (isDataOptionsObject(dataOrOptions)) {
            data = dataOrOptions.data;
        }
        else {
            data = dataOrOptions;
        }
        if (isResponse(data)) {
            if (typeof WebAssembly.instantiateStreaming === 'function') {
                loader = _makeResponseStreamingLoader(data);
            }
            else {
                loader = _makeResponseNonStreamingLoader(data);
            }
        }
        else {
            loader = _makeArrayBufferLoader(data);
        }
    }
    let resolve;
    let reject;
    initPromise = new Promise((_resolve, _reject) => { resolve = _resolve; reject = _reject; });
    _loadWASM(loader, resolve, reject);
    return initPromise;
}
exports.loadWASM = loadWASM;
function _loadWASM(loader, resolve, reject) {
    loader((0, selector_js_1.__wbg_get_imports)())
        .then(instantiatedSource => {
        try {
            const wasm = instantiatedSource.instance.exports;
            (0, selector_js_1.__wbg_set_wasm)(wasm);
            wasm.__wbindgen_start();
            resolve();
        }
        catch (error) {
            reject(error);
        }
    })
        .catch(reject);
}
function _makeArrayBufferLoader(data) {
    return () => WebAssembly.instantiate(data, (0, selector_js_1.__wbg_get_imports)());
}
function _makeResponseStreamingLoader(data) {
    return () => WebAssembly.instantiateStreaming(data, (0, selector_js_1.__wbg_get_imports)());
}
function _makeResponseNonStreamingLoader(data) {
    return async () => {
        const arrayBuffer = await data.arrayBuffer();
        return WebAssembly.instantiate(arrayBuffer, (0, selector_js_1.__wbg_get_imports)());
    };
}
__exportStar(require("./selector.js"), exports);
