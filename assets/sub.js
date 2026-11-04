(function(){
  document.documentElement.classList.add('js');
  addEventListener('DOMContentLoaded',function(){
    /* heading chars */
    document.querySelectorAll('.ph h1').forEach(function(h){
      var t=h.textContent,i=0;h.textContent='';
      t.split(/(?<=[、。 ])/).forEach(function(chunk){var ln=document.createElement('span');ln.className='ln';
        chunk.split('').forEach(function(c){var s=document.createElement('span');s.className='ch';s.textContent=c;s.style.setProperty('--i',i++);ln.appendChild(s)});h.appendChild(ln)});
    });
    var els=document.querySelectorAll('.rv');
    function on(e){e.classList.add('on')}
    if('IntersectionObserver' in window){
      var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){on(e.target);io.unobserve(e.target)}})},{threshold:.08});
      els.forEach(function(e){io.observe(e)});
    }else{els.forEach(on)}
    setTimeout(function(){els.forEach(function(e){if(e.getBoundingClientRect().top<innerHeight)on(e)})},1500);
    setTimeout(function(){els.forEach(on)},8000);
    var bar=document.getElementById('bar');
    function sc(){var h=document.documentElement,max=h.scrollHeight-innerHeight;bar.style.transform='scaleX('+(max?scrollY/max:0)+')'}
    addEventListener('scroll',sc,{passive:true});sc();
    var spot=document.getElementById('spot');
    if(spot&&matchMedia('(hover:hover)').matches){addEventListener('mousemove',function(e){spot.style.setProperty('--mx',e.clientX+'px');spot.style.setProperty('--my',e.clientY+'px')},{passive:true})}
  });
})();
