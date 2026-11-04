(function(){
  document.documentElement.classList.add('js');
  addEventListener('DOMContentLoaded',function(){
    var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
    var fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
    function splitInto(h,cls){var t=h.textContent,i=0;h.textContent='';
      t.split(/(?<=[、。 ])/).forEach(function(chunk){var w=document.createElement('span');w.className=cls;
        chunk.split('').forEach(function(c){var s=document.createElement(cls==='w'?'i':'span');if(cls!=='w')s.className='ch';s.textContent=c;s.style.setProperty('--i',i++);w.appendChild(s)});h.appendChild(w)})}
    document.querySelectorAll('.ph h1').forEach(function(h){splitInto(h,'ln')});
    document.querySelectorAll('.split').forEach(function(h){splitInto(h,'w')});
    /* reveal */
    var els=document.querySelectorAll('.rv,.split');
    function on(e){e.classList.add('on');e.querySelectorAll('.wipe').forEach(function(w){w.classList.add('on')});if(e.classList.contains('wipe'))e.classList.add('on')}
    if('IntersectionObserver' in window){
      var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){on(e.target);io.unobserve(e.target)}})},{threshold:.08});
      els.forEach(function(e){io.observe(e)});
    }else{els.forEach(on)}
    setTimeout(function(){els.forEach(function(e){if(e.getBoundingClientRect().top<innerHeight)on(e)})},1500);
    setTimeout(function(){els.forEach(on);document.querySelectorAll('.wipe').forEach(function(w){w.classList.add('on')})},8000);
    /* scroll: bar + marquee skew */
    var bar=document.getElementById('bar'),row=document.getElementById('row'),lastY=scrollY,vel=0;
    function sc(){var h=document.documentElement,max=h.scrollHeight-innerHeight;bar.style.transform='scaleX('+(max?scrollY/max:0)+')';
      if(reduce||!row)return;vel=scrollY-lastY;lastY=scrollY;row.style.transform='skewX('+Math.max(-12,Math.min(12,-vel*.4))+'deg)'}
    addEventListener('scroll',sc,{passive:true});sc();
    if(row)setInterval(function(){if(Math.abs(vel)>0){vel*=.6;if(Math.abs(vel)<.5)vel=0;row.style.transform='skewX('+(-vel*.4)+'deg)'}},60);
    /* mouse */
    if(fine&&!reduce){
      var cur=document.getElementById('cur'),cur2=document.getElementById('cur2'),spot=document.getElementById('spot');
      var mx=innerWidth/2,my=innerHeight/2,cx=mx,cy=my;
      var hero=document.querySelector('.ph'),layers=document.querySelectorAll('.stage .layer');
      addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;cur.style.transform='translate('+mx+'px,'+my+'px) translate(-50%,-50%)';
        spot.style.setProperty('--mx',mx+'px');spot.style.setProperty('--my',my+'px');
        var r=hero.getBoundingClientRect();if(r.bottom>0){var dx=(mx/innerWidth-.5),dy=((my-r.top)/r.height-.5);
          layers.forEach(function(l){var d=+l.dataset.d||1;l.style.transform='translate('+(dx*-14*d)+'px,'+(dy*-10*d)+'px)'})}},{passive:true});
      (function loop(){cx+=(mx-cx)*.15;cy+=(my-cy)*.15;cur2.style.transform='translate('+cx+'px,'+cy+'px) translate(-50%,-50%)';requestAnimationFrame(loop)})();
      document.querySelectorAll('a,.card,.svc,.strip img,.mini,.steps li').forEach(function(a){a.addEventListener('mouseenter',function(){cur2.classList.add('big')});a.addEventListener('mouseleave',function(){cur2.classList.remove('big')})});
      document.querySelectorAll('.tilt').forEach(function(c){
        c.addEventListener('mousemove',function(e){var r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;
          c.style.transform='perspective(1400px) rotateY('+((x-.5)*6)+'deg) rotateX('+((.5-y)*6)+'deg) translateY(-6px)';
          c.style.setProperty('--gx',(x*100)+'%');c.style.setProperty('--gy',(y*100)+'%')});
        c.addEventListener('mouseleave',function(){c.style.transform=''});
      });
      document.querySelectorAll('.mag').forEach(function(a){
        a.addEventListener('mousemove',function(e){var r=a.getBoundingClientRect();a.style.transform='translate('+((e.clientX-r.left-r.width/2)*.3)+'px,'+((e.clientY-r.top-r.height/2)*.4)+'px)'});
        a.addEventListener('mouseleave',function(){a.style.transform='';a.style.transition='transform .5s cubic-bezier(.2,.8,.2,1),background .25s,border-color .25s,color .25s'});
      });
    }
  });
})();
