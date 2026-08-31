const defaultGallery=[
{title:'School Anniversary',description:'A memorable school celebration.',category:'events',src:'assets/images/school-anniversary.jpg'},
{title:'School Activity 1',description:'A moment from school activities.',category:'events',src:'assets/images/1000029561.jpg'},
{title:'School Activity 2',description:'A moment from school activities.',category:'academic',src:'assets/images/1000029568.jpg'},
{title:'School Activity 3',description:'A moment from school activities.',category:'academic',src:'assets/images/1000029570.jpg'},
{title:'School Activity 4',description:'A moment from school activities.',category:'islamic',src:'assets/images/1000029577.jpg'},
{title:'School Activity 5',description:'A moment from school activities.',category:'events',src:'assets/images/1000029578.jpg'},
{title:'School Activity 6',description:'A moment from school activities.',category:'academic',src:'assets/images/1000029579.jpg'},
{title:'School Activity 7',description:'A moment from school activities.',category:'events',src:'assets/images/1000029583.jpg'},
{title:'School Activity 8',description:'A moment from school activities.',category:'academic',src:'assets/images/1000029593.jpg'},
{title:'School Activity 9',description:'A moment from school activities.',category:'islamic',src:'assets/images/1000029596.jpg'},
{title:'School Activity 10',description:'A moment from school activities.',category:'events',src:'assets/images/1000029603.jpg'}
];
const defaultMedia=[1,2,3,4].map(n=>({type:'video',title:`School Video ${n}`,description:'Me’raj International School activity.',src:`assets/videos/school-video-${n}.mp4`}));
const get=(k,d)=>JSON.parse(localStorage.getItem(k)||'null')||d,save=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
function esc(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function initHeroSlideshow(){
 const slides=get('meraj_gallery',defaultGallery).map(x=>x.src).filter(Boolean);
 const a=document.querySelector('.hero-bg-a'),b=document.querySelector('.hero-bg-b');
 if(!slides.length||!a||!b)return;
 let i=0,showA=true;
 a.style.backgroundImage=`url("${slides[0]}")`;a.classList.add('active');
 if(slides.length===1)return;
 setInterval(()=>{
   i=(i+1)%slides.length;
   const incoming=showA?b:a, outgoing=showA?a:b;
   incoming.style.backgroundImage=`url("${slides[i]}")`;
   incoming.classList.add('active');
   outgoing.classList.remove('active');
   showA=!showA;
 },5000);
}
function render(){let g=get('meraj_gallery',defaultGallery);galleryGrid.innerHTML=g.map(x=>`<article class="gallery-item"><img src="${x.src}" alt="${esc(x.title)}"><div><b>${esc(x.title)}</b><br><small>${esc(x.description||'')}</small></div></article>`).join('');renderMedia()}
function renderMedia(){let q=(mediaSearch.value||'').toLowerCase();let m=get('meraj_media',defaultMedia).filter(x=>(x.title+x.description).toLowerCase().includes(q));mediaGrid.innerHTML=m.map(x=>`<article class="media-card"><b>${esc(x.title)}</b><p>${esc(x.description||'')}</p>${x.type==='audio'?`<audio controls src="${x.src}"></audio>`:`<video controls preload="metadata" src="${x.src}"></video>`}</article>`).join('')||'<p>No media found.</p>'}
window.openSection=name=>{const texts={Nursery:'A caring foundation for early learning, confidence, curiosity and positive habits.',Primary:'Strong academic foundations alongside discipline, creativity, practical knowledge and good character.',Secondary:'Preparing learners for further education, responsible citizenship and future careers.'};sectionContent.innerHTML=`<span class="eyebrow">SCHOOL SECTION</span><h2>${name}</h2><p>${texts[name]}</p><p>Me’raj International School combines Western Education with Islamic Studies and Arabic Language.</p>`;sectionDialog.showModal()};
document.querySelector('.menu').onclick=()=>document.querySelector('.links').classList.toggle('open');mediaSearch.oninput=renderMedia;initHeroSlideshow();langBtn.onclick=()=>{document.documentElement.dir=document.documentElement.dir==='rtl'?'ltr':'rtl';langBtn.textContent=document.documentElement.dir==='rtl'?'English':'العربية'};
galleryFilter.onchange=e=>{let all=get('meraj_gallery',defaultGallery),v=e.target.value,g=v==='all'?all:all.filter(x=>x.category===v);galleryGrid.innerHTML=g.map(x=>`<article class="gallery-item"><img src="${x.src}" alt="${esc(x.title)}"><div><b>${esc(x.title)}</b><br><small>${esc(x.description||'')}</small></div></article>`).join('')||'<p>No images in this category yet.</p>'};
admissionForm.onsubmit=e=>{e.preventDefault();let a=get('meraj_admissions',[]);a.push(Object.fromEntries(new FormData(e.target)));save('meraj_admissions',a);formMsg.textContent='Saved in this GitHub demo browser. Real submissions will use the Hostinger backend.';e.target.reset()};render();
