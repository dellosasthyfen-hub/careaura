 // Autoplay promo iframe when it scrolls into view (muted required for autoplay)
        document.addEventListener('DOMContentLoaded', function(){
          const iframe = document.getElementById('promo-iframe');
          if(!iframe) return;
          const original = iframe.getAttribute('data-src') || iframe.src;
          iframe.setAttribute('data-src', original);
          // Ensure iframe allows autoplay
          iframe.setAttribute('allow', (iframe.getAttribute('allow') || '') + ' autoplay;');

          let isPlaying = false;
          const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if(entry.isIntersecting && entry.intersectionRatio >= 0.5){
                if(!isPlaying){
                  let src = iframe.getAttribute('data-src');
                  // request autoplay and muted in the URL params
                  src = src.replace(/autoplay=false/g, 'autoplay=true');
                  if(!/muted=true/.test(src)) src += '&muted=true';
                  iframe.src = src;
                  isPlaying = true;
                }
              } else {
                if(isPlaying){
                  // stop by resetting to original (autoplay=false)
                  iframe.src = iframe.getAttribute('data-src');
                  isPlaying = false;
                }
              }
            });
          }, {threshold: 0.5});

          observer.observe(iframe);
        });