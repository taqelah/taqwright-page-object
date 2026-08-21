import { test, expect } from 'taqwright';
import { loginPage } from '../pages';

// Negative LOGIN flow, recorded on Android: sign in with credentials the demo app does not know and
// confirm it stays on the login screen showing the invalid-credentials error. `loginExpectingFailure`
// returns nothing — there is no next screen — so the spec asserts on the page object's public error
// locator, whose per-platform selector each subclass supplies.
test('reject an unknown username and password', async ({ mobile }, testInfo) => {
  const login = loginPage(mobile, testInfo.project.name);
  await login.loginExpectingFailure('abc@sdsd.com', '12121');

  // The page object exposes the locator; the SPEC owns the assertion.
  await expect(login.invalidCredentialsError()).toBeVisible({ timeout: 20_000 });
});
