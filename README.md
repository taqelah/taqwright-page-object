# Page Object Lab — one spec, both platforms 🧩

The **Page Object pattern** taken cross-platform. The add-to-cart flow is **identical** on Android
and iOS — only the **locators** differ. So we put the flow in an **abstract base page** and the
locators in **Android / iOS subclasses**. The result: **one spec** runs on both targets.

Each **screen** is its own page object — `LoginPage`, `HomePage`, `SearchCataloguePage`, `CartPage` —
and every flow method returns the **next** page, so the spec reads as a fluent chain.

This lab is **complete and runnable**.

```text
taqelah-demo-app-page-object/
├── taqwright.config.ts                two projects (android + ios) sharing one testDir
├── app/                               committed demo-app binaries (APK + iOS sim .app.zip)
├── pages/                             one subfolder per screen (base + Android/iOS locators)
│   ├── login/                         LoginPage.ts → login() → HomePage
│   │   ├── LoginPage.ts               abstract base — the FLOW + abstract locator getters
│   │   ├── AndroidLoginPage.ts        extends base — xpath / UiSelector locators
│   │   └── IosLoginPage.ts            extends base — getById (accessibility id) locators
│   ├── home/                          HomePage.ts → openCatalog() → SearchCataloguePage
│   ├── search-catalogue/              SearchCataloguePage.ts → searchAndAddToCart() → CartPage
│   ├── cart/                          CartPage.ts → exposes proceedToCheckout() (spec asserts)
│   └── index.ts                       factories: pick each subclass by project name
└── tests/
    └── add-to-cart.spec.ts            ONE platform-agnostic spec
```

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
nvm use 24
npm install

npm run test:android     # the SAME spec, Android page object
npm run test:ios         # the SAME spec, iOS page object (macOS + simulator)
npx taqwright test       # both projects
npx taqwright test --list   # one spec listed under [android] AND [ios]
```

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
| iOS won't run | macOS-only; needs an iPhone simulator + the committed `app/DemoApp-v1.1.0-debug-ios.app.zip`. |
| APK not found | Ensure [`app/DemoApp-v1.0.0.apk`](app/) exists (committed). |
