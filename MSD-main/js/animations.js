// Scroll reveal functionality
function reveal() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

// Add reveal class to elements that should animate
document.addEventListener('DOMContentLoaded', () => {
    // Add reveal class to sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('reveal');
    });

    // Add reveal class to class cards and plan cards
    const cards = document.querySelectorAll('.class-card, .plan-card');
    cards.forEach(card => {
        card.classList.add('reveal');
    });

    // Add button animations
    const buttons = document.querySelectorAll('button, .btn');
    buttons.forEach(button => {
        button.classList.add('cta-button');
    });

    // Initialize scroll reveal
    window.addEventListener('scroll', reveal);
    reveal(); // Call once to check for elements already in view
});

// Loading animation
window.addEventListener('load', () => {
    const loadingOverlay = document.querySelector('.loading-overlay');
    if (loadingOverlay) {
        setTimeout(() => {
            loadingOverlay.style.display = 'none';
        }, 2500); // Hide after animation completes
    }
});
