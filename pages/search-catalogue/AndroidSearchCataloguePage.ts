import type { Locator } from 'taqwright';
import { SearchCataloguePage } from './SearchCataloguePage';

// Android locators (recorded with codegen). The search box is a bare EditText (no id); the cards and
// buttons expose content-descs → UiSelector().description(...) / descriptionContains(...).
export class AndroidSearchCataloguePage extends SearchCataloguePage {
  protected searchField(): Locator {
    return this.mobile.getByUiSelector('new UiSelector().className("android.widget.EditText")');
  }
  protected productCard(): Locator {
    return this.mobile.getByUiSelector('new UiSelector().descriptionContains("Black Sequin Mini")');
  }
  protected addToCartButton(): Locator {
    return this.mobile.getByUiSelector('new UiSelector().description("Add to Cart")');
  }
  protected viewCartButton(): Locator {
    return this.mobile.getByUiSelector('new UiSelector().description("VIEW CART")');
  }
}
