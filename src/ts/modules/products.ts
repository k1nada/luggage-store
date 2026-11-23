import type { Product, ProductsResponse } from '../types.js';

const STARS = 5;
const ROOT = window.location.pathname.includes('/html/') ? '../../' : '../';

export function getUrl(path: string): string {
  return ROOT + path.slice(1);
}

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
    const src = getUrl(`/src/assets/icons/ui/${icon}.svg`);
    stars += `<img src="${src}" alt="" class="rating__star" />`;
  }

  return stars;
}

export async function loadProducts(): Promise<Product[]> {
  const response = await fetch(getUrl('/src/assets/data.json'));
  const json: ProductsResponse = await response.json();
  return json.data;
}
