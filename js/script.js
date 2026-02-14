// Navigation mobile avec accessibilité améliorée
document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;

    if (hamburger && navMenu) {
        // Toggle menu mobile
        hamburger.addEventListener('click', function () {
            const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';

            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            body.classList.toggle('menu-open');

            // Mise à jour ARIA
            hamburger.setAttribute('aria-expanded', !isExpanded);
            navMenu.setAttribute('id', 'nav-menu');
        });

        // Fermer le menu mobile lors du clic sur un lien
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                body.classList.remove('menu-open');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });

        // Fermer le menu avec la touche Escape
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                body.classList.remove('menu-open');
                hamburger.setAttribute('aria-expanded', 'false');
                hamburger.focus();
            }
        });

        // Fermer le menu en cliquant en dehors
        document.addEventListener('click', function (e) {
            if (navMenu.classList.contains('active') &&
                !navMenu.contains(e.target) &&
                !hamburger.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                body.classList.remove('menu-open');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
    }
});

// Smooth scrolling pour les liens d'ancrage
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Animation au scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observer les éléments à animer
document.querySelectorAll('.category-card, .service-card, .secteur-card, .testimonial-card, .faq-item, .animate-on-scroll').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Intersection Observer for scroll animations on new pages
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Observe all elements with animate-on-scroll class
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        scrollObserver.observe(el);
    });
});

// Gestion du formulaire de devis
const devisForm = document.querySelector('.devis-form');
if (devisForm) {
    devisForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Validation basique
        const requiredFields = devisForm.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = '#e74c3c';
            } else {
                field.style.borderColor = '#ddd';
            }
        });

        if (isValid) {
            // Simulation d'envoi
            const submitBtn = devisForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;

            submitBtn.textContent = 'Envoi en cours...';
            submitBtn.disabled = true;

            setTimeout(() => {
                alert('Votre demande de devis a été envoyée avec succès ! Nous vous contacterons sous 24h.');
                devisForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        } else {
            alert('Veuillez remplir tous les champs obligatoires.');
        }
    });
}

// Effet parallax léger supprimé pour éviter les problèmes de défilement

// Highlight du menu actif lors du scroll
window.addEventListener('scroll', function () {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    // Only run this logic if we're on a page with sections (like index.html)
    if (sections.length > 0) {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            // Only modify active state if we found a current section
            if (current) {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            }
        });
    }
    // If no sections, preserve the active class set in HTML (for standalone pages)
});

// Animation des compteurs (si on ajoute des statistiques)
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;

        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    });
}

// Validation email en temps réel
const emailInputs = document.querySelectorAll('input[type="email"]');
emailInputs.forEach(input => {
    input.addEventListener('blur', function () {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (this.value && !emailRegex.test(this.value)) {
            this.style.borderColor = '#e74c3c';
            this.setCustomValidity('Veuillez entrer une adresse email valide');
        } else {
            this.style.borderColor = '#ddd';
            this.setCustomValidity('');
        }
    });
});

// Validation téléphone en temps réel
const phoneInputs = document.querySelectorAll('input[type="tel"]');
phoneInputs.forEach(input => {
    input.addEventListener('input', function () {
        // Permettre seulement les chiffres, espaces, tirets et parenthèses
        this.value = this.value.replace(/[^0-9\s\-\(\)\+]/g, '');
    });

    input.addEventListener('blur', function () {
        const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
        if (this.value && !phoneRegex.test(this.value.replace(/\s/g, ''))) {
            this.style.borderColor = '#e74c3c';
            this.setCustomValidity('Veuillez entrer un numéro de téléphone valide');
        } else {
            this.style.borderColor = '#ddd';
            this.setCustomValidity('');
        }
    });
});

// Effet de typing pour le titre principal (optionnel)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Lazy loading des images (si on ajoute de vraies images)
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// Gestion des cookies (RGPD)
function showCookieConsent() {
    const cookieConsent = document.createElement('div');
    cookieConsent.className = 'cookie-consent';
    cookieConsent.innerHTML = `
        <div class="cookie-content">
            <p>Ce site utilise des cookies pour améliorer votre expérience. En continuant à naviguer, vous acceptez notre utilisation des cookies.</p>
            <div class="cookie-buttons">
                <button class="btn-primary" onclick="acceptCookies()">Accepter</button>
                <button class="btn-secondary" onclick="declineCookies()">Refuser</button>
            </div>
        </div>
    `;

    if (!localStorage.getItem('cookieConsent')) {
        document.body.appendChild(cookieConsent);
    }
}

