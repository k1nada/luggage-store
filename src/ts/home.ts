import { initAddToCart, renderProductCards } from './modules/product-card.js';
import { loadProducts } from './modules/products.js';
import type { Product } from './types.js';

const TEXTS = [
  'A good suitcase for every trip.',
  'Strong, light and easy to carry.',
  'Four wheels and a comfortable handle.',
  'A lot of space for your things.',
  'Many colors to choose from.',
];

const slider = document.querySelector('.travel__list') as HTMLElement;
const prevBtn = document.querySelector('.travel__arrow--prev') as HTMLButtonElement;
const nextBtn = document.querySelector('.travel__arrow--next') as HTMLButtonElement;

const texts = [...TEXTS].sort(() => Math.random() - 0.5);

document.querySelectorAll<HTMLElement>('.travel__card-text').forEach((text, index) => {
  text.textContent = texts[index] as string;
  text.hidden = false;
});

nextBtn.addEventListener('click', () => {
  slider.append(slider.firstElementChild as HTMLElement);
});

prevBtn.addEventListener('click', () => {
  slider.prepend(slider.lastElementChild as HTMLElement);
});

function renderBlock(products: Product[], block: string, withCartButton: boolean): void {
  const list = document.querySelector(`[data-block="${block}"]`) as HTMLElement;
  const items = products.filter((product) => product.blocks.includes(block));

  renderProductCards(list, items, withCartButton);

  if (withCartButton) {
    initAddToCart(list, products);
  }
}

async function renderProducts(): Promise<void> {
  const products = await loadProducts();

  renderBlock(products, 'Selected Products', true);
  renderBlock(products, 'New Products Arrival', false);
}

renderProducts();
