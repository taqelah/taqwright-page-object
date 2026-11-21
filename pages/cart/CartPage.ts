import { Screen, AndroidFindBy, iOSFindBy, type Locator } from 'taqwright';

// Page Object for the CART screen — the end of the flow. It exposes the checkout button as a public
// locator so the SPEC owns the assertion (page object = elements, test = expectations).
//
// Locators recorded with codegen. Android: content-desc → UiSelector().description(...).
// iOS: accessibility id.
export class CartPage extends Screen {
  // ── locators — public, the spec asserts on it ──
  @AndroidFindBy({ uiAutomator: 'new UiSelector().description("Proceed to Checkout")' })
  @iOSFindBy({ id: 'Proceed to Checkout' })
  accessor proceedToCheckout!: Locator;
}
