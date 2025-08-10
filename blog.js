// Configuration du blog
const BLOG_CONFIG = {
    articlesPerPage: 6,
    defaultSort: 'date-desc'
};

// Fonction pour fermer la bande défilante des dons (temporairement)
function closeDonationBanner() {
    const banner = document.querySelector('.donation-banner');
    if (banner) {
        banner.classList.add('hidden');
        // Sauvegarder dans localStorage pour 24h seulement
        const expiryTime = Date.now() + (24 * 60 * 60 * 1000); // 24 heures
        localStorage.setItem('donationBannerClosed', expiryTime.toString());
        
        // Réafficher après 24h
        setTimeout(() => {
            banner.classList.remove('hidden');
            localStorage.removeItem('donationBannerClosed');
        }, 24 * 60 * 60 * 1000);
    }
}

// Vérifier si la bande défilante doit être affichée
document.addEventListener('DOMContentLoaded', () => {
    const banner = document.querySelector('.donation-banner');
    if (banner) {
        const closedTime = localStorage.getItem('donationBannerClosed');
        if (closedTime) {
            const expiryTime = parseInt(closedTime);
            if (Date.now() < expiryTime) {
                // La bannière est encore fermée
                banner.style.display = 'none';
            } else {
                // Le temps est écoulé, réafficher la bannière
                banner.style.display = 'block';
                banner.classList.remove('hidden');
                localStorage.removeItem('donationBannerClosed');
            }
        }
    }
});

// État global du blog
let blogState = {
    articles: [],
    filteredArticles: [],
    currentPage: 1,
    currentCategory: '',
    currentSort: BLOG_CONFIG.defaultSort,
    searchQuery: ''
};

// Initialisation du blog
document.addEventListener('DOMContentLoaded', function() {
    loadArticles();
    setupEventListeners();
});

// Chargement des articles depuis le fichier JSON
async function loadArticles() {
    try {
        showLoading();
        
        // Charger les articles depuis le fichier JSON
        const response = await fetch('articles.json');
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status} - ${response.statusText}`);
        }
        
        const data = await response.json();
        blogState.articles = data.articles || [];
        
        // Vérifier si des articles ont été chargés
        if (blogState.articles.length === 0) {
            throw new Error('Aucun article trouvé dans le fichier JSON');
        }
        
        // Initialiser les articles filtrés
        blogState.filteredArticles = [...blogState.articles];
        
        // Rendre l'interface
        renderBlog();
        renderSidebar();
        
        console.log(`${blogState.articles.length} articles chargés avec succès`);
        
    } catch (error) {
        console.error('Erreur lors du chargement des articles:', error);
        showError(`Erreur de chargement: ${error.message}. Veuillez réessayer plus tard.`);
    }
}

// Configuration des écouteurs d'événements
function setupEventListeners() {
    // Filtres
    const categoryFilter = document.getElementById('categoryFilter');
    const sortFilter = document.getElementById('sortFilter');
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', handleCategoryFilter);
    }
    
    if (sortFilter) {
        sortFilter.addEventListener('change', handleSortFilter);
    }
    
    // Recherche
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    
    if (searchInput) {
        searchInput.addEventListener('input', debounce(handleSearch, 300));
    }
    
    if (searchBtn) {
        searchBtn.addEventListener('click', handleSearch);
    }
}

// Gestion des filtres par catégorie
function handleCategoryFilter(event) {
    blogState.currentCategory = event.target.value;
    blogState.currentPage = 1;
    applyFilters();
}

// Gestion du tri
function handleSortFilter(event) {
    blogState.currentSort = event.target.value;
    applyFilters();
}

// Gestion de la recherche
function handleSearch() {
    const searchInput = document.getElementById('searchInput');
    blogState.searchQuery = searchInput ? searchInput.value.trim() : '';
    blogState.currentPage = 1;
    applyFilters();
}

// Application des filtres
function applyFilters() {
    let filtered = [...blogState.articles];
    
    // Filtre par catégorie
    if (blogState.currentCategory) {
        filtered = filtered.filter(article => 
            article.category.toLowerCase() === blogState.currentCategory.toLowerCase()
        );
    }
    
    // Filtre par recherche
    if (blogState.searchQuery) {
        const query = blogState.searchQuery.toLowerCase();
        filtered = filtered.filter(article =>
            article.title.toLowerCase().includes(query) ||
            article.excerpt.toLowerCase().includes(query) ||
            article.content.toLowerCase().includes(query)
        );
    }
    
    // Tri
    filtered.sort((a, b) => {
        switch (blogState.currentSort) {
            case 'date-desc':
                return new Date(b.date) - new Date(a.date);
            case 'date-asc':
                return new Date(a.date) - new Date(b.date);
            case 'title-asc':
                return a.title.localeCompare(b.title);
            case 'title-desc':
                return b.title.localeCompare(a.title);
            default:
                return 0;
        }
    });
    
    blogState.filteredArticles = filtered;
    renderBlog();
}

// Rendu du blog principal
function renderBlog() {
    const blogGrid = document.getElementById('blogGrid');
    const pagination = document.getElementById('pagination');
    
    if (!blogGrid) return;
    
    // Calculer la pagination
    const totalPages = Math.ceil(blogState.filteredArticles.length / BLOG_CONFIG.articlesPerPage);
    const startIndex = (blogState.currentPage - 1) * BLOG_CONFIG.articlesPerPage;
    const endIndex = startIndex + BLOG_CONFIG.articlesPerPage;
    const currentArticles = blogState.filteredArticles.slice(startIndex, endIndex);
    
    // Afficher les articles
    if (currentArticles.length === 0) {
        blogGrid.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-search"></i>
                <h3>Aucun article trouvé</h3>
                <p>Essayez de modifier vos critères de recherche ou de filtrage.</p>
            </div>
        `;
    } else {
        blogGrid.innerHTML = currentArticles.map(article => createArticleCard(article)).join('');
    }
    
    // Afficher la pagination
    if (pagination) {
        renderPagination(totalPages);
    }
}

