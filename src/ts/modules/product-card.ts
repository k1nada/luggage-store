import type { Product } from '../types.js';
import { addToCart, createCartItem } from './cart-storage.js';
import { formatPrice } from './products.js';

export function renderProductCards(
  list: HTMLElement,
  products: Product[],
  withCartButton: boolean,
): void {
  let html = '';

  products.forEach((product) => {
    const url = `/src/html/product.html?id=${product.id}`;
    const saleBadge = product.salesStatus ? '<span class="product-card__badge">Sale</span>' : '';
    let buttonHtml: string;

    if (withCartButton) {
      buttonHtml = `<button type="button" class="button button--primary button--small product-card__button" data-id="${product.id}">Add To Cart</button>`;
    } else {
      buttonHtml = `<a href="${url}" class="button button--primary button--small product-card__button">View Product</a>`;
    }

    html += `
      <li>
        <article class="product-card">
          <a href="${url}" class="product-card__image-wrap">
            ${saleBadge}
            <img src="${product.imageUrl}" alt="${product.name}" class="product-card__image" />
          </a>
          <h3 class="product-card__title"><a href="${url}" class="link">${product.name}</a></h3>
          <p class="product-card__price">${formatPrice(product.price)}</p>
          ${buttonHtml}
        </article>
      </li>
    `;
  });

  list.innerHTML = html;
}

export function initAddToCart(list: HTMLElement, products: Product[]): void {
  list.addEventListener('click', (event) => {
    const btn = (event.target as HTMLElement).closest('button');

    if (!btn) {
      return;
    }

    const product = products.find((item) => item.id === btn.dataset.id);

    if (product) {
      addToCart(createCartItem(product, product.size, product.color, 1));
    }
  });
}
