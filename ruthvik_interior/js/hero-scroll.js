/**
 * Ruthvik Interior Studios - Scroll-Driven Hero Sequence Architecture
 * Smooth, performant scroll-progress-driven transitions between 4 curated interior spaces.
 * Uses requestAnimationFrame, sticky viewport container, and respects prefers-reduced-motion.
 */

(function () {
  'use strict';

  const section = document.getElementById('hero-scroll-sequence');
  if (!section) return;

  const bgLayers = section.querySelectorAll('.hero-bg-layer');
  const fgSlides = section.querySelectorAll('.hero-fg-slide');
  const dots = section.querySelectorAll('.hero-dot');
  const NUM_SLIDES = 4;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let currentSlide = 0;
  let ticking = false;

  /**
   * Calculate normalized scroll progress through the hero section (0.0 to 1.0)
   */
  function getScrollProgress() {
    const rect = section.getBoundingClientRect();
    const sectionHeight = section.offsetHeight;
    const viewportHeight = window.innerHeight;
    const scrollableDistance = sectionHeight - viewportHeight;

    if (scrollableDistance <= 0) return 0;

    const scrolled = -rect.top;
    return Math.max(0, Math.min(1, scrolled / scrollableDistance));
  }

  /**
   * Update active slide based on current progress
   */
  function updateSlide(progress) {
    let targetSlide;
    if (progress < 0.25) {
      targetSlide = 0;
    } else if (progress < 0.50) {
      targetSlide = 1;
    } else if (progress < 0.75) {
      targetSlide = 2;
    } else {
      targetSlide = 3;
    }

    if (targetSlide !== currentSlide) {
      currentSlide = targetSlide;

      // Update background layers
      bgLayers.forEach((layer, i) => {
        if (i === currentSlide) {
          layer.classList.add('hero-bg-active');
          layer.setAttribute('aria-hidden', 'false');
        } else {
          layer.classList.remove('hero-bg-active');
          layer.setAttribute('aria-hidden', 'true');
        }
      });

      // Update foreground text slides
      fgSlides.forEach((slide, i) => {
        if (i === currentSlide) {
          slide.classList.add('hero-fg-slide--active');
          slide.setAttribute('aria-hidden', 'false');
        } else {
          slide.classList.remove('hero-fg-slide--active');
          slide.setAttribute('aria-hidden', 'true');
        }
      });

      // Update navigation dots
      dots.forEach((dot, i) => {
        if (i === currentSlide) {
          dot.classList.add('hero-dot--active');
          dot.setAttribute('aria-current', 'true');
        } else {
          dot.classList.remove('hero-dot--active');
          dot.removeAttribute('aria-current');
        }
      });
    }

    // Subtle pan / zoom depth movement on active image
    if (!prefersReducedMotion) {
      const activeLayer = bgLayers[currentSlide];
      if (activeLayer) {
        const img = activeLayer.querySelector('img');
        if (img) {
          // Progress within current segment (0.0 to 1.0)
          const segmentProgress = (progress - currentSlide * 0.25) / 0.25;
          const subtleScale = 1.04 + segmentProgress * 0.04;
          const subtleShift = segmentProgress * -12;
          img.style.transform = `scale(${subtleScale}) translateY(${subtleShift}px)`;
        }
      }
    }
  }

  /**
   * Scroll handler driven by requestAnimationFrame
   */
  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const progress = getScrollProgress();
        updateSlide(progress);
        ticking = false;
      });
      ticking = true;
    }
  }

  // Dot click handlers - smoothly navigate to target slide position
  dots.forEach((dot) => {
    dot.addEventListener('click', (e) => {
      e.preventDefault();
      const dotIndex = parseInt(dot.getAttribute('data-dot'), 10);
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const viewportHeight = window.innerHeight;
      const scrollableDistance = sectionHeight - viewportHeight;
      const targetScroll = sectionTop + (dotIndex / (NUM_SLIDES - 1)) * scrollableDistance;

      window.scrollTo({
        top: targetScroll,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });
    });
  });

  // Event Listeners
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });

  // Initial execution
  onScroll();

  // Handle prefers-reduced-motion default
  if (prefersReducedMotion) {
    if (bgLayers[0]) bgLayers[0].classList.add('hero-bg-active');
    if (fgSlides[0]) fgSlides[0].classList.add('hero-fg-slide--active');
    if (dots[0]) dots[0].classList.add('hero-dot--active');
  }
})();
