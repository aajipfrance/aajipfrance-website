# URLs Propres - Guide d'Utilisation

## Vue d'ensemble

Le site AAJIP-France utilise maintenant des **URLs propres** (clean URLs) qui permettent d'accéder aux pages sans l'extension `.html`.

## URLs Disponibles

### Pages Principales

- **Accueil** : `https://aajipfrance.fr/` ou `https://aajipfrance.fr/index.html`
- **À propos** : `https://aajipfrance.fr/a-propos` (au lieu de `a-propos.html`)
- **Nos missions** : `https://aajipfrance.fr/missions` (au lieu de `missions.html`)
- **Nos actions** : `https://aajipfrance.fr/actions` (au lieu de `actions.html`)
- **Faire un don** : `https://aajipfrance.fr/donation` (au lieu de `donation.html`)
- **Contact** : `https://aajipfrance.fr/contact` (au lieu de `contact.html`)
- **Blog** : `https://aajipfrance.fr/blog` (au lieu de `blog.html`)

### Pages d'Articles

- **Article individuel** : `https://aajipfrance.fr/article.html?id=nom-article`

## Fonctionnement Technique

### Fichier .htaccess

Le fichier `.htaccess` contient les règles de réécriture qui :

1. **Suppriment automatiquement** l'extension `.html` des URLs
2. **Redirigent** les anciennes URLs (avec `.html`) vers les nouvelles URLs propres
3. **Gèrent les erreurs 404** en redirigeant vers la page d'accueil

### Règles de Réécriture

```apache
# Suppression de l'extension .html
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^([^\.]+)$ $1.html [NC,L]

# Redirection des URLs avec .html vers les URLs propres
RewriteCond %{THE_REQUEST} /([^.]+)\.html [NC]
RewriteRule ^ /%1 [NC,L,R=301]
```

## Avantages

### 1. URLs Plus Propres

- **Avant** : `https://aajipfrance.fr/a-propos.html`
- **Après** : `https://aajipfrance.fr/a-propos`

### 2. Meilleur SEO

- URLs plus courtes et plus lisibles
- Meilleure indexation par les moteurs de recherche
- URLs plus faciles à partager

### 3. Compatibilité

- Les anciennes URLs (avec `.html`) continuent de fonctionner
- Redirection automatique vers les nouvelles URLs
- Aucun lien cassé

### 4. Performance

- Compression GZIP activée
- Cache des navigateurs optimisé
- Headers de sécurité ajoutés

## Mise à Jour des Liens

### Dans le Code

Tous les liens internes ont été mis à jour pour utiliser les nouvelles URLs :

- Navigation principale
- Liens dans le contenu
- Liens dans le footer
- Liens de navigation rapide

### Sitemap

Le fichier `sitemap.xml` a été mis à jour avec les nouvelles URLs pour une meilleure indexation.

## Test des URLs

### URLs à Tester

1. `https://aajipfrance.fr/a-propos`
2. `https://aajipfrance.fr/missions`
3. `https://aajipfrance.fr/actions`
4. `https://aajipfrance.fr/donation`
5. `https://aajipfrance.fr/contact`
6. `https://aajipfrance.fr/blog`

### Redirections à Vérifier

- `https://aajipfrance.fr/a-propos.html` → `https://aajipfrance.fr/a-propos`
- `https://aajipfrance.fr/missions.html` → `https://aajipfrance.fr/missions`
- etc.

## Configuration Serveur

### Apache

Le fichier `.htaccess` fonctionne avec Apache. Assurez-vous que :

- Le module `mod_rewrite` est activé
- Les fichiers `.htaccess` sont autorisés

### Autres Serveurs

Pour d'autres serveurs web (Nginx, IIS), des configurations équivalentes peuvent être nécessaires.

## Maintenance

### Ajout de Nouvelles Pages

Pour ajouter une nouvelle page avec URL propre :

1. Créer le fichier `nouvelle-page.html`
2. L'URL `https://aajipfrance.fr/nouvelle-page` fonctionnera automatiquement
3. Mettre à jour le sitemap si nécessaire

### Mise à Jour du Sitemap

Après ajout de nouvelles pages, mettre à jour `sitemap.xml` :

```xml
<url>
    <loc>https://aajipfrance.fr/nouvelle-page</loc>
    <lastmod>2024-12-20</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
</url>
```

## Support

En cas de problème avec les URLs propres :

1. Vérifier que le serveur Apache est configuré correctement
2. S'assurer que le module `mod_rewrite` est activé
3. Vérifier les logs d'erreur du serveur
4. Tester avec les anciennes URLs (avec `.html`) qui doivent rediriger automatiquement
