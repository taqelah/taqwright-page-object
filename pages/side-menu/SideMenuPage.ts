import { type Mobile, type Locator } from 'taqwright';
import type { GesturesPage } from '../gestures/GesturesPage';
import { gesturesPage } from '../index';

// Side menu page object: exposes the menu items and navigation flow to other screens.
export abstract class SideMenuPage {
  constructor(
    protected readonly mobile: Mobile,
    protected readonly projectName: string,
  ) {}

  // ── platform-specific locators — provided by AndroidSideMenuPage / IosSideMenuPage ──
  protected abstract gesturesMenuItem(): Locator;

  // ── shared flow — same on both platforms ──
  async openGestures(): Promise<GesturesPage> {
    await this.gesturesMenuItem().click();
    return gesturesPage(this.mobile, this.projectName);
  }
}
