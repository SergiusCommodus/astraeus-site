<script>
/* photo helpers */
function photo(src,alt){return `<img class="ph" src="${src}" alt="${alt||''}" loading="lazy" decoding="async">`;}
function pic(p,i=0){return p.img&&p.img[i]?photo(p.img[i],p.name):art(p,p.img?3:i);}
function gviews(p){if(p.img)return p.img.map((s,i)=>({l:i?'VIEW':'PRODUCT',h:photo(s,p.name)})).concat([{l:'PACKAGING',h:art(p,3)}]);
 return ['PRODUCT','DETAIL',p.kind==='watch'?'CASEBACK':'DRAWING','PACKAGING'].map((l,i)=>({l,h:art(p,i)}));}
/* simpler category art: nested svg */
function catArt(cat){
 if(CATS[cat].hero)return photo(CATS[cat].hero,CATS[cat].name);
 const kinds={watches:"watch",storage:"case",equipment:"pack",everyday:"bottle",apparel:"jacket",firearms:"longcase"};
 const sample=P.find(p=>p.cat===cat&&p.kind===kinds[cat])||P.find(p=>p.cat===cat);
 return `<svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g opacity=".75"><svg x="60" y="-20" width="340" height="340" viewBox="0 0 400 400">${art(sample,0)}</svg></g><path d="M0 240q200 -60 400 20v140h-400z" fill="#011A36" opacity=".9"/></svg>`;
}

/* ---------- star field ---------- */
const cv=document.getElementById('stars'),cx=cv.getContext('2d');
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const mobile=matchMedia('(max-width: 700px)').matches;
let W,H,stars=[],mode='warp',scrollY=0,objs=[],t0=performance.now();
function resize(){W=cv.width=innerWidth*devicePixelRatio;H=cv.height=innerHeight*devicePixelRatio;cx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);W=innerWidth;H=innerHeight;}
function seed(){const n=mobile?140:420;stars=Array.from({length:n},()=>({x:Math.random()*W,y:Math.random()*H,z:Math.random(),r:Math.random()*1.3+.3,tw:Math.random()*6.28}));
 objs=[{type:'moon',x:W*.82,y:H*.2,r:Math.min(W,H)*.08,spd:.004},{type:'station',x:-80,y:H*.35,spd:.12},{type:'ship',x:W+100,y:H*.6,spd:-.18}];}
