document.addEventListener('DOMContentLoaded', () => {
  const playButton = document.getElementById('play-button');
  const creditsButton = document.getElementById('credits-button');
  const closeCredits = document.getElementById('close-credits');
  const creditsPanel = document.getElementById('credits-panel');
  const menuPanel = document.querySelector('.menu-panel');

  const gameUrl = 'musiic-brothers-parte-2.html';

  playButton.addEventListener('click', () => {
    window.location.href = gameUrl;
  });

  creditsButton.addEventListener('click', () => {
    creditsPanel.classList.remove('hidden');
    menuPanel.setAttribute('aria-hidden', 'true');
  });

  closeCredits.addEventListener('click', () => {
    creditsPanel.classList.add('hidden');
    menuPanel.removeAttribute('aria-hidden');
  });
});
