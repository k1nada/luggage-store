const STARS = 5;
const ROOT = window.location.pathname.includes('/html/') ? '../../' : '../';
export function getUrl(path) {
    return ROOT + path.slice(1);
}
export function formatPrice(value) {
    if (Number.isInteger(value)) {
        return '$' + value;
    }
    return '$' + value.toFixed(2);
}
export function createStars(rating) {
    let stars = '';
    for (let i = 0; i < STARS; i++) {
        const icon = i < Math.round(rating) ? 'star' : 'grey-star';
        const src = getUrl(`/src/assets/icons/ui/${icon}.svg`);
        stars += `<img src="${src}" alt="" class="rating__star" />`;
    }
    return stars;
}
export async function loadProducts() {
    const response = await fetch(getUrl('/src/assets/data.json'));
    const json = await response.json();
    return json.data;
}
