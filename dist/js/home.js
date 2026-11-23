import { initAddToCart, renderProductCards } from './modules/product-card.js';
import { loadProducts } from './modules/products.js';
const TEXTS = [
    'A good suitcase for every trip.',
    'Strong, light and easy to carry.',
    'Four wheels and a comfortable handle.',
    'A lot of space for your things.',
    'Many colors to choose from.',
];
const slider = document.querySelector('.travel__list');
const prevBtn = document.querySelector('.travel__arrow--prev');
const nextBtn = document.querySelector('.travel__arrow--next');
const texts = [...TEXTS].sort(() => Math.random() - 0.5);
document.querySelectorAll('.travel__card-text').forEach((text, index) => {
    text.textContent = texts[index];
    text.hidden = false;
});
nextBtn.addEventListener('click', () => {
    slider.append(slider.firstElementChild);
});
prevBtn.addEventListener('click', () => {
    slider.prepend(slider.lastElementChild);
});
function renderBlock(products, block, withCartButton) {
    const list = document.querySelector(`[data-block="${block}"]`);
    const items = products.filter((product) => product.blocks.includes(block));
    renderProductCards(list, items, withCartButton);
    if (withCartButton) {
        initAddToCart(list, products);
    }
}
async function renderProducts() {
    const products = await loadProducts();
    renderBlock(products, 'Selected Products', true);
    renderBlock(products, 'New Products Arrival', false);
}
renderProducts();
