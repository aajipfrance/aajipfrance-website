// État global de l'administration
let adminState = {
    articles: [],
    categories: [],
    currentTab: 'articles'
};

// Initialisation de l'administration
document.addEventListener('DOMContentLoaded', function() {
    loadData();
    setupEventListeners();
    setCurrentDate();
});

// Configuration des écouteurs d'événements
function setupEventListeners() {
    // Gestion des onglets
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tab = button.dataset.tab;
            switchTab(tab);
        });
    });
    
    // Formulaire d'article
    const articleForm = document.getElementById('articleForm');
    if (articleForm) {
        articleForm.addEventListener('submit', handleArticleSubmit);
    }
    
    // Formulaire de catégorie
    const categoryForm = document.getElementById('categoryForm');
    if (categoryForm) {
        categoryForm.addEventListener('submit', handleCategorySubmit);
    }
}

// Chargement des données
async function loadData() {
    try {
        showLoading('articlesList', 'Chargement des articles...');
        
        const response = await fetch('articles.json');
        if (!response.ok) {
            throw new Error('Impossible de charger les données');
        }
        
        const data = await response.json();
        adminState.articles = data.articles || [];
        adminState.categories = data.categories || [];
        
        renderArticlesList();
        renderCategoriesList();
        
    } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
        showError('articlesList', 'Impossible de charger les données. Veuillez réessayer.');
    }
}

// Changement d'onglet
function switchTab(tabName) {
    // Mettre à jour les boutons d'onglet
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    
    // Mettre à jour le contenu des onglets
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(`${tabName}-tab`).classList.add('active');
    
    adminState.currentTab = tabName;
}

// Rendu de la liste des articles
function renderArticlesList() {
    const articlesList = document.getElementById('articlesList');
    if (!articlesList) return;
    
    if (adminState.articles.length === 0) {
        articlesList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-newspaper"></i>
                <h3>Aucun article</h3>
                <p>Commencez par ajouter votre premier article.</p>
            </div>
        `;
        return;
    }
    
    articlesList.innerHTML = adminState.articles
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map(article => `
            <div class="article-item">
                <img src="${article.image}" alt="${article.title}" class="article-image">
                <div class="article-info">
                    <div class="article-title">${article.title}</div>
                    <div class="article-meta">
                        <span><i class="fas fa-calendar"></i> ${formatDate(article.date)}</span>
                        <span><i class="fas fa-user"></i> ${article.author}</span>
                        <span class="article-category">${article.category}</span>
                    </div>
                </div>
                <div class="article-actions">
                    <button class="btn btn-small btn-secondary" onclick="editArticle('${article.id}')">
                        <i class="fas fa-edit"></i> Modifier
                    </button>
                    <button class="btn btn-small btn-danger" onclick="deleteArticle('${article.id}')">
                        <i class="fas fa-trash"></i> Supprimer
                    </button>
                </div>
            </div>
        `).join('');
}

// Rendu de la liste des catégories
function renderCategoriesList() {
    const categoriesList = document.getElementById('categoriesList');
    if (!categoriesList) return;
    
    if (adminState.categories.length === 0) {
        categoriesList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-folder"></i>
                <h3>Aucune catégorie</h3>
                <p>Ajoutez des catégories pour organiser vos articles.</p>
            </div>
        `;
        return;
    }
    
    categoriesList.innerHTML = adminState.categories.map(category => `
        <div class="category-item">
            <div class="category-name">${category.name}</div>
            <div class="category-description">${category.description || 'Aucune description'}</div>
            <div class="category-actions">
                <button class="btn btn-small btn-secondary" onclick="editCategory('${category.name}')">
                    <i class="fas fa-edit"></i> Modifier
                </button>
                <button class="btn btn-small btn-danger" onclick="deleteCategory('${category.name}')">
                    <i class="fas fa-trash"></i> Supprimer
                </button>
            </div>
        </div>
    `).join('');
}

