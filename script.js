document.addEventListener('DOMContentLoaded', () => {

  // Theme is locked to light-theme by HTML default.

  // ==========================================
  // 2. TOAST NOTIFICATION UTILITY
  // ==========================================
  function showToast(message) {
    const toastContainer = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
      <span>${message}</span>
    `;

    toastContainer.appendChild(toast);

    // Auto-remove toast after 3 seconds
    setTimeout(() => {
      toast.classList.add('fade-out');
      toast.addEventListener('animationend', () => {
        toast.remove();
      });
    }, 2500);
  }

  // ==========================================
  // 3. SHARE LINK UTILITY
  // ==========================================
  const shareBtn = document.getElementById('share-btn');
  shareBtn.addEventListener('click', async () => {
    const shareData = {
      title: 'GharSaDukan Profile',
      text: 'Create your digital shop in 10 seconds with GharSaDukan!',
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        showToast('Shared successfully!');
      } catch (err) {
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  });

  function copyToClipboard() {
    const pageUrl = window.location.href;
    navigator.clipboard.writeText(pageUrl)
      .then(() => {
        showToast('Link copied to clipboard! 📋');
      })
      .catch(() => {
        showToast('Failed to copy link.');
      });
  }

  // ==========================================
  // 4. INTERACTIVE 3D CARD TILT EFFECT
  // ==========================================
  const tiltCards = document.querySelectorAll('[data-tilt]');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const cardRect = card.getBoundingClientRect();

      // Compute cursor coordinates relative to card center (expressed from -0.5 to 0.5)
      const x = (e.clientX - cardRect.left) / cardRect.width - 0.5;
      const y = (e.clientY - cardRect.top) / cardRect.height - 0.5;

      // Calculate rotation degree (up to 8 degrees rotation)
      const rotateX = (-y * 8).toFixed(2);
      const rotateY = (x * 8).toFixed(2);

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px) scale(1.005)`;

      // Dynamic shine shift based on cursor
      const cardGlow = card.querySelector('.card-glow');
      if (cardGlow) {
        const glowX = ((x + 0.5) * 100).toFixed(1);
        const glowY = ((y + 0.5) * 100).toFixed(1);
        cardGlow.style.background = `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(255, 107, 107, 0.12) 0%, transparent 60%)`;
      }
    });

    card.addEventListener('mouseleave', () => {
      // Smooth reset back to initial states
      card.style.transform = '';
      const cardGlow = card.querySelector('.card-glow');
      if (cardGlow) {
        cardGlow.style.background = '';
      }
    });
  });
});
