import type { Product, ProductsResponse } from '../types.js';

const STARS = 5;

export function formatPrice(value: number): string {
  if (Number.isInteger(value)) {
    return '$' + value;
  }
  return '$' + value.toFixed(2);
}

export function createStars(rating: number): string {
  let stars = '';

  for (let i = 0; i < STARS; i++) {
    const icon = i < Math.round(rating) ? 'star' : 'grey-star';
    stars += `<img src="/src/assets/icons/ui/${icon}.svg" alt="" class="rating__star" />`;
  }

  return stars;
}

export async function loadProducts(): Promise<Product[]> {
  const response = await fetch('/src/assets/data.json');
  const json: ProductsResponse = await response.json();
  return json.data;
}