function acceptCookies() {
    localStorage.setItem('cookieConsent', 'accepted');
    document.querySelector('.cookie-consent').remove();
}

function declineCookies() {
    localStorage.setItem('cookieConsent', 'declined');
    document.querySelector('.cookie-consent').remove();
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function () {
    // Afficher le consentement des cookies après 2 secondes
    setTimeout(showCookieConsent, 2000);

    // Animer les compteurs si ils sont visibles
    const countersSection = document.querySelector('.counters');
    if (countersSection) {
        const countersObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    countersObserver.unobserve(entry.target);
                }
            });
        });
        countersObserver.observe(countersSection);
    }
});

// Gestion du mode sombre (optionnel)
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Restaurer le mode sombre si activé
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// Gestion de l'accordéon FAQ
document.addEventListener('DOMContentLoaded', function () {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', function () {
            const isActive = item.classList.contains('active');

            // Fermer tous les autres items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle l'item actuel
            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });
    });
});

// Initialisation Swiper Hero Slider
document.addEventListener('DOMContentLoaded', function () {
    if (document.querySelector('.hero.swiper')) {
        const heroSwiper = new Swiper('.hero.swiper', {
            loop: true,
            speed: 1000,
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            autoplay: {
                delay: 6000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        });
    }
});

// Gestion de l'interactivité de la liste (Range List)
document.addEventListener('DOMContentLoaded', function () {
    const rangeItems = document.querySelectorAll('.range-item');

    rangeItems.forEach(item => {
        const header = item.querySelector('.range-item-header') || item;
        const description = item.querySelector('.range-item-description');
        
        header.addEventListener('click', function () {
            // Toggle la classe active sur l'item parent
            item.classList.toggle('active');

            // Récupérer l'icône à l'intérieur
            const icon = item.querySelector('i');
            if (icon) {
                if (icon.classList.contains('fa-plus')) {
                    icon.classList.remove('fa-plus');
                    icon.classList.add('fa-minus');
                } else {
                    icon.classList.remove('fa-minus');
                    icon.classList.add('fa-plus');
                }
            }
            
            // Gérer l'affichage de la description si elle existe
            if (description) {
                if (item.classList.contains('active')) {
                    description.style.maxHeight = description.scrollHeight + 'px';
                    description.style.opacity = '1';
                } else {
                    description.style.maxHeight = '0';
                    description.style.opacity = '0';
                }
            }
        });
    });
});


// ========================================
// ANIMATIONS PROFESSIONNELLES POUR PAGES INTERNES
// ========================================

// Animation au scroll pour les éléments avec classe animate-on-scroll
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                // Optionnel: arrêter d'observer après l'animation
                animationObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    });
    
    animatedElements.forEach(el => {
        animationObserver.observe(el);
    });
});

// Animation des cartes au survol avec effet 3D
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.column-card, .commitment-card, .benefit-card, .value-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
});

// Animation des numéros dans les commitment cards
document.addEventListener('DOMContentLoaded', function() {
    const commitmentNumbers = document.querySelectorAll('.commitment-number');
    
    const numberObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const number = entry.target;
                const targetValue = parseInt(number.textContent);
                let currentValue = 0;
                const increment = targetValue / 30;
                
                const updateNumber = () => {
                    if (currentValue < targetValue) {
                        currentValue += increment;
                        number.textContent = Math.ceil(currentValue).toString().padStart(2, '0');
                        requestAnimationFrame(updateNumber);
                    } else {
                        number.textContent = targetValue.toString().padStart(2, '0');
                    }
                };
                
                updateNumber();
                numberObserver.unobserve(number);
            }
        });
    }, { threshold: 0.5 });
    
    commitmentNumbers.forEach(num => numberObserver.observe(num));
});

// Effet de parallaxe léger sur les sections
document.addEventListener('DOMContentLoaded', function() {
    const parallaxSections = document.querySelectorAll('.page-hero, .cta-section');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        parallaxSections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const speed = 0.5;
                const yPos = -(scrolled * speed);
                section.style.backgroundPosition = `center ${yPos}px`;
            }
        });
    });
});

// Animation des icônes au survol
document.addEventListener('DOMContentLoaded', function() {
    const icons = document.querySelectorAll('.card-icon, .commitment-icon, .value-icon, .benefit-icon, .mechanism-icon');
    
    icons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.animation = 'iconBounce 0.6s ease';
        });
        
        icon.addEventListener('animationend', function() {
            this.style.animation = '';
        });
    });
});

