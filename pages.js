// Navigation mobile
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Fonction pour fermer la bande défilante des dons (temporairement)
function closeDonationBanner() {
    const banner = document.querySelector('.donation-banner');
    const navbar = document.querySelector('.navbar');
    const hero = document.querySelector('.hero');
    const navMenu = document.querySelector('.nav-menu');
    
    if (banner) {
        banner.classList.add('hidden');
        // Ajouter les classes pour ajuster la navigation et le hero
        if (navbar) {
            navbar.classList.add('no-donation-banner');
        }
        if (hero) {
            hero.classList.add('no-donation-banner');
        }
        if (navMenu) {
            navMenu.classList.add('no-donation-banner');
        }
        // Sauvegarder dans localStorage pour 24h seulement
        const expiryTime = Date.now() + (24 * 60 * 60 * 1000); // 24 heures
        localStorage.setItem('donationBannerClosed', expiryTime.toString());
        
        // Réafficher après 24h
        setTimeout(() => {
            banner.classList.remove('hidden');
            if (navbar) {
                navbar.classList.remove('no-donation-banner');
            }
            if (hero) {
                hero.classList.remove('no-donation-banner');
            }
            if (navMenu) {
                navMenu.classList.remove('no-donation-banner');
            }
            localStorage.removeItem('donationBannerClosed');
        }, 24 * 60 * 60 * 1000);
    }
}

// Vérifier si la bande défilante doit être affichée
document.addEventListener('DOMContentLoaded', () => {
    const banner = document.querySelector('.donation-banner');
    const navbar = document.querySelector('.navbar');
    const hero = document.querySelector('.hero');
    const navMenu = document.querySelector('.nav-menu');
    
    if (banner) {
        const closedTime = localStorage.getItem('donationBannerClosed');
        if (closedTime) {
            const expiryTime = parseInt(closedTime);
            if (Date.now() < expiryTime) {
                // La bannière est encore fermée
                banner.style.display = 'none';
                if (navbar) {
                    navbar.classList.add('no-donation-banner');
                }
                if (hero) {
                    hero.classList.add('no-donation-banner');
                }
                if (navMenu) {
                    navMenu.classList.add('no-donation-banner');
                }
            } else {
                // Le temps est écoulé, réafficher la bannière
                banner.style.display = 'block';
                banner.classList.remove('hidden');
                if (navbar) {
                    navbar.classList.remove('no-donation-banner');
                }
                if (hero) {
                    hero.classList.remove('no-donation-banner');
                }
                if (navMenu) {
                    navMenu.classList.remove('no-donation-banner');
                }
                localStorage.removeItem('donationBannerClosed');
            }
        }
    }
});

// Fermer le menu mobile en cliquant sur un lien
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    if (hamburger && navMenu) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
}));

// Animation de la navbar au scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    }
});

// Animation des éléments au scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observer les éléments à animer
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.mission-item, .value-card, .action-item, .principle-card, .impact-item, .contact-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Initialisation EmailJS pour les pages avec formulaire de contact
if (typeof emailjs !== 'undefined' && typeof EMAILJS_CONFIG !== 'undefined') {
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
    
    // Gestion du formulaire de contact
    const contactForm = document.querySelector('.form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupération des données du formulaire
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Validation basique
            if (!data.name || !data.email || !data.message) {
                showNotification('Veuillez remplir tous les champs obligatoires.', 'error');
                return;
            }
            
            // Envoi du message via EmailJS
            emailjs.send(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID, {
                to_email: EMAILJS_CONFIG.TO_EMAIL,
                from_name: data.name,
                from_email: data.email,
                from_phone: data.phone || 'Non renseigné',
                subject: data.subject || 'Demande de contact',
                message: data.message
            })
            .then(function(response) {
                showNotification('Votre message a été envoyé avec succès !', 'success');
                contactForm.reset();
            })
            .catch(function(error) {
                showNotification('Erreur lors de l\'envoi du message. Veuillez réessayer.', 'error');
                console.error('EmailJS error:', error);
            });
        });
    }
}

// Fonction pour afficher les notifications
function showNotification(message, type = 'info') {
    // Créer l'élément de notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Styles pour la notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Ajouter au DOM
    document.body.appendChild(notification);
    
    // Supprimer automatiquement après 5 secondes
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Animation pour les notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
`;
document.head.appendChild(style);
