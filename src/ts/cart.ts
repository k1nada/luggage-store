import type { CartItem } from './types.js';
import { getCart, saveCart } from './modules/cart-storage.js';
import { formatPrice, loadProducts } from './modules/products.js';

const SHIPPING = 30;
const DISCOUNT_FROM = 3000;
const DISCOUNT_RATE = 0.1;
const MIN_QUANTITY = 1;
const EMPTY_TEXT = 'Your cart is empty. Use the catalog to add new items.';
const THANKS_TEXT = 'Thank you for your purchase.';

const tableWrap = document.querySelector('.cart__table-wrap') as HTMLElement;
const tableBody = document.querySelector('.cart__body') as HTMLElement;
const message = document.querySelector('.cart__message') as HTMLElement;
const clearBtn = document.querySelector('.cart__clear') as HTMLButtonElement;
const checkoutBtn = document.querySelector('.cart-summary__checkout') as HTMLButtonElement;
const discountRow = document.querySelector('.cart-summary__row--discount') as HTMLElement;
const cartSection = document.querySelector('.cart') as HTMLElement;

function createRow(item: CartItem, index: number): string {
  return `
    <tr class="cart__row">
      <td class="cart__cell"><img src="${item.image}" alt="${item.name}" class="cart__image" /></td>
      <td class="cart__cell cart__title">
        ${item.name}
        <span class="cart__options">Size: ${item.size}, Color: ${item.color}</span>
      </td>
      <td class="cart__cell">${formatPrice(item.price)}</td>
      <td class="cart__cell">
        <div class="quantity">
          <button type="button" class="quantity__button" data-action="minus" data-index="${index}">-</button>
          <span class="quantity__value">${item.quantity}</span>
          <button type="button" class="quantity__button" data-action="plus" data-index="${index}">+</button>
        </div>
      </td>
      <td class="cart__cell">${formatPrice(item.price * item.quantity)}</td>
      <td class="cart__cell">
        <button type="button" class="cart__delete" data-action="remove" data-index="${index}">
          <img src="/src/assets/icons/ui/trash.svg" alt="" class="cart__delete-icon" />
        </button>
      </td>
    </tr>
  `;
}

function setSummary(name: string, text: string): void {
  const cell = document.querySelector(`[data-summary="${name}"]`) as HTMLElement;
  cell.textContent = text;
}

function renderCart(messageText: string): void {
  const cart = getCart();
  let rows = '';
  let sum = 0;
  let discount = 0;
  let shipping = 0;

  cart.forEach((item, index) => {
    rows += createRow(item, index);
    sum += item.price * item.quantity;
  });

  if (sum > DISCOUNT_FROM) {
    discount = sum * DISCOUNT_RATE;
  }
  if (cart.length > 0) {
    shipping = SHIPPING;
  }

  tableBody.innerHTML = rows;
  tableWrap.hidden = cart.length === 0;
  message.hidden = cart.length > 0;
  message.textContent = messageText;
  discountRow.classList.toggle('cart-summary__row--hidden', discount === 0);
  setSummary('subtotal', formatPrice(sum));
  setSummary('discount', `-${formatPrice(discount)}`);
  setSummary('shipping', formatPrice(shipping));
  setSummary('total', formatPrice(sum - discount + shipping));
}

tableBody.addEventListener('click', (event) => {
  const btn = (event.target as HTMLElement).closest('button');
  if (!btn) {
    return;
  }

  const cart = getCart();
  const index = Number(btn.dataset.index);
  const item = cart[index] as CartItem;
  const action = btn.dataset.action;

  if (action === 'plus') {
    item.quantity++;
  } else if (action === 'minus' && item.quantity > MIN_QUANTITY) {
    item.quantity--;
  } else if (action === 'remove') {
    cart.splice(index, 1);
  }

  saveCart(cart);
  renderCart(EMPTY_TEXT);
});

clearBtn.addEventListener('click', () => {
  saveCart([]);
  renderCart(EMPTY_TEXT);
});

checkoutBtn.addEventListener('click', () => {
  if (getCart().length === 0) {
    return;
  }
  saveCart([]);
  renderCart(THANKS_TEXT);
});

async function init(): Promise<void> {
  const products = await loadProducts();
  const cart = getCart();

  cart.forEach((item) => {
    const product = products.find((p) => p.id === item.id);
    if (product) {
      item.price = product.price;
    }
  });

  saveCart(cart);
  renderCart(EMPTY_TEXT);
}

renderCart(EMPTY_TEXT);
cartSection.classList.remove('cart--loading');
init();
