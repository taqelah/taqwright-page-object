# CLAUDE.md — taqelah-demo-app-page-object

> Claude Code loads this file at the start of every session. Keep it short and current.

## What this is

The **Page Object pattern**, cross-platform: each **screen** is an abstract base page
(`LoginPage`, `HomePage`, `SearchCataloguePage`, `CartPage`) that holds the **flow** + abstract
locator getters; `Android*` / `Ios*` subclasses override **only the locators**. Every flow method
returns the **next** page object, so the spec chains screen-to-screen. One spec
(`tests/add-to-cart.spec.ts`) runs on **both** the `android` and `ios` projects against
`taqelah/demo-app`. taqwright = Playwright runner + flat `mobile` API on Appium 3.x.

- **TypeScript only**; each screen has its own subfolder under `pages/` (`login/`, `home/`,
  `search-catalogue/`, `cart/`) holding its base + `Android*` / `Ios*` subclasses; the spec in `tests/`.
- `Mobile` and `Locator` are both exported from `taqwright` — type the abstract getters as `: Locator`.

## Conventions (don't break these)

- **Flow lives in the base** (one base per screen); **locators live in the subclasses**. Never put a
  raw locator in the spec, and never branch on platform in the spec.
- **Fluent navigation:** a flow method that leaves a screen returns the next page via its factory
  (e.g. `login()` → `homePage(this.mobile, this.projectName)`). Base constructors take
  `(mobile, projectName)` so they can build the next page; subclasses inherit that constructor.
- The factories in `pages/index.ts` (`loginPage`, `homePage`, `searchCataloguePage`, `cartPage`) pick
  the subclass by **`testInfo.project.name`** ('android' | 'ios'). Pass `testInfo.project.name` from
  the spec; the `mobile` fixture has no `.platform`.
- **Locator strategy by platform:** Android fields have no id → `getByXpath`/`getByUiSelector`;
  iOS exposes accessibility ids → `getById`. (These came from real codegen recordings — keep verbatim.)
- App ids: Android `com.taqelah.demo_app`; iOS `com.taqelah.demoApp` (camelCase).
- Fresh state is config-driven (`resetBetweenTests` + `buildPath`); no `beforeEach`.
- App binaries are committed in-repo under `app/`; `buildPath` points at `./app/…` (self-contained).

## Commands

```bash
nvm use 24 && npm install
npm run test:android        # same spec, Android page object
npm run test:ios            # same spec, iOS page object (macOS)
npx taqwright test --list   # one spec under [android] and [ios]
```
