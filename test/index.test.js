const { loadWASM, parse } = require('..');
const { readFileSync } = require('fs');
const { strictEqual } = require('assert');

/** @type {import('./data.json')} */
const tests = JSON.parse(readFileSync('./test/data.json'));

async function main() {
    const bufview = readFileSync('./build/selector.wasm');
    await loadWASM(bufview);

    for (const [feature, cases] of Object.entries(tests)) {
        for (const t of cases) {
            const selector = parse(t.selector);
            strictEqual(selector.matches(t.input.join(' ')), t.expected, `TextmateScopeSelector ${feature}: "${t.selector}"`);
        }
    }
}

main();