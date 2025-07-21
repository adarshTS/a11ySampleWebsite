// Thank You Page Functionality
class ThankYouPage {
    constructor() {
        this.init();
    }

    init() {
        this.generateOrderNumber();
        this.setupForm();
        this.addAnimations();
        this.setupEventListeners();
    }

    generateOrderNumber() {
        // Generate a random order number
        const orderNumber = 'BF-2025-' + Math.floor(Math.random() * 90000 + 10000);
        document.getElementById('order-number').textContent = orderNumber;
        
        // Store in localStorage for consistency
        localStorage.setItem('lastOrderNumber', orderNumber);
    }

    setupForm() {
        const form = document.getElementById('support-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmission(e);
        });

        // Real-time validation
        this.setupRealtimeValidation();
    }

    setupRealtimeValidation() {
        const nameInput = document.getElementById('customer-name');
        const emailInput = document.getElementById('customer-email');
        const messageInput = document.getElementById('customer-message');

        nameInput.addEventListener('blur', () => {
            this.validateName(nameInput.value);
        });

        emailInput.addEventListener('blur', () => {
            this.validateEmail(emailInput.value);
        });

        messageInput.addEventListener('blur', () => {
            this.validateMessage(messageInput.value);
        });

        // Clear errors on input
        [nameInput, emailInput, messageInput].forEach(input => {
            input.addEventListener('input', () => {
                this.clearError(input.id);
            });
        });
    }

    validateName(name) {
        const nameError = document.getElementById('name-error');
        if (!name.trim()) {
            this.showError('name-error', 'Name is required');
            return false;
        }
        if (name.trim().length < 2) {
            this.showError('name-error', 'Name must be at least 2 characters');
            return false;
        }
        this.clearError('customer-name');
        return true;
    }

    validateEmail(email) {
        const emailError = document.getElementById('email-error');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!email.trim()) {
            this.showError('email-error', 'Email is required');
            return false;
        }
        if (!emailRegex.test(email)) {
            this.showError('email-error', 'Please enter a valid email address');
            return false;
        }
        this.clearError('customer-email');
        return true;
    }

    validateMessage(message) {
        const messageError = document.getElementById('message-error');
        if (!message.trim()) {
            this.showError('message-error', 'Message is required');
            return false;
        }
        if (message.trim().length < 10) {
            this.showError('message-error', 'Message must be at least 10 characters');
            return false;
        }
        this.clearError('customer-message');
        return true;
    }

    showError(errorId, message) {
        const errorElement = document.getElementById(errorId);
        const inputId = errorId.replace('-error', '');
        const inputElement = document.getElementById(inputId);
        
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        inputElement.classList.add('error');
        inputElement.setAttribute('aria-invalid', 'true');
    }

    clearError(inputId) {
        const errorId = inputId + '-error';
        const errorElement = document.getElementById(errorId);
        const inputElement = document.getElementById(inputId);
        
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
        inputElement.classList.remove('error');
        inputElement.setAttribute('aria-invalid', 'false');
    }

    handleFormSubmission(e) {
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        // Validate all fields
        const isNameValid = this.validateName(data.customerName);
        const isEmailValid = this.validateEmail(data.customerEmail);
        const isMessageValid = this.validateMessage(data.message);

        if (!isNameValid || !isEmailValid || !isMessageValid) {
            this.showNotification('Please fix the errors before submitting', 'error');
            return;
        }

        // Simulate form submission
        this.simulateFormSubmission(data);
    }

    simulateFormSubmission(data) {
        const submitButton = document.querySelector('.form-submit-btn');
        const originalText = submitButton.textContent;
        
        // Show loading state
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        submitButton.classList.add('loading');

        // Simulate API call delay
        setTimeout(() => {
            // Store submission data
            const submissions = JSON.parse(localStorage.getItem('supportSubmissions') || '[]');
            submissions.push({
                ...data,
                timestamp: new Date().toISOString(),
                id: Date.now()
            });
            localStorage.setItem('supportSubmissions', JSON.stringify(submissions));

            // Show success message
            this.showConfirmationMessage();
            
            // Reset form
            document.getElementById('support-form').reset();
            
            // Reset button
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            submitButton.classList.remove('loading');

        }, 2000);
    }

    showConfirmationMessage() {
        // Create confirmation overlay
        const overlay = document.createElement('div');
        overlay.className = 'confirmation-overlay';
        overlay.innerHTML = `
            <div class="confirmation-modal">
                <div class="confirmation-icon">
                    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" stroke="#28a745" stroke-width="2" fill="none"/>
                        <path d="m9 12 2 2 4-4" stroke="#28a745" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                <h3>Message Sent Successfully!</h3>
                <p>Thank you for contacting us. Our support team will get back to you within 24 hours.</p>
                <button class="cta-button" onclick="this.parentElement.parentElement.remove()">
                    Close
                </button>
            </div>
        `;

        // Add overlay styles
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;

        document.body.appendChild(overlay);

        // Animate in
        setTimeout(() => {
            overlay.style.opacity = '1';
        }, 100);

        // Auto close after 5 seconds
        setTimeout(() => {
            if (overlay.parentElement) {
                overlay.style.opacity = '0';
                setTimeout(() => {
                    if (overlay.parentElement) {
                        overlay.remove();
                    }
                }, 300);
            }
        }, 5000);
    }

    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">${type === 'success' ? '✓' : '!'}</span>
                <span class="notification-message">${message}</span>
            </div>
        `;

        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#28a745' : '#dc3545'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }, 3000);
    }

    addAnimations() {
        // Animate success elements on load
        setTimeout(() => {
            document.querySelector('.success-icon').style.animation = 'bounceIn 1s ease';
            document.querySelector('.success-title').style.animation = 'fadeInUp 1s ease 0.2s both';
            document.querySelector('.success-subtitle').style.animation = 'fadeInUp 1s ease 0.4s both';
            document.querySelector('.success-details').style.animation = 'fadeInUp 1s ease 0.6s both';
            document.querySelector('.action-buttons').style.animation = 'fadeInUp 1s ease 0.8s both';
        }, 100);

        // Intersection Observer for form animation
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.contact-form-container, .contact-info').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease';
            observer.observe(el);
        });
    }

    setupEventListeners() {
        // Smooth scroll to contact form
        window.scrollToContact = () => {
            document.getElementById('contact').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        };

        // FAQ accordion functionality
        document.querySelectorAll('.faq-item').forEach(item => {
            item.addEventListener('click', () => {
                item.classList.toggle('active');
            });
        });

        // Copy order number functionality
        document.getElementById('order-number').addEventListener('click', () => {
            navigator.clipboard.writeText(document.getElementById('order-number').textContent)
                .then(() => {
                    this.showNotification('Order number copied to clipboard!');
                })
                .catch(() => {
                    this.showNotification('Failed to copy order number', 'error');
                });
        });
    }
}

// Analytics and tracking for thank you page
class ThankYouAnalytics {
    constructor() {
        this.trackConversion();
        this.trackUserBehavior();
    }

    trackConversion() {
        // Track successful purchase conversion
        const analytics = JSON.parse(localStorage.getItem('siteAnalytics') || '{}');
        analytics.conversions = (analytics.conversions || 0) + 1;
        analytics.lastConversion = new Date().toISOString();
        analytics.conversionValue = this.calculateOrderValue();
        localStorage.setItem('siteAnalytics', JSON.stringify(analytics));

        console.log('Conversion tracked:', analytics.conversions);
    }

    calculateOrderValue() {
        // Simulate order value calculation
        return Math.floor(Math.random() * 500 + 100);
    }

    trackUserBehavior() {
        // Track page interactions
        document.addEventListener('click', (e) => {
            if (e.target.matches('button, a, .faq-item')) {
                const analytics = JSON.parse(localStorage.getItem('siteAnalytics') || '{}');
                const interactions = analytics.thankYouInteractions || [];
                
                interactions.push({
                    element: e.target.textContent.trim().substring(0, 50),
                    timestamp: new Date().toISOString(),
                    type: 'click'
                });

                analytics.thankYouInteractions = interactions.slice(-20);
                localStorage.setItem('siteAnalytics', JSON.stringify(analytics));
            }
        });
    }
}

// Initialize thank you page functionality
document.addEventListener('DOMContentLoaded', () => {
    new ThankYouPage();
    new ThankYouAnalytics();
    
    console.log('Thank you page initialized successfully!');
});

// Add additional CSS for thank you page elements
const thankYouCSS = `
.thank-you-hero {
    min-height: 80vh;
    background: linear-gradient(135deg, #0a0a0a 0%, #1a0a00 50%, #0a0a0a 100%);
    display: flex;
    align-items: center;
    padding-top: 80px;
}

.thank-you-content {
    text-align: center;
    max-width: 800px;
    margin: 0 auto;
}

.success-icon {
    margin-bottom: 2rem;
    opacity: 0;
}

.success-title {
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 900;
    margin-bottom: 1rem;
    background: linear-gradient(135deg, #28a745, #20c997);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    opacity: 0;
}

.success-subtitle {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 2rem;
    color: #ffffff;
    opacity: 0;
}

.success-details {
    background: linear-gradient(135deg, #1a1a1a, #2a2a2a);
    padding: 2rem;
    border-radius: 20px;
    margin-bottom: 3rem;
    border: 1px solid #333333;
    opacity: 0;
}

.success-details p {
    font-size: 1.1rem;
    color: #cccccc;
    margin-bottom: 2rem;
    line-height: 1.6;
}

.order-info {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
}

.info-item {
    text-align: left;
}

.info-label {
    display: block;
    font-weight: 600;
    color: #ff6b35;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 0.5rem;
}

.info-value {
    display: block;
    font-size: 1.1rem;
    font-weight: 700;
    color: #ffffff;
}

.savings {
    color: #28a745 !important;
}

.action-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
    opacity: 0;
}

.secondary-button {
    background: transparent;
    color: #ff6b35;
    border: 2px solid #ff6b35;
    padding: 1rem 2rem;
    text-decoration: none;
    font-weight: 600;
    border-radius: 50px;
    transition: all 0.3s ease;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.secondary-button:hover {
    background: #ff6b35;
    color: #ffffff;
    transform: translateY(-2px);
}

.contact-support {
    padding: 6rem 0;
    background: #111111;
}

.contact-header {
    text-align: center;
    margin-bottom: 4rem;
}

.contact-header h2 {
    font-size: 2.5rem;
    font-weight: 800;
    margin-bottom: 1rem;
    color: #ffffff;
}

.contact-header p {
    font-size: 1.1rem;
    color: #cccccc;
    max-width: 600px;
    margin: 0 auto;
}

.contact-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: start;
}

.contact-info h3 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 2rem;
    color: #ff6b35;
}

.contact-methods {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.contact-method {
    display: flex;
    gap: 1rem;
    align-items: flex-start;
}

.method-icon {
    flex-shrink: 0;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #ff6b35, #f7931e);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.method-details h4 {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: #ffffff;
}

.method-details p {
    color: #ff6b35;
    font-weight: 600;
    margin-bottom: 0.3rem;
}

.response-time {
    font-size: 0.9rem;
    color: #888888;
}

.contact-form-container {
    background: linear-gradient(135deg, #1a1a1a, #2a2a2a);
    padding: 2.5rem;
    border-radius: 20px;
    border: 1px solid #333333;
}

.contact-form h3 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 2rem;
    color: #ffffff;
}

.form-group {
    margin-bottom: 1.5rem;
}

.form-group label {
    display: block;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: #ffffff;
}

.form-group input,
.form-group textarea {
    width: 100%;
    padding: 1rem;
    border: 2px solid #333333;
    border-radius: 10px;
    background: #0a0a0a;
    color: #ffffff;
    font-size: 1rem;
    transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus {
    outline: none;
    border-color: #ff6b35;
}

.form-group input.error,
.form-group textarea.error {
    border-color: #dc3545;
}

.error-message {
    display: none;
    color: #dc3545;
    font-size: 0.9rem;
    margin-top: 0.5rem;
}

.checkbox-label {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    cursor: pointer;
    font-size: 0.9rem;
    line-height: 1.4;
}

.checkbox-label input[type="checkbox"] {
    width: auto;
    margin: 0;
}

.form-submit-btn {
    width: 100%;
    margin-top: 1rem;
}

.form-submit-btn.loading {
    opacity: 0.7;
    cursor: not-allowed;
}

.faq-section {
    padding: 6rem 0;
    background: linear-gradient(135deg, #0a0a0a 0%, #1a0a00 50%, #0a0a0a 100%);
}

.faq-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 3rem;
}

.faq-item {
    background: linear-gradient(135deg, #1a1a1a, #2a2a2a);
    padding: 1.5rem;
    border-radius: 15px;
    border: 1px solid #333333;
    cursor: pointer;
    transition: all 0.3s ease;
}

.faq-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(255, 107, 53, 0.2);
}

.faq-item h4 {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: #ff6b35;
}

.faq-item p {
    color: #cccccc;
    line-height: 1.6;
}

.confirmation-modal {
    background: linear-gradient(135deg, #1a1a1a, #2a2a2a);
    padding: 3rem;
    border-radius: 20px;
    text-align: center;
    max-width: 400px;
    border: 1px solid #333333;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

.confirmation-modal h3 {
    font-size: 1.5rem;
    font-weight: 700;
    margin: 1rem 0;
    color: #28a745;
}

.confirmation-modal p {
    color: #cccccc;
    margin-bottom: 2rem;
    line-height: 1.6;
}

.confirmation-icon {
    margin-bottom: 1rem;
}

@keyframes bounceIn {
    0% { transform: scale(0.3); opacity: 0; }
    50% { transform: scale(1.05); }
    70% { transform: scale(0.9); }
    100% { transform: scale(1); opacity: 1; }
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@media (max-width: 768px) {
    .contact-container {
        grid-template-columns: 1fr;
        gap: 3rem;
    }
    
    .action-buttons {
        flex-direction: column;
        align-items: center;
    }
    
    .order-info {
        grid-template-columns: 1fr;
        text-align: center;
    }
    
    .info-item {
        text-align: center;
    }
}
`;

// Inject thank you page CSS
const thankYouStyle = document.createElement('style');
thankYouStyle.textContent = thankYouCSS;
document.head.appendChild(thankYouStyle);
