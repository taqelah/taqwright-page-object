import type { Locator } from 'taqwright';
import { HomePage } from './HomePage';

// Android locators (recorded with codegen). The button exposes a content-desc →
// UiSelector().description(...).
export class AndroidHomePage extends HomePage {
  protected viewAllButton(): Locator {
    return this.mobile.getByUiSelector('new UiSelector().description("View All")');
  }
}
