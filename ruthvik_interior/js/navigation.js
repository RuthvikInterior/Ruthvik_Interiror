/**
 * Ruthvik Interior Studios - Site Shell Navigation Architecture
 */

document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('site-header');
  const toggleBtn = document.getElementById('mobile-nav-toggle');
  const drawer = document.getElementById('mobile-nav-drawer');
  const overlay = document.getElementById('mobile-drawer-overlay');
  const closeBtn = document.getElementById('mobile-drawer-close');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  // Sticky Header Scroll Controller
  if (header) {
    const handleScroll = () => {
      const scrollPos = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
      if (scrollPos > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
  }

  // Mobile Drawer Toggle Controller
  if (toggleBtn && drawer) {
    const openMenu = () => {
      toggleBtn.setAttribute('aria-expanded', 'true');
      drawer.setAttribute('aria-hidden', 'false');
      drawer.classList.add('active');
      document.body.classList.add('nav-open');

      if (closeBtn) {
        closeBtn.focus();
      }
    };

    const closeMenu = () => {
      toggleBtn.setAttribute('aria-expanded', 'false');
      drawer.setAttribute('aria-hidden', 'true');
      drawer.classList.remove('active');
      document.body.classList.remove('nav-open');

      toggleBtn.focus();
    };

    const isMenuOpen = () => drawer.classList.contains('active');

    toggleBtn.addEventListener('click', () => {
      if (isMenuOpen()) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', closeMenu);
    }

    if (overlay) {
      overlay.addEventListener('click', closeMenu);
    }

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Keyboard Accessibility: Escape key closes menu
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && isMenuOpen()) {
        closeMenu();
      }
    });
  }
});
