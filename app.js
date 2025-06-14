document.addEventListener('DOMContentLoaded', function() {
    // --- INITIALIZATION ---
    function init() {
        initCountdown();
        initMusicControls();
        initCalendarIntegration();
        initSmoothScroll();
        initSparkles();
    }

    // --- COUNTDOWN TIMER ---
    function initCountdown() {
        const weddingDate = new Date('2026-06-05T11:45:00').getTime();

        function updateCountdown() {
            const now = new Date().getTime();
            const distance = weddingDate - now;

            if (distance < 0) {
                document.getElementById('days').innerText = 0;
                document.getElementById('hours').innerText = 0;
                document.getElementById('minutes').innerText = 0;
                document.getElementById('seconds').innerText = 0;
                return;
            }

            document.getElementById('days').innerText = Math.floor(distance / (1000 * 60 * 60 * 24));
            document.getElementById('hours').innerText = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            document.getElementById('minutes').innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            document.getElementById('seconds').innerText = Math.floor((distance % (1000 * 60)) / 1000);
        }

        setInterval(updateCountdown, 1000);
        updateCountdown();
    }

    // --- BACKGROUND MUSIC CONTROLS ---
    function initMusicControls() {
        const music = document.getElementById('background-music');
        const musicBtn = document.getElementById('music-btn');
        const musicIcon = document.getElementById('music-icon');
        if (!music || !musicBtn) return;
        let isPlaying = false;

        musicBtn.addEventListener('click', () => {
            if (isPlaying) {
                music.pause();
                musicBtn.classList.remove('playing');
                musicBtn.innerHTML = '<span id="music-icon">🎵</span> השמע מוזיקה';
            } else {
                music.play();
                musicBtn.classList.add('playing');
                musicBtn.innerHTML = '<span id="music-icon">⏸️</span> השהה מוזיקה';
            }
            isPlaying = !isPlaying;
        });
    }

    // --- GOOGLE CALENDAR INTEGRATION ---
    function initCalendarIntegration() {
        const calendarBtn = document.getElementById('google-calendar-btn');
        if (!calendarBtn) return;

        calendarBtn.addEventListener('click', function(e) {
            e.preventDefault();

            const eventDetails = {
                title: 'החתונה של מורן ואור',
                location: 'Kahi resort, השיטה 5, עמק חפר',
                description: 'נשמח לחגוג איתכם את היום המיוחד שלנו!',
                startTime: '20260605T114500', // YYYYMMDDTHHMMSS
                endTime: '20260605T170000'
            };

            const calendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventDetails.title)}&dates=${eventDetails.startTime}/${eventDetails.endTime}&details=${encodeURIComponent(eventDetails.description)}&location=${encodeURIComponent(eventDetails.location)}`;
            window.open(calendarUrl, '_blank');
        });
    }

    // --- SMOOTH SCROLL FOR NAVIGATION ---
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }

    // --- SPARKLES ANIMATION ---
    function initSparkles() {
        function createSparkle() {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.left = Math.random() * 100 + 'vw';
            sparkle.style.top = Math.random() * 100 + 'vh';
            sparkle.style.animationDuration = (1 + Math.random() * 2) + 's';
            document.querySelector('.sparkle-background').appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 3000);
        }
        setInterval(createSparkle, 500);
    }

    // Run the main initialization function
    init();
});
