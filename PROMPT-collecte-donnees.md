# PROMPT À COLLER DANS CLAUDE (version recherche web, PAS Claude Design)

---

Tu fais une mission de **collecte de données de hockey**. Le livrable = des fichiers
Markdown propres et parsables, qui seront relus par un autre agent pour construire un
outil de draft fantasy. **Tu ne construis aucune interface. Que des données.**

## CONTEXTE DE LA LIGUE (pour que tu comprennes ce qui compte)

Pool Fantrax, **8 équipes**, head-to-head, **redraft complet** (pas keeper), saison NHL
**2026-27**. Alignement partant par équipe : **9 attaquants (F), 6 défenseurs (D),
2 gardiens (G)** + 6 joueurs de banc.

**Scoring exact — patineurs :**
but 2 · passe 1.5 · tir au but 0.1 · bloc 0.25 · mise en échec 0.1 · +/− 0.25 ·
but en infériorité numérique 1 · passe en infériorité numérique 0.5 · tour du chapeau 2 ·
**avantage numérique 0 · minutes de pénalité 0**

**Scoring exact — gardiens :**
victoire 2.4 · arrêt 0.13 · blanchissage 2.75 · but alloué −1 · passe 3

⚠️ Conséquences à garder en tête : les **blocs et les mises en échec** comptent beaucoup
(un défenseur défensif a de la valeur), les **points en avantage numérique ne valent rien
de plus** qu'un point ordinaire, et les **arrêts** dominent le pointage des gardiens
(un gardien sur une mauvaise équipe qui affronte beaucoup de tirs peut très bien scorer).

## RÈGLE ABSOLUE : NE RIEN INVENTER

