# Architecture rules

## Layers

```
spec (tests/)  →  page class (pages/<screen>/XxxPage.ts)  →  @AndroidFindBy / @iOSFindBy  →  Locator
    flow only        the FLOW + decorated locator fields       the session's platform picks     taqwright
```

Each **screen** is one class in its own folder under `pages/`:

| File | Role |
| --- | --- |
| `pages/<screen>/XxxPage.ts` | `class XxxPage extends Screen` — decorated locator fields (one decorator per platform) + the **flow** (concrete `async` methods) |
| `pages/index.ts` | barrel — re-exports every page class |

Current screens: `login/`, `home/`, `search-catalogue/`, `cart/`, `side-menu/`, `gestures/`.

`Screen`, `AndroidFindBy`, `iOSFindBy`, `FindBy` and `Locator` all come from `taqwright`. `Screen`'s
constructor takes the `mobile` fixture; the decorators read the platform from it, so there are **no**
per-platform subclasses and **no** factories.

## The hard rules (never break these)

1. **Locators live in decorators, flow lives in methods.** A selector string may only appear inside
   an `@AndroidFindBy` / `@iOSFindBy` / `@FindBy` — never inside a flow method or a spec.
2. **No platform branching anywhere.** No `if (platform === …)`, no `mobile.getPlatform()`
   comparisons, no ternaries on the project name — in a page or a spec. The decorators are the
   *only* place that knows which platform is running.
3. **No raw locators in specs.** A spec imports page classes from `../pages` and calls flow methods.
   If a spec needs an element to assert on, the page exposes it as a **public** locator field
   (see `CartPage.proceedToCheckout`).
4. **Fluent navigation.** A flow method that leaves the screen returns the next page —
   `return new HomePage(this.mobile)`, typed `Promise<HomePage>`. A method that stays on the screen
   returns `Promise<void>` (or `this`).
5. **TypeScript only, strict mode.** `npm run typecheck` must pass clean before any commit.

## Types

Declare every locator as an **auto-accessor**: `protected accessor loginButton!: Locator;`. Not a
plain `loginButton!: Locator` field — Playwright 1.65+ refuses to compile a decorated `!` field with
this repo's `target: ES2022` ("Definitely assigned fields cannot be initialized here"). Locators are
**not** awaited; only the *actions* on them (`.fill()`, `.click()`) are.

## Adding a new screen

1. Create `pages/<screen>/XxxPage.ts` with `export class XxxPage extends Screen { … }`.
2. Add `export { XxxPage } from './<screen>/XxxPage';` to `pages/index.ts`.
3. Make the *previous* screen's flow method `return new XxxPage(this.mobile)`.
