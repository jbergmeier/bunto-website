// Tiny, dependency-free sprinkles: scroll reveal, floating splats, click-to-splat, palette strip.
(function () {
  var colors = ['#E63946', '#FF8C42', '#F2B705', '#A7D676', '#2EC27E', '#3FD0C9', '#6EC6FF', '#3A7BD5', '#9B5DE5', '#FF7EB6'];
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  // wrap logo letters
  document.querySelectorAll('.logo').forEach(function (el) {
    el.setAttribute('aria-label', 'Bunto');
    el.innerHTML = 'Bunto'.split('').map(function (c) { return '<span aria-hidden="true">' + c + '</span>'; }).join('');
  });

  // floating background splats
  var host = document.querySelector('.splats');
  if (host) {
    [[8, 12, 150, 0], [88, 8, 110, 1], [92, 46, 170, 2], [4, 52, 120, 3], [16, 88, 180, 4], [80, 90, 140, 5], [50, 4, 80, 6]]
      .forEach(function (s, i) {
        var d = document.createElement('i');
        d.style.cssText = 'left:' + s[0] + '%;top:' + s[1] + '%;width:' + s[2] + 'px;height:' + s[2] + 'px;background:' + colors[(i * 3) % colors.length] + ';animation-delay:' + (s[3] * -1.3) + 's';
        host.appendChild(d);
      });
  }

  // scroll reveal
  var rv = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: .12 });
    rv.forEach(function (el, i) { el.style.transitionDelay = (i % 4) * 70 + 'ms'; io.observe(el); });
  } else { rv.forEach(function (el) { el.classList.add('in'); }); }

  // click anywhere (not on links) -> little paint splat
  function splat(x, y, c) {
    if (reduce) return;
    var s = document.createElement('div');
    s.className = 'splat'; s.style.left = x + 'px'; s.style.top = y + 'px'; s.style.background = c;
    document.body.appendChild(s); setTimeout(function () { s.remove(); }, 750);
  }
  document.addEventListener('click', function (e) {
    if (e.target.closest('a')) return;
    splat(e.clientX, e.clientY, e.target.dataset && e.target.dataset.c || colors[Math.floor(Math.random() * colors.length)]);
  });

  // palette strip: buttons change the accent of the page title underline-free fun: tint the splat floaters
  var strip = document.querySelector('.strip');
  if (strip) colors.forEach(function (c) {
    var b = document.createElement('button');
    b.style.setProperty('--c', c); b.dataset.c = c; b.setAttribute('aria-label', 'color ' + c);
    strip.appendChild(b);
  });
})();
