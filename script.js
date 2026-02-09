// ===================================
// MOBILE MENU TOGGLE
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    
    if (mobileMenuToggle && nav) {
        mobileMenuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.header-content')) {
                nav.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        });
        
        // Close menu when clicking a link
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            });
        });
    }
});

// ===================================
// ADMISSION INQUIRY FORM VALIDATION
// ===================================
const submitBtn = document.getElementById('submitBtn');
if (submitBtn) {
    submitBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        const studentName = document.getElementById('studentName').value.trim();
        const classValue = document.getElementById('class').value;
        const parentName = document.getElementById('parentName').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const batch = document.getElementById('batch').value;
        const formMessage = document.getElementById('formMessage');
        
        // Validation
        if (!studentName || !classValue || !parentName || !phone || !batch) {
            showMessage(formMessage, 'Please fill in all required fields.', 'error');
            return;
        }
        
        // Phone validation (basic)
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(phone.replace(/[\s-]/g, ''))) {
            showMessage(formMessage, 'Please enter a valid 10-digit phone number.', 'error');
            return;
        }
        
        // Success message
        showMessage(formMessage, 'Thank you for your inquiry! We will contact you within 24 hours.', 'success');
        
        // Reset form
        setTimeout(() => {
            document.querySelectorAll('#studentName, #class, #parentName, #phone, #email, #batch, #message').forEach(field => {
                if (field) field.value = '';
            });
            formMessage.style.display = 'none';
        }, 3000);
    });
}

// ===================================
// CONTACT FORM VALIDATION
// ===================================
const contactSubmitBtn = document.getElementById('contactSubmitBtn');
if (contactSubmitBtn) {
    contactSubmitBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        const contactName = document.getElementById('contactName').value.trim();
        const contactEmail = document.getElementById('contactEmail').value.trim();
        const contactPhone = document.getElementById('contactPhone').value.trim();
        const subject = document.getElementById('subject').value;
        const contactMessage = document.getElementById('contactMessage').value.trim();
        const formMessage = document.getElementById('contactFormMessage');
        
        // Validation
        if (!contactName || !contactEmail || !contactPhone || !subject || !contactMessage) {
            showMessage(formMessage, 'Please fill in all required fields.', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(contactEmail)) {
            showMessage(formMessage, 'Please enter a valid email address.', 'error');
            return;
        }
        
        // Phone validation (basic)
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(contactPhone.replace(/[\s-]/g, ''))) {
            showMessage(formMessage, 'Please enter a valid 10-digit phone number.', 'error');
            return;
        }
        
        // Success message
        showMessage(formMessage, 'Thank you for contacting us! We will get back to you shortly.', 'success');
        
        // Reset form
        setTimeout(() => {
            document.querySelectorAll('#contactName, #contactEmail, #contactPhone, #subject, #contactMessage').forEach(field => {
                if (field) field.value = '';
            });
            formMessage.style.display = 'none';
        }, 3000);
    });
}

// ===================================
// UTILITY FUNCTION TO SHOW MESSAGES
// ===================================
function showMessage(element, message, type) {
    if (!element) return;
    
    element.textContent = message;
    element.className = 'form-message ' + type;
    element.style.display = 'block';
    
    // Scroll to message
    element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ===================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ===================================
// HEADER SCROLL EFFECT
// ===================================
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// ===================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for fade-in animation
document.querySelectorAll('.feature-card, .course-card, .value-card, .subject-card, .step-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===================================
// PREVENT FORM RESUBMISSION ON REFRESH
// ===================================
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}
