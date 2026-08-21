import type { Locator } from 'taqwright';
import { GesturesPage } from './GesturesPage';

// iOS not recorded for this flow — required throwing stubs per ADAPT.md
export class IosGesturesPage extends GesturesPage {
  protected swipeCard1(): Locator {
    throw new Error('IosGesturesPage.swipeCard1 not implemented — record this flow on iOS to capture its locator');
  }

  protected swipeCard2(): Locator {
    throw new Error('IosGesturesPage.swipeCard2 not implemented — record this flow on iOS to capture its locator');
  }

  protected dragItem1(): Locator {
    throw new Error('IosGesturesPage.dragItem1 not implemented — record this flow on iOS to capture its locator');
  }

  protected dragItem4(): Locator {
    throw new Error('IosGesturesPage.dragItem4 not implemented — record this flow on iOS to capture its locator');
  }
}
