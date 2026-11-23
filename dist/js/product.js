import { addToCart, createCartItem } from './modules/cart-storage.js';
import { showStatus, validateForm } from './modules/form.js';
import { initAddToCart, renderProductCards } from './modules/product-card.js';
import { createStars, formatPrice, getUrl, loadProducts } from './modules/products.js';
const MIN_QUANTITY = 1;
const RELATED_COUNT = 4;
const form = document.querySelector('.product-details__form');
const sizeSelect = form.querySelector('[name="size"]');
const colorSelect = form.querySelector('[name="color"]');
const quantity = form.querySelector('.quantity__value');
const minusBtn = form.querySelector('[data-action="minus"]');
const plusBtn = form.querySelector('[data-action="plus"]');
const tabs = document.querySelectorAll('.product-tabs__button');
const panels = document.querySelectorAll('.product-tabs__content');
const reviewForm = document.querySelector('.review-form');
const reviewStatus = document.querySelector('.review-form__status');
const relatedList = document.querySelector('.related .products__list');
function renderProduct(product) {
    const section = document.querySelector('.product-details');
    const title = document.querySelector('.product-details__title');
    const price = document.querySelector('.product-details__price');
    const image = document.querySelector('.product-details__image');
    const rating = document.querySelector('.product-details__rating .rating');
    function showSection() {
        section.classList.remove('product-details--loading');
    }
    title.textContent = product.name;
    price.textContent = formatPrice(product.price);
    image.addEventListener('load', showSection);
    image.addEventListener('error', showSection);
    image.src = getUrl(product.imageUrl);
    image.alt = product.name;
    rating.innerHTML = createStars(product.rating);
}
minusBtn.addEventListener('click', () => {
    if (Number(quantity.value) > MIN_QUANTITY) {
        quantity.value = String(Number(quantity.value) - 1);
    }
});
plusBtn.addEventListener('click', () => {
    quantity.value = String(Number(quantity.value) + 1);
});
tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
        tabs.forEach((item) => item.classList.remove('product-tabs__button--active'));
        panels.forEach((panel) => panel.classList.add('product-tabs__content--hidden'));
        tab.classList.add('product-tabs__button--active');
        panels[index].classList.remove('product-tabs__content--hidden');
    });
});
reviewForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (validateForm(reviewForm)) {
        reviewForm.reset();
        showStatus(reviewStatus, 'Thank you! Your review has been submitted', true);
    }
    else {
        showStatus(reviewStatus, 'Please fill in all required fields correctly', false);
    }
});
async function init() {
    const products = await loadProducts();
    const id = new URLSearchParams(window.location.search).get('id');
    const product = (products.find((item) => item.id === id) ?? products[0]);
    const others = products.filter((item) => item.id !== product.id);
    renderProduct(product);
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        addToCart(createCartItem(product, sizeSelect.value, colorSelect.value, Number(quantity.value)));
    });
    others.sort(() => Math.random() - 0.5);
    renderProductCards(relatedList, others.slice(0, RELATED_COUNT), true);
    initAddToCart(relatedList, products);
}
init();
