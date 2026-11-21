---
paths:
  - "pages/**"
---

# Page-object rules

## One class per screen — decorated locators + flow

The flow is identical on both platforms, so it is written **once**; each element carries one
decorator per platform and the running session picks. See `pages/login/LoginPage.ts`:

```ts
import { Screen, AndroidFindBy, iOSFindBy, type Locator } from 'taqwright';
import { HomePage } from '../home/HomePage';

export class LoginPage extends Screen {
  // ── locators — one decorator per platform ──
  @AndroidFindBy({ xpath: "//*[@hint='Username']" })
  @iOSFindBy({ id: 'Username' })
  protected accessor usernameField!: Locator;

  @AndroidFindBy({ uiAutomator: 'new UiSelector().description("Login")' })
  @iOSFindBy({ id: 'Login' })
  protected accessor loginButton!: Locator;

  // ── shared flow — same on both platforms ──
  async login(username: string, password: string): Promise<HomePage> {
    await this.usernameField.fill(username);
    await this.loginButton.click();
    return new HomePage(this.mobile);   // ← hand off to the next screen
  }
}
```

Keep the two `// ── … ──` section banners — they make the split obvious at a glance.

- Always `accessor name!: Locator` — never a plain `name!: Locator` field (it fails to compile under
  Playwright 1.65+ with this repo's ES2022 target), never `declare` (it strips the decorator).
- Order the decorators `@AndroidFindBy` then `@iOSFindBy`. Either order works; consistency helps.
- `@FindBy({...})` covers both platforms when the app exposes the same id on each. A platform
  decorator on the same field overrides it.

## Fluent navigation

A flow method that leaves the screen **returns the next page object**: `new NextPage(this.mobile)`.
The chain today: `LoginPage.login()` → `HomePage.openCatalog()` →
`SearchCataloguePage.searchAndAddToCart()` → `CartPage` (terminal); `HomePage.openNavigationMenu()`
→ `SideMenuPage.openGestures()` → `GesturesPage`.

Import the next page **as a value** (`import { HomePage } from '../home/HomePage'`). The navigation
graph has no cycles; if one ever appears, it still resolves, because the class is only touched inside
a method.

## Screens recorded on one platform only

Give the field only the decorator you recorded (e.g. `@AndroidFindBy` alone). Using it on the other
platform throws `XxxPage.field has no iOS locator — add @iOSFindBy(...)`, which says exactly what to
record. Never guess a selector for a platform you haven't inspected.

## Exposing elements for assertions

Page objects contain **no assertions** — no `expect`, no `toBeVisible`. When a spec must assert on an
element, drop `protected` from that field and let the spec assert. `CartPage` is the reference:

```ts
export class CartPage extends Screen {
  // ── locators — public, the spec asserts on it ──
  @AndroidFindBy({ uiAutomator: 'new UiSelector().description("Proceed to Checkout")' })
  @iOSFindBy({ id: 'Proceed to Checkout' })
  accessor proceedToCheckout!: Locator;
}
```

## Checklist

- [ ] Class `extends Screen`; every locator is a decorated `accessor name!: Locator`.
- [ ] Selector strings appear **only** inside decorators; **no** platform branching.
- [ ] Flow method that changes screen returns `Promise<NextPage>` via `new NextPage(this.mobile)`.
- [ ] No `expect` / assertions anywhere under `pages/`.
- [ ] New screen re-exported from `pages/index.ts`.
- [ ] `npm run typecheck` passes.
