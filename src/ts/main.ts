import { updateCartCounter } from './modules/cart-storage.js';
import { validateForm } from './modules/form.js';

const accountBtn = document.querySelector('.header__account') as HTMLButtonElement;
const loginForm = document.querySelector('.login') as HTMLFormElement;
const loginModal = loginForm.closest('dialog') as HTMLDialogElement;
const passwordInput = loginForm.querySelector('[name="password"]') as HTMLInputElement;
const toggleBtn = loginForm.querySelector('.login__toggle') as HTMLButtonElement;

accountBtn.addEventListener('click', () => {
  loginModal.showModal();
});

loginModal.addEventListener('click', (event) => {
  if (event.target === loginModal) {
    loginModal.close();
  }
});

toggleBtn.addEventListener('click', () => {
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
  } else {
    passwordInput.type = 'password';
  }
});

loginForm.addEventListener('submit', (event) => {
  if (!validateForm(loginForm)) {
    event.preventDefault();
  }
});

updateCartCounter();
