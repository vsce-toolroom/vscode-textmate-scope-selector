## `vscode-textmate-scope-selector`

WASM binding for the `textmate-scope-selector-peg` Rust crate.

### Usage

#### Web

```typescript
import { loadWASM, parse } from 'vscode-textmate-scope-selector';

const response = fetch(import.meta.resolve('node_modules/vscode-textmate-scope-selector/build/selector.wasm'));
await loadWASM(response);

const selector = parse('source.matlab -comment -entity -support -string -variable -interpolation -source.shell');
console.log(selector.matches('source.matlab meta.class.matlab meta.class.declaration.matlab entity.name.type.class.matlab'));
```

#### Node.js

```typescript
import { loadWASM, parse } from 'vscode-textmate-scope-selector';
import { readFileSync } from 'node:fs';

const bufview = readFileSync('vscode-textmate-scope-selector/build/selector.wasm');
await loadWASM(bufview);

const selector = parse('source.matlab -comment -entity -support -string -variable -interpolation -source.shell');
console.log(selector.matches('source.matlab meta.class.matlab meta.class.declaration.matlab entity.name.type.class.matlab'));
```
