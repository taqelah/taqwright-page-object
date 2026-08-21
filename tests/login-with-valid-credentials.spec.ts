import { test, expect } from 'taqwright';

test("sign in with valid credentials", async ({ mobile }) => {
  // type "emma@demoapp.com" in Username
  await mobile.getByPlaceholder("Username").fill("emma@demoapp.com");
  // type "10203040" in Password
  await mobile.getByPlaceholder("Password").fill("10203040");
  // tap Login
  await mobile.getByLabel("Login").click();
  // check "New Collection" is visible
  await expect(mobile.getByUiSelector("new UiSelector().descriptionContains(\"Everyday comfort & style\")")).toBeVisible();
});
