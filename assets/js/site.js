(function () {
  var depth = (window.location.pathname.match(/\//g) || []).length - 1;
  var BASE = depth > 0 ? '../'.repeat(depth) : './';

  function injectPartial(id, partialPath) {
    var el = document.getElementById(id);
    if (!el) return;
    fetch(BASE + partialPath)
      .then(function (r) { return r.text(); })
      .then(function (html) {
        el.outerHTML = html;
        if (id === 'site-header') highlightNav();
      })
      .catch(function () {});
  }

  function highlightNav() {
    var page = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
    document.querySelectorAll('[data-navpage]').forEach(function (a) {
      if (a.dataset.navpage === page) a.classList.add('active');
    });
  }

  injectPartial('site-header', 'assets/partials/header.html');
  injectPartial('site-footer', 'assets/partials/footer.html');
})();
