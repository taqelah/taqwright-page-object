import type { Locator } from 'taqwright';
import { LoginPage } from './LoginPage';

// iOS locators (recorded with codegen). On iOS the elements expose accessibility ids, so every
// locator is a clean getById(...) — the same flow, much tidier locators than Android.
export class IosLoginPage extends LoginPage {
  protected usernameField(): Locator {
    return this.mobile.getById('Username');
  }
  protected passwordField(): Locator {
    return this.mobile.getById('Password');
  }
  protected loginButton(): Locator {
    return this.mobile.getById('Login');
  }
}
