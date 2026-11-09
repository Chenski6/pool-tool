# 04 — Blessures et changements de rôle

**Date : 2026-09-05.** Ne contient que les joueurs qui ont quelque chose à signaler.

## Comment lire ce fichier

- `expected_gp_2026_27` : **c'est mon estimation, pas un fait.** Base = **84 matchs** (la saison 2026-27 en compte 84, pas 82 comme le disait le prompt d'origine). `NA` quand je n'ai aucune base pour estimer.
- `gp_missed_2425` / `gp_missed_2526` : **calculés** comme `82 − matchs joués`, depuis les données officielles de la LNH. Attention : ça mélange blessures, retraits sains et rappels en cours de saison. C'est un indicateur de disponibilité, pas un compte de blessures.
- `confidence` : `high` = échéancier confirmé par l'équipe. `med` = récit cohérent, échéancier flou. `low` = présence sur une liste de blessés sans détail publié.

## Avertissement sur les sources

Contrairement aux fichiers 01 à 03, ce fichier **ne repose pas sur une API**. Il vient d'articles de presse, avec les imprécisions que ça implique. Chaque ligne dit d'où elle vient dans `detail`. Quand une source ne précisait pas la nature ou l'échéancier d'une blessure, je l'ai écrit au lieu de combler le vide.

Sources : NHL.com (top 250 fantasy du 2026-09-02, incluant sa section « Key injuries »), NHL.com actualités, ESPN, RotoWire, PuckPedia, Daily Faceoff, TSN via Chris Johnston.

## Deux joueurs absents des fichiers 01, 02 et 03

**Aleksander Barkov** et **Alex Pietrangelo** ont joué **0 match en 2025-26**. Ils ne franchissent donc pas le seuil et n'apparaissent nulle part ailleurs dans le jeu de données. Barkov en particulier est un joueur de premières rondes (43e du top 250 de NHL.com) : **il faut le rajouter à la main** avec sa saison 2024-25 (67 matchs, 20 B, 51 P, 71 pts) comme base de projection.

