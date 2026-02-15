// Состояние приложения
let currentSlide = 1;
const totalSlides = 5;

// Загрузочная страница
window.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    const startPage = document.getElementById('start-page');
    
    // Симуляция загрузки
    setTimeout(() => {
        loader.classList.add('fade-out');
        setTimeout(() => {
            loader.style.display = 'none';
            startPage.classList.remove('hidden');
            initStartPage();
        }, 500);
    }, 2000);
});

// Инициализация стартовой страницы
function initStartPage() {
    const startBtn = document.getElementById('startLearningBtn');
    const startPage = document.getElementById('start-page');
    const learning = document.getElementById('learning');
    
    startBtn.addEventListener('click', () => {
        // Анимация перехода
        startPage.style.opacity = '0';
        startPage.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            startPage.classList.add('hidden');
            learning.classList.remove('hidden');
            initLearning();
        }, 300);
    });
}

// Инициализация обучения
function initLearning() {
    updateProgress();
    updateNavigation();
    animateCurrentSlide();
    
    // Навигация
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const getAccessBtn = document.getElementById('getAccessBtn');
    
    nextBtn.addEventListener('click', () => {
        if (currentSlide < totalSlides) {
            goToSlide(currentSlide + 1);
        }
    });
    
    prevBtn.addEventListener('click', () => {
        if (currentSlide > 1) {
            goToSlide(currentSlide - 1);
        }
    });
    
    getAccessBtn?.addEventListener('click', () => {
        window.location.href = 'manual.html';
    });
    
    // Клавиатурная навигация
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' && currentSlide < totalSlides) {
            goToSlide(currentSlide + 1);
        } else if (e.key === 'ArrowLeft' && currentSlide > 1) {
            goToSlide(currentSlide - 1);
        }
    });
}

// Переход к слайду
function goToSlide(slideNumber) {
    const currentSlideEl = document.querySelector(`.slide[data-slide="${currentSlide}"]`);
    const newSlideEl = document.querySelector(`.slide[data-slide="${slideNumber}"]`);
    
    // Анимация выхода
    currentSlideEl.classList.remove('active');
    if (slideNumber > currentSlide) {
        currentSlideEl.classList.add('prev');
    }
    
    // Обновление текущего слайда
    currentSlide = slideNumber;
    
    // Анимация входа
    setTimeout(() => {
        newSlideEl.classList.add('active');
        newSlideEl.classList.remove('prev');
        updateProgress();
        updateNavigation();
        animateCurrentSlide();
    }, 300);
}

// Обновление прогресса
function updateProgress() {
    const progressFill = document.getElementById('progressFill');
    const currentStepEl = document.getElementById('currentStep');
    const totalStepsEl = document.getElementById('totalSteps');
    
    const progress = (currentSlide / totalSlides) * 100;
    progressFill.style.width = `${progress}%`;
    currentStepEl.textContent = currentSlide;
    totalStepsEl.textContent = totalSlides;
}

// Обновление навигации
function updateNavigation() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    prevBtn.disabled = currentSlide === 1;
    
    if (currentSlide === totalSlides) {
        nextBtn.style.display = 'none';
    } else {
        nextBtn.style.display = 'flex';
    }
}

// Анимация элементов текущего слайда
function animateCurrentSlide() {
    const currentSlideEl = document.querySelector(`.slide[data-slide="${currentSlide}"]`);
    
    // Анимация счетчика на первом слайде
    if (currentSlide === 1) {
        const counter = currentSlideEl.querySelector('.highlight-number[data-target]');
        if (counter && !counter.classList.contains('counted')) {
            counter.classList.add('counted');
            animateCounter(counter);
        }
    }
    
    // Анимация шагов
    const stepItems = currentSlideEl.querySelectorAll('.step-item');
    stepItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('animate');
        }, index * 200);
    });
    
    // Анимация платформ
    const platformCards = currentSlideEl.querySelectorAll('.platform-card');
    platformCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('animate');
        }, index * 150);
    });
    
    // Анимация преимуществ
    const benefitItems = currentSlideEl.querySelectorAll('.benefit-item');
    benefitItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('animate');
        }, index * 100);
    });
    
    // Интерактивность платформ
    platformCards.forEach(card => {
        card.addEventListener('click', () => {
            platformCards.forEach(c => c.style.transform = 'scale(1)');
            card.style.transform = 'scale(1.1)';
            card.style.borderColor = 'rgba(102, 126, 234, 0.8)';
            
            setTimeout(() => {
                card.style.transform = '';
                card.style.borderColor = '';
            }, 500);
        });
    });
}

// Анимация счетчика
function animateCounter(counter) {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            counter.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            counter.textContent = target + '+';
        }
    };
    
    updateCounter();
}

// Показ сообщения об успехе
function showSuccessMessage() {
    const message = document.createElement('div');
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 40px 60px;
        border-radius: 30px;
        font-size: 1.5rem;
        font-weight: 600;
        z-index: 10000;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        text-align: center;
        animation: popIn 0.3s ease;
    `;
    message.innerHTML = `
        <div style="width: 80px; height: 80px; margin: 0 auto 20px; color: white;">
            <svg viewBox="0 0 24 24" fill="currentColor" style="width: 100%; height: 100%;">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
        </div>
        <div>Регистрация открыта!</div>
        <div style="font-size: 1rem; margin-top: 15px; opacity: 0.9;">Скоро с тобой свяжутся</div>
    `;
    
    document.body.appendChild(message);
    
    // Эффект частиц
    createSuccessParticles();
    
    setTimeout(() => {
        message.style.animation = 'popOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(message);
        }, 300);
    }, 3000);
}

// Создание частиц успеха
function createSuccessParticles() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 8px;
            height: 8px;
            background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
            border-radius: 50%;
            pointer-events: none;
            left: ${centerX}px;
            top: ${centerY}px;
            z-index: 9999;
        `;
        
        document.body.appendChild(particle);
        
        const angle = (Math.PI * 2 * i) / 30;
        const velocity = 100 + Math.random() * 50;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        let posX = centerX;
        let posY = centerY;
        let opacity = 1;
        let scale = 1;
        
        const animate = () => {
            posX += vx * 0.1;
            posY += vy * 0.1;
            opacity -= 0.015;
            scale += 0.02;
            
            particle.style.left = posX + 'px';
            particle.style.top = posY + 'px';
            particle.style.opacity = opacity;
            particle.style.transform = `scale(${scale})`;
            
            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        };
        
        animate();
    }
}

// Добавляем стили для анимаций
const style = document.createElement('style');
style.textContent = `
    @keyframes popIn {
        from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
        }
        to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
    }
    
    @keyframes popOut {
        from {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
        to {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
        }
    }
`;
document.head.appendChild(style);
