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

  // Interactive Consolidated Methodology Stepper ("From Concept to Completion")
  const methodologyContainer = document.getElementById('methodology-interactive') || document.getElementById('process-interactive');
  if (methodologyContainer) {
    const tabs = Array.from(methodologyContainer.querySelectorAll('[role="tab"]'));
    const panels = Array.from(methodologyContainer.querySelectorAll('[role="tabpanel"]'));
    const prevBtn = document.getElementById('methodology-prev-btn');
    const nextBtn = document.getElementById('methodology-next-btn');
    const progressBar = document.getElementById('methodology-progress-bar');
    const stageBadge = document.getElementById('methodology-badge');
    const stepCounter = document.getElementById('methodology-counter');
    let currentStageIndex = 0;

    function activateStage(index, focusTab = true) {
      // Bounds check to strictly prevent invalid stage indexes
      currentStageIndex = Math.max(0, Math.min(tabs.length - 1, index));

      tabs.forEach((t, i) => {
        const isActive = i === currentStageIndex;
        const isCompleted = i < currentStageIndex;
        t.classList.toggle('active', isActive);
        t.classList.toggle('completed', isCompleted);
        t.setAttribute('aria-selected', isActive ? 'true' : 'false');
        t.setAttribute('tabindex', isActive ? '0' : '-1');
      });

      panels.forEach((p, i) => {
        const isActive = i === currentStageIndex;
        p.classList.toggle('active', isActive);
        p.hidden = !isActive;
      });

      // Update progress bar
      if (progressBar && tabs.length > 1) {
        const percent = (currentStageIndex / (tabs.length - 1)) * 100;
        progressBar.style.width = `${percent}%`;
      }

      // Update status badges and counters
      if (stageBadge) {
        stageBadge.textContent = `STAGE 0${currentStageIndex + 1} OF 0${tabs.length}`;
      }
      if (stepCounter) {
        stepCounter.textContent = `Stage ${currentStageIndex + 1} of ${tabs.length}`;
      }

      // Update Prev / Next button states
      if (prevBtn) {
        prevBtn.disabled = currentStageIndex === 0;
        prevBtn.setAttribute('aria-disabled', currentStageIndex === 0 ? 'true' : 'false');
      }
      if (nextBtn) {
        nextBtn.disabled = currentStageIndex === tabs.length - 1;
        nextBtn.setAttribute('aria-disabled', currentStageIndex === tabs.length - 1 ? 'true' : 'false');
      }

      if (focusTab && tabs[currentStageIndex]) {
        tabs[currentStageIndex].focus();
      }
    }

    tabs.forEach((tab, idx) => {
      tab.addEventListener('click', () => activateStage(idx, false));

      tab.addEventListener('keydown', (e) => {
        let targetIndex = null;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          targetIndex = Math.min(tabs.length - 1, idx + 1);
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          targetIndex = Math.max(0, idx - 1);
        } else if (e.key === 'Home') {
          targetIndex = 0;
        } else if (e.key === 'End') {
          targetIndex = tabs.length - 1;
        }

        if (targetIndex !== null) {
          e.preventDefault();
          activateStage(targetIndex, true);
        }
      });
    });

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (currentStageIndex > 0) {
          activateStage(currentStageIndex - 1, false);
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (currentStageIndex < tabs.length - 1) {
          activateStage(currentStageIndex + 1, false);
        }
      });
    }

    // Initialize initial stage state
    activateStage(0, false);
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

  // Package Inclusions Accordion Toggles
  const packageToggles = document.querySelectorAll('.package-inclusions-toggle');
  packageToggles.forEach(btn => {
    btn.addEventListener('click', function() {
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      const targetId = btn.getAttribute('aria-controls');
      const panel = document.getElementById(targetId);
      const textSpan = btn.querySelector('.toggle-text');

      if (isExpanded) {
        btn.setAttribute('aria-expanded', 'false');
        if (panel) {
          panel.classList.remove('is-open');
          panel.hidden = true;
          panel.setAttribute('hidden', '');
        }
        if (textSpan) textSpan.textContent = 'View Inclusions';
      } else {
        btn.setAttribute('aria-expanded', 'true');
        if (panel) {
          panel.hidden = false;
          panel.removeAttribute('hidden');
          panel.classList.add('is-open');
        }
        if (textSpan) textSpan.textContent = 'Hide Inclusions';
      }
    });
  });
});

