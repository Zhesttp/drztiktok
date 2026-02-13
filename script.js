document.addEventListener('DOMContentLoaded', function() {
    // Initialize Telegram Web App
    const tg = window.Telegram.WebApp;
    
    // Настройка для Telegram Mini App
    if (tg) {
        // Развернуть на весь экран
        tg.expand();
        
        // Настроить цвета темы
        tg.setHeaderColor('#080810');
        tg.setBackgroundColor('#080810');
        
        // Включить закрытие по свайпу вниз
        tg.enableClosingConfirmation();
        
        // Настроить вибрацию
        tg.enableClosingConfirmation();
        
        // Скрыть кнопку "Назад" по умолчанию
        tg.BackButton.hide();
        
        // Настроить главную кнопку (скрыта по умолчанию)
        tg.MainButton.hide();
        
        // Применить тему Telegram к приложению
        const themeParams = tg.themeParams;
        if (themeParams) {
            document.documentElement.style.setProperty('--tg-theme-bg-color', themeParams.bg_color || '#080810');
            document.documentElement.style.setProperty('--tg-theme-text-color', themeParams.text_color || '#ffffff');
            document.documentElement.style.setProperty('--tg-theme-hint-color', themeParams.hint_color || '#8b8ba0');
            document.documentElement.style.setProperty('--tg-theme-link-color', themeParams.link_color || '#ff006e');
            document.documentElement.style.setProperty('--tg-theme-button-color', themeParams.button_color || '#ff006e');
            document.documentElement.style.setProperty('--tg-theme-button-text-color', themeParams.button_text_color || '#ffffff');
        }
    }
    
    // Audio State Management
    let currentAudio = null;
    let isAudioPlaying = false;
    let currentAudioButton = null;
    let currentPlayPauseBtn = null;
    let volumeLevel = 1.0;
    let isMuted = false;
    
    // App State
    const appState = {
        currentStage: 1,
        currentLesson: null,
        currentScreen: 'loading',
        lessonsData: {
            1: {
                title: "Стань частью системы",
                lessons: [
                    {
                        id: 1,
                        type: 'text',
                        title: "Что такое система",
                        description: "Модель заработка на коротких видео",
                        content: `
                            <h3>Стань частью системы</h3>
                            <p>Это понятная и масштабируемая модель заработка на коротком контенте.</p>
                            <p>Вы создаёте видео в популярных соцсетях:</p>
                            <ul>
                                <li><strong>TikTok</strong></li>
                                <li><strong>YouTube Shorts</strong></li>
                                <li><strong>Instagram Reels</strong></li>
                            </ul>
                            <p>И направляете трафик на iGaming-платформу Drazze через личную реферальную ссылку, получая процент с активности привлечённых пользователей.</p>
                        `
                    },
                    {
                        id: 2,
                        type: 'text',
                        title: "Реферальная ссылка",
                        description: "Ваш главный инструмент заработка",
                        content: `
                            <h3>Реферальная ссылка — ваш главный инструмент</h3>
                            <p>На платформе Drazze вы получаете уникальную реферальную ссылку.</p>
                            <p>Все пользователи, которые переходят по ней, автоматически закрепляются за вами.</p>
                            <p>Вы получаете процент с их активности на платформе.</p>
                            <p><strong>📌 Чем больше качественного трафика вы приводите — тем выше ваш доход.</strong></p>
                        `
                    }
                ]
            },
            2: {
                title: "Как начать",
                lessons: [
                    {
                        id: 1,
                        type: 'text',
                        title: "Регистрация на Drazze",
                        description: "Оформление аккаунта и реферальной ссылки",
                        content: `
                            <h3>Регистрация на платформе Drazze</h3>
                            <p>Если вы приняли решение начать — это самый важный шаг.</p>
                            <p><strong>Что нужно сделать:</strong></p>
                            <ol>
                                <li>Зарегистрироваться на платформе Drazze</li>
                                <li>Оформить аккаунт:
                                    <ul>
                                        <li>Drazze лояльно относится к никам и аватаркам</li>
                                        <li>Главное требование — в профиле должна быть ваша реферальная ссылка</li>
                                    </ul>
                                </li>
                            </ol>
                        `
                    },
                    {
                        id: 2,
                        type: 'text',
                        title: "Выбор соцсетей",
                        description: "TikTok, YouTube Shorts, Instagram Reels",
                        content: `
                            <h3>Выбор соцсетей для работы</h3>
                            <ul>
                                <li><strong>TikTok</strong> (приоритет)</li>
                                <li><strong>YouTube Shorts</strong></li>
                                <li><strong>Instagram Reels</strong></li>
                                <li>Дополнительно: <strong>Instagram Threads</strong> (посты)</li>
                            </ul>
                            <p>Эти площадки дают максимальный охват и бесплатный трафик.</p>
                        `
                    }
                ]
            },
            3: {
                title: "Как формируется ваш доход",
                lessons: [
                    {
                        id: 1,
                        type: 'text',
                        title: "Реферальная ссылка",
                        description: "Ваш главный инструмент заработка",
                        content: `
                            <h3>Реферальная ссылка</h3>
                            <p>На платформе Drazze вы получаете уникальную реферальную ссылку — это ваш главный инструмент.</p>
                            <p>Все пользователи, которые переходят по ней, автоматически закрепляются за вами.</p>
                        `
                    },
                    {
                        id: 2,
                        type: 'text',
                        title: "Автоматическое закрепление",
                        description: "Пользователи становятся вашими рефералами",
                        content: `
                            <h3>Автоматическое закрепление</h3>
                            <p>Все пользователи, которые переходят по вашей реферальной ссылке, автоматически становятся вашими рефералами.</p>
                            <p>Они закрепляются за вами в системе Drazze.</p>
                        `
                    },
                    {
                        id: 3,
                        type: 'text',
                        title: "Процент с активности",
                        description: "Чем больше качественного трафика — тем выше доход",
                        content: `
                            <h3>Процент с активности</h3>
                            <p>Вы получаете процент с активности ваших рефералов на платформе.</p>
                            <p><strong>📌 Чем больше качественного трафика вы приводите — тем выше ваш доход.</strong></p>
                        `
                    }
                ]
            },
            4: {
                title: "Инструкция для TikTok",
                lessons: [
                    {
                        id: 1,
                        type: 'text',
                        title: "Установка VPN",
                        description: "Использование VPN Drazze или стабильного сервиса",
                        content: `
                            <h3>Установка VPN</h3>
                            <p>VPN — это сервис-анонимайзер, который маскирует ваше реальное местоположение.</p>
                            <p>У Drazze есть собственный VPN, доступный партнёрам.</p>
                            <p>Используйте стабильный VPN с серверами в Европе или США.</p>
                            <p><strong>Рекомендуемые страны:</strong></p>
                            <ul>
                                <li>Германия</li>
                                <li>Франция</li>
                                <li>Нидерланды</li>
                                <li>США</li>
                                <li>Канада</li>
                            </ul>
                            <p>⚠️ Важно: VPN может незначительно замедлять интернет — это нормально.</p>
                        `
                    },
                    {
                        id: 2,
                        type: 'text',
                        title: "Очистка кэша TikTok",
                        description: "Как очистить кэш на Android и iPhone",
                        content: `
                            <h3>Очистка кэша TikTok</h3>
                            <p>После подключения VPN необходимо, чтобы TikTok «забыл», что ранее вы находились в РФ.</p>
                            <p><strong>На Android:</strong></p>
                            <p>Настройки → Приложения → TikTok → Хранилище / Память → Очистить кэш и данные (Очистить всё)</p>
                            <p><strong>На iPhone:</strong></p>
                            <p>Удалите приложение TikTok и переустановите его через App Store</p>
                        `
                    },
                    {
                        id: 3,
                        type: 'text',
                        title: "Создание нового аккаунта",
                        description: "Регистрация с новым email или номером",
                        content: `
                            <h3>Создание нового аккаунта</h3>
                            <p>Если старый аккаунт работает нестабильно или не получает просмотры:</p>
                            <ul>
                                <li>Зарегистрируйтесь с новым e-mail, номером телефона или аккаунтом Google</li>
                                <li>Не указывайте РФ в профиле</li>
                                <li>Проверьте страну в настройках профиля — она должна соответствовать стране сервера VPN</li>
                                <li>В аккаунте Google также рекомендуется указать страну, отличную от России</li>
                            </ul>
                        `
                    },
                    {
                        id: 4,
                        type: 'text',
                        title: "Контент-стратегия",
                        description: "Юмор, реакции, тренды, провокационные ролики",
                        content: `
                            <h3>Контент-стратегия</h3>
                            <p>Добавьте реферальную ссылку Drazze в описание профиля.</p>
                            <p>Начинайте публиковать видео.</p>
                            <p><strong>Контент-стратегия:</strong></p>
                            <ul>
                                <li>Юмор</li>
                                <li>Реакции</li>
                                <li>Тренды</li>
                                <li>Провокационные и вовлекающие ролики</li>
                            </ul>
                            <p>Каждое видео должно ненавязчиво подводить зрителя к идее попробовать платформу по вашей ссылке.</p>
                        `
                    }
                ]
            },
            5: {
                title: "Instagram Reels и YouTube Shorts",
                lessons: [
                    {
                        id: 1,
                        type: 'text',
                        title: "Instagram Reels",
                        description: "Работает на платёжеспособную аудиторию",
                        content: `
                            <h3>Instagram Reels</h3>
                            <p>Риторика и стратегия аналогичны TikTok.</p>
                            <p><strong>Что нужно:</strong></p>
                            <ul>
                                <li>Зарегистрировать аккаунт</li>
                                <li>Добавить реферальную ссылку в описание профиля</li>
                                <li>Регулярно публиковать короткие видео</li>
                            </ul>
                            <p>📌 Instagram Reels особенно хорошо работает на платёжеспособную аудиторию.</p>
                        `
                    },
                    {
                        id: 2,
                        type: 'text',
                        title: "YouTube Shorts",
                        description: "Особенно хорошо работает на долгую дистанцию",
                        content: `
                            <h3>YouTube Shorts</h3>
                            <p>Риторика и стратегия аналогичны TikTok.</p>
                            <p><strong>Что нужно:</strong></p>
                            <ul>
                                <li>Зарегистрировать аккаунт</li>
                                <li>Добавить реферальную ссылку в описание профиля</li>
                                <li>Регулярно публиковать короткие видео</li>
                            </ul>
                            <p>📌 YouTube Shorts особенно хорошо работает на долгую дистанцию.</p>
                        `
                    }
                ]
            },
            6: {
                title: "TikTok — инструкции и примеры",
                lessons: [
                    {
                        id: 1,
                        type: 'text',
                        title: "Формат видео",
                        description: "7–20 секунд, первые 2 секунды — хук",
                        content: `
                            <h3>Формат видео для TikTok</h3>
                            <ul>
                                <li><strong>Длина видео:</strong> 7–20 секунд</li>
                                <li><strong>Первые 2 секунды</strong> — максимальный хук</li>
                                <li><strong>Минимум текста</strong>, максимум эмоций</li>
                                <li><strong>Простой и понятный</strong> посыл</li>
                            </ul>
                        `
                    },
                    {
                        id: 2,
                        type: 'text',
                        title: "Примеры форматов",
                        description: '"Проверяю, реально ли это работает" и другие',
                        content: `
                            <h3>Примеры форматов</h3>
                            <ul>
                                <li>"Проверяю, реально ли это работает"</li>
                                <li>"Никто не говорит об этом способе заработка"</li>
                                <li>"Если тебе 18+, посмотри это видео"</li>
                            </ul>
                        `
                    }
                ]
            },
            7: {
                title: "Instagram — инструкции и примеры",
                lessons: [
                    {
                        id: 1,
                        type: 'text',
                        title: "Reels + Stories",
                        description: "Использование обоих форматов",
                        content: `
                            <h3>Используйте Reels + Stories</h3>
                            <p>Комбинируйте оба формата для максимального охвата аудитории.</p>
                            <p>Stories помогают поддерживать активность, а Reels привлекают новую аудиторию.</p>
                        `
                    },
                    {
                        id: 2,
                        type: 'text',
                        title: "Закрепление видео",
                        description: "Закрепляйте лучшие видео в профиле",
                        content: `
                            <h3>Закрепляйте видео в профиле</h3>
                            <p>Выберите лучшие видео и закрепите их в верхней части профиля.</p>
                            <p>Это поможет новым подписчикам сразу увидеть ваш лучший контент.</p>
                        `
                    },
                    {
                        id: 3,
                        type: 'text',
                        title: "Призыв к действию (CTA)",
                        description: "Примеры эффективных CTA",
                        content: `
                            <h3>Призыв к действию (CTA)</h3>
                            <p>Добавляйте призыв к действию в каждом видео.</p>
                            <p><strong>Примеры CTA:</strong></p>
                            <ul>
                                <li>"Ссылка в профиле"</li>
                                <li>"Проверь сам"</li>
                                <li>"Попробуй, пока работает"</li>
                            </ul>
                        `
                    }
                ]
            },
            8: {
                title: "YouTube Shorts — инструкции и примеры",
                lessons: [
                    {
                        id: 1,
                        type: 'text',
                        title: "Заголовок",
                        description: "Должен усиливать интригу",
                        content: `
                            <h3>Заголовок должен усиливать интригу</h3>
                            <p>Заголовок — это первое, что видит зритель.</p>
                            <p>Он должен вызывать любопытство и желание посмотреть видео.</p>
                            <p>Используйте вопросы, провокационные утверждения, обещания выгоды.</p>
                        `
                    },
                    {
                        id: 2,
                        type: 'text',
                        title: "Описание",
                        description: "Короткое, с намёком на выгоду",
                        content: `
                            <h3>Описание — короткое, с намёком на выгоду</h3>
                            <p>Описание должно быть кратким, но информативным.</p>
                            <p>Укажите ключевую выгоду или интригу, но не раскрывайте всё полностью.</p>
                            <p>Добавьте реферальную ссылку в описание.</p>
                        `
                    },
                    {
                        id: 3,
                        type: 'text',
                        title: "Регулярность",
                        description: "Важнее качества",
                        content: `
                            <h3>Регулярность важнее качества</h3>
                            <p>📌 Один удачный Short может приносить трафик месяцами.</p>
                            <p>Но для этого нужно регулярно публиковать контент.</p>
                            <p>Лучше публиковать простые видео регулярно, чем идеальные видео редко.</p>
                        `
                    }
                ]
            },
            9: {
                title: "Советы для роста дохода",
                lessons: [
                    {
                        id: 1,
                        type: 'text',
                        title: "Анализ статистики",
                        description: "Смотрите аналитику и регионы зрителей",
                        content: `
                            <h3>Анализируйте статистику и географию аудитории</h3>
                            <p>Изучайте, какие видео набирают больше просмотров.</p>
                            <p>Смотрите, откуда приходит ваша аудитория.</p>
                            <p>Адаптируйте контент под интересы вашей аудитории.</p>
                        `
                    },
                    {
                        id: 2,
                        type: 'text',
                        title: "Тестирование форматов",
                        description: "Изучайте какой контент лучше заходит",
                        content: `
                            <h3>Тестируйте разные форматы контента</h3>
                            <p>Не останавливайтесь на одном формате.</p>
                            <p>Экспериментируйте с разными типами видео:</p>
                            <ul>
                                <li>Юмор</li>
                                <li>Реакции</li>
                                <li>Образовательный контент</li>
                                <li>Провокационные ролики</li>
                            </ul>
                            <p>Анализируйте, что работает лучше всего.</p>
                        `
                    },
                    {
                        id: 3,
                        type: 'text',
                        title: "Масштабирование",
                        description: "Создавайте несколько аккаунтов",
                        content: `
                            <h3>Масштабируйтесь: создавайте несколько аккаунтов</h3>
                            <p>Не ограничивайтесь одним аккаунтом.</p>
                            <p>Создавайте несколько аккаунтов для разных ниш или платформ.</p>
                            <p>Это увеличит ваш охват и потенциальный доход.</p>
                        `
                    },
                    {
                        id: 4,
                        type: 'text',
                        title: "Перезалив удачных видео",
                        description: "Повторно используйте успешный контент",
                        content: `
                            <h3>Перезаливайте удачные видео</h3>
                            <p>Если видео показало хорошие результаты, не бойтесь перезалить его.</p>
                            <p>Можно немного изменить:</p>
                            <ul>
                                <li>Заголовок</li>
                                <li>Обложку</li>
                                <li>Небольшие детали в видео</li>
                            </ul>
                            <p>Работайте системно, а не хаотично.</p>
                        `
                    }
                ]
            }
        }
    };
    
    // DOM Elements
    const loadingScreen = document.getElementById('loadingScreen');
    const welcomeScreen = document.getElementById('welcomeScreen');
    const appContainer = document.getElementById('appContainer');
    const startBtn = document.getElementById('startBtn');
    const backBtn = document.getElementById('backBtn');
    const currentStageNum = document.getElementById('currentStageNum');
    const progressDots = document.querySelectorAll('.dot');
    
    // Initialize
    initApp();
    
    function initApp() {
        // Start with loading
        simulateLoading();
        
        // Event Listeners
        startBtn.addEventListener('click', startOnboarding);
        backBtn.addEventListener('click', handleBack);
        
        // Progress dots
        progressDots.forEach(dot => {
            dot.addEventListener('click', () => {
                const stage = parseInt(dot.dataset.stage);
                if (stage !== appState.currentStage) {
                    goToStage(stage);
                }
            });
        });
        
        // Next stage buttons
        document.getElementById('nextStage1').addEventListener('click', () => goToStage(2));
        document.getElementById('nextStage2').addEventListener('click', () => goToStage(3));
        document.getElementById('nextStage3').addEventListener('click', () => goToStage(4));
        document.getElementById('nextStage4').addEventListener('click', () => goToStage(5));
        document.getElementById('nextStage5').addEventListener('click', () => goToStage(6));
        document.getElementById('nextStage6').addEventListener('click', () => goToStage(7));
        document.getElementById('nextStage7').addEventListener('click', () => goToStage(8));
        document.getElementById('nextStage8').addEventListener('click', () => goToStage(9));
        document.getElementById('nextStage9').addEventListener('click', showCompletion);
        
        // Lesson cards
        setupLessonCards();
        
        // Objections expandable
        setupObjections();
        
        // Setup audio buttons for objections in the stage screen
        setupAudioButtons();
        
        function setupAudioButtons() {
            // Обработчик для кнопок воспроизведения аудио в под-уроках
            document.addEventListener('click', function(e) {
                if (e.target.closest('.btn-play-audio')) {
                    const button = e.target.closest('.btn-play-audio');
                    const audioSrc = button.dataset.audio;
                    
                    if (!audioSrc) return;
                    
                    // Получаем заголовок из ближайшей карточки
                    const card = button.closest('.sub-lesson-card');
                    let title = "Возражение";
                    if (card) {
                        const titleElement = card.querySelector('h4');
                        if (titleElement) {
                            title = titleElement.textContent;
                        }
                    }
                    
                    e.stopPropagation();
                    
                    // Если это та же кнопка и аудио играет, остановить
                    if (currentAudioButton === button && isAudioPlaying) {
                        stopAllAudio();
                        return;
                    }
                    
                    // Остановить предыдущее аудио
                    stopAllAudio();
                    
                    // Изменить иконку кнопки
                    const icon = button.querySelector('i');
                    if (icon) {
                        icon.className = 'fas fa-pause';
                    }
                    
                    // Запустить новое аудио
                    playAudio(audioSrc, button, null, title);
                }
            });
        }
        // Lesson navigation
        setupLessonNavigation();
        
        // Completion buttons
        document.getElementById('startEarningBtn').addEventListener('click', startEarning);
        document.getElementById('reviewBtn').addEventListener('click', restartOnboarding);
        
        // Handle Telegram back button
        tg.onEvent('backButtonClicked', handleBack);
        
        // Initialize particles
        createParticles();
    }    
    
    function simulateLoading() {
        let progress = 0;
        const progressFill = document.getElementById('progressFill');
        const progressPercent = document.getElementById('progressPercent');
        
        const interval = setInterval(() => {
            progress += Math.random() * 10;
            if (progress > 100) progress = 100;
            
            progressFill.style.width = `${progress}%`;
            progressPercent.textContent = Math.floor(progress);
            
            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    loadingScreen.classList.add('hidden');
                    setTimeout(() => {
                        welcomeScreen.classList.add('active');
                        appState.currentScreen = 'welcome';
                    }, 300);
                }, 500);
            }
        }, 100);
    }
    
    function startOnboarding() {
        welcomeScreen.classList.remove('active');
        setTimeout(() => {
            appContainer.classList.add('active');
            goToStage(1);
            appState.currentScreen = 'stage1-main';
        }, 500);
    }
    
    function goToStage(stage) {
        // Остановить аудио при переходе на новый этап
        stopAllAudio();
        
        appState.currentStage = stage;
        appState.currentLesson = null;
        
        // Update stage number
        currentStageNum.textContent = stage;
        
        // Update progress dots
        progressDots.forEach(dot => {
            const dotStage = parseInt(dot.dataset.stage);
            dot.classList.toggle('active', dotStage === stage);
        });
        
        // Update back button
        updateBackButton();
        
        // Hide all screens
        hideAllScreens();
        
        // Show stage screen
        const stageScreen = document.getElementById(`stage${stage}-main`);
        if (stageScreen) {
            stageScreen.classList.add('active');
            appState.currentScreen = `stage${stage}-main`;
        }
        
        // Reset objections
        const objectionsList = document.getElementById('objectionsList');
        if (objectionsList) {
            objectionsList.classList.remove('active');
        }
    }
    
    function updateBackButton() {
        if (appState.currentScreen.includes('stage') && 
            appState.currentScreen.includes('-main') && 
            appState.currentStage === 1) {
            backBtn.style.visibility = 'hidden';
            tg.BackButton.hide();
        } else {
            backBtn.style.visibility = 'visible';
            tg.BackButton.show();
        }
    }
    
    function hideAllScreens() {
        document.querySelectorAll('.stage-screen, .lesson-detail-screen, .completion-screen').forEach(screen => {
            screen.classList.remove('active');
        });
    }
    
    function setupLessonCards() {
        // Находим все карточки уроков на всех этапах
        document.querySelectorAll('.lesson-card:not(.expandable)').forEach(card => {
            card.addEventListener('click', function(e) {
                if (this.classList.contains('expandable')) {
                    // Если карточка раскрываемая, не открываем урок
                    return;
                }
                const stage = appState.currentStage;
                const lessonId = parseInt(this.dataset.lesson);
                openLesson(stage, lessonId);
            });
            
            // Добавляем обработчик для touch устройств
            card.addEventListener('touchstart', function() {
                this.classList.add('touching');
            }, { passive: true });
            
            card.addEventListener('touchend', function() {
                this.classList.remove('touching');
            }, { passive: true });
        });
    }
    
    function openLesson(stage, lessonId) {
        const lesson = appState.lessonsData[stage].lessons.find(l => l.id === lessonId);
        if (!lesson) return;
        
        // Остановить аудио при открытии нового урока
        stopAllAudio();
        
        appState.currentLesson = lesson;
        
        // Update lesson detail screen
        updateLessonDetail(lesson);
        
        // Hide current screen
        hideAllScreens();
        
        // Show lesson detail
        const lessonDetail = document.getElementById('lessonDetail');
        lessonDetail.classList.add('active');
        appState.currentScreen = 'lessonDetail';
        
        // Update back button
        backBtn.style.visibility = 'visible';
        tg.BackButton.show();
    }
    
    function updateLessonDetail(lesson) {
        // Update lesson info
        document.getElementById('lessonTitle').textContent = lesson.title;
        document.getElementById('lessonDescription').textContent = lesson.description;
        
        // Update lesson type badge
        const badge = document.getElementById('lessonTypeBadge');
        badge.innerHTML = '';
        
        let icon, text, color;
        switch(lesson.type) {
            case 'audio':
                icon = 'fas fa-headphones';
                text = 'АУДИО';
                color = '#10b981';
                break;
            case 'video':
                icon = 'fas fa-play-circle';
                text = 'ВИДЕО';
                color = '#3b82f6';
                break;
            case 'text':
                icon = 'fas fa-file-alt';
                text = 'ТЕКСТ';
                color = '#f59e0b';
                break;
            case 'link':
                icon = 'fas fa-external-link-alt';
                text = 'ССЫЛКА';
                color = '#ef4444';
                break;
            case 'objections':
                icon = 'fas fa-shield-alt';
                text = 'ВОЗРАЖЕНИЯ';
                color = '#f59e0b';
                break;
        }
        
        badge.innerHTML = `<i class="${icon}"></i><span>${text}</span>`;
        badge.style.background = `rgba(${hexToRgb(color)}, 0.2)`;
        badge.style.color = color;
        
        // Show/hide content areas
        document.getElementById('audioPlayerContainer').style.display = lesson.type === 'audio' ? 'block' : 'none';
        document.getElementById('videoPlayerContainer').style.display = lesson.type === 'video' ? 'block' : 'none';
        document.getElementById('textContentContainer').style.display = lesson.type === 'text' ? 'block' : 'none';
        
        // Load content
        if (lesson.type === 'audio') {
            setupAudioPlayer(lesson);
        } else if (lesson.type === 'video') {
            setupVideoPlayer(lesson);
        } else if (lesson.type === 'text') {
            document.querySelector('.text-scroll').innerHTML = lesson.content;
        } else if (lesson.type === 'objections') {
            setupObjectionsContent(lesson);
        } else if (lesson.type === 'link') {
            setupLinkContent(lesson);
        }
        
        // Update navigation info
        const stage = appState.currentStage;
        const totalLessons = appState.lessonsData[stage].lessons.length;
        const currentIndex = appState.lessonsData[stage].lessons.findIndex(l => l.id === lesson.id);
        document.getElementById('navInfo').textContent = `${currentIndex + 1}/${totalLessons}`;
    }
    
    function setupAudioPlayer(lesson) {
        const playPauseBtn = document.getElementById('playPauseBtn');
        const volumeBtn = document.getElementById('volumeBtn');
        const waveBars = document.querySelectorAll('.wave-bar');
        const currentTimeEl = document.querySelector('.current-time');
        const durationEl = document.querySelector('.duration');
        const progressFill = document.querySelector('.audio-progress .progress-fill');
        const audioElement = document.getElementById('audioElement');
        
        // Reset button state
        playPauseBtn.classList.remove('playing');
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        
        // Reset wave animation
        waveBars.forEach(bar => {
            bar.style.animationPlayState = 'paused';
            bar.style.height = '20px';
        });
        
        // Load audio file
        audioElement.src = lesson.content;
        audioElement.load();
        
        // Wait for metadata to load
        audioElement.addEventListener('loadedmetadata', function() {
            const duration = audioElement.duration;
            durationEl.textContent = formatTime(duration);
            currentTimeEl.textContent = '0:00';
        });
        
        // Update progress while playing
        audioElement.addEventListener('timeupdate', function() {
            if (audioElement.duration) {
                const progress = (audioElement.currentTime / audioElement.duration) * 100;
                progressFill.style.width = `${progress}%`;
                currentTimeEl.textContent = formatTime(audioElement.currentTime);
            }
        });
        
        // Handle audio end
        audioElement.addEventListener('ended', function() {
            stopAllAudio();
        });
        
        // Setup play/pause functionality
        playPauseBtn.onclick = function() {
            if (this.classList.contains('playing')) {
                // Pause audio
                pauseCurrentAudio();
            } else {
                // Play audio
                playAudio(lesson.content, null, this, lesson.title);
            }
        };
        
        // Setup volume button
        if (volumeBtn) {
            volumeBtn.onclick = function(e) {
                e.stopPropagation();
                toggleMute();
            };
            updateVolumeButton();
        }
        
        // Reset progress
        if (progressFill) {
            progressFill.style.width = '0%';
        }
        
        currentPlayPauseBtn = playPauseBtn;
    }
    
    function setupVideoPlayer(lesson) {
        const videoPlayer = document.getElementById('videoPlayerContainer');
        
        // Очищаем предыдущий контент
        videoPlayer.innerHTML = '';
        
        if (lesson.isDoubleVideo && lesson.content2) {
            // Создаем контейнер для двух видео
            videoPlayer.innerHTML = `
                <div class="double-video-container">
                    <div class="video-item">
                        <h4 style="color: var(--gray-light); margin-bottom: 10px;">Видео 1</h4>
                        <video class="lesson-video" controls preload="metadata">
                            <source src="${lesson.content}" type="video/mp4">
                            Ваш браузер не поддерживает воспроизведение видео.
                        </video>
                    </div>
                    <div class="video-item">
                        <h4 style="color: var(--gray-light); margin-bottom: 10px;">Видео 2</h4>
                        <video class="lesson-video" controls preload="metadata">
                            <source src="${lesson.content2}" type="video/mp4">
                            Ваш браузер не поддерживает воспроизведение видео.
                        </video>
                    </div>
                </div>
            `;
        } else {
            // Обычное одно видео
            videoPlayer.innerHTML = `
                <video id="lessonVideo" controls preload="metadata" style="width: 100%; height: auto; border-radius: 16px; background: #000;">
                    <source src="${lesson.content}" type="video/mp4">
                    Ваш браузер не поддерживает воспроизведение видео.
                </video>
            `;
        }
        
        // Добавляем обработчики для всех видео
        videoPlayer.querySelectorAll('video').forEach(videoElement => {
            // Ждем загрузки метаданных
            videoElement.addEventListener('loadedmetadata', function() {
                const duration = videoElement.duration;
                if (duration && isFinite(duration)) {
                    console.log(`Длительность видео: ${formatTime(duration)}`);
                }
            });
            
            // Обработка ошибок
            videoElement.addEventListener('error', function(e) {
                console.error('Ошибка загрузки видео:', e);
                const parent = videoElement.parentElement;
                if (parent && parent.classList.contains('video-item')) {
                    parent.innerHTML = `
                        <div class="video-error">
                            <i class="fas fa-exclamation-triangle"></i>
                            <p>Ошибка загрузки видео</p>
                        </div>
                    `;
                } else {
                    // Для обычного видео без контейнера video-item
                    videoPlayer.innerHTML = `
                        <div class="video-error">
                            <i class="fas fa-exclamation-triangle"></i>
                            <p>Ошибка загрузки видео</p>
                        </div>
                    `;
                }
            });
            
            // Обработка начала загрузки
            videoElement.addEventListener('loadstart', function() {
                console.log('Начало загрузки видео:', lesson.title);
            });
            
            // Обработка возможности воспроизведения
            videoElement.addEventListener('canplay', function() {
                console.log('Видео готово к воспроизведению:', lesson.title);
            });
            
            // Загружаем видео
            videoElement.load();
        });
    }
    
    function setupLinkContent(lesson) {
        const textContentContainer = document.getElementById('textContentContainer');
        textContentContainer.innerHTML = `
            <div class="text-scroll">
                <div class="link-content">
                    <h3>${lesson.title}</h3>
                    <p>${lesson.description}</p>
                    <p style="color: var(--gray); margin: 1rem 0; font-size: 0.9rem;">
                        <i class="fas fa-external-link-alt"></i> Внешняя ссылка на YouTube
                    </p>
                    <p style="color: var(--gray-light); margin-bottom: 1.5rem;">
                        Для просмотра этого контента вам нужно перейти по внешней ссылке
                    </p>
                    <button class="btn-external-link" id="externalLinkBtn">
                        <i class="fas fa-external-link-alt"></i>
                        <span>Открыть ссылку</span>
                    </button>
                    <p style="color: var(--gray); margin-top: 1rem; font-size: 0.8rem;">
                        <i class="fas fa-info-circle"></i> Ссылка откроется в новой вкладке
                    </p>
                </div>
            </div>
        `;
        textContentContainer.style.display = 'block';
        
        // Add event listener for external link button
        const externalLinkBtn = document.getElementById('externalLinkBtn');
        if (externalLinkBtn) {
            externalLinkBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                if (lesson.external) {
                    window.open(lesson.content, '_blank');
                    if (tg && tg.showAlert) {
                        tg.showAlert('Ссылка открывается в новой вкладке');
                    }
                }
            });
        }
    }
    
    function setupObjectionsContent(lesson) {
        const objectionsContainer = document.getElementById('textContentContainer');
        let contentHTML = `
            <div class="text-scroll">
                <h3>${lesson.title}</h3>
                <p>${lesson.description}</p>
                <div class="objections-list" style="margin-top: 20px;">
        `;
        
        if (lesson.objections && lesson.objections.length > 0) {
            lesson.objections.forEach(obj => {
                contentHTML += `
                    <div class="objection-item" style="margin-bottom: 15px; padding: 15px; background: rgba(30, 41, 59, 0.3); border-radius: 10px;">
                        <h4 style="margin-bottom: 10px; color: var(--light);">${obj.id}. ${obj.title}</h4>
                        <div style="display: flex; align-items: center; justify-content: space-between;">
                            <span class="objection-duration" style="color: var(--gray); font-size: 0.9em;">--:--</span>
                            <button class="objection-play-btn" 
                                    style="background: rgba(124, 58, 237, 0.2); border: none; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--primary); cursor: pointer;"
                                    data-audio="${obj.audio}"
                                    data-title="${obj.title}">
                                <i class="fas fa-play"></i>
                            </button>
                        </div>
                    </div>
                `;
            });
        }
        
        contentHTML += `
                </div>
            </div>
        `;
        
        objectionsContainer.innerHTML = contentHTML;
        objectionsContainer.style.display = 'block';
        
        // Setup audio buttons for objections
        document.querySelectorAll('.objection-play-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const audioSrc = this.dataset.audio;
                const title = this.dataset.title;
                const icon = this.querySelector('i');
                
                // Если это та же кнопка и аудио играет, остановить
                if (currentAudioButton === this && isAudioPlaying) {
                    stopAllAudio();
                    return;
                }
                
                // Остановить предыдущее аудио
                stopAllAudio();
                
                // Загрузить метаданные для определения длительности
                const tempAudio = new Audio(audioSrc);
                tempAudio.addEventListener('loadedmetadata', function() {
                    const duration = tempAudio.duration;
                    const durationSpan = btn.closest('.objection-item').querySelector('.objection-duration');
                    if (durationSpan) {
                        durationSpan.textContent = formatTime(duration);
                    }
                });
                tempAudio.load();
                
                // Изменить иконку кнопки
                icon.className = 'fas fa-pause';
                this.style.background = 'rgba(255, 0, 110, 0.2)';
                this.style.color = 'var(--secondary-light)';
                
                // Запустить новое аудио
                playAudio(audioSrc, this, null, title);
            });
        });
    }
    
    function playAudio(audioSrc, button, playPauseBtn, title) {
        // Остановить текущее аудио
        stopAllAudio();
        
        const audioElement = document.getElementById('audioElement');
        
        // Если это другой файл, загрузить его
        if (audioElement.src !== audioSrc && !audioElement.src.endsWith(audioSrc)) {
            audioElement.src = audioSrc;
            audioElement.load();
        }
        
        // Обновить состояние кнопки
        if (button) {
            if (button.classList.contains('objection-play-btn') || button.classList.contains('btn-play-audio')) {
                const icon = button.querySelector('i');
                if (icon) {
                    icon.className = 'fas fa-pause';
                }
                button.style.background = 'rgba(255, 0, 110, 0.2)';
                button.style.color = 'var(--secondary-light)';
            } else {
                button.classList.add('playing');
                button.innerHTML = '<i class="fas fa-pause"></i>';
            }
            currentAudioButton = button;
        }
        
        // Обновить состояние основной кнопки play/pause
        if (playPauseBtn) {
            playPauseBtn.classList.add('playing');
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            currentPlayPauseBtn = playPauseBtn;
        }
        
        // Воспроизвести аудио
        audioElement.play().then(() => {
            isAudioPlaying = true;
            currentAudio = audioElement;
            
            // Анимация волн
            const waveBars = document.querySelectorAll('.wave-bar');
            waveBars.forEach(bar => {
                bar.style.animationPlayState = 'running';
            });
        }).catch(error => {
            console.error('Error playing audio:', error);
            // Сбросить кнопки при ошибке
            stopAllAudio();
        });
    }    
    
    function pauseCurrentAudio() {
        if (currentAudio) {
            currentAudio.pause();
            isAudioPlaying = false;
            
            if (currentPlayPauseBtn) {
                currentPlayPauseBtn.classList.remove('playing');
                currentPlayPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            }
            
            if (currentAudioButton) {
                currentAudioButton.classList.remove('playing');
                currentAudioButton.innerHTML = '<i class="fas fa-play"></i>';
            }
            
            // Остановить анимацию волн
            const waveBars = document.querySelectorAll('.wave-bar');
            waveBars.forEach(bar => {
                bar.style.animationPlayState = 'paused';
            });
        }
    }
    
    function stopAllAudio() {
        const audioElement = document.getElementById('audioElement');
        if (audioElement) {
            audioElement.pause();
            audioElement.currentTime = 0;
        }
        
        if (currentAudio) {
            isAudioPlaying = false;
            currentAudio = null;
        }
        
        // Сбросить все кнопки воспроизведения
        if (currentPlayPauseBtn) {
            currentPlayPauseBtn.classList.remove('playing');
            currentPlayPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
        
        if (currentAudioButton) {
            // Проверить, является ли это кнопкой objection
            if (currentAudioButton.classList.contains('objection-play-btn')) {
                const icon = currentAudioButton.querySelector('i');
                if (icon) {
                    icon.className = 'fas fa-play';
                }
                currentAudioButton.style.background = 'rgba(124, 58, 237, 0.2)';
                currentAudioButton.style.color = 'var(--primary)';
            } else {
                currentAudioButton.classList.remove('playing');
                currentAudioButton.innerHTML = '<i class="fas fa-play"></i>';
            }
        }
        
        // Сбросить все кнопки воспроизведения в интерфейсе objections
        document.querySelectorAll('.objection-play-btn').forEach(btn => {
            const icon = btn.querySelector('i');
            if (icon) {
                icon.className = 'fas fa-play';
            }
            btn.style.background = 'rgba(124, 58, 237, 0.2)';
            btn.style.color = 'var(--primary)';
        });
        
        // Остановить анимацию волн
        const waveBars = document.querySelectorAll('.wave-bar');
        waveBars.forEach(bar => {
            bar.style.animationPlayState = 'paused';
            bar.style.height = '20px';
        });
        
        currentAudioButton = null;
        currentPlayPauseBtn = null;
    }
    
    function toggleMute() {
        isMuted = !isMuted;
        
        const audioElement = document.getElementById('audioElement');
        if (audioElement) {
            audioElement.volume = isMuted ? 0 : volumeLevel;
        }
        
        if (currentAudio) {
            currentAudio.volume = isMuted ? 0 : volumeLevel;
        }
        
        updateVolumeButton();
    }
    
    function updateVolumeButton() {
        const volumeBtn = document.getElementById('volumeBtn');
        if (!volumeBtn) return;
        
        const icon = volumeBtn.querySelector('i');
        if (!icon) return;
        
        if (isMuted) {
            icon.className = 'fas fa-volume-mute';
            volumeBtn.style.color = '#ef4444';
        } else if (volumeLevel < 0.5) {
            icon.className = 'fas fa-volume-down';
            volumeBtn.style.color = '#f59e0b';
        } else {
            icon.className = 'fas fa-volume-up';
            volumeBtn.style.color = '#10b981';
        }
    }
    
    function setupObjections() {
        const objectionsCard = document.querySelector('.lesson-card.expandable');
        const objectionsList = document.getElementById('objectionsList');
        
        if (objectionsCard && objectionsList) {
            objectionsCard.addEventListener('click', function(e) {
                if (this.classList.contains('expandable')) {
                    e.stopPropagation();
                    this.classList.toggle('expanded');
                    objectionsList.classList.toggle('active');
                    
                    const icon = this.querySelector('.lesson-action i');
                    if (icon) {
                        icon.className = this.classList.contains('expanded') ? 'fas fa-chevron-up' : 'fas fa-chevron-down';
                    }
                }
            });
        }
    }
    
    function setupLessonNavigation() {
        const backLessonBtn = document.querySelector('.btn-back-lesson');
        const prevLessonBtn = document.querySelector('.prev-lesson');
        const nextLessonBtn = document.querySelector('.next-lesson');
        
        if (backLessonBtn) {
            backLessonBtn.addEventListener('click', () => {
                // Остановить аудио при возврате к списку уроков
                stopAllAudio();
                goToStage(appState.currentStage);
            });
        }
        
        if (prevLessonBtn) {
            prevLessonBtn.addEventListener('click', () => {
                // Остановить аудио при переходе к предыдущему уроку
                stopAllAudio();
                goToPrevLesson();
            });
        }
        
        if (nextLessonBtn) {
            nextLessonBtn.addEventListener('click', () => {
                // Остановить аудио при переходе к следующему уроку
                stopAllAudio();
                goToNextLesson();
            });
        }
    }
    
    function goToPrevLesson() {
        if (!appState.currentLesson) return;
        
        const stage = appState.currentStage;
        const lessons = appState.lessonsData[stage].lessons;
        const currentIndex = lessons.findIndex(l => l.id === appState.currentLesson.id);
        
        if (currentIndex > 0) {
            openLesson(stage, lessons[currentIndex - 1].id);
        }
    }
    
    function goToNextLesson() {
        if (!appState.currentLesson) return;
        
        const stage = appState.currentStage;
        const lessons = appState.lessonsData[stage].lessons;
        const currentIndex = lessons.findIndex(l => l.id === appState.currentLesson.id);
        
        if (currentIndex < lessons.length - 1) {
            openLesson(stage, lessons[currentIndex + 1].id);
        }
    }
    
    function showCompletion() {
        // Остановить аудио при завершении обучения
        stopAllAudio();
        
        hideAllScreens();
        document.getElementById('completionScreen').classList.add('active');
        appState.currentScreen = 'completion';
        backBtn.style.visibility = 'hidden';
        tg.BackButton.hide();
    }
    
    function startEarning() {
        // Открыть группу DRAZZE GAME
        const channelUrl = 'https://t.me/+QpPQ6Ybtd502Nzli';
        window.open(channelUrl, '_blank');
        
        tg.sendData(JSON.stringify({
            action: 'start_earning',
            stage: 'completed',
            timestamp: new Date().toISOString()
        }));
    }
    
    function restartOnboarding() {
        // Остановить аудио при перезапуске обучения
        stopAllAudio();
        goToStage(1);
        tg.showAlert('Обучение начато заново! Удачи!');
    }
    function stopAllAudio() {
        const audioElement = document.getElementById('audioElement');
        if (audioElement) {
            audioElement.pause();
            audioElement.currentTime = 0;
        }
        
        if (currentAudio) {
            isAudioPlaying = false;
            currentAudio = null;
        }
        
        // Сбросить все кнопки воспроизведения
        if (currentPlayPauseBtn) {
            currentPlayPauseBtn.classList.remove('playing');
            currentPlayPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
        
        // Сбросить все кнопки .btn-play-audio и .objection-play-btn
        document.querySelectorAll('.btn-play-audio, .objection-play-btn').forEach(btn => {
            const icon = btn.querySelector('i');
            if (icon) {
                icon.className = 'fas fa-play';
            }
            btn.style.background = 'rgba(124, 58, 237, 0.2)';
            btn.style.color = 'var(--primary)';
            
            // Убрать класс playing если есть
            btn.classList.remove('playing');
        });
        
        if (currentAudioButton) {
            // Проверить, является ли это кнопкой objection
            if (currentAudioButton.classList.contains('objection-play-btn') || currentAudioButton.classList.contains('btn-play-audio')) {
                const icon = currentAudioButton.querySelector('i');
                if (icon) {
                    icon.className = 'fas fa-play';
                }
                currentAudioButton.style.background = 'rgba(124, 58, 237, 0.2)';
                currentAudioButton.style.color = 'var(--primary)';
            } else {
                currentAudioButton.classList.remove('playing');
                currentAudioButton.innerHTML = '<i class="fas fa-play"></i>';
            }
        }
        
        // Остановить анимацию волн
        const waveBars = document.querySelectorAll('.wave-bar');
        waveBars.forEach(bar => {
            bar.style.animationPlayState = 'paused';
            bar.style.height = '20px';
        });
        
        currentAudioButton = null;
        currentPlayPauseBtn = null;
    }
    
    function handleBack() {
        // Остановить аудио при нажатии кнопки "Назад"
        stopAllAudio();
        
        if (appState.currentScreen === 'lessonDetail') {
            goToStage(appState.currentStage);
        } else if (appState.currentScreen.includes('stage') && appState.currentStage > 1) {
            goToStage(appState.currentStage - 1);
        } else if (appState.currentScreen === 'completion') {
            goToStage(9);
        }
    }
    
    function formatTime(seconds) {
        if (isNaN(seconds) || !isFinite(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
    
    function hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? 
            `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : 
            '124, 58, 237';
    }
    
    function createParticles() {
        const container = document.querySelector('.particles-container');
        if (!container) return;
        
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 3 + 1}px;
                height: ${Math.random() * 3 + 1}px;
                background: rgba(124, 58, 237, ${Math.random() * 0.5 + 0.1});
                border-radius: 50%;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                animation: float ${Math.random() * 20 + 10}s linear infinite;
                animation-delay: ${Math.random() * 5}s;
            `;
            container.appendChild(particle);
        }
        
        // Add CSS for animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float {
                0% {
                    transform: translateY(100vh) translateX(0);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    function showCompletionScreen() {
        // Скрыть все остальные экраны
        document.querySelectorAll('.stage-screen, .lesson-detail-screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        // Показать окно завершения
        const completionScreen = document.getElementById('completionScreen');
        completionScreen.classList.add('active');
        
        // Прокрутить вверх окно завершения
        completionScreen.scrollTop = 0;
        
        // Обновить заголовок Telegram Web App
        if (window.Telegram?.WebApp) {
            const tg = window.Telegram.WebApp;
            tg.setHeaderColor('#080810');
            tg.setBackgroundColor('#080810');
            tg.MainButton.hide();
        }
    }
    
    // Обработка изменения темы Telegram
    if (tg && tg.onEvent) {
        tg.onEvent('themeChanged', function() {
            const themeParams = tg.themeParams;
            if (themeParams) {
                document.documentElement.style.setProperty('--tg-theme-bg-color', themeParams.bg_color || '#080810');
                document.documentElement.style.setProperty('--tg-theme-text-color', themeParams.text_color || '#ffffff');
                document.documentElement.style.setProperty('--tg-theme-hint-color', themeParams.hint_color || '#8b8ba0');
                document.documentElement.style.setProperty('--tg-theme-link-color', themeParams.link_color || '#ff006e');
                document.documentElement.style.setProperty('--tg-theme-button-color', themeParams.button_color || '#ff006e');
                document.documentElement.style.setProperty('--tg-theme-button-text-color', themeParams.button_text_color || '#ffffff');
            }
        });
        
        // Обработка изменения viewport
        tg.onEvent('viewportChanged', function() {
            // Обновить высоту элементов при изменении viewport
            const viewportHeight = tg.viewportHeight;
            if (viewportHeight) {
                document.documentElement.style.setProperty('--tg-viewport-height', viewportHeight + 'px');
            }
        });
    }
    
    // Initialize Telegram
    if (tg && tg.ready) {
        tg.ready();
    }
});


