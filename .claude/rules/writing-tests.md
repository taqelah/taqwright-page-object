---
paths:
  - "tests/**"
---

# Writing a spec

Specs live in `tests/*.spec.ts`, import `test` / `expect` from `taqwright`, and import **page
classes** from `../pages`. One spec runs on **both** projects (`android` and `ios`). The page's
decorators pick each locator from the session's platform. See `tests/add-to-cart.spec.ts`:

```ts
import { test, expect } from 'taqwright';
import { LoginPage } from '../pages';

test('search a dress and add it to the cart', async ({ mobile }) => {
  const home    = await new LoginPage(mobile).login('emma@demoapp.com', '10203040');
  const catalog = await home.openCatalog();
  const cart    = await catalog.searchAndAddToCart('black');

  // The page object exposes the locator; the SPEC owns the assertion.
  await expect(cart.proceedToCheckout).toBeVisible({ timeout: 20_000 });
});
```

## The shape

- Signature is `async ({ mobile }) => { … }`.
- Only the **entry** page is constructed (`new LoginPage(mobile)`). Every screen after it comes from
  the previous screen's flow method — assign each to a `const` and read the chain top to bottom.
- Never look at the platform in a spec. The page's decorators already handle it.

## Assertions

Assertions belong here, not in the page object. `expect` a **locator field** the page object exposes
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
- [ ] Page classes imported from `../pages` — only the entry page is constructed in the spec.
- [ ] **No raw locators** (`getById`, `getByXpath`, `getByUiSelector`) anywhere in the spec.
- [ ] **No platform branching** of any kind.
- [ ] Screens after the first come from flow-method return values, not fresh `new` calls.
- [ ] Assertions are in the spec, on a public locator field.
- [ ] No `beforeEach` app reset.
- [ ] `npx taqwright test --list` shows the test under both `[android]` and `[ios]`.
