<script>
/* ---------- components ---------- */
const avail=p=>`<span class="avail ${p.av}">${p.av==='in'?'IN STOCK':p.av==='low'?'LOW STOCK':'OUT OF STOCK'}</span>`;
function card(p){const m=MISSIONS[p.mission];const sp=Object.entries(p.specs).slice(0,2);
 return `<article class="card"><a class="pic" href="#product-${p.id}">${pic(p)}<span class="tag">${p.series}</span></a><button type="button" class="wish ${wish.includes(p.id)?'on':''}" data-wish="${p.id}" data-id="${p.id}" aria-label="Wishlist"><svg viewBox="0 0 24 24"><path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/></svg></button>
 <div class="body"><div class="model"><span>MODEL ${p.model}</span><span>${m?m.num:'GEN'}</span></div><h3><a href="#product-${p.id}">${p.name}</a></h3><p class="desc">${p.desc}</p>
 <div class="row"><span class="price num">${fmt(p.price)}</span>${avail(p)}</div>
 <div class="specs">${sp.map(([k,v])=>`<span>${k.replace(/([A-Z])/g,' $1').trim().toUpperCase()}: ${v.split(',')[0]}</span>`).join('')}</div>
 <div class="specs" style="border:0;padding:0;margin:0"><span>${DIV[p.div]}</span>${m?`<span>· ${m.name.toUpperCase()}</span>`:''}</div>
 <button type="button" class="btn small add ${p.av==='out'?'':'primary'}" data-add="${p.id}" ${p.av==='out'?'disabled':''}>${p.av==='out'?'UNAVAILABLE':p.ffl?'ADD · FFL TRANSFER':'ADD TO CART'}</button></div></article>`;}
const grid=list=>list.length?`<div class="grid">${list.map(card).join('')}</div>`:`<div class="empty"><p>No equipment matches these filters.</p></div>`;
const sectionHead=(eye,title,right='')=>`<div class="head"><div><div class="eyebrow">${eye}</div><h2>${title}</h2></div>${right}</div>`;
const missionCard=m=>`<a class="mcard" href="#mission-${m.id}" style="--accent:${m.accent}">${insignia(m)}<div><h3>${m.name}</h3><div class="meta"><span>MISSION ${m.num}</span><span>${m.dest.toUpperCase()}</span></div></div><p>${m.bg.split('. ')[0]}.</p><span class="eyebrow">${P.filter(p=>p.mission===m.id).length} ITEMS →</span></a>`;
function hscroll(list){return list.length?`<div class="hscroll">${list.map(card).join('')}</div>`:'';}

