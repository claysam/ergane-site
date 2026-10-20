# Ergane website

The website for Ergane, at `https://ergane.works`. GitHub Pages serves it from the `main` branch.

Plain files only: no build step, no cookies and nothing loaded from another site. The one script is the club join page, below.

| File | What it is |
| --- | --- |
| `index.html` | The home page |
| `privacy/index.html` | The privacy policy, at `/privacy`. Made by a script. Do not edit it by hand. |
| `404.html` | Shown for a page that does not exist. It also draws the club join page. |
| `assets/join.js`, `assets/join-config.js` | The club join page, at `/join/<handle>`. See below. |
| `styles.css` | Colours and layout, in the owl's palette |
| `assets/` | The owl and wordmark, copied from the app's `assets/brand/source` |
| `.well-known/apple-app-site-association` | Tells iOS to open `/join/<handle>` in the app, through Universal Links |
| `CNAME` | Tells GitHub Pages the site's domain |
| `.nojekyll` | Tells GitHub Pages to serve the files as they are |

## To change the privacy policy

1. In the app's repository, edit `privacy-policy.json`. Change `effectiveDate` too.
2. There, run `npm run privacy:site`. It writes `privacy/index.html` here.
3. Here, commit and push. The site updates in about a minute.

## To see the site on this computer

```
npx serve .
```

This starts a small web server and prints an address to open in a browser.

## The club join page

Roadmap Phase 6, item 12, in the app's repository. A club's QR code leads to `ergane.works/join/<handle>`. GitHub Pages has no file there, so it serves `404.html`, and `assets/join.js` draws the club's card instead of "Page not found". It asks the server's `join-card` function for the club's name and photo, and nothing else. The page asks search engines not to list it.

On an iPhone with Ergane, iOS opens the club in the app instead, through Universal Links: `.well-known/apple-app-site-association` names the app. GitHub Pages serves the dot folder because of `.nojekyll`. For everyone else the page shows a button to the TestFlight beta, and **Open in Ergane** as a fallback. After the App Store release, the button leads to the App Store instead, with a line for Android.

It waits on the `join-page` branch until "Club join links" in the app's `docs/beta-launch.md`:

1. In `.well-known/apple-app-site-association`, replace `TEAMID` with the Apple Team ID.
2. In `assets/join-config.js`, put the cloud project's address and publishable key.
3. In `assets/join.js`, put the TestFlight public link in `BETA_LINK`. Leave `APP_STORE_ID` blank.
4. Merge `join-page` into `main`, then push.

On App Store release day, step 16 in the app's `docs/launch-checklist.md`:

1. In `assets/join.js`, put Ergane's Apple ID in `APP_STORE_ID`. The button now says **Get Ergane on the App Store**, and TestFlight goes from the page.
2. In `index.html`, change "Coming soon to iPhone and Android" to "On iPhone now. Android comes later." and add the App Store button under it.
3. Commit and push.

To try it on the laptop, start the local server in the app's repository, serve this folder with a server that answers unknown paths with `404.html`, and open `/join/hackney_clay`. `docs/local-server.md` in the app's repository gives the steps.
