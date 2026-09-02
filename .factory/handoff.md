# Riddle Grid review 5 handoff

## Status

**FAIL — review-only work.** Product code was not modified. The adversarial review is in [`.factory/review-5.md`](review-5.md) and identifies one blocking privacy-proof failure, one unlisted account claim, and one minor README wording issue.

## What was verified

- Fresh live phone and desktop visits make the game, audience, and sample action clear before scrolling.
- The one-click sample opens at `/?demo=1`, shows its persistent isolation banner, solves/restarts, reveals after three failed checks, and retains daily storage when demo storage is reset or exited.
- A clean clone at `a75100eedabe1ed1da159270aec0b3a5661fe98d` passed `npm ci`, all 15 exact claims commands, `npm test` (30/30), and `npm run build` with `dist/` output.
- Live routing, focus restoration, metadata, 404, internal/external link crawl, axe, 390 px layout, 200% text, reduced motion, service-worker offline reload, headers, cookies, and same-origin request logging passed.

## Known gaps and next steps

1. **Blocking:** strengthen `no-third-party` and `private-static-game` tests. They only prove that requests have the same origin; they do not prove puzzle choices/personal data are never sent or same-origin analytics is absent. Assert static GET-only allowlisted request traffic with no request payload during a full demo interaction, then register the “puzzle choices stay here” promise explicitly if retained.
2. Add a claim/test for the `/privacy` heading “Privacy without an account”, or change the heading so it makes no unregistered account promise.
3. Replace README’s “bundled sample … explanation flow” with the plain wording proposed in the review.

## Run and verify

```sh
npm ci
npm test
npm run build
node scripts/live-audit.mjs https://riddle-grid.sociobot.in /tmp/riddle-grid-review5-live
```
