import type { Locator } from 'taqwright';
import { GesturesPage } from './GesturesPage';

// Android locators (recorded with codegen). Map recorded accessibilityId to UiSelector().description(...)
export class AndroidGesturesPage extends GesturesPage {
  protected swipeCard1(): Locator {
    return this.mobile.getByUiSelector('new UiSelector().description("Swipe Card 1")');
  }

  protected swipeCard2(): Locator {
    return this.mobile.getByUiSelector('new UiSelector().description("Swipe Card 2")');
  }

  protected dragItem1(): Locator {
    return this.mobile.getByUiSelector('new UiSelector().descriptionContains("Drag Item 1")');
  }

  protected dragItem4(): Locator {
    return this.mobile.getByUiSelector('new UiSelector().descriptionContains("Drag Item 4")');
  }
}
