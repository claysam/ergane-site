# Ergane website

The website for Ergane, at `https://ergane.works`. GitHub Pages serves it from the `main` branch.

Plain files only: no build step, no JavaScript, no cookies and nothing loaded from another site.

| File | What it is |
| --- | --- |
| `index.html` | The home page |
| `privacy/index.html` | The privacy policy, at `/privacy`. Made by a script. Do not edit it by hand. |
| `404.html` | Shown for a page that does not exist |
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
