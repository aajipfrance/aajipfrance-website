# Correction des Liens de Navigation - AAJIP-FRANCE

## Vue d'ensemble

Tous les attributs `href` dans les fichiers HTML ont été corrigés pour utiliser les extensions `.html` afin d'assurer la compatibilité et le bon fonctionnement sur tous les environnements d'hébergement, y compris les sous-dossiers.

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

### Avant (Liens absolus problématiques)

```html
<a href="/" class="nav-link">Accueil</a>
<a href="/a-propos" class="nav-link">À propos</a>
<a href="/missions" class="nav-link">Nos missions</a>
<a href="/actions" class="nav-link">Nos actions</a>
<a href="/blog" class="nav-link">Blog</a>
<a href="/donation" class="nav-link">Faire un don</a>
<a href="/contact" class="nav-link">Contact</a>
```

### Après (Liens relatifs avec extensions)

```html
<a href="index.html" class="nav-link">Accueil</a>
<a href="a-propos.html" class="nav-link">À propos</a>
<a href="missions.html" class="nav-link">Nos missions</a>
<a href="actions.html" class="nav-link">Nos actions</a>
<a href="blog.html" class="nav-link">Blog</a>
<a href="donation.html" class="nav-link">Faire un don</a>
<a href="contact.html" class="nav-link">Contact</a>
```

## URLs disponibles

- **Accueil** : `index.html`
- **À propos** : `a-propos.html`
- **Nos missions** : `missions.html`
- **Nos actions** : `actions.html`
- **Blog** : `blog.html`
- **Faire un don** : `donation.html`
- **Contact** : `contact.html`
- **Articles** : `article.html?id=nom-article`

## Compatibilité

### Avantages de cette approche

1. **Compatibilité maximale** : Fonctionne sur tous les environnements d'hébergement
2. **Sous-dossiers** : Fonctionne même si le site est dans un sous-dossier
3. **Simplicité** : Liens directs vers les fichiers HTML
4. **Fiabilité** : Pas de dépendance aux règles de réécriture d'URL
5. **Cohérence** : Tous les liens internes utilisent le même format

### Fonctionnement

Les liens pointent directement vers les fichiers HTML avec leurs extensions, ce qui garantit :

- Un fonctionnement correct sur tous les serveurs web
- Une compatibilité avec les sous-dossiers
- Une navigation fiable sans dépendance aux configurations serveur

## Test

Pour tester la navigation corrigée :

1. Ouvrir le site via un serveur web (pas en `file://`)
2. Vérifier que tous les liens de navigation fonctionnent
3. Tester la navigation sur mobile (menu hamburger)
4. Vérifier que les liens du footer fonctionnent
5. Tester les liens vers les articles du blog
6. Vérifier que les liens externes (réseaux sociaux, dons) fonctionnent toujours

## Maintenance

### Ajout de nouvelles pages

Lors de l'ajout de nouvelles pages HTML :

1. Créer le fichier avec l'extension `.html`
2. Utiliser les liens avec extensions `.html` dans tous les liens internes
3. Mettre à jour le `sitemap.xml` si nécessaire

### Mise à jour des liens

Pour ajouter de nouveaux liens internes :

- Utiliser le format `nom-de-page.html` (avec l'extension `.html`)
- Vérifier que la page correspondante existe
- Tester le lien après mise à jour

## Support

En cas de problème avec la navigation :

1. Vérifier que tous les fichiers HTML existent
2. S'assurer que les liens utilisent les bonnes extensions `.html`
3. Tester la navigation sur différents navigateurs
4. Vérifier que le serveur web est correctement configuré
