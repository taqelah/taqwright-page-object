import type { Locator } from 'taqwright';
import { HomePage } from './HomePage';

// iOS locators (recorded with codegen). The element exposes an accessibility id → clean getById(...).
export class IosHomePage extends HomePage {
  protected viewAllButton(): Locator {
    return this.mobile.getById('View All');
  }
}