// Gestion de la soumission du formulaire d'article
async function handleArticleSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const articleData = {
        id: generateArticleId(formData.get('title')),
        title: formData.get('title'),
        excerpt: formData.get('excerpt'),
        content: formData.get('content'),
        author: formData.get('author'),
        date: formData.get('date'),
        category: formData.get('category'),
        image: formData.get('image'),
        tags: formData.get('tags') ? formData.get('tags').split(',').map(tag => tag.trim()) : [],
        readTime: formData.get('readTime') || '5 min'
    };
    
    try {
        // Ajouter l'article à la liste
        adminState.articles.unshift(articleData);
        
        // Sauvegarder les données
        await saveData();
        
        // Réinitialiser le formulaire
        event.target.reset();
        setCurrentDate();
        
        // Afficher un message de succès
        showMessage('Article ajouté avec succès !', 'success');
        
        // Revenir à l'onglet des articles
        switchTab('articles');
        
    } catch (error) {
        console.error('Erreur lors de l\'ajout de l\'article:', error);
        showMessage('Erreur lors de l\'ajout de l\'article. Veuillez réessayer.', 'error');
    }
}

// Gestion de la soumission du formulaire de catégorie
async function handleCategorySubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const categoryData = {
        name: formData.get('name'),
        description: formData.get('description')
    };
    
    try {
        // Vérifier si la catégorie existe déjà
        const existingCategory = adminState.categories.find(cat => cat.name === categoryData.name);
        if (existingCategory) {
            showMessage('Cette catégorie existe déjà.', 'warning');
            return;
        }
        
        // Ajouter la catégorie
        adminState.categories.push(categoryData);
        
        // Sauvegarder les données
        await saveData();
        
        // Réinitialiser le formulaire
        event.target.reset();
        
        // Fermer le modal
        closeCategoryModal();
        
        // Afficher un message de succès
        showMessage('Catégorie ajoutée avec succès !', 'success');
        
    } catch (error) {
        console.error('Erreur lors de l\'ajout de la catégorie:', error);
        showMessage('Erreur lors de l\'ajout de la catégorie. Veuillez réessayer.', 'error');
    }
}

// Sauvegarde des données
async function saveData() {
    const data = {
        articles: adminState.articles,
        categories: adminState.categories
    };
    
    // Dans un environnement réel, vous enverriez ces données à un serveur
    // Pour cette démo, nous simulons la sauvegarde
    console.log('Données à sauvegarder:', data);
    
    // Vous pouvez implémenter ici la logique de sauvegarde
    // Par exemple, en utilisant localStorage pour une démo
    localStorage.setItem('blogData', JSON.stringify(data));
    
    return Promise.resolve();
}

// Suppression d'un article
function deleteArticle(articleId) {
    showConfirmModal(
        'Êtes-vous sûr de vouloir supprimer cet article ?',
        async () => {
            try {
                adminState.articles = adminState.articles.filter(article => article.id !== articleId);
                await saveData();
                renderArticlesList();
                showMessage('Article supprimé avec succès !', 'success');
            } catch (error) {
                console.error('Erreur lors de la suppression:', error);
                showMessage('Erreur lors de la suppression. Veuillez réessayer.', 'error');
            }
        }
    );
}

// Suppression d'une catégorie
function deleteCategory(categoryName) {
    // Vérifier si la catégorie est utilisée
    const usedInArticles = adminState.articles.some(article => article.category === categoryName);
    
    if (usedInArticles) {
        showMessage('Impossible de supprimer cette catégorie car elle est utilisée par des articles.', 'warning');
        return;
    }
    
    showConfirmModal(
        'Êtes-vous sûr de vouloir supprimer cette catégorie ?',
        async () => {
            try {
                adminState.categories = adminState.categories.filter(cat => cat.name !== categoryName);
                await saveData();
                renderCategoriesList();
                showMessage('Catégorie supprimée avec succès !', 'success');
            } catch (error) {
                console.error('Erreur lors de la suppression:', error);
                showMessage('Erreur lors de la suppression. Veuillez réessayer.', 'error');
            }
        }
    );
}

