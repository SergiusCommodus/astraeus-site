<script>
{
/* ---------- photographed lines (from concept boards) ---------- */
DIV.STR="ASTRAEUS STRENGTH SYSTEMS";
Object.assign(CATS,{
 travel:{name:"Travel",blurb:"Hardside luggage, packs, duffels and cases. One travel system, Earth and beyond.",hero:"img/trv-luggage.webp"},
 gaming:{name:"Gaming & Audio",blurb:"Headsets, keyboards, mice, controllers and desk equipment for long sessions.",hero:"img/gam-desk.webp"},
 strength:{name:"Strength",blurb:"Racks, plates, bars and benches built with industrial materials for home or field.",hero:"img/str-hero.webp"}
});
CATS.watches.hero="img/eqp-watch.webp";CATS.storage.hero="img/eqp-ec01.webp";CATS.equipment.hero="img/pak-hero.webp";
CATS.everyday.hero="img/mug-hero.webp";CATS.apparel.hero="img/app-hero.webp";
const I=s=>s.split(' ').map(x=>'img/'+x+'.webp');
// drop SVG apparel that the photographed line replaces
["a-tee","a-cap","a-fleece","a-jacket"].forEach(id=>{const i=P.findIndex(p=>p.id===id);if(i>=0)P.splice(i,1);});
// photos for existing items
const addImg=(id,s)=>{const p=P.find(x=>x.id===id);if(p)p.img=I(s);};
addImg("e-bottle","eqp-bottle");addImg("d-pen","eqp-pens");addImg("d-note","eqp-notebook eqp-journal");
const T=(o)=>P.push(Object.assign({av:"in",specs:{}},o));
const EXP="EXPEDITION SERIES",ORBS="ORBITAL SERIES",ES="EARTHSIDE CERTIFIED",FS="FIELD SYSTEMS",MR="MISSION READY";
// WATCH + CASE
T({id:"w-a01",cat:"watches",type:"Three hand",fam:"ASTRAEUS ORBITAL",name:"Orbital A-01 Automatic",model:"A-01",price:1650,mission:"orbital",div:"WCH",kind:"watch",dial:"navy",strap:"nato",series:ORBS,img:I("eqp-watch"),
 desc:"The A-01. Sunburst navy dial, applied indices and the insignia at twelve, on a navy canvas strap with a steel keeper.",materials:"316L stainless case, sapphire crystal, canvas strap with leather lining",dims:"40 mm case, 11.6 mm thick",weight:"84 g",
 specs:{Movement:"ASTRAEUS cal. A-200 automatic, 42 hour reserve",WaterResistance:"100 m",Crystal:"Sapphire, flat",Strap:"20 mm canvas, quick release"}});
T({id:"c-ec01",cat:"storage",type:"Gear case",name:"EC-01 Equipment Case",model:"EC-01",price:360,mission:"frontier",div:"FLD",kind:"case",size:0,series:FS,img:I("eqp-ec01"),
 desc:"Hard shell equipment case with twin draw latches, navy corner armor and a recessed carry handle.",materials:"Polymer shell, aluminum frame, navy corner guards",dims:"460 × 330 × 150 mm",weight:"3.1 kg",
 specs:{Capacity:"Tools, cameras or 6 watches with insert",Closure:"Two draw latches, padlock eyes",WaterResistance:"IP67",Impact:"2 m drop rated"}});
// TRAVEL
const trv=[
 ["t-lug","Hardside Travel System","TS-A01",695,"Luggage","luggage lug-int lug-latch lug-wheel","Three piece hardside set: cabin, medium and large. Aluminum frame, TSA latches, insignia wheel caps.","Polycarbonate shell, aluminum frame and corners, TSA combination latches","Cabin 55 × 38 × 22 cm · Medium 68 × 45 × 27 cm · Large 78 × 52 × 31 cm","3.4 / 4.6 / 5.8 kg",{Wheels:"Eight, 360 degree, replaceable",Interior:"Split compression, zip mesh panels",Handle:"Aluminum telescoping, three stops",Warranty:"Ten years"},"orbital"],
 ["t-exppack","Expedition Backpack","EB-45",295,"Backpack","exp-pack","35 to 45 liter expedition pack with MOLLE front panel and load lifters.","Ripstop nylon, Hypalon panel, aluminum hardware","58 × 34 × 26 cm","1.7 kg",{Volume:"35 L, expands to 45 L",Harness:"Load lifters, hip belt",Sleeve:"16 inch laptop"},"frontier"],
 ["t-day","Daypack 20","DP-20",165,"Backpack","daypack","Compact 20 liter daypack with a clamshell main compartment.","Navy nylon, silver trim","46 × 29 × 16 cm","0.9 kg",{Volume:"20 L",Sleeve:"14 inch laptop",Access:"Clamshell"},"earthside"],
 ["t-comm","Commuter Roll Top","CB-25",185,"Backpack","commuter","25 liter roll top commuter pack in warm white with navy panels.","Coated nylon, aluminum buckle","50 × 30 × 15 cm","1.0 kg",{Volume:"25 L",Closure:"Roll top, metal buckle",Weather:"Water resistant"},"earthside"],
 ["t-duffel","Expedition Duffel","ED-70",245,"Bag","duffel","50 or 70 liter duffel with shoulder strap and end pockets.","Laminated nylon, webbing handles","70 × 35 × 35 cm","1.4 kg",{Volume:"50 L or 70 L",Carry:"Handles, padded shoulder strap",Pockets:"Two end, one internal"},"mars"],
 ["t-sling","Sling Bag 6","SB-06",95,"Bag","sling","Six liter sling for passport, phone and daily carry.","Nylon, silver hardware","30 × 18 × 10 cm","0.35 kg",{Volume:"6 L",Strap:"Adjustable, quick release"},"earthside"],
 ["t-garment","Garment Travel Case","GT-01",425,"Luggage","garment","Hardside garment case with a suit side and a tech organizer side.","Polycarbonate shell, navy lining","56 × 40 × 20 cm","3.9 kg",{Interior:"Suit hanger, tech panel",Latches:"TSA"},"orbital"],
 ["t-week","Weekender 35","WK-35",210,"Bag","weekender","35 liter weekender with leather grab handles and shoe compartment.","Nylon canvas, leather trim","55 × 30 × 28 cm","1.3 kg",{Volume:"35 L",Compartments:"Main, shoe, two exterior"},"lunar"],
 ["t-tech","Tech Case","TC-01",260,"Case","techcase","Aluminum framed laptop and accessory case in orbital navy.","Navy polymer, aluminum frame","42 × 32 × 12 cm","2.2 kg",{Fits:"16 inch laptop plus accessories",Latches:"Two, combination"},"orbital"],
 ["t-tote","Travel Tote 20","TT-20",120,"Bag","tote","Waxed canvas tote with leather straps and an insignia panel.","Waxed canvas, leather","40 × 38 × 16 cm","0.8 kg",{Volume:"20 L",Closure:"Zip top"},"earthside"]
];
trv.forEach(([id,name,model,price,type,img,desc,mat,dims,wt,specs,mission])=>T({id,cat:"travel",type,name,model,price,mission,div:"EXP",kind:"bag",series:EXP,img:I(img.split(' ').map(x=>'trv-'+x).join(' ')),desc,materials:mat,dims,weight:wt,specs}));
// FIELD PACK (equipment)
T({id:"e-a01pack",cat:"equipment",type:"Bag",name:"A-01 Field Pack",model:"FP-A01",price:325,mission:"lunar",div:"EXP",kind:"pack",series:EXP,img:I("pak-hero pak-back pak-int pak-colors pak-hw pak-patch pak-l1 pak-l4"),
 desc:"Modular field pack with machined aluminum buckles, YKK AquaGuard zips and a clamshell interior with removable pouches.",materials:"Ripstop nylon, anodized aluminum hardware, YKK AquaGuard zips",dims:"520 × 320 × 220 mm",weight:"1.9 kg",
 specs:{Volume:"32 L",Sleeve:"Up to 16 inch",Modular:"Attach pouches, tools, accessories",Colorways:"Lunar White, Orbital Navy, Graphite"}});
// GAMING & AUDIO
const gam=[
 ["g-head","A-01 Field Headset","HA-01",349,"Headset","aud-hero aud-colors aud-band aud-cup aud-case aud-life aud-dims","Over ear wireless headset with CNC aluminum frame, replaceable panels and a rugged carry case.","CNC aluminum frame, memory foam cushions, anodized cups","195 × 170 × 90 mm","310 g",{Connectivity:"Bluetooth 5.4, USB C",Noise:"ANC and transparency",Controls:"Tactile buttons, volume wheel",Case:"Hard shell, included"},"lunar"],
 ["g-kbd","A-01 Mechanical Keyboard","KB-01",229,"Keyboard","key-hero key-colors key-kbd key-cap key-dims gam-keyboard","75 percent mechanical keyboard in a CNC aluminum frame with dye sub keycaps.","CNC aluminum case, PBT dye sub keycaps","365 × 135 × 42 mm","1.6 kg",{Layout:"75 percent, hot swap",Switches:"Linear, factory lubed",Connectivity:"USB C, 2.4 GHz, Bluetooth",Colorways:"Lunar White, Orbital Navy, Graphite"},"orbital"],
 ["g-mouse","Field Mouse","GM-01",99,"Mouse","gam-mouse key-mice","Lightweight wireless mouse with a navy and silver shell.","Polymer shell, PTFE feet","126 × 68 × 42 mm","64 g",{Sensor:"26,000 DPI",Battery:"90 hours",Connectivity:"2.4 GHz, USB C"},"orbital"],
 ["g-mat","Orbital Desk Mat","DM-01",45,"Desk mat","key-pads key-pad gam-deskmat","Extended desk mat in three designs: Lunar Survey, Orbital Chart, Topographic.","Micro weave cloth, stitched edges, rubber base","900 × 400 × 4 mm","620 g",{Surface:"Water resistant",Designs:"Lunar Survey, Orbital Chart, Topographic"},"lunar"],
 ["g-ctrl","Field Controller","GC-01",89,"Controller","gam-controller","Wireless controller with textured grips and remappable rear paddles.","Polymer, textured grips","155 × 106 × 62 mm","265 g",{Connectivity:"Bluetooth, USB C",Paddles:"Four, remappable"},"orbital"],
 ["g-chair","Station Chair","CH-01",549,"Chair","gam-chair","All day chair with navy and silver upholstery, 4D arms and lumbar support.","Steel frame, PU leather, cold cure foam","Seat height 46 to 56 cm","24 kg",{Recline:"90 to 165 degrees",Arms:"4D",Support:"Lumbar and head pillows"},"orbital"],
 ["g-dock","Charge Dock","CD-01",79,"Accessory","gam-access","Charging stand, puck and hub set in navy aluminum.","Aluminum, silicone","Hub 110 × 45 mm","420 g",{Output:"65 W total",Includes:"Stand, puck, hub"},"earthside"],
 ["g-skin","Console Skin","SK-01",39,"Accessory","gam-skin","Precision cut skin with orbital chart print for consoles and PCs.","3M vinyl, matte laminate","Model specific","40 g",{Finish:"Matte",Fit:"Model specific"},"deepfield"],
 ["g-model","AV-2126 Display Model","CM-01",149,"Collectible","gam-model","1:200 display model of the ASTRAEUS AV-2126 transit vehicle on a navy stand.","Die cast metal, painted","280 mm long","540 g",{Scale:"1:200",Stand:"Weighted, engraved plate"},"orbital"],
 ["g-mon","Ultrawide Display","UW-34",899,"Monitor","gam-monitor","34 inch curved ultrawide display in a navy and silver housing.","Aluminum stand, polymer housing","34 inch, 1800R","7.8 kg",{Resolution:"3440 × 1440",Refresh:"165 Hz",Ports:"USB C 90 W, DP, HDMI"},"deepfield"]
];
gam.forEach(([id,name,model,price,type,img,desc,mat,dims,wt,specs,mission])=>T({id,cat:"gaming",type,name,model,price,mission,div:"LAB",kind:"tool",series:type==="Headset"||type==="Keyboard"?MR:ES,img:I(img),desc,materials:mat,dims,weight:wt,specs}));
// STRENGTH
const str=[
 ["s-rack","Strength Series Power Rack","PR-01",1495,"Rack","str-hero str-rack str-jcup str-bstore","Full power rack with Westside hole spacing, lined J-cups and integrated bar storage.","11 gauge steel, powder coat, lined J-cups","2,290 × 1,250 × 1,220 mm","145 kg",{Uprights:"3 × 3 inch, 11 gauge",Spacing:"Westside, numbered",Capacity:"1,000 lb",Colorways:"Orbital, Terra, Shadow"}],
 ["s-plates","Bumper Plate Set","PS-01",689,"Plates","str-plates str-plate str-pstore","Engraved bumper plates in navy, sand and black.","Virgin rubber, stainless hub","450 mm diameter","260 lb set",{Set:"2 × 45, 2 × 35, 2 × 25, 2 × 10 lb",Tolerance:"±1 percent",Hub:"Stainless steel"}],
 ["s-db","Hex Dumbbell Set","DS-01",899,"Dumbbells","str-dbs str-db","Rubber coated hex dumbbells with knurled chrome handles, 5 to 50 lb.","Cast iron, rubber coat, chrome handle","5 to 50 lb pairs","550 lb set",{Pairs:"10",Handle:"Knurled chrome"}],
 ["s-kb","Kettlebell","KT-01",119,"Kettlebell","str-kb","Powder coated cast iron kettlebell with the insignia cast in.","Cast iron, powder coat","12 to 32 kg","12 to 32 kg",{Sizes:"12, 16, 20, 24, 28, 32 kg",Finish:"Powder coat"}],
 ["s-bar","Strength Barbell","BB-20",395,"Barbell","str-bars str-bar","20 kg barbell with brushed steel shaft and precision knurling.","Brushed steel, bronze bushings","2,200 mm, 28.5 mm shaft","20 kg",{Tensile:"205,000 PSI",Knurl:"Medium, center knurl",Sleeves:"Bronze bushings"}],
 ["s-bench","Adjustable Bench","AB-01",425,"Bench","str-bench str-benchd","Multi angle bench with a heavy duty frame and navy pad.","Steel frame, navy pad","1,350 × 640 × 450 mm","34 kg",{Angles:"Flat to 85 degrees",Capacity:"1,000 lb"}]
];
str.forEach(([id,name,model,price,type,img,desc,mat,dims,wt,specs])=>T({id,cat:"strength",type,name,model,price,mission:"earthside",div:"STR",kind:"tool",series:FS,img:I(img),desc,materials:mat,dims,weight:wt,specs}));
// APPAREL
const app=[
 ["ap-tee-orb","Orbital Tee","AT-10",44,"Shirt","tee-orb","Navy tee with a small chest mark.","Navy","orbital"],
 ["ap-tee-hor","Horizon Tee","AT-11",44,"Shirt","tee-hor","White tee with a vehicle blueprint print.","White","orbital"],
 ["ap-tee-ter","Terra Tee","AT-12",44,"Shirt","tee-ter","Olive tee with a mountain range print.","Olive","frontier"],
 ["ap-tee-luna","Luna Tee","AT-13",48,"Shirt","tee-luna","Charcoal tee with a lunar survey print.","Charcoal","lunar"],
 ["ap-hood-exp","Expedition Hoodie","AH-01",98,"Hoodie","hood-exp","Heavyweight navy hoodie with a sleeve zip pocket.","Navy","frontier"],
 ["ap-hood-ter","Terra Hoodie","AH-02",98,"Hoodie","hood-ter","Bone hoodie with a sleeve zip pocket.","Bone","earthside"],
 ["ap-hood-orb","Orbital Hoodie","AH-03",105,"Hoodie","hood-orb","Charcoal hoodie with an orbital schematic back print.","Charcoal","orbital"],
 ["ap-jacket","Field Jacket","AJ-10",245,"Jacket","jacket","Navy technical field jacket with sleeve pocket and storm hood.","Navy","frontier"],
 ["ap-soft","Softshell","AJ-11",215,"Jacket","softshell","Olive softshell with a brushed interior.","Olive","mars"],
 ["ap-vest","Insulated Vest","AV-01",165,"Vest","vest","Black insulated vest with a stand collar.","Black","deepfield"],
 ["ap-pant","Expedition Pant","AP-10",125,"Pants","pants","Cargo pant in four colors with articulated knees.","Navy, Tan, Olive, Black","mars"],
 ["ap-short","Training Short","AS-01",65,"Shorts","shorts","Training short with zip pockets.","Navy, Tan","earthside"],
 ["ap-cap","Expedition Cap","AC-10",36,"Hat","caps","Six panel cap with woven patch.","Navy, Tan, Black","frontier"],
 ["ap-beanie","Beanie","AB-10",32,"Hat","beanie","Rib knit beanie with a woven label.","Navy, Olive, Charcoal","deepfield"],
 ["ap-sock","Performance Sock 3 Pack","AK-01",28,"Accessory","socks","Cushioned crew socks.","Black, White, Olive","earthside"],
 ["ap-towel","Field Towel","AT-20",38,"Accessory","towel","Quick dry towel with a topographic print.","Navy, Gray","frontier"]
];
app.forEach(([id,name,model,price,type,img,desc,colors,mission])=>T({id,cat:"apparel",type,name,model,price,mission,div:"EXP",kind:"tee",series:EXP,img:I("app-"+img+" app-label app-detail app-life"),desc,materials:"Technical cotton and nylon blends, woven ASTRAEUS labels",dims:"Sizes XS to XXL",weight:"Varies by size",specs:{Colors:colors,Label:"Woven, serial ASN-3206"}}));
// EVERYDAY
T({id:"d-mug",cat:"everyday",type:"Mug",name:"A-01 Expedition Mug",model:"EM-01",price:42,mission:"lunar",div:"MAT",kind:"mug",series:ES,img:I("mug-hero mug-colors mug-lid mug-dims mug-l1 mug-l2 mug-l3"),
 desc:"Insulated stainless mug with a machined aluminum handle, sealed lid and non slip base.",materials:"Stainless steel, ceramic coat, aluminum handle",dims:"118 × 90 mm",weight:"360 g",
 specs:{Volume:"400 ml",Lid:"Spill resistant, insulated",Base:"Rubberized, engraved",Colorways:"Lunar White, Orbital Navy, Graphite"}});
// remove old SVG mug, now photographed
{const i=P.findIndex(p=>p.id==="d-mug"&&!p.img);if(i>=0)P.splice(i,1);}
T({id:"d-laptop",cat:"everyday",type:"Shell",name:"Laptop Shell",model:"LS-01",price:89,mission:"orbital",div:"MAT",kind:"wallet",series:ES,img:I("eqp-laptop"),desc:"Hard shell laptop cover with navy corner bumpers and the insignia.",materials:"Polycarbonate, TPU bumpers",dims:"Fits 14 and 16 inch",weight:"340 g",specs:{Fit:"14 or 16 inch",Bumpers:"Navy TPU"}});
T({id:"d-tablet",cat:"everyday",type:"Folio",name:"Tablet Folio",model:"TF-01",price:79,mission:"orbital",div:"MAT",kind:"wallet",series:ES,img:I("eqp-tablet"),desc:"Folio case with a silver shell and a navy stand cover.",materials:"Aluminum look shell, microfiber",dims:"11 and 13 inch",weight:"280 g",specs:{Fit:"11 or 13 inch",Stand:"Two angle"}});
T({id:"d-pouch",cat:"everyday",type:"Pouch",name:"Field Pouch",model:"TP-01",price:48,mission:"orbital",div:"FLD",kind:"wallet",series:FS,img:I("eqp-pouch"),desc:"Zip organizer pouch for cables, pens and chargers.",materials:"Navy nylon, elastic organizer",dims:"240 × 160 × 50 mm",weight:"160 g",specs:{Organizer:"Elastic loops, mesh pocket"}});

// ---- round 2 ----
T({id:"c-afs01",cat:"storage",type:"Gear case",name:"AFS-01 Field Case",model:"AFS-01",price:420,mission:"orbital",div:"FLD",kind:"case",size:0,series:FS,img:I("afs-case"),
 desc:"The Field Systems flagship case. Warm white shell, brushed rails, navy armored corners and a single center draw latch, with serial plate on the lid.",materials:"Glass filled polymer shell, brushed aluminum rails, navy TPU corner armor, stainless hardware",dims:"420 × 300 × 160 mm",weight:"3.4 kg",
 specs:{Capacity:"Watches, optics or tools with modular foam",Closure:"Center draw latch, padlock eye",WaterResistance:"IP67, pressure valve",Impact:"2 m drop rated",Serial:"Lid plate, SER. 2407 series"}});
T({id:"w-mission",cat:"watches",type:"Hybrid",fam:"ASTRAEUS ORBITAL",name:"Orbital A-01 Mission Watch",model:"A-01M",price:1950,mission:"orbital",div:"WCH",kind:"watch",dial:"black",strap:"rubber",series:ORBS,img:I("afs-watch"),
 desc:"Analog and digital mission instrument. Analog hours and minutes, a 24 hour UTC subdial, and a digital window for mission time, date and sol count.",materials:"Grade 5 titanium case, navy ceramic bezel, sapphire crystal, rubber and textile strap",dims:"46 mm case, 15.8 mm thick",weight:"112 g",
 specs:{Movement:"Hybrid quartz with digital module",Functions:"Hours, minutes, seconds, UTC 24 hour, mission elapsed time, sol counter, date",Bezel:"Octagonal navy ceramic, 12 screws",WaterResistance:"200 m",Battery:"2 year cell, low power mode"}});
T({id:"e-afslaptop",cat:"equipment",type:"Compute",name:"AFS-01 Expedition Compute",model:"AFS-01C",price:2400,mission:"deepfield",div:"FLD",kind:"tool",series:FS,img:I("afs-laptop"),
 desc:"Rugged field laptop with armored corners, sealed ports and a sunlight readable display. Ships with the ASTRAEUS mission interface.",materials:"Magnesium alloy chassis, navy corner armor, sealed port doors",dims:"340 × 270 × 42 mm",weight:"3.2 kg",
 specs:{Display:"14 inch, 1,400 nit, glove touch",Rating:"IP65, MIL-STD-810H",Battery:"Dual hot swap, 18 hours",Ports:"Sealed USB C, USB A, HDMI, RJ45"}});
T({id:"ap-tee-a01",cat:"apparel",type:"Shirt",name:"A-01 Expedition Tee",model:"AT-A01",price:58,mission:"lunar",div:"EXP",kind:"tee",series:EXP,img:I("tee-hero tee-collar tee-patch tee-sleeve tee-hem tee-colors tee-mat tee-scene"),
 desc:"Heavyweight expedition tee with a woven sleeve patch, A-01 sleeve print, coordinate collar label and woven hem tag.",materials:"Premium cotton and tech fabric blend, reinforced seams",dims:"Sizes XS to XXL",weight:"260 g",
 specs:{Colors:"Lunar White, Orbital Navy, Graphite",Patch:"Woven, sleeve",Label:"Coordinates printed collar label",Hem:"Woven tag"}});
T({id:"ap-belt",cat:"apparel",type:"Accessory",name:"Expedition Belt",model:"EB-01",price:78,mission:"frontier",div:"EXP",kind:"tee",series:EXP,img:I("belt-hero belt-buckle belt-lock belt-web belt-tip belt-keeper belt-rear belt-worn belt-colors belt-extras"),
 desc:"Low profile field belt with a CNC machined aluminum buckle, mil spec nylon webbing and an anodized keeper.",materials:"CNC machined 6061 aluminum buckle, mil spec nylon webbing, polymer tip",dims:"Waist 28 to 44 · 1.25 or 1.75 inch",weight:"140 g",
 specs:{Buckle:"6061 aluminum, locking, low profile",Colors:"Orbital Navy, Terra Coyote, Shadow Black",Widths:"1.25 inch standard, 1.75 inch tactical",Extras:"D ring, utility keeper, gear pouch"}});
// watch case line gets photography and board dimensions
const wc=(id,s,d)=>{const p=P.find(x=>x.id===id);if(p){p.img=I(s);if(d)p.dims=d;}};
wc("c-w2","wc-2 wc-closed wc-open wc-latch wc-seal wc-cush wc-int","180 × 110 × 80 mm");
wc("c-w4","wc-4 wc-open wc-closed wc-latch wc-vent wc-cush wc-int wc-lineup","300 × 120 × 90 mm");
wc("c-w4p","wc-4p wc-closed wc-serial wc-mat wc-open wc-mat wc-seal wc-cush wc-lineup","300 × 120 × 90 mm");
wc("c-g4","wc-tech wc-mod wc-int wc-latch wc-lineup","300 × 120 × 120 mm");
CATS.storage.hero="img/afs-case.webp";CATS.watches.hero="img/afs-watch.webp";


// ---- round 3: hoodie, lit watch case, wearable ----
T({id:"ap-hood-a01",cat:"apparel",type:"Hoodie",name:"A-01 Expedition Hoodie",model:"AH-A01",price:145,mission:"lunar",div:"EXP",kind:"tee",series:EXP,feat:1,img:I("hd-hero hd-hood hd-shoulder hd-sleeve hd-patch hd-label hd-colors hd-mat hd-tech"),
 desc:"Heavyweight tech fleece hoodie with reinforced navy shoulder panels, a zip sleeve pocket, woven patch, metal A-01 label plate and custom cord hardware.",materials:"Heavyweight tech fleece, abrasion resistant panels, ribbed cuffs and hem, machined cord ends",dims:"Sizes XS to XXL",weight:"720 g",
 specs:{Colors:"Lunar White, Orbital Navy, Graphite",Pockets:"Two zip hand pockets, sleeve utility pocket",Patch:"Woven, left sleeve",Label:"Metal A-01 plate, hem",Fit:"Articulated, regular"}});
T({id:"c-wb4",cat:"storage",type:"Watch case",name:"A-01 Watch Case Four",model:"WC-A01",price:495,mission:"orbital",div:"FLD",kind:"case",size:4,feat:1,series:FS,img:I("wb-closed wb-open wb-latch wb-end wb-cush wb-rail wb-dims wb-colors"),
 desc:"Four watch field case with a lit interior, suede cushions, machined end rails and a center latch under a woven top band.",materials:"Polymer shell, brushed aluminum rails, navy end armor, suede interior",dims:"320 × 120 × 110 mm",weight:"1.6 kg",
 specs:{Capacity:"4 watches, up to 46 mm",Interior:"Lit, suede cushions",Closure:"Center latch, padlock eye",WaterResistance:"IP67, pressure valve",Colorways:"Lunar White, Orbital Navy, Graphite"}});
T({id:"w-orbital-wc",cat:"watches",type:"Wearable",fam:"ASTRAEUS ORBITAL",name:"Orbital Series Wearable Computer",model:"OS-W1",price:1250,mission:"orbital",div:"WCH",kind:"watch",dial:"black",strap:"nato",series:ORBS,feat:1,img:I("sw-hero sw-views sw-ui sw-mod sw-straps sw-dock sw-worn"),
 desc:"Multi mission wearable computer in a serviceable titanium housing. Navigation, environment, vitals, communications and tools, with a modular sensor unit and field replaceable buttons.",materials:"Grade 5 titanium housing, sapphire glass, gasketed seals, standard fasteners",dims:"49 × 42 × 14 mm",weight:"78 g with nylon strap",
 specs:{Display:"Sapphire, 2,000 nit",Sensors:"GPS, barometer, heart rate, SpO2, HRV, temperature",Battery:"7 day, modular power unit",Straps:"Expedition nylon, flight rubber, titanium link, field leather",Dock:"Magnetic, field and vehicle mount"}});
// feature the boxes
["c-afs01","c-w4","c-w4p"].forEach(id=>{const p=P.find(x=>x.id===id);if(p)p.feat=1;});
{const p=P.find(x=>x.id==="w-mission");if(p)p.feat=1;}
CATS.apparel.hero="img/hd-hero.webp";CATS.storage.hero="img/wb-closed.webp";
// prune anything without photography
for(let i=P.length-1;i>=0;i--)if(!P[i].img)P.splice(i,1);
for(const k of Object.keys(CATS))if(!P.some(p=>p.cat===k))delete CATS[k];

for(const p of P)if(p.img)p.img=p.img;
P.forEach(p=>BYID[p.id]=p);
Object.keys(BYID).forEach(k=>{if(!P.includes(BYID[k]))delete BYID[k];});
}
</script>
