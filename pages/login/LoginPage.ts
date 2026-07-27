import { type Mobile, type Locator } from 'taqwright';
import type { HomePage } from '../home/HomePage';
import { homePage } from '../index';

// Page Object for the LOGIN screen. The flow is identical on Android and iOS — only the LOCATORS
// differ — so the flow lives here (concrete methods) and the locators are abstract getters the
// platform subclasses fill in. `login()` returns the next screen (HomePage) so specs read as a
// fluent chain and never touch a raw locator.
export abstract class LoginPage {
  constructor(
    protected readonly mobile: Mobile,
    protected readonly projectName: string,
  ) {}

  // ── platform-specific locators — provided by AndroidLoginPage / IosLoginPage ──
  protected abstract usernameField(): Locator;
  protected abstract passwordField(): Locator;
  protected abstract loginButton(): Locator;

  // ── shared flow — same on both platforms ──
  async login(username: string, password: string): Promise<HomePage> {
    await this.usernameField().fill(username);
    await this.passwordField().fill(password);
    await this.loginButton().click();
    return homePage(this.mobile, this.projectName);
  }
}
