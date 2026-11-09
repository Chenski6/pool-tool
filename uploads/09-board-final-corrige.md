# 09 — Tableau final corrigé (rôles réglés)

**Généré le 2026-09-05. Ce fichier remplace le 06 et le 08.**

## Ce qui a été réglé

Le fichier 08 avait un trou : il projetait les matchs à partir de l'an dernier seulement, donc il ne voyait aucun changement de rôle. Trois règles corrigent ça.

### Règle 1 — Gardiens : profondeur d'équipe, pas historique

Les gardiens sont regroupés **par équipe réelle 2026-27** (donnée vérifiée de l'API). Dans chaque équipe, l'ordre vient du classement NHL.com. Ensuite :

- **Partant d'équipe** : le **plus grand** entre ses départs historiques et 52. Un auxiliaire promu monte à 52 ; un gros travailleur garde son volume réel.
- **Auxiliaire** : le **plus petit** entre son historique et 26. Pas de cadeau.
- **Troisième gardien** : 8 départs.

Effet : Wallstedt passe de 17 départs projetés à 52 et bondit du **240e au 49e rang**. Vasilevskiy garde ses **59 départs** au lieu d'être plafonné.

### Règle 2 — Jeunes promus (22 ans et moins)

Un joueur de 22 ans ou moins qui a joué moins de 65 matchs, **sans blessure signalée**, et qui a un rang NHL.com ou une saison de 72+ matchs derrière lui : plancher de **76 matchs**. Il était rappelé en cours de saison, il ne l'est plus.

### Règle 3 — Vétérans durables, année écourtée

Un joueur qui a déjà tenu **72 matchs ou plus** dans une des deux dernières saisons, sans blessure signalée, ne descend pas sous **74 matchs**. Une seule saison écourtée ne fait pas de lui un joueur fragile.

**Important : le plancher ne s'applique PAS aux joueurs marginaux.** Un joueur qui n'a jamais dépassé 72 matchs et n'a aucun rang NHL.com garde son historique. C'est ce qui empêche le modèle de gonfler artificiellement les navetteurs de la ligue mineure.

### Règle 4 — Sans équipe

**52 joueurs n'ont aucune équipe** selon la LNH au 5 septembre. Matchs attendus = 0. Ils sortent du tableau.

---

## ⚠️ CE QUI RESTE CASSÉ — À RÉGLER TOI-MÊME AVANT LE REPÊCHAGE

**PROBLÈME 1 — LE PLANCHER DES JEUNES PROMUS EST UN PARI, PAS UNE MESURE.**
Igor Chernyshov passe de 29 matchs joués à 76 attendus et grimpe de 470 rangs. Le modèle suppose qu'il a gagné sa place parce que NHL.com le classe. **SI TU NE VOIS PAS SON NOM DANS L'ALIGNEMENT AU CAMP, CETTE PROJECTION EST FAUSSE.** Même avertissement pour Gabe Perreault, Matvei Gridin, Zayne Parekh, Sam Rinzel et Michael Misa.

**PROBLÈME 2 — L'ORDRE DES GARDIENS VIENT DE NHL.COM, PAS D'UNE ANNONCE D'ÉQUIPE.**
Le modèle décide qui est partant en se fiant au classement public. **PERSONNE N'A ENCORE CONFIRMÉ CES POSTES.** Le cas d'Edmonton est le pire : trois gardiens annoncés (Jarry, Andersen, Levi), Andersen blessé, aucun partant désigné. **VÉRIFIE LES ANNONCES DE CAMP AVANT DE REPÊCHER UN GARDIEN.**

**PROBLÈME 3 — AUCUN TRIO NI UNITÉ D'AVANTAGE NUMÉRIQUE N'EST DANS LE MODÈLE.**
Un joueur promu sur un premier trio n'est pas détecté. **DAILY FACEOFF PUBLIE LES TRIOS PENDANT LE CAMP — VA LES CHERCHER LA VEILLE DE TON REPÊCHAGE.**

**PROBLÈME 4 — LES TOURS DU CHAPEAU VALENT TOUJOURS ZÉRO.**
Aucune source ne les publie. Ça sous-estime les gros buteurs d'environ 6 à 10 points sur la saison. **MARGE D'ERREUR CONNUE, PAS CORRIGÉE.**

**PROBLÈME 5 — LA COURBE D'ÂGE EST TROP GENTILLE APRÈS 33 ANS.**
Biais de survie : les vétérans qui déclinent fort sortent de l'échantillon. **SOIS PLUS SÉVÈRE QUE LE TABLEAU POUR TOUT JOUEUR DE 34 ANS ET PLUS.**

**PROBLÈME 6 — RÉGLÉ.** Barkov et Pietrangelo sont maintenant dans le tableau, projetés depuis leur
**saison 2024-25 réelle** (dernière qu'ils ont jouée), avec deux ans de vieillissement appliqués et une
pénalité de retour d'absence complète de **×0,92** — cette pénalité est **mon estimation assumée**, pas
une mesure. Leur ligne porte la mention `AJOUT MANUEL (base 2024-25)`.

---

## Ce que les corrections changent

| joueur | pos | rang avant | rang après | matchs | règle appliquée |
|---|---|---|---|---|---|
| Igor Chernyshov | F | 635 | **165** | 29 → 76 | JEUNE PROMU (plancher 76) |
| Gabe Perreault | F | 668 | **312** | 32 → 76 | JEUNE PROMU (plancher 76) |
| Matvei Gridin | F | 631 | **320** | 38 → 76 | JEUNE PROMU (plancher 76) |
| Zayne Parekh | D | 624 | **378** | 23 → 76 | JEUNE PROMU (plancher 76) |
| Sam Rinzel | D | 524 | **284** | 37 → 76 | JEUNE PROMU (plancher 76) |
| Ivan Demidov | F | 426 | **187** | 51 → 74 | DURABLE, année écourtée (plancher 74) |
| Ryan Leonard | F | 463 | **224** | 50 → 74 | DURABLE, année écourtée (plancher 74) |
| Tyson Foerster | F | 398 | **162** | 51 → 74 | DURABLE, année écourtée (plancher 74) |
| Kyle Palmieri | F | 509 | **273** | 49 → 74 | DURABLE, année écourtée (plancher 74) |
| Michael Misa | F | 582 | **361** | 46 → 76 | JEUNE PROMU (plancher 76) |
| Anthony Mantha | F | 385 | **191** | 55 → 74 | DURABLE, année écourtée (plancher 74) |
| Jesper Wallstedt | G | 240 | **49** | 17 → 52 | #1 MIN |
| Justin Sourdif | F | 562 | **377** | 48 → 74 | DURABLE, année écourtée (plancher 74) |
| Pierre-Luc Dubois | F | 536 | **353** | 51 → 74 | DURABLE, année écourtée (plancher 74) |
| Matthew Robertson | D | 487 | **307** | 45 → 74 | DURABLE, année écourtée (plancher 74) |
| Carter Hart | G | 378 | **203** | 14 → 52 | #1 VGK |

## Gardiens — classement corrigé

| rang | gardien | équipe | rang d'équipe | départs | projection | rang NHL | écart |
|---|---|---|---|---|---|---|---|
| 27 | Scott Wedgewood | COL | 1 | 52 | 154 | 54 | +27 |
| 31 | Andrei Vasilevskiy | TBL | 1 | 59 | 152 | 13 | -18 |
| 45 | Logan Thompson | WSH | 1 | 59 | 139 | 26 | -19 |
| 49 | Jesper Wallstedt | MIN | 1 | 52 | 136 | 55 | +6 |
| 65 | Ilya Sorokin | NYI | 1 | 55 | 128 | 28 | -37 |
| 71 | Ukko-Pekka Luukkonen | BUF | 1 | 52 | 124 | 150 | +79 |
| 73 | Jake Oettinger | DAL | 1 | 55 | 123 | 41 | -32 |
| 74 | Brandon Bussi | CAR | 1 | 52 | 123 | 79 | +5 |
| 76 | Joel Hofer | STL | 1 | 52 | 122 | 165 | +89 |
| 81 | Karel Vejmelka | UTA | 1 | 62 | 119 | 117 | +36 |
| 82 | Jeremy Swayman | BOS | 1 | 55 | 119 | 62 | -20 |
| 102 | John Gibson | DET | 1 | 58 | 113 | 206 | +104 |
| 106 | Jakub Dobes | MTL | 1 | 52 | 111 | 91 | -15 |
| 112 | Jet Greaves | CBJ | 1 | 54 | 109 | 172 | +60 |
| 115 | Igor Shesterkin | NYR | 1 | 52 | 108 | 42 | -73 |
| 133 | Dan Vladar | PHI | 1 | 52 | 100 | 166 | +33 |
| 139 | Philipp Grubauer | SEA | 1 | 52 | 98 | NA | NA |
| 150 | Jake Allen | NJD | 1 | 52 | 95 | 204 | +54 |
| 166 | Linus Ullmark | OTT | 1 | 52 | 91 | 151 | -15 |
| 179 | Spencer Knight | CHI | 1 | 56 | 89 | 187 | +8 |

## Tableau final — top 250

| rang | joueur | pos | équipe | âge | mult. âge | matchs | source des matchs | projection | VORP | rang NHL | écart |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Nathan MacKinnon | F | COL | 31 | 0.951 | 82 | historique | 274 | 137 | 2 | +1 |
| 2 | Macklin Celebrini | F | SJS | 20 | 1.120 | 79 | historique | 263 | 126 | 4 | +2 |
| 3 | Evan Bouchard | D | EDM | 26 | 1.019 | 84 | historique | 220 | 116 | 22 | +19 |
| 4 | Connor McDavid | F | EDM | 29 | 0.953 | 78 | historique | 253 | 115 | 1 | -3 |
| 5 | Nikita Kucherov | F | TBL | 33 | 0.921 | 79 | historique | 251 | 114 | 3 | -2 |
| 6 | Cale Makar | D | COL | 27 | 1.019 | 79 | historique | 203 | 100 | 8 | +2 |
| 7 | Lane Hutson | D | MTL | 22 | 1.055 | 84 | historique | 196 | 93 | 25 | +18 |
| 8 | Zach Werenski | D | CBJ | 29 | 0.995 | 79 | historique | 196 | 93 | 12 | +4 |
| 9 | Matt Boldy | F | MIN | 25 | 1.047 | 80 | historique | 224 | 86 | 10 | +1 |
| 10 | Martin Necas | F | COL | 27 | 0.996 | 80 | historique | 221 | 84 | 14 | +4 |
| 11 | Nick Suzuki | F | MTL | 27 | 0.996 | 84 | historique | 221 | 83 | 15 | +4 |
| 12 | Jason Robertson | F | DAL | 27 | 0.996 | 84 | historique | 219 | 82 | 9 | -3 |
| 13 | Moritz Seider | D | DET | 25 | 1.019 | 84 | historique | 183 | 80 | 76 | +63 |
| 14 | Cole Caufield | F | MTL | 25 | 1.047 | 83 | historique | 215 | 78 | 20 | +6 |
| 15 | Matthew Schaefer | D | NYI | 19 | 1.092 | 84 | historique | 176 | 72 | 40 | +25 |
| 16 | David Pastrnak | F | BOS | 30 | 0.953 | 81 | historique | 209 | 71 | 6 | -10 |
| 17 | Rasmus Dahlin | D | BUF | 26 | 1.019 | 77 | historique | 174 | 71 | 39 | +22 |
| 18 | Wyatt Johnston | F | DAL | 23 | 1.063 | 84 | historique | 207 | 70 | 16 | -2 |
| 19 | Tim Stützle | F | OTT | 24 | 1.054 | 83 | historique | 206 | 69 | 49 | +30 |
| 20 | Darren Raddysh | D | TOR | 30 | 0.988 | 75 | historique | 169 | 65 | 53 | +33 |
| 21 | Jakob Chychrun | D | WSH | 28 | 1.011 | 79 | historique | 164 | 61 | 64 | +43 |
| 22 | Leon Draisaitl | F | EDM | 30 | 0.953 | 69 | historique | 195 | 58 | 5 | -17 |
| 23 | Jake Sanderson | D | OTT | 24 | 1.029 | 74 | historique | 161 | 58 | 63 | +40 |
| 24 | Quinn Hughes | D | MIN | 26 | 1.019 | 74 | DURABLE, année écourtée (plancher 74) | 161 | 57 | 11 | -13 |
| 25 | Jack Eichel | F | VGK | 29 | 0.953 | 77 | historique | 194 | 57 | 19 | -6 |
| 26 | Mark Scheifele | F | WPG | 33 | 0.921 | 84 | historique | 194 | 57 | 32 | +6 |
| 27 | Scott Wedgewood | G | COL | 34 | 1.000 | 52 | #1 COL | 154 | 56 | 54 | +27 |
| 28 | Adam Fox | D | NYR | 28 | 1.011 | 74 | DURABLE, année écourtée (plancher 74) | 157 | 54 | 77 | +49 |
| 29 | Alex DeBrincat | F | DET | 28 | 0.969 | 84 | historique | 191 | 53 | 48 | +19 |
| 30 | Kyle Connor | F | WPG | 29 | 0.953 | 84 | historique | 191 | 53 | 29 | -1 |
| 31 | Andrei Vasilevskiy | G | TBL | 32 | 1.000 | 59 | #1 TBL | 152 | 53 | 13 | -18 |
| 32 | Juraj Slafkovský | F | MTL | 22 | 1.068 | 83 | historique | 189 | 52 | 50 | +18 |
| 33 | Brock Faber | D | MIN | 24 | 1.029 | 81 | historique | 154 | 50 | 95 | +62 |
| 34 | Jake Guentzel | F | TBL | 31 | 0.951 | 83 | historique | 188 | 50 | 35 | +1 |
| 35 | Cutter Gauthier | F | ANA | 22 | 1.068 | 80 | historique | 184 | 46 | 31 | -4 |
| 36 | Mikhail Sergachev | D | UTA | 28 | 1.011 | 79 | historique | 149 | 46 | 116 | +80 |
| 37 | Jackson LaCombe | D | ANA | 25 | 1.019 | 81 | historique | 149 | 46 | 90 | +53 |
| 38 | Miro Heiskanen | D | DAL | 27 | 1.019 | 74 | DURABLE, année écourtée (plancher 74) | 149 | 46 | 89 | +51 |
| 39 | Brandon Hagel | F | TBL | 28 | 0.969 | 77 | historique | 182 | 45 | 38 | -1 |
| 40 | Tage Thompson | F | BUF | 28 | 0.969 | 81 | historique | 182 | 45 | 30 | -10 |
| 41 | Connor Bedard | F | CHI | 21 | 1.087 | 74 | fichier 04 | 181 | 44 | 68 | +27 |
| 42 | Noah Dobson | D | MTL | 26 | 1.019 | 78 | historique | 146 | 43 | 146 | +104 |
| 43 | Clayton Keller | F | UTA | 28 | 0.969 | 84 | historique | 180 | 43 | 44 | +1 |
| 44 | Kirill Kaprizov | F | MIN | 29 | 0.953 | 74 | DURABLE, année écourtée (plancher 74) | 178 | 41 | 7 | -37 |
| 45 | Logan Thompson | G | WSH | 29 | 1.000 | 59 | #1 WSH | 139 | 41 | 26 | -19 |
| 46 | Brady Tkachuk | F | FLA | 27 | 0.996 | 74 | DURABLE, année écourtée (plancher 74) | 178 | 40 | 21 | -25 |
| 47 | Rasmus Andersson | D | VGK | 29 | 0.995 | 83 | historique | 143 | 39 | 191 | +144 |
| 48 | Dylan Guenther | F | UTA | 23 | 1.063 | 77 | historique | 175 | 38 | 33 | -15 |
| 49 | Jesper Wallstedt | G | MIN | 23 | 1.000 | 52 | #1 MIN | 136 | 38 | 55 | +6 |
| 50 | Jack Hughes | F | NJD | 25 | 1.047 | 63 | historique | 175 | 38 | 18 | -32 |
| 51 | Josh Morrissey | D | WPG | 31 | 0.973 | 80 | historique | 140 | 37 | 148 | +97 |
| 52 | Alex Tuch | F | WSH | 30 | 0.953 | 82 | historique | 174 | 36 | 107 | +55 |
| 53 | Charlie McAvoy | D | BOS | 28 | 1.011 | 63 | historique | 140 | 36 | 131 | +78 |
| 54 | Adrian Kempe | F | LAK | 30 | 0.953 | 83 | historique | 173 | 36 | 47 | -7 |
| 55 | Mattias Samuelsson | D | BUF | 26 | 1.019 | 74 | DURABLE, année écourtée (plancher 74) | 138 | 35 | 207 | +152 |
| 56 | Filip Forsberg | F | NSH | 32 | 0.945 | 84 | historique | 172 | 34 | 51 | -5 |
| 57 | Dylan Holloway | F | STL | 25 | 1.047 | 74 | DURABLE, année écourtée (plancher 74) | 171 | 34 | 58 | +1 |
| 58 | John Carlson | D | TBL | 36 | 0.889 | 76 | historique | 137 | 33 | 114 | +56 |
| 59 | Erik Karlsson | D | PIT | 36 | 0.889 | 80 | historique | 137 | 33 | 93 | +34 |
| 60 | Lucas Raymond | F | DET | 24 | 1.054 | 83 | historique | 170 | 33 | 75 | +15 |
| 61 | Brandt Clarke | D | LAK | 23 | 1.032 | 82 | historique | 136 | 33 | 145 | +84 |
| 62 | Leo Carlsson | F | ANA | 21 | 1.087 | 74 | historique | 168 | 31 | 34 | -28 |
| 63 | Mikko Rantanen | F | DAL | 29 | 0.953 | 74 | DURABLE, année écourtée (plancher 74) | 168 | 31 | 23 | -40 |
| 64 | Sebastian Aho | F | CAR | 29 | 0.953 | 81 | historique | 168 | 31 | 70 | +6 |
| 65 | Ilya Sorokin | G | NYI | 31 | 1.000 | 55 | #1 NYI | 128 | 30 | 28 | -37 |
| 66 | William Nylander | F | TOR | 30 | 0.953 | 74 | historique | 166 | 29 | 36 | -30 |
| 67 | Mika Zibanejad | F | NYR | 33 | 0.921 | 83 | historique | 166 | 28 | 65 | -2 |
| 68 | Nick Schmaltz | F | UTA | 30 | 0.953 | 84 | historique | 166 | 28 | 97 | +29 |
| 69 | Kirill Marchenko | F | CBJ | 26 | 1.023 | 79 | historique | 164 | 27 | 52 | -17 |
| 70 | Mitch Marner | F | VGK | 29 | 0.953 | 83 | historique | 163 | 26 | 56 | -14 |
| 71 | Ukko-Pekka Luukkonen | G | BUF | 27 | 1.000 | 52 | #1 BUF | 124 | 26 | 150 | +79 |
| 72 | Adam Fantilli | F | CBJ | 21 | 1.087 | 84 | historique | 162 | 25 | 61 | -11 |
| 73 | Jake Oettinger | G | DAL | 27 | 1.000 | 55 | #1 DAL | 123 | 24 | 41 | -32 |
| 74 | Brandon Bussi | G | CAR | 28 | 1.000 | 52 | #1 CAR | 123 | 24 | 79 | +5 |
| 75 | Andrei Svechnikov | F | CAR | 26 | 1.023 | 78 | historique | 161 | 24 | 102 | +27 |
| 76 | Joel Hofer | G | STL | 26 | 1.000 | 52 | #1 STL | 122 | 24 | 165 | +89 |
| 77 | Tom Wilson | F | WSH | 32 | 0.945 | 77 | historique | 161 | 24 | 83 | +6 |
| 78 | Dylan Cozens | F | OTT | 25 | 1.047 | 84 | historique | 160 | 22 | 136 | +58 |
| 79 | Shayne Gostisbehere | D | CAR | 33 | 0.973 | 62 | historique | 126 | 22 | 144 | +65 |
| 80 | Auston Matthews | F | TOR | 29 | 0.953 | 72 | fichier 04 | 159 | 22 | 17 | -63 |
| 81 | Karel Vejmelka | G | UTA | 30 | 1.000 | 62 | #1 UTA | 119 | 21 | 117 | +36 |
| 82 | Jeremy Swayman | G | BOS | 27 | 1.000 | 55 | #1 BOS | 119 | 21 | 62 | -20 |
| 83 | Travis Konecny | F | PHI | 29 | 0.953 | 81 | historique | 158 | 21 | 123 | +40 |
| 84 | Dylan Larkin | F | DET | 30 | 0.953 | 79 | historique | 158 | 20 | 66 | -18 |
| 85 | Pavel Dorofeyev | F | NYR | 25 | 1.047 | 84 | historique | 157 | 20 | 72 | -13 |
| 86 | Drake Batherson | F | OTT | 28 | 0.969 | 82 | historique | 156 | 19 | 74 | -12 |
| 87 | Jacob Trouba | D | SJS | 32 | 0.973 | 81 | historique | 122 | 19 | 217 | +130 |
| 88 | Thomas Chabot | D | OTT | 29 | 0.995 | 74 | DURABLE, année écourtée (plancher 74) | 122 | 18 | 208 | +120 |
| 89 | Artemi Panarin | F | LAK | 34 | 0.903 | 81 | historique | 155 | 18 | 46 | -43 |
| 90 | Justin Faulk | D | DET | 34 | 0.973 | 80 | historique | 121 | 18 | 224 | +134 |
| 91 | Beckett Sennecke | F | ANA | 20 | 1.120 | 84 | historique | 155 | 17 | 82 | -9 |
| 92 | Sam Malinski | D | COL | 28 | 1.011 | 82 | historique | 121 | 17 | 235 | +143 |
| 93 | Sidney Crosby | F | PIT | 39 | 0.901 | 75 | historique | 154 | 17 | 45 | -48 |
| 94 | Matthew Knies | F | TOR | 23 | 1.063 | 81 | historique | 154 | 17 | 110 | +16 |
| 95 | Thomas Harley | D | DAL | 25 | 1.019 | 75 | historique | 120 | 17 | 168 | +73 |
| 96 | Mark Stone | F | VGK | 34 | 0.903 | 64 | historique | 154 | 16 | 96 | +0 |
| 97 | Travis Sanheim | D | PHI | 30 | 0.988 | 83 | historique | 120 | 16 | NA | NA |
| 98 | Morgan Geekie | F | BOS | 28 | 0.969 | 81 | historique | 153 | 16 | 108 | +10 |
| 99 | Logan Cooley | F | UTA | 22 | 1.068 | 76 | JEUNE PROMU (plancher 76) | 153 | 15 | 81 | -18 |
| 100 | Mike Matheson | D | MTL | 32 | 0.973 | 81 | historique | 119 | 15 | 248 | +148 |
| 101 | Nico Hischier | F | NJD | 27 | 0.996 | 81 | historique | 152 | 15 | 67 | -34 |
| 102 | John Gibson | G | DET | 33 | 1.000 | 58 | #1 DET | 113 | 14 | 206 | +104 |
| 103 | Sam Reinhart | F | FLA | 30 | 0.953 | 74 | DURABLE, année écourtée (plancher 74) | 151 | 14 | 37 | -66 |
| 104 | Bowen Byram | D | CHI | 25 | 1.019 | 84 | historique | 117 | 13 | 164 | +60 |
| 105 | Sean Walker | D | CAR | 31 | 0.973 | 83 | historique | 116 | 13 | NA | NA |
| 106 | Jakub Dobes | G | MTL | 25 | 1.000 | 52 | #1 MTL | 111 | 13 | 91 | -15 |
| 107 | Alexander Nikishin | D | CAR | 24 | 1.029 | 83 | historique | 115 | 12 | 222 | +115 |
| 108 | Filip Hronek | D | VAN | 28 | 1.011 | 75 | historique | 115 | 12 | 189 | +81 |
| 109 | Bo Horvat | F | NYI | 31 | 0.951 | 75 | historique | 148 | 11 | 69 | -40 |
| 110 | Martin Fehervary | D | WSH | 26 | 1.019 | 83 | historique | 114 | 11 | NA | NA |
| 111 | Esa Lindell | D | DAL | 32 | 0.973 | 83 | historique | 114 | 10 | NA | NA |
| 112 | Jet Greaves | G | CBJ | 25 | 1.000 | 54 | #1 CBJ | 109 | 10 | 172 | +60 |
| 113 | Ryan O'Reilly | F | NSH | 35 | 0.901 | 82 | historique | 147 | 10 | 134 | +21 |
| 114 | MacKenzie Weegar | D | UTA | 32 | 0.973 | 82 | historique | 113 | 10 | 163 | +49 |
| 115 | Igor Shesterkin | G | NYR | 30 | 1.000 | 52 | #1 NYR | 108 | 9 | 42 | -73 |
| 116 | Jesper Bratt | F | NJD | 28 | 0.969 | 84 | historique | 146 | 9 | 80 | -36 |
| 117 | K'Andre Miller | D | CAR | 26 | 1.019 | 75 | historique | 112 | 9 | 241 | +124 |
| 118 | Robert Thomas | F | STL | 27 | 0.996 | 68 | historique | 146 | 8 | 57 | -61 |
| 119 | Alex Laferriere | F | LAK | 24 | 1.054 | 82 | historique | 145 | 8 | NA | NA |
| 120 | Brock Nelson | F | COL | 34 | 0.903 | 83 | historique | 145 | 8 | 112 | -8 |
| 121 | Simon Edvinsson | D | DET | 23 | 1.032 | 76 | historique | 110 | 6 | NA | NA |
| 122 | Roman Josi | D | NSH | 36 | 0.889 | 64 | historique | 110 | 6 | 94 | -28 |
| 123 | Ivan Provorov | D | CBJ | 29 | 0.995 | 84 | historique | 109 | 5 | NA | NA |
| 124 | Steven Stamkos | F | NSH | 36 | 0.901 | 84 | historique | 142 | 5 | 98 | -26 |
| 125 | Will Smith | F | SJS | 21 | 1.087 | 74 | DURABLE, année écourtée (plancher 74) | 142 | 5 | 59 | -66 |
| 126 | Bryan Rust | F | PIT | 34 | 0.903 | 74 | DURABLE, année écourtée (plancher 74) | 142 | 5 | 106 | -20 |
| 127 | Alexis Lafrenière | F | NYR | 24 | 1.054 | 84 | historique | 142 | 4 | 141 | +14 |
| 128 | Zach Hyman | F | EDM | 34 | 0.903 | 74 | DURABLE, année écourtée (plancher 74) | 141 | 4 | 71 | -57 |
| 129 | Darnell Nurse | D | SJS | 31 | 0.973 | 82 | historique | 106 | 3 | 218 | +89 |
| 130 | Pavel Zacha | F | BOS | 29 | 0.953 | 82 | historique | 140 | 2 | 135 | +5 |
| 131 | Rasmus Sandin | D | WSH | 26 | 1.019 | 78 | historique | 105 | 2 | NA | NA |
| 132 | Dougie Hamilton | D | NJD | 33 | 0.973 | 74 | historique | 105 | 2 | 147 | +15 |
| 133 | Dan Vladar | G | PHI | 29 | 1.000 | 52 | #1 PHI | 100 | 1 | 166 | +33 |
| 134 | Josh Manson | D | COL | 34 | 0.973 | 74 | DURABLE, année écourtée (plancher 74) | 104 | 1 | NA | NA |
| 135 | Brandon Montour | D | SEA | 32 | 0.973 | 74 | DURABLE, année écourtée (plancher 74) | 104 | 1 | 162 | +27 |
| 136 | Nikolaj Ehlers | F | CAR | 30 | 0.953 | 79 | historique | 138 | 1 | 104 | -32 |
| 137 | Owen Tippett | F | PHI | 27 | 0.996 | 78 | fichier 04 | 137 | 0 | NA | NA |
| 138 | Morgan Rielly | D | TOR | 32 | 0.973 | 82 | historique | 103 | 0 | NA | NA |
| 139 | Philipp Grubauer | G | SEA | 34 | 1.000 | 52 | #1 SEA | 98 | 0 | NA | NA |
| 140 | Aliaksei Protas | F | WSH | 25 | 1.047 | 78 | historique | 137 | -0 | 160 | +20 |
| 141 | Will Cuylle | F | NYR | 24 | 1.054 | 84 | historique | 137 | -0 | NA | NA |
| 142 | Adam Larsson | D | SEA | 33 | 0.973 | 84 | historique | 103 | -0 | NA | NA |
| 143 | Mattias Ekholm | D | EDM | 36 | 0.889 | 77 | historique | 103 | -0 | NA | NA |
| 144 | Aleksander Barkov | F | FLA | 31 | 0.908 | 70 | AJOUT MANUEL (base 2024-25) | 136 | -1 | 43 | -101 |
| 145 | Troy Terry | F | ANA | 29 | 0.953 | 72 | fichier 04 | 136 | -1 | NA | NA |
| 146 | Vladislav Gavrikov | D | NYR | 30 | 0.988 | 84 | historique | 102 | -1 | NA | NA |
| 147 | Rickard Rakell | F | PIT | 33 | 0.921 | 74 | DURABLE, année écourtée (plancher 74) | 136 | -2 | 101 | -46 |
| 148 | Trevor Zegras | F | PHI | 25 | 1.047 | 74 | DURABLE, année écourtée (plancher 74) | 136 | -2 | 127 | -21 |
| 149 | Gabriel Vilardi | F | WPG | 27 | 0.996 | 79 | historique | 136 | -2 | 128 | -21 |
| 150 | Shea Theodore | D | VGK | 31 | 0.973 | 70 | historique | 100 | -3 | 149 | -1 |
| 151 | Jake Allen | G | NJD | 36 | 1.000 | 52 | #1 NJD | 95 | -3 | 204 | +53 |
| 152 | Sam Bennett | F | FLA | 30 | 0.953 | 78 | historique | 134 | -3 | 109 | -43 |
| 153 | Mathew Barzal | F | NYI | 29 | 0.953 | 74 | DURABLE, année écourtée (plancher 74) | 134 | -3 | 122 | -31 |
| 154 | Anthony Cirelli | F | TBL | 29 | 0.953 | 76 | historique | 134 | -3 | 173 | +19 |
| 155 | Roope Hintz | F | DAL | 29 | 0.953 | 74 | DURABLE, année écourtée (plancher 74) | 134 | -3 | 84 | -71 |
| 156 | Mario Ferraro | D | WPG | 28 | 1.011 | 82 | historique | 99 | -4 | NA | NA |
| 157 | Vince Dunn | D | SEA | 29 | 0.995 | 75 | historique | 99 | -4 | 169 | +12 |
| 158 | Brent Burns | D | COL | 41 | 0.889 | 84 | historique | 99 | -4 | NA | NA |
| 159 | Quinton Byfield | F | LAK | 24 | 1.054 | 82 | historique | 133 | -5 | 103 | -56 |
| 160 | Ivan Barbashev | F | VGK | 30 | 0.953 | 79 | historique | 132 | -5 | 234 | +74 |
| 161 | Vincent Trocheck | F | UTA | 33 | 0.921 | 75 | historique | 132 | -5 | 130 | -31 |
| 162 | Jake McCabe | D | TOR | 32 | 0.973 | 76 | historique | 98 | -5 | NA | NA |
| 163 | Tyson Foerster | F | PHI | 24 | 1.054 | 74 | DURABLE, année écourtée (plancher 74) | 132 | -5 | 199 | +36 |
| 164 | Shane Pinto | F | OTT | 25 | 1.047 | 74 | DURABLE, année écourtée (plancher 74) | 132 | -5 | 247 | +83 |
| 165 | John Tavares | F | TOR | 36 | 0.901 | 81 | historique | 131 | -6 | 87 | -78 |
| 166 | Igor Chernyshov | F | SJS | 20 | 1.120 | 76 | JEUNE PROMU (plancher 76) | 131 | -6 | 193 | +27 |
| 167 | Linus Ullmark | G | OTT | 33 | 1.000 | 52 | #1 OTT | 91 | -7 | 151 | -16 |
| 168 | Matthew Tkachuk | F | FLA | 28 | 0.969 | 60 | fichier 04 | 130 | -7 | 24 | -144 |
| 169 | Seth Jarvis | F | CAR | 24 | 1.054 | 55 | fichier 04 | 130 | -8 | NA | NA |
| 170 | Lawson Crouse | F | UTA | 29 | 0.953 | 83 | historique | 130 | -8 | NA | NA |
| 171 | Jackson Blake | F | CAR | 23 | 1.063 | 83 | historique | 129 | -8 | 126 | -45 |
| 172 | Anton Lundell | F | FLA | 24 | 1.054 | 74 | DURABLE, année écourtée (plancher 74) | 129 | -8 | 219 | +47 |
| 173 | Noah Hanifin | D | VGK | 29 | 0.995 | 76 | historique | 95 | -8 | 242 | +69 |
| 174 | Oliver Ekman-Larsson | D | TOR | 35 | 0.955 | 79 | historique | 95 | -8 | NA | NA |
| 175 | Alex Ovechkin | F | WSH | 41 | 0.901 | 77 | historique | 129 | -8 | 99 | -76 |
| 176 | Matty Beniers | F | SEA | 23 | 1.063 | 84 | historique | 129 | -8 | NA | NA |
| 177 | Vasily Podkolzin | F | EDM | 25 | 1.047 | 84 | historique | 129 | -8 | NA | NA |
| 178 | Parker Wotherspoon | D | VGK | 29 | 0.995 | 74 | DURABLE, année écourtée (plancher 74) | 95 | -9 | NA | NA |
| 179 | Ryan Pulock | D | NYI | 31 | 0.973 | 77 | historique | 95 | -9 | NA | NA |
| 180 | Spencer Knight | G | CHI | 25 | 1.000 | 56 | #1 CHI | 89 | -9 | 187 | +7 |
| 181 | Denton Mateychuk | D | CBJ | 22 | 1.055 | 74 | DURABLE, année écourtée (plancher 74) | 94 | -9 | NA | NA |
| 182 | Nikita Zadorov | D | BOS | 31 | 0.973 | 83 | historique | 94 | -9 | NA | NA |
| 183 | Owen Power | D | BUF | 23 | 1.032 | 82 | historique | 94 | -10 | NA | NA |
| 184 | J.J. Moser | D | TBL | 26 | 1.019 | 74 | DURABLE, année écourtée (plancher 74) | 94 | -10 | NA | NA |
| 185 | Philip Broberg | D | STL | 25 | 1.019 | 78 | historique | 94 | -10 | 170 | -15 |
| 186 | Victor Hedman | D | TBL | 35 | 0.955 | 74 | DURABLE, année écourtée (plancher 74) | 94 | -10 | 132 | -54 |
| 187 | Tomas Hertl | F | VGK | 32 | 0.945 | 80 | historique | 127 | -10 | 211 | +24 |
| 188 | Ivan Demidov | F | MTL | 20 | 1.120 | 74 | DURABLE, année écourtée (plancher 74) | 127 | -11 | 100 | -88 |
| 189 | Charlie Coyle | F | CBJ | 34 | 0.903 | 84 | historique | 126 | -11 | 214 | +25 |
| 190 | Timo Meier | F | NJD | 29 | 0.953 | 80 | historique | 126 | -11 | 86 | -104 |
| 191 | William Eklund | F | OTT | 23 | 1.063 | 79 | historique | 126 | -11 | 140 | -51 |
| 192 | Anthony Mantha | F | NJD | 32 | 0.945 | 74 | DURABLE, année écourtée (plancher 74) | 125 | -12 | 177 | -15 |
| 193 | Cam York | D | PHI | 25 | 1.019 | 74 | DURABLE, année écourtée (plancher 74) | 92 | -12 | NA | NA |
| 194 | Evgeni Malkin | F | PIT | 40 | 0.901 | 62 | historique | 125 | -12 | 129 | -65 |
| 195 | Tyler Bertuzzi | F | CHI | 31 | 0.951 | 82 | historique | 125 | -12 | 227 | +32 |
| 196 | Jordan Spence | D | OTT | 25 | 1.019 | 77 | historique | 91 | -12 | NA | NA |
| 197 | Braden Schneider | D | NYR | 25 | 1.019 | 83 | historique | 91 | -12 | NA | NA |
| 198 | Luke Hughes | D | NJD | 23 | 1.032 | 71 | historique | 91 | -12 | 192 | -6 |
| 199 | Zach Benson | F | BUF | 21 | 1.087 | 74 | DURABLE, année écourtée (plancher 74) | 124 | -13 | 143 | -56 |
| 200 | Dylan Strome | F | WSH | 29 | 0.953 | 83 | historique | 124 | -13 | 113 | -87 |
| 201 | Juuse Saros | G | NSH | 31 | 1.000 | 60 | #1 NSH | 85 | -13 | 171 | -30 |
| 202 | Elias Pettersson | F | VAN | 27 | 0.996 | 74 | DURABLE, année écourtée (plancher 74) | 124 | -13 | 138 | -64 |
| 203 | Damon Severson | D | CBJ | 32 | 0.973 | 72 | historique | 90 | -13 | NA | NA |
| 204 | Carter Hart | G | VGK | 28 | 1.000 | 52 | #1 VGK | 85 | -14 | 152 | -52 |
| 205 | Matvei Michkov | F | PHI | 21 | 1.087 | 83 | historique | 123 | -14 | 197 | -8 |
| 206 | Ryan Shea | D | EDM | 29 | 0.995 | 74 | DURABLE, année écourtée (plancher 74) | 89 | -14 | NA | NA |
| 207 | Artem Zub | D | OTT | 30 | 0.988 | 74 | DURABLE, année écourtée (plancher 74) | 89 | -14 | NA | NA |
| 208 | Alexandre Carrier | D | MTL | 29 | 0.995 | 77 | historique | 89 | -14 | NA | NA |
| 209 | Arturs Silovs | G | PIT | 25 | 1.000 | 52 | #1 PIT | 84 | -14 | 239 | +30 |
| 210 | Noah Cates | F | PHI | 27 | 0.996 | 82 | historique | 123 | -15 | NA | NA |
| 211 | Carter Verhaeghe | F | FLA | 31 | 0.951 | 81 | historique | 123 | -15 | 137 | -74 |
| 212 | Jared McCann | F | SEA | 30 | 0.953 | 74 | DURABLE, année écourtée (plancher 74) | 122 | -15 | 246 | +34 |
| 213 | Dustin Wolf | G | CGY | 25 | 1.000 | 56 | #1 CGY | 83 | -15 | 240 | +27 |
| 214 | Jack Quinn | F | BUF | 25 | 1.047 | 81 | historique | 122 | -15 | NA | NA |
| 215 | Ben Chiarot | D | DET | 35 | 0.955 | 84 | historique | 88 | -15 | NA | NA |
| 216 | Jamie Drysdale | D | PHI | 24 | 1.029 | 77 | historique | 88 | -16 | NA | NA |
| 217 | Mikey Anderson | D | LAK | 27 | 1.019 | 81 | historique | 87 | -16 | NA | NA |
| 218 | Matt Roy | D | WSH | 31 | 0.973 | 77 | historique | 87 | -17 | NA | NA |
| 219 | Kiefer Sherwood | F | SJS | 31 | 0.951 | 76 | historique | 121 | -17 | 221 | +2 |
| 220 | Kris Letang | D | PIT | 39 | 0.889 | 76 | historique | 87 | -17 | NA | NA |
| 221 | Louis Crevier | D | BUF | 25 | 1.019 | 74 | DURABLE, année écourtée (plancher 74) | 87 | -17 | NA | NA |
| 222 | Dmitry Orlov | D | SJS | 35 | 0.955 | 82 | historique | 87 | -17 | NA | NA |
| 223 | Devon Toews | D | COL | 32 | 0.973 | 74 | DURABLE, année écourtée (plancher 74) | 86 | -17 | NA | NA |
| 224 | Seth Jones | D | FLA | 31 | 0.973 | 58 | historique | 86 | -17 | 167 | -57 |
| 225 | Ryan Leonard | F | WSH | 21 | 1.087 | 74 | DURABLE, année écourtée (plancher 74) | 120 | -17 | 209 | -16 |
| 226 | Ryan McDonagh | D | TBL | 37 | 0.889 | 74 | DURABLE, année écourtée (plancher 74) | 86 | -17 | NA | NA |
| 227 | Ryan McLeod | F | BUF | 27 | 0.996 | 82 | historique | 120 | -17 | NA | NA |
| 228 | Tony DeAngelo | D | NYI | 30 | 0.988 | 74 | DURABLE, année écourtée (plancher 74) | 86 | -17 | NA | NA |
| 229 | John Marino | D | UTA | 29 | 0.995 | 74 | DURABLE, année écourtée (plancher 74) | 86 | -18 | NA | NA |
| 230 | Lukas Dostal | G | ANA | 26 | 1.000 | 56 | #1 ANA | 81 | -18 | 188 | -42 |
| 231 | Connor McMichael | F | STL | 25 | 1.047 | 82 | historique | 119 | -18 | 230 | -1 |
| 232 | Christian Dvorak | F | PHI | 30 | 0.953 | 83 | historique | 119 | -18 | NA | NA |
| 233 | Aaron Ekblad | D | FLA | 30 | 0.988 | 74 | DURABLE, année écourtée (plancher 74) | 85 | -18 | NA | NA |
| 234 | Thatcher Demko | G | VAN | 30 | 1.000 | 52 | #1 VAN | 80 | -18 | NA | NA |
| 235 | Brayden Point | F | TBL | 30 | 0.953 | 74 | DURABLE, année écourtée (plancher 74) | 119 | -18 | 60 | -175 |
| 236 | Viktor Arvidsson | F | DET | 33 | 0.921 | 70 | historique | 119 | -18 | 212 | -24 |
| 237 | Jacob Markstrom | G | FLA | 36 | 1.000 | 52 | #1 FLA | 80 | -18 | 78 | -159 |
| 238 | Mason Lohrei | D | BOS | 25 | 1.019 | 76 | historique | 85 | -18 | NA | NA |
| 239 | Charle-Edouard D'Astous | D | TBL | 28 | 1.011 | 72 | historique | 85 | -19 | NA | NA |
| 240 | Brayden McNabb | D | VGK | 35 | 0.955 | 74 | DURABLE, année écourtée (plancher 74) | 85 | -19 | NA | NA |
| 241 | Colton Parayko | D | STL | 33 | 0.973 | 74 | historique | 85 | -19 | 243 | +2 |
| 242 | Bobby McMann | F | SEA | 30 | 0.953 | 78 | historique | 118 | -19 | 202 | -40 |
| 243 | Brad Marchand | F | FLA | 38 | 0.901 | 61 | historique | 118 | -19 | 180 | -63 |
| 244 | Patrick Kane | F | CHI | 37 | 0.901 | 74 | DURABLE, année écourtée (plancher 74) | 118 | -20 | 139 | -105 |
| 245 | Gustav Forsling | D | FLA | 30 | 0.988 | 82 | historique | 84 | -20 | NA | NA |
| 246 | Ian Cole | D | CHI | 37 | 0.889 | 84 | historique | 84 | -20 | NA | NA |
| 247 | Luke Evangelista | F | NJD | 24 | 1.054 | 78 | historique | 117 | -20 | 176 | -71 |
| 248 | Joel Edmundson | D | LAK | 33 | 0.973 | 80 | historique | 83 | -20 | NA | NA |
| 249 | Tyler Kleven | D | OTT | 24 | 1.029 | 75 | historique | 83 | -21 | NA | NA |
| 250 | J.T. Miller | F | NYR | 33 | 0.921 | 74 | DURABLE, année écourtée (plancher 74) | 116 | -21 | 88 | -162 |
