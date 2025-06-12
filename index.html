document.addEventListener('DOMContentLoaded', function() {
    
    // --- INITIALIZATION ---
    // This function runs when the page is fully loaded and ready.
    function init() {
        initCountdown();
        initMusicControls();
        initBlessingForm();
        initCalendarIntegration();
        initSmoothScroll();
        // initMobileMenu(); // If you add a mobile menu toggle
    }

    // --- COUNTDOWN TIMER ---
    function initCountdown() {
        const countdownElement = document.getElementById('countdown');
        if (!countdownElement) return;

        const weddingDate = new Date('2026-06-05T11:45:00').getTime();

        const updateCountdown = () => {
            const now = new Date().getTime();
            const distance = weddingDate - now;

            if (distance < 0) {
                countdownElement.innerHTML = '<div class="countdown-item" style="grid-column: 1 / -1;">היום הגדול הגיע!</div>';
                clearInterval(interval);
                return;
            }

            document.getElementById('days').innerText = Math.floor(distance / (1000 * 60 * 60 * 24));
            document.getElementById('hours').innerText = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            document.getElementById('minutes').innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            document.getElementById('seconds').innerText = Math.floor((distance % (1000 * 60)) / 1000);
        };

        const interval = setInterval(updateCountdown, 1000);
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

    // --- BLESSING FORM AND DISPLAY ---
    function initBlessingForm() {
        const form = document.getElementById('blessing-form');
        const displayContainer = document.getElementById('blessings-display');
        const list = document.getElementById('blessings-list');
        const BLESSINGS_KEY = 'weddingBlessings';

        if (!form || !list) return;

        // Load existing blessings from localStorage
        const savedBlessings = JSON.parse(localStorage.getItem(BLESSINGS_KEY)) || [];

        function renderBlessings() {
            if (savedBlessings.length > 0) {
                displayContainer.style.display = 'block';
                list.innerHTML = '';
                savedBlessings.forEach(b => {
                    const item = document.createElement('div');
                    item.className = 'blessing-item';
                    item.innerHTML = `<p class="blessing-author">${escapeHTML(b.name)}</p><p class="blessing-text">${escapeHTML(b.text)}</p>`;
                    list.appendChild(item);
                });
            }
        }

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const nameInput = document.getElementById('blessing-name');
            const textInput = document.getElementById('blessing-text');

            const newBlessing = {
                name: nameInput.value,
                text: textInput.value
            };

            savedBlessings.push(newBlessing);
            localStorage.setItem(BLESSINGS_KEY, JSON.stringify(savedBlessings));
            
            renderBlessings();
            
            // Clear form and show a success message
            form.reset();
            alert('הברכה נשלחה בהצלחה, תודה רבה!');
        });
        
        renderBlessings();
    }

    // --- GOOGLE CALENDAR INTEGRATION ---
    function initCalendarIntegration() {
        const calendarBtn = document.getElementById('google-calendar-btn');
        if (!calendarBtn) return;

        calendarBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const eventDetails = {
                title: 'החתונה של [שם הכלה] ו[שם החתן]',
                location: 'Kahi resort, השיטה 5, עמק חפר',
                description: 'נשמח לחגוג איתכם את היום המיוחד שלנו!',
                startTime: '20260605T114500', // YYYYMMDDTHHMMSS
                endTime: '20260605T170000' // Adjust end time as needed
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
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
    }
    
    // --- UTILITY FUNCTION ---
    function escapeHTML(str) {
        return str.replace(/[&<>"']/g, function(match) {
            return {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#39;'
            }[match];
        });
    }

    // Run the main initialization function
    init();
});
