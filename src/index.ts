'use strict';

import { SelectorBinding, __wbg_get_imports, __wbg_set_wasm } from './selector.js';

interface InstantiatorOptions {
	instantiator: WebAssemblyInstantiator;
}

interface DataOptions {
	data: ArrayBufferView | ArrayBuffer | Response;
}

export type Options = InstantiatorOptions | DataOptions;

function isInstantiatorOptionsObject(dataOrOptions: ArrayBufferView | ArrayBuffer | Response | Options): dataOrOptions is InstantiatorOptions {
	return (typeof (<InstantiatorOptions>dataOrOptions).instantiator === 'function');
}

function isDataOptionsObject(dataOrOptions: ArrayBufferView | ArrayBuffer | Response | Options): dataOrOptions is DataOptions {
	return (typeof (<DataOptions>dataOrOptions).data !== 'undefined');
}

function isResponse(dataOrOptions: ArrayBufferView | ArrayBuffer | Response | Options): dataOrOptions is Response {
	return (typeof Response !== 'undefined' && dataOrOptions instanceof Response);
}

let initCalled = false;
let initPromise: Promise<void> | null = null;

export function loadWASM(options: Options): Promise<void>;
export function loadWASM(data: ArrayBufferView | ArrayBuffer | Response): Promise<void>;
export function loadWASM(dataOrOptions: ArrayBufferView | ArrayBuffer | Response | Options): Promise<void> {
	if (initCalled) {
		// Already initialized
		return initPromise!;
	}
	initCalled = true;

	let loader: WebAssemblyInstantiator;

	if (isInstantiatorOptionsObject(dataOrOptions)) {
		loader = dataOrOptions.instantiator;
	} else {
		let data: ArrayBufferView | ArrayBuffer | Response;
		if (isDataOptionsObject(dataOrOptions)) {
			data = dataOrOptions.data;
		} else {
			data = dataOrOptions;
		}

		if (isResponse(data)) {
			if (typeof WebAssembly.instantiateStreaming === 'function') {
				loader = _makeResponseStreamingLoader(data);
			} else {
				loader = _makeResponseNonStreamingLoader(data);
			}
		} else {
			loader = _makeArrayBufferLoader(data);
		}
	}

	let resolve: () => void;
	let reject: (err: any) => void;
	initPromise = new Promise<void>((_resolve, _reject) => { resolve = _resolve; reject = _reject; })

	_loadWASM(loader, resolve!, reject!);

	return initPromise;
}

function _loadWASM(loader: WebAssemblyInstantiator, resolve: () => void, reject: (err: any) => void): void {
	loader(__wbg_get_imports())
		.then(instantiatedSource => {
			try {
				const wasm = instantiatedSource.instance.exports as SelectorBinding;
				__wbg_set_wasm(wasm);
				wasm.__wbindgen_start();
				resolve();
			} catch (error) {
				reject(error);
			}
		})
		.catch(reject);
}

export interface WebAssemblyInstantiator {
	(importObject?: WebAssembly.Imports): Promise<WebAssembly.WebAssemblyInstantiatedSource>;
}

function _makeArrayBufferLoader(data: ArrayBufferView | ArrayBuffer): WebAssemblyInstantiator {
	return () => WebAssembly.instantiate(data, __wbg_get_imports());
}

function _makeResponseStreamingLoader(data: Response): WebAssemblyInstantiator {
	return () => WebAssembly.instantiateStreaming(data, __wbg_get_imports());
}

function _makeResponseNonStreamingLoader(data: Response): WebAssemblyInstantiator {
	return async () => {
		const arrayBuffer = await data.arrayBuffer();
		return WebAssembly.instantiate(arrayBuffer, __wbg_get_imports())
	};
}

export * from './selector.js';
