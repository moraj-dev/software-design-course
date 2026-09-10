// Diseño de Aplicaciones — comportamiento ligero del sitio (sin dependencias externas)
document.addEventListener('DOMContentLoaded', function () {

  // Resalta el enlace de la barra de navegación correspondiente a la página actual
  var current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-course .nav-link').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === current) link.classList.add('active');
  });

  // Tabla de contenidos: marca la sección visible mientras se hace scroll
  var tocLinks = document.querySelectorAll('.toc a[href^="#"]');
  if (tocLinks.length) {
    var sections = Array.from(tocLinks).map(function (link) {
      return document.querySelector(link.getAttribute('href'));
    }).filter(Boolean);

    var setActive = function () {
      var pos = window.scrollY + 130;
      var activeIndex = 0;
      sections.forEach(function (sec, i) {
        if (sec.offsetTop <= pos) activeIndex = i;
      });
      tocLinks.forEach(function (l) { l.classList.remove('active'); });
      if (tocLinks[activeIndex]) tocLinks[activeIndex].classList.add('active');
    };
    document.addEventListener('scroll', setActive, { passive: true });
    setActive();
  }

  // Checklist de autoevaluación: alterna el ícono al hacer clic (persistencia solo en memoria)
  document.querySelectorAll('.check-list [data-toggle-check]').forEach(function (item) {
    item.addEventListener('click', function () {
      var icon = item.querySelector('.bi');
      if (!icon) return;
      var done = icon.classList.toggle('bi-check-circle-fill');
      icon.classList.toggle('bi-circle', !done);
      item.classList.toggle('text-decoration-line-through', done);
    });
  });

  // Menú móvil: al elegir un enlace, el menú colapsable se cierra solo,
  // para que el contenido de la página quede visible de inmediato.
  var navCollapseEl = document.getElementById('nav');
  if (navCollapseEl && window.bootstrap) {
    var navCollapseInstance = window.bootstrap.Collapse.getOrCreateInstance(navCollapseEl, { toggle: false });
    navCollapseEl.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        if (navCollapseEl.classList.contains('show')) {
          navCollapseInstance.hide();
        }
      });
    });
  }
});
