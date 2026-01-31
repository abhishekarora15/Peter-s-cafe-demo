// Peter's Cafe — script.js
// Smooth interactions: sticky header, reveal on scroll, smooth anchors

document.addEventListener('DOMContentLoaded', function(){
  // Year in footer
  const year = document.getElementById('year');
  if(year) year.textContent = new Date().getFullYear();

  // Sticky header background on scroll
  const header = document.getElementById('site-header');
  const hero = document.getElementById('home');
  const heroHeight = hero ? hero.offsetHeight : 400;

  function onScroll(){
    if(window.scrollY > (heroHeight - 80)) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }
  onScroll();
  window.addEventListener('scroll', onScroll, {passive:true});

  // Smooth scrolling for in-page links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e){
      const target = document.querySelector(this.getAttribute('href'));
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth',block:'center'});
      }
    });
  });

  // Reveal on scroll using IntersectionObserver
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  },{threshold:0.12});

  document.querySelectorAll('.about, .menu, .reviews, .visit, .instagram').forEach(el=>observer.observe(el));

  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav ul');
  if(toggle){
    toggle.addEventListener('click',()=>{
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', (!expanded).toString());
      nav.style.display = expanded ? '' : 'flex';
    });
  }
});