/* ---------- pages ---------- */
const pages={
 home(){return `<section class="hero wrap"><div class="planet">${planetSVG()}</div><div class="eyebrow">ASTRAEUS EQUIPMENT GROUP · EST. FOR THE LONG HORIZON</div><h1>Built for<br>what comes next</h1><p class="lead">Equipment for Earth and beyond.</p><div class="cta"><a class="btn primary" href="#about">EXPLORE ASTRAEUS</a><a class="btn" href="#shop">SHOP EQUIPMENT</a></div></section>
 <div class="ticker">${Object.values(DIV).concat(Object.values(DIV)).map(d=>`<span>${d}</span>`).join('')}</div>
 <section class="section wrap">${sectionHead('CENTERPIECES','Issued this season')}<div class="look">${[['img/hd-hero.webp','A-01 Expedition Hoodie','#product-ap-hood-a01'],['img/afs-case.webp','AFS-01 Field Case','#product-c-afs01'],['img/wb-open.webp','A-01 Watch Case','#product-c-wb4'],['img/sw-hero.webp','Orbital Wearable Computer','#product-w-orbital-wc']].map(([s,t,h],i)=>`<a href="${h}" class="lk lk${i}">${photo(s,t)}<span><b>${t}</b><i>VIEW EQUIPMENT →</i></span></a>`).join('')}</div></section>
 <section class="section wrap">${sectionHead('CATALOG','Equipment categories')}<div class="cats">${Object.entries(CATS).map(([k,c])=>`<a class="cat" href="#${k}"><div class="art">${catArt(k)}</div><div class="t"><span class="eyebrow">${P.filter(p=>p.cat===k).length} ITEMS</span><h3>${c.name}</h3><p>${c.blurb}</p></div></a>`).join('')}</div></section>
 <section class="section wrap">${sectionHead('WATCH DIVISION','Flagship instruments','<a class="btn ghost small" href="#watches">ALL WATCHES</a>')}${grid(P.filter(p=>p.cat==='watches').slice(0,4))}</section>
 <section class="section wrap">${sectionHead('FIELD SYSTEMS','Watch storage, built like hardware','<a class="btn ghost small" href="#storage">ALL STORAGE</a>')}${grid(P.filter(p=>p.cat==='storage').slice(0,4))}</section>
 <section class="section wrap">${sectionHead('PROGRAMS','Mission collections','<a class="btn ghost small" href="#missions">ALL MISSIONS</a>')}<div class="missions">${['orbital','lunar','deepfield'].map(k=>missionCard(MISSIONS[k])).join('')}</div></section>
 <section class="section wrap"><div class="strip"><div><span class="k">SHIPPING</span><span class="v">Free over $250</span><span class="dim" style="font-size:12px">Insured, tracked, issued in ASTRAEUS packaging.</span></div><div><span class="k">WARRANTY</span><span class="v">Five years</span><span class="dim" style="font-size:12px">Watches and hard cases. Two years on everything else.</span></div><div><span class="k">SERVICE</span><span class="v">Equipment Lab</span><span class="dim" style="font-size:12px">Repair, refoam, movement service, strap fitting.</span></div><div><span class="k">RETURNS</span><span class="v">30 days</span><span class="dim" style="font-size:12px">Unworn, in original issue packaging.</span></div></div></section>
 ${recent.length?`<section class="section wrap">${sectionHead('LOG','Recently viewed')}${hscroll(recent.map(id=>BYID[id]).filter(Boolean))}</section>`:''}`;},

 shop(catKey){
  const f=shopState;const cats=catKey?[catKey]:f.cats;
  let list=P.filter(p=>(!cats.length||cats.includes(p.cat))&&(!f.missions.length||f.missions.includes(p.mission))&&(!f.divs.length||f.divs.includes(p.div))&&(!f.types.length||f.types.includes(p.type))&&(!f.series.length||f.series.includes(p.series))&&p.price<=f.max&&(!f.instock||p.av!=='out'));
  const sorts={featured:(a,b)=>(b.feat||0)-(a.feat||0),plo:(a,b)=>a.price-b.price,phi:(a,b)=>b.price-a.price,name:(a,b)=>a.name.localeCompare(b.name)};list=[...list].sort(sorts[f.sort]);if(f.sort!=='featured')list.sort((a,b)=>sorts[f.sort](a,b));
  const c=catKey?CATS[catKey]:null;
  const chk=(name,vals,sel,lab)=>`<div><h4>${lab}</h4>${vals.map(v=>`<label><input type="checkbox" data-f="${name}" value="${v[0]}" ${sel.includes(v[0])?'checked':''}>${v[1]}</label>`).join('')}</div>`;
  const types=[...new Set(P.filter(p=>!cats.length||cats.includes(p.cat)).map(p=>p.type))];
  return `<section class="section wrap"><div class="crumbs"><a href="#home">HOME</a><span>/</span><a href="#shop">SHOP</a>${c?`<span>/</span><span>${c.name.toUpperCase()}</span>`:''}</div>
  ${sectionHead(c?CATS[catKey].blurb.toUpperCase():'FULL CATALOG',c?c.name:'Shop all equipment')}
  ${catKey==='firearms'?`<div class="notice" style="margin-bottom:24px"><b>Firearms compliance</b><span>Firearms are sold only to buyers 21 years of age or older and are shipped exclusively to a federally licensed dealer (FFL) of your choice for transfer, background check and any state waiting period. Firearms cannot be shipped to a residence. Some models are restricted or prohibited in certain states and localities; the catalog checks your shipping state at checkout. Ammunition is not sold on this site. Accessories without restriction ship normally.</span></div>`:''}
  <div class="shop"><aside class="filters" id="filters">
   ${catKey?'':chk('cats',Object.entries(CATS).map(([k,v])=>[k,v.name]),f.cats,'Category')}
   ${chk('types',types.map(t=>[t,t]),f.types,'Product type')}
   ${chk('missions',Object.values(MISSIONS).map(m=>[m.id,m.name]),f.missions,'Mission')}
   ${chk('divs',Object.entries(DIV).map(([k,v])=>[k,v.replace('ASTRAEUS ','')]),f.divs,'Division')}
   ${chk('series',[...new Set(P.map(p=>p.series))].map(s=>[s,s]),f.series,'Collection')}
   <div><h4>Max price · <span class="num" id="maxlab">${fmt(f.max)}</span></h4><input type="range" id="fmax" min="25" max="3500" step="25" value="${f.max}"></div>
   <div><label><input type="checkbox" data-f="instock" ${f.instock?'checked':''}>In stock only</label></div>
   <button type="button" class="btn small ghost" id="fclear">CLEAR FILTERS</button></aside>
  <div><div class="toolbar"><span>${list.length} ITEM${list.length===1?'':'S'} · ASTRAEUS CATALOG</span><span style="display:flex;gap:10px;align-items:center"><button type="button" class="btn small ghost" id="ftoggle">FILTERS</button><select id="fsort" aria-label="Sort"><option value="featured" ${f.sort==='featured'?'selected':''}>FEATURED</option><option value="plo" ${f.sort==='plo'?'selected':''}>PRICE LOW TO HIGH</option><option value="phi" ${f.sort==='phi'?'selected':''}>PRICE HIGH TO LOW</option><option value="name" ${f.sort==='name'?'selected':''}>NAME</option></select></span></div>${grid(list)}</div></div></section>`;
 },

 product(id){const p=BYID[id];if(!p)return pages.notfound();noteRecent(id);const m=MISSIONS[p.mission];
  const G=gviews(p);
  const related=P.filter(x=>x.id!==p.id&&(x.cat===p.cat)).slice(0,4);
  const acc=P.filter(x=>x.id!==p.id&&x.cat!==p.cat&&(x.mission===p.mission||x.cat==='storage'||x.cat==='everyday')).slice(0,4);
  const specRows=[['Model',p.model],['Division',DIV[p.div]],['Mission',m?`${m.num} · ${m.name}`:'General issue'],['Materials',p.materials],['Dimensions',p.dims],['Weight',p.weight],...Object.entries(p.specs).map(([k,v])=>[k.replace(/([A-Z])/g,' $1').trim(),v])];
  return `<section class="section wrap"><div class="crumbs"><a href="#home">HOME</a><span>/</span><a href="#${p.cat}">${CATS[p.cat].name.toUpperCase()}</a><span>/</span><span>${p.model}</span></div>
  <div class="pdp"><div class="gallery"><div class="main" id="gmain">${G[0].h}<span class="id">${p.model} · VIEW 01 · ${G[0].l}</span></div><div class="thumbs">${G.map((v,i)=>`<button type="button" class="${i?'':'on'}" data-view="${i}" aria-label="${v.l}">${v.h}</button>`).join('')}</div></div>
  <div class="buy"><div class="eyebrow">${DIV[p.div]} · ${p.series}</div><h1>${p.name}</h1><div class="mono" style="font-size:11px;letter-spacing:.18em;color:var(--silver)">MODEL ${p.model}${p.fam?' · '+p.fam:''}${m?' · MISSION '+m.num:''}</div>
   <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap"><span class="price num">${fmt(p.price)}</span>${avail(p)}</div>
   <p class="dim" style="font-size:15px;max-width:52ch">${p.desc}</p>
   ${p.ffl?`<div class="notice"><b>Licensed dealer transfer required</b><span>Ships only to an FFL dealer you select at checkout. Buyer must be 21 or older and pass a background check at pickup. Not available in all states.</span></div>`:''}
   <div class="buyrow"><div class="qty"><button type="button" id="qm" aria-label="Decrease">−</button><input type="number" id="pqty" value="1" min="1" aria-label="Quantity"><button type="button" id="qp" aria-label="Increase">+</button></div><button type="button" class="btn primary" data-add="${p.id}" ${p.av==='out'?'disabled':''}>${p.av==='out'?'OUT OF STOCK':'ADD TO CART'}</button><button type="button" class="btn" data-wish="${p.id}">${wish.includes(p.id)?'SAVED':'WISHLIST'}</button></div>
   <div class="markings"><span>SN 2126-${p.id.toUpperCase().replace(/-/g,'')}</span><span>REV A</span><span>${m?m.num:'AP-00'}</span><span>${p.av==='out'?'BACKORDER':'MISSION READY'}</span></div>
   <div class="tabs" id="ptabs"><button type="button" class="on" data-tab="spec">SPECIFICATIONS</button><button type="button" data-tab="ship">SHIPPING</button><button type="button" data-tab="care">SERVICE</button></div>
   <div class="tabpane" data-pane="spec"><table class="spec">${specRows.map(([k,v])=>`<tr><th>${k}</th><td>${v}</td></tr>`).join('')}</table></div>
   <div class="tabpane" data-pane="ship" hidden><p>${p.ffl?'Ships to your chosen FFL dealer within 3 business days by insured carrier, adult signature required. The dealer completes the transfer.':'Ships within 2 business days in sealed ASTRAEUS issue packaging. Free insured shipping on orders over $250; $12 flat otherwise.'}</p><p>International shipping to most regions. Duties are calculated at checkout.</p><p>30 day returns on unworn equipment in original packaging${p.ffl?' (not applicable to transferred firearms)':''}.</p></div>
   <div class="tabpane" data-pane="care" hidden><p>Serviced by the ASTRAEUS Equipment Lab. ${p.kind==='watch'?'Movement service recommended every five years. Bracelet refinishing and strap fitting available.':p.kind==='case'?'Replacement foam, webbing, latch pins and mission discs are stocked. Shells carry a five year warranty.':'Spare parts are stocked for the life of the product line.'}</p></div>
  </div></div></section>
  <section class="section wrap">${sectionHead('RELATED','Related equipment')}${grid(related)}</section>
  <section class="section wrap">${sectionHead('RECOMMENDED','Recommended accessories')}${grid(acc)}</section>
  ${recent.length>1?`<section class="section wrap">${sectionHead('LOG','Recently viewed')}${hscroll(recent.filter(x=>x!==id).map(i=>BYID[i]).filter(Boolean))}</section>`:''}`;},

 missions(){return `<section class="section wrap">${sectionHead('PROGRAMS','Mission collections')}<p class="dim" style="max-width:62ch;margin-bottom:30px">Every ASTRAEUS program is an equipment line with its own insignia, number, destination and accent. Products carry their mission designation on the dial, the label plate or the packaging.</p><div class="missions">${Object.values(MISSIONS).map(missionCard).join('')}</div></section>`;},
 mission(k){const m=MISSIONS[k];if(!m)return pages.notfound();const items=P.filter(p=>p.mission===k);const by=c=>items.filter(p=>p.cat===c);
  return `<section class="section wrap" style="--accent:${m.accent}"><div class="crumbs"><a href="#home">HOME</a><span>/</span><a href="#missions">MISSIONS</a><span>/</span><span>${m.num}</span></div>
  <div class="mhero">${insignia(m,200)}<div><div class="eyebrow">MISSION ${m.num} · ${m.dest.toUpperCase()}</div><h1 style="font-size:clamp(30px,4.5vw,56px)">${m.name}</h1><p style="margin-top:16px">${m.bg}</p><div class="kv"><div><div class="k">MISSION NUMBER</div>${m.num}</div><div><div class="k">DESTINATION</div>${m.dest}</div><div><div class="k">ACCENT</div><span style="display:inline-flex;align-items:center;gap:8px"><span style="width:14px;height:14px;border-radius:50%;background:${m.accent};border:1px solid var(--line)"></span>${m.accent}</span></div><div><div class="k">ISSUED ITEMS</div>${items.length}</div></div></div></div></section>
  ${[['watches','Watches'],['storage','Cases'],['equipment','Equipment'],['everyday','Everyday'],['apparel','Clothing'],['firearms','Firearms']].map(([c,l])=>by(c).length?`<section class="section wrap" style="padding-top:0">${sectionHead(m.num+' · '+l.toUpperCase(),l)}${grid(by(c))}</section>`:'').join('')}`;},

 about(){const divs=[['EXP','Expedition gear, bags and apparel for long duration field work.'],['ORB','Compact equipment for crews living and working in orbit.'],['FLD','Hard cases, containers and storage systems.'],['WCH','Mechanical instruments and movement service.'],['LAB','Lights, tools, power and everyday objects. Repair and service.'],['MAT','Metals, textiles and finishes shared across every division.'],['FRO','Field firearms and accessories for frontier personnel.']];
  return `<section class="hero wrap" style="min-height:0"><div class="eyebrow">ABOUT</div><h1>Equipment for those<br>who go farther</h1><p class="lead">Industrial design, durability and precision for life on Earth and whatever comes next.</p></section>
  <section class="section wrap" style="padding-top:0"><div class="prose"><p><strong>ASTRAEUS develops equipment for those who go farther.</strong> Our products combine industrial design, durability, precision and exploration inspired engineering for life on Earth and whatever comes next.</p><p>ASTRAEUS draws inspiration from humanity's history of exploration while designing equipment for the future. The catalog is organized into programs, each with a destination in mind, and built by seven divisions that share one material standard.</p><p>ASTRAEUS is an exploration inspired equipment and lifestyle company. It is not a space agency and does not operate spacecraft. The missions and vehicles in our catalog are a design framework, not a flight manifest.</p></div></section>
  <section class="section wrap">${sectionHead('STRUCTURE','Divisions')}<div class="divs">${divs.map(([k,d],i)=>`<div class="div"><span class="n">DIV ${String(i+1).padStart(2,'0')}</span><h3>${DIV[k]}</h3><p>${d}</p></div>`).join('')}</div></section>
  <section class="section wrap">${sectionHead('STANDARD','Design principles')}<div class="strip"><div><span class="k">COLOR</span><span class="v">Navy, white, silver</span><span class="dim" style="font-size:12px">Orbital blue only where it means something.</span></div><div><span class="k">MARKINGS</span><span class="v">Legible with gloves</span><span class="dim" style="font-size:12px">Model, division, mission and serial on every item.</span></div><div><span class="k">SERVICE</span><span class="v">Repairable by design</span><span class="dim" style="font-size:12px">Parts stocked for the life of the line.</span></div><div><span class="k">PACKAGING</span><span class="v">Issued, not sold</span><span class="dim" style="font-size:12px">Every box reads like an expedition manifest.</span></div></div></section>`;},

 cart(){const it=cartItems();return `<section class="section wrap light" style="margin-inline:calc(-1 * var(--gutter));padding-inline:var(--gutter)"><div class="head"><div><div class="eyebrow">CART</div><h2>Your equipment</h2></div><a class="btn small" href="#shop">CONTINUE SHOPPING</a></div>
  ${it.length?`<div class="cartgrid"><div>${it.map(({p,q})=>lineHTML(p,q,true)).join('')}${it.some(x=>x.p.ffl)?`<div class="notice" style="margin-top:18px"><b>This order contains a firearm</b><span>It ships to the licensed dealer you select at checkout. Accessories ship to your address separately.</span></div>`:''}</div>
  <aside class="summary"><h3>Order summary</h3><div class="r"><span>Subtotal</span><span class="num">${fmt(subtotal())}</span></div><div class="r"><span>Shipping</span><span class="num">${subtotal()>=250?'Free':'$12'}</span></div><div class="r"><span>Estimated tax</span><span class="num">${fmt(Math.round(subtotal()*.07))}</span></div><div class="r total"><span>Total</span><span class="num">${fmt(subtotal()+(subtotal()>=250?0:12)+Math.round(subtotal()*.07))}</span></div><a class="btn primary" href="#checkout">CHECKOUT</a><p class="dim" style="font-size:12px">Insured shipping. 30 day returns. Five year warranty on watches and cases.</p></aside></div>`:`<div class="empty"><p>Your cart is empty.</p><a class="btn" href="#shop">SHOP EQUIPMENT</a></div>`}</section>`;},

 checkout(){const it=cartItems();if(!it.length)return pages.cart();const ffl=it.some(x=>x.p.ffl);const sub=subtotal(),ship=sub>=250?0:12,tax=Math.round(sub*.07);
  const inp=(id,l,t='text',extra='')=>`<label>${l}<input type="${t}" id="${id}" name="${id}" ${extra}></label>`;
  return `<section class="section wrap light" style="margin-inline:calc(-1 * var(--gutter));padding-inline:var(--gutter)"><div class="head"><div><div class="eyebrow">CHECKOUT</div><h2>Issue order</h2></div></div>
  <div class="steps"><span class="on">1 CONTACT</span><span class="on">2 SHIPPING</span><span class="on">3 PAYMENT</span><span>4 CONFIRMATION</span></div>
  <div class="cartgrid"><form class="form" id="cform" novalidate>
   <h3 style="margin-top:6px">Contact</h3><div class="two">${inp('email','Email','email','autocomplete="email" required')}${inp('phone','Phone','tel','autocomplete="tel"')}</div>
   <h3 style="margin-top:14px">Shipping address</h3><div class="two">${inp('first','First name','text','autocomplete="given-name" required')}${inp('last','Last name','text','autocomplete="family-name" required')}</div>${inp('addr','Street address','text','autocomplete="address-line1" required')}<div class="two">${inp('city','City','text','autocomplete="address-level2" required')}<label>State<select id="state" required><option value="">Select</option>${'AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI WY'.split(' ').map(s=>`<option>${s}</option>`).join('')}</select></label></div><div class="two">${inp('zip','ZIP','text','autocomplete="postal-code" required')}<label>Country<select id="country"><option>United States</option><option>Canada</option><option>United Kingdom</option><option>Germany</option><option>Japan</option><option>Australia</option></select></label></div>
   ${ffl?`<h3 style="margin-top:14px">Firearm transfer</h3><div class="notice"><b>Licensed dealer required</b><span>Enter the FFL dealer who will receive the firearm. We contact the dealer to confirm their license before shipping. You must be 21 or older and pass the background check at pickup.</span></div><div class="two">${inp('fflname','Dealer name','text','required')}${inp('fflnum','FFL license number','text','required placeholder="1-23-456-78-9A-12345"')}</div>${inp('ffladdr','Dealer address','text','required')}<label class="choice" id="agewrap"><input type="checkbox" id="age"><span>I confirm I am 21 years of age or older and legally eligible to purchase a firearm in my state.<div class="sub">Required for firearm orders.</div></span></label>`:''}
   <h3 style="margin-top:14px">Shipping method</h3><label class="choice on"><input type="radio" name="shipm" value="std" checked><span>Standard insured · 3 to 5 days<div class="sub">${ship?'$12':'Free'}</div></span></label><label class="choice"><input type="radio" name="shipm" value="exp"><span>Expedited · 1 to 2 days<div class="sub">$38</div></span></label>
   <h3 style="margin-top:14px">Payment</h3><p class="dim" style="font-size:12px">Demo checkout. No payment is processed and no card data is stored.</p>${inp('card','Card number','text','inputmode="numeric" autocomplete="cc-number" placeholder="4242 4242 4242 4242" required')}<div class="two">${inp('exp','Expiry','text','placeholder="MM / YY" autocomplete="cc-exp" required')}${inp('cvc','CVC','text','inputmode="numeric" autocomplete="cc-csc" required')}</div>${inp('cname','Name on card','text','autocomplete="cc-name" required')}
   <button type="submit" class="btn primary" style="margin-top:10px">PLACE ORDER · <span id="ptotal" class="num">${fmt(sub+ship+tax)}</span></button>
  </form>
  <aside class="summary"><h3>Order summary</h3>${it.map(({p,q})=>`<div class="r"><span>${p.name} × ${q}</span><span class="num">${fmt(p.price*q)}</span></div>`).join('')}<div class="r" style="border-top:1px solid var(--line);padding-top:10px"><span>Subtotal</span><span class="num">${fmt(sub)}</span></div><div class="r"><span>Shipping</span><span class="num" id="sship">${ship?'$12':'Free'}</span></div><div class="r"><span>Tax</span><span class="num">${fmt(tax)}</span></div><div class="r total"><span>Total</span><span class="num" id="stotal">${fmt(sub+ship+tax)}</span></div></aside></div></section>`;},

 confirm(n){const o=orders.find(x=>x.num===n)||orders[0];if(!o)return pages.cart();
  return `<section class="section wrap light" style="margin-inline:calc(-1 * var(--gutter));padding-inline:var(--gutter)"><div class="steps"><span class="on">1 CONTACT</span><span class="on">2 SHIPPING</span><span class="on">3 PAYMENT</span><span class="on">4 CONFIRMATION</span></div>
  <div class="confirm"><span class="logo" style="width:72px;height:72px"><img src="${LOGO}" alt=""></span><div class="eyebrow">ORDER ISSUED</div><h2>Equipment is on its way</h2><span class="ord">ORDER ${o.num}</span><p class="dim">A confirmation was sent to ${o.email}. ${o.ffl?'Firearms ship to your dealer, '+o.ffl+'. ':''}Everything else ships to ${o.city}, ${o.state}.</p>
  <div style="width:100%;text-align:left;border:1px solid var(--line-soft);padding:16px;border-radius:2px">${o.items.map(i=>`<div class="r" style="display:flex;justify-content:space-between;font-size:14px;padding:6px 0"><span>${i.name} × ${i.q}</span><span class="num">${fmt(i.price*i.q)}</span></div>`).join('')}<div style="display:flex;justify-content:space-between;font-family:var(--display);font-size:18px;border-top:1px solid var(--line);padding-top:10px;margin-top:6px"><span>Total</span><span class="num">${fmt(o.total)}</span></div></div>
  <div style="display:flex;gap:12px;flex-wrap:wrap;justify-content:center"><a class="btn primary" href="#shop">CONTINUE SHOPPING</a><a class="btn" href="#account">VIEW ORDERS</a></div></div></section>`;},

 account(){return `<section class="section wrap light" style="margin-inline:calc(-1 * var(--gutter));padding-inline:var(--gutter)"><div class="head"><div><div class="eyebrow">ACCOUNT</div><h2>${account?'Welcome back, '+account.name:'Sign in'}</h2></div>${account?'<button type="button" class="btn small" id="signout">SIGN OUT</button>':''}</div>
  ${account?`<div class="cartgrid"><div><h3 style="margin-bottom:12px">Orders</h3>${orders.length?`<div class="orders">${orders.map(o=>`<div class="order"><span><div>${o.items.map(i=>i.name).join(', ')}</div><div class="m">${o.num} · ${o.date}</div></span><span class="num" style="font-family:var(--display);font-size:16px">${fmt(o.total)}</span></div>`).join('')}</div>`:'<p class="dim">No orders yet.</p>'}</div><aside class="summary"><h3>Profile</h3><div class="r"><span>Name</span><span>${account.name}</span></div><div class="r"><span>Email</span><span>${account.email}</span></div><div class="r"><span>Wishlist</span><a href="#wishlist">${wish.length} items</a></div><div class="r"><span>Clearance</span><span>EARTHSIDE</span></div></aside></div>`
  :`<form class="form" id="aform" style="max-width:460px" novalidate><label>Name<input type="text" id="aname" required autocomplete="name"></label><label>Email<input type="email" id="aemail" required autocomplete="email"></label><p class="dim" style="font-size:12px">Demo account. Details stay in this browser only.</p><button class="btn primary" type="submit">SIGN IN</button></form>`}</section>`;},

 wishlist(){const l=wish.map(i=>BYID[i]).filter(Boolean);return `<section class="section wrap">${sectionHead('SAVED','Wishlist')}${l.length?grid(l):`<div class="empty"><p>Nothing saved yet.</p><a class="btn" href="#shop">SHOP EQUIPMENT</a></div>`}</section>`;},
 search(q){q=decodeURIComponent(q||'');const r=searchP(q);return `<section class="section wrap">${sectionHead('SEARCH',`${r.length} result${r.length===1?'':'s'} for “${q}”`)}${grid(r)}</section>`;},
 shipping(){return `<section class="section wrap"><div class="prose">${sectionHead('POLICY','Shipping and returns')}<p>Orders ship within two business days in sealed ASTRAEUS issue packaging. Shipping is free and insured on orders over $250, otherwise $12 flat. Expedited delivery is available at checkout.</p><p>Returns are accepted within 30 days on unworn equipment in original packaging. Watches and hard cases carry a five year warranty; everything else carries two years. Transferred firearms are not returnable; contact Frontier Operations for warranty service.</p></div></section>`;},
 intro(){return `<section class="introp"><div class="mark" id="imark"><div class="logo"><img src="${LOGO}" alt="ASTRAEUS insignia"></div><div class="word">ASTRAEUS</div><div class="sub">EQUIPMENT FOR EARTH AND BEYOND</div><a class="btn enter" href="#home">ENTER ASTRAEUS</a></div><span class="sound-hint" id="soundHint" hidden>CLICK ANYWHERE FOR SOUND</span><a class="skip" href="#home">SKIP →</a></section>`;},
 notfound(){return `<section class="section wrap"><div class="empty"><div class="eyebrow">REF 404</div><h2>Nothing at this coordinate</h2><a class="btn" href="#home">RETURN HOME</a></div></section>`;}
};
const shopState={cats:[],missions:[],divs:[],types:[],series:[],max:3500,instock:false,sort:'featured'};

