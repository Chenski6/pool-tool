# LISEZMOI — note de passation

**Date : 2026-09-05.** Pool du CH, Fantrax, 8 équipes, serpentin, Julien choisit 6e sur 8.
Saison 2026-27 à **84 matchs**.

## Pointage exact de la ligue

Patineurs : but 2 · passe 1,5 · tir 0,1 · bloc 0,25 · mise en échec 0,1 · +/− 0,25 ·
but en infériorité 1 · passe en infériorité 0,5 · tour du chapeau 2 · **avantage numérique 0 ·
minutes de pénalité 0**

Gardiens : victoire 2,4 · arrêt 0,13 · blanchissage 2,75 · but alloué −1 · passe 3

## Les fichiers, et lequel sert à quoi

| fichier | contenu | à charger ? |
|---|---|---|
| **09-board-final-corrige.md** | Le tableau de repêchage. 250 joueurs classés, avec projections, VORP, rang NHL.com et écart. | **OUI — c'est le fichier principal** |
| **04-blessures-roles.md** | 18 joueurs blessés ou avec changement de rôle | **OUI** |
| **00-rapport.md** | Couverture, sources, trous connus, avertissements | **OUI** |
| 05-adp-et-contexte.md | Top 250 NHL.com + 186 changements d'équipe vérifiés | Si tu veux le détail des transactions |
| 07-courbe-age-et-projections.md | La courbe d'âge et sa méthode | Seulement pour comprendre le calcul |
| 01, 02, 03 | Données brutes LNH : 715 patineurs, 72 gardiens, 787 bios | Seulement si l'agent doit **recalculer** |
| 06, 08 | **PÉRIMÉS.** Remplacés par le 09. | **NON** |

## Comment le classement du fichier 09 est construit

```
points fantasy par match 2025-26  (pointage exact, données officielles LNH)
  × multiplicateur d'âge          (courbe calculée sur 974 transitions réelles)
  × matchs attendus               (historique + règles de rôle + fichier 04)
  = projection, puis VORP contre le remplaçant à la position
```

Seuils de remplacement pour 8 équipes × 9F/6D/2G : **F #73, D #49, G #17**.

## CE QUE L'AGENT SUIVANT DOIT SAVOIR AVANT DE TOUCHER À ÇA

**1. JOINS SUR LES ACCENTS INTACTS.** NHL.com écrit « Stutzle », l'API écrit « Tim Stützle ».
Pareil pour Slafkovský, Lafrenière, et « John-Jason Peterka » (que NHL.com appelle JJ Peterka).
Une normalisation des accents fait disparaître ces joueurs **sans message d'erreur**.

**2. LE PLANCHER DES JEUNES PROMUS EST UN PARI, PAS UNE MESURE.** Chernyshov, Perreault,
Gridin, Parekh, Rinzel et Misa reçoivent 76 matchs attendus alors qu'ils en ont joué 23 à 46.
Le modèle suppose qu'ils ont gagné leur place. **À revalider avec les alignements de camp.**

**3. L'ORDRE DES GARDIENS VIENT DU CLASSEMENT NHL.COM, PAS D'UNE ANNONCE D'ÉQUIPE.**
Aucun poste de partant n'est confirmé. Edmonton est le pire cas : trois gardiens, Andersen blessé.

**4. AUCUN TRIO NI UNITÉ D'AVANTAGE NUMÉRIQUE N'EST DANS LE MODÈLE.** Daily Faceoff les publie
pendant le camp.

**5. LES TOURS DU CHAPEAU VALENT ZÉRO PARTOUT.** Aucune source ne les publie. Sous-estime les
gros buteurs d'environ 6 à 10 points sur la saison. Marge d'erreur connue, non corrigée.

**6. LA COURBE D'ÂGE EST TROP OPTIMISTE APRÈS 33 ANS** (biais de survie). Sois plus sévère.

**7. BARKOV ET PIETRANGELO SONT DES AJOUTS MANUELS** basés sur 2024-25, avec une pénalité de
retour d'absence de ×0,92 qui est une **estimation assumée**.

**8. NE JAMAIS AFFIRMER UNE STATISTIQUE SANS L'AVOIR VÉRIFIÉE.** Tout dans les fichiers 01 à 03
vient de l'API officielle de la LNH, traité par script, jamais recopié de mémoire. Si une valeur
manque, elle est marquée `NA`. Garde cette règle.

## Ce qui reste à faire, et quand

- **La veille du repêchage** : trios et unités d'avantage numérique (Daily Faceoff), partants
  confirmés au filet, corriger les matchs attendus des jeunes promus.
- **Quand elles sortiront** : les vraies ADP Fantrax / Yahoo / ESPN. Elles n'existent pas encore.
- **Optionnel** : les statuts de contrat (PuckPedia), absents partout.

## Les trois angles stratégiques que les données confirment

1. **Les défenseurs sont sous-évalués.** Les blocs à 0,25 pt sont ignorés par le marché.
   Gostisbehere (+119 rangs contre NHL.com), McAvoy (+118), Carlson (+86), Seider (+58).
2. **Les défenseurs vieillissent mieux que les attaquants.** À 28 ans un attaquant décline
   (×0,969), un défenseur tient encore (×1,011).
3. **Les gardiens se paient au volume d'arrêts, pas à la moyenne.** Le marché juge Vejmelka
   sur sa moyenne ; toi tu encaisses ses 1458 arrêts.