// Création d'une carte d'article
function createArticleCard(article) {
    const formattedDate = formatDate(article.date);
    const excerpt = article.excerpt || article.content.substring(0, 150) + '...';
    
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
                <p>${excerpt}</p>
                <a href="article.html?id=${article.id}" class="blog-link">Lire la suite <i class="fas fa-arrow-right"></i></a>
            </div>
        </article>
    `;
}

// Rendu de la sidebar
function renderSidebar() {
    renderCategories();
    renderRecentPosts();
}

// Rendu des catégories
function renderCategories() {
    const categoryList = document.getElementById('categoryList');
    const categoryFilter = document.getElementById('categoryFilter');
    
    if (!categoryList && !categoryFilter) return;
    
    // Compter les articles par catégorie
    const categoryCounts = {};
    blogState.articles.forEach(article => {
        categoryCounts[article.category] = (categoryCounts[article.category] || 0) + 1;
    });
    
    const categories = Object.keys(categoryCounts).sort();
    
    // Rendre la liste des catégories dans la sidebar
    if (categoryList) {
        categoryList.innerHTML = categories.map(category => `
            <li>
                <a href="#" data-category="${category}">
                    ${category}
                    <span class="count">${categoryCounts[category]}</span>
                </a>
            </li>
        `).join('');
        
        // Ajouter les écouteurs d'événements
        categoryList.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const category = e.target.closest('a').dataset.category;
                if (categoryFilter) {
                    categoryFilter.value = category;
                }
                blogState.currentCategory = category;
                blogState.currentPage = 1;
                applyFilters();
            });
        });
    }
    
    // Rendre le filtre de catégorie
    if (categoryFilter) {
        const currentValue = categoryFilter.value;
        categoryFilter.innerHTML = `
            <option value="">Toutes les catégories</option>
            ${categories.map(category => `
                <option value="${category}" ${category === currentValue ? 'selected' : ''}>
                    ${category} (${categoryCounts[category]})
                </option>
            `).join('')}
        `;
    }
}

// Rendu des articles récents
function renderRecentPosts() {
    const recentPosts = document.getElementById('recentPosts');
    
    if (!recentPosts) return;
    
    const recentArticles = blogState.articles
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5);
    
    recentPosts.innerHTML = recentArticles.map(article => `
        <div class="recent-post">
            <div class="recent-post-icon">
                <i class="${article.icon}"></i>
            </div>
            <div class="recent-post-content">
                <h4><a href="article.html?id=${article.id}">${article.title}</a></h4>
                <div class="date">${formatDate(article.date)}</div>
            </div>
        </div>
    `).join('');
}

// Rendu de la pagination
function renderPagination(totalPages) {
    const pagination = document.getElementById('pagination');
    
    if (!pagination || totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }
    
    const currentPage = blogState.currentPage;
    const pages = [];
    
    // Bouton précédent
    pages.push(`
        <button ${currentPage === 1 ? 'disabled' : ''} onclick="goToPage(${currentPage - 1})">
            <i class="fas fa-chevron-left"></i>
        </button>
    `);
    
    // Pages
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);
    
    if (startPage > 1) {
        pages.push(`<button onclick="goToPage(1)">1</button>`);
        if (startPage > 2) {
            pages.push(`<span>...</span>`);
        }
    }
    
    for (let i = startPage; i <= endPage; i++) {
        pages.push(`
            <button class="${i === currentPage ? 'active' : ''}" onclick="goToPage(${i})">
                ${i}
            </button>
        `);
    }
    
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            pages.push(`<span>...</span>`);
        }
        pages.push(`<button onclick="goToPage(${totalPages})">${totalPages}</button>`);
    }
    
    // Bouton suivant
    pages.push(`
        <button ${currentPage === totalPages ? 'disabled' : ''} onclick="goToPage(${currentPage + 1})">
            <i class="fas fa-chevron-right"></i>
        </button>
    `);
    
    pagination.innerHTML = pages.join('');
}

// Navigation vers une page
function goToPage(page) {
    const totalPages = Math.ceil(blogState.filteredArticles.length / BLOG_CONFIG.articlesPerPage);
    
    if (page >= 1 && page <= totalPages) {
        blogState.currentPage = page;
        renderBlog();
        
        // Scroll vers le haut de la grille
        const blogGrid = document.getElementById('blogGrid');
        if (blogGrid) {
            blogGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
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

// Affichage du chargement
function showLoading() {
    const blogGrid = document.getElementById('blogGrid');
    if (blogGrid) {
        blogGrid.innerHTML = '<div class="loading">Chargement des articles...</div>';
    }
}

// Affichage d'une erreur
function showError(message) {
    const blogGrid = document.getElementById('blogGrid');
    if (blogGrid) {
        blogGrid.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-exclamation-triangle"></i>
                <h3>Erreur de chargement</h3>
                <p>${message}</p>
                <button onclick="location.reload()" style="margin-top: 20px; padding: 10px 20px; background: #667eea; color: white; border: none; border-radius: 5px; cursor: pointer;">
                    <i class="fas fa-redo"></i> Recharger la page
                </button>
            </div>
        `;
    }
}

// Fonction utilitaire pour debounce
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
