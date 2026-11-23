import type { Product } from './types.js';
import { initAddToCart, renderProductCards } from './modules/product-card.js';
import { createStars, formatPrice, getUrl, loadProducts } from './modules/products.js';

const PER_PAGE = 12;
const BEST_SETS_COUNT = 5;

const form = document.querySelector('.filters') as HTMLFormElement;
const filtersRow = document.querySelector('.filters__row') as HTMLElement;
const hideBtn = document.querySelector('.filters__hide') as HTMLButtonElement;
const sortSelect = document.querySelector('.catalog__sort-select') as HTMLSelectElement;
const list = document.querySelector('.catalog__list') as HTMLElement;
const results = document.querySelector('.catalog__results') as HTMLElement;
const pagination = document.querySelector('.pagination') as HTMLElement;
const searchForm = document.querySelector('.search') as HTMLFormElement;
const searchInput = document.querySelector('.search__input') as HTMLInputElement;
const searchModal = document.querySelector('#searchModal') as HTMLDialogElement;
const bestSets = document.querySelector('.best-sets') as HTMLElement;

let products: Product[] = [];
let page = 1;

function getFiltered(): Product[] {
  const formData = new FormData(form);
  const size = formData.get('size');
  const color = formData.get('color');
  const category = formData.get('category');
  const onlySale = formData.has('salesStatus');

  return products.filter((product) => {
    if (size && product.size !== size) {
      return false;
    }
    if (color && product.color !== color) {
      return false;
    }
    if (category && product.category !== category) {
      return false;
    }
    if (onlySale && !product.salesStatus) {
      return false;
    }
    return true;
  });
}

function sortProducts(items: Product[]): void {
  const sort = sortSelect.value;

  if (sort === 'price-asc') {
    items.sort((a, b) => a.price - b.price);
  } else if (sort === 'price-desc') {
    items.sort((a, b) => b.price - a.price);
  } else if (sort === 'popularity') {
    items.sort((a, b) => b.popularity - a.popularity);
  } else if (sort === 'rating') {
    items.sort((a, b) => b.rating - a.rating);
  }
}

function renderPagination(pages: number): void {
  if (pages <= 1) {
    pagination.innerHTML = '';
    return;
  }

  let links = '';
  let prev = '';
  let next = '';

  for (let i = 1; i <= pages; i++) {
    const active = i === page ? 'pagination__link--active' : '';
    links += `<li><button type="button" class="pagination__link ${active}" data-page="${i}">${i}</button></li>`;
  }

  if (page > 1) {
    prev = `<button type="button" class="pagination__prev" data-page="${page - 1}">Prev</button>`;
  }
  if (page < pages) {
    next = `<button type="button" class="pagination__next" data-page="${page + 1}">Next</button>`;
  }

  pagination.innerHTML = `${prev}<ul class="pagination__list">${links}</ul>${next}`;
}

function renderCatalog(): void {
  const items = getFiltered();
  const start = (page - 1) * PER_PAGE;
  const end = Math.min(start + PER_PAGE, items.length);
  const pages = Math.ceil(items.length / PER_PAGE);

  sortProducts(items);
  renderProductCards(list, items.slice(start, end), true);
  renderPagination(pages);

  if (items.length === 0) {
    results.textContent = 'Showing 0 results';
  } else {
    results.textContent = `Showing ${start + 1}–${end} of ${items.length} results`;
  }
}

function updateToggles(): void {
  form.querySelectorAll('.filters__dropdown').forEach((dropdown) => {
    const toggle = dropdown.querySelector('.filters__toggle') as HTMLElement;
    const checked = dropdown.querySelector('.filters__radio:checked + .filters__option-text');

    if (checked) {
      toggle.textContent = checked.textContent;
      toggle.classList.add('filters__toggle--active');
    } else {
      toggle.textContent = 'Choose option';
      toggle.classList.remove('filters__toggle--active');
    }
  });
}

function showFirstPage(): void {
  page = 1;
  updateToggles();
  renderCatalog();
}

form.addEventListener('change', showFirstPage);
sortSelect.addEventListener('change', showFirstPage);

form.addEventListener('reset', () => {
  searchInput.value = '';
  sortSelect.value = 'default';
  setTimeout(showFirstPage);
});

hideBtn.addEventListener('click', () => {
  const isHidden = filtersRow.classList.toggle('filters__row--hidden');
  hideBtn.textContent = isHidden ? 'Show Filters' : 'Hide Filters';
});

pagination.addEventListener('click', (event) => {
  const btn = (event.target as HTMLElement).closest('button');
  if (btn) {
    page = Number(btn.dataset.page);
    renderCatalog();
    window.scrollTo(0, 0);
  }
});

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const query = searchInput.value.trim().toLowerCase();
  const product = products.find((item) => item.name.toLowerCase().includes(query));

  if (query && product) {
    window.location.href = getUrl(`/src/html/product.html?id=${product.id}`);
  } else {
    searchModal.showModal();
  }
});

function renderBestSets(): void {
  const sets = products.filter((product) => product.category === 'luggage sets');
  let html = '';

  sets.sort(() => Math.random() - 0.5);

  sets.slice(0, BEST_SETS_COUNT).forEach((set) => {
    const url = getUrl(`/src/html/product.html?id=${set.id}`);

    html += `
      <li class="best-set">
        <a href="${url}" class="best-set__image-link">
          <img src="${getUrl(set.imageUrl)}" alt="${set.name}" class="best-set__image" />
        </a>
        <div class="best-set__content">
          <h3 class="best-set__title"><a href="${url}">${set.name}</a></h3>
          <p class="rating rating--small">${createStars(set.rating)}</p>
          <p class="best-set__price">${formatPrice(set.price)}</p>
        </div>
      </li>
    `;
  });

  bestSets.innerHTML = html;
  bestSets.classList.remove('best-sets--hidden');
}

async function init(): Promise<void> {
  products = await loadProducts();
  initAddToCart(list, products);
  renderCatalog();
  renderBestSets();
}

init();