// Génération d'un ID d'article
function generateArticleId(title) {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim('-');
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

// Définir la date actuelle dans le formulaire
function setCurrentDate() {
    const dateInput = document.getElementById('articleDate');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.value = today;
    }
}

// Affichage du modal de confirmation
function showConfirmModal(message, onConfirm) {
    const modal = document.getElementById('confirmModal');
    const confirmMessage = document.getElementById('confirmMessage');
    const confirmBtn = document.getElementById('confirmBtn');
    
    confirmMessage.textContent = message;
    confirmBtn.onclick = () => {
        onConfirm();
        closeModal();
    };
    
    modal.classList.add('active');
}

// Fermeture du modal
function closeModal() {
    const modal = document.getElementById('confirmModal');
    modal.classList.remove('active');
}

// Affichage du modal de catégorie
function showAddCategoryForm() {
    const modal = document.getElementById('categoryModal');
    modal.classList.add('active');
}

// Fermeture du modal de catégorie
function closeCategoryModal() {
    const modal = document.getElementById('categoryModal');
    modal.classList.remove('active');
}

// Affichage du formulaire d'ajout d'article
function showAddArticleForm() {
    switchTab('add');
}

// Réinitialisation du formulaire
function resetForm() {
    const form = document.getElementById('articleForm');
    if (form) {
        form.reset();
        setCurrentDate();
    }
}

// Affichage d'un message
function showMessage(message, type = 'success') {
    // Créer un élément de message
    const messageElement = document.createElement('div');
    messageElement.className = `message ${type}`;
    messageElement.textContent = message;
    
    // Ajouter le message au début de la page
    const container = document.querySelector('.container');
    container.insertBefore(messageElement, container.firstChild);
    
    // Supprimer le message après 5 secondes
    setTimeout(() => {
        messageElement.remove();
    }, 5000);
}

// Affichage du chargement
function showLoading(elementId, message = 'Chargement...') {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = `<div class="loading">${message}</div>`;
    }
}

// Affichage d'une erreur
function showError(elementId, message) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-exclamation-triangle"></i>
                <h3>Erreur</h3>
                <p>${message}</p>
            </div>
        `;
    }
}

// Fonctions pour l'édition (à implémenter selon vos besoins)
function editArticle(articleId) {
    const article = adminState.articles.find(a => a.id === articleId);
    if (article) {
        // Remplir le formulaire avec les données de l'article
        fillArticleForm(article);
        switchTab('add');
        showMessage('Modifiez l\'article et cliquez sur "Mettre à jour"', 'warning');
    }
}

function editCategory(categoryName) {
    const category = adminState.categories.find(c => c.name === categoryName);
    if (category) {
        // Remplir le formulaire de catégorie
        fillCategoryForm(category);
        showAddCategoryForm();
        showMessage('Modifiez la catégorie et cliquez sur "Mettre à jour"', 'warning');
    }
}

// Remplir le formulaire d'article
function fillArticleForm(article) {
    const form = document.getElementById('articleForm');
    if (form) {
        form.querySelector('[name="title"]').value = article.title;
        form.querySelector('[name="excerpt"]').value = article.excerpt;
        form.querySelector('[name="content"]').value = article.content;
        form.querySelector('[name="author"]').value = article.author;
        form.querySelector('[name="date"]').value = article.date;
        form.querySelector('[name="category"]').value = article.category;
        form.querySelector('[name="image"]').value = article.image;
        form.querySelector('[name="tags"]').value = article.tags ? article.tags.join(', ') : '';
        form.querySelector('[name="readTime"]').value = article.readTime || '';
    }
}

// Remplir le formulaire de catégorie
function fillCategoryForm(category) {
    const form = document.getElementById('categoryForm');
    if (form) {
        form.querySelector('[name="name"]').value = category.name;
        form.querySelector('[name="description"]').value = category.description || '';
    }
}
