# 00 — Rapport de collecte

**Date d'extraction : 2026-09-05.** Saison régulière uniquement (`gameTypeId=2`).
**Les 5 fichiers sont livrés.**

---

## 1. Couverture

| Fichier | Contenu | Couverture |
|---|---|---|
| 01-patineurs-stats.md | 715 patineurs × jusqu'à 3 saisons = **1985 lignes** | 715 / 715 patineurs avec >= 20 GP en 2025-26 (**100 %**) |
| 02-gardiens-stats.md | 72 gardiens × jusqu'à 3 saisons = **203 lignes** | 72 / 72 gardiens avec >= 10 GP en 2025-26 (**100 %**) |
| 03-bio.md | 715 patineurs + 72 gardiens = **787 lignes** | **787 / 787 avec vraie date de naissance (100 %)** |
| 04-blessures-roles.md | 18 joueurs à signaler | Les **6 exigés** + toute la liste « Key injuries » de NHL.com + les absences du camp d'Edmonton. **Partiel par nature.** |
| 05-adp-et-contexte.md | Top 250 NHL.com + 186 changements d'équipe | Classement public : 250/250. **ADP réelles : 0** (n'existent pas encore) |

La cible du prompt disait « ~500 patineurs ». Le vrai chiffre pour le seuil de 20 matchs en
2025-26 est **715**. Aucun échantillonnage n'a été fait : ce sont tous les joueurs qui
franchissent le seuil.

**Vérification des 8 défenseurs exigés :** Matheson, Rielly, Byram, Provorov, Jones,
Slavin, Pesce — **tous les 7 présents**. Mathew Dumba est **absent volontairement** : il n'a
joué que **11 matchs avec PIT en 2025-26**, donc sous le seuil de 20. Ce n'est pas un trou de
données, c'est un vrai fait. Ses saisons antérieures existent (63 GP DAL en 2024-25,
76 GP ARI/TBL en 2023-24) et je peux les ajouter si tu veux abaisser le seuil.

## 2. Sources utilisées

Une seule source pour tout ce lot, ce qui élimine tout conflit entre sites :

| URL | Sert à |
|---|---|
| `api.nhle.com/stats/rest/en/skater/summary` (×3 saisons) | GP, G, A, SOG, +/−, SHG, SHP, équipe, position |
| `api.nhle.com/stats/rest/en/skater/realtime` (×3 saisons) | **BLK et HIT** |
| `api.nhle.com/stats/rest/en/skater/bios` (×3 saisons) | dates de naissance, taille, poids, équipe actuelle |
| `api.nhle.com/stats/rest/en/goalie/summary` (×3 saisons) | GP, GS, W, L, SV, GA, SO, **A**, TOI |
| `api.nhle.com/stats/rest/en/goalie/bios` (×3 saisons) | dates de naissance, taille, poids des gardiens |

C'est la source officielle de la LNH. Les fichiers JSON bruts ont été téléchargés par
l'utilisateur depuis son navigateur, puis traités par script — **aucune donnée n'a été
recopiée à la main ni de mémoire.**

Jointure faite sur `playerId` (identifiant numérique LNH), pas sur le nom. Les noms des
fichiers `01`, `02` et `03` viennent tous du même champ officiel, donc la jointure par nom
entre fichiers est sûre.

## 3. Trous connus

**Trou 1 — `HAT` (tours du chapeau) = `NA` pour les 715 patineurs.**
Aucun endpoint de la LNH n'expose cette statistique. Elle ne se calcule qu'en parcourant les
sommaires de match un par un. Impact sur ton pool : 2 pts par tour du chapeau ; même un
buteur d'élite en réussit 3 à 5 par saison, soit **6 à 10 pts** sur un total de 250 à 350.
C'est du bruit, sauf pour départager deux joueurs quasi identiques.

