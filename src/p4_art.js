<script>
/* ---------- illustration engine (all inline SVG) ---------- */
const C={navy:"#01274E",deep:"#011A36",blue:"#0E73B3",silver:"#ADAEB1",white:"#FBFAFB",slate:"#3F5570",steel:"#8E9AA8",ink:"#0B1E36"};
let uid=0;
function defs(id,acc){return `<defs>
<linearGradient id="bg${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#063066"/><stop offset="1" stop-color="#01152C"/></linearGradient>
<linearGradient id="st${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#E6E7EA"/><stop offset=".5" stop-color="#ADAEB1"/><stop offset="1" stop-color="#7C8089"/></linearGradient>
<linearGradient id="sv${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F3F3F5"/><stop offset=".5" stop-color="#B9BBC0"/><stop offset="1" stop-color="#8A8E96"/></linearGradient>
<linearGradient id="nv${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0A3B7A"/><stop offset="1" stop-color="#01274E"/></linearGradient>
<linearGradient id="wh${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#D5D8DE"/></linearGradient>
<radialGradient id="dl${id}" cx=".4" cy=".35" r=".8"><stop offset="0" stop-color="${acc||'#0E4F8E'}"/><stop offset="1" stop-color="#01152C"/></radialGradient>
<radialGradient id="glow${id}" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#0E73B3" stop-opacity=".35"/><stop offset="1" stop-color="#0E73B3" stop-opacity="0"/></radialGradient>
<pattern id="gr${id}" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" stroke="#ADAEB1" stroke-opacity=".08"/></pattern>
<clipPath id="cl${id}"><circle cx="0" cy="0" r="1"/></clipPath>
</defs>`;}
function frame(id,inner,label,opts={}){
 const acc=opts.acc;
 return `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${label||''}">${defs(id,acc)}
<rect width="400" height="400" fill="url(#bg${id})"/><rect width="400" height="400" fill="url(#gr${id})"/>
<circle cx="200" cy="230" r="170" fill="url(#glow${id})"/>
${opts.noline?'':`<path d="M20 380H380M20 20V40M380 20V40M20 360V380M380 360V380" stroke="#ADAEB1" stroke-opacity=".35" fill="none"/>`}
${inner}
${opts.mark?`<rect x="18" y="22" width="${opts.mark.length*6.2+12}" height="18" fill="#011A36" opacity=".8"/><text x="24" y="34" font-family="IBM Plex Mono,monospace" font-size="9" letter-spacing="2" fill="#ADAEB1" fill-opacity=".8">${opts.mark}</text>`:''}
</svg>`;}
const T=(x,y,s,txt,o={})=>`<text x="${x}" y="${y}" font-family="${o.f||'IBM Plex Mono,monospace'}" font-size="${s}" fill="${o.c||'#ADAEB1'}" letter-spacing="${o.ls??1.5}" text-anchor="${o.a||'start'}" font-weight="${o.w||400}" opacity="${o.op??1}">${txt}</text>`;

