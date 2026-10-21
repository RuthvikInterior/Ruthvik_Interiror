/**
 * Ruthvik Interior Studios - Project Portfolio & Filter Architecture
 * 
 * Manages category filtering, query-string deep-linking (e.g. ?category=kitchen),
 * progressive enhancement fallback, and lightbox integration.
 */

document.addEventListener('DOMContentLoaded', () => {
  const gridContainer = document.getElementById('projects-grid');
  const filterContainer = document.getElementById('project-filters');
  if (!gridContainer || !window.PROJECTS_DATA) return;

  const allProjects = window.PROJECTS_DATA;
  let activeCategory = 'all';
  let filteredProjects = [...allProjects];

  // Initialize Lightbox instance
  const lightbox = window.StudioLightbox ? new window.StudioLightbox() : null;

  /**
   * Render project cards into the grid
   */
  function renderProjects(projects) {
    if (projects.length === 0) {
      gridContainer.innerHTML = `
        <div class="projects-empty-state" role="status">
          <p class="empty-state-title">No projects currently available in this category.</p>
          <p class="empty-state-text">Explore our other interior domains or speak with our design team for custom commissions.</p>
          <button type="button" class="btn btn-outline btn-sm reset-filter-btn" style="margin-top: 1rem;">View All Spaces</button>
        </div>
      `;
      const resetBtn = gridContainer.querySelector('.reset-filter-btn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => setCategory('all'));
      }
      return;
    }

    const isFiltered = activeCategory !== 'all';

    gridContainer.innerHTML = projects.map((p, index) => {
      let spanClass = 'portfolio-item-half';

      if (isFiltered) {
        if (projects.length === 1) {
          // Sparse category with 1 item: Centered showcase layout without empty column void
          spanClass = 'portfolio-item-single';
        } else if (projects.length === 2) {
          // 2 items (e.g. Modular Kitchens): Balanced side-by-side 50/50 layout
          spanClass = 'portfolio-item-half';
        } else if (projects.length === 3) {
          // 3 items (e.g. Master Bedrooms): Balanced 3-column row
          spanClass = 'portfolio-item-third';
        } else {
          spanClass = 'portfolio-item-half';
        }
      } else {
        // "All Spaces" rich editorial overview
        if (index === 0 || p.gridSpan === 'span-12') {
          spanClass = 'portfolio-item-hero';
        } else if (p.gridSpan === 'span-7') {
          spanClass = 'portfolio-item-7';
        } else if (p.gridSpan === 'span-5') {
          spanClass = 'portfolio-item-5';
        } else if (p.gridSpan === 'span-4') {
          spanClass = 'portfolio-item-third';
        } else {
          spanClass = 'portfolio-item-half';
        }
      }

      const aspectClass = p.aspect === 'wide' ? 'aspect-wide' : 
                         (p.aspect === 'portrait' ? 'aspect-portrait' : 'aspect-landscape');

      const provenanceBadge = p.isRealProject 
        ? `<span class="portfolio-badge portfolio-badge--real">Completed Client Project</span>`
        : `<span class="portfolio-badge portfolio-badge--concept">Design Concept &amp; 3D Visualization</span>`;

      return `
        <article class="portfolio-item ${spanClass}" data-id="${p.id}" data-category="${p.category}">
          <button type="button" class="portfolio-card-trigger" aria-label="Open ${p.title} in gallery lightbox" data-index="${index}">
            <div class="portfolio-item-visual">
              <div class="architectural-frame ${aspectClass}">
                <img src="${p.image}" alt="${p.alt}" loading="${index < 3 ? 'eager' : 'lazy'}" class="portfolio-card-img" />
                <span class="portfolio-zoom-hint" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
                </span>
              </div>
            </div>
          </button>
          <div class="portfolio-item-caption">
            <div class="portfolio-caption-meta">
              <span class="portfolio-item-category">${p.categoryLabel}</span>
              ${provenanceBadge}
            </div>
            <h2 class="portfolio-item-title">${p.title}</h2>
            <p class="portfolio-item-meta">${p.shortDesc}</p>
          </div>
        </article>
      `;
    }).join('');

    // Attach click handlers for lightbox
    const triggers = gridContainer.querySelectorAll('.portfolio-card-trigger');
    triggers.forEach((btn, idx) => {
      btn.addEventListener('click', () => {
        if (lightbox) {
          lightbox.setItems(filteredProjects);
          lightbox.open(idx, btn);
        }
      });
    });
  }

  /**
   * Apply Category Filter
   */
  function setCategory(category, updateUrl = true) {
    activeCategory = category;

    if (category === 'all') {
      filteredProjects = [...allProjects];
    } else {
      filteredProjects = allProjects.filter(p => p.category === category);
    }

    // Update filter button UI states
    if (filterContainer) {
      const buttons = filterContainer.querySelectorAll('.filter-btn');
      buttons.forEach(btn => {
        const btnCat = btn.getAttribute('data-filter');
        const isActive = btnCat === category;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      });
    }

    renderProjects(filteredProjects);

    // Update URL query parameter cleanly without reloading
    if (updateUrl && window.history && window.history.replaceState) {
      const url = new URL(window.location);
      if (category === 'all') {
        url.searchParams.delete('category');
      } else {
        url.searchParams.set('category', category);
      }
      window.history.replaceState({}, '', url);
    }
  }

  // Bind filter button click events
  if (filterContainer) {
    filterContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;
      const category = btn.getAttribute('data-filter');
      setCategory(category);
    });
  }

  // Read initial category from URL query parameters (e.g. ?category=kitchen)
  const urlParams = new URLSearchParams(window.location.search);
  const initialCategory = urlParams.get('category');
  if (initialCategory && allProjects.some(p => p.category === initialCategory)) {
    setCategory(initialCategory, false);
  } else {
    setCategory('all', false);
  }
});
