import { type Mobile, type Locator } from 'taqwright';
import type { SearchCataloguePage } from '../search-catalogue/SearchCataloguePage';
import { searchCataloguePage } from '../index';
import type { SideMenuPage } from '../side-menu/SideMenuPage';
import { sideMenuPage } from '../index';

// Page Object for the HOME screen (after login). `openCatalog()` taps "View All" and returns the
// catalogue screen, so specs keep chaining without ever seeing a raw locator.
export abstract class HomePage {
  constructor(
    protected readonly mobile: Mobile,
    protected readonly projectName: string,
  ) {}

  // ── platform-specific locators — provided by AndroidHomePage / IosHomePage ──
  protected abstract viewAllButton(): Locator;
  protected abstract openNavigationMenuButton(): Locator;

  // ── shared flow — same on both platforms ──
  async openCatalog(): Promise<SearchCataloguePage> {
    await this.viewAllButton().click();
    return searchCataloguePage(this.mobile, this.projectName);
  }

  async openNavigationMenu(): Promise<SideMenuPage> {
    await this.openNavigationMenuButton().click();
    return sideMenuPage(this.mobile, this.projectName);
  }
}
