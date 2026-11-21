import { Screen, AndroidFindBy, iOSFindBy, type Locator } from 'taqwright';
import { CartPage } from '../cart/CartPage';

// Page Object for the CATALOGUE / SEARCH screen. `searchAndAddToCart()` searches for a term, opens
// the product, adds it to the cart and opens the cart — returning the CartPage so specs keep chaining.
//
// Locators recorded with codegen. Android: the search box is a bare EditText (no id); cards and
// buttons expose content-descs → UiSelector().description(...) / descriptionContains(...).
// iOS: every element exposes an accessibility id — the placeholder text *is* the search box's id,
// and the product card's id really contains a newline and the price.
export class SearchCataloguePage extends Screen {
  // ── locators — one decorator per platform ──
  // public — specs may assert on the search box
  @AndroidFindBy({ xpath: '//android.widget.EditText' })
  @iOSFindBy({ id: 'Search dresses...' })
  accessor searchBox!: Locator;

  // public — the search spec asserts a result shows
  @AndroidFindBy({ uiAutomator: 'new UiSelector().descriptionContains("Black")' })
  @iOSFindBy({ id: 'Black Sequin Mini\n$119.99' })
  accessor productCard!: Locator;

  @AndroidFindBy({ uiAutomator: 'new UiSelector().description("Add to Cart")' })
  @iOSFindBy({ id: 'Add to Cart' })
  protected accessor addToCartButton!: Locator;

  @AndroidFindBy({ uiAutomator: 'new UiSelector().description("VIEW CART")' })
  @iOSFindBy({ id: 'VIEW CART' })
  protected accessor viewCartButton!: Locator;

  // ── shared flow — same on both platforms ──
  // Search only: fill and press Enter (recorded flow uses ENTER)
  async search(term: string): Promise<void> {
    await this.searchBox.fill(term);
    await this.searchBox.press('Enter');
  }

  async searchAndAddToCart(term: string): Promise<CartPage> {
    await this.searchBox.fill(term);
    await this.productCard.click();
    await this.addToCartButton.click();
    await this.viewCartButton.click();
    return new CartPage(this.mobile);
  }
}
