const CATEGORIES = [
  { icon: '🏝️', label: 'Beachfront' },
  { icon: '🏡', label: 'Countryside' },
  { icon: '🌊', label: 'Lakefront' },
  { icon: '🏔️', label: 'Mountain' },
  { icon: '🏕️', label: 'Camping' },
  { icon: '🛖', label: 'Cabins' },
  { icon: '🏄', label: 'Surfing' },
  { icon: '🧊', label: 'Arctic' },
  { icon: '🌴', label: 'Tropical' },
  { icon: '🏯', label: 'Castles' },
  { icon: '🌵', label: 'Desert' },
  { icon: '🍄', label: 'Treehouse' },
  { icon: '🛸', label: 'Unique stays' },
  { icon: '🏊', label: 'Pools' },
  { icon: '⛵', label: 'Boats' },
  { icon: '🌾', label: 'Farms' },
  { icon: '🌺', label: 'Tropical garden' },
  { icon: '🏟️', label: 'Mansions' },
];

const LISTINGS = [
  { id: 1,  emoji: '🏝️', bg: '#B8D4E8', location: 'Maldives, Indian Ocean',      distance: '12,450 km away', dates: '15–22 Dec', price: '₹42,500', rating: '4.98', badge: 'Guest favourite', liked: true  },
  { id: 2,  emoji: '🌄',  bg: '#D4C5A9', location: 'Santorini, Greece',            distance: '7,890 km away',  dates: '5–12 Jan',  price: '₹31,200', rating: '4.95', liked: false },
  { id: 3,  emoji: '🏔️', bg: '#C3D4C0', location: 'Swiss Alps, Switzerland',      distance: '6,300 km away',  dates: '20–27 Dec', price: '₹55,800', rating: '4.97', badge: 'Guest favourite', liked: false },
  { id: 4,  emoji: '🌊', bg: '#A8C4D4', location: 'Bali, Indonesia',              distance: '4,200 km away',  dates: '10–17 Jan', price: '₹18,900', rating: '4.96', liked: true  },
  { id: 5,  emoji: '🌴', bg: '#B8D0B0', location: 'Phuket, Thailand',             distance: '2,800 km away',  dates: '8–15 Feb',  price: '₹22,500', rating: '4.94', badge: 'New',             liked: false },
  { id: 6,  emoji: '🏡', bg: '#D4B8A0', location: 'Tuscany, Italy',               distance: '7,100 km away',  dates: '1–8 Mar',   price: '₹28,700', rating: '4.99', badge: 'Guest favourite', liked: false },
  { id: 7,  emoji: '🌋', bg: '#C4A8A0', location: 'Cappadocia, Turkey',           distance: '4,900 km away',  dates: '15–22 Jan', price: '₹19,800', rating: '4.92', liked: false },
  { id: 8,  emoji: '🏕️', bg: '#C0C8A8', location: 'Patagonia, Argentina',        distance: '16,200 km away', dates: '5–12 Apr',  price: '₹36,400', rating: '4.97', liked: true  },
  { id: 9,  emoji: '🛖', bg: '#D8C4A8', location: 'Ubud, Bali',                   distance: '4,100 km away',  dates: '20–27 Jan', price: '₹14,500', rating: '4.91', liked: false },
  { id: 10, emoji: '⛰️', bg: '#B8C4D4', location: 'Kyoto, Japan',                distance: '4,600 km away',  dates: '10–17 Mar', price: '₹33,200', rating: '4.96', badge: 'Guest favourite', liked: false },
  { id: 11, emoji: '🌸', bg: '#D4B8C8', location: 'Amsterdam, Netherlands',       distance: '6,800 km away',  dates: '1–8 Apr',   price: '₹25,600', rating: '4.93', liked: false },
  { id: 12, emoji: '🏰', bg: '#C8C4B8', location: 'Prague, Czech Republic',       distance: '6,100 km away',  dates: '15–22 Feb', price: '₹21,400', rating: '4.95', badge: 'New',             liked: false },
];

let activeCategory = 0;
let liked = new Set([1, 4, 8]);
let toggleOn = true;

/* ── Render category pills ── */
function renderCategories() {
  const bar = document.getElementById('catBar');
  const filterBtn = document.getElementById('filterBtn');
  bar.innerHTML = '';

  CATEGORIES.forEach((cat, i) => {
    const el = document.createElement('div');
    el.className = 'cat-item' + (i === activeCategory ? ' active' : '');
    el.innerHTML = `<span class="cat-icon">${cat.icon}</span><span>${cat.label}</span>`;
    el.addEventListener('click', () => {
      activeCategory = i;
      renderCategories();
    });
    bar.appendChild(el);
  });

  bar.appendChild(filterBtn);
}

/* ── Render listing cards ── */
function renderListings() {
  const grid = document.getElementById('listingsGrid');

  grid.innerHTML = LISTINGS.map(l => `
    <div class="card" data-id="${l.id}">
      <div class="card-img-wrap">
        <div class="img-placeholder" style="background: ${l.bg}; position: absolute; inset: 0;">${l.emoji}</div>
        ${l.badge ? `<span class="card-badge">${l.badge}</span>` : ''}
        <button class="card-fav ${liked.has(l.id) ? 'liked' : ''}" data-id="${l.id}" aria-label="Save to wishlist">
          <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M16 28c7-4.73 14-10 14-17a6 6 0 0 0-12 0 6 6 0 0 0-12 0c0 7 7 12.27 10 17z" stroke-width="2"/>
          </svg>
        </button>
        <div class="card-dots">
          <div class="card-dot active"></div>
          <div class="card-dot"></div>
          <div class="card-dot"></div>
          <div class="card-dot"></div>
          <div class="card-dot"></div>
        </div>
      </div>
      <div class="card-body">
        <div class="card-row">
          <span class="card-location">${l.location}</span>
          <span class="card-rating">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            ${l.rating}
          </span>
        </div>
        <p class="card-distance">${l.distance}</p>
        <p class="card-dates">${l.dates}</p>
        <p class="card-price"><strong>${l.price}</strong> / night</p>
      </div>
    </div>
  `).join('');

  /* Attach favourite (heart) toggle listeners */
  grid.querySelectorAll('.card-fav').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const id = parseInt(btn.dataset.id);
      if (liked.has(id)) liked.delete(id);
      else liked.add(id);
      renderListings();
    });
  });
}

/* ── Price-display toggle ── */
document.getElementById('toggleSwitch').addEventListener('click', function () {
  toggleOn = !toggleOn;
  this.className = 'toggle-switch' + (toggleOn ? '' : ' off');
});

/* ── Boot ── */
renderCategories();
renderListings();
