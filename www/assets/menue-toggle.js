(function () {
  function openSubmenu(submenuEl) {
    if (!submenuEl) return;

    submenuEl.hidden = false;

    const toggle = submenuEl.previousElementSibling;
    if (toggle && toggle.classList.contains('menu-toggle')) {
      toggle.setAttribute('aria-expanded', 'true');
    }
  }

  function toggleInitialization() {
    const params = new URLSearchParams(window.location.search);
    const currentPage = params.get('page');
    if (!currentPage) return;

    // exakte Übereinstimmung des page-Parameters (damit nichts “teilweise” matched)
    const currentHref = `index.php?page=${currentPage}`;
    const matchingLinks = document.querySelectorAll(`a[href="${CSS.escape(currentHref)}"]`);

    // fallback: falls du doch mal relative/andere Schreibweise hast
    const linksFallback = matchingLinks.length ? matchingLinks : document.querySelectorAll(`a[href*="${currentPage}"]`);

    (linksFallback || []).forEach((link) => {
      let submenu = link.closest('.submenu');
      while (submenu) {
        openSubmenu(submenu);
        const parentLi = submenu.parentElement; // <li>
        submenu = parentLi?.closest('.submenu');
      }
    });
  }

  function init() {
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.menu-toggle');
      if (!btn) return;

      const targetId = btn.getAttribute('data-target');
      const submenu = targetId ? document.getElementById(targetId) : null;
      if (!submenu) return;

      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!isExpanded));
      submenu.hidden = isExpanded;
    });

    toggleInitialization();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
