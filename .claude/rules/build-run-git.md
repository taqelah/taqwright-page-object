# Build, run & git rules

## Node version

`taqwright` requires **node >= 24**. `npm install` on an older node succeeds but prints
`EBADENGINE` — the test runner may then fail. Check first:

```bash
node -v          # must be >= 24
nvm use 24       # or any installed >= 24
```

## Commands

```bash
npm install
npm run typecheck            # tsc --noEmit — must pass before every commit
npx taqwright test --list    # cheap sanity check: 1 spec × 2 projects
npm run test:android         # the spec on Android (emulator must be booted)
npm run test:ios             # the same spec on iOS (macOS + simulator)
npx taqwright test           # both projects
npx taqwright devices        # what's connected
npx taqwright doctor         # environment diagnosis
npx taqwright inspect        # inspect a live screen — use this to fix a broken locator
```

`typecheck` and `test --list` need no device and are the right first checks after any edit. A full
run needs a booted emulator/simulator — ask before starting one.

## Config (`taqwright.config.ts`)

Two projects, `android` and `ios`, sharing **one** `testDir` (`./tests`) — that is what makes a
single spec run on both. When editing:

- `buildPath` is relative to the project root and points **into this repo**: `./app/…`. The binaries
  are committed under `app/`, so the project is self-contained — don't repoint it outside the repo.
- App ids differ and are easy to typo: Android `com.taqelah.demo_app` (snake_case),
  iOS `com.taqelah.demoApp` (camelCase).
- Keep `resetBetweenTests: true` — the specs rely on it instead of `beforeEach` hooks.
- Project names `'android'` / `'ios'` are load-bearing: `pages/index.ts` matches on the exact string
  `'ios'`. Renaming a project silently routes every screen to the Android subclass.

## Code style

- TypeScript, ES modules, `strict: true`. 2-space indent, single quotes, semicolons, trailing commas.
- Numeric separators for timeouts: `60_000`, not `60000`.
- Each file opens with a short `//` comment saying what the screen is and what the flow does — match
  the existing density; don't strip them.

## Git

- `app/*.apk` and `app/*.app.zip` are **committed on purpose** (`!app/…` exceptions in
  `.gitignore`) so a clone can run without downloading anything. Don't add new binaries — the repo
  is already ~113 MB and GitHub warns above 50 MB per file.
- `playwright-report/`, `test-results/` and `node_modules/` are generated — never commit them.
- Commit the `package-lock.json` change whenever `package.json` changes.
- Ask before `git push`, and never force-push `main`.
