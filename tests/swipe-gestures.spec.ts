import { test } from 'taqwright';
import { loginPage } from '../pages';

// SWIPE gestures, recorded on Android. Sign in, open the side menu and reach the Gestures screen
// (LoginPage → HomePage → SideMenuPage → GesturesPage), then swipe the two demo cards.
test('swipe the gesture cards left and right', async ({ mobile }, testInfo) => {
  const home = await loginPage(mobile, testInfo.project.name).login('emma@demoapp.com', '10203040');
  const side = await home.openNavigationMenu();
  const gestures = await side.openGestures();

  // Perform recorded gestures: swipe left on Card 1, swipe right on Card 2
  await gestures.swipeLeftOnCard1();
  await gestures.swipeRightOnCard2();
});
