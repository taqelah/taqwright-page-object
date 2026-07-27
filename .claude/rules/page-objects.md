---
paths:
  - "pages/**"
---

# Page-object rules

## The base class — flow + abstract locators

The flow is identical on both platforms, so it is written **once** here. See
`pages/login/LoginPage.ts`:

```ts
export abstract class LoginPage {
  constructor(
    protected readonly mobile: Mobile,
    protected readonly projectName: string,
  ) {}

  // ── platform-specific locators — provided by AndroidLoginPage / IosLoginPage ──
  protected abstract usernameField(): Locator;
  protected abstract loginButton(): Locator;

  // ── shared flow — same on both platforms ──
  async login(username: string, password: string): Promise<HomePage> {
    await this.usernameField().fill(username);
    await this.loginButton().click();
    return homePage(this.mobile, this.projectName);   // ← hand off to the next screen
  }
}
```

Keep the two `// ── … ──` section banners — they make the split obvious at a glance.

## Fluent navigation

A flow method that leaves the screen **returns the next page object**, built from its factory with
`this.mobile, this.projectName`. That is why the constructor carries `projectName` even though the
base never branches on it.

The chain today: `LoginPage.login()` → `HomePage.openCatalog()` →
`SearchCataloguePage.searchAndAddToCart()` → `CartPage` (terminal).

## Circular imports

A base page imports the *next* page's **type** and its **factory**. Import the type with
`import type` and the factory as a value — this is what keeps the `pages/index.ts` ↔ base-page cycle
resolvable:

```ts
import type { HomePage } from '../home/HomePage';   // type-only — erased at compile time
import { homePage } from '../index';                // value — the factory
```

Never `import { HomePage } from '../home/HomePage'` as a value in a base page.

## Exposing elements for assertions

Page objects contain **no assertions** — no `expect`, no `toBeVisible`. When a spec must assert on an
element, declare that one getter **public** (no `protected`) and let the spec assert. `CartPage` is
the reference:

```ts
export abstract class CartPage {
  // public — the spec asserts on it
  abstract proceedToCheckout(): Locator;
}
```

## Factories (`pages/index.ts`)

One factory per screen, all the same shape — Android is the default branch:

```ts
export function homePage(mobile: Mobile, projectName: string): HomePage {
  return projectName === 'ios'
    ? new IosHomePage(mobile, projectName)
    : new AndroidHomePage(mobile, projectName);
}
```

The return type is the **abstract** type, never the subclass. Also add the matching
`export type { HomePage } from './home/HomePage';` line so specs can name the type.

## Checklist

- [ ] Base is `abstract`; every locator is a `protected abstract …(): Locator` getter.
- [ ] Base contains **no** selector strings and **no** platform branching.
- [ ] Subclass implements locator getters **only** — no flow methods, no extra state.
- [ ] Flow method that changes screen returns `Promise<NextPage>` built from the factory.
- [ ] Next-page **type** imported with `import type`; factory imported as a value from `../index`.
- [ ] No `expect` / assertions anywhere under `pages/`.
- [ ] New screen wired into `pages/index.ts` (factory + `export type`).
- [ ] `npm run typecheck` passes.