| name | injury_status | detail | expected_gp_2026_27 | gp_missed_2425 | gp_missed_2526 | role_change | confidence |
|---|---|---|---|---|---|---|---|
| Aleksander Barkov | recovering | Blessure au genou subie au camp d'entraînement 2025 ; a raté **la saison 2025-26 au complet**. De retour au camp 2026 selon Florida. | 70 | 15 | 82 | Revient comme premier centre de FLA. Absent des fichiers 01/02/03 (0 match en 2025-26) — utiliser sa saison 2024-25 comme base. | med |
| Auston Matthews | recovering | Déchirure du LLI de grade 3 (genou gauche) le 12 mars 2026 sur une mise en échec genou contre genou de Radko Gudas. Chirurgie le 19 mars, récupération de 12 semaines. Retour estimé 15 sept. 2026 selon RotoWire. | 72 | 15 | 22 | Nouveau personnel d'entraîneurs à Toronto. RotoWire le voit comme candidat au rebond, potentiellement disponible plus tard qu'à l'habitude au repêchage. | med |
| Matthew Tkachuk | chronic | Historique lourd : adducteur arraché de l'os et hernie sportive (4 Nations, fév. 2025), chirurgie à l'été 2025, puis seulement **31 matchs en 2025-26**. Deux saisons écourtées de suite. | 60 | 30 | 51 | Toujours dans le top 6 de FLA. Le risque n'est pas le talent, c'est la disponibilité. | med |
| Seth Jarvis | out-start-of-season | Chirurgie à l'épaule après la conquête de la Coupe par Carolina. Absence de 4 à 6 mois, ce qui le place hors jeu de **fin octobre à fin décembre 2026**. Le DG Eric Tulsky a évoqué une place libre dans l'alignement pendant un ou deux mois. | 55 | 9 | 11 | Sa place au sein du top 6 et de l'avantage numérique de CAR est ouverte à un jeune pendant son absence. | high |
| Connor Bedard | recovering | Épaule. A signé une prolongation de 5 ans / 75 M$ avec Chicago pendant sa convalescence. Classé « (INJ.) » au 68e rang du top 250 de NHL.com. | 74 | 0 | 13 | Reste le moteur offensif de CHI. Patrick Kane est de retour à Chicago, ce qui peut aider ou diluer. | med |
| Gabriel Landeskog | chronic | Genou chronique (transplantation de cartilage en 2023, trois saisons complètes ratées). A joué 60 matchs en 2025-26 avec deux arrêts : haut du corps en janvier, bas du corps en mars. | 62 | 82 | 22 | Sa place dans le top 6 de COL est débattue publiquement. Bednar a dit gérer sa charge de travail sans limiter ses minutes. | med |
| Alex Pietrangelo | out-start-of-season | **Zéro match en 2025-26.** Listé dans les blessures clés de NHL.com pour 2026-27. Absent des fichiers 01/03. | NA | 11 | 82 | Statut incertain. Ne pas repêcher sans confirmation au camp. | low |
| Filip Gustavsson | recovering | Listé dans les blessures clés de NHL.com au 2 sept. 2026. Nature et échéancier non précisés par la source. | NA | 24 | 32 | Partage du filet à MIN avec Jesper Wallstedt, que NHL.com classe 55e au général — Wallstedt est devant lui. | low |
| Frederik Andersen | out-start-of-season | Blessé à l'entraînement estival. Confirmé par les Oilers comme absent du camp de septembre 2026 (avec Janmark, Regula et Savoie). | NA | 60 | 47 | Signé à EDM. Rotation à trois gardiens annoncée : Jarry, Andersen, Levi. Volume de départs très incertain. | high |
| Matt Savoie | out-start-of-season | Blessé lors des entraînements estivaux. Absent du camp d'EDM de septembre 2026. | 70 | 78 | 0 | Sortait d'une vraie saison recrue (82 matchs, 37 pts). Le camp raté nuit à sa progression vers un rôle élargi. | high |
| Mattias Janmark | out-start-of-season | Absent du camp d'EDM de septembre 2026. | 65 | 2 | 39 | Rôle de soutien. Impact limité pour un pool à 8 équipes. | med |
| Kevin Fiala | recovering | Listé dans les blessures clés de NHL.com au 2 sept. 2026. Nature non précisée. A raté 26 matchs en 2025-26. | 70 | 1 | 26 | Panarin et Zuccarello sont arrivés à LAK — la concurrence pour le temps de jeu en avantage numérique augmente. | low |
| Troy Terry | recovering | Listé dans les blessures clés de NHL.com au 2 sept. 2026. A raté 21 matchs en 2025-26. | 72 | 5 | 21 | ANA est jeune et encombré (Gauthier, Carlsson, Sennecke). Son rôle peut rétrécir. | low |
| Owen Tippett | recovering | A déclaré être « confiant d'un rétablissement complet » et viser un retour pour le camp de septembre. | 78 | 5 | 1 | Reste dans le top 6 de PHI. Le risque paraît faible. | med |
| Max Domi | unknown | Chirurgie pour régler un problème traîné toute la saison 2025-26, mais **des complications sont survenues** — sa disponibilité pour le camp est incertaine. | 65 | 8 | 2 | A affiché un −29 en 2025-26, le pire de sa carrière. Chez toi, ça vaut −7,25 pts. À éviter. | med |
| Charlie McAvoy | healthy | Aucune blessure signalée. **Listé comme suspendu** au 131e rang du top 250 de NHL.com au 2 sept. 2026 — durée non précisée par la source. | NA | 32 | 13 | Défenseur no 1 de BOS. Vérifier la durée de la suspension avant de le repêcher. | low |
| Nils Hoglander | recovering | Blessure au bas du corps. Échangé de Vancouver à Nashville contre un choix de 3e ronde 2029. | NA | 10 | 44 | Changement d'équipe et de rôle. A chuté de 25 à 5 points entre 2024-25 et 2025-26. | low |
| Isac Lundestrom | out-start-of-season | Chirurgie au tendon d'Achille à l'été. Absent au moins jusqu'au début novembre 2026. | 55 | 82 | 82 | Zéro match LNH depuis deux saisons. Non pertinent pour un pool à 8 équipes. | med |

## Ce que ce fichier ne couvre pas

Il y a certainement d'autres blessés dans la LNH au 5 septembre 2026 que je n'ai pas trouvés. Les 18 lignes ci-dessus couvrent les 6 joueurs exigés, la liste « Key injuries » de NHL.com au complet, et les absences confirmées du camp d'Edmonton. **Traite ce fichier comme partiel.** La liste des blessés bouge tous les jours pendant le camp — à revalider la veille du repêchage.