function dialColor(d){return d==="silver"?"#C9CBD0":d==="black"?"#0B1522":"#0A3263";}
function watchArt(p,id,view){
 const dc=dialColor(p.dial), onSilver=p.dial==="silver", hand=onSilver?"#1B2A3D":"#F3F3F5", txt=onSilver?"#1B2A3D":"#E8EAEE";
 const acc=MISSIONS[p.mission]?.accent||C.blue;
 const chrono=p.type==="Chronograph", diver=p.type==="Diver", gmt=p.type==="GMT";
 if(view===1){ // dial detail
  return frame(id,`<g transform="translate(200 200) scale(2.3)">
   <circle r="90" fill="${dc}"/><circle r="90" fill="none" stroke="url(#st${id})" stroke-width="6"/>
   ${Array.from({length:60},(_,i)=>`<line x1="0" y1="-86" x2="0" y2="${i%5?-82:-76}" stroke="${txt}" stroke-width="${i%5?.6:1.4}" transform="rotate(${i*6})"/>`).join('')}
   ${[0,30,60,90,120,150,180,210,240,270,300,330].map(a=>`<rect x="-2.2" y="-74" width="4.4" height="12" fill="${hand}" transform="rotate(${a})"/>`).join('')}
   ${chrono?`<circle cx="-32" r="16" fill="none" stroke="${txt}" stroke-width=".6"/><circle cx="32" r="16" fill="none" stroke="${txt}" stroke-width=".6"/><circle cy="34" r="16" fill="none" stroke="${txt}" stroke-width=".6"/>`:''}
   <g transform="rotate(-40)"><rect x="-1.8" y="-60" width="3.6" height="66" fill="${hand}"/></g><g transform="rotate(50)"><rect x="-1.4" y="-78" width="2.8" height="84" fill="${hand}"/></g>
   <line x1="0" y1="10" x2="0" y2="-80" stroke="${acc}" stroke-width=".9" transform="rotate(200)"/><circle r="2.5" fill="${hand}"/>
   <text y="-40" text-anchor="middle" font-family="Saira,sans-serif" font-size="6" letter-spacing="2" fill="${txt}">ASTRAEUS</text>
  </g>`,p.name+" dial detail",{mark:"DIAL · 2.3X",acc});
 }
 if(view===2){ // caseback
  return frame(id,`<g transform="translate(200 200)">
   <circle r="150" fill="url(#st${id})"/><circle r="128" fill="#9EA1A8"/><circle r="126" fill="none" stroke="#6F737B" stroke-width="1"/>
   <path d="M-126 0A126 126 0 0 1 126 0" fill="none" stroke="#7D8089" stroke-width="2"/>
   <clipPath id="cb${id}"><circle r="110"/></clipPath>
   <g clip-path="url(#cb${id})"><circle r="110" fill="#8E9199"/>${Array.from({length:16},(_,i)=>{const x=Math.sin(i*2.1)*80,y=Math.cos(i*1.7)*80,r=6+((i*7)%18);return `<circle cx="${x}" cy="${y}" r="${r}" fill="#7A7E86"/><circle cx="${x-r*.15}" cy="${y-r*.15}" r="${r*.75}" fill="#9A9DA4"/>`;}).join('')}
   <path d="M-110 20Q-40 -70 110 10" fill="none" stroke="#A9ACB3" stroke-width="30" opacity=".35"/></g>
   ${[0,45,90,135,180,225,270,315].map(a=>`<circle cx="0" cy="-140" r="4" fill="#5E626A" transform="rotate(${a})"/>`).join('')}
   <path id="arc${id}" d="M-100 0A100 100 0 0 1 100 0" fill="none"/><text font-family="Saira,sans-serif" font-size="14" letter-spacing="6" fill="#2F333B"><textPath href="#arc${id}" startOffset="50%" text-anchor="middle">ASTRAEUS</textPath></text>
   <path id="arc2${id}" d="M-100 0A100 100 0 0 0 100 0" fill="none"/><text font-family="IBM Plex Mono,monospace" font-size="9" letter-spacing="3" fill="#2F333B"><textPath href="#arc2${id}" startOffset="50%" text-anchor="middle">${p.model} · ${MISSIONS[p.mission]?.num||'AP-00'} · WATCH DIVISION</textPath></text>
  </g>`,p.name+" caseback",{mark:"CASEBACK · SERIAL 000128",acc});
 }
 if(view===3) return packagingArt(p,id);
 // main
 const strapY=p.strap==="bracelet"?`<rect x="150" y="20" width="100" height="100" fill="url(#st${id})"/><rect x="150" y="280" width="100" height="110" fill="url(#st${id})"/>${[40,62,84,106].map(y=>`<rect x="150" y="${y}" width="100" height="1.5" fill="#6F737B"/><rect x="183" y="${y-20}" width="34" height="20" fill="#C9CBD0"/>`).join('')}${[300,322,344,366].map(y=>`<rect x="150" y="${y}" width="100" height="1.5" fill="#6F737B"/><rect x="183" y="${y+2}" width="34" height="20" fill="#C9CBD0"/>`).join('')}`
  :p.strap==="nato"?`<rect x="160" y="18" width="80" height="110" fill="#0A3B7A"/><rect x="160" y="275" width="80" height="115" fill="#0A3B7A"/><rect x="160" y="18" width="80" height="110" fill="url(#gr${id})"/><rect x="160" y="275" width="80" height="115" fill="url(#gr${id})"/><rect x="172" y="18" width="4" height="110" fill="#ADAEB1" opacity=".6"/><rect x="224" y="275" width="4" height="115" fill="#ADAEB1" opacity=".6"/><rect x="160" y="330" width="80" height="12" fill="#ADAEB1"/>`
  :`<path d="M162 20h76v110h-76z" fill="#122033"/><path d="M162 275h76v115h-76z" fill="#122033"/>${[40,60,80,100].map(y=>`<rect x="168" y="${y}" width="64" height="4" fill="#0B1522"/>`).join('')}${[300,320,340,360].map(y=>`<rect x="168" y="${y}" width="64" height="4" fill="#0B1522"/>`).join('')}`;
 const bez=diver?`<circle r="118" fill="#0B1522"/><circle r="118" fill="none" stroke="url(#st${id})" stroke-width="3"/>${Array.from({length:60},(_,i)=>`<line x1="0" y1="-116" x2="0" y2="${i%5?-112:-106}" stroke="#E8EAEE" stroke-width="${i%5?.8:2}" transform="rotate(${i*6})"/>`).join('')}<polygon points="0,-114 -5,-104 5,-104" fill="${acc}"/>`
  :gmt?`<circle r="118" fill="#0B1522"/><path d="M0 -118A118 118 0 0 1 0 118Z" fill="#C9CBD0"/>${Array.from({length:24},(_,i)=>T(0,-105,8,i===0?24:i,{a:"middle",c:i>=12?"#E8EAEE":"#1B2A3D"}).replace('<text','<text transform="rotate('+(i*15)+')"')).join('')}`
  :`<circle r="118" fill="${chrono?'#0B1522':'url(#st'+id+')'}"/>${chrono?Array.from({length:40},(_,i)=>`<line x1="0" y1="-116" x2="0" y2="${i%5?-112:-108}" stroke="#C9CBD0" stroke-width=".8" transform="rotate(${i*9})"/>`).join('')+T(0,-108,7,"TACHYMETRE",{a:"middle",c:"#E8EAEE",ls:1.5}).replace('<text','<text transform="rotate(14)"'):''}`;
 const sub=chrono?`<g fill="none" stroke="${txt}" stroke-width=".8"><circle cx="-42" r="20"/><circle cx="42" r="20"/><circle cy="44" r="20"/></g><line x1="-42" y1="0" x2="-42" y2="-14" stroke="${hand}" stroke-width="1.5"/><line x1="42" y1="0" x2="48" y2="-10" stroke="${hand}" stroke-width="1.5"/><line x1="0" y1="44" x2="0" y2="30" stroke="${hand}" stroke-width="1.5"/>`:'';
 return frame(id,`<g>${strapY}</g>
 <g transform="translate(200 200)">
  <circle r="130" fill="url(#sv${id})"/><rect x="118" y="-62" width="16" height="22" rx="3" fill="url(#sv${id})"/><rect x="118" y="40" width="16" height="22" rx="3" fill="url(#sv${id})"/><rect x="124" y="-11" width="20" height="22" rx="4" fill="url(#sv${id})"/>
  ${bez}
  <circle r="100" fill="${dc}"/>
  ${Array.from({length:60},(_,i)=>`<line x1="0" y1="-98" x2="0" y2="${i%5?-94:-88}" stroke="${txt}" stroke-width="${i%5?.5:1.2}" transform="rotate(${i*6})"/>`).join('')}
  ${[0,30,60,90,120,150,180,210,240,270,300,330].map(a=>a===0?`<rect x="-3" y="-86" width="6" height="14" fill="${hand}"/>`:`<rect x="-2" y="-86" width="4" height="12" fill="${hand}" transform="rotate(${a})"/>`).join('')}
  ${sub}
  <text y="-48" text-anchor="middle" font-family="Saira,sans-serif" font-size="9" letter-spacing="3" fill="${txt}">ASTRAEUS</text>
  <text y="${chrono?-34:-36}" text-anchor="middle" font-family="IBM Plex Mono,monospace" font-size="5.5" letter-spacing="1.5" fill="${txt}" opacity=".8">${p.fam.replace('ASTRAEUS ','')} · ${p.model}</text>
  <g transform="rotate(-50)"><rect x="-2.6" y="-62" width="5.2" height="70" fill="${hand}"/></g><g transform="rotate(100)"><rect x="-2" y="-84" width="4" height="92" fill="${hand}"/></g>
  <g transform="rotate(215)"><rect x="-.6" y="-90" width="1.2" height="104" fill="${acc}"/></g><circle r="4" fill="${hand}"/><circle r="1.6" fill="${dc}"/>
 </g>`,p.name,{mark:`${p.model} · WATCH DIVISION`,acc});
}
function caseArt(p,id,view){
 const acc=MISSIONS[p.mission]?.accent||C.blue;
 if(view===1){ // open
  return frame(id,`<g transform="translate(200 215)">
   <path d="M-150 -40h300v120a16 16 0 0 1 -16 16h-268a16 16 0 0 1 -16 -16z" fill="#0A3B7A"/><rect x="-150" y="-40" width="300" height="10" fill="#C9CBD0"/>
   <path d="M-150 -40 l20 -110 h260 l20 110z" fill="url(#wh${id})"/><path d="M-130 -150h260l20 110h-300z" fill="#0B1522" opacity=".9" transform="translate(0 0)"/>
   <rect x="-120" y="-130" width="240" height="80" rx="6" fill="#0B1522"/>
   ${(p.size||2)===4?[-100,-40,20,80].map(x=>`<rect x="${x}" y="-20" width="50" height="76" rx="8" fill="#0B1522"/><rect x="${x+6}" y="-14" width="38" height="64" rx="19" fill="#182233"/>`).join(''):[-90,10].map(x=>`<rect x="${x}" y="-20" width="80" height="76" rx="10" fill="#0B1522"/><rect x="${x+10}" y="-12" width="60" height="60" rx="30" fill="#182233"/>`).join('')}
   ${T(-120,-100,9,"ASTRAEUS FIELD SYSTEMS",{c:"#ADAEB1"})}${T(-120,-84,7,`${p.model} · INTERIOR CONFIGURATION`,{c:"#6F7C8C"})}
  </g>`,p.name+" open",{mark:`${p.model} · OPEN`,acc});
 }
 if(view===2){ // latch + dimensions diagram
  return frame(id,`<g transform="translate(200 200)" fill="none" stroke="#ADAEB1" stroke-width="1">
   <rect x="-140" y="-90" width="280" height="150" rx="14"/><rect x="-140" y="-90" width="280" height="150" rx="14" stroke-dasharray="3 5" opacity=".4" transform="scale(1.06)"/>
   <rect x="-30" y="-90" width="60" height="150" opacity=".5"/><circle cx="90" cy="-50" r="22"/><rect x="-16" y="50" width="32" height="26" rx="3" stroke="${acc}"/>
   <path d="M-150 80v20M150 80v20M-150 95h300" /><path d="M-160 -90h-20M-160 60h-20M-175 -90v150"/>
   <path d="M170 -90h30M170 -30h30M185 -90v60"/>
  </g>
  ${T(200,320,9,p.dims.split(',')[0].split('×')[0].trim()+" mm",{a:"middle"})}${T(28,200,9,"150",{a:"middle"}).replace('<text','<text transform="rotate(-90 28 200)"')}${T(380,170,8,"H",{a:"middle"})}
  ${T(24,370,8,"TWIST AND PULL LATCH · PRESSURE VALVE · WEBBING ANCHOR",{c:"#6F7C8C"})}`,p.name+" diagram",{mark:`${p.model} · DRAWING REV A`,acc});
 }
 if(view===3) return packagingArt(p,id);
 const tall=p.tall, h=tall?170:130, prem=p.prem;
 return frame(id,`<g transform="translate(200 ${tall?212:208})">
  <rect x="-156" y="${-h/2-6}" width="312" height="${h+12}" rx="18" fill="#0A3B7A"/>
  <rect x="-150" y="${-h/2}" width="300" height="${h}" rx="14" fill="${prem?'url(#st'+id+')':'url(#wh'+id+')'}"/>
  <rect x="-150" y="-2" width="300" height="5" fill="#8A8E96" opacity=".6"/>
  <rect x="-34" y="${-h/2}" width="68" height="${h}" fill="#565C66"/><rect x="-34" y="${-h/2}" width="68" height="${h}" fill="url(#gr${id})"/>
  <circle cx="88" cy="${-h/2+40}" r="24" fill="#0B1522"/><circle cx="88" cy="${-h/2+40}" r="24" fill="url(#dl${id})"/><circle cx="88" cy="${-h/2+40}" r="26" fill="none" stroke="#C9CBD0" stroke-width="3"/>
  ${[0,1,2,3,4].map(i=>`<circle cx="${80+i*4}" cy="${-h/2+32+i*3}" r="1" fill="#FBFAFB"/>`).join('')}
  <image href="${LOGO}" x="-128" y="${-h/2+18}" width="30" height="30" clip-path="circle(50%)"/>
  ${T(-92,-h/2+30,8,"ASTRAEUS",{f:"Saira,sans-serif",c:"#1B2A3D",ls:3,w:600})}${T(-92,-h/2+42,6,"FIELD SYSTEMS",{c:"#3F5570"})}
  ${T(-128,h/2-14,7,p.model,{c:"#1B2A3D"})}${T(128,h/2-14,6,"TRV DIV · A/01",{c:"#3F5570",a:"end"})}
  <rect x="-16" y="${h/2-10}" width="32" height="26" rx="4" fill="#A6AAB3"/><rect x="-12" y="${h/2-6}" width="24" height="18" rx="3" fill="url(#st${id})"/>
  <rect x="-156" y="${h/2+2}" width="312" height="8" rx="4" fill="#01274E"/>
 </g>`,p.name,{mark:`${p.model} · FIELD SYSTEMS`,acc});
}
function packagingArt(p,id){
 const acc=MISSIONS[p.mission]?.accent||C.blue; const m=MISSIONS[p.mission];
 return frame(id,`<g transform="translate(200 210)">
  <path d="M-130 -70 l130 -50 l130 50 v150 l-130 50 l-130 -50z" fill="#01274E"/><path d="M-130 -70 l130 -50 l130 50 l-130 50z" fill="#0A3B7A"/><path d="M0 -20 l130 -50 v150 l-130 50z" fill="#011A36"/>
  <path d="M-130 -70 l130 50 v150" fill="none" stroke="#ADAEB1" stroke-width="1.2"/><path d="M-130 -70 l130 -50 l130 50 M0 -20 l130 -50" fill="none" stroke="#ADAEB1" stroke-opacity=".5" stroke-width=".8"/>
  <g transform="translate(-100 -20) skewY(21)"><image href="${LOGO}" x="0" y="0" width="34" height="34" clip-path="circle(50%)"/>
  ${T(0,52,8,"ASTRAEUS",{f:"Saira,sans-serif",c:"#FBFAFB",ls:3,w:600})}${T(0,64,5.5,DIV[p.div],{c:"#ADAEB1"})}
  ${T(0,86,6,"MODEL "+p.model,{c:"#FBFAFB"})}${T(0,96,6,"MISSION "+(m?m.num+" · "+m.name.toUpperCase():"GENERAL ISSUE"),{c:"#ADAEB1"})}${T(0,106,6,"SN 2126-"+p.id.toUpperCase().replace(/-/g,'')+"-0001",{c:"#ADAEB1"})}
  <rect x="0" y="116" width="60" height="8" fill="none" stroke="#ADAEB1" stroke-width=".6"/>${[4,9,13,20,24,31,35,42,48,53].map(x=>`<rect x="${x}" y="116" width="1.4" height="8" fill="#ADAEB1"/>`).join('')}</g>
  <g transform="translate(20 -10) skewY(-21)"><rect x="0" y="0" width="90" height="70" fill="none" stroke="#ADAEB1" stroke-width=".6" opacity=".7"/>${T(4,12,5,"THIS SIDE UP",{c:"#ADAEB1"})}${T(4,24,5,"ISSUED FOR EXPEDITION",{c:"#ADAEB1"})}<path d="M45 32v30M35 44l10-12 10 12" fill="none" stroke="${acc}" stroke-width="1.2"/></g>
 </g>`,p.name+" packaging",{mark:`${p.model} · PACKAGING`,acc});
}
function genericArt(p,id,view){
 const acc=MISSIONS[p.mission]?.accent||C.blue;
 if(view===3) return packagingArt(p,id);
 if(view===2) return frame(id,`<g transform="translate(200 200)" fill="none" stroke="#ADAEB1" stroke-width="1">${shapeOutline(p.kind)}<path d="M-160 120h320" stroke-dasharray="2 6" opacity=".5"/><path d="M-150 110v20M150 110v20"/></g>${T(200,345,9,(p.dims||'').split(',')[0],{a:"middle"})}${T(24,370,8,(p.materials||'').toUpperCase().slice(0,56),{c:"#6F7C8C"})}`,p.name+" drawing",{mark:`${p.model} · DRAWING REV A`,acc});
 const inner=shapeFill(p,id,acc,view===1);
 return frame(id,`<g transform="translate(200 200)${view===1?' scale(1.7) translate(0 10)':''}">${inner}</g>`,p.name,{mark:view===1?`${p.model} · DETAIL`:`${p.model} · ${DIV[p.div].replace('ASTRAEUS ','')}`,acc});
}
function shapeOutline(kind){
 const o={
  bag:`<rect x="-140" y="-50" width="280" height="130" rx="30"/><path d="M-60 -50v-30a60 30 0 0 1 120 0v30"/>`,
  pack:`<path d="M-80 -120h160a20 20 0 0 1 20 20v200h-200v-200a20 20 0 0 1 20 -20z"/><path d="M-50 -120v-20M50 -120v-20"/>`,
  light:`<rect x="-150" y="-22" width="300" height="44" rx="8"/><rect x="60" y="-32" width="90" height="64" rx="10"/>`,
  tool:`<rect x="-100" y="-40" width="200" height="80" rx="10"/><path d="M-100 0h200"/>`,
  container:`<rect x="-150" y="-60" width="300" height="140" rx="8"/><rect x="-150" y="-80" width="300" height="20" rx="4"/>`,
  bottle:`<rect x="-45" y="-140" width="90" height="280" rx="24"/><rect x="-32" y="-170" width="64" height="30" rx="6"/>`,
  notebook:`<rect x="-90" y="-120" width="180" height="240" rx="6"/><path d="M40 -120v240"/>`,
  pen:`<rect x="-150" y="-10" width="300" height="20" rx="8"/><path d="M110 -10l40 10l-40 10"/>`,
  wallet:`<rect x="-100" y="-62" width="200" height="124" rx="10"/>`,
  mug:`<rect x="-70" y="-100" width="140" height="200" rx="12"/><path d="M70 -50h30a30 30 0 0 1 0 60h-30"/>`,
  cell:`<rect x="-120" y="-50" width="240" height="100" rx="14"/><circle cx="70" cy="0" r="28"/>`,
  jacket:`<path d="M-100 -120l50 -20 50 30 50 -30 50 20 20 120 -50 10 -10 110h-120l-10 -110 -50 -10z"/>`,
  tee:`<path d="M-110 -110l60 -20 50 20 50 -20 60 20 20 70 -50 10v150h-160v-150l-50 -10z"/>`,
  cap:`<path d="M-90 20a90 70 0 0 1 180 0z"/><path d="M-120 20h240a20 20 0 0 1 0 30h-240a20 20 0 0 1 0 -30z"/>`,
  patch:`<circle r="110"/>`,
  fleece:`<path d="M-100 -110l55 -20 45 20 45 -20 55 20 20 70 -50 10v150h-140v-150l-50 -10z"/>`,
  pants:`<path d="M-80 -140h160v100l-20 180h-50l-10 -150 -10 150h-50l-20 -180z"/>`,
  rifle:`<path d="M-180 -10h120l20 -10h200v14h-140l-10 40h-30l-10 -40h-30l-20 50h-50l10 -50h-60z"/>`,
  pistol:`<path d="M-120 -40h220v34h-150l-10 20 -20 70h-50l20 -90h-20z"/>`,
  shotgun:`<path d="M-180 -8h120l20 -10h200v14h-150l-8 30h-30l-6 -30h-40l-20 48h-50l10 -48h-56z"/>`,
  sling:`<path d="M-150 60c40 -120 260 -120 300 0" /><rect x="-20" y="-50" width="40" height="18" rx="4"/>`,
  longcase:`<rect x="-170" y="-50" width="340" height="110" rx="10"/><path d="M-170 0h340"/>`,
  disc:`<circle r="90"/><circle r="60"/>`
 };return o[kind]||`<rect x="-100" y="-100" width="200" height="200" rx="12"/>`;
}
function shapeFill(p,id,acc,detail){
 const S=`url(#st${id})`,W=`url(#wh${id})`,N=`url(#nv${id})`,K="#0B1522";
 const lbl=(x,y,t,c)=>T(x,y,6,t,{c:c||"#ADAEB1",ls:1.2});
 const ins=(x,y,s)=>`<image href="${LOGO}" x="${x-s/2}" y="${y-s/2}" width="${s}" height="${s}" clip-path="circle(50%)"/>`;
 const k=p.kind;
 const m={
  bag:()=>`<rect x="-140" y="-50" width="280" height="130" rx="30" fill="${N}"/><rect x="-140" y="40" width="280" height="40" rx="0" fill="${K}" opacity=".5"/><path d="M-60 -50v-30a60 30 0 0 1 120 0v30" fill="none" stroke="${S}" stroke-width="10"/><rect x="-130" y="-20" width="260" height="3" fill="#ADAEB1"/><rect x="-20" y="-40" width="40" height="10" rx="2" fill="${S}"/>${ins(100,20,30)}${lbl(-120,70,"ASTRAEUS EXPEDITIONARY · "+p.model)}`,
  pack:()=>`<path d="M-80 -120h160a20 20 0 0 1 20 20v200h-200v-200a20 20 0 0 1 20 -20z" fill="${N}"/><rect x="-100" y="20" width="200" height="80" fill="${K}" opacity=".5"/><path d="M-50 -120v-30M50 -120v-30" stroke="${S}" stroke-width="12"/><rect x="-70" y="-90" width="140" height="4" fill="#ADAEB1"/><rect x="-70" y="-60" width="140" height="4" fill="#ADAEB1"/>${ins(0,-30,34)}${lbl(-80,70,"SURVEY PACK · "+p.model)}`,
  light:()=>`<rect x="-150" y="-22" width="300" height="44" rx="8" fill="${S}"/><rect x="-150" y="-22" width="90" height="44" rx="8" fill="${N}"/>${[-120,-100,-80].map(x=>`<rect x="${x}" y="-22" width="6" height="44" fill="#ADAEB1" opacity=".6"/>`).join('')}<rect x="60" y="-32" width="90" height="64" rx="10" fill="${S}"/><circle cx="150" cy="0" r="24" fill="#FBFAFB"/><circle cx="150" cy="0" r="12" fill="#E8E2C8"/><rect x="-150" y="-14" width="300" height="2" fill="#FFF" opacity=".5"/>${lbl(-40,4,"ASTRAEUS · "+p.model+" · 900 LM","#1B2A3D")}`,
  tool:()=>`<rect x="-100" y="-40" width="200" height="80" rx="10" fill="${S}"/><rect x="-90" y="-30" width="180" height="26" rx="4" fill="${N}"/><rect x="-90" y="4" width="180" height="26" rx="4" fill="${N}"/><path d="M100 -20h70l-6 10h-64z" fill="#C9CBD0"/><path d="M100 10h50v8h-50z" fill="#C9CBD0"/>${lbl(-80,-13,"ASTRAEUS EQUIPMENT LAB")}${lbl(-80,21,p.model+" · 12 FN")}`,
  container:()=>`<rect x="-150" y="-60" width="300" height="140" rx="8" fill="${N}"/><rect x="-150" y="-80" width="300" height="24" rx="4" fill="${S}"/><rect x="-140" y="-30" width="110" height="50" rx="2" fill="#FBFAFB"/>${lbl(-132,-14,"ASTRAEUS FIELD SYSTEMS","#1B2A3D")}${lbl(-132,0,"MC-10 · 10 L","#1B2A3D")}${lbl(-132,12,"STACK 6 HIGH","#3F5570")}${[60,80,100,120].map(x=>`<rect x="${x}" y="-30" width="4" height="100" fill="#ADAEB1" opacity=".3"/>`).join('')}${ins(110,30,34)}`,
  bottle:()=>`<rect x="-45" y="-140" width="90" height="280" rx="24" fill="${N}"/><rect x="-32" y="-170" width="64" height="34" rx="6" fill="${S}"/><rect x="-45" y="-100" width="90" height="4" fill="#ADAEB1"/>${[0,30,60,90].map(y=>`<rect x="30" y="${-60+y}" width="10" height="1.5" fill="#ADAEB1"/>`).join('')}${ins(0,-20,40)}<text transform="rotate(-90 -18 60)" x="-18" y="60" font-family="Saira,sans-serif" font-size="12" letter-spacing="4" fill="#FBFAFB">ASTRAEUS</text>${lbl(-30,120,"750 ML · TB-750")}`,
  notebook:()=>`<rect x="-90" y="-120" width="180" height="240" rx="6" fill="${N}"/><rect x="-90" y="-120" width="180" height="240" rx="6" fill="url(#gr${id})"/><rect x="40" y="-120" width="4" height="240" fill="#ADAEB1" opacity=".7"/><path d="M-70 -100q60 20 120 0M-70 -60q60 20 120 0M-70 -20q60 20 120 0" fill="none" stroke="#ADAEB1" stroke-opacity=".25"/>${ins(0,0,54)}${lbl(-70,100,"MISSION LOG · A5")}`,
  pen:()=>`<rect x="-150" y="-10" width="300" height="20" rx="8" fill="${S}"/><rect x="-60" y="-10" width="60" height="20" fill="${N}"/><path d="M110 -10l40 10l-40 10z" fill="#C9CBD0"/><rect x="-150" y="-20" width="80" height="8" rx="3" fill="#8A8E96"/>${lbl(-40,3,"ASTRAEUS","#1B2A3D")}`,
  wallet:()=>`<rect x="-100" y="-62" width="200" height="124" rx="10" fill="${S}"/><rect x="-100" y="-62" width="200" height="40" rx="10" fill="${N}"/><rect x="-30" y="-74" width="60" height="18" rx="4" fill="#FBFAFB"/>${ins(70,30,32)}${lbl(-84,40,"CARD CARRIER · CC-06","#1B2A3D")}`,
  mug:()=>`<rect x="-70" y="-100" width="140" height="200" rx="12" fill="${S}"/><rect x="-70" y="-100" width="140" height="22" rx="8" fill="${N}"/><path d="M70 -50h30a30 30 0 0 1 0 60h-30" fill="none" stroke="${S}" stroke-width="16"/>${ins(0,0,56)}${lbl(-50,70,"STATION MUG · SM-12","#1B2A3D")}`,
  cell:()=>`<rect x="-120" y="-50" width="240" height="100" rx="14" fill="${N}"/><rect x="-112" y="-42" width="224" height="84" rx="10" fill="${S}"/><circle cx="70" cy="0" r="28" fill="${K}"/><circle cx="70" cy="0" r="24" fill="none" stroke="#FBFAFB" stroke-width="1"/>${Array.from({length:12},(_,i)=>`<line x1="70" y1="-20" x2="70" y2="-16" stroke="#FBFAFB" transform="rotate(${i*30} 70 0)"/>`).join('')}<line x1="70" y1="0" x2="82" y2="-14" stroke="${acc}" stroke-width="2"/>${lbl(-100,-10,"POWER CELL 20","#1B2A3D")}${lbl(-100,4,"20 000 MAH · 65 W","#3F5570")}`,
  jacket:()=>`<path d="M-100 -120l50 -20 50 30 50 -30 50 20 20 120 -50 10 -10 110h-120l-10 -110 -50 -10z" fill="${N}"/><path d="M0 -110v220" stroke="#ADAEB1" stroke-width="3"/><rect x="-60" y="-50" width="40" height="30" rx="3" fill="#0A3B7A" stroke="#ADAEB1" stroke-width="1"/>${ins(60,-60,30)}<path d="M-50 -140l50 30 50 -30" fill="none" stroke="#ADAEB1" stroke-width="2"/>${lbl(-70,60,"ASTRAEUS ORBITAL")}`,
  tee:()=>`<path d="M-110 -110l60 -20 50 20 50 -20 60 20 20 70 -50 10v150h-160v-150l-50 -10z" fill="${N}"/>${ins(40,-50,24)}<text y="40" text-anchor="middle" font-family="Saira,sans-serif" font-size="14" letter-spacing="4" fill="#FBFAFB">ASTRAEUS</text>${lbl(-36,56,"LUNAR PROGRAM · AP-01")}`,
  cap:()=>`<path d="M-90 20a90 70 0 0 1 180 0z" fill="${N}"/><path d="M0 -50v70" stroke="#ADAEB1" stroke-opacity=".3"/><path d="M-120 20h240a20 20 0 0 1 0 30h-240a20 20 0 0 1 0 -30z" fill="#0A3B7A"/>${ins(0,-10,40)}`,
  patch:()=>`<circle r="110" fill="${N}"/><circle r="110" fill="none" stroke="#ADAEB1" stroke-width="8"/><circle r="96" fill="none" stroke="#ADAEB1" stroke-width="1"/>${ins(0,-10,90)}<text y="70" text-anchor="middle" font-family="Saira,sans-serif" font-size="12" letter-spacing="4" fill="#FBFAFB">PROGRAM SET</text>`,
  fleece:()=>`<path d="M-100 -110l55 -20 45 20 45 -20 55 20 20 70 -50 10v150h-140v-150l-50 -10z" fill="${N}"/><path d="M0 -110v70" stroke="#ADAEB1" stroke-width="4"/>${lbl(-60,20,"DEEP FIELD · AP-07")}${ins(50,-50,22)}`,
  pants:()=>`<path d="M-80 -140h160v100l-20 180h-50l-10 -150 -10 150h-50l-20 -180z" fill="${N}"/><rect x="-80" y="-140" width="160" height="14" fill="#ADAEB1" opacity=".6"/><rect x="30" y="-40" width="40" height="50" rx="3" fill="#0A3B7A" stroke="#ADAEB1"/>`,
  rifle:()=>`<path d="M-180 -10h120l20 -10h200v14h-140l-10 40h-30l-10 -40h-30l-20 50h-50l10 -50h-60z" fill="${N}"/><rect x="40" y="-20" width="130" height="8" fill="${S}"/><rect x="-60" y="-26" width="90" height="10" rx="3" fill="${S}"/><rect x="-10" y="-40" width="14" height="22" rx="4" fill="#C9CBD0"/>${lbl(-170,40,"FR-7 · 6.5 MM · FRONTIER OPERATIONS")}`,
  pistol:()=>`<path d="M-120 -40h220v34h-150l-10 20 -20 70h-50l20 -90h-20z" fill="${N}"/><rect x="-120" y="-40" width="220" height="22" rx="4" fill="${S}"/><rect x="-60" y="-50" width="30" height="8" fill="#C9CBD0"/>${lbl(-110,70,"SP-9 · 9 MM")}`,
  shotgun:()=>`<path d="M-180 -8h120l20 -10h200v14h-150l-8 30h-30l-6 -30h-40l-20 48h-50l10 -48h-56z" fill="${N}"/><rect x="40" y="-18" width="130" height="7" fill="${S}"/><rect x="-40" y="-2" width="70" height="12" rx="3" fill="${S}"/>${lbl(-170,40,"FS-12 · 12 GA")}`,
  sling:()=>`<path d="M-150 60c40 -120 260 -120 300 0" fill="none" stroke="${N}" stroke-width="22"/><path d="M-150 60c40 -120 260 -120 300 0" fill="none" stroke="#ADAEB1" stroke-width="1" stroke-dasharray="2 8"/><rect x="-20" y="-50" width="40" height="18" rx="4" fill="${S}"/><rect x="-160" y="50" width="30" height="20" rx="4" fill="${S}"/><rect x="130" y="50" width="30" height="20" rx="4" fill="${S}"/>`,
  longcase:()=>`<rect x="-170" y="-50" width="340" height="110" rx="10" fill="${W}"/><rect x="-170" y="-2" width="340" height="5" fill="#8A8E96"/><rect x="-60" y="-50" width="50" height="110" fill="#565C66"/><rect x="10" y="-50" width="50" height="110" fill="#565C66"/><rect x="-150" y="-36" width="60" height="26" fill="#01274E"/>${lbl(-146,-22,"ASTRAEUS","#FBFAFB")}${lbl(-146,-13,"LC-110","#ADAEB1")}${ins(130,0,34)}<rect x="-30" y="56" width="20" height="14" rx="3" fill="${S}"/><rect x="10" y="56" width="20" height="14" rx="3" fill="${S}"/>`,
  disc:()=>[[-70,-60,"#C9CDD3"],[0,-60,"#A39189"],[70,-60,"#5B7FA6"],[-70,30,"#0E73B3"],[0,30,"#7D8B99"],[70,30,"#2E9BD8"]].map(([x,y,c],i)=>`<circle cx="${x}" cy="${y}" r="30" fill="${K}"/><circle cx="${x}" cy="${y}" r="30" fill="url(#dl${id})" opacity=".6"/><circle cx="${x}" cy="${y}" r="31" fill="none" stroke="#C9CBD0" stroke-width="3"/><circle cx="${x}" cy="${y+10}" r="12" fill="${c}" opacity=".9"/><circle cx="${x-8}" cy="${y-10}" r="1.5" fill="#FBFAFB"/><circle cx="${x+10}" cy="${y-6}" r="1" fill="#FBFAFB"/>`).join('')
 };
 return (m[k]||(()=>`<rect x="-100" y="-100" width="200" height="200" rx="12" fill="${N}"/>${ins(0,0,80)}`))();
}
function art(p,view=0){const id=++uid; return p.kind==="watch"?watchArt(p,id,view):p.kind==="case"?caseArt(p,id,view):genericArt(p,id,view);}

