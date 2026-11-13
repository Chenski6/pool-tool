# Pool du CH — Draft Room (The Killer Whale)

Outil de repêchage et de gestion de saison pour la ligue Fantrax « Pool du CH » 2026-27
(8 équipes, tête-à-tête, serpentin, 6e choix).

## Ouvrir l'app

Ouvrir **`Pool-du-CH.html`** dans Chrome (ou Edge, Safari). Ce fichier contient toute l'app : il marche seul,
même copié ailleurs. Internet sert seulement pour la synchro Fantrax, les stats LNH et les polices.

`Pool-du-CH.html` est généré : après un changement dans `Draft Board.dc.html` ou un fichier `.js`,
relancer `python3 build.py` pour le refaire. (`Draft Board.dc.html` seul a besoin des autres fichiers
à côté de lui et télécharge React depuis unpkg.)

## Fichiers utilisés par l'app

| Fichier | Contenu |
|---|---|
| `Draft Board.dc.html` | L'app (tous les onglets) |
| `support.js` | Moteur qui fait tourner la page — ne pas modifier |
| `players.js` | Tableau des joueurs (tiré de `uploads/09-board-final-corrige.md`) + `NAME_ALIAS` |
| `fantrax.js` | ADP et rang Fantrax 2026-27 (même chose que `uploads/fantrax_adp_2026-27.csv`) |
| `volatility.js` | FP/PJ par saison, pics isolés, plancher et confiance |
| `lastdraft.js` | Repêchage 2025-26, pour profiler les adversaires |

`players.js` compte 251 joueurs, pas 250 : Jimmy Snuggerud (rang 123) a été ajouté après le fichier 09.

## Noms différents sur Fantrax

Si un joueur ne se relie pas aux données Fantrax parce que son prénom est écrit autrement
(ex. « Daniel Vladar » sur Fantrax, « Dan Vladar » dans le tableau), ajouter la paire dans
`window.NAME_ALIAS` au bas de `players.js` : `['nom Fantrax', 'nom du tableau']`.

## Dossiers

- `uploads/` — données sources et notes de passation (`LISEZMOI-passation.md` = point de départ).
  - `Fantrax-Players-Pool du CH (2).csv` = saison 2025-26 complète
  - `(3).csv` = début 2026-27 · `(4).csv` = 2026-27 environ une semaine plus tard (sans colonnes de stats)
- `screenshots/` — captures de l'onglet Ballottage (oct. 2026).
- `archive/` — anciennes versions, **plus à jour** : l'ancien jeu de 292 joueurs
  (`DATAPACK-FINAL-projections.csv`, en partie inventé), les consignes qui l'accompagnaient,
  l'audit qui l'a corrigé (résolu le 5 sept. 2026), et l'export Fantrax (1) quasi identique au (3).

## Fichiers mentionnés dans les notes mais absents

02 (gardiens), 03 (bios), 05 (top 250 NHL.com + changements d'équipe), 06 et 08 (anciens tableaux),
07 (courbe d'âge), `julien-watchlist.txt`, `HANDOFF-draft-tool-pool-du-ch.md`.
L'app n'en a pas besoin : leurs résultats sont déjà dans les fichiers `.js`.
