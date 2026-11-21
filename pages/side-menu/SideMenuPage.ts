import { Screen, AndroidFindBy, type Locator } from 'taqwright';
import { GesturesPage } from '../gestures/GesturesPage';

// Side menu page object: exposes the menu items and navigation flow to other screens.
//
// Recorded on Android only (content-desc → UiSelector, verbatim). No iOS locator yet — record the
// flow on iOS and add an @iOSFindBy; until then, using it on iOS throws a clear "no iOS locator".
export class SideMenuPage extends Screen {
  // ── locators ──
  @AndroidFindBy({ uiAutomator: 'new UiSelector().description("Gestures")' })
  protected accessor gesturesMenuItem!: Locator;

  // ── shared flow — same on both platforms ──
  async openGestures(): Promise<GesturesPage> {
    await this.gesturesMenuItem.click();
    return new GesturesPage(this.mobile);
  }
}
