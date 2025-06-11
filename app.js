// Wedding Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initCountdown();
    initSlideshow();
    initMusicControls();
    initNavigation();
    initBlessingForm();
    initCalendarIntegration();
});

// Countdown Timer
function initCountdown() {
    const weddingDate = new Date('2026-06-05T19:00:00').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;
        
        if (distance < 0) {
            document.getElementById('countdown').innerHTML = '<div class="countdown-item"><span class="countdown-number">🎉</span><span class="countdown-label">החתונה התרחשה!</span></div>';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours;
        document.getElementById('minutes').textContent = minutes;
        document.getElementById('seconds').textContent = seconds;
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Background Slideshow
function initSlideshow() {
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    
    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }
    
    // Change slide every 5 seconds
    setInterval(nextSlide, 5000);
}

// Music Controls
function initMusicControls() {
    const musicToggle = document.getElementById('musicToggle');
    const backgroundMusic = document.getElementById('backgroundMusic');
    let isPlaying = false;
    
    // Create a simple tone for background music
    createBackgroundMusic();
    
    musicToggle.addEventListener('click', function() {
        if (isPlaying) {
            backgroundMusic.pause();
            musicToggle.classList.remove('playing');
            musicToggle.querySelector('.music-text').textContent = 'מוזיקת רקע';
            musicToggle.querySelector('.music-icon').textContent = '🎵';
        } else {
            backgroundMusic.play().catch(e => {
                console.log('Auto-play prevented:', e);
            });
            musicToggle.classList.add('playing');
            musicToggle.querySelector('.music-text').textContent = 'השתק מוזיקה';
            musicToggle.querySelector('.music-icon').textContent = '🔇';
        }
        isPlaying = !isPlaying;
    });
    
    backgroundMusic.addEventListener('ended', function() {
        backgroundMusic.currentTime = 0;
        backgroundMusic.play();
    });
}

// Create simple background music using Web Audio API
function createBackgroundMusic() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const gainNode = audioContext.createGain();
        gainNode.gain.value = 0.1; // Low volume
        gainNode.connect(audioContext.destination);
        
        // Create a simple pleasant melody
        const frequencies = [523.25, 587.33, 659.25, 698.46, 783.99, 880.00]; // C5 to A5
        let noteIndex = 0;
        
        function playNote() {
            const oscillator = audioContext.createOscillator();
            const noteGain = audioContext.createGain();
            
            oscillator.frequency.setValueAtTime(frequencies[noteIndex], audioContext.currentTime);
            oscillator.type = 'sine';
            
            noteGain.gain.setValueAtTime(0, audioContext.currentTime);
            noteGain.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.1);
            noteGain.gain.linearRampToValueAtTime(0, audioContext.currentTime + 1);
            
            oscillator.connect(noteGain);
            noteGain.connect(gainNode);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 1);
            
            noteIndex = (noteIndex + 1) % frequencies.length;
        }
        
        // Play a note every 2 seconds when music is enabled
        setInterval(() => {
            const musicToggle = document.getElementById('musicToggle');
            if (musicToggle.classList.contains('playing')) {
                playNote();
            }
        }, 2000);
        
    } catch (e) {
        console.log('Web Audio API not supported');
    }
}

// Navigation
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    // Smooth scrolling
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            
            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Close mobile menu
            navMenu.classList.remove('active');
        });
    });
    
    // Mobile menu toggle
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
    
    // Update active link on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Blessing Form
function initBlessingForm() {
    const blessingForm = document.getElementById('blessingForm');
    const blessingsContainer = document.getElementById('blessingsContainer');
    
    blessingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const senderName = document.getElementById('senderName').value.trim();
        const blessingText = document.getElementById('blessingText').value.trim();
        
        if (senderName && blessingText) {
            addBlessing(senderName, blessingText);
            blessingForm.reset();
            
            // Show success message
            showMessage('הברכה נשלחה בהצלחה! תודה רבה', 'success');
        }
    });
    
    function addBlessing(author, text) {
        const blessingElement = document.createElement('div');
        blessingElement.className = 'blessing-item';
        blessingElement.innerHTML = `
            <div class="blessing-author">${escapeHtml(author)}</div>
            <div class="blessing-text">${escapeHtml(text)}</div>
        `;
        
        // Add to beginning of list
        blessingsContainer.insertBefore(blessingElement, blessingsContainer.firstChild);
        
        // Add fade-in animation
        blessingElement.style.opacity = '0';
        blessingElement.style.transform = 'translateY(20px)';
        setTimeout(() => {
            blessingElement.style.transition = 'all 0.5s ease';
            blessingElement.style.opacity = '1';
            blessingElement.style.transform = 'translateY(0)';
        }, 100);
    }
    
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    function showMessage(text, type) {
        const message = document.createElement('div');
        message.className = `message message--${type}`;
        message.textContent = text;
        message.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#daa520' : '#dc3545'};
            color: white;
            padding: 1rem 2rem;
            border-radius: 10px;
            z-index: 1001;
            animation: slideIn 0.5s ease;
        `;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.style.animation = 'slideOut 0.5s ease forwards';
            setTimeout(() => {
                document.body.removeChild(message);
            }, 500);
        }, 3000);
    }
}

// Calendar Integration
function initCalendarIntegration() {
    const addToCalendarBtn = document.getElementById('addToCalendar');
    
    addToCalendarBtn.addEventListener('click', function() {
        const eventDetails = {
            title: 'חתונת יוסי ומירי',
            startDate: '20260605T190000',
            endDate: '20260606T020000',
            location: 'אולמי רויאל, רחוב הרצל 15, תל אביב',
            description: 'חתונת יוסי ומירי - אירוע מיוחד!'
        };
        
        const googleCalendarUrl = createGoogleCalendarUrl(eventDetails);
        window.open(googleCalendarUrl, '_blank');
    });
    
    function createGoogleCalendarUrl(event) {
        const baseUrl = 'https://calendar.google.com/calendar/render?action=TEMPLATE';
        const params = new URLSearchParams({
            text: event.title,
            dates: `${event.startDate}/${event.endDate}`,
            location: event.location,
            details: event.description
        });
        
        return `${baseUrl}&${params.toString()}`;
    }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            top: 70px;
            left: 0;
            right: 0;
            background: white;
            flex-direction: column;
            padding: 2rem;
            box-shadow: 0 4px 16px rgba(0,0,0,0.1);
            transform: translateY(-100%);
            opacity: 0;
            transition: all 0.3s ease;
            pointer-events: none;
        }
        
        .nav-menu.active {
            transform: translateY(0);
            opacity: 1;
            pointer-events: all;
        }
        
        .nav-menu li {
            margin: 1rem 0;
        }
        
        .menu-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .menu-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .menu-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    }
`;
document.head.appendChild(style);

// Add some wedding-themed interactions
document.addEventListener('DOMContentLoaded', function() {
    // Add sparkle effect on hero section
    createSparkles();
    
    // Add gentle float animation to cards
    const cards = document.querySelectorAll('.detail-card, .blessing-item');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('float-animation');
    });
});

function createSparkles() {
    const hero = document.querySelector('.hero');
    const sparkleCount = 20;
    
    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: #daa520;
            border-radius: 50%;
            animation: sparkle ${3 + Math.random() * 2}s infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: 0;
        `;
        hero.appendChild(sparkle);
    }
}

// Add sparkle animation
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkle {
        0%, 100% { opacity: 0; transform: scale(0); }
        50% { opacity: 1; transform: scale(1); }
    }
    
    @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
    }
    
    .float-animation {
        animation: float 6s ease-in-out infinite;
    }
`;
document.head.appendChild(sparkleStyle);