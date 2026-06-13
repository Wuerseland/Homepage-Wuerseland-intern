// Einfaches SPA: zentrales Menü einfügen, Seiten laden, History API nutzen.
// Menü-Pfade konfigurieren (ein Ort zum Pflegen)
const NAV = [
  {title:"Start", href:"pages/home.html", id:"home"},
  {title:"IP-Adressen", href:"pages/ip-adressen.html", id:"ip-adressen"},
  {title:"Smarthome", href:"pages/smarthome.html", id:"smarthome"},
  {title:"Über", href:"pages/about.html", id:"about"},
  {title:"Kontakt", href:"pages/contact.html", id:"contact"}
];

const sidebar = document.getElementById('sidebar');
const content = document.getElementById('content');
const titleEl = document.getElementById('page-title');
const menuToggle = document.getElementById('menu-toggle');

function buildMenu(){
  sidebar.innerHTML = '';
  const brand = document.createElement('div'); brand.className='brand'; brand.textContent = 'Würseland lokal';
  sidebar.appendChild(brand);
  const nav = document.createElement('nav');
  NAV.forEach(item=>{
    const a = document.createElement('a');
    a.href = `#${item.id}`;
    a.dataset.href = item.href;
    a.id = 'nav-'+item.id;
    a.textContent = item.title;
    a.addEventListener('click',ev=>{
      ev.preventDefault();
      navigateTo(item.id, item.href, item.title);
      if(window.innerWidth < 900) sidebar.classList.remove('open');
    });
    nav.appendChild(a);
  });
  sidebar.appendChild(nav);
}

async function loadPage(href){
  try{
    const res = await fetch(href, { cache: 'no-store' });
    if(!res.ok) throw new Error('Nicht gefunden');
    const html = await res.text();
    content.innerHTML = html;
  }catch(e){
    content.innerHTML = `<h2>Seite nicht gefunden</h2><p>${e.message}</p>`;
  }
}

function setActive(id){
  //document.querySelectorAll('#sidebar nav a').forEach(a=>a.classList.toggle('active', a.id === 'nav-'+id));
  // ersetzt die SPA-Navigation durch vollständiges Laden:
	document.querySelectorAll('#sidebar nav a').forEach(a=>{
	  a.addEventListener('click', ev=>{
		ev.preventDefault();
		window.location.href = a.href; // Browser lädt URL neu -> PHP läuft
	  });
	});
}

function navigateTo(id, href, title, replace=false){
  loadPage(href);
  setActive(id);
  titleEl.textContent = title;
  const state = {id, href, title};
  const url = '#'+id;
  if(replace) history.replaceState(state,'',url);
  else history.pushState(state,'',url);
}

// Handle direct load / hash
function initialRoute(){
  const hash = location.hash.replace('#','');
  const found = NAV.find(n=>n.id===hash) || NAV[0];
  navigateTo(found.id, found.href, found.title, true);
}

window.addEventListener('popstate', e=>{
  const s = e.state;
  if(s) { loadPage(s.href); setActive(s.id); titleEl.textContent = s.title; }
  else initialRoute();
});

menuToggle.addEventListener('click', ()=> sidebar.classList.toggle('open'));


let overlay = document.getElementById('overlay');
if(!overlay){
  overlay = document.createElement('div');
  overlay.id = 'overlay';
  document.body.appendChild(overlay);
}

menuToggle.addEventListener('click', ()=>{
  sidebar.classList.toggle('open');
  overlay.classList.toggle('show');
});
overlay.addEventListener('click', ()=>{
  sidebar.classList.remove('open');
  overlay.classList.remove('show');
});
window.addEventListener('resize', ()=> {
  if(window.innerWidth >= 900){
    sidebar.classList.remove('open');
    overlay.classList.remove('show');
  }
});



// Init
// buildMenu();
/*
const navLinks = document.querySelectorAll('#sidebar nav a');
navLinks.forEach(a=>{
  a.addEventListener('click', ev=>{
    ev.preventDefault();
    const id = a.id?.replace('nav-','') || a.getAttribute('href');
    const href = a.dataset.href || a.getAttribute('data-href') || a.getAttribute('href');
    const title = a.textContent.trim();
    // falls du weiterhin Inhalte per fetch aus pages/*.html lädst:
    navigateTo(id, href, title);
    if(window.innerWidth < 900){ sidebar.classList.remove('open'); overlay.classList.remove('show'); }
  });
});
*/


//initialRoute();
