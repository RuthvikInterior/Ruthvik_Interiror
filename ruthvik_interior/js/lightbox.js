/**
 * Ruthvik Interior Studios - Accessible Modal Lightbox Architecture
 * 
 * Dependency-free, accessible modal lightbox for portfolio presentation.
 * Features:
 * - Keyboard navigation (Escape, ArrowLeft, ArrowRight)
 * - Trapped focus & focus return to trigger element
 * - Mobile touch-swipe gesture support
 * - Category-aware navigation (cycles only within currently filtered items)
 * - ARIA live regions & dialog semantics
 */

(function () {
  'use strict';

  class StudioLightbox {
    constructor() {
      this.items = [];
      this.currentIndex = 0;
      this.triggerElement = null;
      this.isOpen = false;
      this.touchStartX = 0;
      this.touchEndX = 0;

      this.initDOM();
      this.bindEvents();
    }

    initDOM() {
      // Check if lightbox container already exists
      let lightbox = document.getElementById('studio-lightbox');
      if (!lightbox) {
        lightbox = document.createElement('div');
        lightbox.id = 'studio-lightbox';
        lightbox.className = 'studio-lightbox';
        lightbox.setAttribute('role', 'dialog');
        lightbox.setAttribute('aria-modal', 'true');
        lightbox.setAttribute('aria-label', 'Project Image Gallery');
        lightbox.setAttribute('aria-hidden', 'true');

        lightbox.innerHTML = `
          <div class="lightbox-backdrop" data-action="close"></div>
          <div class="lightbox-dialog" role="document">
            <button type="button" class="lightbox-btn lightbox-btn--close" data-action="close" aria-label="Close image gallery (Press Escape)">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>

            <button type="button" class="lightbox-btn lightbox-btn--prev" data-action="prev" aria-label="Previous project (Press Left Arrow)">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>

            <button type="button" class="lightbox-btn lightbox-btn--next" data-action="next" aria-label="Next project (Press Right Arrow)">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>

            <div class="lightbox-body">
              <div class="lightbox-image-wrap">
                <img src="" alt="" class="lightbox-img" id="lightbox-img" />
                <div class="lightbox-loader" aria-hidden="true"></div>
              </div>
              <div class="lightbox-info">
                <div class="lightbox-meta-top">
                  <span class="lightbox-category" id="lightbox-category"></span>
                  <span class="lightbox-provenance" id="lightbox-provenance"></span>
                  <span class="lightbox-counter" id="lightbox-counter" aria-live="polite"></span>
                </div>
                <h3 class="lightbox-title" id="lightbox-title"></h3>
                <p class="lightbox-desc" id="lightbox-desc"></p>
                <div class="lightbox-actions">
                  <a href="contact.html" class="btn btn-primary btn-sm">Enquire About This Design</a>
                </div>
              </div>
            </div>
          </div>
        `;

        document.body.appendChild(lightbox);
      }

      this.el = lightbox;
      this.img = lightbox.querySelector('#lightbox-img');
      this.category = lightbox.querySelector('#lightbox-category');
      this.provenance = lightbox.querySelector('#lightbox-provenance');
      this.counter = lightbox.querySelector('#lightbox-counter');
      this.title = lightbox.querySelector('#lightbox-title');
      this.desc = lightbox.querySelector('#lightbox-desc');
      this.closeBtn = lightbox.querySelector('.lightbox-btn--close');
      this.prevBtn = lightbox.querySelector('.lightbox-btn--prev');
      this.nextBtn = lightbox.querySelector('.lightbox-btn--next');
    }

    setItems(items) {
      this.items = items || [];
    }

    open(index, triggerElement = null) {
      if (!this.items || this.items.length === 0) return;

      this.currentIndex = Math.max(0, Math.min(index, this.items.length - 1));
      this.triggerElement = triggerElement;
      this.isOpen = true;

      this.el.classList.add('is-open');
      this.el.setAttribute('aria-hidden', 'false');
      document.body.classList.add('lightbox-open');

      this.render();
      if (this.closeBtn) {
        this.closeBtn.focus();
      }
    }

    close() {
      if (!this.isOpen) return;

      this.isOpen = false;
      this.el.classList.remove('is-open');
      this.el.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('lightbox-open');

      if (this.triggerElement && typeof this.triggerElement.focus === 'function') {
        this.triggerElement.focus();
      }
    }

    prev() {
      if (!this.isOpen || this.items.length <= 1) return;
      this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
      this.render();
    }

    next() {
      if (!this.isOpen || this.items.length <= 1) return;
      this.currentIndex = (this.currentIndex + 1) % this.items.length;
      this.render();
    }

    render() {
      const item = this.items[this.currentIndex];
      if (!item) return;

      // Update image
      this.img.style.opacity = '0';
      this.img.src = item.image;
      this.img.alt = item.alt || item.title;

      this.img.onload = () => {
        this.img.style.opacity = '1';
      };

      // Update metadata
      this.category.textContent = item.categoryLabel || item.category;
      this.title.textContent = item.title;
      this.desc.textContent = item.shortDesc || '';
      this.counter.textContent = `${this.currentIndex + 1} of ${this.items.length}`;

      // Update provenance badge
      if (item.provenance) {
        this.provenance.textContent = item.provenance;
        this.provenance.className = item.isRealProject 
          ? 'lightbox-provenance lightbox-provenance--real' 
          : 'lightbox-provenance lightbox-provenance--concept';
      } else {
        this.provenance.textContent = '';
      }

      // Update nav button states
      const showNav = this.items.length > 1;
      this.prevBtn.style.display = showNav ? 'flex' : 'none';
      this.nextBtn.style.display = showNav ? 'flex' : 'none';
    }

    bindEvents() {
      // Delegate click on lightbox controls & backdrop
      this.el.addEventListener('click', (e) => {
        const actionBtn = e.target.closest('[data-action]');
        if (!actionBtn) return;

        const action = actionBtn.getAttribute('data-action');
        if (action === 'close') this.close();
        if (action === 'prev') this.prev();
        if (action === 'next') this.next();
      });

      // Keyboard navigation
      document.addEventListener('keydown', (e) => {
        if (!this.isOpen) return;

        if (e.key === 'Escape') {
          e.preventDefault();
          this.close();
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          this.prev();
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          this.next();
        } else if (e.key === 'Tab') {
          // Trap focus inside lightbox dialog
          this.trapFocus(e);
        }
      });

      // Touch swipe gestures
      const dialog = this.el.querySelector('.lightbox-dialog');
      if (dialog) {
        dialog.addEventListener('touchstart', (e) => {
          this.touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        dialog.addEventListener('touchend', (e) => {
          this.touchEndX = e.changedTouches[0].screenX;
          this.handleSwipe();
        }, { passive: true });
      }
    }

    handleSwipe() {
      const swipeDistance = this.touchEndX - this.touchStartX;
      const threshold = 45; // Minimum px for swipe

      if (swipeDistance > threshold) {
        // Swiped right -> Previous
        this.prev();
      } else if (swipeDistance < -threshold) {
        // Swiped left -> Next
        this.next();
      }
    }

    trapFocus(e) {
      const focusableEls = this.el.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (focusableEls.length === 0) return;

      const firstEl = focusableEls[0];
      const lastEl = focusableEls[focusableEls.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        }
      } else {
        if (document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    }
  }

  // Export to window
  if (typeof window !== 'undefined') {
    window.StudioLightbox = StudioLightbox;
  }
})();
