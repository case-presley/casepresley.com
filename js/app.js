document.addEventListener("DOMContentLoaded", () =>
{
  // === Fade-in Scroll Animation ===
  const faders = document.querySelectorAll('.fade-in');

  const appearOptions = { threshold: 0.2 };
  const appearOnScroll = new IntersectionObserver((entries, observer) =>
  {
    entries.forEach(entry =>
    {
      if (entry.isIntersecting)
      {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, appearOptions);

  faders.forEach(fader =>
  {
    const rect = fader.getBoundingClientRect();
    if (rect.top < window.innerHeight)
    {
      fader.classList.add('visible');
    }
    else
    {
      appearOnScroll.observe(fader);
    }
  });

  // === Portfolio Sort + Filter ===
  console.log("Sort/filter script loaded");

  const sortSelect = document.getElementById('sortSelect');
  const tagFilter = document.getElementById('tagFilter');
  const grid = document.getElementById('projectGrid');

  if (!sortSelect || !tagFilter || !grid)
  {
    console.warn("Missing DOM elements for sorting/filtering");
    return;
  }

  const cards = Array.from(grid.querySelectorAll(':scope > a'));

  function render(cardsToShow)
  {
    grid.innerHTML = '';
    cardsToShow.forEach(card => grid.appendChild(card));
  }

  function filterAndSort()
  {
    console.log("Filtering and sorting...");

    let filtered = cards;
    const tag = tagFilter.value;

    if (tag !== 'all')
    {
      filtered = filtered.filter(card =>
      {
        const dataCard = card.querySelector('.project-card');
        if (!dataCard || !dataCard.dataset.tags) return false;
        const tags = dataCard.dataset.tags.split(/\s+/);
        return tags.includes(tag);
      });
    }

    const sort = sortSelect.value;
    filtered.sort((a, b) =>
    {
      const aCard = a.querySelector('.project-card');
      const bCard = b.querySelector('.project-card');

      if (!aCard || !bCard) return 0;

      if (sort === 'newest') return new Date(bCard.dataset.date) - new Date(aCard.dataset.date);
      if (sort === 'oldest') return new Date(aCard.dataset.date) - new Date(bCard.dataset.date);
      if (sort === 'az') return aCard.dataset.name.localeCompare(bCard.dataset.name);
      if (sort === 'za') return bCard.dataset.name.localeCompare(aCard.dataset.name);
      return 0;
    });

    console.log(`Rendering ${filtered.length} cards...`);
    render(filtered);
  }

  sortSelect.addEventListener('change', filterAndSort);
  tagFilter.addEventListener('change', filterAndSort);

  filterAndSort(); // Initial render
});
