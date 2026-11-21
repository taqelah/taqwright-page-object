# CLAUDE.md — taqelah-demo-app-page-object

> Claude Code loads this file at the start of every session. Keep it short and current.
> Detailed rules live in **`.claude/rules/`**; the per-layer files there are scoped to the code they
> apply to.

## What this is

The **Page Object pattern**, cross-platform: each **screen** is one class (`LoginPage`, `HomePage`,
`SearchCataloguePage`, `CartPage`, `SideMenuPage`, `GesturesPage`) that `extends Screen` from
taqwright. Its locators are `accessor` fields decorated with `@AndroidFindBy` / `@iOSFindBy`
(Appium-Java style), and the running session's platform picks the locator. The flow is written once
in the same class. Every flow method returns the **next** page object, so the spec chains
screen-to-screen. Every spec runs on **both** the `android` and `ios` projects against
`taqelah/demo-app`. taqwright = Playwright runner + flat `mobile` API on Appium 3.x.

- **TypeScript only**; each screen has its own subfolder under `pages/` holding one `XxxPage.ts`;
  specs in `tests/`.
- `Screen`, `AndroidFindBy`, `iOSFindBy`, `FindBy` and `Locator` are exported from `taqwright`.
  Declare locators as `accessor name!: Locator`. A plain `name!:` field fails to compile under
  Playwright 1.65+ with this repo's ES2022 target.

## Conventions (don't break these)

- **Selectors live only in decorators; flow lives in methods.** Never put a raw locator in a spec or
  a flow method, and never branch on platform anywhere.
- **Fluent navigation:** a flow method that leaves a screen returns the next page
  (e.g. `login()` → `return new HomePage(this.mobile)`). Specs build only the entry page:
  `new LoginPage(mobile)`.
- **Locator strategy by platform:** Android fields have no id → `xpath` / `uiAutomator`;
  iOS exposes accessibility ids → `id`. (These came from real codegen recordings — keep verbatim.)
- A screen recorded on one platform only gets one decorator. Using it on the other platform throws
  `XxxPage.field has no iOS locator`. Don't guess the missing selector.
- App ids: Android `com.taqelah.demo_app`; iOS `com.taqelah.demoApp` (camelCase).
- Fresh state is config-driven (`resetBetweenTests` + `buildPath`); no `beforeEach`.
- App binaries are committed in-repo under `app/`; `buildPath` points at `./app/…` (self-contained).

## Commands

```bash
nvm use 24 && npm install   # taqwright needs node >= 24
npm run typecheck           # tsc --noEmit — run before every commit
npx taqwright test --list   # every spec under [android] and [ios] — no device needed
npm run test:android        # same spec, Android page object (emulator booted)
npm run test:ios            # same spec, iOS page object (macOS)
```

## Rule files (`.claude/rules/`)

- `architecture.md` — layer model, the hard cross-cutting rules, adding a screen (always loaded).
- `page-objects.md` — page class shape, decorators, fluent navigation (scoped to `pages/`).
- `locators.md` — per-platform decorator strategy, codegen provenance (scoped to `pages/`).
- `writing-tests.md` — spec pattern + checklist (scoped to `tests/`).
- `build-run-git.md` — node version, commands, config gotchas, style & git (always loaded).

`.claude/settings.json` holds shared permissions; put personal overrides in
`.claude/settings.local.json` (gitignored).
