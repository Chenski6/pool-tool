# Audit des données — Draft Board Pool du CH 2026-27
Dernière passe : 5 août 2026

> **RÉSOLU le 5 septembre 2026.** Le board tourne maintenant sur le **fichier 09-board-final-corrige.md**
> (250 joueurs) au lieu du CSV. Ce que ça règle : âges réels pour tous (API LNH), défenseurs manquants
> présents (Matheson, Rielly, Byram, Provorov, Jones…) donc baseline D revérifiée à #49, gardiens rebasés
> sur la profondeur d'équipe (Wallstedt 240e → 49e), Matthews et Barkov reprojetés, matchs attendus tirés
> de l'historique + règles de rôle + fichier blessures.
> Ce qui reste faux, maintenant affiché dans l'outil (panneau « Ce que le modèle ne sait pas ») :
> plancher des jeunes promus = pari, postes de partant non confirmés, aucun trio/PP, tours du chapeau à
> zéro, courbe d'âge trop gentille après 33 ans, Barkov/Pietrangelo = ajouts manuels.
> `ceiling`, `breakout` et `adp_league` ont été **retirés** : ils n'existent pas dans les nouvelles données.
> Le consensus public est désormais le **top 250 de NHL.com (2026-09-02)** — aucune ADP Fantrax n'existe encore.

## Verdict
La consigne d'origine disait « Ne recalcule pas les stats — elles sont vérifiées. »
**Elles ne le sont pas.** Le CSV source contient des champs de remplissage, et 5 joueurs
ont été inventés en aval (absents du CSV).

---

## A. Ce qui est CORRECT (vérifié, ne pas toucher)

| Élément | État |
|---|---|
| `fp_2526` / `fpg_2526` des 292 joueurs du CSV | Réels (Fantrax), fiables |
| Baseline VORP | **Correcte** — F 142 / D 95.9 / G 103.4 = rang de remplacement exact pour 8 équipes × (9F/6D/2G) |
| Scoring de la ligue | Correctement appliqué |
| Ordre du snake (8 équipes, slot 6) | Correct |

## B. Ce qui est CASSÉ

### B1. `age` — 260 des 292 valent 27
Valeur de remplissage, pas l'âge réel. La courbe d'âge de la projection
(≤23 → ×1.06, 33+ → ×0.90) **ne fait donc rien pour 88 % du board**.

### C2. `fp_proj` n'est pas une projection
`fp_proj = fp_2526 × multiplicateur d'âge`. Comme l'âge est faux pour 88 % des joueurs,
**`fp_proj` = la saison dernière, renommée**. Aucun modèle de rôle, d'usage, de
changement d'équipe, ni de régression.

### B3. `ceiling` — 270 des 292 sont identiques à `fp_proj`
La colonne « Plafond » est vide de signal pour 92 % du board.

### B4. `injury` — 5 joueurs flaggés sur 292
Bedard, Jarvis, Landeskog, Tkachuk, Barkov. Tous les autres = « Low » par défaut.
Pour un outil de draft, c'est le trou le plus dangereux.

### B5. `adp_league` n'est pas ajusté
Identique à `fantrax_adp` pour **167 des 180** joueurs qui ont un ADP public.
Or `edge = adp_league − value_rank` alimente les panneaux 💎 VOLS et 🔥 PIÈGES.
Ces deux panneaux reposent donc sur un ajustement qui n'existe presque pas.

### B6. `edge` est structurellement trompeur
Pour un blessé, l'écart ne mesure pas une inefficacité de marché — il répète juste
« il est blessé » (Jarvis −196). Un vrai vol et un blessé se ressemblent dans la colonne.

### B7. Joueurs manquants
Absents du pool : **Matheson, Rielly, Byram, Provorov, Seth Jones, Slavin, Pesce, Dumba**
(liste non exhaustive — vérifiée sur les D seulement).
78 D pour 48 partants. Un pool de D incomplet **abaisse artificiellement la baseline D49**,
ce qui **gonfle le VORP de tous les défenseurs** — c'est la cause probable de la
« falaise des D » et du fait que la projection empilait 6 D en début de draft.

### B8. 5 joueurs inventés (absents du CSV)
| Joueur | Problème |
|---|---|
| **Auston Matthews** | **CORRIGÉ.** Était fp 198.4 → proj 225.7 (+14 %) au rang #9. Réel 25-26 : 53 pts en 60 MJ (27B, 26A, 227 tirs, 81 blocs, 42 mises en échec) ≈ **138 FP**, pas 198. Déchirure MCL grade 3, 2e saison écourtée de suite. Reprojeté : 70 MJ, 178.5 FP, plafond 226 → **#55**. |
| Brandon Bussi (G) | Inventé, classé #32. Non vérifié. |
| Mark Stone | Inventé. Âge 27 (faux, il a 34 ans). |
| Porter Martone | fp_2526 = 0 (n'a pas joué). Projection = pure supposition. |
| Konsta Helenius | fp 34 → proj 109. Extrapolation ×3. |

Champ `src` ajouté à chaque joueur : `csv` | `est` | `corrected`.

---

## C. Plan de correction — logique avant interface

**Passe 1 — déterministe (faite)**
- [x] Baseline VORP vérifiée contre la vraie structure de la ligue
- [x] `value_rank` reconstruit depuis le VORP (109 rangs étaient incohérents)
- [x] VORP recalculé pour les 5 joueurs édités à la main (rangs périmés, Husso était 121 rangs trop haut)
- [x] Matthews reprojeté sur son vrai box score
- [x] Demidov reprojeté (62 pts recrue, PP1, 1er chez les recrues en pts d'avantage numérique)
- [x] Provenance `src` sur chaque joueur

**Passe 2 — nécessite de VRAIES données (bloquée)**
- [ ] Âges réels des 260 joueurs
- [ ] Joueurs manquants (surtout les D) → rebaseline le VORP des D
- [ ] Statut de blessure réel à l'échelle du pool
- [ ] Vrai `adp_league` (ou retirer la notion et n'afficher que l'ADP public)

**Passe 3 — modèle de projection**
- [ ] Remplacer « saison dernière × âge » par : moyenne pondérée 3 ans, ajustement de rôle/usage,
      régression du % de tirs, courbe d'âge réelle, MJ attendus selon l'historique de blessures
- [ ] Plafond/plancher réels (percentiles), pas une copie

**Passe 4 — interface** (rien avant que 1-3 soient réglées)

---

## D. Ce dont j'ai besoin de toi
La passe 2 ne peut pas être devinée sans fabriquer des chiffres.
Le mieux : **un nouvel export Fantrax** avec âge, MJ, et tous les joueurs disponibles
(pas seulement 292). Sinon je peux chercher joueur par joueur, mais c'est lent
et je ne couvrirai pas 292 joueurs de façon fiable.
