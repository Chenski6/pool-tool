# 🐋 ORDRES POUR CLAUDE DESIGN — Draft Tool Pool du CH 2026-27
## À coller dans Claude Design avec le fichier DATAPACK-FINAL-projections.csv

---

## CE QUE TU CONSTRUIS
Un **outil de draft interactif** (draft board live) pour un pool de hockey fantasy Fantrax, 8 équipes, format H2H, saison NHL 2026-27. L'utilisateur (Julien, équipe « The killer whale ») drafte **6e sur 8** en snake. Ses picks : R1#6, R2#11, R3#22, R4#27, R5#38, R6#43, R7#54, R8#59, R9#70, R10#75, R11#86, R12#91, puis +8/+8 en alternance.

Le but : un outil **magnifique, dense en données, utilisable en direct pendant le draft sur mobile et desktop**, qui dit à Julien exactement qui prendre à chaque pick.

## LES DONNÉES (fichier CSV joint — 292 joueurs, réels)
Chaque joueur a : `value_rank` (rang de valeur selon le scoring EXACT de la ligue), `name`, `team`, `pos` (F/D/G), `age`, `fp_2526` (points fantasy RÉELS 2025-26, exacts au centième depuis Fantrax), `fpg_2526` (par match), `gp_proj` / `fpg_proj` / `fp_proj` (projection 2026-27), `ceiling` (plafond breakout), `vorp` (valeur au-dessus du remplaçant), `breakout` (score 0-100), `injury` (flag + note), `fantrax_adp` (ADP public réel), `adp_league` (ADP ajusté aux biais de CETTE ligue), `edge` (adp_league − value_rank : **positif = vol, négatif = piège**).

**Ne recalcule pas les stats — elles sont vérifiées.** Ton job = les afficher magnifiquement et rendre l'outil interactif.

## SCORING DE LA LIGUE (déjà appliqué dans les données, pour référence)
Patineurs : buts 2 · passes 1.5 · tirs 0.1 · blocs 0.25 · hits 0.1 · +/− 0.25 · but inf.num. 1 · passe inf.num. 0.5 · tour du chapeau 2 · **PP 0 · PIM 0**. Gardiens : victoire 2.4 · arrêt 0.13 · blanchissage 2.75 · but alloué −1 · passe 3.

---

## LES 4 INSIGHTS QUI DOIVENT SAUTER AUX YEUX (le cœur de l'outil)

1. **Falaise des défenseurs.** Top 3 D (Bouchard 210, Makar 202, Werenski 191) puis chute de 14 pts. Un D à 2.0 FP/PJ vaut un attaquant à ~2.40 (écart positionnel +0.40). RÈGLE : viser 1 D du top-3 en ronde 2-3. Après, plateau D4-D10 interchangeable. Affiche une **alerte visuelle de falaise**.

2. **Gardien = Vasilevskiy seul, puis stratégie « tôt ou très tard ».** Vasilevskiy 184 FP (seul, +51 sur le 2e). Ensuite tier volume. **Les 3 plus gros vols du draft sont des gardiens** : Wedgewood (edge +197), Daccord (+196), Luukkonen (+176) — ~2.4-2.6 FP/PJ disponibles en ronde 15+. Message clé à afficher : « Prends Vasy tôt OU vole 2 gardiens de volume en rondes 10-14. Jamais le milieu. »

3. **Vols = ta monnaie.** Trie par `edge`. Les gros : Wedgewood, Daccord, Luukkonen (G) ; Samuelsson, Faber, Weegar, Hedman, Andersson (D grinders sous-cotés — les blocs/hits comptent) ; Swayman, Sorokin. Panneau « 💎 VOLS » toujours visible.

4. **Pièges = taxe MTL + noms + blessés.** Bedard sort #29 mais blessé jusqu'en novembre (vaut #132 santé incluse). Demidov/MTL surcotés par la taxe de cette ligue. Jarvis blessé 4-6 mois. Panneau « 🔥 PIÈGES ».

---

## FONCTIONS REQUISES (par priorité)

### Vue principale : tableau de draft triable
Colonnes : rang valeur · nom · pos (pastille couleur : F cyan, D violet, G ambre) · équipe · âge · **FP 25-26 réel** · **FP/PJ** (mets-le en évidence) · **FP projeté 2026-27** · plafond · VORP · ADP public · ADP ligue · **Écart (💎/🔥 coloré)** · flag blessure · flag breakout (🚀). Triable sur chaque colonne. Recherche par nom/équipe. Filtre F/D/G.

