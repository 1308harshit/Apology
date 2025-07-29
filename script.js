// Smooth scrolling function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: 'smooth' });
}

// Floating hearts animation
function createFloatingHeart() {
    const heartsContainer = document.getElementById('heartsContainer');
    const heart = document.createElement('i');
    heart.className = 'fas fa-heart floating-heart';
    
    // Random position and size
    heart.style.left = Math.random() * 100 + '%';
    heart.style.fontSize = (Math.random() * 10 + 15) + 'px';
    heart.style.animationDuration = (Math.random() * 3 + 3) + 's';
    heart.style.opacity = Math.random() * 0.5 + 0.3;
    
    heartsContainer.appendChild(heart);
    
    // Remove heart after animation
    setTimeout(() => {
        if (heart.parentNode) {
            heart.parentNode.removeChild(heart);
        }
    }, 6000);
}

// Create floating hearts periodically
setInterval(createFloatingHeart, 800);

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add scroll animation classes to elements
document.addEventListener('DOMContentLoaded', () => {
    // Add animation classes to elements
    const fadeElements = document.querySelectorAll('.section-header, .apology-card, .memory-card, .final-cta');
    fadeElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
    
    const slideLeftElements = document.querySelectorAll('.promise-item:nth-child(odd)');
    slideLeftElements.forEach(el => {
        el.classList.add('slide-in-left');
        observer.observe(el);
    });
    
    const slideRightElements = document.querySelectorAll('.promise-item:nth-child(even)');
    slideRightElements.forEach(el => {
        el.classList.add('slide-in-right');
        observer.observe(el);
    });
});

// Typing animation for the message
const heartfeltMessage = `My dearest love,

I know I've made mistakes, and I know words alone can't undo the hurt I've caused. But I need you to know that you are the most important person in my world, and losing you would be losing everything that matters to me.

I need you to share me everything, small big, top bottom, nothing should be left, BE CLINGY, BE TOUCHY, i will handle all your NAKHRAS❤️🥺, because i want too, please give me this opportunity🥺, I Love you❤️

Every day without you feels incomplete and empty and give no meaning to my life. You bring light to my darkest moments, joy to my ordinary days, and love to my heart in ways I never thought possible.

I'm not asking you to forget what happened, but I'm hoping you can find it in your heart to forgive me and give us another chance. I promise to be better, to love you the way you deserve to be loved and fullfill your every wish and expectation.

You are my heart, my home, my peace, my everything.

Forever yours ❤️`;

let messageIndex = 0;
let isTyping = false;

function typeMessage() {
    if (isTyping) return;
    
    isTyping = true;
    const typingAnimation = document.getElementById('typingAnimation');
    const typedMessage = document.getElementById('typedMessage');
    const startBtn = document.getElementById('startMessageBtn');
    
    // Hide button and show typing animation
    startBtn.style.display = 'none';
    typingAnimation.style.display = 'flex';
    
    // Wait a bit, then start typing
    setTimeout(() => {
        typingAnimation.style.display = 'none';
        typedMessage.style.display = 'block';
        typedMessage.innerHTML = '';
        
        function typeCharacter() {
            if (messageIndex < heartfeltMessage.length) {
                const char = heartfeltMessage[messageIndex];
                if (char === '\n') {
                    typedMessage.innerHTML += '<br>';
                } else {
                    typedMessage.innerHTML += char;
                }
                messageIndex++;
                
                // Vary typing speed for more natural feel
                const speed = char === '.' || char === '!' || char === '?' ? 300 : 
                             char === ',' ? 150 : 
                             char === ' ' ? 50 : 30;
                
                setTimeout(typeCharacter, speed);
            } else {
                // Add a blinking cursor effect at the end
                typedMessage.innerHTML += '<span style="animation: blink 1s infinite;">|</span>';
            }
        }
        
        typeCharacter();
    }, 2000);
}

// Add CSS for blinking cursor
const style = document.createElement('style');
style.textContent = `
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
`;
document.head.appendChild(style);

// Event listener for start message button
document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('startMessageBtn');
    if (startBtn) {
        startBtn.addEventListener('click', typeMessage);
    }
});

// Memory card interactions
document.addEventListener('DOMContentLoaded', () => {
    const memoryCards = document.querySelectorAll('.memory-card');
    
    memoryCards.forEach(card => {
        card.addEventListener('click', () => {
            // Add a special animation when clicked
            card.style.transform = 'scale(1.05)';
            card.style.boxShadow = '0 25px 50px rgba(255, 107, 107, 0.3)';
            
            setTimeout(() => {
                card.style.transform = '';
                card.style.boxShadow = '';
            }, 300);
            
            // Create hearts around the clicked card
            for (let i = 0; i < 5; i++) {
                setTimeout(() => createHeartBurst(card), i * 100);
            }
        });
    });
});

