// Slides Management
let currentSlide = 1;
const totalSlides = 11;

document.addEventListener('DOMContentLoaded', () => {
    updateProgress();
    updateNavigation();
    
    // Navigation buttons
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');
    
    prevBtn.addEventListener('click', () => {
        if (currentSlide > 1) {
            goToSlide(currentSlide - 1);
        }
    });
    
    nextBtn.addEventListener('click', () => {
        if (currentSlide < totalSlides) {
            goToSlide(currentSlide + 1);
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' && currentSlide < totalSlides) {
            goToSlide(currentSlide + 1);
        } else if (e.key === 'ArrowLeft' && currentSlide > 1) {
            goToSlide(currentSlide - 1);
        }
    });
    
    // FAQ Toggle
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active', !isActive);
        });
    });
    
    // Animate slides on load
    const slides = document.querySelectorAll('.slide');
    slides.forEach((slide, index) => {
        slide.style.opacity = '0';
        slide.style.transform = 'translateY(20px)';
        setTimeout(() => {
            if (slide.classList.contains('active')) {
                slide.style.transition = 'all 0.5s ease';
                slide.style.opacity = '1';
                slide.style.transform = 'translateY(0)';
            }
        }, 100);
    });
});

function goToSlide(slideNumber) {
    const currentSlideEl = document.querySelector(`.slide[data-slide="${currentSlide}"]`);
    const newSlideEl = document.querySelector(`.slide[data-slide="${slideNumber}"]`);
    
    // Hide current slide
    if (currentSlideEl) {
        currentSlideEl.style.opacity = '0';
        currentSlideEl.style.transform = 'translateY(20px)';
        setTimeout(() => {
            currentSlideEl.classList.remove('active');
        }, 300);
    }
    
    // Show new slide
    currentSlide = slideNumber;
    setTimeout(() => {
        if (newSlideEl) {
            newSlideEl.classList.add('active');
            setTimeout(() => {
                newSlideEl.style.transition = 'all 0.5s ease';
                newSlideEl.style.opacity = '1';
                newSlideEl.style.transform = 'translateY(0)';
            }, 50);
        }
        updateProgress();
        updateNavigation();
    }, 300);
}

function updateProgress() {
    const progressFill = document.getElementById('progressFill');
    const currentSlideNum = document.getElementById('currentSlideNum');
    const totalSlidesNum = document.getElementById('totalSlidesNum');
    
    const progress = (currentSlide / totalSlides) * 100;
    if (progressFill) {
        progressFill.style.width = `${progress}%`;
    }
    if (currentSlideNum) {
        currentSlideNum.textContent = currentSlide;
    }
    if (totalSlidesNum) {
        totalSlidesNum.textContent = totalSlides;
    }
}

function updateNavigation() {
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');
    
    if (prevBtn) {
        prevBtn.disabled = currentSlide === 1;
    }
    
    if (nextBtn) {
        if (currentSlide === 10) {
            nextBtn.innerHTML = 'Завершить <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12H19M19 12L12 5M19 12L12 19"/></svg>';
        } else if (currentSlide === totalSlides) {
            nextBtn.style.display = 'none';
        } else {
            nextBtn.style.display = 'flex';
            nextBtn.innerHTML = 'Далее <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12H19M19 12L12 5M19 12L12 19"/></svg>';
        }
    }
}
