// One class per screen. Each extends taqwright's `Screen` and declares its locators with
// @AndroidFindBy / @iOSFindBy, so the running session's platform picks the locator — no
// per-platform subclasses and no factories. Specs build the entry page with `new LoginPage(mobile)`;
// every flow method returns the next page (LoginPage → HomePage → SearchCataloguePage → CartPage).
export { LoginPage } from './login/LoginPage';
export { HomePage } from './home/HomePage';
export { SearchCataloguePage } from './search-catalogue/SearchCataloguePage';
export { CartPage } from './cart/CartPage';
export { SideMenuPage } from './side-menu/SideMenuPage';
export { GesturesPage } from './gestures/GesturesPage';
