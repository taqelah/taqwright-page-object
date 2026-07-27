import { defineConfig, Platform } from 'taqwright';

// Page Object lab — TWO projects sharing ONE testDir, so the single add-to-cart.spec.ts runs on
// both. The spec picks the right page object (Android vs iOS) from the project name.
//   npx taqwright test --project android
//   npx taqwright test --project ios
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
        buildPath: './app/DemoApp-v1.0.0.apk',
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
        buildPath: './app/DemoApp-v1.1.0-debug-ios.app.zip',
        appBundleId: 'com.taqelah.demoApp',
        device: { provider: 'emulator', autoDiscover: true, orientation: 'portrait' },
        appium: { autoStart: true, host: 'localhost', port: 4723, path: '/' },
        trace: 'on-failure',
      },
    },
  ],
});
