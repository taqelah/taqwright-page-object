---
paths:
  - "tests/**"
---

# Writing a spec

Specs live in `tests/*.spec.ts`, import `test` / `expect` from `taqwright`, and import **factories**
from `../pages`. One spec runs on **both** projects (`android` and `ios`) — the factory resolves the
platform from `testInfo.project.name`. See `tests/add-to-cart.spec.ts`:

```ts
import { test, expect } from 'taqwright';
import { loginPage } from '../pages';

test('search a dress and add it to the cart', async ({ mobile }, testInfo) => {
  const home    = await loginPage(mobile, testInfo.project.name).login('emma@demoapp.com', '10203040');
  const catalog = await home.openCatalog();
  const cart    = await catalog.searchAndAddToCart('black');

  // The page object exposes the locator; the SPEC owns the assertion.
  await expect(cart.proceedToCheckout()).toBeVisible({ timeout: 20_000 });
});
```

## The shape

- Signature is `async ({ mobile }, testInfo) => { … }` — `testInfo` is the **second** parameter.
- Only the **entry** page is built from a factory. Every screen after it comes from the previous
  screen's flow method — assign each to a `const` and read the chain top to bottom.
- The `mobile` fixture has **no** `.platform` property. Platform comes from `testInfo.project.name`
  (`'android' | 'ios'`), and it is only ever passed *into* a factory — never compared in the spec.

## Assertions

Assertions belong here, not in the page object. `expect` a **locator** the page object exposes
publicly, and pass an explicit `timeout` for anything that follows a screen transition — the config's
`expectTimeout` is 30 s, but a tighter local value documents the intent.

## Fresh state

Do **not** write `beforeEach` / `afterEach` app-reset hooks. Fresh state is config-driven:
`resetBetweenTests: true` + `buildPath` in `taqwright.config.ts` reinstall the app per test.

## Adding a spec

New file `tests/<flow>.spec.ts`. It is picked up by **both** projects automatically — there is one
shared `testDir`. Verify with `npx taqwright test --list`: the test must appear twice, once under
`[android]` and once under `[ios]`.

Credentials for the demo app: `emma@demoapp.com` / `10203040`.

## Checklist

- [ ] File is `tests/<name>.spec.ts`; imports `test`, `expect` from `taqwright`.
- [ ] Page objects reached only via factories from `../pages` — no deep imports of a concrete
      `Android*` / `Ios*` class.
- [ ] **No raw locators** (`getById`, `getByXpath`, `getByUiSelector`) anywhere in the spec.
- [ ] **No platform branching** — `testInfo.project.name` is passed to the factory, never compared.
- [ ] Screens after the first come from flow-method return values, not fresh factory calls.
- [ ] Assertions are in the spec, on a public locator getter.
- [ ] No `beforeEach` app reset.
- [ ] `npx taqwright test --list` shows the test under both `[android]` and `[ios]`.
