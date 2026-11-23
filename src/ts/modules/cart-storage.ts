import type { CartItem, Product } from '../types.js';

export function getCart(): CartItem[] {
  try {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  } catch {
    return [];
  }
}

export function updateCartCounter(): void {
  const counter = document.querySelector('.header__cart-count') as HTMLElement;
  let count = 0;

  getCart().forEach((item) => {
    count += item.quantity;
  });

  counter.textContent = String(count);
  counter.hidden = count === 0;
}

export function saveCart(cart: CartItem[]): void {
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCounter();
}

export function createCartItem(
  product: Product,
  size: string,
  color: string,
  quantity: number,
): CartItem {
  return {
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.imageUrl,
    size,
    color,
    quantity,
  };
}

export function addToCart(newItem: CartItem): void {
  const cart = getCart();
  const sameItem = cart.find(
    (item) =>
      item.name === newItem.name && item.size === newItem.size && item.color === newItem.color,
  );

  if (sameItem) {
    sameItem.quantity += newItem.quantity;
  } else {
    cart.push(newItem);
  }

  saveCart(cart);
}
