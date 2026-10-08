#!/usr/bin/env python3
"""Wrap the built page in a real HTML document for GitHub Pages.

The Artifact platform supplies its own doctype/head, but GitHub Pages serves the
file verbatim. Without this the page renders in quirks mode at 980px on phones,
with no charset and no social metadata.
"""
import re, sys

SITE = "https://sergiuscommodus.github.io/astraeus-site/"
TITLE = "ASTRAEUS — Equipment for Earth and Beyond"
DESC = ("ASTRAEUS builds precision watches, protective cases, travel gear, apparel and "
        "field equipment for explorers, pilots, engineers and anyone who goes farther.")

body = open("astraeus.html", encoding="utf-8").read()

# the stylesheet link belongs in <head>, not mid-body
m = re.search(r'<link rel="stylesheet" href="https://fonts\.googleapis\.com[^>]*>', body)
fonts = m.group(0) if m else ""
if m:
    body = body.replace(fonts, "", 1)
body = re.sub(r"<title>.*?</title>\s*", "", body, count=1)

head = f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>{TITLE}</title>
<meta name="description" content="{DESC}">
<link rel="canonical" href="{SITE}">
<meta name="theme-color" content="#011A36">
<meta name="color-scheme" content="dark">
<link rel="icon" href="favicon-32.png" sizes="32x32">
<link rel="icon" href="icon-512.png" sizes="512x512">
<link rel="apple-touch-icon" href="apple-touch-icon.png">
<meta property="og:type" content="website">
<meta property="og:site_name" content="ASTRAEUS">
<meta property="og:title" content="{TITLE}">
<meta property="og:description" content="{DESC}">
<meta property="og:url" content="{SITE}">
<meta property="og:image" content="{SITE}og-image.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="The ASTRAEUS insignia on a field of stars">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{TITLE}">
<meta name="twitter:description" content="{DESC}">
<meta name="twitter:image" content="{SITE}og-image.jpg">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
{fonts}
<script type="application/ld+json">
{{"@context":"https://schema.org","@type":"Organization","name":"ASTRAEUS",
"url":"{SITE}","logo":"{SITE}icon-512.png","description":"{DESC}",
"brand":{{"@type":"Brand","name":"ASTRAEUS"}}}}
</script>
</head>
<body>
"""

open("repo/index.html", "w", encoding="utf-8").write(head + body + "\n</body>\n</html>\n")
print("wrapped index.html ->", len(head + body), "bytes")
