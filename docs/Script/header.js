(function(){
      const burger = document.getElementById('burger-menu');
      const nav = document.querySelector('nav.nav');
      if(!burger || !nav) return;
        burger.addEventListener('click', function(){
          setOpen(!nav.classList.contains('open'));
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

        let resizeTimer;
        window.addEventListener('resize', function(){
          clearTimeout(resizeTimer);
          resizeTimer = setTimeout(function(){
            if(window.innerWidth > BREAKPOINT && nav.classList.contains('open')){
              setOpen(false);
            }
          }, 120);
        });

        burger.setAttribute('aria-expanded', nav.classList.contains('open') ? 'true' : 'false');
    })();