// Ajout de l'animation CSS pour les icônes
const style = document.createElement('style');
style.textContent = `
    @keyframes iconBounce {
        0%, 100% { transform: scale(1) rotate(0deg); }
        25% { transform: scale(1.1) rotate(-10deg); }
        50% { transform: scale(1.15) rotate(10deg); }
        75% { transform: scale(1.1) rotate(-5deg); }
    }
`;
document.head.appendChild(style);

// Effet de typing pour les titres principaux
function typewriterEffect(element, text, speed = 80) {
    if (!element) return;
    
    let i = 0;
    const originalText = text;
    element.textContent = '';
    element.style.opacity = '1';
    
    function type() {
        if (i < originalText.length) {
            element.textContent += originalText.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Appliquer l'effet typing aux titres hero (optionnel)
document.addEventListener('DOMContentLoaded', function() {
    const heroTitle = document.querySelector('.page-hero-title');
    if (heroTitle && heroTitle.dataset.typing === 'true') {
        const text = heroTitle.textContent;
        typewriterEffect(heroTitle, text);
    }
});

// Animation de compteur pour les statistiques
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Observer pour les compteurs
document.addEventListener('DOMContentLoaded', function() {
    const counters = document.querySelectorAll('[data-counter]');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.counter);
                animateCounter(counter, target);
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => counterObserver.observe(counter));
});

// Effet de révélation progressive pour les listes
document.addEventListener('DOMContentLoaded', function() {
    const lists = document.querySelectorAll('.service-list, .solution-list, .why-us-list');
    
    lists.forEach(list => {
        const items = list.querySelectorAll('li');
        
        const listObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateX(0)';
                        }, index * 100);
                    });
                    listObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        items.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            item.style.transition = 'all 0.5s ease';
        });
        
        listObserver.observe(list);
    });
});

// Animation de la ligne sous les titres
document.addEventListener('DOMContentLoaded', function() {
    const titles = document.querySelectorAll('.section-title-gold, .section-title-white, .section-title-dark');
    
    const titleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'titleReveal 0.8s ease-out forwards';
                titleObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    titles.forEach(title => titleObserver.observe(title));
});

// Ajout des animations CSS supplémentaires
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    @keyframes titleReveal {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes fadeInScale {
        from {
            opacity: 0;
            transform: scale(0.9);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
    
    @keyframes slideInFromLeft {
        from {
            opacity: 0;
            transform: translateX(-50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideInFromRight {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(additionalStyles);

// Gestion du smooth scroll amélioré
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Effet de brillance sur les boutons CTA
document.addEventListener('DOMContentLoaded', function() {
    const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
    
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function(e) {
            const shine = document.createElement('span');
            shine.className = 'button-shine';
            shine.style.cssText = `
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
                transition: left 0.5s ease;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(shine);
            
            setTimeout(() => {
                shine.style.left = '100%';
            }, 10);
            
            setTimeout(() => {
                shine.remove();
            }, 600);
        });
    });
});

// Animation des images au chargement
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.content-image img, .team-image');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInScale 0.8s ease-out forwards';
                imageObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    images.forEach(img => {
        img.style.opacity = '0';
        imageObserver.observe(img);
    });
});

// Gestion du header sticky avec effet
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
            header.style.background = 'rgba(0,0,0,0.95)';
        } else {
            header.style.boxShadow = '0 4px 15px rgba(0,0,0,0.08)';
            header.style.background = '#000000';
        }
        
        lastScroll = currentScroll;
    });
});

// Animation des frames autour des images
document.addEventListener('DOMContentLoaded', function() {
    const frames = document.querySelectorAll('.image-frame');
    
    const frameObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'frameExpand 1s ease-out forwards';
                frameObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    frames.forEach(frame => frameObserver.observe(frame));
});

const frameStyles = document.createElement('style');
frameStyles.textContent = `
    @keyframes frameExpand {
        from {
            opacity: 0;
            transform: scale(0.8);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
`;
document.head.appendChild(frameStyles);

// Console log pour confirmer le chargement des animations
console.log('✨ Animations professionnelles chargées avec succès!');


// ========================================
// BOUTON RETOUR EN HAUT DE PAGE
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    if (scrollToTopBtn) {
        // Afficher/masquer le bouton selon la position de scroll
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });
        
        // Retour en haut au clic
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
