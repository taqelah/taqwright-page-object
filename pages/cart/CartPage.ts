import { type Mobile, type Locator } from 'taqwright';

// Page Object for the CART screen — the end of the flow. It exposes the checkout button as a public
// locator so the SPEC owns the assertion (page object = elements, test = expectations).
export abstract class CartPage {
  constructor(
    protected readonly mobile: Mobile,
    protected readonly projectName: string,
  ) {}

  // ── platform-specific locator — provided by AndroidCartPage / IosCartPage; the spec asserts on it ──
  abstract proceedToCheckout(): Locator;
}
