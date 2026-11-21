import { Screen, AndroidFindBy, iOSFindBy, type Locator } from 'taqwright';
import { HomePage } from '../home/HomePage';

// Page Object for the LOGIN screen. The flow is identical on Android and iOS — only the LOCATORS
// differ — so each element carries one decorator per platform and the session's platform picks.
// `login()` returns the next screen (HomePage) so specs read as a fluent chain.
//
// Locators recorded with codegen. Android: the fields have no accessibility id → xpath on the hint;
// the button exposes a content-desc → UiSelector().description(...). iOS: accessibility ids on
// everything → id.
export class LoginPage extends Screen {
  // ── locators — one decorator per platform ──
  @AndroidFindBy({ xpath: "//*[@hint='Username']" })
  @iOSFindBy({ id: 'Username' })
  protected accessor usernameField!: Locator;

  @AndroidFindBy({ xpath: "//*[@hint='Password']" })
  @iOSFindBy({ id: 'Password' })
  protected accessor passwordField!: Locator;

  @AndroidFindBy({ uiAutomator: 'new UiSelector().description("Login")' })
  @iOSFindBy({ id: 'Login' })
  protected accessor loginButton!: Locator;

  // public — the spec asserts on it after a rejected sign-in. Android: the banner is a content-desc
  // with a trailing hint line → match the stable prefix. iOS: the accessibility id really does
  // contain a newline and the demo-credentials hint — keep it verbatim.
  @AndroidFindBy({
    uiAutomator: 'new UiSelector().descriptionContains("Invalid username or password")',
  })
  @iOSFindBy({ id: 'Invalid username or password.\nHint: emma@demoapp.com / 10203040' })
  accessor invalidCredentialsError!: Locator;

  // ── shared flow — same on both platforms ──
  async login(username: string, password: string): Promise<HomePage> {
    await this.submitCredentials(username, password);
    return new HomePage(this.mobile);
  }

  // Same submit as login(), for credentials the app is expected to reject: the app stays on this
  // screen and surfaces invalidCredentialsError, so there is no next page to hand off to.
  async loginExpectingFailure(username: string, password: string): Promise<void> {
    await this.submitCredentials(username, password);
  }

  private async submitCredentials(username: string, password: string): Promise<void> {
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.loginButton.click();
  }
}
