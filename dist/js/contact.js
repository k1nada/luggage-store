import { showStatus, validateField, validateForm } from './modules/form.js';
const form = document.querySelector('#contactForm');
const status = document.querySelector('#contactStatus');
const fields = form.querySelectorAll('.input');
fields.forEach((field) => {
    field.addEventListener('input', () => validateField(field));
});
form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (validateForm(form)) {
        form.reset();
        showStatus(status, 'Thank you! Your message has been sent', true);
    }
    else {
        showStatus(status, 'Please fill in all required fields correctly', false);
    }
});
