import type { Locator } from 'taqwright';
import { CartPage } from './CartPage';

// Android locators (recorded with codegen). The button exposes a content-desc →
// UiSelector().description(...).
export class AndroidCartPage extends CartPage {
  proceedToCheckout(): Locator {
    return this.mobile.getByUiSelector('new UiSelector().description("Proceed to Checkout")');
  }
}