/* mission insignia */
function insignia(m,size=84){
 const id=++uid;const a=m.accent;
 const inner={
  lunar:`<circle cx="0" cy="-4" r="22" fill="#C9CDD3"/><circle cx="-7" cy="-8" r="5" fill="#9EA1A8"/><circle cx="8" cy="2" r="3" fill="#9EA1A8"/><path d="M-40 26q40 -18 80 0" fill="none" stroke="#FBFAFB" stroke-width="1.5"/>`,
  mars:`<circle cx="0" cy="-2" r="22" fill="${a}"/><ellipse cx="0" cy="-2" rx="34" ry="8" fill="none" stroke="#FBFAFB" stroke-width="1.2" transform="rotate(-20)"/>`,
  deepfield:`${[[-20,-14,2],[10,-24,1.4],[22,6,1.8],[-8,18,1.2],[0,-2,3]].map(([x,y,r])=>`<circle cx="${x}" cy="${y}" r="${r}" fill="#FBFAFB"/>`).join('')}<path d="M-20 -14L0 -2L22 6M10 -24L0 -2L-8 18" stroke="${a}" stroke-width="1" fill="none"/>`,
  orbital:`<circle cx="0" cy="4" r="24" fill="#0E73B3"/><path d="M-24 4a24 24 0 0 0 48 0" fill="#0A4F84"/><ellipse cx="0" cy="-4" rx="36" ry="10" fill="none" stroke="#FBFAFB" stroke-width="1.4" transform="rotate(-15)"/><circle cx="30" cy="-12" r="2.5" fill="#FBFAFB"/>`,
  frontier:`<path d="M-36 20l16 -34 10 16 10 -26 20 44z" fill="${a}"/><path d="M-36 20h72" stroke="#FBFAFB" stroke-width="1.5"/><circle cx="20" cy="-22" r="4" fill="#FBFAFB"/>`,
  earthside:`<circle cx="0" cy="0" r="24" fill="${a}"/><path d="M-10 -14q8 4 4 12t8 10q-10 6 -16 -2t4 -20z" fill="#01274E"/><path d="M10 -16q6 6 2 12" stroke="#01274E" stroke-width="3" fill="none"/>`
 }[m.id];
 return `<svg viewBox="-60 -60 120 120" width="${size}" height="${size}" class="ins" role="img" aria-label="${m.name} insignia"><circle r="58" fill="#01274E" stroke="#ADAEB1" stroke-width="2"/><circle r="50" fill="none" stroke="${a}" stroke-width="1" opacity=".8"/>${inner}<path id="mi${id}" d="M-44 0A44 44 0 0 1 44 0" fill="none"/><text font-family="IBM Plex Mono,monospace" font-size="7.5" letter-spacing="2.5" fill="#FBFAFB"><textPath href="#mi${id}" startOffset="50%" text-anchor="middle">${m.name.toUpperCase()}</textPath></text><text y="44" text-anchor="middle" font-family="IBM Plex Mono,monospace" font-size="7" letter-spacing="2" fill="#ADAEB1">${m.num}</text></svg>`;
}
/* spacecraft */
function shipSVG(){
 return `<svg viewBox="0 0 520 220" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<defs><linearGradient id="hull" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFFFFF"/><stop offset=".55" stop-color="#D9DCE1"/><stop offset="1" stop-color="#8E929B"/></linearGradient>
<linearGradient id="hullN" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0A3B7A"/><stop offset="1" stop-color="#01274E"/></linearGradient>
<linearGradient id="eng" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#2C8FD0" stop-opacity="0"/><stop offset="1" stop-color="#2C8FD0" stop-opacity=".9"/></linearGradient></defs>
<path d="M30 118h60v-6h-60z" fill="url(#eng)" opacity=".8"/><path d="M10 112h80v-2h-80z" fill="#8FD0FF" opacity=".5"/>
<path d="M86 96h30v38h-30z" fill="#6F737B"/><path d="M90 92h20v46h-20z" fill="#3F4450"/>
<path d="M110 70h190l40 -30h40l80 50l20 20l-20 20l-80 50h-40l-40 -30h-190q-30 0 -30 -40t30 -40z" fill="url(#hull)"/>
<path d="M110 70h190l40 -30h40l40 25h-250q-24 0 -26 25h-24v-20z" fill="#FFFFFF" opacity=".5"/>
<path d="M300 150l40 30h40l40 -25h-250z" fill="#8E929B" opacity=".5"/>
<path d="M130 80h150v60h-150z" fill="url(#hullN)"/><path d="M135 84h140v4h-140z" fill="#2C8FD0" opacity=".9"/>
<path d="M150 125h110v8h-110z" fill="#ADAEB1" opacity=".5"/>
<path d="M340 48h32l70 44h-60z" fill="#01274E"/><path d="M345 54h24l54 34h-44z" fill="#2C8FD0" opacity=".35"/>
<path d="M420 94l60 16l-60 16z" fill="#C9CBD0"/>
<path d="M200 40h60v30h-60z" fill="#E6E7EA"/><path d="M210 30h40v10h-40z" fill="#ADAEB1"/>
<path d="M200 150h60v30h-60z" fill="#8E929B"/>
<rect x="296" y="96" width="60" height="28" rx="4" fill="#ADAEB1" opacity=".35"/>
<image href="${LOGO}" x="306" y="88" width="42" height="42" clip-path="circle(50%)"/>
<text x="160" y="112" font-family="Saira,sans-serif" font-size="18" letter-spacing="6" font-weight="600" fill="#FBFAFB">ASTRAEUS</text>
<text x="160" y="124" font-family="IBM Plex Mono,monospace" font-size="6" letter-spacing="2" fill="#ADAEB1">AV-2126 · ORBITAL TRANSIT · EXPEDITIONARY</text>
${[120,140,160,180].map(x=>`<circle cx="${x}" cy="66" r="1.2" fill="#6F737B"/>`).join('')}
<path d="M110 70q-30 0 -30 40t30 40" fill="none" stroke="#6F737B" stroke-width="1"/>
</svg>`;
}
/* hero planet */
function planetSVG(){
 return `<svg viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<defs><radialGradient id="pl" cx=".32" cy=".3" r=".8"><stop offset="0" stop-color="#2C8FD0"/><stop offset=".45" stop-color="#0E73B3"/><stop offset=".8" stop-color="#01274E"/><stop offset="1" stop-color="#011A36"/></radialGradient>
<radialGradient id="atm" cx=".5" cy=".5" r=".5"><stop offset=".86" stop-color="#2C8FD0" stop-opacity="0"/><stop offset=".97" stop-color="#2C8FD0" stop-opacity=".35"/><stop offset="1" stop-color="#2C8FD0" stop-opacity="0"/></radialGradient>
<clipPath id="pc"><circle cx="300" cy="300" r="250"/></clipPath></defs>
<circle cx="300" cy="300" r="270" fill="url(#atm)"/><circle cx="300" cy="300" r="250" fill="url(#pl)"/>
<g clip-path="url(#pc)" fill="#0A4F84" opacity=".9"><path d="M120 200q60 -40 120 -10t40 70q-20 50 -90 40t-70 -100z"/><path d="M330 120q90 -20 140 40t-20 100q-60 20 -110 -30t-10 -110z"/><path d="M200 380q70 -30 140 10t20 90q-80 40 -160 0t0 -100z"/></g>
<g clip-path="url(#pc)"><path d="M60 180q120 -60 240 20t260 -40" fill="none" stroke="#FBFAFB" stroke-opacity=".35" stroke-width="18"/><path d="M40 420q140 -40 300 10t240 -30" fill="none" stroke="#FBFAFB" stroke-opacity=".25" stroke-width="26"/></g>
<path d="M300 300m-250 0a250 250 0 0 0 500 0" fill="#011A36" opacity=".55"/>
<ellipse cx="300" cy="300" rx="330" ry="80" fill="none" stroke="#ADAEB1" stroke-opacity=".35" stroke-width="1" transform="rotate(-18 300 300)"/>
<g transform="rotate(-18 300 300)"><g class="sat"><rect x="596" y="294" width="14" height="6" fill="#C9CBD0"/><rect x="584" y="295" width="10" height="4" fill="#0E73B3"/><rect x="610" y="295" width="10" height="4" fill="#0E73B3"/></g></g>
</svg>`;
}
function catArt(cat){
 const id=++uid;const kinds={watches:"watch",storage:"case",equipment:"pack",everyday:"bottle",apparel:"jacket",firearms:"longcase"};
 const sample=P.find(p=>p.cat===cat&&p.kind===kinds[cat])||P.find(p=>p.cat===cat);
 return `<svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${defs(id)}<g opacity=".55" transform="translate(120 -30) scale(.9)">${sample.kind==="watch"?watchArt(sample,id+1000,0).replace(/<svg[^>]*>|<\/svg>|<defs>[\s\S]*?<\/defs>|<rect width="400" height="400"[^>]*\/>/g,'').replace(/url\(#(\w+)\d+\)/g,(m_,g)=>`url(#${g}${id})`):sample.kind==="case"?caseArt(sample,id,0).replace(/<svg[^>]*>|<\/svg>|<defs>[\s\S]*?<\/defs>|<rect width="400" height="400"[^>]*\/>/g,''):genericArt(sample,id,0).replace(/<svg[^>]*>|<\/svg>|<defs>[\s\S]*?<\/defs>|<rect width="400" height="400"[^>]*\/>/g,'')}</g><rect width="400" height="400" fill="url(#bg${id})" opacity=".55"/><path d="M0 300q200 -80 400 0v100h-400z" fill="#011A36" opacity=".85"/></svg>`;
}
</script>
