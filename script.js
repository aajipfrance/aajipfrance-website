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

// Navigation smooth scroll - seulement pour les liens internes
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animation de la navbar au scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
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
    const animatedElements = document.querySelectorAll('.mission-card, .value-card, .action-item, .principle-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Initialisation EmailJS
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
        if (!data.name || !data.email || !data.subject || !data.message) {
            showNotification('Veuillez remplir tous les champs obligatoires.', 'error');
            return;
        }
        
        // Préparation des paramètres pour EmailJS
        const templateParams = {
            to_email: EMAILJS_CONFIG.TO_EMAIL,
            from_name: data.name,
            from_email: data.email,
            from_phone: data.phone || 'Non renseigné',
            subject: data.subject,
            message: data.message
        };
        
        // Envoi via EmailJS
        emailjs.send(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID, templateParams)
            .then(function(response) {
                showNotification('Message envoyé avec succès à aajipfrance@gmail.com !', 'success');
                contactForm.reset();
            }, function(error) {
                showNotification('Erreur lors de l\'envoi du message. Veuillez réessayer.', 'error');
            });
    });
}

// Gestion du formulaire de donation
const donationForm = document.querySelector('.donation-form-content');
if (donationForm) {
    // Gestion des boutons de montant
    const amountButtons = document.querySelectorAll('.amount-btn');
    const customAmountDiv = document.querySelector('.custom-amount');
    const customAmountInput = document.getElementById('customAmount');
    
    amountButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Retirer la classe active de tous les boutons
            amountButtons.forEach(btn => btn.classList.remove('active'));
            
            // Ajouter la classe active au bouton cliqué
            this.classList.add('active');
            
            // Gérer l'affichage du champ montant personnalisé
            if (this.dataset.amount === 'custom') {
                customAmountDiv.style.display = 'block';
                customAmountInput.focus();
            } else {
                customAmountDiv.style.display = 'none';
                customAmountInput.value = '';
            }
        });
    });
    
    // Gestion de la soumission du formulaire de donation
    donationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Récupération des données du formulaire
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Validation basique
        if (!data.donorName || !data.donorEmail) {
            showNotification('Veuillez remplir tous les champs obligatoires.', 'error');
            return;
        }
        
        // Vérifier qu'un montant est sélectionné
        const activeButton = document.querySelector('.amount-btn.active');
        const customAmount = customAmountInput.value;
        
        if (!activeButton && !customAmount) {
            showNotification('Veuillez sélectionner un montant.', 'error');
            return;
        }
        
        // Simulation d'envoi (remplacer par votre logique de paiement)
        showNotification('Merci pour votre don ! Vous recevrez un email de confirmation.', 'success');
        this.reset();
        
        // Réinitialiser les boutons
        amountButtons.forEach(btn => btn.classList.remove('active'));
        customAmountDiv.style.display = 'none';
    });
}

// Système de notification
function showNotification(message, type = 'info') {
    // Supprimer les notifications existantes
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Créer la notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Styles pour la notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    // Ajouter les styles pour l'animation
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
    
    // Ajouter au DOM
    document.body.appendChild(notification);
    
    // Gestion de la fermeture
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto-fermeture après 5 secondes
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Animation des compteurs (si nécessaire)
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 secondes
        const increment = target / (duration / 16); // 60 FPS
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Lazy loading des images
function lazyLoadImages() {
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
}

// Amélioration de l'accessibilité
function enhanceAccessibility() {
    // Ajouter des attributs ARIA
    const buttons = document.querySelectorAll('button, .btn');
    buttons.forEach(button => {
        if (!button.getAttribute('aria-label')) {
            const text = button.textContent.trim();
            if (text) {
                button.setAttribute('aria-label', text);
            }
        }
    });
    
    // Gestion du focus pour la navigation mobile
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                link.click();
            }
        });
    });
}

