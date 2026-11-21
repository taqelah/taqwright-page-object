import { Screen, AndroidFindBy, type Locator } from 'taqwright';

// Gestures screen: swipes on the demo cards and a locator-to-locator drag.
//
// Recorded on Android only (accessibility id → UiSelector().description(...), verbatim). No iOS
// locators yet — record the flow on iOS and add @iOSFindBy; until then, using them on iOS throws a
// clear "GesturesPage.<field> has no iOS locator".
export class GesturesPage extends Screen {
  // ── locators ──
  @AndroidFindBy({ uiAutomator: 'new UiSelector().description("Swipe Card 1")' })
  protected accessor swipeCard1!: Locator;

  @AndroidFindBy({ uiAutomator: 'new UiSelector().description("Swipe Card 2")' })
  protected accessor swipeCard2!: Locator;

  // the dragged item and the drop target — the drag runs locator-to-locator between them
  @AndroidFindBy({ uiAutomator: 'new UiSelector().descriptionContains("Drag Item 1")' })
  protected accessor dragItem1!: Locator;

  @AndroidFindBy({ uiAutomator: 'new UiSelector().descriptionContains("Drag Item 4")' })
  protected accessor dragItem4!: Locator;

  // ── shared flow — same on both platforms ──
  async swipeLeftOnCard1(): Promise<void> {
    await this.swipeCard1.swipeLeft();
  }

  async swipeRightOnCard2(): Promise<void> {
    await this.swipeCard2.swipeRight();
  }

  async dragItem1ToItem4(): Promise<void> {
    // Recorded gesture: drag and drop, locator to locator — never pixel coordinates
    await this.dragItem1.dragTo(this.dragItem4);
  }
}
