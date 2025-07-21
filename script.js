// Countdown Timer Functionality
class CountdownTimer {
    constructor() {
        this.init();
    }

    init() {
        this.setEndTime();
        this.updateTimer();
        this.startTimer();
    }

    setEndTime() {
        // Check if end time exists in localStorage
        const storedEndTime = localStorage.getItem('blackFridayEndTime');
        const now = new Date().getTime();

        if (storedEndTime && parseInt(storedEndTime) > now) {
            // Use existing end time if it's still in the future
            this.endTime = parseInt(storedEndTime);
        } else {
            // Set new end time (2 days from now)
            this.endTime = now + (2 * 24 * 60 * 60 * 1000);
            localStorage.setItem('blackFridayEndTime', this.endTime.toString());
        }
    }

    updateTimer() {
        const now = new Date().getTime();
        const timeLeft = this.endTime - now;

        if (timeLeft > 0) {
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

            // Update DOM elements
            this.updateElement('days', days);
            this.updateElement('hours', hours);
            this.updateElement('minutes', minutes);
            this.updateElement('seconds', seconds);
        } else {
            // Timer expired, reset for another 2 days
            this.resetTimer();
        }
    }

    updateElement(id, value) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value.toString().padStart(2, '0');
        }
    }

    resetTimer() {
        // Reset timer for another 2 days
        const now = new Date().getTime();
        this.endTime = now + (2 * 24 * 60 * 60 * 1000);
        localStorage.setItem('blackFridayEndTime', this.endTime.toString());
        this.updateTimer();
    }

    startTimer() {
        // Update every second
        setInterval(() => {
            this.updateTimer();
        }, 1000);
    }
}

// Shopping Cart and Navigation Functionality
class ShoppingExperience {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.addFloatingAnimations();
    }

    setupEventListeners() {
        // Shop Now button click handlers
        const shopButtons = document.querySelectorAll('[data-testid="shop-now-btn"]');
        shopButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.handleShopNowClick(e);
            });
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Add scroll effects
        this.addScrollEffects();
    }

    handleShopNowClick(e) {
        // Add click animation
        const button = e.target;
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
        }, 150);

        // Navigate to thank you page after animation
        setTimeout(() => {
            window.location.href = 'thankyou.html';
        }, 300);
    }

    addScrollEffects() {
        // Navbar background effect on scroll
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.header');
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            } else {
                navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            }
        });

        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe elements for animations
        document.querySelectorAll('.feature-card, .product-card, .testimonial-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease';
            observer.observe(el);
        });
    }

    addFloatingAnimations() {
        // Add subtle floating animations to product cards
        document.querySelectorAll('.product-card').forEach((card, index) => {
            card.style.animationDelay = `${index * 0.2}s`;
            card.classList.add('float-animation');
        });

        // Add hover sound effects (visual feedback)
        document.querySelectorAll('.cta-button').forEach(button => {
            button.addEventListener('mouseenter', () => {
                button.style.boxShadow = '0 15px 40px rgba(255, 107, 53, 0.6)';
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.boxShadow = '0 10px 30px rgba(255, 107, 53, 0.4)';
            });
        });
    }
}

// Form Validation and Utility Functions
class FormUtils {
    static validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    static showNotification(message, type = 'success') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">${type === 'success' ? '✓' : '!'}</span>
                <span class="notification-message">${message}</span>
            </div>
        `;

        // Add notification styles
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

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Performance and Analytics Tracking
class PerformanceTracker {
    constructor() {
        this.trackPageLoad();
        this.trackUserInteractions();
    }

    trackPageLoad() {
        window.addEventListener('load', () => {
            const loadTime = performance.now();
            console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
            
            // Track to localStorage for demo purposes
            const analytics = JSON.parse(localStorage.getItem('siteAnalytics') || '{}');
            analytics.lastPageLoad = new Date().toISOString();
            analytics.loadTime = loadTime;
            localStorage.setItem('siteAnalytics', JSON.stringify(analytics));
        });
    }

    trackUserInteractions() {
        // Track button clicks
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-testid]')) {
                const analytics = JSON.parse(localStorage.getItem('siteAnalytics') || '{}');
                const interactions = analytics.interactions || [];
                
                interactions.push({
                    element: e.target.getAttribute('data-testid'),
                    timestamp: new Date().toISOString(),
                    type: 'click'
                });

                analytics.interactions = interactions.slice(-50); // Keep last 50 interactions
                localStorage.setItem('siteAnalytics', JSON.stringify(analytics));
            }
        });

        // Track scroll depth
        let maxScrollDepth = 0;
        window.addEventListener('scroll', () => {
            const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
            if (scrollPercent > maxScrollDepth) {
                maxScrollDepth = scrollPercent;
                const analytics = JSON.parse(localStorage.getItem('siteAnalytics') || '{}');
                analytics.maxScrollDepth = maxScrollDepth;
                localStorage.setItem('siteAnalytics', JSON.stringify(analytics));
            }
        });
    }
}

// Accessibility Enhancements (with intentional gaps for demo)
class AccessibilityManager {
    constructor() {
        this.init();
    }

    init() {
        this.addKeyboardNavigation();
        this.setupARIALabels();
        // Intentionally missing some focus indicators and ARIA labels for demo
    }

    addKeyboardNavigation() {
        // Add keyboard navigation for CTA buttons
        document.querySelectorAll('.cta-button').forEach(button => {
            button.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    button.click();
                }
            });
        });

        // Tab order management
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                // Add visual indication of tab navigation
                document.body.classList.add('keyboard-navigation');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
    }

    setupARIALabels() {
        // Add ARIA labels to countdown timer
        const countdownTimer = document.querySelector('[data-testid="countdown-timer"]');
        if (countdownTimer) {
            countdownTimer.setAttribute('aria-label', 'Sale countdown timer');
            countdownTimer.setAttribute('role', 'timer');
        }

        // Add ARIA labels to shop buttons
        document.querySelectorAll('[data-testid="shop-now-btn"]').forEach(button => {
            button.setAttribute('aria-label', 'Shop now for Black Friday deals');
        });

        // Intentionally missing some ARIA labels for demo purposes
    }
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize countdown timer
    new CountdownTimer();
    
    // Initialize shopping experience
    new ShoppingExperience();
    
    // Initialize performance tracking
    new PerformanceTracker();
    
    // Initialize accessibility features
    new AccessibilityManager();
    
    // Add loading animation
    document.body.classList.add('loaded');
    
    console.log('Black Friday landing page initialized successfully!');
});

// Add CSS for keyboard navigation
const keyboardNavigationCSS = `
.keyboard-navigation *:focus {
    outline: 2px solid #ff6b35 !important;
    outline-offset: 2px !important;
}

.loaded {
    opacity: 1;
}

.float-animation {
    animation: gentleFloat 6s ease-in-out infinite;
}

@keyframes gentleFloat {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-5px); }
}

.notification-content {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.notification-icon {
    font-weight: bold;
    font-size: 1.2rem;
}
`;

// Inject keyboard navigation CSS
const style = document.createElement('style');
style.textContent = keyboardNavigationCSS;
document.head.appendChild(style);
