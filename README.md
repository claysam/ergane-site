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

**It is not live.** It waits on the `join-page` branch, which is never pushed or merged before go-live (roadmap Phase 5, item 12) and the privacy policy rewrite (item 11). At go-live:

1. In `assets/join-config.js`, put the cloud project's address and publishable key.
2. In `assets/join.js`, point **App Store** and **Google Play** at the store listings. Until then they lead to the home page.
3. Merge `join-page` into `main`, then push.

To try it on the laptop, start the local server in the app's repository, serve this folder with a server that answers unknown paths with `404.html`, and open `/join/hackney_clay`. `docs/local-server.md` in the app's repository gives the steps.