// Chargement dynamique des articles du blog sur la page d'accueil
async function loadHomepageBlogArticles() {
    const blogGrid = document.getElementById('homepageBlogGrid');
    if (!blogGrid) return;
    
    const showError = (msg) => {
        blogGrid.innerHTML = `
            <div class="blog-empty">
                <i class="fas fa-newspaper"></i>
                <p>${msg}</p>
                <a href="blog.html" class="btn btn-outline" style="margin-top: 1rem;">Voir le blog</a>
            </div>
        `;
    };
    
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000);
        
        const response = await fetch('articles.json', { signal: controller.signal });
        clearTimeout(timeoutId);
        
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        const articles = data.articles || [];
        console.log(`📚 ${articles.length} articles trouvés`);
        
        // Prendre les 3 articles les plus récents
        const recentArticles = articles
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 3);
        
        console.log(`📰 ${recentArticles.length} articles récents sélectionnés:`, recentArticles.map(a => a.title));
        
        if (recentArticles.length === 0) {
            console.log('⚠️ Aucun article récent trouvé');
            blogGrid.innerHTML = `
                <div class="blog-empty">
                    <i class="fas fa-newspaper"></i>
                    <p>Nouvel article disponible bientôt</p>
                </div>
            `;
            return;
        }
        
        // Générer le HTML des articles
        const articlesHTML = recentArticles.map(article => {
            const formattedDate = formatDate(article.date);
            return `
                <article class="blog-card">
                    <div class="blog-icon">
                        <i class="${article.icon}"></i>
                        <div class="blog-category">${article.category}</div>
                    </div>
                    <div class="blog-content">
                        <div class="blog-meta">
                            <span class="blog-date"><i class="fas fa-calendar"></i> ${formattedDate}</span>
                            <span class="blog-author"><i class="fas fa-user"></i> ${article.author}</span>
                        </div>
                        <h3>${article.title}</h3>
                        <p>${article.excerpt}</p>
                        <a href="article.html?id=${article.id}" class="blog-link">Lire la suite <i class="fas fa-arrow-right"></i></a>
                    </div>
                </article>
            `;
        }).join('');
        
        console.log('🎨 Génération du HTML des articles...');
        blogGrid.innerHTML = articlesHTML;
        console.log('✅ Articles affichés sur la page d\'accueil');
        
        // Ajouter les animations pour les nouvelles cartes
        const newCards = blogGrid.querySelectorAll('.blog-card');
        console.log(`🎭 Animation de ${newCards.length} cartes d'articles`);
        newCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 200);
        });
        
    } catch (error) {
        showError('Les articles n\'ont pas pu être chargés. Consultez le blog pour voir nos actualités.');
    }
}

// Formatage de la date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 DOM chargé - script.js s\'exécute !');
    
    // Initialiser les fonctionnalités
    lazyLoadImages();
    enhanceAccessibility();
    
    // Charger les articles du blog sur la page d'accueil
    console.log('🚀 Initialisation du chargement des articles...');
    
    // Délai pour s'assurer que le DOM est complètement chargé
    setTimeout(() => {
        console.log('⏰ Délai écoulé - appel de loadHomepageBlogArticles()');
        loadHomepageBlogArticles();
    }, 100);
    
    // Ajouter des effets de hover améliorés
    const cards = document.querySelectorAll('.mission-card, .value-card, .principle-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Effet de parallaxe simple pour le hero
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
});

// Gestion des erreurs de chargement d'images
document.addEventListener('error', (e) => {
    if (e.target.tagName === 'IMG') {
        e.target.style.display = 'none';
        console.warn('Image failed to load:', e.target.src);
    }
}, true);

// Amélioration des performances
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimisation du scroll
const optimizedScrollHandler = debounce(() => {
    // Code optimisé pour le scroll
}, 16);

window.addEventListener('scroll', optimizedScrollHandler);

// Support du mode sombre (optionnel)
function initDarkMode() {
    const darkModeToggle = document.createElement('button');
    darkModeToggle.innerHTML = '🌙';
    darkModeToggle.className = 'dark-mode-toggle';
    darkModeToggle.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: none;
        background: #2c5aa0;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        transition: all 0.3s ease;
    `;
    
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        darkModeToggle.innerHTML = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
    });
    
    document.body.appendChild(darkModeToggle);
}

// Initialiser le mode sombre si demandé
// initDarkMode();

 