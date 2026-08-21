import { test } from 'taqwright';
import { Eyes, Target } from '@applitools/eyes-images';
import { loginPage } from '../pages';

// DRAG & DROP gesture, recorded on Android. Sign in, open the side menu, go to the Gestures screen
// and drag "Drag Item 1" onto "Drag Item 4", then confirm the reorder with an Applitools Eyes
// visual checkpoint. The flow chains page objects (LoginPage → HomePage → SideMenuPage →
// GesturesPage); the drag runs locator-to-locator, never on pixel coordinates.
test('drag a gesture item onto another and verify the reorder', async ({ mobile }, testInfo) => {
  const eyes = new Eyes();
  eyes.setApiKey(process.env.APPLITOOLS_API_KEY || '');
  await eyes.open('taqelah/demo-app', 'drag and drop reorder');

  try {
    const home = await loginPage(mobile, testInfo.project.name).login('emma@demoapp.com', '10203040');
    const side = await home.openNavigationMenu();
    const gestures = await side.openGestures();

    // Recorded gesture: drag "Drag Item 1" onto "Drag Item 4".
    await gestures.dragItem1ToItem4();

    // Recorded VISUAL_VERIFY step — a real Eyes baseline comparison of the reordered list.
    await eyes.check('Gestures - Drag & Drop Reorder', Target.image(await mobile.screenshot()));
  } finally {
    // close(false) reports a visual mismatch without failing the run.
    await eyes.close(false);
  }
});