- Chaque nombre doit venir d'une source réelle que tu cites.
- Si tu ne trouves pas une valeur : écris **`NA`**. Jamais une estimation déguisée en fait.
- Si tu estimes quelque chose (ex. projection d'une recrue), mets-le dans une colonne
  **explicitement** nommée estimation, avec un niveau de confiance.
- N'invente **aucun joueur**. Si un nom que je demande n'existe pas / n'a pas joué, dis-le.

Un audit précédent a trouvé 5 joueurs inventés et un joueur classé 9e du draft sur un
total de points fabriqué (198 au lieu de 138 réels). C'est exactement ce qu'il faut éviter.

## QUI COLLECTER

1. **Tous les patineurs de la LNH avec ≥ 20 matchs joués en 2025-26.** (~500 joueurs)
2. **Tous les gardiens avec ≥ 10 matchs joués en 2025-26.** (~70)
3. **Les recrues/espoirs attendus dans une formation LNH en 2026-27** (ex. premiers choix
   2025-2026, joueurs qui arrivent d'Europe/NCAA/junior), même sans stats LNH.

Si le volume est trop gros pour une seule réponse, **procède par lots** et numérote-les
(`lot 1/5`, etc.). La **couverture complète compte plus que la profondeur d'analyse.**

⚠️ Des défenseurs bien réels manquaient du jeu de données précédent. Vérifie
**explicitement** que ceux-ci sont présents (et ne t'arrête pas à eux) :
Mike Matheson, Morgan Rielly, Bowen Byram, Ivan Provorov, Seth Jones, Jaccob Slavin,
Brett Pesce, Mathew Dumba.

---

# LIVRABLES : 5 FICHIERS .MD

Respecte les schémas **exactement** — colonnes, ordre, noms. Une ligne par joueur.
Sépare les colonnes par `|`. Pas de cellules fusionnées, pas de notes en bas de tableau.
Nom du joueur = **orthographe officielle NHL.com**, identique dans tous les fichiers
(c'est la clé de jointure).

---

## FICHIER 1 — `01-patineurs-stats.md`

Stats **brutes** des 3 dernières saisons par patineur. **Ne calcule aucun point fantasy** —
donne-moi les stats brutes, je fais le calcul moi-même.

Trois lignes par joueur (une par saison). Si le joueur n'a pas joué une saison, saute la ligne.

| name | season | team | pos | GP | G | A | SOG | BLK | HIT | PLUSMINUS | SHG | SHA | HAT |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Nathan MacKinnon | 2025-26 | COL | C | 82 | 51 | 89 | 385 | 44 | 62 | 22 | 1 | 0 | 4 |

- `season` : `2023-24`, `2024-25`, `2025-26`
- `pos` : position réelle (`C`, `LW`, `RW`, `D`) — pas F/D/G, je regrouperai
- `HAT` : nombre de tours du chapeau dans la saison (important, ça vaut 2 pts chacun)
- `PLUSMINUS` : peut être négatif
- Si un joueur a été échangé en cours de saison, donne le **total combiné** et mets
  les deux équipes dans `team` séparées par `/` (ex. `NSH/COL`)

## FICHIER 2 — `02-gardiens-stats.md`

| name | season | team | GP | GS | W | L | SV | GA | SO | A | TOI_MIN |
|---|---|---|---|---|---|---|---|---|---|---|---|

- `SV` = arrêts totaux, `GA` = buts alloués, `SO` = blanchissages, `A` = passes du gardien
- `GS` = départs (distinct de GP — crucial pour projeter le volume)
- `TOI_MIN` = minutes jouées au total dans la saison

## FICHIER 3 — `03-bio.md`

Une ligne par joueur (patineurs **et** gardiens).

| name | birthdate | age_2026_10_01 | team_2026_27 | pos | shoots_catches | height_cm | weight_kg | contract_status |
|---|---|---|---|---|---|---|---|---|

- `birthdate` : format `AAAA-MM-JJ`
- `age_2026_10_01` : âge en années entières **au 1er octobre 2026** (début de saison)
- `team_2026_27` : l'équipe pour la **saison à venir**, en tenant compte des échanges et
  signatures de l'été 2026. Si agent libre non signé : `UFA` ou `RFA`.
- `contract_status` : `signed` / `UFA` / `RFA` / `ELC`

⚠️ L'âge est le champ le plus important de ce fichier. Dans le jeu de données précédent,
**260 joueurs sur 292 étaient inscrits comme ayant 27 ans** — c'était une valeur de
remplissage. Donne-moi des vraies dates de naissance.

## FICHIER 4 — `04-blessures-roles.md`

Seulement les joueurs qui ont **quelque chose à signaler**. N'inscris pas les joueurs en
pleine santé sans changement.

| name | injury_status | detail | expected_gp_2026_27 | gp_missed_2425 | gp_missed_2526 | role_change | confidence |
|---|---|---|---|---|---|---|---|

- `injury_status` : `healthy` / `recovering` / `out-start-of-season` / `chronic` / `unknown`
- `detail` : nature de la blessure + date de retour prévue, en une phrase
- `expected_gp_2026_27` : **ton estimation** des matchs jouables (c'est une estimation
  assumée, pas un fait) — sur 82
- `role_change` : promotion/rétrogradation attendue (1re unité d'avantage numérique,
  changement de trio, nouveau rôle après un échange, nouvel entraîneur). Une phrase.
- `confidence` : `high` / `med` / `low`

Inclus **obligatoirement** : Auston Matthews, Connor Bedard, Seth Jarvis, Gabriel Landeskog,
Matthew Tkachuk, Aleksander Barkov — et tous les autres blessés importants que tu trouves.

## FICHIER 5 — `05-adp-et-contexte.md`

| name | fantrax_adp_2627 | yahoo_adp_2627 | espn_rank_2627 | source_date |
|---|---|---|---|---|

Si les ADP 2026-27 ne sont pas encore publiés (on est en août 2026, ils peuvent être
partiels) : dis-le clairement en haut du fichier et donne ce qui existe. **`NA` plutôt
qu'une invention.**

Ajoute ensuite une section `## Changements d'équipe importants été 2026` : liste en puces
des échanges et signatures d'agents libres qui changent la valeur fantasy d'un joueur
(nouveau rôle, meilleure/pire équipe, avantage numérique).

---

# FICHIER 6 — `00-rapport.md` (à écrire en dernier)

Ton compte rendu, en texte :

1. **Couverture** : combien de patineurs, combien de gardiens, sur combien de visés.
2. **Sources utilisées**, avec l'URL de chacune et à quoi elle a servi.
3. **Trous connus** : quelles valeurs tu n'as pas trouvées, pour quels joueurs. Sois
   exhaustif ici — un trou déclaré est utilisable, un trou caché est un bug.
4. **Incohérences entre sources** : si deux sites donnent des chiffres différents, dis
   lequel tu as retenu et pourquoi.
5. **Joueurs douteux** : ceux dont tu n'es pas sûr qu'ils joueront dans la LNH en 2026-27.
6. **Avertissements** : tout ce qu'un modèle de projection devrait savoir avant d'utiliser
   ces données.

---

## SOURCES RECOMMANDÉES
NHL.com (officiel, stats brutes) · Natural Stat Trick (blocs/mises en échec/TOI fiables) ·
Hockey-Reference (historique) · CapFriendly ou PuckPedia (contrats, âges) ·
Daily Faceoff (trios et unités d'avantage numérique) · RotoWire / Dobber Hockey (blessures,
perspectives) · Fantrax (ADP).

Priorité aux stats brutes officielles. Les opinions ne servent que pour `role_change`
et `expected_gp`.

## ORDRE DE PRIORITÉ (si tu manques de temps)
1. `03-bio.md` (âges) — c'est le trou le plus grave
2. `01-patineurs-stats.md` saison 2025-26 seulement
3. `04-blessures-roles.md`
4. `02-gardiens-stats.md`
5. Les saisons 2023-24 / 2024-25
6. `05-adp-et-contexte.md`

**Commence par me confirmer que tu as compris le format, puis attaque le lot 1.**
