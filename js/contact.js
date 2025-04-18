document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form Data
        const formData = new FormData(contactForm);
        const formDetails = Object.fromEntries(formData);

        // Validate form data
        if (validateForm(formDetails)) {
            // simulate form submission
            submitForm(formDetails);
        }
    });

    function validateForm(data) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!data.name.trim()) {
            showError('Please enter your name');
            return false;
        }

        if (!emailRegex.test(data.email)) {
            showError('Please enter a valid email address');
            return false;
        }

        if (!data.message.trim()) {
            showError('Please enter your message');
            return false;
        }

        return true;
    }

    function showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;

        // Remove any existing error messages
        const existingError = contactForm.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        // Insert error before the submit button
        const submitBtn = contactForm.querySelector('.submit-btn');
        contactForm.insertBefore(errorDiv, submitBtn);

        // Remove error after 3 seconds
        setTimeout(() => {
            errorDiv.remove();
        }, 3000);
    }

    function submitForm(data) {
        // simulate API call
        console.log('Form data', data)

        // clear form
        contactForm.reset();

        // show success message
        showSuccess();
    }

    function showSuccess() {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = 'Thank you for your message! We will get back to you soon.';

        // insert success message before the form
        contactForm.parentElement.insertBefore(successDiv, contactForm);

        // remove success message after 3 seconds]
        setTimeout(() => {
            successDiv.remove();
        }, 3000);
    }
});