**Trou 2 — COMBLÉ.** Les bios des gardiens ont été extraites le 2026-09-05. Les 72 gardiens
ont maintenant une vraie date de naissance, une taille et un poids. Zéro `NA` biographique
dans le fichier 03.

**Trou 3 — `contract_status` = `NA` pour les 787 joueurs.**
L'API LNH ne publie pas les contrats. Il faut PuckPedia.

**Trou 4 — `A` (passes) des gardiens en 2023-24 et 2024-25** : présentes. Aucun trou ici.
Ce champ était identifié comme risque dans le plan initial ; **vérifié présent** dans les
trois saisons.

**Aucun autre trou.** Sur les 1985 lignes de patineurs, la jointure summary↔realtime a
réussi **1985 fois sur 1985** : zéro BLK ou HIT manquant.

## 4. Incohérences entre sources

**Aucune.** Une seule source a été utilisée. Rien n'a été arbitré, donc rien ne peut
avoir été mal arbitré.

## 5. Joueurs douteux pour 2026-27

Ce lot **ne se prononce pas** sur qui jouera en 2026-27. Le champ `team_2026_27` du
fichier 03 est le champ `currentTeamAbbrev` de la LNH au 2026-09-05, pas une projection.
Piège à connaître : un agent libre non signé peut y apparaître avec son ancienne équipe.
Le tri agent libre / signé / retraité se fera dans le fichier 05.

## 6. Avertissements pour le modèle de projection

1. **Saison de 84 matchs en 2026-27, pas 82.** Toutes les stats de volume de ce jeu de
   données sont sur 82. Facteur de conversion : **× 1,0244**.
2. **`team` peut contenir plusieurs équipes** (ex. `ARI/TBL`). Les stats de cette ligne sont
   le **total combiné** de la saison, pas la portion avec une seule équipe. Un `GP` de 83
   est normal pour un joueur échangé.
3. **`SHA` est dérivé**, pas brut : `shPoints − shGoals`. L'API ne donne pas les passes en
   infériorité directement. Le calcul est exact, mais c'est une soustraction, pas une lecture.
4. **`pos` vient de la LNH, pas de Fantrax.** La LNH classe en C / LW / RW / D. Fantrax
   attribue parfois une double éligibilité (ex. C/LW) qui n'apparaît pas ici. À vérifier sur
   Fantrax avant le repêchage pour les joueurs dont la polyvalence compte.
5. **Le seuil de 20 GP exclut de vrais joueurs de pool** — 225 patineurs ont joué entre
   1 et 19 matchs en 2025-26. Dumba en est un exemple. Si un recrue ou un joueur revenant
   de blessure t'intéresse, il faut baisser le seuil, pas supposer qu'il n'existe pas.
6. **`+/−` peut être négatif** et vaut 0,25 pt chez toi. Vérifie que ton moteur de calcul ne
   traite pas les valeurs négatives comme des zéros.
7. **`TOI_MIN` des gardiens est arrondi à la minute** depuis les secondes de l'API.


---

# Complément — fichiers 04 et 05

## Changement de nature des sources

Les fichiers 01, 02 et 03 viennent d'une API officielle : ils sont vérifiables et
reproductibles. **Les fichiers 04 et 05 ne le sont pas.** Ils viennent de la presse et d'un
classement d'opinion. Traite-les comme tels.

Une exception importante : la section « changements d'équipe » du fichier 05 est **vérifiée**.
Elle ne lit aucun article — elle compare l'équipe 2025-26 de chaque joueur à son
`currentTeamAbbrev` du 2026-09-05, tous deux issus de l'API. 186 joueurs ont changé d'équipe,
dont 52 qui n'ont **aucune équipe** actuellement.

## Trous du fichier 04

- **Ce n'est pas la liste complète des blessés de la LNH.** 18 joueurs sont couverts : les 6
  exigés, la liste publiée par NHL.com, et les absents confirmés du camp d'Edmonton. Il en
  manque certainement. La liste bouge chaque jour pendant le camp.
