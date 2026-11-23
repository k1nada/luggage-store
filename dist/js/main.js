import { updateCartCounter } from './modules/cart-storage.js';
import { validateForm } from './modules/form.js';
const accountBtn = document.querySelector('.header__account');
const loginForm = document.querySelector('.login');
const loginModal = loginForm.closest('dialog');
const passwordInput = loginForm.querySelector('[name="password"]');
const toggleBtn = loginForm.querySelector('.login__toggle');
accountBtn.addEventListener('click', () => {
    loginModal.showModal();
});
loginModal.addEventListener('click', (event) => {
    if (event.target === loginModal) {
        loginModal.close();
    }
});
toggleBtn.addEventListener('click', () => {
    passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
});
loginForm.addEventListener('submit', (event) => {
    if (!validateForm(loginForm)) {
        event.preventDefault();
    }
});
updateCartCounter();
