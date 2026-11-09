/* Draft board — source: fichier 09-board-final-corrige.md (2026-09-05)
   colonnes: rang|nom|pos|equipe|age|mult_age|matchs|src|projection|vorp|rang_nhl
   src: h=historique · D=durable 74 · J=jeune promu 76 · M=ajout manuel (base 24-25) · I=fichier 04 · G1=partant d'équipe
   ecart = rang_nhl − rang de valeur (positif = NHL.com le sous-cote = vol)
   seuils de remplacement (8 éq. × 9F/6D/2G): F #73 · D #49 · G #17 */
(function () {
  const RAW = `
1|Nathan MacKinnon|F|COL|31|0.951|82|h|274|137|2
2|Macklin Celebrini|F|SJS|20|1.120|79|h|263|126|4
3|Evan Bouchard|D|EDM|26|1.019|84|h|220|116|22
4|Connor McDavid|F|EDM|29|0.953|78|h|253|115|1
5|Nikita Kucherov|F|TBL|33|0.921|79|h|251|114|3
6|Cale Makar|D|COL|27|1.019|79|h|203|100|8
7|Lane Hutson|D|MTL|22|1.055|84|h|196|93|25
8|Zach Werenski|D|CBJ|29|0.995|79|h|196|93|12
9|Matt Boldy|F|MIN|25|1.047|80|h|224|86|10
10|Martin Necas|F|COL|27|0.996|80|h|221|84|14
11|Nick Suzuki|F|MTL|27|0.996|84|h|221|83|15
12|Jason Robertson|F|DAL|27|0.996|84|h|219|82|9
13|Moritz Seider|D|DET|25|1.019|84|h|183|80|76
14|Cole Caufield|F|MTL|25|1.047|83|h|215|78|20
15|Matthew Schaefer|D|NYI|19|1.092|84|h|176|72|40
16|David Pastrnak|F|BOS|30|0.953|81|h|209|71|6
17|Rasmus Dahlin|D|BUF|26|1.019|77|h|174|71|39
18|Wyatt Johnston|F|DAL|23|1.063|84|h|207|70|16
19|Tim Stützle|F|OTT|24|1.054|83|h|206|69|49
20|Darren Raddysh|D|TOR|30|0.988|75|h|169|65|53
21|Jakob Chychrun|D|WSH|28|1.011|79|h|164|61|64
22|Leon Draisaitl|F|EDM|30|0.953|69|h|195|58|5
23|Jake Sanderson|D|OTT|24|1.029|74|h|161|58|63
24|Quinn Hughes|D|MIN|26|1.019|74|D|161|57|11
25|Jack Eichel|F|VGK|29|0.953|77|h|194|57|19
26|Mark Scheifele|F|WPG|33|0.921|84|h|194|57|32
27|Scott Wedgewood|G|COL|34|1.000|52|G1|154|56|54
28|Adam Fox|D|NYR|28|1.011|74|D|157|54|77
29|Alex DeBrincat|F|DET|28|0.969|84|h|191|53|48
30|Kyle Connor|F|WPG|29|0.953|84|h|191|53|29
31|Andrei Vasilevskiy|G|TBL|32|1.000|59|G1|152|53|13
32|Juraj Slafkovský|F|MTL|22|1.068|83|h|189|52|50
33|Brock Faber|D|MIN|24|1.029|81|h|154|50|95
34|Jake Guentzel|F|TBL|31|0.951|83|h|188|50|35
35|Cutter Gauthier|F|ANA|22|1.068|80|h|184|46|31
36|Mikhail Sergachev|D|UTA|28|1.011|79|h|149|46|116
37|Jackson LaCombe|D|ANA|25|1.019|81|h|149|46|90
38|Miro Heiskanen|D|DAL|27|1.019|74|D|149|46|89
39|Brandon Hagel|F|TBL|28|0.969|77|h|182|45|38
40|Tage Thompson|F|BUF|28|0.969|81|h|182|45|30
41|Connor Bedard|F|CHI|21|1.087|74|I|181|44|68
42|Noah Dobson|D|MTL|26|1.019|78|h|146|43|146
43|Clayton Keller|F|UTA|28|0.969|84|h|180|43|44
44|Kirill Kaprizov|F|MIN|29|0.953|74|D|178|41|7
45|Logan Thompson|G|WSH|29|1.000|59|G1|139|41|26
46|Brady Tkachuk|F|FLA|27|0.996|74|D|178|40|21
47|Rasmus Andersson|D|VGK|29|0.995|83|h|143|39|191
48|Dylan Guenther|F|UTA|23|1.063|77|h|175|38|33
49|Jesper Wallstedt|G|MIN|23|1.000|52|G1|136|38|55
50|Jack Hughes|F|NJD|25|1.047|63|h|175|38|18
51|Josh Morrissey|D|WPG|31|0.973|80|h|140|37|148
52|Alex Tuch|F|WSH|30|0.953|82|h|174|36|107
53|Charlie McAvoy|D|BOS|28|1.011|63|h|140|36|131
54|Adrian Kempe|F|LAK|30|0.953|83|h|173|36|47
55|Mattias Samuelsson|D|BUF|26|1.019|74|D|138|35|207
56|Filip Forsberg|F|NSH|32|0.945|84|h|172|34|51
57|Dylan Holloway|F|STL|25|1.047|74|D|171|34|58
58|John Carlson|D|TBL|36|0.889|76|h|137|33|114
59|Erik Karlsson|D|PIT|36|0.889|80|h|137|33|93
60|Lucas Raymond|F|DET|24|1.054|83|h|170|33|75
61|Brandt Clarke|D|LAK|23|1.032|82|h|136|33|145
62|Leo Carlsson|F|ANA|21|1.087|74|h|168|31|34
63|Mikko Rantanen|F|DAL|29|0.953|74|D|168|31|23
64|Sebastian Aho|F|CAR|29|0.953|81|h|168|31|70
65|Ilya Sorokin|G|NYI|31|1.000|55|G1|128|30|28
66|William Nylander|F|TOR|30|0.953|74|h|166|29|36
67|Mika Zibanejad|F|NYR|33|0.921|83|h|166|28|65
68|Nick Schmaltz|F|UTA|30|0.953|84|h|166|28|97
69|Kirill Marchenko|F|CBJ|26|1.023|79|h|164|27|52
70|Mitch Marner|F|VGK|29|0.953|83|h|163|26|56
71|Ukko-Pekka Luukkonen|G|BUF|27|1.000|52|G1|124|26|150
72|Adam Fantilli|F|CBJ|21|1.087|84|h|162|25|61
73|Jake Oettinger|G|DAL|27|1.000|55|G1|123|24|41
74|Brandon Bussi|G|CAR|28|1.000|52|G1|123|24|79
75|Andrei Svechnikov|F|CAR|26|1.023|78|h|161|24|102
76|Joel Hofer|G|STL|26|1.000|52|G1|122|24|165
77|Tom Wilson|F|WSH|32|0.945|77|h|161|24|83
78|Dylan Cozens|F|OTT|25|1.047|84|h|160|22|136
79|Shayne Gostisbehere|D|CAR|33|0.973|62|h|126|22|144
80|Auston Matthews|F|TOR|29|0.953|72|I|159|22|17
81|Karel Vejmelka|G|UTA|30|1.000|62|G1|119|21|117
82|Jeremy Swayman|G|BOS|27|1.000|55|G1|119|21|62
83|Travis Konecny|F|PHI|29|0.953|81|h|158|21|123
84|Dylan Larkin|F|DET|30|0.953|79|h|158|20|66
85|Pavel Dorofeyev|F|NYR|25|1.047|84|h|157|20|72
86|Drake Batherson|F|OTT|28|0.969|82|h|156|19|74
87|Jacob Trouba|D|SJS|32|0.973|81|h|122|19|217
88|Thomas Chabot|D|OTT|29|0.995|74|D|122|18|208
89|Artemi Panarin|F|LAK|34|0.903|81|h|155|18|46
90|Justin Faulk|D|DET|34|0.973|80|h|121|18|224
91|Beckett Sennecke|F|ANA|20|1.120|84|h|155|17|82
92|Sam Malinski|D|COL|28|1.011|82|h|121|17|235
93|Sidney Crosby|F|PIT|39|0.901|75|h|154|17|45
94|Matthew Knies|F|TOR|23|1.063|81|h|154|17|110
95|Thomas Harley|D|DAL|25|1.019|75|h|120|17|168
96|Mark Stone|F|VGK|34|0.903|64|h|154|16|96
97|Travis Sanheim|D|PHI|30|0.988|83|h|120|16|NA
98|Morgan Geekie|F|BOS|28|0.969|81|h|153|16|108
99|Logan Cooley|F|UTA|22|1.068|76|J|153|15|81
100|Mike Matheson|D|MTL|32|0.973|81|h|119|15|248
101|Nico Hischier|F|NJD|27|0.996|81|h|152|15|67
102|John Gibson|G|DET|33|1.000|58|G1|113|14|206
103|Sam Reinhart|F|FLA|30|0.953|74|D|151|14|37
104|Bowen Byram|D|CHI|25|1.019|84|h|117|13|164
105|Sean Walker|D|CAR|31|0.973|83|h|116|13|NA
106|Jakub Dobes|G|MTL|25|1.000|52|G1|111|13|91
107|Alexander Nikishin|D|CAR|24|1.029|83|h|115|12|222
108|Filip Hronek|D|VAN|28|1.011|75|h|115|12|189
109|Bo Horvat|F|NYI|31|0.951|75|h|148|11|69
110|Martin Fehervary|D|WSH|26|1.019|83|h|114|11|NA
111|Esa Lindell|D|DAL|32|0.973|83|h|114|10|NA
112|Jet Greaves|G|CBJ|25|1.000|54|G1|109|10|172
113|Ryan O'Reilly|F|NSH|35|0.901|82|h|147|10|134
114|MacKenzie Weegar|D|UTA|32|0.973|82|h|113|10|163
115|Igor Shesterkin|G|NYR|30|1.000|52|G1|108|9|42
116|Jesper Bratt|F|NJD|28|0.969|84|h|146|9|80
117|K'Andre Miller|D|CAR|26|1.019|75|h|112|9|241
118|Robert Thomas|F|STL|27|0.996|68|h|146|8|57
119|Alex Laferriere|F|LAK|24|1.054|82|h|145|8|NA
120|Brock Nelson|F|COL|34|0.903|83|h|145|8|112
121|Simon Edvinsson|D|DET|23|1.032|76|h|110|6|NA
122|Roman Josi|D|NSH|36|0.889|64|h|110|6|94
123|Jimmy Snuggerud|F|STL|22|1.055|76|J|143|6|NA
124|Ivan Provorov|D|CBJ|29|0.995|84|h|109|5|NA
125|Steven Stamkos|F|NSH|36|0.901|84|h|142|5|98
126|Will Smith|F|SJS|21|1.087|74|D|142|5|59
127|Bryan Rust|F|PIT|34|0.903|74|D|142|5|106
128|Alexis Lafrenière|F|NYR|24|1.054|84|h|142|4|141
129|Zach Hyman|F|EDM|34|0.903|74|D|141|4|71
130|Darnell Nurse|D|SJS|31|0.973|82|h|106|3|218
131|Pavel Zacha|F|BOS|29|0.953|82|h|140|2|135
132|Rasmus Sandin|D|WSH|26|1.019|78|h|105|2|NA
133|Dougie Hamilton|D|NJD|33|0.973|74|h|105|2|147
134|Dan Vladar|G|PHI|29|1.000|52|G1|100|1|166
135|Josh Manson|D|COL|34|0.973|74|D|104|1|NA
136|Brandon Montour|D|SEA|32|0.973|74|D|104|1|162
137|Nikolaj Ehlers|F|CAR|30|0.953|79|h|138|1|104
138|Owen Tippett|F|PHI|27|0.996|78|I|137|0|NA
139|Morgan Rielly|D|TOR|32|0.973|82|h|103|0|NA
140|Philipp Grubauer|G|SEA|34|1.000|52|G1|98|0|NA
141|Aliaksei Protas|F|WSH|25|1.047|78|h|137|0|160
142|Will Cuylle|F|NYR|24|1.054|84|h|137|0|NA
143|Adam Larsson|D|SEA|33|0.973|84|h|103|0|NA
144|Mattias Ekholm|D|EDM|36|0.889|77|h|103|0|NA
145|Aleksander Barkov|F|FLA|31|0.908|70|M|136|-1|43
146|Troy Terry|F|ANA|29|0.953|72|I|136|-1|NA
147|Vladislav Gavrikov|D|NYR|30|0.988|84|h|102|-1|NA
148|Rickard Rakell|F|PIT|33|0.921|74|D|136|-2|101
149|Trevor Zegras|F|PHI|25|1.047|74|D|136|-2|127
150|Gabriel Vilardi|F|WPG|27|0.996|79|h|136|-2|128
151|Shea Theodore|D|VGK|31|0.973|70|h|100|-3|149
152|Jake Allen|G|NJD|36|1.000|52|G1|95|-3|204
153|Sam Bennett|F|FLA|30|0.953|78|h|134|-3|109
154|Mathew Barzal|F|NYI|29|0.953|74|D|134|-3|122
155|Anthony Cirelli|F|TBL|29|0.953|76|h|134|-3|173
156|Roope Hintz|F|DAL|29|0.953|74|D|134|-3|84
157|Mario Ferraro|D|WPG|28|1.011|82|h|99|-4|NA
158|Vince Dunn|D|SEA|29|0.995|75|h|99|-4|169
159|Brent Burns|D|COL|41|0.889|84|h|99|-4|NA
160|Quinton Byfield|F|LAK|24|1.054|82|h|133|-5|103
161|Ivan Barbashev|F|VGK|30|0.953|79|h|132|-5|234
162|Vincent Trocheck|F|UTA|33|0.921|75|h|132|-5|130
163|Jake McCabe|D|TOR|32|0.973|76|h|98|-5|NA
164|Tyson Foerster|F|PHI|24|1.054|74|D|132|-5|199
165|Shane Pinto|F|OTT|25|1.047|74|D|132|-5|247
166|John Tavares|F|TOR|36|0.901|81|h|131|-6|87
167|Igor Chernyshov|F|SJS|20|1.120|76|J|131|-6|193
168|Linus Ullmark|G|OTT|33|1.000|52|G1|91|-7|151
169|Matthew Tkachuk|F|FLA|28|0.969|60|I|130|-7|24
170|Seth Jarvis|F|CAR|24|1.054|55|I|130|-8|NA
171|Lawson Crouse|F|UTA|29|0.953|83|h|130|-8|NA
172|Jackson Blake|F|CAR|23|1.063|83|h|129|-8|126
173|Anton Lundell|F|FLA|24|1.054|74|D|129|-8|219
174|Noah Hanifin|D|VGK|29|0.995|76|h|95|-8|242
175|Oliver Ekman-Larsson|D|TOR|35|0.955|79|h|95|-8|NA
176|Alex Ovechkin|F|WSH|41|0.901|77|h|129|-8|99
177|Matty Beniers|F|SEA|23|1.063|84|h|129|-8|NA
178|Vasily Podkolzin|F|EDM|25|1.047|84|h|129|-8|NA
179|Parker Wotherspoon|D|VGK|29|0.995|74|D|95|-9|NA
180|Ryan Pulock|D|NYI|31|0.973|77|h|95|-9|NA
181|Spencer Knight|G|CHI|25|1.000|56|G1|89|-9|187
182|Denton Mateychuk|D|CBJ|22|1.055|74|D|94|-9|NA
183|Nikita Zadorov|D|BOS|31|0.973|83|h|94|-9|NA
184|Owen Power|D|BUF|23|1.032|82|h|94|-10|NA
185|J.J. Moser|D|TBL|26|1.019|74|D|94|-10|NA
186|Philip Broberg|D|STL|25|1.019|78|h|94|-10|170
187|Victor Hedman|D|TBL|35|0.955|74|D|94|-10|132
188|Tomas Hertl|F|VGK|32|0.945|80|h|127|-10|211
189|Ivan Demidov|F|MTL|20|1.120|74|D|127|-11|100
190|Charlie Coyle|F|CBJ|34|0.903|84|h|126|-11|214
191|Timo Meier|F|NJD|29|0.953|80|h|126|-11|86
192|William Eklund|F|OTT|23|1.063|79|h|126|-11|140
193|Anthony Mantha|F|NJD|32|0.945|74|D|125|-12|177
194|Cam York|D|PHI|25|1.019|74|D|92|-12|NA
195|Evgeni Malkin|F|PIT|40|0.901|62|h|125|-12|129
196|Tyler Bertuzzi|F|CHI|31|0.951|82|h|125|-12|227
197|Jordan Spence|D|OTT|25|1.019|77|h|91|-12|NA
198|Braden Schneider|D|NYR|25|1.019|83|h|91|-12|NA
199|Luke Hughes|D|NJD|23|1.032|71|h|91|-12|192
200|Zach Benson|F|BUF|21|1.087|74|D|124|-13|143
201|Dylan Strome|F|WSH|29|0.953|83|h|124|-13|113
202|Juuse Saros|G|NSH|31|1.000|60|G1|85|-13|171
203|Elias Pettersson|F|VAN|27|0.996|74|D|124|-13|138
204|Damon Severson|D|CBJ|32|0.973|72|h|90|-13|NA
205|Carter Hart|G|VGK|28|1.000|52|G1|85|-14|152
206|Matvei Michkov|F|PHI|21|1.087|83|h|123|-14|197
207|Ryan Shea|D|EDM|29|0.995|74|D|89|-14|NA
208|Artem Zub|D|OTT|30|0.988|74|D|89|-14|NA
209|Alexandre Carrier|D|MTL|29|0.995|77|h|89|-14|NA
210|Arturs Silovs|G|PIT|25|1.000|52|G1|84|-14|239
211|Noah Cates|F|PHI|27|0.996|82|h|123|-15|NA
212|Carter Verhaeghe|F|FLA|31|0.951|81|h|123|-15|137
213|Jared McCann|F|SEA|30|0.953|74|D|122|-15|246
214|Dustin Wolf|G|CGY|25|1.000|56|G1|83|-15|240
215|Jack Quinn|F|BUF|25|1.047|81|h|122|-15|NA
216|Ben Chiarot|D|DET|35|0.955|84|h|88|-15|NA
217|Jamie Drysdale|D|PHI|24|1.029|77|h|88|-16|NA
218|Mikey Anderson|D|LAK|27|1.019|81|h|87|-16|NA
219|Matt Roy|D|WSH|31|0.973|77|h|87|-17|NA
220|Kiefer Sherwood|F|SJS|31|0.951|76|h|121|-17|221
221|Kris Letang|D|PIT|39|0.889|76|h|87|-17|NA
222|Louis Crevier|D|BUF|25|1.019|74|D|87|-17|NA
223|Dmitry Orlov|D|SJS|35|0.955|82|h|87|-17|NA
224|Devon Toews|D|COL|32|0.973|74|D|86|-17|NA
225|Seth Jones|D|FLA|31|0.973|58|h|86|-17|167
226|Ryan Leonard|F|WSH|21|1.087|74|D|120|-17|209
227|Ryan McDonagh|D|TBL|37|0.889|74|D|86|-17|NA
228|Ryan McLeod|F|BUF|27|0.996|82|h|120|-17|NA
229|Tony DeAngelo|D|NYI|30|0.988|74|D|86|-17|NA
230|John Marino|D|UTA|29|0.995|74|D|86|-18|NA
231|Lukas Dostal|G|ANA|26|1.000|56|G1|81|-18|188
232|Connor McMichael|F|STL|25|1.047|82|h|119|-18|230
233|Christian Dvorak|F|PHI|30|0.953|83|h|119|-18|NA
234|Aaron Ekblad|D|FLA|30|0.988|74|D|85|-18|NA
235|Thatcher Demko|G|VAN|30|1.000|52|G1|80|-18|NA
236|Brayden Point|F|TBL|30|0.953|74|D|119|-18|60
237|Viktor Arvidsson|F|DET|33|0.921|70|h|119|-18|212
238|Jacob Markstrom|G|FLA|36|1.000|52|G1|80|-18|78
239|Mason Lohrei|D|BOS|25|1.019|76|h|85|-18|NA
240|Charle-Edouard D'Astous|D|TBL|28|1.011|72|h|85|-19|NA
241|Brayden McNabb|D|VGK|35|0.955|74|D|85|-19|NA
242|Colton Parayko|D|STL|33|0.973|74|h|85|-19|243
243|Bobby McMann|F|SEA|30|0.953|78|h|118|-19|202
244|Brad Marchand|F|FLA|38|0.901|61|h|118|-19|180
245|Patrick Kane|F|CHI|37|0.901|74|D|118|-20|139
246|Gustav Forsling|D|FLA|30|0.988|82|h|84|-20|NA
247|Ian Cole|D|CHI|37|0.889|84|h|84|-20|NA
248|Luke Evangelista|F|NJD|24|1.054|78|h|117|-20|176
249|Joel Edmundson|D|LAK|33|0.973|80|h|83|-20|NA
250|Tyler Kleven|D|OTT|24|1.029|75|h|83|-21|NA
251|J.T. Miller|F|NYR|33|0.921|74|D|116|-21|88
`.trim();

  const SRC_LABEL = {
    h: 'historique',
    D: 'plancher durable 74 MJ',
    J: 'plancher jeune promu 76 MJ',
    M: 'ajout manuel · base 2024-25',
    I: 'ajusté au fichier blessures',
    G1: 'partant désigné (rang NHL.com)'
  };

  // fichier 04 — blessures et rôles (presse, pas API). Seuls les joueurs présents au tableau.
  const INJ = {
    'Aleksander Barkov': { status: 'De retour', conf: 'med', gp: 70, note: 'Genou : a raté toute la saison 25-26. De retour au camp selon Florida. Projeté depuis 2024-25 avec pénalité de retour ×0,92 — estimation assumée.' },
    'Auston Matthews': { status: 'De retour', conf: 'med', gp: 72, note: 'Déchirure du LLI grade 3 (12 mars 2026), chirurgie le 19 mars, 12 semaines. Retour estimé 15 sept. 2026 (RotoWire).' },
    'Matthew Tkachuk': { status: 'Chronique', conf: 'med', gp: 60, note: 'Adducteur arraché + hernie sportive, chirurgie été 2025, 31 matchs en 25-26. Deux saisons écourtées de suite : le risque est la disponibilité, pas le talent.' },
    'Seth Jarvis': { status: 'Absent au départ', conf: 'high', gp: 55, note: 'Chirurgie à l\'épaule après la Coupe. Absence de 4 à 6 mois : hors jeu de fin octobre à fin décembre 2026.' },
    'Connor Bedard': { status: 'De retour', conf: 'med', gp: 74, note: 'Épaule. Prolongation 5 ans / 75 M$ signée pendant la convalescence. Classé « (INJ.) » 68e par NHL.com.' },
    'Troy Terry': { status: 'De retour', conf: 'low', gp: 72, note: 'Sur la liste « Key injuries » de NHL.com, nature non précisée. 21 matchs manqués en 25-26. ANA est encombré : son rôle peut rétrécir.' },
    'Owen Tippett': { status: 'De retour', conf: 'med', gp: 78, note: 'Se dit « confiant d\'un rétablissement complet » et visait le camp de septembre. Reste dans le top 6 de PHI, risque faible.' },
    'Charlie McAvoy': { status: 'Suspendu', conf: 'low', gp: null, note: 'Aucune blessure signalée — listé comme SUSPENDU au 131e rang de NHL.com, durée non précisée. Vérifier avant de le repêcher.' }
  };

  const players = RAW.split('\n').map((line, i) => {
    const c = line.split('|');
    const num = v => (v === 'NA' || v === '' ? null : Number(v));
    const rank = Number(c[0]);
    const nhl = num(c[10]);
    const gp = Number(c[6]);
    const proj = Number(c[8]);
    const inj = INJ[c[1]] || null;
    return {
      id: i + 1,
      value_rank: rank,
      name: c[1],
      pos: c[2],
      team: c[3],
      age: Number(c[4]),
      age_mult: Number(c[5]),
      gp_proj: gp,
      gp_src: c[7],
      gp_src_label: SRC_LABEL[c[7]] || c[7],
      fp_proj: proj,
      fpg_proj: Math.round((proj / gp) * 100) / 100,
      vorp: Number(c[9]),
      nhl_rank: nhl,
      edge: nhl == null ? null : nhl - rank,
      // consensus: ordre de départ probable. Sans rang NHL.com → part tard.
      consensus: nhl == null ? 250 + rank * 0.4 : nhl,
      injury: inj,
      bet: c[7] === 'J',          // plancher jeune promu = pari, pas mesure
      manual: c[7] === 'M',       // reprojeté à la main
      aged: Number(c[4]) >= 34    // courbe d'âge trop optimiste après 33 ans
    };
  });

  window.DRAFT_PLAYERS = players;
  // Joueurs dont Fantrax écrit le prénom autrement que ce tableau : [nom Fantrax, nom du tableau].
  // Utilisé partout où on compare des noms (fantrax.js, ballottage, sync, alignements).
  window.NAME_ALIAS = [['Daniel Vladar', 'Dan Vladar'], ['Alex Carrier', 'Alexandre Carrier']];
  window.DRAFT_META = {
    generated: '2026-09-05',
    source: 'fichier 09 — tableau final corrigé (API officielle LNH + top 250 NHL.com du 2026-09-02)',
    season_games: 84,
    replacement: { F: 73, D: 49, G: 17 },
    absent: [
      'Porter Martone, Anton Frondell, Konsta Helenius et 8 autres recrues : classés par NHL.com sans aucune statistique LNH. Aucun chiffre n\'a été inventé pour eux — ils ne sont pas au tableau.',
      '52 joueurs sans équipe au 5 septembre (agents libres, retraités, partis à l\'étranger) : matchs attendus 0, sortis du tableau.',
      'Alex Pietrangelo, Filip Gustavsson, Frederik Andersen, Gabriel Landeskog, Kevin Fiala, Max Domi, Matt Savoie : signalés au fichier 04 mais hors du top 250.'
    ],
    warnings: [
      ['Le plancher des jeunes promus est un pari', 'Chernyshov, Cooley et les autres « jeunes promus » reçoivent 76 matchs alors qu\'ils en ont joué 23 à 46. Si tu ne vois pas leur nom dans l\'alignement au camp, la projection est fausse.'],
      ['L\'ordre des gardiens vient de NHL.com', 'Aucun poste de partant n\'est confirmé par une équipe. Edmonton est le pire cas : trois gardiens, Andersen blessé, aucun désigné.'],
      ['Aucun trio ni unité d\'avantage numérique', 'Un joueur promu sur un premier trio n\'est pas détecté. Daily Faceoff publie les trios pendant le camp — va les chercher la veille.'],
      ['Les tours du chapeau valent zéro', 'Aucune source ne les publie. Sous-estime les gros buteurs de 6 à 10 pts sur la saison. Marge d\'erreur connue, non corrigée.'],
      ['La courbe d\'âge est trop gentille après 33 ans', 'Biais de survie. Sois plus sévère que le tableau pour tout joueur de 34 ans et plus (marqués 🕰).'],
      ['Barkov et Pietrangelo sont des ajouts manuels', 'Projetés depuis 2024-25 avec une pénalité de retour de ×0,92 qui est une estimation assumée, pas une mesure.'],
      ['Aucune régression vers la moyenne dans le modèle de base', 'Une saison hors norme entre telle quelle, comme si c\'était le nouveau niveau du joueur. Les marqueurs 🔺 (pic isolé) et le tri « VORP régressé » corrigent ça par-dessus — le taux de retour choisi (−38 % du pic, −15 % pour une hausse) est une hypothèse assumée, pas une mesure.']
    ]
  };
})();
