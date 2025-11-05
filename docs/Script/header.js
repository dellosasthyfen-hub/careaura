// Initialize header behaviour after DOM is ready to avoid async load timing issues
(function(){
  function init(){
    const burger = document.getElementById('burger-menu');
    const nav = document.querySelector('nav.nav');
    if(!burger || !nav) return;

    // ensure the burger is keyboard-accessible
    burger.setAttribute('role','button');
    burger.setAttribute('tabindex','0');

    burger.addEventListener('click', function(){
      setOpen(!nav.classList.contains('open'));
    });
    burger.addEventListener('keydown', function(e){
      if(e.key === 'Enter' || e.key === ' '){
        e.preventDefault();
        setOpen(!nav.classList.contains('open'));
      }
    });

    const BREAKPOINT = 1000;

    function setOpen(open){
      if(open){
        nav.classList.add('open');
        burger.setAttribute('aria-expanded','true');
      } else {
        nav.classList.remove('open');
        burger.setAttribute('aria-expanded','false');
      }
    }

    // close on outside click (mobile)
    document.addEventListener('click', function(e){
      if(nav.classList.contains('open')){
        if(!nav.contains(e.target) && e.target !== burger){
          setOpen(false);
        }
      }
    });

    // debounce resize and auto-close when above breakpoint
    let resizeTimer;
    window.addEventListener('resize', function(){
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function(){
        if(window.innerWidth > BREAKPOINT && nav.classList.contains('open')){
          setOpen(false);
        }
      }, 120);
    });

    // initialize aria state
    burger.setAttribute('aria-expanded', nav.classList.contains('open') ? 'true' : 'false');
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
