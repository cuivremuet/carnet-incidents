# carnet-incidents

Transforme des observations horodatées en relevé Markdown chronologique.

## Usage

Node.js 22+ ; aucune dépendance externe. Depuis ce dossier :

```powershell
node main.mjs example.json exemple-sortie.md
node --test test.mjs
```

Entrée : `incidents`, liste de `{atSeconds, level, note}`. Instant positif ou nul ; niveau info, attention ou alerte ; note non vide. Une liste vide produit l'en-tête du tableau. Sortie : tableau Markdown trié par instant. Les notes sont traitées comme texte ; les retours de ligne sont aplatis et les séparateurs échappés. Aucune observation n'est extraite automatiquement d'une vidéo.

La sortie est écrite seulement après validation complète et remplace le fichier de sortie choisi. Utiliser un chemin distinct de l'entrée. JSON UTF-8 sans BOM. Le dossier de destination doit exister. Erreur de lecture/JSON/validation/écriture : message sur stderr, code 1. Aucun accès réseau.

## Exemple

Voir `example.json` et `exemple-sortie.md`. Les exemples n'utilisent que des métadonnées ou des textes fictifs.

Licence MIT. Version 0.1.0.

