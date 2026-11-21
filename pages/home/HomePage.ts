import { Screen, AndroidFindBy, iOSFindBy, type Locator } from 'taqwright';
import { SearchCataloguePage } from '../search-catalogue/SearchCataloguePage';
import { SideMenuPage } from '../side-menu/SideMenuPage';

// Page Object for the HOME screen (after login). `openCatalog()` taps "View All" and returns the
// catalogue screen, so specs keep chaining without ever seeing a raw locator.
//
// Locators recorded with codegen. Android: content-desc → UiSelector().description(...).
// iOS: accessibility id. The navigation menu was recorded on Android only — it has no iOS locator
// yet, so using it on iOS throws "HomePage.openNavigationMenuButton has no iOS locator".
export class HomePage extends Screen {
  // ── locators — one decorator per platform ──
  @AndroidFindBy({ uiAutomator: 'new UiSelector().description("View All")' })
  @iOSFindBy({ id: 'View All' })
  protected accessor viewAllButton!: Locator;

  @AndroidFindBy({ uiAutomator: 'new UiSelector().description("Open navigation menu")' })
  protected accessor openNavigationMenuButton!: Locator;

  // ── shared flow — same on both platforms ──
  async openCatalog(): Promise<SearchCataloguePage> {
    await this.viewAllButton.click();
    return new SearchCataloguePage(this.mobile);
  }

  async openNavigationMenu(): Promise<SideMenuPage> {
    await this.openNavigationMenuButton.click();
    return new SideMenuPage(this.mobile);
  }
}
