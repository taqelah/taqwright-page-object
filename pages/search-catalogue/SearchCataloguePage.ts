import { type Mobile, type Locator } from 'taqwright';
import type { CartPage } from '../cart/CartPage';
import { cartPage } from '../index';

// Page Object for the CATALOGUE / SEARCH screen. `searchAndAddToCart()` searches for a term, opens
// the product, adds it to the cart and opens the cart — returning the CartPage so specs keep chaining.
export abstract class SearchCataloguePage {
  constructor(
    protected readonly mobile: Mobile,
    protected readonly projectName: string,
  ) {}

  // ── platform-specific locators — provided by AndroidSearchCataloguePage / IosSearchCataloguePage ──
  protected abstract searchField(): Locator;
  protected abstract productCard(): Locator;
  protected abstract addToCartButton(): Locator;
  protected abstract viewCartButton(): Locator;

  // ── shared flow — same on both platforms ──
  // Public accessor for specs to assert on the search field if needed
  public searchBox(): Locator { return this.searchField(); }

  // Public accessor for specs to assert on a product card
  public productCardForSpec(): Locator { return this.productCard(); }

  // Search only: fill and press Enter (recorded flow uses ENTER)
  async search(term: string): Promise<void> {
    await this.searchField().fill(term);
    await this.searchField().press('Enter');
  }

  async searchAndAddToCart(term: string): Promise<CartPage> {
    await this.searchField().fill(term);
    await this.productCard().click();
    await this.addToCartButton().click();
    await this.viewCartButton().click();
    return cartPage(this.mobile, this.projectName);
  }
}
