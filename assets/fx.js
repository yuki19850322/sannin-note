(function(){
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
  function ready(f){if(document.readyState!=='loading')f();else addEventListener('DOMContentLoaded',f)}
  ready(function(){
    var b=document.body;
    /* grain + veil */
    var g=document.createElement('div');g.className='fx-grain';b.appendChild(g);
    var v=document.createElement('div');v.className='fx-veil '+(b.dataset.veil==='none'||reduce?'none':'in');b.appendChild(v);
    /* leave transition for internal links */
    document.querySelectorAll('a[href]').forEach(function(a){
      var h=a.getAttribute('href');if(!h||h.charAt(0)==='#'||/^https?:/.test(h)||a.target==='_blank'||a.classList.contains('off'))return;
      a.addEventListener('click',function(e){if(e.metaKey||e.ctrlKey||e.shiftKey||reduce)return;e.preventDefault();v.className='fx-veil out';setTimeout(function(){location.href=h},560)});
    });
    addEventListener('pageshow',function(e){if(e.persisted){v.className='fx-veil '+(b.dataset.veil==='none'?'none':'in')}});
    /* watermark from badge / section index */
    var badge=document.querySelector('.hero-art .badge'),ph=document.querySelector('.ph, .hero');
    if(ph){var wm=document.createElement('div');wm.className='fx-wm';wm.textContent=badge?badge.textContent.split(' ')[0]:'WORK';ph.appendChild(wm)}
    document.querySelectorAll('main section .head').forEach(function(h,i){var s=document.createElement('span');s.className='idx';s.textContent=('0'+(i+1)).slice(-2);h.appendChild(s)});
    /* header shrink */
    function sc(){b.classList.toggle('scrolled',scrollY>40)}addEventListener('scroll',sc,{passive:true});sc();
    if(!fine||reduce)return;
    /* cursor v2 */
    var dot=document.createElement('div'),ring=document.createElement('div'),lab=document.createElement('span');
    dot.className='fx-dot';ring.className='fx-ring';ring.appendChild(lab);b.appendChild(dot);b.appendChild(ring);
    var mx=innerWidth/2,my=innerHeight/2,rx=mx,ry=my;
    addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;dot.style.transform='translate('+mx+'px,'+my+'px) translate(-50%,-50%)';dot.classList.remove('out');ring.classList.remove('out')},{passive:true});
    document.documentElement.addEventListener('mouseleave',function(){dot.classList.add('out');ring.classList.add('out')});
    (function loop(){rx+=(mx-rx)*.18;ry+=(my-ry)*.18;ring.style.transform='translate('+rx+'px,'+ry+'px) translate(-50%,-50%)'+(ring.classList.contains('down')?' scale(.8)':'');requestAnimationFrame(loop)})();
    addEventListener('mousedown',function(){ring.classList.add('down')});addEventListener('mouseup',function(){ring.classList.remove('down')});
    function label(el){
      if(el.dataset.cur)return el.dataset.cur;
      if(el.matches('.strip img,.mini,.hero-art,.pic,.member .pic'))return 'VIEW';
      if(el.matches('a[target=_blank],a.ext,.links a'))return 'OPEN ↗';
      if(el.matches('.btn.off'))return 'SOON';
      if(el.matches('.btn'))return 'GO';
      if(el.matches('nav a'))return '→';
      return 'OPEN';
    }
    var sel='a,button,.card,.pillar,.svc,.strip img,.mini,.hero-art,.member .pic,.steps li,.note,.defs div';
    document.querySelectorAll(sel).forEach(function(el){
      el.addEventListener('mouseenter',function(){lab.textContent=label(el);ring.classList.add('hov');dot.classList.add('hide');if(el.matches('.strip img,.mini,.hero-art,.member .pic,.pic'))ring.classList.add('img');if(el.matches('nav a,.logo,.crumb a'))ring.classList.add('sm')});
      el.addEventListener('mouseleave',function(){ring.classList.remove('hov','img','sm');dot.classList.remove('hide')});
    });
    document.querySelectorAll('h1,h2,h3,p,li span,dd').forEach(function(el){
      el.addEventListener('mouseenter',function(){if(!ring.classList.contains('hov'))ring.classList.add('txt')});
      el.addEventListener('mouseleave',function(){ring.classList.remove('txt')});
    });
    /* magnetic buttons */
    document.querySelectorAll('.btn:not(.off),nav a,.logo').forEach(function(a){
      a.addEventListener('mousemove',function(e){var r=a.getBoundingClientRect();a.style.transform='translate('+((e.clientX-r.left-r.width/2)*.25)+'px,'+((e.clientY-r.top-r.height/2)*.35)+'px)'});
      a.addEventListener('mouseleave',function(){a.style.transform='';a.style.transition='transform .5s cubic-bezier(.2,.8,.2,1)'});
    });
  });
})();
