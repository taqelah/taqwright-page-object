import { fileURLToPath } from 'node:url';
import { defineConfig, Platform } from 'taqwright';

// Page Object lab — TWO projects sharing ONE testDir, so the single add-to-cart.spec.ts runs on
// both. The spec picks the right page object (Android vs iOS) from the project name.
//   npx taqwright test --project android
//   npx taqwright test --project ios

// The build path is handed to Appium as-is, and Appium resolves it against ITS OWN cwd — which is
// not this repo when the runner attaches to an already-running server. Resolve the committed
// binaries under app/ to absolute paths here so the project stays self-contained either way.
const appPath = (file: string): string => fileURLToPath(new URL(`./app/${file}`, import.meta.url));
export default defineConfig({
  testDir: './tests',
  timeout: 60_000,
  expectTimeout: 30_000,
  reporter: [['list'], ['html', { open: 'never' }]],

  projects: [
    {
      name: 'android',
      use: {
        platform: Platform.ANDROID,
        resetBetweenTests: true,
        buildPath: appPath('DemoApp-v1.0.0.apk'),
        appBundleId: 'com.taqelah.demo_app',
        device: { provider: 'emulator', autoDiscover: true, orientation: 'portrait' },
        appium: { autoStart: true, host: 'localhost', port: 4723, path: '/' },
        trace: 'on-failure',
      },
    },
    {
      name: 'ios',
      use: {
        platform: Platform.IOS,
        resetBetweenTests: true,
        buildPath: appPath('DemoApp-v1.1.0-debug-ios.app.zip'),
        appBundleId: 'com.taqelah.demoApp',
        device: { provider: 'emulator', autoDiscover: true, orientation: 'portrait' },
        appium: { autoStart: true, host: 'localhost', port: 4723, path: '/' },
        trace: 'on-failure',
      },
    },
  ],
});
