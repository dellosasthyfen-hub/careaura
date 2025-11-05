const img = document.getElementById('scrollImage');
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;

    let progress = scrollTop / maxScroll;

    let rotateY = -progress * 60; 
    let rotateX = progress * 20;  

  
    const maxRotateY = -30; 
    const maxRotateX = 10; 

    rotateY = Math.max(rotateY, maxRotateY);
    rotateX = Math.min(rotateX, maxRotateX);

    const perspective = 800;
    img.style.transform = `perspective(${perspective}px) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
  });