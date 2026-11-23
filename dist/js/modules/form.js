const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
export function validateField(input) {
    const value = input.value.trim();
    const error = document.getElementById(input.id + 'Error');
    let message = '';
    if (value === '') {
        message = 'This field is required';
    }
    else if (input.type === 'email' && !EMAIL_REGEX.test(value)) {
        message = 'Please enter a valid email address';
    }
    if (error) {
        error.textContent = message;
    }
    if (message === '') {
        input.classList.remove('input--invalid');
        return true;
    }
    else {
        input.classList.add('input--invalid');
        return false;
    }
}
export function validateForm(form) {
    const fields = form.querySelectorAll('.input');
    let isValid = true;
    fields.forEach((field) => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    return isValid;
}
export function showStatus(element, message, isSuccess) {
    element.textContent = message;
    element.classList.toggle('form__status--success', isSuccess);
    element.classList.toggle('form__status--error', !isSuccess);
}
