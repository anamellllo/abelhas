(function(){
  var els=document.querySelectorAll('.reveal');
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});
  els.forEach(function(e){io.observe(e)});
  var bio=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.querySelectorAll('i[data-w]').forEach(function(b){b.style.width=b.dataset.w+'%'});bio.unobserve(e.target)}})},{threshold:.4});
  document.querySelectorAll('.bars').forEach(function(b){bio.observe(b)});
  var links=document.querySelectorAll('nav a[href^="#"]');
  var so=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){links.forEach(function(a){a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id)})}})},{rootMargin:'-45% 0px -50% 0px'});
  links.forEach(function(a){var s=document.querySelector(a.getAttribute('href'));if(s)so.observe(s)});
})();