addEventListener('resize',()=>{resize();seed();});resize();seed();
addEventListener('scroll',()=>{scrollY=window.scrollY;document.getElementById('nav').classList.toggle('scrolled',scrollY>40);},{passive:true});
let warpSpeed=1;
function draw(now){
 const dt=Math.min(50,now-t0)/16.7;t0=now;
 cx.clearRect(0,0,W,H);
 if(mode==='warp'){
  for(const s of stars){
   // project from center
   const dx=s.x-W/2,dy=s.y-H/2;const sp=(0.004+s.z*0.02)*warpSpeed*dt;
   s.x+=dx*sp;s.y+=dy*sp;
   if(s.x<0||s.x>W||s.y<0||s.y>H){s.x=W/2+(Math.random()-.5)*W*.6;s.y=H/2+(Math.random()-.5)*H*.6;s.z=Math.random();}
   const len=Math.hypot(dx,dy)*sp*2.2;const a=.35+s.z*.65;
   cx.strokeStyle=`rgba(251,250,251,${a})`;cx.lineWidth=s.r*(0.6+s.z);cx.beginPath();cx.moveTo(s.x,s.y);cx.lineTo(s.x-dx*sp*2.2,s.y-dy*sp*2.2);cx.stroke();
  }
 }else{
  const py=scrollY*0.06;
  for(const s of stars){
   if(!reduced){s.x-=(0.02+s.z*0.09)*dt;if(s.x<-2){s.x=W+2;s.y=Math.random()*H;}}
   const y=((s.y-py*(0.3+s.z))%H+H)%H;
   const tw=0.65+0.35*Math.sin(now*0.0012+s.tw);
   cx.fillStyle=`rgba(251,250,251,${(0.25+s.z*0.7)*tw})`;cx.beginPath();cx.arc(s.x,y,s.r*(0.7+s.z*.6),0,6.28);cx.fill();
  }
  if(!reduced&&!mobile){for(const o of objs){drawObj(o,dt,py);}}
 }
 requestAnimationFrame(draw);
}
function drawObj(o,dt,py){
 if(o.type==='moon'){const y=o.y-py*.15;cx.save();cx.globalAlpha=.55;const g=cx.createRadialGradient(o.x-o.r*.3,y-o.r*.3,o.r*.1,o.x,y,o.r);g.addColorStop(0,'#C9CDD3');g.addColorStop(.7,'#6F737B');g.addColorStop(1,'#1B2A3D');cx.fillStyle=g;cx.beginPath();cx.arc(o.x,y,o.r,0,6.28);cx.fill();cx.restore();o.x-=o.spd*dt;if(o.x<-o.r*2){o.x=W+o.r*2;o.y=H*(0.1+Math.random()*.4);}}
 else if(o.type==='station'){o.x+=o.spd*dt;if(o.x>W+120)o.x=-120;const y=o.y-py*.2;cx.save();cx.globalAlpha=.45;cx.fillStyle='#ADAEB1';cx.fillRect(o.x,y,40,3);cx.fillRect(o.x+17,y-8,6,19);cx.fillStyle='#0E73B3';cx.fillRect(o.x-14,y-1,12,5);cx.fillRect(o.x+42,y-1,12,5);cx.restore();}
 else{o.x+=o.spd*dt;if(o.x<-140)o.x=W+140;const y=o.y-py*.25;cx.save();cx.globalAlpha=.4;cx.fillStyle='#D9DCE1';cx.beginPath();cx.moveTo(o.x,y);cx.lineTo(o.x+34,y-5);cx.lineTo(o.x+60,y);cx.lineTo(o.x+34,y+5);cx.closePath();cx.fill();cx.fillStyle='#0E73B3';cx.fillRect(o.x+60,y-1,8,2);cx.restore();}
}
requestAnimationFrame(draw);

mode='drift';

/* ---------- state ---------- */
const store={get(k,d){try{return JSON.parse(localStorage.getItem('astraeus.'+k))??d;}catch(e){return d;}},set(k,v){try{localStorage.setItem('astraeus.'+k,JSON.stringify(v));}catch(e){}}};
let cart=store.get('cart',{}),wish=store.get('wish',[]),recent=store.get('recent',[]),orders=store.get('orders',[]),account=store.get('account',null);
const cartCount=()=>Object.values(cart).reduce((a,b)=>a+b,0);
const cartItems=()=>Object.entries(cart).map(([id,q])=>({p:BYID[id],q})).filter(x=>x.p);
const subtotal=()=>cartItems().reduce((a,{p,q})=>a+p.price*q,0);
function toast(m){const t=document.getElementById('toast');t.textContent=m;t.classList.add('on');clearTimeout(t._t);t._t=setTimeout(()=>t.classList.remove('on'),2200);}
function syncBadges(){const c=document.getElementById('ccount'),w=document.getElementById('wcount');const n=cartCount();c.textContent=n;c.hidden=!n;w.textContent=wish.length;w.hidden=!wish.length;}
function addCart(id,q=1){const p=BYID[id];if(!p||p.av==='out')return;cart[id]=(cart[id]||0)+q;store.set('cart',cart);syncBadges();renderDrawer();toast(p.name.toUpperCase()+' · ADDED TO CART');openDrawer();}
function setQty(id,q){if(q<=0)delete cart[id];else cart[id]=q;store.set('cart',cart);syncBadges();renderDrawer();if(location.hash==='#cart')render();}
function toggleWish(id){const i=wish.indexOf(id);if(i<0){wish.push(id);toast('SAVED TO WISHLIST');}else{wish.splice(i,1);toast('REMOVED FROM WISHLIST');}store.set('wish',wish);syncBadges();document.querySelectorAll(`.wish[data-id="${id}"]`).forEach(b=>b.classList.toggle('on',i<0));if(location.hash==='#wishlist')render();}
function noteRecent(id){recent=[id,...recent.filter(x=>x!==id)].slice(0,8);store.set('recent',recent);}

