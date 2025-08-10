// Gestion des articles individuels
let allArticles = [];
let currentArticle = null;

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    loadArticles();
});

// Chargement des articles
async function loadArticles() {
    try {
        const response = await fetch('articles.json');
        if (!response.ok) {
            throw new Error('Impossible de charger les articles');
        }
        
        const data = await response.json();
        allArticles = data.articles || [];
        
        // Récupérer l'ID de l'article depuis l'URL
        const urlParams = new URLSearchParams(window.location.search);
        const articleId = urlParams.get('id');
        
        if (articleId) {
            displayArticle(articleId);
        } else {
            showError('Aucun article spécifié');
        }
        
    } catch (error) {
        console.error('Erreur lors du chargement des articles:', error);
        showError('Erreur lors du chargement de l\'article');
    }
}

// Affichage d'un article
function displayArticle(articleId) {
    const article = allArticles.find(a => a.id === articleId);
    
    if (!article) {
        showError('Article non trouvé');
        return;
    }
    
    currentArticle = article;
    
    // Mettre à jour le titre de la page
    document.title = `${article.title} - AAJIP-FRANCE`;
    
    // Mettre à jour le breadcrumb
    const articleTitle = document.getElementById('articleTitle');
    if (articleTitle) {
        articleTitle.textContent = article.title;
    }
    
    // Afficher le contenu de l'article
    const articleContent = document.getElementById('articleContent');
    if (articleContent) {
        articleContent.innerHTML = createArticleHTML(article);
    }
    
    // Afficher les articles connexes
    displayRelatedArticles(article);
}

// Création du HTML de l'article
function createArticleHTML(article) {
    const formattedDate = formatDate(article.date);
    
    return `
        <header class="article-header">
            <div class="article-meta">
                <span class="article-category">${article.category}</span>
                <span class="article-date"><i class="fas fa-calendar"></i> ${formattedDate}</span>
                <span class="article-author"><i class="fas fa-user"></i> ${article.author}</span>
                <span class="article-read-time"><i class="fas fa-clock"></i> ${article.readTime}</span>
            </div>
            <h1 class="article-title">${article.title}</h1>
            <p class="article-excerpt">${article.excerpt}</p>
        </header>
        
        <div class="article-image">
            <img src="${article.image}" alt="${article.title}">
        </div>
        
        <div class="article-body">
            ${article.content}
        </div>
        
        <footer class="article-footer">
            <div class="article-tags">
                <h4>Tags :</h4>
                ${article.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            
            <div class="article-share">
                <h4>Partager cet article :</h4>
                <div class="share-buttons">
                    <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}" target="_blank" class="share-btn facebook">
                        <i class="fab fa-facebook"></i>
                    </a>
                    <a href="https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(article.title)}" target="_blank" class="share-btn twitter">
                        <i class="fab fa-twitter"></i>
                    </a>
                    <a href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}" target="_blank" class="share-btn linkedin">
                        <i class="fab fa-linkedin"></i>
                    </a>
                    <a href="mailto:?subject=${encodeURIComponent(article.title)}&body=${encodeURIComponent(window.location.href)}" class="share-btn email">
                        <i class="fas fa-envelope"></i>
                    </a>
                </div>
            </div>
        </footer>
    `;
}

// Affichage des articles connexes
function displayRelatedArticles(currentArticle) {
    const relatedArticles = allArticles
        .filter(article => 
            article.id !== currentArticle.id && 
            (article.category === currentArticle.category || 
             article.tags.some(tag => currentArticle.tags.includes(tag)))
        )
        .slice(0, 3);
    
    const relatedContainer = document.getElementById('relatedArticles');
    if (relatedContainer) {
        if (relatedArticles.length === 0) {
            relatedContainer.innerHTML = '<p>Aucun article connexe pour le moment.</p>';
        } else {
            relatedContainer.innerHTML = relatedArticles.map(article => `
                <article class="related-article">
                    <div class="related-image">
                        <img src="${article.image}" alt="${article.title}">
                    </div>
                    <div class="related-content">
                        <h4><a href="article.html?id=${article.id}">${article.title}</a></h4>
                        <p>${article.excerpt}</p>
                        <div class="related-meta">
                            <span class="date">${formatDate(article.date)}</span>
                            <span class="category">${article.category}</span>
                        </div>
                    </div>
                </article>
            `).join('');
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

// Affichage d'une erreur
function showError(message) {
    const articleContent = document.getElementById('articleContent');
    if (articleContent) {
        articleContent.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-triangle"></i>
                <h2>Erreur</h2>
                <p>${message}</p>
                <a href="blog.html" class="btn btn-primary">Retour au blog</a>
            </div>
        `;
    }
}

// Gestion du partage
function shareArticle(platform) {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(currentArticle ? currentArticle.title : '');
    
    let shareUrl = '';
    
    switch (platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
            break;
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
            break;
        case 'email':
            shareUrl = `mailto:?subject=${title}&body=${url}`;
            break;
    }
    
    if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
    }
}
