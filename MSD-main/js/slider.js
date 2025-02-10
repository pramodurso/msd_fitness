document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.slides');
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.slider-button.prev');
    const nextButton = document.querySelector('.slider-button.next');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    let autoSlideInterval;

    // Function to move to a specific slide
    function goToSlide(index) {
        if (index < 0) {
            currentSlide = totalSlides - 1;
        } else if (index >= totalSlides) {
            currentSlide = 0;
        } else {
            currentSlide = index;
        }
        
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    // Function to go to next slide
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    // Function to go to previous slide
    function prevSlide() {
        goToSlide(currentSlide - 1);
    }

    // Add click event listeners to buttons
    prevButton.addEventListener('click', () => {
        prevSlide();
        resetAutoSlide(); // Reset the auto-slide timer when manually changing slides
    });

    nextButton.addEventListener('click', () => {
        nextSlide();
        resetAutoSlide(); // Reset the auto-slide timer when manually changing slides
    });

    // Function to start auto-sliding
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }

    // Function to reset auto-slide timer
    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    // Add touch support for mobile devices
    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    });

    slider.addEventListener('touchmove', (e) => {
        touchEndX = e.touches[0].clientX;
    });

    slider.addEventListener('touchend', () => {
        const difference = touchStartX - touchEndX;
        if (Math.abs(difference) > 50) { // Minimum swipe distance
            if (difference > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
        resetAutoSlide();
    });

    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            resetAutoSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            resetAutoSlide();
        }
    });

    // Start auto-sliding when the page loads
    startAutoSlide();
});
