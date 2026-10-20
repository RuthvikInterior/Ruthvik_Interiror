/**
 * Ruthvik Interior Studios - Animation Observer Architecture
 */

document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll('.fade-in');

  if (animatedElements.length > 0 && 'IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    };

    const animationObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    animatedElements.forEach(el => animationObserver.observe(el));
  }

  // Interactive "From Concept to Completion" Process Interface
  const processContainer = document.getElementById('process-interactive');
  if (processContainer) {
    const tabs = Array.from(processContainer.querySelectorAll('[role="tab"]'));
    const panels = Array.from(processContainer.querySelectorAll('[role="tabpanel"]'));

    function activateTab(tab) {
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
        t.setAttribute('tabindex', '-1');
      });

      panels.forEach(p => {
        p.classList.remove('active');
        p.hidden = true;
      });

      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      tab.setAttribute('tabindex', '0');
      tab.focus();

      const targetId = tab.getAttribute('aria-controls');
      const panel = document.getElementById(targetId);
      if (panel) {
        panel.classList.add('active');
        panel.hidden = false;
      }
    }

    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => activateTab(tab));

      tab.addEventListener('keydown', (e) => {
        let targetIndex = null;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          targetIndex = (index + 1) % tabs.length;
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          targetIndex = (index - 1 + tabs.length) % tabs.length;
        } else if (e.key === 'Home') {
          targetIndex = 0;
        } else if (e.key === 'End') {
          targetIndex = tabs.length - 1;
        }

        if (targetIndex !== null) {
          e.preventDefault();
          activateTab(tabs[targetIndex]);
        }
      });
    });
  }

  // Category Selector Tabs (Residential & Commercial)
  const categoryContainer = document.getElementById('category-tabs');
  if (categoryContainer) {
    const catTabs = Array.from(categoryContainer.querySelectorAll('[role="tab"]'));
    const catPanels = Array.from(categoryContainer.querySelectorAll('[role="tabpanel"]'));

    function activateCatTab(tab) {
      catTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
        t.setAttribute('tabindex', '-1');
      });

      catPanels.forEach(p => {
        p.classList.remove('active');
        p.hidden = true;
      });

      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      tab.setAttribute('tabindex', '0');

      const targetId = tab.getAttribute('aria-controls');
      const panel = document.getElementById(targetId);
      if (panel) {
        panel.classList.add('active');
        panel.hidden = false;
      }
    }

    catTabs.forEach((tab, index) => {
      tab.addEventListener('click', () => activateCatTab(tab));

      tab.addEventListener('keydown', (e) => {
        let targetIndex = null;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          targetIndex = (index + 1) % catTabs.length;
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          targetIndex = (index - 1 + catTabs.length) % catTabs.length;
        } else if (e.key === 'Home') {
          targetIndex = 0;
        } else if (e.key === 'End') {
          targetIndex = catTabs.length - 1;
        }

        if (targetIndex !== null) {
          e.preventDefault();
          activateCatTab(catTabs[targetIndex]);
          catTabs[targetIndex].focus();
        }
      });
    });
  }
});

