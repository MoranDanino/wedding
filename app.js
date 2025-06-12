// טיימר
function updateCountdown() {
  const target = new Date('2026-06-05T11:45:00');
  const now = new Date();
  let diff = target - now;
  if (diff < 0) diff = 0;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  document.getElementById('days').textContent = days;
  document.getElementById('hours').textContent = hours;
  document.getElementById('minutes').textContent = minutes;
  document.getElementById('seconds').textContent = seconds;
}
setInterval(updateCountdown, 1000);
updateCountdown();
// מוזיקה
const audio = document.getElementById('bg-music');
const toggleBtn = document.getElementById('music-toggle');
audio.volume = 0.7;
audio.play().catch(()=>{});
toggleBtn.onclick = function() {
  if (audio.paused) {
    audio.play();
    toggleBtn.textContent = '🔊';
  } else {
    audio.pause();
    toggleBtn.textContent = '🔇';
  }
};