/* ---------- drawer / search ---------- */
const drawer=document.getElementById('drawer'),dim=document.getElementById('dim');
function openDrawer(){drawer.classList.add('open');dim.classList.add('on');}
function closeDrawer(){drawer.classList.remove('open');dim.classList.remove('on');}
document.getElementById('cbtn').onclick=()=>{renderDrawer();openDrawer();};
document.getElementById('dclose').onclick=closeDrawer;dim.onclick=closeDrawer;
document.getElementById('dcheck').onclick=closeDrawer;drawer.querySelector('a[href="#cart"]').onclick=closeDrawer;
function lineHTML(p,q,light){return `<div class="lineitem"><div class="pic">${pic(p)}</div><div><h4><a href="#product-${p.id}">${p.name}</a></h4><div class="sm">${p.model} · ${DIV[p.div]}${p.ffl?' · FFL TRANSFER':''}</div><div class="ctl"><div class="qty"><button type="button" data-q="${p.id}" data-d="-1" aria-label="Decrease">−</button><input type="number" value="${q}" min="0" data-qi="${p.id}" aria-label="Quantity" id="q-${p.id}"><button type="button" data-q="${p.id}" data-d="1" aria-label="Increase">+</button></div><button type="button" class="rm" data-rm="${p.id}">REMOVE</button></div></div><div class="lp num">${fmt(p.price*q)}</div></div>`;}
function renderDrawer(){const el=document.getElementById('ditems');const it=cartItems();el.innerHTML=it.length?it.map(({p,q})=>lineHTML(p,q)).join(''):`<div class="empty"><p>Your cart is empty.</p><a class="btn" href="#shop" onclick="closeDrawer()">SHOP EQUIPMENT</a></div>`;document.getElementById('dsub').textContent=fmt(subtotal());document.getElementById('dcheck').style.display=it.length?'':'none';}
document.addEventListener('click',e=>{
 const q=e.target.closest('[data-q]');if(q){setQty(q.dataset.q,(cart[q.dataset.q]||0)+ +q.dataset.d);return;}
 const rm=e.target.closest('[data-rm]');if(rm){setQty(rm.dataset.rm,0);return;}
 const add=e.target.closest('[data-add]');if(add){const qi=document.getElementById('pqty');addCart(add.dataset.add,qi?Math.max(1,+qi.value||1):1);return;}
 const w=e.target.closest('[data-wish]');if(w){e.preventDefault();toggleWish(w.dataset.wish);return;}
});
document.addEventListener('change',e=>{const i=e.target.closest('[data-qi]');if(i)setQty(i.dataset.qi,Math.max(0,+i.value||0));});
const sOv=document.getElementById('search'),sIn=document.getElementById('sinput');
function openSearch(){sOv.classList.add('open');setTimeout(()=>sIn.focus(),50);}
function closeSearch(){sOv.classList.remove('open');}
document.getElementById('sbtn').onclick=openSearch;document.getElementById('sclose').onclick=closeSearch;
sOv.addEventListener('click',e=>{if(e.target===sOv)closeSearch();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeSearch();closeDrawer();document.getElementById('mnav').classList.remove('open');}});
function searchP(q){q=q.trim().toLowerCase();if(!q)return[];return P.filter(p=>[p.name,p.model,p.cat,p.type,p.fam,DIV[p.div],MISSIONS[p.mission]?.name,p.desc].join(' ').toLowerCase().includes(q));}
sIn.addEventListener('input',()=>{const r=searchP(sIn.value);document.getElementById('scount').textContent=sIn.value?`${r.length} RESULT${r.length===1?'':'S'}`:'TYPE TO SEARCH';document.getElementById('sres').innerHTML=r.slice(0,8).map(p=>`<a href="#product-${p.id}" onclick="closeSearch()"><span class="pic">${pic(p)}</span><span><div class="t">${p.name}</div><div class="s">${p.model} · ${CATS[p.cat].name.toUpperCase()}</div></span><span class="p num">${fmt(p.price)}</span></a>`).join('')+(r.length>8?`<a href="#search-${encodeURIComponent(sIn.value)}" onclick="closeSearch()"><span class="t">View all ${r.length} results</span></a>`:'');});
sIn.addEventListener('keydown',e=>{if(e.key==='Enter'){location.hash='search-'+encodeURIComponent(sIn.value);closeSearch();}});
document.getElementById('burger').onclick=()=>document.getElementById('mnav').classList.add('open');
document.getElementById('mclose').onclick=()=>document.getElementById('mnav').classList.remove('open');
document.querySelectorAll('#mnav a').forEach(a=>a.onclick=()=>document.getElementById('mnav').classList.remove('open'));
</script>
<script>
/* ---------- music ---------- */
const theme=document.getElementById('theme'),muteBtn=document.getElementById('mute');
let userMuted=store.get('muted',false),audible=false;
theme.volume=0.55;
function paintSound(){
 document.getElementById('snd-on').hidden=userMuted;
 document.getElementById('snd-off').hidden=!userMuted;
 muteBtn.setAttribute('aria-pressed',String(userMuted));
 const hint=document.getElementById('soundHint');
 if(hint)hint.hidden=audible||userMuted;
}
window.paintSound=paintSound;
/* try to play with sound; resolves false when the browser blocks it */
function playAudible(fromStart){
 if(userMuted)return Promise.resolve(false);
 const wasMuted=theme.muted;
 theme.muted=false;
 if(fromStart){try{theme.currentTime=0;}catch(e){}}
 const pr=theme.play();
 if(!pr||!pr.then){audible=true;return Promise.resolve(true);}
 return pr.then(()=>{audible=true;return true;})
   .catch(()=>{if(wasMuted||!audible){theme.muted=true;playSilent();}return false;});
}
/* silent autoplay is permitted, so keep the track running and ready */
function playSilent(){theme.muted=true;const pr=theme.play();if(pr&&pr.catch)pr.catch(()=>{});}
/* the gate's ENTER click is the user gesture that unlocks sound */
window.enterWithSound=function(){userMuted=false;store.set('muted',false);playAudible(true).then(()=>paintSound());};
window.enterSilent=function(){userMuted=true;store.set('muted',true);theme.muted=true;paintSound();};
const EVTS=['pointerdown','mousedown','touchstart','keydown','click'];
function onFirstGesture(){
 if(userMuted||audible)return;
 playAudible(true).then(ok=>{if(ok){EVTS.forEach(e=>document.removeEventListener(e,onFirstGesture,true));paintSound();}});
}
paintSound();
playAudible(false).then(ok=>{
 if(ok){paintSound();return;}
 playSilent();                                   // already rolling, just inaudible
 EVTS.forEach(e=>document.addEventListener(e,onFirstGesture,true));
 paintSound();
});
document.addEventListener('visibilitychange',()=>{if(!document.hidden&&!userMuted&&audible&&theme.paused)theme.play().catch(()=>{});});
muteBtn.onclick=e=>{
 e.stopPropagation();
 userMuted=!userMuted;store.set('muted',userMuted);
 if(userMuted){theme.muted=true;}
 else{playAudible(!audible).then(()=>paintSound());}
 paintSound();
};
</script>
