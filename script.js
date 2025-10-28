// --- Page transition overlay
function pageTransition() {
  const overlay = document.getElementById('page-transition-overlay');
  overlay.classList.add('show-overlay');
  setTimeout(()=>{ overlay.classList.remove('show-overlay'); },650);
}
// --- Section display with fade transitions
function showSection(section) {
  pageTransition();
  setTimeout(()=>{
    document.getElementById('home-section').classList.add('hidden');
    document.getElementById('login-section').classList.add('hidden');
    document.getElementById('register-section').classList.add('hidden');
    document.getElementById(section + '-section').classList.remove('hidden');
    if(section === "home") showGreeting(); else document.getElementById('home-greeting').textContent = "";
  },320);
}
showSection('home');

// --- Animated Particle Background --- //
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
function resizeCanvas() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
resizeCanvas(); window.onresize = resizeCanvas;
function createParticles() {
  let count = Math.floor(window.innerWidth/14)+20;
  particles = [];
  for(let i=0; i<count; i++) {
    particles.push({
      x: Math.random()*canvas.width,y: Math.random()*canvas.height,
      r: 2.4+Math.random()*2.8,
      dx: (Math.random()-0.5)*1.6,dy: (Math.random()-0.5)*1.1,
      color: `rgba(${120+Math.random()*150},${180+Math.random()*55},${100+Math.random()*55},0.28)`
    });
  }
}
createParticles();
function drawParticles() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  for(let p of particles) {
    ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,2*Math.PI);ctx.fillStyle=p.color;ctx.fill();
    p.x += p.dx; p.y += p.dy;
    if(p.x<0 || p.x>canvas.width) p.dx *= -1;
    if(p.y<0 || p.y>canvas.height) p.dy *= -1;
  }
  requestAnimationFrame(drawParticles);
}
drawParticles();

// --- Parallax tilting cards --- //
let allCards = document.querySelectorAll('.parallax-card');
document.addEventListener('mousemove', (e)=>{
  let cx = window.innerWidth/2, cy = window.innerHeight/2;
  let dx = (e.clientX-cx)/cx, dy = (e.clientY-cy)/cy;
  allCards.forEach(card=>{
    card.style.setProperty('--rx',dx.toFixed(2));
    card.style.setProperty('--ry',dy.toFixed(2));
    card.classList.add('parallax-hover');
  });
});
document.addEventListener('mouseleave', ()=>{
  allCards.forEach(card=>card.classList.remove('parallax-hover'));
});

// -- Animated Stats -- //
const statNums = [732, 14820, 7217]; const statEls = ["stat1", "stat2", "stat3"]; let statAnimDone = false;
function animateStats() {
  if(statAnimDone) return; statAnimDone = true;
  statNums.forEach((num, idx)=>{
    let el = document.getElementById(statEls[idx]);
    let c=0, end=num, inc=Math.ceil(end/70);
    let timer = setInterval(()=>{
      if(c<end) {c += inc; if(c>end) c=end; el.textContent = c.toLocaleString();} else clearInterval(timer);
    }, 17 + idx*7);
  });
}
window.addEventListener('load', animateStats);

// --- Typewriter headline --- //
const headerTypeTexts = ["AgroGuard","Your Farm's Smart Guardian","AI for Early Disease Alerts","Protecting Farmers with AI"];
let hdIdx=0, hdChar=0;
function typewriterHeadline() {
  const header = document.querySelector('.typewriter');
  let txt = headerTypeTexts[hdIdx];
  if (hdChar <= txt.length) {
    header.textContent = txt.slice(0, hdChar) + (hdChar%2==0?'|':' ');
    hdChar++;
    setTimeout(typewriterHeadline,45);
  } else {
    header.textContent = txt;
    setTimeout(()=>{
      hdIdx = (hdIdx+1)%headerTypeTexts.length; hdChar=0; typewriterHeadline();
    },1800);
  }
}
typewriterHeadline();

// --- Typewriter News --- //
const newsArray = [
  "🌾 Wheat rust detected in Punjab.",
  "🧬 New AI cure for rice blast!",
  "🚜 Over 14,000 acres protected.",
  "🛰️ Drone diagnosis now nationwide!",
  "💡 Farmers saved 30% yield last year.",
  "🌱 Personalized soil advice is here.",
  "⚡ Real-time alerts, instant solutions!",
];
let currNewsIdx=0, currChar=0;
function typewriterNews() {
  const elem = document.getElementById('typewriter-news');
  let txt = newsArray[currNewsIdx];
  if (currChar <= txt.length) {
    elem.textContent = txt.slice(0, currChar) + (currChar%2==0?'|':' ');
    currChar++;
    setTimeout(typewriterNews, 32);
  } else {
    elem.textContent = txt;
    setTimeout(()=>{ currNewsIdx = (currNewsIdx+1)%newsArray.length; currChar=0; typewriterNews(); },1600);
  }
}
typewriterNews();

// --- Autoplay/ripple Testimonial Carousel with 3D flip --- //
const testimonialsArr = [
  { name: "Rajesh, Punjab", story: "AgroGuard diagnosed leaf blight early and saved my wheat harvest! Responsive, simple, and effective—love it." },
  { name: "Sunita, Gujarat", story: "Simple upload helped me treat rice blast before it spread. The advice was spot-on!" },
  { name: "Vikas, Maharashtra", story: "Now I can get instant advice for tomato blight just by clicking a photo. It works!" },
  { name: "Dr. Mehta, Agronomist", story: "The disease database and smart recommendations are the future of farming!" }
];
let tIdx=0;
function showTestimonial(flip=true) {
  const block = document.getElementById('testimonial-text');
  if(flip){
    block.classList.add('flip');
    setTimeout(()=> {
      block.innerHTML = `<strong>${testimonialsArr[tIdx].name}:</strong> <span>${testimonialsArr[tIdx].story}</span>`;
      block.classList.remove('flip');
    },330);
  } else { block.innerHTML = `<strong>${testimonialsArr[tIdx].name}:</strong> <span>${testimonialsArr[tIdx].story}</span>`; block.classList.remove('flip'); }
}
function nextTestimonial() { tIdx=(tIdx+1)%testimonialsArr.length;showTestimonial();}
function prevTestimonial() { tIdx=(tIdx-1+testimonialsArr.length)%testimonialsArr.length;showTestimonial();}
showTestimonial(false);
setInterval(()=>{ nextTestimonial(); },3800);

// --- Personalized Greeting --- //
function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById('login-email').value;
  localStorage.setItem('userEmail', email);
  showSnackbar("Login successful! 🚀");
  showSection('home');
  showGreeting();
}
function handleRegister(event) {
  event.preventDefault();
  showSnackbar("Registration successful! Please login.");
  showSection('login');
}
function showGreeting() {
  const email = localStorage.getItem('userEmail');
  const greetingBlock = document.getElementById('home-greeting');
  if (email) greetingBlock.innerHTML = `Welcome back, <span style="color:#43a047;font-weight:700;">${email}</span>! 🚜`; else greetingBlock.innerHTML = "";
}

// --- FAQ Accordion --- //
function toggleFAQ(idx) {
  const items = document.querySelectorAll('.faq-answer');
  for(let i=0;i<items.length;i++) if(i===idx) {
    let el=items[i];
    el.style.display=(el.style.display==="block")?"none":"block";
  } else items[i].style.display="none";
}

// --- Snackbar Notification --- //
function showSnackbar(text) {
  const bar=document.getElementById('snackbar');
  bar.textContent=text; bar.style.visibility="visible";
  setTimeout(()=>{ bar.style.visibility="hidden"; },2100);
}
