# Demo app binaries 📦

Prebuilt **`taqelah/demo-app`** binaries, shared across all sessions/labs so you don't have to
download them per lab. Source: the [v1.0.0 GitHub release](https://github.com/taqelah/demo-app/releases/tag/v1.0.0).

| File | Platform | Use |
| --- | --- | --- |
| `DemoApp-v1.0.0.apk` | Android | `adb install -r app/DemoApp-v1.0.0.apk`, or point a lab's `buildPath` here |
| `DemoApp-v1.1.0-debug-ios.app.zip` | iOS (simulator) | unzip → `DemoApp.app`, install on a booted simulator |

- App package (Android): `com.taqelah.demo_app`
- Login: `emma@demoapp.com` / `10203040`

> These binaries are **committed on purpose** (see the `!app/...` exceptions in the repo-root
> `.gitignore`) so the labs are self-contained. They're large (~108 MB total) — prefer the
> APK URL or Git LFS if repo size becomes a concern.

## Using from a lab

```bash
# Android — install directly
adb install -r app/DemoApp-v1.0.0.apk

# taqwright project with buildPath (reinstall each test): point at this file, e.g.
#   buildPath: './app/DemoApp-v1.0.0.apk'
```
