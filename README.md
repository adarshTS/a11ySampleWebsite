# Black Friday Sales Landing Page - 404Deals

A modern, responsive Black Friday sales landing page built with vanilla HTML, CSS, and JavaScript. This project demonstrates both good automation testing practices and intentional accessibility issues for educational purposes.

## 🌟 Features

### Design & UI
- **Modern Black Friday Aesthetics**: Dark backgrounds with orange/red accents
- **Responsive Design**: Optimized for desktop and mobile devices
- **Smooth Animations**: CSS animations and transitions throughout
- **Dynamic Countdown Timer**: Resets every 2 days with localStorage persistence
- **Interactive Elements**: Hover effects, click animations, and visual feedback

### Core Functionality
- **Landing Page** (`index.html`): Main sales page with product showcase
- **Thank You Page** (`thankyou.html`): Order confirmation with contact form
- **Dynamic Countdown**: JavaScript-powered timer that persists across sessions
- **Form Validation**: Real-time validation with error messaging
- **Local Storage**: Preserves countdown timer and analytics data

### Automation Testing Support
- **Semantic HTML**: Proper structure with meaningful elements
- **Data Attributes**: `data-testid` attributes for reliable test automation
- **Unique IDs**: Consistent naming for form elements and interactive components
- **ARIA Labels**: Accessibility attributes for screen readers

### Intentional Accessibility Issues (for Demo)
1. **Missing Alt Text**: Some decorative images lack alt attributes
2. **Missing Labels**: One form field without proper label association
3. **Low Color Contrast**: Secondary text with insufficient contrast ratios
4. **Missing Focus Indicators**: Some interactive elements lack focus styles

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional, for best experience)

### Installation
1. Clone or download the project files
2. Open `index.html` in your web browser
3. For local development, use a simple HTTP server:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (if you have http-server installed)
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```

## 📁 File Structure

```
a11ySampleWebsite/
├── index.html          # Main landing page
├── thankyou.html       # Thank you/confirmation page
├── styles.css          # All CSS styles
├── script.js           # Main JavaScript functionality
├── thankyou.js         # Thank you page JavaScript
└── README.md          # This file
```

## 🎯 Key Elements for Testing

### Main Landing Page
- **Countdown Timer**: `data-testid="countdown-timer"`
- **Shop Now Buttons**: `data-testid="shop-now-btn"`
- **Product Cards**: Individual product listings with pricing
- **Navigation**: Header navigation with smooth scroll

### Thank You Page
- **Contact Form**: `data-testid="contact-form"`
- **Form Fields**: 
  - `id="customer-name"` - Name input
  - `id="customer-email"` - Email input
  - `id="customer-order-id"` - Order ID input
  - `id="customer-message"` - Message textarea
- **Submit Button**: Form submission with validation

## 🔧 Technical Details

### JavaScript Features
- **CountdownTimer Class**: Manages 2-day recurring countdown
- **ShoppingExperience Class**: Handles navigation and interactions
- **FormUtils Class**: Email validation and notifications
- **PerformanceTracker Class**: Analytics and user interaction tracking
- **AccessibilityManager Class**: Keyboard navigation and ARIA support

### CSS Features
- **CSS Grid & Flexbox**: Responsive layout system
- **CSS Custom Properties**: Theme colors and spacing
- **CSS Animations**: Keyframe animations for engaging UX
- **Media Queries**: Mobile-first responsive design
- **CSS Gradients**: Modern visual effects

### Accessibility Features
- **Semantic HTML5**: Proper document structure
- **ARIA Attributes**: Enhanced screen reader support
- **Keyboard Navigation**: Tab order and focus management
- **Color Contrast**: High contrast mode support
- **Reduced Motion**: Respects user motion preferences

## 🧪 Testing Scenarios

### Automation Testing
1. **Countdown Timer**: Verify timer displays and updates correctly
2. **CTA Buttons**: Test "Shop Now" button navigation
3. **Form Validation**: Test required field validation
4. **Form Submission**: Verify successful form submission flow
5. **Responsive Design**: Test across different screen sizes
6. **Navigation**: Test smooth scrolling and page transitions

### Accessibility Testing
1. **Screen Reader**: Test with NVDA, JAWS, or VoiceOver
2. **Keyboard Navigation**: Tab through all interactive elements
3. **Color Contrast**: Use tools like WebAIM Contrast Checker
4. **Focus Indicators**: Verify visible focus states
5. **Alt Text**: Check for missing or inadequate alt attributes

## 🎨 Design Reference

This landing page is inspired by modern Black Friday sales pages with:
- High-converting layout patterns
- Urgency-driven messaging
- Social proof elements
- Clear call-to-action buttons
- Trust indicators and guarantees

## 📊 Analytics & Tracking

The site includes client-side analytics that track:
- Page load times
- User interactions
- Scroll depth
- Form submissions
- Conversion events

Data is stored in localStorage for demonstration purposes.

## 🐛 Known Issues (Intentional)

These accessibility issues are intentionally included for educational testing:

1. **Missing Alt Text**: Product images missing descriptive alt attributes
2. **Form Label**: Order ID field lacks proper label association
3. **Color Contrast**: Some secondary text has low contrast ratios
4. **Focus Indicators**: Certain interactive elements lack focus styles

## 🛠️ Future Enhancements

Potential improvements for production use:
- Server-side form processing
- Real-time inventory updates
- Payment gateway integration
- A/B testing framework
- Advanced analytics tracking
- Comprehensive accessibility audit

## 📝 License

This project is created for educational and testing purposes. Feel free to use and modify as needed.

## 🤝 Contributing

This is a demo project, but suggestions for improvements are welcome:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

**Note**: This is a demonstration website created for testing and educational purposes. No actual products are sold, and no real transactions are processed.
