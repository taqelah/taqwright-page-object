# Page Object Lab — one spec, both platforms 🧩

The **Page Object pattern** taken cross-platform. A user flow like add-to-cart is **identical** on
Android and iOS — only the **locators** differ. So we put the flow in an **abstract base page** and
the locators in **Android / iOS subclasses**. The result: **one spec** runs on both targets.

Each **screen** is its own page object — `LoginPage`, `HomePage`, `SearchCataloguePage`, `CartPage`,
`SideMenuPage`, `GesturesPage` — and every flow method returns the **next** page, so the spec reads
as a fluent chain.

This lab is **complete and runnable on Android**. The side-menu and gestures screens were recorded
on Android only, so their iOS locators are throwing stubs — see [iOS coverage](#ios-coverage).

```text
taqelah-demo-app-page-object/
├── taqwright.config.ts                two projects (android + ios) sharing one testDir
├── app/                               committed demo-app binaries (APK + iOS sim .app.zip)
├── pages/                             one subfolder per screen (base + Android/iOS locators)
│   ├── login/                         LoginPage.ts → login() → HomePage
│   │   ├── LoginPage.ts               abstract base — the FLOW + abstract locator getters
│   │   ├── AndroidLoginPage.ts        extends base — xpath / UiSelector locators
│   │   └── IosLoginPage.ts            extends base — getById (accessibility id) locators
│   ├── home/                          HomePage.ts → openCatalog() / openNavigationMenu()
│   ├── search-catalogue/              SearchCataloguePage.ts → searchAndAddToCart() → CartPage
│   ├── cart/                          CartPage.ts → exposes proceedToCheckout() (spec asserts)
│   ├── side-menu/                     SideMenuPage.ts → openGestures() → GesturesPage
│   ├── gestures/                      GesturesPage.ts → swipes + locator-to-locator drag
│   └── index.ts                       factories: pick each subclass by project name
└── tests/                             every spec runs under BOTH projects
    ├── add-to-cart.spec.ts
    ├── search-catalogue.spec.ts
    ├── login-with-valid-credentials.spec.ts
    ├── login-with-invalid-credentials.spec.ts
    ├── swipe-gestures.spec.ts
    └── drag-and-drop.spec.ts
```

## The specs

Six specs × two projects = 12 tests (`npx taqwright test --list`).

| Spec | Flow | iOS |
| --- | --- | --- |
| `add-to-cart` | Login → Home → Catalogue → Cart, assert checkout is reachable | ✅ |
| `search-catalogue` | Login → Home → "View All" → search, assert a result shows | ✅ |
| `login-with-valid-credentials` | Sign in with the demo account | ✅ |
| `login-with-invalid-credentials` | Reject unknown credentials, assert the error banner | ✅ |
| `swipe-gestures` | Login → side menu → Gestures, swipe the two cards | ❌ |
| `drag-and-drop` | Drag "Item 1" onto "Item 4", verify with an Applitools baseline | ❌ |

## The pattern

```ts
// base: the flow, written once — and it returns the NEXT screen's page object
abstract class LoginPage {
  protected abstract loginButton(): Locator;   // ← subclasses fill these in
  // …
  async login(u, p): Promise<HomePage> {
    await this.usernameField().fill(u); /* … */ await this.loginButton().click();
    return homePage(this.mobile, this.projectName);   // ← hand off to the next screen
  }
}

class AndroidLoginPage extends LoginPage {
  protected loginButton() { return this.mobile.getByUiSelector('new UiSelector().description("Login")'); }
}
class IosLoginPage extends LoginPage {
  protected loginButton() { return this.mobile.getById('Login'); }   // iOS has accessibility ids
}
```

```ts
// the spec never sees a raw locator or an `if (android)` — just the user flow, chained screen-to-screen:
const home    = await loginPage(mobile, testInfo.project.name).login('emma@demoapp.com', '10203040');
const catalog = await home.openCatalog();
const cart    = await catalog.searchAndAddToCart('black');
await expect(cart.proceedToCheckout()).toBeVisible();   // page object exposes the locator; the spec asserts
```

## Run

```bash
cd taqelah-demo-app-page-object
nvm use 24               # taqwright needs node >= 24
npm install

npm run test:android     # every spec, Android page objects
npm run test:ios         # every spec, iOS page objects (macOS + simulator)
npx taqwright test       # both projects
npx taqwright test --list   # each spec listed under [android] AND [ios]
npm run typecheck        # tsc --noEmit — needs no device, run it before every commit
```

`drag-and-drop.spec.ts` sends a screenshot to Applitools, so it **requires** a key — `eyes.open()`
runs before the try block and fails the test if the key is missing or empty:

```bash
export APPLITOOLS_API_KEY=…
```

A visual *mismatch* does not fail the run — the spec closes with `eyes.close(false)`, which reports
the diff to the Applitools dashboard instead of throwing.

## iOS coverage

The login, home, catalogue and cart screens are recorded on **both** platforms. The **side-menu**
and **gestures** screens were recorded on Android only, so `IosSideMenuPage` and `IosGesturesPage`
(and `IosHomePage.openNavigationMenuButton`) throw a descriptive *"record this flow on iOS"* error
instead of guessing a selector. `npm run test:ios` therefore fails on `swipe-gestures` and
`drag-and-drop` until those locators are captured with `npx taqwright inspect`.

Guessing an iOS accessibility id you have not seen on a live screen is worse than a loud stub — the
stub tells you exactly which getter is missing.

## Why it's worth it

- **No `if (platform)` branching** in tests — the subclass hides it.
- **One place to fix a locator** when a screen changes (the page object, not N specs).
- **Android vs iOS locator contrast** is real here: Android fields have no id (→ `getByXpath`/
  `getByUiSelector`), iOS exposes accessibility ids (→ clean `getById`). Same flow, different locators.

## 🆘 Troubleshooting

| Symptom | Fix |
| --- | --- |
| `Unable to find an active device` | Boot an emulator/simulator; `npx taqwright devices`. |
| A locator isn't found | Re-inspect with `npx taqwright inspect` and update the subclass — never the base. |
| `… not implemented — record this flow on iOS` | Expected: that screen has no iOS locators yet. See [iOS coverage](#ios-coverage). |
| `EBADENGINE` on install | node is older than 24. `node -v`, then `nvm use 24`. |
| iOS won't run | macOS-only; needs an iPhone simulator + the committed `app/DemoApp-v1.1.0-debug-ios.app.zip`. |
| APK not found | Ensure [`app/DemoApp-v1.0.0.apk`](app/) exists (committed). |
