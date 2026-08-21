import type { Locator } from 'taqwright';
import { SideMenuPage } from './SideMenuPage';

// Android locators for the side menu. Recorded value used verbatim (content-desc → UiSelector).
export class AndroidSideMenuPage extends SideMenuPage {
  protected gesturesMenuItem(): Locator {
    return this.mobile.getByUiSelector('new UiSelector().description("Gestures")');
  }
}
