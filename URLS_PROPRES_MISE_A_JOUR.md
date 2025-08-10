# Mise à jour des URLs Propres - AAJIP-FRANCE

## Vue d'ensemble

Tous les attributs `href` dans les fichiers HTML ont été mis à jour pour utiliser les URLs propres (sans extension `.html`) conformément au fichier `.htaccess` qui gère la réécriture d'URL.

## Fichiers mis à jour

### 1. `index.html`

- **Navigation principale** : Tous les liens `nav-link` mis à jour
- **Boutons hero** : Liens vers "Découvrir notre association" et "Nous contacter"
- **Section blog** : Lien "Voir tous les articles"
- **Navigation rapide** : Tous les boutons de navigation rapide
- **Footer** : Liens dans la section "Nos missions"

### 2. `a-propos.html`

- **Navigation principale** : Tous les liens `nav-link` mis à jour
- **Footer** : Liens dans la section "Nos missions"

### 3. `missions.html`

- **Navigation principale** : Tous les liens `nav-link` mis à jour
- **Footer** : Liens dans la section "Nos missions"

### 4. `actions.html`

- **Navigation principale** : Tous les liens `nav-link` mis à jour
- **Footer** : Liens dans la section "Nos missions"

### 5. `donation.html`

- **Navigation principale** : Tous les liens `nav-link` mis à jour
- **Footer** : Liens dans la section "Nos missions"

### 6. `contact.html`

- **Navigation principale** : Tous les liens `nav-link` mis à jour
- **Footer** : Liens dans la section "Nos missions"

### 7. `blog.html`

- **Navigation principale** : Tous les liens `nav-link` mis à jour (incluant les anciens liens avec ancres)

### 8. `article.html`

- **Navigation principale** : Tous les liens `nav-link` mis à jour (incluant les anciens liens avec ancres)

## Changements effectués

### Avant

```html
<a href="index.html" class="nav-link">Accueil</a>
<a href="a-propos.html" class="nav-link">À propos</a>
<a href="missions.html" class="nav-link">Nos missions</a>
<a href="actions.html" class="nav-link">Nos actions</a>
<a href="blog.html" class="nav-link">Blog</a>
<a href="donation.html" class="nav-link">Faire un don</a>
<a href="contact.html" class="nav-link">Contact</a>
```

### Après

```html
<a href="/" class="nav-link">Accueil</a>
<a href="/a-propos" class="nav-link">À propos</a>
<a href="/missions" class="nav-link">Nos missions</a>
<a href="/actions" class="nav-link">Nos actions</a>
<a href="/blog" class="nav-link">Blog</a>
<a href="/donation" class="nav-link">Faire un don</a>
<a href="/contact" class="nav-link">Contact</a>
```

## URLs propres disponibles

- **Accueil** : `/` (ou `/index`)
- **À propos** : `/a-propos`
- **Nos missions** : `/missions`
- **Nos actions** : `/actions`
- **Blog** : `/blog`
- **Faire un don** : `/donation`
- **Contact** : `/contact`

## Compatibilité

### Fonctionnement avec `.htaccess`

Le fichier `.htaccess` contient les règles de réécriture suivantes :

```apache
# Supprimer l'extension .html
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^([^\.]+)$ $1.html [NC,L]

# Rediriger les anciennes URLs .html vers les URLs propres
RewriteCond %{THE_REQUEST} /([^.]+)\.html [NC]
RewriteRule ^ /%1? [NC,L,R=301]
```

### Avantages

1. **URLs plus propres** : Plus d'extension `.html` visible
2. **SEO amélioré** : URLs plus courtes et plus lisibles
3. **Compatibilité** : Les anciennes URLs `.html` sont automatiquement redirigées
4. **Cohérence** : Tous les liens internes utilisent le même format

## Test

Pour tester les URLs propres :

1. Ouvrir le site via un serveur web (pas en `file://`)
2. Vérifier que tous les liens de navigation fonctionnent
3. Tester les redirections en tapant les anciennes URLs `.html`
4. Vérifier que les liens externes (réseaux sociaux, dons) fonctionnent toujours

## Maintenance

### Ajout de nouvelles pages

Lors de l'ajout de nouvelles pages HTML :

1. Créer le fichier avec l'extension `.html`
2. Utiliser les URLs propres dans tous les liens internes
3. Mettre à jour le `sitemap.xml` si nécessaire

### Mise à jour des liens

Pour ajouter de nouveaux liens internes :

- Utiliser le format `/nom-de-page` (sans `.html`)
- Vérifier que la page correspondante existe
- Tester le lien après mise à jour

## Support

En cas de problème avec les URLs propres :

1. Vérifier que le serveur web supporte `mod_rewrite`
2. S'assurer que le fichier `.htaccess` est présent à la racine
3. Vérifier les permissions du fichier `.htaccess`
4. Consulter les logs d'erreur du serveur web
