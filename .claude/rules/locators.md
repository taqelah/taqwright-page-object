---
paths:
  - "pages/**"
---

# Locator rules (the decorators)

Every locator is a decorator on an `accessor` field. Selector strings appear nowhere else.

## Strategy differs by platform — that is why there are two decorators

**iOS** — the demo app exposes accessibility ids on everything, so every iOS locator is a clean
`@iOSFindBy({ id: '...' })`.

**Android** — the fields have **no** id, so use the escape hatches:

| Element exposes | Use |
| --- | --- |
| a `content-desc` | `@AndroidFindBy({ uiAutomator: 'new UiSelector().description("Login")' })` |
| a partial `content-desc` | `@AndroidFindBy({ uiAutomator: 'new UiSelector().descriptionContains("Black Sequin Mini")' })` |
| only a `hint` | `@AndroidFindBy({ xpath: "//*[@hint='Username']" })` |
| only a widget class | `@AndroidFindBy({ xpath: '//android.widget.EditText' })` |

Prefer `id` → `uiAutomator` (Android) / `predicate`, `classChain` (iOS) → `xpath`, in that order.
Reach further down the list only when the element genuinely offers nothing better. `uiAutomator` is
only valid in `@AndroidFindBy`, `predicate` / `classChain` only in `@iOSFindBy` — taqwright rejects
the wrong one when the class loads.

When one recorded selector isn't stable, a decorator takes a list, tried in order:
`@AndroidFindBy([{ uiAutomator: '…' }, { xpath: '…' }])`. Every entry costs a lookup per action, so
use it sparingly, and only with selectors you recorded.

## Existing locators came from codegen — do not "tidy" them

Every current selector was recorded against the real app with `npx taqwright codegen` /
`npx taqwright inspect`. Keep them **verbatim**, including strings that look wrong but are not:

- `id: 'Black Sequin Mini\n$119.99'` — the iOS accessibility id really does contain a newline and
  the price. Do not split or trim it.
- `id: 'Search dresses...'` — the placeholder text *is* the id.
- `'VIEW CART'` is upper-case; `'Add to Cart'` is not. Match the app, not a style guide.

When a locator breaks, **re-record it** — don't guess:

```bash
npx taqwright inspect          # inspect the live screen
npx taqwright codegen          # record a fresh flow
```

Then update **that decorator only** — never the flow, and never the spec.

## Checklist

- [ ] Selector was recorded from the app, not invented.
- [ ] One decorator per platform you recorded; none for a platform you didn't.
- [ ] Strategy is the strongest available for that platform.
- [ ] The class's leading comment says how ids behave on each platform.
