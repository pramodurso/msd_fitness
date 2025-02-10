// Loading Animation
document.addEventListener('DOMContentLoaded', () => {
    const loadingOverlay = document.querySelector('.loading-overlay');
    
    // Hide loading overlay after animations complete
    setTimeout(() => {
        loadingOverlay.classList.add('fade-out');
        setTimeout(() => {
            loadingOverlay.style.display = 'none';
        }, 500);
    }, 2000);

    // Mobile Navigation Toggle
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');
    const dropdowns = document.querySelectorAll('.dropdown');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });

    // Handle mobile dropdown menus
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        const dropdownContent = dropdown.querySelector('.dropdown-content');
        
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                // Close all other dropdowns
                dropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.classList.remove('active');
                    }
                });
                // Toggle current dropdown
                dropdown.classList.toggle('active');
                dropdownContent.style.display = dropdown.classList.contains('active') ? 'block' : 'none';
            }
        });
    });

    // FAQ Toggles
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            item.classList.toggle('active');
        });
    });

    // Testimonials Data
    const testimonials = [
        {
            name: "John Doe",
            text: "MSD Fitness has transformed my life! The trainers are exceptional and the facilities are top-notch."
        },
        {
            name: "Jane Smith",
            text: "I've tried many gyms, but MSD Fitness stands out. The community here is amazing and supportive."
        },
        {
            name: "Mike Johnson",
            text: "The variety of classes and equipment keeps me motivated. Best fitness decision I've ever made!"
        }
    ];

    // Initialize Testimonials Carousel
    let currentTestimonial = 0;
    const testimonialContainer = document.querySelector('.testimonial-carousel');

    function createTestimonialElement(testimonial) {
        return `
            <div class="testimonial">
                <p class="testimonial-text">"${testimonial.text}"</p>
                <p class="testimonial-author">- ${testimonial.name}</p>
            </div>
        `;
    }

    function updateTestimonial() {
        testimonialContainer.innerHTML = createTestimonialElement(testimonials[currentTestimonial]);
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    }

    // Initial testimonial
    updateTestimonial();
    // Rotate testimonials every 5 seconds
    setInterval(updateTestimonial, 5000);

    // Handle smooth scrolling for all sections
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                navLinks.classList.remove('active');
            }
        });
    });

    // Custom scroll handling for Classes section
    document.querySelector('a[href="#gym"]').addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector('#gym');
        const offset = 10; // Reduced offset to prevent scrolling too far
        const position = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({
            top: position,
            behavior: 'smooth'
        });
    });

    // Adjust scroll position when clicking the Gym link in the navbar
    document.querySelector('a[href="#gym"]').addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector('#gym');
        const offset = 100; // Reduced offset to prevent scrolling too far
        const position = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({
            top: position,
            behavior: 'smooth'
        });
    });

    // Add Google Maps
    // Note: You'll need to replace YOUR_API_KEY with an actual Google Maps API key
    const mapContainer = document.querySelector('.map');
    mapContainer.innerHTML = `
        <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2219901290355!2d-74.00369368400567!3d40.71312937933185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a23e28c1191%3A0x49f75d3281df052a!2s150%20Park%20Row%2C%20New%20York%2C%20NY%2010007!5e0!3m2!1sen!2sus!4v1644262070010!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style="border:0;"
            allowfullscreen=""
            loading="lazy">
        </iframe>
    `;

    // Handle Join Now buttons
    const joinButtons = document.querySelectorAll('.join-button');
    joinButtons.forEach(button => {
        button.addEventListener('click', () => {
            const contactSection = document.querySelector('#contact');
            contactSection.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Slider functionality
    const slider = document.querySelector('.slider');
    const slidesWrapper = document.querySelector('.slides');
    const slides = document.querySelectorAll('.slider-slide');
    const prevButton = document.querySelector('.slider-button.prev');
    const nextButton = document.querySelector('.slider-button.next');
    const dotsContainer = document.querySelector('.slider-dots');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    function updateDots() {
        const dots = document.querySelectorAll('.slider-dot');
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentSlide]?.classList.add('active');
    }

    function createDots() {
        const dotsContainer = document.querySelector('.slider-dots');
        dotsContainer.innerHTML = '';
        
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('slider-dot');
            if (index === currentSlide) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
    }
    
    function goToSlide(index) {
        currentSlide = (index + slides.length) % slides.length;
        slidesWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
        updateDots();
    }
    
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    function prevSlide() {
        goToSlide(currentSlide - 1);
    }
    
    let autoSlideInterval;
    
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }
    
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }
    
    function resetAutoSlide() {
        stopAutoSlide();
        startAutoSlide();
    }
    
    // Event Listeners
    prevButton.addEventListener('click', (e) => {
        e.preventDefault();
        prevSlide();
        resetAutoSlide();
    });
    
    nextButton.addEventListener('click', (e) => {
        e.preventDefault();
        nextSlide();
        resetAutoSlide();
    });
    
    // Touch events for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    slidesWrapper.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        stopAutoSlide();
    });
    
    slidesWrapper.addEventListener('touchmove', (e) => {
        if (touchStartX) {
            const currentX = e.touches[0].clientX;
            const diff = touchStartX - currentX;
            const movePercent = (diff / slider.offsetWidth) * 100;
            const transform = -(currentSlide * 100 + movePercent);
            slidesWrapper.style.transform = `translateX(${transform}%)`;
            e.preventDefault();
        }
    });
    
    slidesWrapper.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].clientX;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        } else {
            goToSlide(currentSlide);
        }
        
        touchStartX = 0;
        startAutoSlide();
    });
    
    slider.addEventListener('mouseenter', stopAutoSlide);
    slider.addEventListener('mouseleave', startAutoSlide);
    
    // Initialize slider
    createDots();
    goToSlide(0);
    startAutoSlide();
});
