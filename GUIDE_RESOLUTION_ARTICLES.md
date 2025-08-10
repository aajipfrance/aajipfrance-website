# Guide de résolution - Articles non visibles

## Problème identifié

Le message "Nouvel article disponible bientôt" s'affiche au lieu des articles du blog.

## Cause probable

Le problème vient du fait que vous ouvrez le site directement depuis les fichiers (protocole `file://`) au lieu d'utiliser un serveur local. Les navigateurs bloquent les requêtes `fetch()` pour des raisons de sécurité quand on ouvre les fichiers directement.

## Solutions

### Solution 1 : Utiliser un serveur local (Recommandée)

1. **Ouvrez un terminal/command prompt** dans le dossier de votre site
2. **Lancez un serveur local** avec l'une de ces commandes :

#### Avec Python (si installé) :

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

#### Avec Node.js (si installé) :

```bash
npx http-server
```

#### Avec PHP (si installé) :

```bash
php -S localhost:8000
```

3. **Ouvrez votre navigateur** et allez sur :
   - `http://localhost:8000` pour la page d'accueil
   - `http://localhost:8000/blog.html` pour le blog
   - `http://localhost:8000/test-simple.html` pour tester

### Solution 2 : Test rapide

1. Ouvrez le fichier `test-simple.html` dans votre navigateur
2. Si vous voyez une erreur, suivez la Solution 1
3. Si vous voyez les articles, le problème est résolu

### Solution 3 : Vérification des fichiers

Assurez-vous que ces fichiers existent dans votre dossier :

- ✅ `articles.json` (contient les articles)
- ✅ `script.js` (gère le chargement des articles)
- ✅ `index.html` (page d'accueil)
- ✅ `blog.html` (page du blog)

## Test de diagnostic

1. Ouvrez `test-simple.html` via un serveur local
2. Si vous voyez "✅ Succès ! X articles trouvés", le problème est résolu
3. Si vous voyez une erreur, le problème persiste

## Articles disponibles

Le fichier `articles.json` contient actuellement 11 articles :

1. Nouveaux programmes d'accompagnement pour 2024
2. Témoignage : Marie, de l'exclusion à l'épanouissement
3. L'importance de l'accompagnement juridique
4. Réussites d'insertion professionnelle
5. Nos ateliers de formation
6. Nos partenariats avec les institutions
7. Le bénévolat à l'AAJIP-FRANCE
8. L'impact social de l'association
9. Nos événements et conférences en 2024
10. Accompagnement des familles migrantes
11. Témoignage : Ahmed, de la précarité à l'épanouissement

## Contact

Si le problème persiste après avoir suivi ces étapes, vérifiez :

- La console du navigateur (F12) pour les erreurs JavaScript
- Que tous les fichiers sont dans le même dossier
- Que le serveur local fonctionne correctement