/* ---------- router ---------- */
const app=document.getElementById('app');
function render(){
 const h=(location.hash||'#intro').slice(1);let html='',route=h;
 document.body.classList.toggle('introview',h==='intro');
 if(h==='intro')html=pages.intro();
 else if(h==='home')html=pages.home();
 else if(h==='shop')html=pages.shop();
 else if(CATS[h])html=pages.shop(h),route=['storage','everyday','strength'].includes(h)?'equipment':h;
 else if(h.startsWith('product-'))html=pages.product(h.slice(8)),route='shop';
 else if(h==='missions')html=pages.missions();
 else if(h.startsWith('mission-'))html=pages.mission(h.slice(8)),route='missions';
 else if(h.startsWith('search-'))html=pages.search(h.slice(7)),route='shop';
 else if(h.startsWith('confirm-'))html=pages.confirm(h.slice(8));
 else if(pages[h])html=pages[h]();
 else html=pages.notfound();
 app.innerHTML=`<div class="page">${html}</div>`;
 document.querySelectorAll('#links a').forEach(a=>a.classList.toggle('on',a.dataset.r===route));
 window.scrollTo({top:0,behavior:'instant'});
 bind(h);
}
function bind(h){
 if(h==='intro'){clearTimeout(window._it);clearInterval(window._iw);window.paintSound&&window.paintSound();
  if(reduced){mode='drift';document.getElementById('imark')?.classList.add('on');window._it=setTimeout(()=>{if(location.hash==='#intro')location.hash='#home';},2500);return;}
  mode='warp';warpSpeed=0.2;const t0=performance.now();
  window._iw=setInterval(()=>{const t=(performance.now()-t0)/1000;
   if(t<1.2)warpSpeed=0.2+t/1.2*3.4;            // accelerate to lightspeed
   else if(t<3.0)warpSpeed=3.6;                  // cruise
   else if(t<4.6){const k=(t-3)/1.6;warpSpeed=3.6*(1-k)*(1-k)+0.04;}  // decelerate
   else{clearInterval(window._iw);mode='drift';document.getElementById('imark')?.classList.add('on');}
  },40);
  window._it=setTimeout(()=>{if(location.hash==='#intro')location.hash='#home';},10500);return;}
 mode='drift';clearInterval(window._iw);
 // shop filters
 const F=document.getElementById('filters');
 if(F){F.querySelectorAll('[data-f]').forEach(i=>i.onchange=()=>{const k=i.dataset.f;if(k==='instock')shopState.instock=i.checked;else{const arr=shopState[k];const idx=arr.indexOf(i.value);i.checked?idx<0&&arr.push(i.value):idx>=0&&arr.splice(idx,1);}render();F.classList.add('open');});
  const r=document.getElementById('fmax');r.oninput=()=>document.getElementById('maxlab').textContent=fmt(+r.value);r.onchange=()=>{shopState.max=+r.value;render();};
  document.getElementById('fsort').onchange=e=>{shopState.sort=e.target.value;render();};
  document.getElementById('fclear').onclick=()=>{Object.assign(shopState,{cats:[],missions:[],divs:[],types:[],series:[],max:3500,instock:false});render();};
  document.getElementById('ftoggle').onclick=()=>F.classList.toggle('open');}
 // product
 if(h.startsWith('product-')){const p=BYID[h.slice(8)];const main=document.getElementById('gmain');const G=gviews(p);
  document.querySelectorAll('[data-view]').forEach(b=>b.onclick=()=>{document.querySelectorAll('[data-view]').forEach(x=>x.classList.remove('on'));b.classList.add('on');const v=+b.dataset.view;main.innerHTML=G[v].h+`<span class="id">${p.model} · VIEW ${String(v+1).padStart(2,'0')} · ${G[v].l}</span>`;});
  const q=document.getElementById('pqty');document.getElementById('qm').onclick=()=>q.value=Math.max(1,+q.value-1);document.getElementById('qp').onclick=()=>q.value=+q.value+1;
  document.querySelectorAll('#ptabs button').forEach(b=>b.onclick=()=>{document.querySelectorAll('#ptabs button').forEach(x=>x.classList.remove('on'));b.classList.add('on');document.querySelectorAll('.tabpane').forEach(pn=>pn.hidden=pn.dataset.pane!==b.dataset.tab);});}
 // checkout
 const cf=document.getElementById('cform');
 if(cf){const sub=subtotal(),tax=Math.round(sub*.07);
  cf.querySelectorAll('.choice input').forEach(i=>i.onchange=()=>{cf.querySelectorAll('.choice').forEach(c=>c.classList.toggle('on',c.querySelector('input').checked));const exp=cf.shipm.value==='exp';const ship=exp?38:(sub>=250?0:12);document.getElementById('sship').textContent=ship?fmt(ship):'Free';document.getElementById('stotal').textContent=fmt(sub+ship+tax);document.getElementById('ptotal').textContent=fmt(sub+ship+tax);});
  cf.onsubmit=e=>{e.preventDefault();let ok=true;cf.querySelectorAll('[required]').forEach(i=>{const bad=!i.value.trim()||(i.type==='email'&&!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(i.value));i.classList.toggle('err',bad);if(bad)ok=false;});
   const age=document.getElementById('age');if(age&&!age.checked){ok=false;document.getElementById('agewrap').style.borderColor='#B94A48';}
   if(!ok){toast('CHECK THE HIGHLIGHTED FIELDS');cf.querySelector('.err')?.focus();return;}
   const exp=cf.shipm.value==='exp';const ship=exp?38:(sub>=250?0:12);
   const o={num:'AS-'+Date.now().toString(36).toUpperCase().slice(-6),date:new Date().toLocaleDateString('en-US',{year:'numeric',month:'short',day:'numeric'}),email:cf.email.value,city:cf.city.value,state:cf.state.value,ffl:document.getElementById('fflname')?.value||'',items:cartItems().map(({p,q})=>({id:p.id,name:p.name,price:p.price,q})),total:sub+ship+tax};
   orders=[o,...orders];store.set('orders',orders);cart={};store.set('cart',cart);syncBadges();renderDrawer();location.hash='confirm-'+o.num;};}
 // account
 const af=document.getElementById('aform');if(af){af.onsubmit=e=>{e.preventDefault();const n=af.aname.value.trim(),m=af.aemail.value.trim();if(!n||!m){toast('ENTER NAME AND EMAIL');return;}account={name:n,email:m};store.set('account',account);render();};}
 const so=document.getElementById('signout');if(so)so.onclick=()=>{account=null;store.set('account',null);render();};
}
addEventListener('hashchange',()=>{closeDrawer();closeSearch();render();});
syncBadges();renderDrawer();render();
</script>
