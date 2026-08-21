import type { Locator } from 'taqwright';
import { SideMenuPage } from './SideMenuPage';

// iOS not recorded for this flow — required throwing stub per ADAPT.md
export class IosSideMenuPage extends SideMenuPage {
  protected gesturesMenuItem(): Locator {
    throw new Error('IosSideMenuPage.gesturesMenuItem not implemented — record this flow on iOS to capture its locator');
  }
}
