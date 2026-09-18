(() => {
  const carousel = document.querySelector('.work-carousel');
  if (!carousel) return;
  const track = carousel.querySelector('.carousel-track');
  const previous = carousel.querySelector('.carousel-prev');
  const next = carousel.querySelector('.carousel-next');
  const count = carousel.querySelector('.carousel-count');
  const slides = [...track.querySelectorAll('.carousel-slide')];
  const step = () => slides[0].getBoundingClientRect().width + parseFloat(getComputedStyle(track).gap);
  const update = () => {
    const gap = parseFloat(getComputedStyle(track).gap);
    const first = Math.min(slides.length, Math.round(track.scrollLeft / step()) + 1);
    const last = Math.min(slides.length, Math.max(first, Math.floor((track.scrollLeft + track.clientWidth + gap + 1) / step())));
    count.textContent = `${first === last ? first : `${first}–${last}`} / ${slides.length}`;
    previous.disabled = track.scrollLeft < 2;
    next.disabled = track.scrollLeft >= track.scrollWidth - track.clientWidth - 2;
  };
  const move = direction => track.scrollBy({left: direction * step(), behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'});
  previous.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));
  track.addEventListener('scroll', update, {passive: true});
  track.addEventListener('keydown', event => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    move(event.key === 'ArrowRight' ? 1 : -1);
  });
  new ResizeObserver(update).observe(track);
  update();
})();
