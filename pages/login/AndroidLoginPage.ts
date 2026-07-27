import type { Locator } from 'taqwright';
import { LoginPage } from './LoginPage';

// Android locators (recorded with codegen). The fields have no accessibility id, so we use the
// xpath/UiSelector escape hatches; the button exposes a content-desc → UiSelector().description(...).
export class AndroidLoginPage extends LoginPage {
  protected usernameField(): Locator {
    return this.mobile.getByXpath("//*[@hint='Username']");
  }
  protected passwordField(): Locator {
    return this.mobile.getByXpath("//*[@hint='Password']");
  }
  protected loginButton(): Locator {
    return this.mobile.getByUiSelector('new UiSelector().description("Login")');
  }
}