function createHeartBurst(element) {
    const rect = element.getBoundingClientRect();
    const heart = document.createElement('i');
    heart.className = 'fas fa-heart';
    heart.style.position = 'fixed';
    heart.style.left = (rect.left + rect.width / 2) + 'px';
    heart.style.top = (rect.top + rect.height / 2) + 'px';
    heart.style.color = '#ff6b6b';
    heart.style.fontSize = '20px';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '9999';
    heart.style.animation = 'heartBurst 1s ease-out forwards';
    
    document.body.appendChild(heart);
    
    // Remove heart after animation
    setTimeout(() => {
        if (heart.parentNode) {
            heart.parentNode.removeChild(heart);
        }
    }, 1000);
}

// Add CSS for heart burst animation
const heartBurstStyle = document.createElement('style');
heartBurstStyle.textContent = `
    @keyframes heartBurst {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        50% {
            transform: scale(1.2) rotate(180deg);
            opacity: 0.8;
        }
        100% {
            transform: scale(0) rotate(360deg) translateY(-50px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(heartBurstStyle);

// Modal functionality
function showResponse(response) {
    const modal = document.getElementById('responseModal');
    const modalBody = document.getElementById('modalBody');
    
    let content = '';
    
    if (response === 'yes') {
        content = `
            <div class="modal-hearts">
                <i class="fas fa-heart"></i>
                <i class="fas fa-heart"></i>
                <i class="fas fa-heart"></i>
            </div>
            <h3>Thank You! ❤️</h3>
            <p>You've just made me the happiest person in the world! I promise this is a new beginning for us.</p>
            <p>I'll text you right now. Thank you for giving us another chance.</p>
            <p style="font-style: italic; color: #ff6b6b; margin-top: 20px;">
                "The best relationships are the ones where you can be yourself and still be loved for who you are."
            </p>
        `;
    } else if (response === 'maybe') {
        content = `
            <div class="modal-hearts">
                <i class="fas fa-clock" style="color: #f39c12;"></i>
            </div>
            <h3>I Understand ⏰</h3>
            <p>I respect that you need time, and I'll give you all the space you need.</p>
            <p>I'll be here when you're ready, and I'll keep working on becoming the person you deserve.</p>
            <p style="font-style: italic; color: #f39c12; margin-top: 20px;">
                "Good things come to those who wait, and you're worth waiting for."
            </p>
        `;
    }
    
    modalBody.innerHTML = content;
    modal.style.display = 'block';
    
    // Add celebration effect for 'yes' response
    if (response === 'yes') {
        celebrateResponse();
    }
}

function closeModal() {
    const modal = document.getElementById('responseModal');
    modal.style.display = 'none';
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    const modal = document.getElementById('responseModal');
    if (e.target === modal) {
        closeModal();
    }
});

// Celebration effect
function celebrateResponse() {
    // Create multiple hearts falling from the top
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            createCelebrationHeart();
        }, i * 100);
    }
    
    // Add confetti effect
    createConfetti();
}

function createCelebrationHeart() {
    const heart = document.createElement('i');
    heart.className = 'fas fa-heart';
    heart.style.position = 'fixed';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.top = '-50px';
    heart.style.color = `hsl(${Math.random() * 60 + 320}, 70%, 60%)`;
    heart.style.fontSize = (Math.random() * 15 + 20) + 'px';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '9999';
    heart.style.animation = 'celebrationFall 3s ease-in forwards';
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        if (heart.parentNode) {
            heart.parentNode.removeChild(heart);
        }
    }, 3000);
}

function createConfetti() {
    const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-10px';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '9999';
            confetti.style.animation = 'confettiFall 3s ease-in forwards';
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }, 3000);
        }, i * 50);
    }
}

// Add CSS for celebration animations
const celebrationStyle = document.createElement('style');
celebrationStyle.textContent = `
    @keyframes celebrationFall {
        0% {
            transform: translateY(-50px) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes confettiFall {
        0% {
            transform: translateY(-10px) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(celebrationStyle);

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Add active nav link highlighting
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    function highlightActiveLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.style.color = '#333';
            link.style.background = 'transparent';
            if (link.getAttribute('href') === '#' + current) {
                link.style.color = '#ff6b6b';
                link.style.background = 'rgba(255, 107, 107, 0.1)';
            }
        });
    }
    
    window.addEventListener('scroll', highlightActiveLink);
    highlightActiveLink(); // Run once on load
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-bg');
    if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Add hover effect to promise items
document.addEventListener('DOMContentLoaded', () => {
    const promiseItems = document.querySelectorAll('.promise-item');
    
    promiseItems.forEach((item, index) => {
        item.addEventListener('mouseenter', () => {
            // Add glow effect
            item.style.boxShadow = '0 20px 60px rgba(255, 107, 107, 0.3)';
            item.style.background = 'rgba(255, 255, 255, 0.95)';
            
            // Animate promise number
            const number = item.querySelector('.promise-number');
            number.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.boxShadow = '';
            item.style.background = '';
            
            const number = item.querySelector('.promise-number');
            number.style.transform = '';
        });
    });
});

// Add loading animation
window.addEventListener('load', () => {
    // Create and show a beautiful loading screen
    const loader = document.createElement('div');
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        transition: opacity 0.5s ease;
    `;
    
    loader.innerHTML = `
        <div style="text-align: center; color: white;">
            <div style="font-size: 3rem; margin-bottom: 1rem; animation: heartbeat 1s infinite;">❤️</div>
            <div style="font-size: 1.5rem; font-weight: 300;">Loading your apology...</div>
        </div>
    `;
    
    document.body.appendChild(loader);
    
    // Hide loader after a short delay
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            if (loader.parentNode) {
                loader.parentNode.removeChild(loader);
            }
        }, 500);
    }, 1500);
});

// Add smooth reveal animation for sections
function revealOnScroll() {
    const reveals = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    
    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const elementTop = reveal.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            reveal.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);

// Add special effects for holidays/special occasions
function addSpecialEffects() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    
    // Valentine's Day (February 14)
    if (month === 2 && day === 14) {
        document.body.style.background = 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)';
        
        // Add extra hearts
        setInterval(() => {
            createFloatingHeart();
            createFloatingHeart();
        }, 400);
    }
    
    // Christmas (December 25)
    if (month === 12 && day === 25) {
        // Add snowflakes instead of hearts occasionally
        setInterval(() => {
            if (Math.random() > 0.7) {
                createSnowflake();
            }
        }, 600);
    }
}

function createSnowflake() {
    const heartsContainer = document.getElementById('heartsContainer');
    const snowflake = document.createElement('div');
    snowflake.innerHTML = '❄️';
    snowflake.style.position = 'absolute';
    snowflake.style.left = Math.random() * 100 + '%';
    snowflake.style.fontSize = (Math.random() * 10 + 15) + 'px';
    snowflake.style.opacity = Math.random() * 0.5 + 0.3;
    snowflake.style.animation = 'floatUp 8s infinite linear';
    snowflake.style.pointerEvents = 'none';
    
    heartsContainer.appendChild(snowflake);
    
    setTimeout(() => {
        if (snowflake.parentNode) {
            snowflake.parentNode.removeChild(snowflake);
        }
    }, 8000);
}

// Initialize special effects
document.addEventListener('DOMContentLoaded', addSpecialEffects);

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
    
    // Allow Enter to trigger the message typing
    if (e.key === 'Enter' && !isTyping) {
        const startBtn = document.getElementById('startMessageBtn');
        if (startBtn && startBtn.style.display !== 'none') {
            typeMessage();
        }
    }
});

// Add touch gestures for mobile
let touchStartY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
});

document.addEventListener('touchend', (e) => {
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY - touchEndY;
    
    // Swipe up gesture - go to next section
    if (diff > 50) {
        const currentSection = getCurrentSection();
        const nextSection = getNextSection(currentSection);
        if (nextSection) {
            scrollToSection(nextSection);
        }
    }
});

function getCurrentSection() {
    const sections = ['hero', 'apology', 'memories', 'promises', 'message'];
    const scrollPosition = window.pageYOffset + 200;
    
    for (let section of sections) {
        const element = document.getElementById(section);
        if (element && scrollPosition >= element.offsetTop && scrollPosition < element.offsetTop + element.offsetHeight) {
            return section;
        }
    }
    return 'hero';
}

function getNextSection(currentSection) {
    const sections = ['hero', 'apology', 'memories', 'promises', 'message'];
    const currentIndex = sections.indexOf(currentSection);
    return currentIndex < sections.length - 1 ? sections[currentIndex + 1] : null;
}