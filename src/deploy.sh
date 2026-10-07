#!/usr/bin/env bash
# ASTRAEUS deploy: assemble -> verify -> commit -> push -> confirm remote matches.
# Usage: ./deploy.sh "commit message"
set -euo pipefail
cd "$(dirname "$0")"
MSG="${1:-Update ASTRAEUS site}"

# 1. assemble the page from its parts and inject the logo
cat p1_style.html p2_shell.html p3_data.js p3b_more.js p4_art.js p5_app.js p6_pages.js > src.html
python3 build.py >/dev/null

# 2. refuse to ship a page whose scripts do not parse
node -e '
const h=require("fs").readFileSync("astraeus.html","utf8");
let bad=0;
[...h.matchAll(/<script>([\s\S]*?)<\/script>/g)].forEach((m,i)=>{
  try{new Function(m[1])}catch(e){console.error("script "+i+": "+e.message);bad=1}
});
if(bad){console.error("BUILD FAILED - not deploying");process.exit(1)}
'

# 3. stage into the git clone
cp astraeus.html repo/index.html
mkdir -p repo/src
cp p1_style.html p2_shell.html p3_data.js p3b_more.js p4_art.js p5_app.js p6_pages.js build.py logo_b64.txt crops.py deploy.sh repo/src/
rm -rf repo/img repo/audio
cp -r img audio repo/

# 4. commit and push
cd repo
git add -A
if git diff --cached --quiet; then
  echo "No changes to deploy."
else
  git -c user.name="George Serafin" -c user.email="bobafett1514@gmail.com" \
      commit -qm "$MSG

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01YKysANCC3zjs9jiuuevZnj"
  git push -q origin main
fi

# 5. confirm the remote actually has it
LOCAL=$(git rev-parse HEAD)
REMOTE=$(git ls-remote origin main | cut -f1)
if [ "$LOCAL" = "$REMOTE" ]; then
  echo "DEPLOYED  $LOCAL"
  echo "https://sergiuscommodus.github.io/astraeus-site/ rebuilds in about a minute."
else
  echo "PUSH DID NOT LAND: local $LOCAL, remote $REMOTE" >&2
  exit 1
fi
