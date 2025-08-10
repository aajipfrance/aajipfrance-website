# Guide de résolution des problèmes - Blog AAJIP-FRANCE

## Problème : Impossible d'accéder à la page de blog depuis index.html

### 🔍 Diagnostic rapide

1. **Ouvrez le fichier de diagnostic** : `debug-blog.html`
2. **Vérifiez les résultats** des tests automatiques
3. **Identifiez les erreurs** dans les logs de la console

### 🛠️ Solutions possibles

#### 1. Problème de serveur web

**Symptômes** : Erreurs 404, fichiers non trouvés
**Solution** :

- Assurez-vous que tous les fichiers sont dans le même dossier
- Utilisez un serveur web local (pas d'ouverture directe des fichiers)
- Testez avec : `python -m http.server 8000` ou `php -S localhost:8000`

#### 2. Problème de JavaScript

**Symptômes** : Page blanche, erreurs dans la console
**Solutions** :

- Vérifiez que `config.js` existe (créé automatiquement)
- Vérifiez que `articles.json` est accessible
- Désactivez temporairement les extensions du navigateur

#### 3. Problème de navigation

**Symptômes** : Liens qui ne fonctionnent pas
**Solutions** :

- Vérifiez que `blog.html` existe dans le même dossier
- Testez les liens directement : `http://localhost:8000/blog.html`
- Vérifiez les permissions des fichiers

#### 4. Problème de CORS

**Symptômes** : Erreurs de chargement JSON
**Solutions** :

- Utilisez un serveur web local
- Vérifiez que `articles.json` est accessible
- Testez avec le fichier de diagnostic

### 📋 Checklist de vérification

- [ ] Tous les fichiers sont présents dans le dossier
- [ ] `index.html` s'ouvre correctement
- [ ] `blog.html` s'ouvre directement
- [ ] `articles.json` est accessible
- [ ] `config.js` existe
- [ ] Aucune erreur dans la console du navigateur
- [ ] Serveur web local en cours d'exécution

### 🚀 Test rapide

1. Ouvrez `test-blog.html` dans votre navigateur
2. Cliquez sur "Accéder au blog"
3. Vérifiez que la page se charge
4. Si ça ne marche pas, ouvrez `debug-blog.html` pour le diagnostic complet

### 📞 Support

Si le problème persiste :

1. Ouvrez `debug-blog.html`
2. Notez les erreurs affichées
3. Vérifiez la console du navigateur (F12)
4. Contactez le support avec les informations d'erreur

### 🔧 Fichiers créés/modifiés

- ✅ `config.js` - Configuration EmailJS
- ✅ `debug-blog.html` - Outil de diagnostic
- ✅ `test-blog.html` - Test simple
- ✅ `blog.js` - Amélioration de la gestion d'erreurs
- ✅ `script.js` - Correction de la navigation

### 📝 Notes techniques

- Le blog utilise JavaScript pour charger les articles depuis `articles.json`
- Les styles sont dans `blog-styles.css`
- La navigation est gérée par `script.js`
- EmailJS nécessite `config.js` pour fonctionner
