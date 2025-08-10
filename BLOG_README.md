# Système de Blog AAJIP-FRANCE

## Vue d'ensemble

Ce système de blog complet vous permet de gérer facilement les articles de votre site web AAJIP-FRANCE. Il comprend :

- **Page blog principale** (`blog.html`) avec filtres, recherche et pagination
- **Pages d'articles individuelles** (`article.html`) avec contenu complet
- **Interface d'administration** (`admin.html`) pour ajouter/modifier des articles
- **Système de gestion des données** via fichier JSON

## Structure des fichiers

```
├── blog.html              # Page principale du blog
├── article.html           # Page d'article individuel
├── admin.html             # Interface d'administration
├── blog-styles.css        # Styles pour le blog
├── article-styles.css     # Styles pour les articles
├── admin-styles.css       # Styles pour l'administration
├── blog.js                # JavaScript pour le blog
├── article.js             # JavaScript pour les articles
├── admin.js               # JavaScript pour l'administration
├── articles.json          # Données des articles
└── BLOG_README.md         # Ce fichier
```

## Fonctionnalités

### Pour les visiteurs

- ✅ Navigation dans tous les articles
- ✅ Filtrage par catégorie
- ✅ Recherche dans le contenu
- ✅ Tri par date ou titre
- ✅ Pagination automatique
- ✅ Articles connexes
- ✅ Design responsive

### Pour l'administrateur

- ✅ Ajout d'articles via formulaire
- ✅ Gestion des catégories
- ✅ Modification et suppression d'articles
- ✅ Interface intuitive
- ✅ Validation des données

## Comment ajouter un article

### Méthode 1 : Interface d'administration (Recommandée)

1. Ouvrez `admin.html` dans votre navigateur
2. Cliquez sur l'onglet "Ajouter un article"
3. Remplissez le formulaire :

   - **Titre** : Le titre de votre article
   - **Extrait** : Résumé court (affiché dans la liste)
   - **Contenu** : Le contenu complet (HTML autorisé)
   - **Auteur** : Nom de l'auteur
   - **Date** : Date de publication
   - **Catégorie** : Choisissez une catégorie existante
   - **Image URL** : Lien vers l'image de l'article
   - **Tags** : Mots-clés séparés par des virgules
   - **Temps de lecture** : Ex: "5 min"

4. Cliquez sur "Publier l'article"

### Méthode 2 : Édition directe du fichier JSON

Vous pouvez également modifier directement le fichier `articles.json` :

```json
{
  "id": "mon-nouvel-article",
  "title": "Titre de l'article",
  "excerpt": "Résumé de l'article...",
  "content": "<p>Contenu HTML de l'article...</p>",
  "author": "Votre nom",
  "date": "2024-12-20",
  "category": "Accompagnement",
  "image": "https://example.com/image.jpg",
  "tags": ["tag1", "tag2"],
  "readTime": "5 min"
}
```

## Structure d'un article

Chaque article contient les champs suivants :

| Champ      | Type   | Description          | Obligatoire |
| ---------- | ------ | -------------------- | ----------- |
| `id`       | string | Identifiant unique   | ✅          |
| `title`    | string | Titre de l'article   | ✅          |
| `excerpt`  | string | Résumé court         | ✅          |
| `content`  | string | Contenu HTML complet | ✅          |
| `author`   | string | Nom de l'auteur      | ✅          |
| `date`     | string | Date (YYYY-MM-DD)    | ✅          |
| `category` | string | Catégorie            | ✅          |
| `image`    | string | URL de l'image       | ✅          |
| `tags`     | array  | Mots-clés            | ❌          |
| `readTime` | string | Temps de lecture     | ❌          |

## Gestion des catégories

### Ajouter une catégorie

1. Dans l'interface d'administration, allez à l'onglet "Catégories"
2. Cliquez sur "Nouvelle catégorie"
3. Remplissez le nom et la description
4. Cliquez sur "Ajouter"

### Catégories par défaut

- **Accompagnement** : Articles sur l'accompagnement juridique et social
- **Insertion** : Articles sur l'insertion professionnelle
- **Formation** : Articles sur les programmes de formation
- **Partenariats** : Articles sur les collaborations
- **Bénévolat** : Articles sur l'engagement bénévole
- **Impact** : Articles sur les résultats et l'impact

## Personnalisation

### Modifier les styles

- `blog-styles.css` : Styles pour la page blog principale
- `article-styles.css` : Styles pour les pages d'articles
- `admin-styles.css` : Styles pour l'interface d'administration

### Modifier la configuration

Dans `blog.js`, vous pouvez ajuster :

```javascript
const BLOG_CONFIG = {
  articlesPerPage: 6, // Nombre d'articles par page
  defaultSort: "date-desc", // Tri par défaut
};
```

### Ajouter des fonctionnalités

Le système est modulaire et extensible. Vous pouvez facilement ajouter :

- Système de commentaires
- Partage sur réseaux sociaux
- Newsletter
- Système de tags avancé
- Recherche avancée

## Déploiement

1. Uploadez tous les fichiers sur votre serveur web
2. Assurez-vous que le fichier `articles.json` est accessible
3. Testez l'interface d'administration
4. Ajoutez vos premiers articles

## Sécurité

⚠️ **Important** : L'interface d'administration n'a pas de système d'authentification. Pour un usage en production, ajoutez :

- Système de connexion
- Validation côté serveur
- Protection CSRF
- Limitation des accès

## Support

Pour toute question ou problème :

1. Vérifiez que tous les fichiers sont présents
2. Ouvrez la console du navigateur pour voir les erreurs
3. Vérifiez que le fichier `articles.json` est accessible
4. Testez avec un serveur web local (pas en ouvrant directement les fichiers HTML)

## Exemples d'utilisation

### Ajouter un article sur une nouvelle action

1. Allez sur `admin.html`
2. Remplissez le formulaire avec :
   - Titre : "Nouvelle action d'accompagnement"
   - Extrait : "Découvrez notre nouvelle initiative..."
   - Contenu : Le détail de votre action
   - Catégorie : "Accompagnement"
   - Image : URL d'une photo de votre action

### Partager un témoignage

1. Créez un article avec :
   - Titre : "Témoignage : Le parcours de [Nom]"
   - Catégorie : "Insertion" ou "Impact"
   - Contenu : Le témoignage complet
   - Tags : "témoignage", "réussite", "insertion"

### Annoncer un événement

1. Créez un article avec :
   - Titre : "Événement : [Nom de l'événement]"
   - Catégorie : "Formation" ou "Partenariats"
   - Contenu : Détails de l'événement
   - Date : Date de l'événement

Le système est maintenant prêt à être utilisé ! 🎉
