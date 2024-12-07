'use strict';

const shelljs = require('shelljs');

shelljs.exec('wasm-pack build --out-dir temp --target web --release --no-pack');
shelljs.cp('temp/vscode_textmate_scope_selector_bg.wasm', 'build/selector.wasm');
shelljs.rm('temp');