/**
 * Ruthvik Interior Studios - Contact & Consultation Form Handler
 * 
 * Manages client enquiry form validation and prepares prefilled WhatsApp click-to-chat.
 * Works seamlessly across both the Homepage (index.html) and Contact page (contact.html).
 */

// =============================================================================
// WhatsApp Configuration
// =============================================================================
// Registered WhatsApp number in international format (country code + digits only,
// no "+", spaces, or hyphens).
// Default: 919535759402 (+91 9535759402 - Rutvik Interior Studios)
// To update the designer's receiving WhatsApp number, change the value below:
const WHATSAPP_PHONE_NUMBER = '919535759402';

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contact-form');
    const feedback = document.getElementById('form-feedback');
    const submitBtn = document.getElementById('submit-btn');

    if (!form) {
        return;
    }

    // Pre-select package or service if passed in URL query parameters (e.g. ?package=Premium)
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const prefillPackage = urlParams.get('package');
        const packageSelect = document.getElementById('package-interest');
        if (prefillPackage && packageSelect) {
            for (let i = 0; i < packageSelect.options.length; i++) {
                if (packageSelect.options[i].value.toLowerCase().includes(prefillPackage.toLowerCase())) {
                    packageSelect.selectedIndex = i;
                    break;
                }
            }
        }
    } catch (err) {
        console.warn('Could not parse query parameters:', err);
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent standard HTTP form submission

        // Check WhatsApp recipient number configuration
        const recipientPhone = (typeof WHATSAPP_PHONE_NUMBER === 'string' ? WHATSAPP_PHONE_NUMBER : '').replace(/\D/g, '');
        if (!recipientPhone || recipientPhone.length < 10) {
            showFeedback('WhatsApp number is not configured yet. Please reach out to us directly at +91 9535759402.', 'error');
            console.error('WhatsApp configuration error: WHATSAPP_PHONE_NUMBER must contain a valid international phone number.');
            return;
        }

        // Safely extract input elements (handles variations between index.html and contact.html)
        const nameInput = document.getElementById('client-name');
        const phoneInput = document.getElementById('client-phone');
        const emailInput = document.getElementById('client-email');
        const locationInput = document.getElementById('project-location');
        const typeInput = document.getElementById('property-type');
        const packageInput = document.getElementById('package-interest');
        const notesInput = document.getElementById('project-notes');

        const name = nameInput ? nameInput.value.trim() : '';
        const phone = phoneInput ? phoneInput.value.trim() : '';
        const email = emailInput ? emailInput.value.trim() : '';
        const location = locationInput ? locationInput.value.trim() : '';
        const propertyType = typeInput ? typeInput.value.trim() : '';
        const servicePackage = packageInput ? packageInput.value.trim() : '';
        const notes = notesInput ? notesInput.value.trim() : '';

        // 1. Required Field Validation
        if (!name) {
            showFeedback('Please enter your full name.', 'error');
            if (nameInput) nameInput.focus();
            return;
        }

        if (!phone) {
            showFeedback('Please enter your phone number.', 'error');
            if (phoneInput) phoneInput.focus();
            return;
        }

        // Validate phone number has at least 10 digits
        const phoneDigits = phone.replace(/\D/g, '');
        if (phoneDigits.length < 10) {
            showFeedback('Please enter a valid phone number (at least 10 digits).', 'error');
            if (phoneInput) phoneInput.focus();
            return;
        }

        if (!email) {
            showFeedback('Please enter your email address.', 'error');
            if (emailInput) emailInput.focus();
            return;
        }

        // Standard email format validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            showFeedback('Please enter a valid email address.', 'error');
            if (emailInput) emailInput.focus();
            return;
        }

        if (!location) {
            showFeedback('Please select your project location.', 'error');
            if (locationInput) locationInput.focus();
            return;
        }

        if (!propertyType) {
            showFeedback('Please select your property typology.', 'error');
            if (typeInput) typeInput.focus();
            return;
        }

        // 2. Build Prefilled WhatsApp Message
        let message = `Hi Ruthvik Interior Studios,\n\nI would like to request a consultation for my project.\n\n` +
            `*Client Details:*\n` +
            `• Name: ${name}\n` +
            `• Phone: ${phone}\n` +
            `• Email: ${email}\n` +
            `• Location: ${location}\n` +
            `• Property Typology: ${propertyType}`;

        if (servicePackage) {
            message += `\n• Service Scope: ${servicePackage}`;
        }

        if (notes) {
            message += `\n\n*Project Notes / Space Brief:*\n${notes}`;
        }

        // Encode message safely for URL
        const encodedMessage = encodeURIComponent(message);
        const whatsappURL = `https://wa.me/${recipientPhone}?text=${encodedMessage}`;

        // 3. UI Feedback & WhatsApp Dispatch
        const originalButtonText = submitBtn ? submitBtn.textContent : 'Submit Consultation Request';
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Opening WhatsApp...';
        }

        showFeedback(
            `Opening WhatsApp with your prefilled enquiry...<br>` +
            `<span style="display:inline-block; margin-top:0.35rem; font-size:0.9em; opacity:0.9;">Please review the details in WhatsApp and press <strong>Send</strong>.</span><br>` +
            `<span style="display:inline-block; margin-top:0.5rem; font-size:0.85em;">If WhatsApp did not open automatically, ` +
            `<a href="${whatsappURL}" target="_blank" rel="noopener noreferrer" style="color:inherit; text-decoration:underline; font-weight:600;">click here to chat on WhatsApp</a>.</span>`,
            'info'
        );

        // Open WhatsApp in a new tab/app window
        const win = window.open(whatsappURL, '_blank', 'noopener,noreferrer');
        // Fallback for browsers that block popup windows
        if (!win || win.closed || typeof win.closed === 'undefined') {
            window.location.href = whatsappURL;
        }

        // Re-enable the button after a short delay so the user can interact if needed
        setTimeout(function () {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = originalButtonText;
            }
        }, 3000);
    });

    /**
     * Display validation or informative feedback below the form
     * @param {string} message - HTML or text message to display
     * @param {'error'|'info'} type - Type of feedback
     */
    function showFeedback(message, type) {
        if (!feedback) return;

        feedback.style.display = 'block';
        feedback.style.borderRadius = 'var(--radius-xs, 4px)';
        feedback.style.padding = '0.9rem 1rem';
        feedback.style.marginTop = '1rem';
        feedback.style.textAlign = 'center';
        feedback.style.fontSize = 'var(--font-size-sm, 0.875rem)';
        feedback.style.lineHeight = '1.5';

        if (type === 'error') {
            feedback.style.backgroundColor = '#FDF2E9';
            feedback.style.color = '#9D4D28';
            feedback.style.border = '1px solid #E3DCD3';
        } else {
            feedback.style.backgroundColor = '#FAF8F5';
            feedback.style.color = '#1F1F1E';
            feedback.style.border = '1px solid #C0734D';
        }

        feedback.innerHTML = message;
    }
});