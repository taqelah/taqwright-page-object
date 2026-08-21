import { type Mobile, type Locator } from 'taqwright';

// Gestures screen: provides methods to perform swipes on recorded cards.
export abstract class GesturesPage {
  constructor(
    protected readonly mobile: Mobile,
    protected readonly projectName: string,
  ) {}

  // ── platform-specific locators — provided by AndroidGesturesPage / IosGesturesPage ──
  protected abstract swipeCard1(): Locator;
  protected abstract swipeCard2(): Locator;
  // the dragged item and the drop target — the drag runs locator-to-locator between them
  protected abstract dragItem1(): Locator;
  protected abstract dragItem4(): Locator;

  // ── shared flow — same on both platforms ──
  async swipeLeftOnCard1(): Promise<void> {
    // Use the project's Locator interaction helper — recorded gesture: left
    await this.swipeCard1().swipeLeft();
  }

  async swipeRightOnCard2(): Promise<void> {
    // Use the project's Locator interaction helper — recorded gesture: right
    await this.swipeCard2().swipeRight();
  }

  async dragItem1ToItem4(): Promise<void> {
    // Recorded gesture: drag and drop, locator to locator — never pixel coordinates
    await this.dragItem1().dragTo(this.dragItem4());
  }
}
