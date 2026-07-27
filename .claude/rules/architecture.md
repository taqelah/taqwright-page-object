# Architecture rules

## Layers

```
spec (tests/)  →  factory (pages/index.ts)  →  abstract base page  →  Android*/Ios* subclass  →  Locator
    flow only        picks the platform          the FLOW                the LOCATORS            taqwright
```

Each **screen** is one folder under `pages/`, holding three files:

| File | Role |
| --- | --- |
| `XxxPage.ts` | `abstract class` — the **flow** (concrete `async` methods) + `protected abstract` locator getters |
| `AndroidXxxPage.ts` | `extends XxxPage` — **only** locator getter implementations |
| `IosXxxPage.ts` | `extends XxxPage` — **only** locator getter implementations |

Current screens: `login/`, `home/`, `search-catalogue/`, `cart/`.

## The hard rules (never break these)

1. **Flow in the base, locators in the subclasses.** A subclass may only implement locator getters —
   never override or add a flow method. A base class must never contain a raw selector string.
2. **No platform branching outside `pages/index.ts`.** No `if (projectName === 'ios')`, no
   `instanceof`, no platform ternaries in a base page or a spec. The factory is the *only* place
   that knows which platform is running.
3. **No raw locators in specs.** A spec imports factories from `../pages` and calls flow methods.
   If a spec needs an element to assert on, the page object exposes it as a **public** locator getter
   (see `CartPage.proceedToCheckout()`).
4. **Fluent navigation.** A flow method that leaves the screen returns the next screen's page object
   via its factory — `Promise<HomePage>`, `Promise<CartPage>`, … A method that stays on the screen
   returns `Promise<void>` (or `this`).
5. **TypeScript only, strict mode.** `npm run typecheck` must pass clean before any commit.

## Types

`Mobile` and `Locator` are both exported from `taqwright`. Type abstract getters as `(): Locator` —
they are **not** `async` and are **not** awaited when returned for assertion; only the *actions* on
them (`.fill()`, `.click()`) are awaited.

```ts
import { type Mobile, type Locator } from 'taqwright';
```

## Adding a new screen

1. Create `pages/<screen>/` with the three files.
2. Base constructor is inherited — declare it only in the base:
   `constructor(protected readonly mobile: Mobile, protected readonly projectName: string) {}`
3. Add a factory to `pages/index.ts` following the existing shape, plus the `export type` line.
4. Make the *previous* screen's flow method return the new page via that factory.
