document.addEventListener('DOMContentLoaded', function () {
  initCountdown();

  const buttons = document.querySelectorAll('[data-open-booking]');
  buttons.forEach(function (button) {
    button.addEventListener('click', function () {
      window.open('https://cal.com/victorchuyen/coachai', '_blank', 'noopener,noreferrer');
    });
  });
});

function initCountdown() {
  const hoursEl = document.getElementById('cd-hours');
  const minutesEl = document.getElementById('cd-minutes');
  const secondsEl = document.getElementById('cd-seconds');

  if (!hoursEl || !minutesEl || !secondsEl) return;

  function getTarget() {
    const now = new Date();
    const target = new Date(now);
    target.setHours(24, 0, 0, 0);
    return target;
  }

  let target = getTarget();

  function pad(value) {
    return String(value).padStart(2, '0');
  }

  function render() {
    const now = new Date();
    let diff = target - now;

    if (diff <= 0) {
      target = getTarget();
      diff = target - now;
    }

    const total = Math.floor(diff / 1000);
    const hours = Math.floor(total / 3600);
    const minutes = Math.floor((total % 3600) / 60);
    const seconds = total % 60;

    hoursEl.textContent = pad(hours);
    minutesEl.textContent = pad(minutes);
    secondsEl.textContent = pad(seconds);
  }

  render();
  setInterval(render, 1000);
}