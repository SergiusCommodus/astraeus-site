# ASTRAEUS source

`index.html` at the repo root is a built file. Do not edit it by hand. Edit these parts and rebuild:

| File | Contents |
|---|---|
| `p1_style.html` | Title, fonts, all CSS |
| `p2_shell.html` | Nav, footer, search overlay, cart drawer, audio element |
| `p3_data.js` | Missions, divisions, base product records |
| `p3b_more.js` | Photographed product lines, pruning rules, featured flags |
| `p4_art.js` | SVG illustration engine (packaging views, insignia, planet) |
| `p5_app.js` | Star field, cart and wishlist state, search, music |
| `p6_pages.js` | Page renderers and the hash router |
| `build.py` | Concatenates the parts and injects the logo data URI |
| `crops.py` | Cuts product photos out of the concept boards |
| `deploy.sh` | Build, syntax check, commit, push, verify |

To change the site, edit a part and run:

    ./deploy.sh "what changed"

`deploy.sh` refuses to publish if any script block fails to parse, and it confirms the remote commit matches local before reporting success. GitHub Pages serves `main` at the repo root, so a successful push is live in about a minute.

Product photography lives in `img/`, the site theme in `audio/`.
