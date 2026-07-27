import type { Locator } from 'taqwright';
import { SearchCataloguePage } from './SearchCataloguePage';

// iOS locators (recorded with codegen). Every element exposes an accessibility id → clean getById(...).
export class IosSearchCataloguePage extends SearchCataloguePage {
  protected searchField(): Locator {
    return this.mobile.getById('Search dresses...');
  }
  protected productCard(): Locator {
    return this.mobile.getById('Black Sequin Mini\n$119.99');
  }
  protected addToCartButton(): Locator {
    return this.mobile.getById('Add to Cart');
  }
  protected viewCartButton(): Locator {
    return this.mobile.getById('VIEW CART');
  }
}
