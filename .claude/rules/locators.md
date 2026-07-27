---
paths:
  - "pages/**/Android*.ts"
  - "pages/**/Ios*.ts"
---

# Locator rules (platform subclasses)

These files hold **locators and nothing else**. Every method is a one-line `return this.mobile.…`.

## Strategy differs by platform — that is the whole point of the split

**iOS** — the demo app exposes accessibility ids on everything, so every locator is a clean
`getById(...)`:

```ts
export class IosLoginPage extends LoginPage {
  protected usernameField(): Locator { return this.mobile.getById('Username'); }
  protected loginButton(): Locator   { return this.mobile.getById('Login'); }
}
```

**Android** — the fields have **no** id, so use the escape hatches:

| Element exposes | Use |
| --- | --- |
| a `content-desc` | `getByUiSelector('new UiSelector().description("Login")')` |
| a partial `content-desc` | `getByUiSelector('new UiSelector().descriptionContains("Black Sequin Mini")')` |
| only a `hint` | `getByXpath("//*[@hint='Username']")` |
| only a widget class | `getByUiSelector('new UiSelector().className("android.widget.EditText")')` |

```ts
export class AndroidLoginPage extends LoginPage {
  protected usernameField(): Locator { return this.mobile.getByXpath("//*[@hint='Username']"); }
  protected loginButton(): Locator   { return this.mobile.getByUiSelector('new UiSelector().description("Login")'); }
}
```

Prefer `getById` → `getByUiSelector` → `getByXpath`, in that order, whichever platform you are on.
Reach further down the list only when the element genuinely offers nothing better.

## Existing locators came from codegen — do not "tidy" them

Every current selector was recorded against the real app with `npx taqwright codegen` /
`npx taqwright inspect`. Keep them **verbatim**, including strings that look wrong but are not:

- `getById('Black Sequin Mini\n$119.99')` — the iOS accessibility id really does contain a newline
  and the price. Do not split or trim it.
- `getById('Search dresses...')` — the placeholder text *is* the id.
- `'VIEW CART'` is upper-case; `'Add to Cart'` is not. Match the app, not a style guide.

When a locator breaks, **re-record it** — don't guess:

```bash
npx taqwright inspect          # inspect the live screen
npx taqwright codegen          # record a fresh flow
```

Then update **the subclass only** — never the base, and never the spec.

## Checklist

- [ ] File contains only locator getters — no flow, no assertions, no `if`, no stored state.
- [ ] Every getter is one line: `return this.mobile.getBy…(…)`.
- [ ] Signature matches the base exactly, including `protected` (or its absence, for public ones
      like `proceedToCheckout()`).
- [ ] Selector was recorded from the app, not invented.
- [ ] Locator strategy is the strongest available: `getById` > `getByUiSelector` > `getByXpath`.
- [ ] The leading comment says which platform and how the ids behave on it.
