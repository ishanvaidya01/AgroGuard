// --- Page transition overlay ---
function pageTransition() {
  const overlay = document.getElementById('page-transition-overlay');
  overlay.classList.add('show-overlay');
  setTimeout(()=>{ overlay.classList.remove('show-overlay'); },650);
}

// --- Section display with fade transitions ---
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

// --- Animated Particle Background ---
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
      x: Math.random()*canvas.width,
      y: Math.random()*canvas.height,
      r: Math.random()*2+1,
      dx: (Math.random()-0.5)*0.7,
      dy: (Math.random()-0.5)*0.7,
      alpha: Math.random()*0.2+0.5,
      col: (Math.random()>0.6) ? "#43a047" : "#7ed957"
    });
  }
}
function drawParticles() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p=>{
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r,0,2*Math.PI);
    ctx.fillStyle = p.col;
    ctx.globalAlpha = p.alpha;
    ctx.fill();
    ctx.globalAlpha = 1;
    p.x += p.dx; p.y += p.dy;
    if(p.x<0 || p.x>canvas.width) p.dx *= -1;
    if(p.y<0 || p.y>canvas.height) p.dy *= -1;
  });
  requestAnimationFrame(drawParticles);
}
createParticles(); drawParticles(); window.onresize = ()=>{resizeCanvas();createParticles();};

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

// -- Animated Stats --

// --- Success Stories Carousel (4 at a time) ---
const allSuccessStories = [
  { name: "Rajesh, Punjab", story: "AgroGuard detected leaf blight in my wheat early. I saved over 60% of my crop. Grateful!" },
  { name: "Sunita, Gujarat", story: "Quick photo upload helped me treat rice blast before it spread. Amazing results!" },
  { name: "Vikas, Maharashtra", story: "I now diagnose tomato problems instantly—fast & reliable." },
  { name: "Kiran, AP", story: "Detected chilli pest in time, got AI advice, and my yield increased by 40%!" },
  { name: "Sachin, Haryana", story: "MSP confusion solved, focused more on crop health with AgroGuard support." },
  { name: "Deepa, Karnataka", story: "AI recommendations were easy to follow. My groundnut field is healthier." },
  { name: "Mahesh, UP", story: "Found yellow rust in wheat by uploading a photo. Used the suggested action plan—success!" },
  { name: "Poonam, Nashik", story: "Saved money on unnecessary sprays with accurate diagnosis suggestions." },
  { name: "Farmer Group, Kolhapur", story: "Our association tested AgroGuard for sugarcane. All farmers are satisfied!" },
  { name: "Mukesh, Rajasthan", story: "Detected early downy mildew in bajra. AgroGuard guidance prevented loss." },
  { name: "Akash, Vidarbha", story: "Timely detection of cotton wilt helped me save my field." },
  { name: "Geeta, MP", story: "Easy to use and works on my mobile. Diagnosed groundnut leaf spot effectively." },
  { name: "Amit, Bihar", story: "I shared the tool with my village. Everybody impressed by instant disease reports!" },
  { name: "Reshma, Telangana", story: "Got alerts for red leaf spot in paddy—followed all tips, no losses this year." },
  { name: "Naresh, Odisha", story: "Used AgroGuard on maize farm. Detected stalk rot early and took action." },
  { name: "Dr. Mehta, Agronomist", story: "The database and field images help students and farmers alike." },
  { name: "Krishna, Tamil Nadu", story: "Early blight in brinjal detected easily. Best service ever!" },
  { name: "Anita, Chhattisgarh", story: "Crop photo diagnosis is accurate. No more guesswork." },
  { name: "Raju, Jalgaon", story: "I use it every season. Less crop loss, better profits!" },
  { name: "Joshi, Maharashtra", story: "Mango hoppers—spotted & solved in days, thanks to AgroGuard AI." },
  { name: "Shivani, West Bengal", story: "Detected rice blast and brown spot separately; helped both cases neatly." },
  { name: "Shamsher, UP", story: "Photo upload for sugarcane smut. Solved in one week." },
  { name: "Bikram, Tripura", story: "Potato late blight, diagnosed and solved before it was too late!" },
  { name: "Meera, Kerala", story: "Banana wilt solutions by AgroGuard were spot-on for my organic farms." },
  { name: "Sneha, Goa", story: "All small farmers in our club rely on AgroGuard for crop health advice." }
];

