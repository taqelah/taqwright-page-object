import { test, expect } from 'taqwright';
import { LoginPage } from '../pages';

// ONE spec, BOTH platforms. Each SCREEN is its own page object — LoginPage → HomePage →
// SearchCataloguePage → CartPage — and every flow method returns the NEXT page, so the test reads as
// a fluent chain. Each page declares @AndroidFindBy / @iOSFindBy locators; the session picks.
// Run either target:
//   npx taqwright test --project android
//   npx taqwright test --project ios
// Notice the test body has NO raw locators and NO `if (android) … else …` — just the user flow.
test('search a dress and add it to the cart', async ({ mobile }) => {
  const home = await new LoginPage(mobile).login('emma@demoapp.com', '10203040');
  const catalog = await home.openCatalog();
  const cart = await catalog.searchAndAddToCart('black');

  // The page object exposes the locator; the SPEC owns the assertion.
  await expect(cart.proceedToCheckout).toBeVisible({ timeout: 20_000 });
});
