import { test, expect } from 'taqwright';
import { loginPage } from '../pages';

// CATALOGUE SEARCH, recorded on Android. Sign in, tap "View All" to reach the catalogue
// (LoginPage → HomePage → SearchCataloguePage) and search for a term, then assert a result shows.
test('search the catalogue for a dress', async ({ mobile }, testInfo) => {
  const home = await loginPage(mobile, testInfo.project.name).login('emma@demoapp.com', '10203040');
  const catalog = await home.openCatalog();

  // Recorded flow: type "black dress" into the search box and press Enter.
  await catalog.search('black dress');

  // Assert that a product result is visible after search (use public accessor added to page object).
  await expect(catalog.productCardForSpec()).toBeVisible({ timeout: 20_000 });
});
