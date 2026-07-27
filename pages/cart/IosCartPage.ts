import type { Locator } from 'taqwright';
import { CartPage } from './CartPage';

// iOS locators (recorded with codegen). The element exposes an accessibility id → clean getById(...).
export class IosCartPage extends CartPage {
  proceedToCheckout(): Locator {
    return this.mobile.getById('Proceed to Checkout');
  }
}
