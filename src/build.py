logo=open('logo_b64.txt').read()
html=open('src.html').read().replace('__LOGO__',logo)
open('astraeus.html','w').write(html)
print(len(html))