- **`expected_gp_2026_27` est une estimation, marquée comme telle**, sur une base de 84 matchs.
  Six joueurs ont `NA` parce que je n'avais aucune base sérieuse pour estimer.
- **`gp_missed` est calculé comme `82 − matchs joués`**, ce qui mélange blessures, retraits
  sains et rappels. C'est un indicateur de disponibilité, pas un compte de blessures.
- Trois lignes ont `confidence = low` : Pietrangelo, Gustavsson et McAvoy. Pour ces trois, la
  source dit seulement qu'il y a un problème, sans en préciser la nature ni la durée.

## Trous du fichier 05

- **Aucune ADP Fantrax, Yahoo ou ESPN.** Ces données n'existent pas publiquement au
  5 septembre 2026. Les trois colonnes demandées sont `NA` sur les 250 lignes. C'est un refus
  délibéré d'inventer, pas un oubli.
- Aucun trio ni unité d'avantage numérique. Ça se publie pendant le camp.
- Les changements d'équipe sont détectés, mais **pas expliqués** : le fichier sait que Brady
  Tkachuk est passé d'Ottawa à Florida, pas si c'est un échange ni ce qui est parti en retour.

## Incohérences entre sources — une vraie, trouvée et corrigée

**NHL.com et l'API de la LNH n'écrivent pas les noms de la même façon.** Quatre joueurs de
premières rondes auraient disparu d'une jointure par nom, sans message d'erreur :

| NHL.com | API officielle (retenue) |
|---|---|
| Tim Stutzle | Tim Stützle |
| Juraj Slafkovsky | Juraj Slafkovský |
| Alexis Lafreniere | Alexis Lafrenière |
| JJ Peterka | John-Jason Peterka |

**J'ai retenu l'orthographe de l'API** parce que c'est la clé de jointure des fichiers 01 à 03.
Le fichier 05 a été corrigé en conséquence. **Avertissement pour l'agent suivant : ne
normalise pas les accents avant de joindre.**

Deuxième point de friction : NHL.com date son classement du 2026-09-02, les données de l'API
sont du 2026-09-05. Trois jours d'écart. Un mouvement de joueur survenu entre les deux
apparaîtra dans l'API mais pas dans le classement.

## Joueurs douteux pour 2026-27

- **52 joueurs n'ont aucune équipe** au 5 septembre selon la LNH (liste complète dans le
  fichier 05). Agents libres non signés, retraités ou partis à l'étranger — la LNH ne fait pas
  la distinction. Aucun ne devrait être repêché sans vérification.
- **Aleksander Barkov** est classé 43e par NHL.com mais **n'apparaît dans aucun de mes
  fichiers de statistiques** : il a joué 0 match en 2025-26. Il faut le rajouter à la main avec
  sa saison 2024-25 (67 matchs, 71 pts).
- **Alex Pietrangelo** : 0 match en 2025-26, listé comme blessé, absent des fichiers.
- **11 recrues** sont classées dans le top 250 sans aucune statistique LNH (McKenna, Martone,
  Cole Hutson, Frondell, Stenberg, Helenius, Kantserov, Hagens, Victor Eklund, Ilya Protas).
  Elles sont listées dans le fichier 05 mais **aucune statistique n'a été inventée pour elles**.

## Avertissements supplémentaires

8. **Le classement de NHL.com n'utilise pas ton système de pointage.** Ils comptent les points
   en avantage numérique ; chez toi ils valent **zéro de plus**. Ils jugent les gardiens sur la
   moyenne et le pourcentage d'arrêts ; toi tu paies **les arrêts** et tu **pénalises les buts
   alloués**. L'écart entre leur classement et ton propre calcul, c'est littéralement ta marge.
9. **Les camps 2026 sont écourtés** et la saison commence fin septembre. Moins de temps pour
   que les rôles se clarifient avant ton repêchage.
10. **Le fichier 04 périme vite.** À revalider la veille du repêchage.