### Système d'ÉTOILES / cibles (demande explicite de Julien — important)
Chaque joueur a une **étoile cliquable** (☆ vide → ★ pleine dorée) directement sur sa ligne, toujours accessible d'un tap, même en plein défilement.
- Cliquer l'étoile ajoute/retire le joueur de sa liste d'intérêt. L'état est **persistant pendant toute la session de draft** (ne se perd pas au tri, au filtre ou au scroll).
- Les joueurs étoilés sont **surlignés** dans le tableau (bordure ou fond doré subtil) pour les repérer instantanément.
- **Panneau « ⭐ MES CIBLES » dédié** (repliable, épinglé) qui liste uniquement les joueurs étoilés, triés par ADP ligue (celui qui va partir en premier en haut). Chaque entrée montre : nom, pos, VORP, et **dans combien de picks il risque de partir** vs le prochain pick de Julien.
- **Alerte de disparition** : si un joueur étoilé a un `adp_league` inférieur au prochain overall de Julien, badge rouge « ⚠️ va partir avant ton tour — prends-le maintenant ou perds-le ».
- Quand un joueur étoilé est marqué drafté (par n'importe qui), il reste visible dans le panneau mais barré/grisé, avec un tag « pris par un autre » — pour que Julien voie ce qu'il a manqué et ajuste.
- Optionnel bonus : niveaux d'étoile (1 tap = intérêt ⭐, 2 taps = priorité haute 🔥⭐) pour hiérarchiser ses cibles.
- Précharger en étoilés la watchlist de Julien (Martone, Matthews, Stone, Frondell, Helenius).
- Compteur d'étoiles visible dans l'en-tête (ex. « 12 cibles »).

### Mode draft LIVE (le plus important)
- Bouton « drafté » sur chaque joueur (grise la ligne, recalcule le meilleur dispo).
- L'étoile ★ (voir section ci-dessus) sert de système de cibles.
- Panneau « MON ROSTER » : compteur 9F / 6D / 2G + 6 banc, cases qui se remplissent.
- Panneau « TES PROCHAINS PICKS » : les overall de Julien (rang 6), avec le prochain surligné.
- Panneau « MEILLEUR DISPO » par position, trié VORP, mis à jour en direct.
- **Probabilité de survie** : pour le prochain pick de Julien, indique quels joueurs ciblés risquent de partir (ceux dont adp_league < prochain pick overall) → badge « prends-le MAINTENANT » rouge.

### Panneaux d'insight (toujours visibles ou repliables)
- 💎 VOLS (top edge positif, non draftés)
- 🔥 PIÈGES (edge négatif, ADP tôt)
- ⚠️ Alerte falaise D (quand il reste ≤1 D du top-3)
- 🥅 Compteur gardiens (combien de tier-2 encore dispo)

### Graphiques
- Nuage **ADP ligue (x) vs VORP (y)** : coin haut-droite = vols. Taille des points = FP projeté, couleur = position.
- Barres top-20 VORP.

### Watchlist perso de Julien (à précharger comme étoilés ★)
Porter Martone (F-PHI, recrue), Auston Matthews (F-TOR), Mark Stone (F-VGK), Anton Frondell (F-CHI, sleeper), Konsta Helenius (F-BUF). Voir la section « Système d'étoiles » pour le comportement.

---

## DIRECTION VISUELLE
Sombre, dense, « war room » d'analyste pro. Fond ardoise/noir bleuté. Accents : cyan (F), violet (D), ambre (G), vert émeraude (vols), rouge/rose (pièges). Typo : sans-serif pour les titres, **chiffres en police mono** pour l'alignement des stats. Mobile-first (Julien drafte sur téléphone) : les colonnes clés (nom, pos, FP/PJ, VORP, écart, boutons) visibles sans scroll horizontal ; le reste en expansion sur tap. Interface en **français**.

## RÈGLES STRATÉGIQUES À ENCODER (afficher comme aide contextuelle)
- Rang 6 : attentes alternées courtes (5 picks) / longues (11 picks). Dans les longues attentes (R2→R3, R4→R5), sécurise ; dans les courtes, tu peux laisser filer.
- Les 2 nouveaux (rangs 7-8, juste après Julien) draftent au consensus public → Julien peut attendre sur les vols que le consensus sous-cote (grinders D, gardiens volume) et doit devancer les autres seulement sur les joueurs que le consensus surcote.
- Redraft complet (pas keeper).

---

## FICHIERS DE RÉFÉRENCE (même dossier)
- `DATAPACK-FINAL-projections.csv` — LES DONNÉES (292 joueurs). **C'est ta source unique.**
- `datapack-fantrax-exact-MERGED.csv` — FP bruts exacts (backup).
- `julien-watchlist.txt` — favoris à précharger.
- `HANDOFF-draft-tool-pool-du-ch.md` — contexte complet du projet si besoin.

**Première action dans Claude Design : lis le CSV, confirme le nombre de joueurs et les colonnes, puis construis la vue tableau + le mode live. Montre une première version, puis itère sur le visuel.**
