//Initialized using Copilot

window.setupImageZoom = function() {
  const images = document.querySelectorAll('table img');
  images.forEach(img => {
    img.style.transition = 'transform 0.2s';
    img.onclick = function() {
      this.style.transform = this.style.transform === 'scale(3)' ? 'scale(1)' : 'scale(3)';
    };
  });
};

document.addEventListener('DOMContentLoaded', window.setupImageZoom);



    