let currentStoryBatch = 0;
const STORIES_PER_PAGE = 4;

function renderStoryBatch() {
  const list = document.getElementById('stories-list');
  if (!list) return;
  list.style.opacity = 0;
  setTimeout(() => {
    list.innerHTML = "";
    let start = currentStoryBatch * STORIES_PER_PAGE;
    let batch = allSuccessStories.slice(start, start + STORIES_PER_PAGE);
    // Loop back if end reached
    if (batch.length < STORIES_PER_PAGE) {
      let remainder = STORIES_PER_PAGE - batch.length;
      batch = batch.concat(allSuccessStories.slice(0, remainder));
      currentStoryBatch = -1; // Will wrap to 0 on next increment
    }
    batch.forEach(obj => {
      const el = document.createElement('div');
      el.className = "story";
      el.innerHTML = `<b>${obj.name}:</b> ${obj.story}`;
      list.appendChild(el);
    });
    list.style.opacity = 1;
  }, 350);
}

setInterval(() => {
  currentStoryBatch++;
  if (currentStoryBatch * STORIES_PER_PAGE >= allSuccessStories.length) currentStoryBatch = 0;
  renderStoryBatch();
}, 3400);

window.addEventListener('DOMContentLoaded', renderStoryBatch);

const statNums = [732, 14820, 7217]; const statEls = ["stat1", "stat2", "stat3"]; let statAnimDone = false;
function animateStats() {
  if(statAnimDone) return; statAnimDone = true;
  statNums.forEach((num, idx)=>{
    let el = document.getElementById(statEls[idx]);
    let c=0, end=num, inc=Math.ceil(end/70);
    let timer = setInterval(()=>{
      if(c<end){ c+=inc; if(c>end) c=end; el.textContent = c.toLocaleString();} else clearInterval(timer);
    }, 17 + idx*7);
  });
}
window.addEventListener('load', animateStats);

// --- Typewriter headline ---
// --- Static Main Heading (shows only "AgroGuard") ---
document.addEventListener("DOMContentLoaded", function() {
  const header = document.querySelector('.typewriter');
  if (header) header.textContent = "AgroGuard";
});

// --- Typewriter News ---
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

// --- Autoplay/ripple Testimonial Carousel with 3D flip ---
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
      block.innerHTML = `${testimonialsArr[tIdx].name}: ${testimonialsArr[tIdx].story}`;
      block.classList.remove('flip');
    },330);
  } else { block.innerHTML = `${testimonialsArr[tIdx].name}: ${testimonialsArr[tIdx].story}`; block.classList.remove('flip'); }
}
function nextTestimonial() { tIdx=(tIdx+1)%testimonialsArr.length;showTestimonial(); }
function prevTestimonial() { tIdx=(tIdx-1+testimonialsArr.length)%testimonialsArr.length;showTestimonial(); }
showTestimonial(false);
setInterval(()=>{ nextTestimonial(); },3800);

// --- Personalized Greeting ---
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
  if (email) greetingBlock.innerHTML = `Welcome back, ${email}! 🚜`; else greetingBlock.innerHTML = "";
}

// --- FAQ Accordion ---
function toggleFAQ(idx) {
  const items = document.querySelectorAll('.faq-answer');
  for(let i=0;i<items.length;i++) {
    items[i].style.display = (i===idx && items[i].style.display!=="block") ? "block" : "none";
  }
}

// --- Snackbar Notifications ---
function showSnackbar(msg) {
  let bar = document.getElementById('snackbar');
  bar.textContent = msg; bar.style.visibility = "visible";
  setTimeout(()=>{ bar.style.visibility="hidden"; },2100);
}

function handleGenerate() {
  showSnackbar('Generate button clicked!');
  // TODO: Add any actions you want here!
}


function handleLogout() {
  localStorage.removeItem('userEmail');
  window.location.href = "loginpage.html";
}



