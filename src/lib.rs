use textmate_scope_selector_peg::{self, matchers::Matcher};
use wasm_bindgen::prelude::wasm_bindgen;

// Define the trait Matcher as a public trait with WASM bindings
#[wasm_bindgen]
pub struct ScopeSelector {
    matcher: Box<dyn Matcher>,
}

// Implement ScopeSelector to wrap Box<dyn Matcher>
#[wasm_bindgen]
impl ScopeSelector {
    fn new(matcher: Box<dyn Matcher>) -> ScopeSelector {
        ScopeSelector { matcher }
    }

    #[wasm_bindgen]
    pub fn matches(&self, scope: String) -> bool {
        self.matcher.matches(&scope)
    }

    #[wasm_bindgen]
    pub fn get_prefix(&self, scope: String) -> Option<char> {
        self.matcher.get_prefix(&scope)
    }
}

#[wasm_bindgen]
pub fn parse(selector: &str) -> ScopeSelector {
    match textmate_scope_selector_peg::parse(selector) {
        Ok(matcher) => { return ScopeSelector::new(matcher); },
        Err(err) => { panic!("{:?}", err) }
    }
}