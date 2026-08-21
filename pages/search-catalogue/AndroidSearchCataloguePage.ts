import type { Locator } from 'taqwright';
import { SearchCataloguePage } from './SearchCataloguePage';

// Android locators (recorded with codegen). The search box is a bare EditText (no id); the cards and
// buttons expose content-descs → UiSelector().description(...) / descriptionContains(...).
export class AndroidSearchCataloguePage extends SearchCataloguePage {
  protected searchField(): Locator {
    // Use a class-based EditText xpath which is more robust than a literal hint string
    return this.mobile.getByXpath("//android.widget.EditText");
  }
  protected productCard(): Locator {
    // Match any product description containing 'Black' — more robust than exact phrase
    return this.mobile.getByUiSelector('new UiSelector().descriptionContains("Black")');
  }
  protected addToCartButton(): Locator {
    return this.mobile.getByUiSelector('new UiSelector().description("Add to Cart")');
  }
  protected viewCartButton(): Locator {
    return this.mobile.getByUiSelector('new UiSelector().description("VIEW CART")');
  }
}
