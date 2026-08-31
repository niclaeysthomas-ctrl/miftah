/* ============================================================
   MIFTAH — LE FUṢḤÁ (الفُصْحى) : l'arabe classique / littéral
   ------------------------------------------------------------
   Module entier, indépendant du parcours darija. Objectif :
   parler et lire l'arabe dans sa version la PLUS PURE possible —
   i3rab prononcé, lexique non dialectal, phonétique intégrale.
   Honnêteté de fond : personne n'a le fuṣḥā comme langue
   maternelle. C'est une langue apprise, partout, par tous.
   ============================================================ */

window.FUSHA = {};

/* ---------- 1. COMPRENDRE — les fiches de cadrage ----------
   { id, ic, t, sub, html }
*/
FUSHA.lecons = [
  {
    id:'quoi', ic:'📜', t:'Ce que tu demandes exactement',
    sub:'فُصْحى = « la plus éloquente »',
    html:`<p><b>الفُصْحى</b> (<i>al-fuṣḥā</i>) n'est pas un nom propre : c'est un adjectif au superlatif, féminin de <b>فَصيح</b> <i>faṣīḥ</i> « clair, éloquent ». Littéralement : <b>la langue la plus claire</b>. Les Arabes ne l'ont jamais appelée « l'arabe » — ils l'ont appelée <i>la plus pure</i>. Ta question a donc un nom en arabe depuis 14 siècles.</p>
    <p>Sous ce mot il y a <b>deux couches</b> :</p>
    <div class="expl"><b>1. L'arabe classique</b> (التُّراث) — celui du Coran, de la poésie préislamique, d'Ibn Khaldūn. Figé, codifié au VIII<sup>e</sup> s. par Sībawayh dans <i>al-Kitāb</i>.</div>
    <div class="expl mt"><b>2. L'arabe standard moderne</b> (فُصْحى العَصْر, « le fuṣḥā de l'époque ») — né avec la <i>Nahḍa</i> au XIX<sup>e</sup> s. <b>Même grammaire</b>, même morphologie, mêmes règles. Ce qui change : le lexique (téléphone, démocratie, parlement), le style, les phrases plus courtes, les calques d'Europe.</div>
    <p class="mt">Autrement dit : <b>tu n'as pas à choisir</b>. Qui maîtrise la grammaire du standard moderne lit al-Mutanabbī ; la différence est de vocabulaire et de goût, pas de système. Dans ce module, la grammaire enseignée est la classique — c'est la même.</p>`
  },
  {
    id:'diglossie', ic:'🪞', t:'Personne ne l\'a comme langue maternelle',
    sub:'La diglossie — le fait central',
    html:`<p>C'est <b>le</b> fait à comprendre avant tout le reste. Le linguiste Charles Ferguson a forgé le terme <b>diglossie</b> en 1959, et l'arabe était son cas d'école : deux variétés de la même langue coexistent, avec des rôles séparés.</p>
    <div class="expl"><b>Variété haute (H)</b> = le fuṣḥā. Apprise <b>à l'école</b>, jamais à la maison. Écrit, JT, discours, prêche, cours, littérature.</div>
    <div class="expl mt"><b>Variété basse (L)</b> = la darija, l'égyptien, le libanais… Apprise <b>de sa mère</b>. Parlée partout, écrite presque jamais.</div>
    <p class="mt">Conséquence brutale et vraie : sur ~<b>400 millions</b> d'arabophones, <b>zéro</b> n'a le fuṣḥā comme langue maternelle. Un enfant marocain arrive à l'école en darija et découvre le fuṣḥā comme une langue proche mais étrangère — un peu comme un enfant français à qui on apprendrait à écrire en latin.</p>
    <p><b>Ce que ça veut dire pour toi :</b> tu n'es pas « en retard » sur les natifs en fuṣḥā. Sur ce terrain-là, eux aussi ont dû l'apprendre. Un bon étudiant étranger parle un fuṣḥā plus propre que beaucoup de natifs — ça arrive tous les jours.</p>`
  },
  {
    id:'ou', ic:'🎙️', t:'Où on la parle vraiment',
    sub:'La carte honnête des usages',
    html:`<p><b>Le fuṣḥā se parle</b> — pas au café, mais il se parle :</p>
    <div class="expl">Le journal télévisé · un discours politique · la <i>khuṭba</i> du vendredi · une conférence, un cours · un débat sur al-Jazeera · un dessin animé doublé · le théâtre · tout ce qui est écrit, lu, officiel.</div>
    <p class="mt"><b>Il ne se parle pas</b> : commander un café, râler dans un taxi, draguer, raconter une blague, s'engueuler. Là, c'est darija — et c'est irremplaçable.</p>
    <p>Entre les deux, il y a le registre réel des gens cultivés : <b>لُغَة المُثَقَّفين</b> (« la langue des lettrés »), un dialecte tiré vers le fuṣḥā par le vocabulaire. C'est ce que tu entendras dans un débat d'idées entre Marocains et Égyptiens.</p>
    <div class="expl warn"><b>L'image juste :</b> parler fuṣḥā pur dans un café de Casablanca, c'est commander un café en alexandrins. Tu seras compris. Tu seras respecté. Et tu seras un peu étrange. Ce n'est pas une raison de ne pas l'apprendre — c'est une raison de savoir <b>quand</b> le sortir.</div>`
  },
  {
    id:'gain', ic:'⚖️', t:'Ce que ça t\'ouvre, ce que ça ne t\'ouvre pas',
    sub:'Le bilan sans marketing',
    html:`<p><b>Ça t'ouvre :</b></p>
    <div class="expl">· <b>Tout l'écrit</b>, du Coran à al-Jazeera, sans passer par une traduction.<br>
    · <b>22 pays d'un coup</b> — le fuṣḥā est la seule variété comprise de Rabat à Mascate.<br>
    · <b>La structure</b> : le système racine + schème. C'est le vrai cadeau. Une fois que tu vois que كَتَبَ / كِتاب / مَكْتَب / كاتِب sont la même racine ك-ت-ب pliée dans des moules, la darija devient <b>lisible</b>, et ton vocabulaire arrête d'être une liste.<br>
    · <b>15 siècles de textes</b>, sans rupture. Peu de langues offrent ça.</div>
    <p class="mt"><b>Ça ne t'ouvre pas :</b> la conversation avec tes potes marocains. Aucun d'eux ne te répondra en fuṣḥā — et s'ils le font, c'est pour rire ou pour citer.</p>
    <div class="expl warn"><b>Le chiffre honnête :</b> les 2200 h du FSI (catégorie IV, vers C1) sont mesurées <b>sur le fuṣḥā</b>. C'est un investissement lourd. Le bon dosage pour toi : la darija reste le tronc — tes potes sont ton avantage décisif — et le fuṣḥā devient la <b>colonne vertébrale</b>. 10 minutes par jour ici suffisent à tenir les deux.</div>`
  },
  {
    id:'purete', ic:'💎', t:'Les 3 curseurs de la pureté',
    sub:'« La version la plus pure » — définie précisément',
    html:`<p>« Parler un arabe pur » n'est pas une impression, c'est <b>trois réglages mesurables</b>. Tout ce module ne fait que les monter l'un après l'autre.</p>
    <div class="expl"><b>Curseur 1 — l'i3rab (الإعْراب).</b> Prononcer les désinences de cas : <i>al-baytu</i> (sujet), <i>al-bayta</i> (COD), <i>al-bayti</i> (après préposition). C'est <b>le</b> marqueur. La quasi-totalité des locuteurs le sautent hors lecture. Le monter à fond = parler comme un récitant. → salle ⚜️</div>
    <div class="expl mt"><b>Curseur 2 — la phonétique intégrale.</b> Prononcer ce que la darija a effacé : ث ذ ظ, la vraie <i>qāf</i> uvulaire, la <i>hamza</i>, et surtout <b>toutes les voyelles brèves</b> (fuṣḥā <i>katabtu</i>, darija <i>ktebt</i>). → salle 🔊</div>
    <div class="expl mt"><b>Curseur 3 — le lexique et la tournure.</b> Zéro mot dialectal, zéro emprunt français (<i>tomobil</i> → <b>سَيّارة</b>), zéro calque européen, et les tournures propres à l'arabe : phrase nominale, verbe en tête, <i>iḍāfa</i>. → salles 🗝️ et ⚙️</div>
    <p class="mt">Le degré ultime des trois curseurs à fond, c'est la <b>récitation coranique</b> avec les règles du <i>tajwīd</i> (allongements, assimilations, points d'articulation). C'est le sommet historique de « l'arabe pur » — et une discipline à part entière.</p>`
  },
  {
    id:'translit', ic:'🔤', t:'Fini l\'arabizi',
    sub:'La translittération scientifique',
    html:`<p>Le <i>3</i>, le <i>7</i>, le <i>9</i> sont un code de SMS dialectal — parfait pour écrire <i>3ndi</i> à un pote, hors sujet ici. En fuṣḥā, on écrit soit en <b>arabe vocalisé</b>, soit dans la translittération des arabisants. Elle est dans toute l'app à partir de maintenant :</p>
    <div class="expl"><b>ʾ</b> = ء hamza (coup de glotte) · <b>ʿ</b> = ع ʿayn<br>
    <b>ā ī ū</b> = voyelles <b>longues</b> (ا ي و) — la longueur change le sens<br>
    <b>th</b> = ث · <b>dh</b> = ذ · <b>sh</b> = ش · <b>ḥ</b> = ح · <b>kh</b> = خ · <b>gh</b> = غ · <b>q</b> = ق<br>
    <b>ṣ ḍ ṭ ẓ</b> = les quatre <b>emphatiques</b> ص ض ط ظ (le point sous la lettre = fond de bouche)</div>
    <p class="mt">Le point sous la lettre veut toujours dire la même chose : <b>même son, mais la langue se creuse et l'arrière de la bouche se ferme</b>. C'est ce qui fait la couleur sombre de l'arabe.</p>`
  },
  {
    id:'mashkul', ic:'✒️', t:'Le texte vocalisé (مَشْكول)',
    sub:'Pourquoi 99 % des textes te cachent les voyelles',
    html:`<p>L'arabe s'écrit avec les consonnes et les voyelles longues. Les <b>voyelles brèves</b> sont des signes ajoutés au-dessus/en dessous — les <b>ḥarakāt</b> :</p>
    <div class="expl"><b>َ</b> fatḥa = a · <b>ُ</b> ḍamma = u · <b>ِ</b> kasra = i · <b>ْ</b> sukūn = pas de voyelle<br>
    <b>ّ</b> shadda = consonne doublée · <b>ً ٌ ٍ</b> tanwīn = -an / -un / -in (la marque de l'indéfini)</div>
    <p class="mt">Un texte qui les affiche est dit <b>مَشْكول</b> <i>mashkūl</i> (« vocalisé »). Trois catégories seulement le sont : <b>le Coran</b>, <b>la poésie</b>, et <b>les livres pour apprenants et enfants</b>. Tout le reste — journaux, romans, panneaux — est nu.</p>
    <div class="expl warn"><b>La conséquence, et c'est le vrai mur :</b> lire de l'arabe, ce n'est pas déchiffrer, c'est <b>reconstruire les voyelles manquantes à partir de la grammaire</b>. كتب peut être <i>kataba</i> (il a écrit), <i>kutiba</i> (il a été écrit), <i>kutub</i> (des livres). Seule la grammaire tranche. C'est exactement ce que l'i3rab et les schèmes entraînent — d'où l'ordre des salles.</div>`
  },
  {
    id:'waqf', ic:'⏸️', t:'Le waqf : la règle qui te sauve',
    sub:'Pourquoi tu entends « kitāb » et pas « kitābun »',
    html:`<p>Règle classique, valable pour tout le monde, y compris les récitants : <b>à la pause, on ne prononce pas la désinence finale</b>. C'est le <b>وَقْف</b> <i>waqf</i>.</p>
    <div class="expl">هٰذا كِتابٌ → en liaison : <i>hādhā kitābun</i><br>
    هٰذا كِتابْ → à la pause (fin de phrase) : <i>hādhā <b>kitāb</b></i></div>
    <p class="mt">Deux exceptions à connaître : le <b>tanwīn -an</b> (ـً) devient <b>-ā</b> à la pause (شُكْرًا → <i>shukrā</i>), et le <b>ة</b> tā' marbūṭa se prononce simplement <b>-ah</b> ou <b>-a</b> (مَدينَةٌ → <i>madīna</i>).</p>
    <div class="expl"><b>Ce que ça t'autorise :</b> tu peux parler juste sans prononcer l'i3rab à chaque mot — tu marques une pause. C'est ce que fait tout présentateur télé qui hésite. <b>Et ce que ça exige</b>, si tu veux le curseur à fond : dès que tu <b>enchaînes</b>, tu dois donner la bonne finale. C'est là que se joue « le plus pur possible ».</p></div>`
  },
  {
    id:'audio', ic:'🔊', t:'Ici, l\'audio ne te ment plus',
    sub:'La synthèse vocale parle enfin la bonne langue',
    html:`<p>Dans les autres onglets de MIFTAH, je t'ai répété que la voix de synthèse te trompait : elle lit en <b>arabe standard</b> alors que tu apprenais la darija.</p>
    <div class="expl"><b>Dans ce module, c'est exactement l'inverse : elle dit vrai.</b> Toutes les voix arabes (Maged, Tarik, Laila…) sont entraînées sur le fuṣḥā, avec les vraies ث ذ ظ ق. Le bouton 🔊 devient une référence légitime.</div>
    <p class="mt">Deux limites à garder en tête : la synthèse <b>ignore souvent l'i3rab final</b> (elle lit en waqf) et son rythme est plat. Pour l'oreille haut de gamme, la référence reste : un JT d'al-Jazeera, un récitant (le tajwīd est l'étalon-or de la prononciation), ou une pièce de théâtre en fuṣḥā.</p>`
  }
];

/* ---------- 2. LES SONS QUE LA DARIJA A PERDUS ----------
   { ar, nom, tr, t, comment, piege, contraste:[{ar,tr,d,fr}] }
   contraste : le MÊME mot, prononcé en fuṣḥā (tr) vs en darija (d).
*/
FUSHA.sons = [
  {
    ar:'ث', nom:'thāʾ', tr:'th', t:'Le TH anglais de « think »',
    comment:"Langue <b>entre les dents</b>, souffle continu, sans voix. C'est exactement le <i>th</i> de l'anglais <i>think</i>, ou le <b>z castillan</b> de <i>zapato</i> — tu l'as déjà si tu as fait de l'espagnol d'Espagne.",
    piege:"La darija l'a <b>fondu en « t »</b> : تلاتة <i>tlata</i>. Si tu dis <i>talāta</i> en fuṣḥā, tu parles marocain avec un costume. Il faut ressortir la langue.",
    contraste:[
      {ar:'ثَلاثَة', tr:'thalātha', d:'tlata', fr:'trois'},
      {ar:'ثَمانِيَة', tr:'thamāniya', d:'tmnya', fr:'huit'},
      {ar:'ثَوْب', tr:'thawb', d:'tub', fr:'un vêtement'},
      {ar:'حَديث', tr:'ḥadīth', d:'7dit', fr:'un propos / un hadith'}
    ]
  },
  {
    ar:'ذ', nom:'dhāl', tr:'dh', t:'Le TH anglais de « this »',
    comment:"Le même geste que ث, <b>mais avec la voix</b>. Langue entre les dents et cordes vocales qui vibrent : le <i>th</i> de <i>this</i>, <i>mother</i>. Dis ث puis allume ta voix.",
    piege:"La darija l'a fondu en <b>« d »</b> : هادا <i>hada</i>. Or هٰذا <i>hādhā</i> est le mot le plus fréquent de l'arabe écrit — le rater, c'est signer dialectal à chaque phrase.",
    contraste:[
      {ar:'هٰذا', tr:'hādhā', d:'hada', fr:'ceci / ce…-ci'},
      {ar:'ذٰلِكَ', tr:'dhālika', d:'dak', fr:'cela / ce…-là'},
      {ar:'ذَهَب', tr:'dhahab', d:'dheb', fr:'l\'or'},
      {ar:'أُسْتاذ', tr:'ustādh', d:'ustad', fr:'un professeur'}
    ]
  },
  {
    ar:'ظ', nom:'ẓāʾ', tr:'ẓ', t:'Le TH de « this »… emphatique',
    comment:"Le son le plus rare et le plus prestigieux. Valeur classique : <b>ذ prononcé emphatique</b> — langue entre les dents, voix, <b>et</b> fond de la bouche creusé/fermé, ce qui assombrit la voyelle d'à côté. (Beaucoup d'arabophones modernes du Levant et d'Égypte le disent [zˤ] ; en récitation coranique et dans le Golfe, la valeur [ðˤ] tient.)",
    piege:"La darija l'a <b>fusionné avec ض</b> : <i>ḍhar</i> pour ظَهْر. Les deux lettres sont devenues un seul son. En fuṣḥā pur, ce sont deux phonèmes distincts — c'est même à ça qu'on reconnaît un lecteur soigné. L'arabe s'appelle d'ailleurs « la langue du ḍād » (لُغَة الضّاد).",
    contraste:[
      {ar:'ظُهْر', tr:'ẓuhr', d:'dhor', fr:'midi'},
      {ar:'نَظَرَ', tr:'naẓara', d:'shaf', fr:'il a regardé'},
      {ar:'مَحْفوظ', tr:'maḥfūẓ', d:'ma7fud', fr:'conservé / mémorisé'},
      {ar:'عَظيم', tr:'ʿaẓīm', d:'3adim', fr:'immense / grandiose'}
    ]
  },
  {
    ar:'ق', nom:'qāf', tr:'q', t:'Le K du fond de la gorge',
    comment:"Le <b>k le plus reculé possible</b> : pas contre le palais (ك), mais contre la <b>luette</b>, là où tu fais le خ mais en fermant complètement. Essaie : dis « k » puis recule le point de contact jusqu'à ce que ça sonne sombre et sec.",
    piege:"C'est le son le plus <b>instable</b> du monde arabe : en darija tu entends <i>q</i> (qahwa), <i>g</i> (gal « il a dit »), et dans certaines villes un coup de glotte. En fuṣḥā : <b>toujours l'uvulaire</b>, jamais g, jamais ʾ. Paire minimale à graver — قَلْب <i>qalb</i> (cœur) vs كَلْب <i>kalb</i> (chien).",
    contraste:[
      {ar:'قَلْب', tr:'qalb', d:'9alb', fr:'un cœur'},
      {ar:'قالَ', tr:'qāla', d:'gal', fr:'il a dit'},
      {ar:'قَريب', tr:'qarīb', d:'qrib', fr:'proche'},
      {ar:'سوق', tr:'sūq', d:'souq', fr:'un marché'}
    ]
  },
  {
    ar:'ء', nom:'hamza', tr:'ʾ', t:'Le coup de glotte, prononcé pour de bon',
    comment:"Un <b>arrêt net</b> des cordes vocales, comme entre les deux mots de « les héros » quand on refuse la liaison, ou le petit coup avant un « oh ! » d'étonnement. Ce n'est pas rien : <b>c'est une consonne à part entière</b>.",
    piege:"La darija l'<b>avale</b> presque toujours : رَأْس <i>raʾs</i> → <i>ras</i>, ماء <i>māʾ</i> → <i>ma</i>. En fuṣḥā, l'omettre change le mot. Et ne la confonds pas avec le <b>ع</b> : la hamza est un <b>silence</b> brutal, le ʿayn est un <b>son serré</b> et sonore.",
    contraste:[
      {ar:'رَأْس', tr:'raʾs', d:'ras', fr:'une tête'},
      {ar:'ماء', tr:'māʾ', d:'ma', fr:'l\'eau'},
      {ar:'سَأَلَ', tr:'saʾala', d:'sewwel', fr:'il a demandé'},
      {ar:'شَيْء', tr:'shayʾ', d:'shi', fr:'une chose'}
    ]
  },
  {
    ar:'ـَـُـِ', nom:'al-ḥarakāt', tr:'a · u · i', t:'Toutes les voyelles brèves, prononcées',
    comment:"C'est <b>la</b> différence de rythme, plus audible encore que les consonnes. Le fuṣḥā est une langue <b>syllabée</b> : chaque consonne porte sa voyelle, et un mot ne commence <b>jamais</b> par deux consonnes collées.",
    piege:"La darija a écrasé les brèves et fabriqué des grappes de consonnes : <i>ktebt</i>, <i>mdina</i>, <i>kbir</i>, <i>shreb</i>. En fuṣḥā ces mots respirent : <b>ka-tab-tu</b>, <b>ma-dī-na</b>, <b>ka-bīr</b>, <b>sha-ri-ba</b>. Si tu gardes le rythme marocain, tout le reste sonnera faux, même avec les bonnes consonnes.",
    contraste:[
      {ar:'كَتَبْتُ', tr:'katabtu', d:'ktebt', fr:'j\'ai écrit'},
      {ar:'مَدينَة', tr:'madīna', d:'mdina', fr:'une ville'},
      {ar:'كَبير', tr:'kabīr', d:'kbir', fr:'grand'},
      {ar:'شَرِبَ', tr:'shariba', d:'shreb', fr:'il a bu'}
    ]
  },
  {
    ar:'ا ي و', nom:'al-madd', tr:'ā · ī · ū', t:'La longueur change le mot',
    comment:"Une voyelle longue dure <b>deux fois</b> une brève, franchement. Ce n'est pas un effet de style : c'est <b>phonémique</b> — la longueur seule distingue deux mots différents.",
    piege:"Le français ne distingue plus les longues : tu vas naturellement tout égaliser. Écoute et tiens la voyelle. En récitation, le <i>madd</i> peut même durer 4 ou 6 temps — c'est une règle codifiée du tajwīd.",
    contraste:[
      {ar:'جَمَل', tr:'jamal', d:'— (chameau)', fr:'un chameau'},
      {ar:'جَميل', tr:'jamīl', d:'— (beau)', fr:'beau'},
      {ar:'مَلِك', tr:'malik', d:'— (roi)', fr:'un roi'},
      {ar:'مالِك', tr:'mālik', d:'— (propriétaire)', fr:'un propriétaire'}
    ]
  },
  {
    ar:'الـ', nom:'al-shamsiyya', tr:'al- / ash-', t:'L\'article qui se colle : lettres solaires',
    comment:"L'article est toujours écrit <b>الـ</b>. Mais devant <b>14 lettres dites solaires</b>, le <b>l</b> ne se prononce pas : il s'assimile et <b>double</b> la consonne suivante (shadda). Les 14 autres, dites lunaires, gardent le <i>l</i>.<br><b>Solaires :</b> ت ث د ذ ر ز س ش ص ض ط ظ ل ن — toutes articulées avec la pointe de la langue, comme le <i>l</i>. Voilà la logique, ce n'est pas une liste arbitraire.",
    piege:"Les noms mêmes de la règle sont l'exemple : الشَّمْس <i>ash-shams</i> (le soleil, solaire) vs القَمَر <i>al-qamar</i> (la lune, lunaire). La darija fait la même assimilation — c'est un réflexe que tu as déjà. Mais elle réduit souvent l'article à <i>l-</i> : ici on dit <b>al-</b> plein.",
    contraste:[
      {ar:'الشَّمْس', tr:'ash-shams', d:'sh-shems', fr:'le soleil (solaire)'},
      {ar:'القَمَر', tr:'al-qamar', d:'l-qamar', fr:'la lune (lunaire)'},
      {ar:'الرَّجُل', tr:'ar-rajul', d:'r-rajel', fr:'l\'homme (solaire)'},
      {ar:'البَيْت', tr:'al-bayt', d:'l-bit', fr:'la maison (lunaire)'}
    ]
  }
];

/* ---------- 3. LE PONT darija → fuṣḥā ----------
   Il connaît déjà ~130 mots de darija. On ne repart pas de zéro :
   on montre où chaque mot atterrit en fuṣḥā, et POURQUOI.
*/
FUSHA.regles_pont = [
  { t:'Les voyelles brèves retombent', x:"La darija est le fuṣḥā <b>compressé</b>. Remets les brèves et tu retrouves l'original : <i>kteb</i> → كَتَبَ <b>kataba</b>, <i>mdina</i> → مَدينَة <b>madīna</b>, <i>shreb</i> → شَرِبَ <b>shariba</b>." },
  { t:'ث → t · ذ → d · ظ → ḍ', x:"Trois consonnes fondues. Le chemin inverse est régulier : <i>tlata</i> → ثَلاثَة, <i>hada</i> → هٰذا, <i>dhor</i> → ظُهْر." },
  { t:'La négation ما…ش vient du fuṣḥā', x:"<b>ما … شَيْء</b> (« ne … chose ») s'est soudé en <i>ma…sh</i> — exactement comme le français « ne … pas » vient de « pas » (un pas). En fuṣḥā on n'encadre pas : <b>لا أَعْرِفُ</b> <i>lā aʿrifu</i>, <b>لَمْ أَفْهَمْ</b> <i>lam afham</i>." },
  { t:'Les interrogatifs sont des contractions', x:"<i>ash / shnu</i> ← أَيّ شَيْء <i>ayyu shayʾ</i> (quelle chose) · <i>fin</i> ← في أَيْنَ <i>fī ayna</i> · <i>kifash</i> ← كَيْفَ + ash. En fuṣḥā, les formes pleines : <b>ما · ماذا · مَنْ · أَيْنَ · مَتى · لِماذا · كَيْفَ · كَمْ</b>." },
  { t:'Le futur ghadi est un participe classique', x:"<i>ghadi nemshi</i> — غادٍ <b>ghādin</b> est le participe actif de غَدا « aller de bon matin, se diriger vers ». Un mot du dictionnaire classique devenu auxiliaire. En fuṣḥā le futur se fait avec <b>سَـ</b> ou <b>سَوْفَ</b> : سَأَذْهَبُ <i>saʾadhhabu</i>." },
  { t:'Le préfixe ka- n\'existe pas', x:"<i>kanakul</i> = je mange (habituellement). Le fuṣḥā n'a <b>pas</b> cette distinction : <b>آكُلُ</b> <i>ākulu</i> couvre « je mange » et « je suis en train de manger ». (L'origine du <i>ka-</i> marocain est discutée — souvent rattachée à كانَ.)" },
  { t:'Les emprunts français sautent', x:"Le fuṣḥā a forgé ses propres mots, souvent très beaux : <i>tomobil</i> → <b>سَيّارَة</b> <i>sayyāra</i> (« celle qui circule ») · <i>telifun</i> → <b>هاتِف</b> <i>hātif</i> (« celui qui appelle ») · <i>kuzina</i> → <b>مَطْبَخ</b> <i>maṭbakh</i> (« le lieu où l'on cuit »)." },
  { t:'Attention aux faux amis', x:"Certains mots ont <b>survécu en glissant</b> : <i>7ut</i> = poisson en darija, mais حوت <b>ḥūt</b> = <b>baleine</b> en fuṣḥā (poisson = سَمَك) · <i>bit</i> = chambre en darija, mais بَيْت <b>bayt</b> = <b>maison</b> · <i>dar</i> = maison en darija, دار <b>dār</b> = demeure, plus littéraire." }
];

/* paires : { d (darija arabizi), fr, ar (fuṣḥā vocalisé), tr, n (note) } */
FUSHA.ponts = [
  {
    id:'salut', ic:'🤝', t:'Saluer & la politesse',
    note:"Bonne nouvelle : c'est le domaine où la darija a le mieux <b>conservé</b> le fuṣḥā. Presque tout passe tel quel.",
    paires:[
      { d:'salam 3likum', fr:'bonjour (à vous)', ar:'السَّلامُ عَلَيْكُمْ', tr:'as-salāmu ʿalaykum', n:'Du fuṣḥā pur, intact. Littéralement « la paix sur vous » — <i>as-salāmu</i> porte la ḍamma du sujet.' },
      { d:'sba7 lkhir', fr:'bonjour (matin)', ar:'صَباحُ الخَيْرِ', tr:'ṣabāḥu l-khayr', n:'Une <i>iḍāfa</i> : « matin du bien ». Le 2<sup>e</sup> terme prend la kasra.' },
      { d:'msa lkhir', fr:'bonsoir', ar:'مَساءُ الخَيْرِ', tr:'masāʾu l-khayr' },
      { d:'labas ?', fr:'ça va ?', ar:'كَيْفَ حالُكَ؟', tr:'kayfa ḥāluka', n:'<i>labas</i> vient bien du fuṣḥā لا بَأْسَ « pas de mal », mais comme salutation c\'est dialectal.' },
      { d:'bikhir', fr:'ça va bien', ar:'بِخَيْرٍ', tr:'bi-khayrin', n:'Après la préposition بِ : kasra + tanwīn.' },
      { d:'l7amdulillah', fr:'Dieu merci', ar:'الحَمْدُ لِلّٰهِ', tr:'al-ḥamdu li-llāh', n:'Le cas d\'école de l\'i3rab : <i>al-ḥamdu</i> ḍamma (sujet), <i>li-llāhi</i> kasra (après لِ).' },
      { d:'shukran', fr:'merci', ar:'شُكْرًا', tr:'shukran', n:'Le ـً final est un <b>accusatif</b> ! Littéralement « [je te rends] remerciement ».' },
      { d:'3afak', fr:'s\'il te plaît', ar:'مِنْ فَضْلِكَ', tr:'min faḍlika', n:'« de ta faveur ». À une femme : مِنْ فَضْلِكِ <i>min faḍliki</i>.' },
      { d:'smeh li', fr:'pardon / excuse-moi', ar:'عَفْوًا', tr:'ʿafwan' },
      { d:'bslama', fr:'au revoir', ar:'مَعَ السَّلامَةِ', tr:'maʿa s-salāma', n:'Lettre solaire : on dit <i>as-salāma</i>, pas <i>al-salāma</i>.' },
      { d:'marhba', fr:'bienvenue', ar:'مَرْحَبًا', tr:'marḥaban' },
      { d:'inshallah', fr:'si Dieu veut', ar:'إِنْ شاءَ اللّٰهُ', tr:'in shāʾa llāh', n:'Classique intégral : conditionnel إِنْ + verbe accompli.' }
    ]
  },
  {
    id:'cadeau', ic:'🎁', t:'Les mots que tu connais déjà',
    note:"Ceux-là sont <b>identiques</b> : la darija les a juste dévoyellés. Tu récupères une centaine de mots de fuṣḥā gratuitement.",
    paires:[
      { d:'khubz', fr:'le pain', ar:'خُبْز', tr:'khubz' },
      { d:'qahwa', fr:'le café', ar:'قَهْوَة', tr:'qahwa' },
      { d:'7lib', fr:'le lait', ar:'حَليب', tr:'ḥalīb' },
      { d:'l7am', fr:'la viande', ar:'لَحْم', tr:'laḥm' },
      { d:'bab', fr:'la porte', ar:'باب', tr:'bāb' },
      { d:'souq', fr:'le marché', ar:'سوق', tr:'sūq' },
      { d:'ktab', fr:'le livre', ar:'كِتاب', tr:'kitāb', n:'Racine ك-ت-ب, schème فِعال. Tu y reviendras souvent.' },
      { d:'medrasa', fr:'l\'école', ar:'مَدْرَسَة', tr:'madrasa', n:'Schème مَفْعَلَة = <b>le lieu où l\'on fait</b> : le lieu où l\'on étudie (د-ر-س).' },
      { d:'3in', fr:'l\'œil', ar:'عَيْن', tr:'ʿayn' },
      { d:'yedd', fr:'la main', ar:'يَد', tr:'yad' },
      { d:'qalb', fr:'le cœur', ar:'قَلْب', tr:'qalb' },
      { d:'nhar', fr:'le jour', ar:'نَهار', tr:'nahār', n:'En fuṣḥā <i>nahār</i> = le jour <b>par opposition à la nuit</b> ; la journée-date, c\'est يَوْم <i>yawm</i>.' },
      { d:'lil', fr:'la nuit', ar:'لَيْل', tr:'layl' },
      { d:'3am', fr:'l\'année', ar:'عام', tr:'ʿām', n:'Synonyme : سَنَة <i>sana</i>.' },
      { d:'shhar', fr:'le mois', ar:'شَهْر', tr:'shahr' },
      { d:'wqt', fr:'le temps', ar:'وَقْت', tr:'waqt' },
      { d:'3ndi', fr:'j\'ai', ar:'عِنْدي', tr:'ʿindī', n:'Identique, et pur fuṣḥā : عِنْدَ = « auprès de » + ي = moi.' },
      { d:'sukkar', fr:'le sucre', ar:'سُكَّر', tr:'sukkar' },
      { d:'mel7', fr:'le sel', ar:'مِلْح', tr:'milḥ' },
      { d:'zit', fr:'l\'huile', ar:'زَيْت', tr:'zayt' }
    ]
  },
  {
    id:'change', ic:'🔀', t:'Les mots qui changent',
    note:"Là, il faut vraiment apprendre : le fuṣḥā emploie un autre mot. Ce sont eux qui font qu'un discours sonne littéraire.",
    paires:[
      { d:'bezzaf', fr:'beaucoup', ar:'كَثيرًا', tr:'kathīran', n:'Le ـً : accusatif adverbial — la façon normale de faire un adverbe en arabe.' },
      { d:'shwiya', fr:'un peu', ar:'قَليلًا', tr:'qalīlan' },
      { d:'daba', fr:'maintenant', ar:'الآنَ', tr:'al-āna' },
      { d:'ghedda', fr:'demain', ar:'غَدًا', tr:'ghadan', n:'Même racine que le <i>ghadi</i> du futur marocain.' },
      { d:'lbare7', fr:'hier', ar:'أَمْسِ', tr:'amsi' },
      { d:'lyum', fr:'aujourd\'hui', ar:'اليَوْمَ', tr:'al-yawma' },
      { d:'hna', fr:'ici', ar:'هُنا', tr:'hunā' },
      { d:'temma', fr:'là-bas', ar:'هُناكَ', tr:'hunāka' },
      { d:'mzyan', fr:'bien / bon', ar:'جَيِّد', tr:'jayyid' },
      { d:'khayb', fr:'mauvais', ar:'سَيِّئ', tr:'sayyiʾ' },
      { d:'rajel', fr:'un homme', ar:'رَجُل', tr:'rajul' },
      { d:'mra', fr:'une femme', ar:'اِمْرَأَة', tr:'imraʾa', n:'Avec l\'article, le mot change de forme : المَرْأَة <i>al-marʾa</i>.' },
      { d:'sa7bi', fr:'mon ami', ar:'صَديقي', tr:'ṣadīqī', n:'<i>ṣāḥib</i> existe en fuṣḥā : « compagnon, celui qui accompagne ».' },
      { d:'khedma', fr:'le travail', ar:'عَمَل', tr:'ʿamal', n:'خِدْمَة existe aussi, mais veut dire « service ».' },
      { d:'telifun', fr:'le téléphone', ar:'هاتِف', tr:'hātif', n:'Participe actif de هَتَفَ « appeler, héler ». Zéro emprunt.' },
      { d:'tomobil', fr:'la voiture', ar:'سَيّارَة', tr:'sayyāra', n:'Schème فَعّالَة, l\'intensif : « celle qui circule sans cesse ».' },
      { d:'makla', fr:'la nourriture', ar:'طَعام', tr:'ṭaʿām' },
      { d:'flus', fr:'l\'argent', ar:'نُقود', tr:'nuqūd', n:'فُلوس existe (pluriel de فَلْس, une vieille pièce) mais fait familier.' },
      { d:'mrid', fr:'malade', ar:'مَريض', tr:'marīḍ' },
      { d:'fer7an', fr:'content', ar:'سَعيد', tr:'saʿīd' }
    ]
  },
  {
    id:'outils', ic:'🔧', t:'Les outils de la phrase',
    note:"Les petits mots — c'est eux qui trahissent le registre en deux secondes. Un seul <i>shnu</i> et tout le fuṣḥā s'effondre.",
    paires:[
      { d:'ana / nta', fr:'je / tu (m.)', ar:'أنا / أنتَ', tr:'anā / anta', n:'À une femme : أنتِ <i>anti</i>. Le fuṣḥā a en plus le <b>duel</b> أنتُما et deux pluriels : أنتُم (m.) / أنتُنَّ (f.).' },
      { d:'shnu / ash', fr:'quoi', ar:'ما / ماذا', tr:'mā / mādhā', n:'ما devant un nom, ماذا devant un verbe : ماذا تُريدُ؟' },
      { d:'shkun', fr:'qui', ar:'مَنْ', tr:'man' },
      { d:'fin / win', fr:'où', ar:'أَيْنَ', tr:'ayna' },
      { d:'imta', fr:'quand', ar:'مَتى', tr:'matā' },
      { d:'3lash', fr:'pourquoi', ar:'لِماذا', tr:'limādhā' },
      { d:'kifash', fr:'comment', ar:'كَيْفَ', tr:'kayfa' },
      { d:'sh7al', fr:'combien', ar:'كَمْ', tr:'kam', n:'Le nom qui suit كَمْ est au <b>singulier accusatif</b> : كَمْ كِتابًا؟ « combien de livres ? »' },
      { d:'w', fr:'et', ar:'وَ', tr:'wa', n:'Toujours collé au mot suivant : وَالكِتابُ.' },
      { d:'walakin', fr:'mais', ar:'لٰكِنْ', tr:'lākin' },
      { d:'ah / iyeh', fr:'oui', ar:'نَعَمْ', tr:'naʿam' },
      { d:'la', fr:'non', ar:'لا', tr:'lā' },
      { d:'ma …sh', fr:'ne … pas', ar:'لا / لَمْ / لَنْ', tr:'lā / lam / lan', n:'Trois négations, trois temps : لا + présent, لَمْ + <b>jussif</b> (passé), لَنْ + <b>subjonctif</b> (futur).' },
      { d:'dyal / d-', fr:'de (appartenance)', ar:'الإِضافَة', tr:'al-iḍāfa', n:'Le fuṣḥā n\'a <b>pas</b> de mot pour « de » : on colle les deux noms. <i>ktab dyal l-weld</i> → كِتابُ الوَلَدِ <i>kitābu l-waladi</i>.' }
    ]
  },
  {
    id:'verbes', ic:'⚡', t:'Dire ce que tu fais',
    note:"Le verbe marocain a un préfixe (ka-, ghadi) que le fuṣḥā ignore ; en échange, le fuṣḥā a des <b>modes</b>. Voici tes phrases-clés transposées.",
    paires:[
      { d:'bghit', fr:'je veux', ar:'أُريدُ', tr:'urīdu', n:'Forme IV أَرادَ. La ḍamma finale = <b>indicatif</b>.' },
      { d:'ma bghitsh', fr:'je ne veux pas', ar:'لا أُريدُ', tr:'lā urīdu' },
      { d:'3reft', fr:'je sais', ar:'أَعْرِفُ', tr:'aʿrifu' },
      { d:'ma3reftsh', fr:'je ne sais pas', ar:'لا أَعْرِفُ', tr:'lā aʿrifu' },
      { d:'ma fhemtsh', fr:'je n\'ai pas compris', ar:'لَمْ أَفْهَمْ', tr:'lam afham', n:'لَمْ + <b>jussif</b> : la finale tombe au sukūn. C\'est ainsi qu\'on nie le passé en fuṣḥā.' },
      { d:'kanakul', fr:'je mange', ar:'آكُلُ', tr:'ākulu' },
      { d:'kanshreb', fr:'je bois', ar:'أَشْرَبُ', tr:'ashrabu' },
      { d:'kanemshi', fr:'je vais / je pars', ar:'أَذْهَبُ', tr:'adhhabu' },
      { d:'ghadi nemshi', fr:'je vais partir', ar:'سَأَذْهَبُ', tr:'saʾadhhabu', n:'Futur = سَـ collé (proche) ou سَوْفَ (lointain).' },
      { d:'kant3allem', fr:'j\'apprends', ar:'أَتَعَلَّمُ', tr:'ataʿallamu', n:'Forme V تَفَعَّلَ : le réfléchi de عَلَّمَ « enseigner » → « s\'enseigner à soi-même ».' },
      { d:'3awed 3afak', fr:'répète, s\'il te plaît', ar:'أَعِدْ مِنْ فَضْلِكَ', tr:'aʿid min faḍlika', n:'Impératif = jussif sans préfixe.' },
      { d:'bshwiya 3afak', fr:'plus lentement', ar:'بِبُطْءٍ مِنْ فَضْلِكَ', tr:'bi-buṭʾin min faḍlika' },
      { d:'smiti…', fr:'je m\'appelle…', ar:'اِسْمي…', tr:'ismī…' },
      { d:'ana men fransa', fr:'je viens de France', ar:'أنا مِنْ فَرَنْسا', tr:'anā min Faransā' },
      { d:'shhal thmen ?', fr:'combien ça coûte ?', ar:'كَمِ الثَّمَنُ؟', tr:'kami th-thamanu', n:'ثَمَن « le prix » — lettre solaire, donc <i>ath-thaman</i>.' }
    ]
  },
  {
    id:'chiffres', ic:'🔢', t:'Compter en fuṣḥā',
    note:"Les nombres marocains sont du fuṣḥā abîmé : remets ث et les brèves, et tu as la forme classique.",
    paires:[
      { d:'wa7ed', fr:'un', ar:'واحِد', tr:'wāḥid' },
      { d:'jouj / tnin', fr:'deux', ar:'اِثْنانِ', tr:'ithnāni', n:'<i>jouj</i> vient de زَوْج « paire ». Et اِثْنانِ est un <b>duel</b> : à l\'accusatif اِثْنَيْنِ — d\'où « lundi » يَوْم الاثْنَيْن, le deuxième jour.' },
      { d:'tlata', fr:'trois', ar:'ثَلاثَة', tr:'thalātha', n:'ث, pas t.' },
      { d:'reb3a', fr:'quatre', ar:'أَرْبَعَة', tr:'arbaʿa' },
      { d:'khamsa', fr:'cinq', ar:'خَمْسَة', tr:'khamsa' },
      { d:'setta', fr:'six', ar:'سِتَّة', tr:'sitta' },
      { d:'seb3a', fr:'sept', ar:'سَبْعَة', tr:'sabʿa' },
      { d:'tmnya', fr:'huit', ar:'ثَمانِيَة', tr:'thamāniya', n:'ث encore.' },
      { d:'ts3a', fr:'neuf', ar:'تِسْعَة', tr:'tisʿa' },
      { d:'3achra', fr:'dix', ar:'عَشَرَة', tr:'ʿashara' },
      { d:'3echrin', fr:'vingt', ar:'عِشْرونَ', tr:'ʿishrūna', n:'Terminaison ـونَ du pluriel masculin sain : à l\'accusatif/génitif ce sera عِشْرينَ.' },
      { d:'mya', fr:'cent', ar:'مِائَة', tr:'miʾa', n:'Orthographe classique bizarre : le ا s\'écrit mais ne se lit pas.' },
      { d:'alf', fr:'mille', ar:'أَلْف', tr:'alf' }
    ]
  }
];

/* ---------- 4. L'IʿRÁB (الإعْراب) — la couronne ----------
   Le vrai marqueur de « l'arabe le plus pur ». Chapitres :
   { id, ic, t, sub, html, ex:[{ar,tr,fr,n}], quiz:[{q,ar,opts,correct,expl}] }
   Dans les quiz, ـــــ marque le trou ; les options sont le MÊME mot
   avec les trois désinences possibles.
*/
FUSHA.i3rab = [
  {
    id:'cas', ic:'①', t:'Les trois cas', sub:'رَفْع · نَصْب · جَرّ',
    html:`<p>Le nom arabe change de <b>finale</b> selon sa fonction dans la phrase. Trois cas, trois voyelles. C'est tout le système.</p>
    <div class="expl"><b>الرَّفْع</b> <i>ar-rafʿ</i> — la <b>ḍamma ـُ</b> (<i>-u</i>) → le <b>sujet</b> de la phrase.<br>
    <b>النَّصْب</b> <i>an-naṣb</i> — la <b>fatḥa ـَ</b> (<i>-a</i>) → le <b>COD</b>, et tout ce qui est circonstance.<br>
    <b>الجَرّ</b> <i>al-jarr</i> — la <b>kasra ـِ</b> (<i>-i</i>) → après une <b>préposition</b>, et le 2<sup>e</sup> terme d'une annexion.</div>
    <p class="mt">Si le mot est <b>indéfini</b> (pas de الـ), la voyelle est <b>doublée</b> — c'est le <b>tanwīn</b>, qui se prononce <i>-n</i> : <b>ـٌ -un · ـً -an · ـٍ -in</b>. Le tanwīn, c'est l'article indéfini de l'arabe, mais placé à la fin et sous forme de son.</p>
    <div class="expl warn"><b>Détail d'orthographe :</b> le <i>-an</i> s'écrit avec un <b>alif de soutien</b> — وَلَدًا, كِتابًا — sauf après un ة ou un ء final : مَدينَةً, مَساءً.</div>
    <p><b>Et le verbe conjugué ?</b> Il a lui aussi des finales — c'est le chapitre ⑦.</p>`,
    ex:[
      {ar:'جاءَ الوَلَدُ', tr:'jāʾa l-waladu', fr:'le garçon est venu', n:'sujet → ḍamma'},
      {ar:'رَأَيْتُ الوَلَدَ', tr:'raʾaytu l-walada', fr:'j\'ai vu le garçon', n:'COD → fatḥa'},
      {ar:'مَرَرْتُ بِالوَلَدِ', tr:'marartu bi-l-waladi', fr:'je suis passé près du garçon', n:'après préposition → kasra'},
      {ar:'هٰذا كِتابٌ', tr:'hādhā kitābun', fr:'ceci est un livre', n:'indéfini sujet → tanwīn -un'},
      {ar:'قَرَأْتُ كِتابًا', tr:'qaraʾtu kitāban', fr:'j\'ai lu un livre', n:'indéfini COD → tanwīn -an'}
    ],
    quiz:[
      {q:'« Le garçon est venu »', ar:'جاءَ ـــــ', opts:['الوَلَدُ','الوَلَدَ','الوَلَدِ'], correct:0, expl:'Sujet du verbe (فاعِل) → <b>مرفوع</b>, ḍamma : <i>jāʾa l-walad<b>u</b></i>.'},
      {q:'« J\'ai vu le garçon »', ar:'رَأَيْتُ ـــــ', opts:['الوَلَدُ','الوَلَدَ','الوَلَدِ'], correct:1, expl:'COD (مَفْعول بِهِ) → <b>منصوب</b>, fatḥa : <i>raʾaytu l-walad<b>a</b></i>.'},
      {q:'« Je suis allé à l\'école »', ar:'ذَهَبْتُ إلى ـــــ', opts:['المَدْرَسَةُ','المَدْرَسَةَ','المَدْرَسَةِ'], correct:2, expl:'Après la préposition إلى → <b>مجرور</b>, kasra : <i>ilā l-madrasat<b>i</b></i>.'},
      {q:'« Ceci est un livre » (indéfini)', ar:'هٰذا ـــــ', opts:['كِتابٌ','كِتابًا','كِتابٍ'], correct:0, expl:'Attribut d\'une phrase nominale → <b>مرفوع</b>, et indéfini → tanwīn : <i>kitāb<b>un</b></i>.'},
      {q:'« J\'ai bu de l\'eau » (indéfini)', ar:'شَرِبْتُ ـــــ', opts:['ماءٌ','ماءً','ماءٍ'], correct:1, expl:'COD indéfini → <b>منصوب</b> avec tanwīn : <i>māʾ<b>an</b></i> (pas d\'alif ajouté après le ء).'}
    ]
  },
  {
    id:'nominale', ic:'②', t:'La phrase nominale', sub:'مُبْتَدَأ + خَبَر — et pas de verbe « être »',
    html:`<p>L'arabe <b>n'a pas de verbe « être » au présent</b>. On pose deux mots l'un à côté de l'autre, et la phrase est faite :</p>
    <div class="expl"><b>البَيْتُ كَبيرٌ</b> <i>al-baytu kabīrun</i> — mot à mot « la-maison grande » = <b>la maison est grande</b>.</div>
    <p class="mt">Le premier s'appelle <b>المُبْتَدَأ</b> (« le commencé »), le second <b>الخَبَر</b> (« l'information »). <b>Les deux sont au nominatif</b> (ḍamma). C'est la phrase la plus fréquente de l'arabe écrit.</p>
    <div class="expl"><b>La règle qui te dit qui est qui :</b> le <i>mubtadaʾ</i> est <b>défini</b> (avec الـ, ou un nom propre, ou un pronom), le <i>khabar</i> est <b>indéfini</b> (tanwīn). Inverse-les et le sens change.<br>
    البَيْتُ الكَبيرُ = « la <i>grande</i> maison » (un groupe, pas une phrase) · البَيْتُ كَبيرٌ = « la maison <b>est</b> grande » (une phrase).</div>
    <p>C'est <b>exactement</b> la structure de tes phrases en darija : <i>d-dar kbira</i>. Ici tu ne changes que les finales.</p>`,
    ex:[
      {ar:'البَيْتُ كَبيرٌ', tr:'al-baytu kabīrun', fr:'la maison est grande'},
      {ar:'الطّالِبُ مُجْتَهِدٌ', tr:'aṭ-ṭālibu mujtahidun', fr:'l\'étudiant est appliqué', n:'ط est solaire : <i>aṭ-ṭālib</i>'},
      {ar:'أنا مِنْ فَرَنْسا', tr:'anā min Faransā', fr:'je suis de France', n:'le khabar peut être un groupe prépositionnel'},
      {ar:'الكِتابُ عَلى الطّاوِلَةِ', tr:'al-kitābu ʿalā ṭ-ṭāwilati', fr:'le livre est sur la table'}
    ],
    quiz:[
      {q:'« La maison est grande »', ar:'ـــــ كَبيرٌ', opts:['البَيْتُ','البَيْتَ','البَيْتِ'], correct:0, expl:'Le مُبْتَدَأ est toujours <b>مرفوع</b>.'},
      {q:'« La maison est grande »', ar:'البَيْتُ ـــــ', opts:['كَبيرٌ','كَبيرًا','كَبيرٍ'], correct:0, expl:'Le خَبَر aussi est <b>مرفوع</b>, et indéfini → tanwīn <i>-un</i>.'},
      {q:'« L\'étudiant est appliqué »', ar:'الطّالِبُ ـــــ', opts:['مُجْتَهِدُ','مُجْتَهِدٌ','مُجْتَهِدًا'], correct:1, expl:'Khabar indéfini : <b>ٌ</b> et non <b>ُ</b> — sans الـ, le tanwīn est obligatoire.'},
      {q:'Laquelle est une PHRASE (et pas un groupe de mots) ?', ar:'؟', opts:['البَيْتُ الكَبيرُ','البَيْتُ كَبيرٌ','بَيْتٌ كَبيرٌ'], correct:1, expl:'Défini + indéfini = phrase (« la maison est grande »). Défini + défini = groupe (« la grande maison »). Indéfini + indéfini = groupe (« une grande maison »).'}
    ]
  },
  {
    id:'verbale', ic:'③', t:'La phrase verbale', sub:'Le verbe d\'abord — VSO',
    html:`<p>Quand il y a un verbe, l'ordre classique est <b>verbe → sujet → complément</b> :</p>
    <div class="expl"><b>كَتَبَ الوَلَدُ الرِّسالَةَ</b><br><i>kataba l-waladu r-risālata</i> — « a-écrit le-garçon la-lettre ».<br>
    فِعْل (verbe) · فاعِل (sujet, <b>مرفوع</b>) · مَفْعول بِهِ (COD, <b>منصوب</b>).</div>
    <p class="mt">Les deux finales font tout le travail : c'est <b>la ḍamma</b> qui dit qui écrit et <b>la fatḥa</b> qui dit ce qui est écrit. Change-les et tu inverses le sens, même sans toucher à l'ordre des mots. Voilà pourquoi l'arabe classique peut se permettre un ordre libre — l'i3rab tient la structure.</p>
    <div class="expl warn"><b>Le piège des débutants :</b> quand le sujet suit le verbe, le verbe reste au <b>singulier</b>. On dit كَتَبَ الأَوْلادُ <i>kataba l-awlādu</i> (« ont écrit les garçons »), jamais كَتَبوا الأَوْلادُ. Le pluriel n'apparaît que si le sujet est devant.</div>`,
    ex:[
      {ar:'كَتَبَ الوَلَدُ الرِّسالَةَ', tr:'kataba l-waladu r-risālata', fr:'le garçon a écrit la lettre'},
      {ar:'قَرَأَ الطّالِبُ الكِتابَ', tr:'qaraʾa ṭ-ṭālibu l-kitāba', fr:'l\'étudiant a lu le livre'},
      {ar:'شَرِبَ الرَّجُلُ الماءَ', tr:'shariba r-rajulu l-māʾa', fr:'l\'homme a bu l\'eau'},
      {ar:'فَتَحَ الوَلَدُ البابَ', tr:'fataḥa l-waladu l-bāba', fr:'le garçon a ouvert la porte', n:'ف-ت-ح : la racine de مِفْتاح, « la clé » — le nom de cette app.'}
    ],
    quiz:[
      {q:'« Le garçon a écrit la lettre »', ar:'كَتَبَ ـــــ الرِّسالَةَ', opts:['الوَلَدُ','الوَلَدَ','الوَلَدِ'], correct:0, expl:'فاعِل (celui qui fait) → <b>مرفوع</b>.'},
      {q:'« Le garçon a écrit la lettre »', ar:'كَتَبَ الوَلَدُ ـــــ', opts:['الرِّسالَةُ','الرِّسالَةَ','الرِّسالَةِ'], correct:1, expl:'مَفْعول بِهِ → <b>منصوب</b>. (ر est solaire : <i>ar-risālata</i>.)'},
      {q:'« L\'étudiant a lu le livre »', ar:'قَرَأَ الطّالِبُ ـــــ', opts:['الكِتابُ','الكِتابَ','الكِتابِ'], correct:1, expl:'COD → fatḥa : <i>al-kitāb<b>a</b></i>.'},
      {q:'« L\'homme a bu l\'eau »', ar:'شَرِبَ ـــــ الماءَ', opts:['الرَّجُلُ','الرَّجُلَ','الرَّجُلِ'], correct:0, expl:'Le buveur est le sujet → ḍamma.'}
    ]
  },
  {
    id:'jarr', ic:'④', t:'Préposition & annexion', sub:'حُروف الجَرّ · الإِضافَة',
    html:`<p><b>Toute préposition</b> met le mot suivant au <b>génitif</b> (kasra). Les principales : <b>مِنْ</b> (de), <b>إلى</b> (vers), <b>في</b> (dans), <b>عَلى</b> (sur), <b>عَنْ</b> (au sujet de), <b>بِ</b> (par/avec), <b>لِ</b> (pour), <b>كَ</b> (comme), <b>مَعَ</b> (avec).</p>
    <div class="expl">في البَيْتِ <i>fī l-bayti</i> · إلى المَدْرَسَةِ <i>ilā l-madrasati</i> · مِنَ السّوقِ <i>mina s-sūqi</i></div>
    <p class="mt"><b>L'iḍāfa (الإِضافَة) — l'annexion.</b> Le fuṣḥā n'a <b>aucun mot</b> pour « de » entre deux noms. On les colle :</p>
    <div class="expl"><b>كِتابُ الوَلَدِ</b> <i>kitābu l-waladi</i> = « le livre du garçon ».<br>
    Trois règles absolues :<br>
    1. Le <b>1<sup>er</sup> terme</b> prend le cas de sa fonction dans la phrase, mais <b>jamais الـ ni tanwīn</b>.<br>
    2. Le <b>2<sup>e</sup> terme</b> est <b>toujours مجرور</b> (kasra).<br>
    3. Rien ne peut s'insérer entre les deux.</div>
    <p>C'est le remplaçant exact du <i>dyal</i> marocain — et il est partout : بابُ البَيْتِ, مِفْتاحُ السَّيّارَةِ, صَباحُ الخَيْرِ, رَئيسُ الدَّوْلَةِ.</p>`,
    ex:[
      {ar:'الكِتابُ عَلى الطّاوِلَةِ', tr:'al-kitābu ʿalā ṭ-ṭāwilati', fr:'le livre est sur la table'},
      {ar:'كِتابُ الوَلَدِ جَديدٌ', tr:'kitābu l-waladi jadīdun', fr:'le livre du garçon est neuf', n:'annexion : كِتاب sans article, الوَلَد en kasra'},
      {ar:'مِفْتاحُ السَّيّارَةِ', tr:'miftāḥu s-sayyārati', fr:'la clé de la voiture'},
      {ar:'خَرَجْتُ مِنَ البَيْتِ', tr:'kharajtu mina l-bayti', fr:'je suis sorti de la maison', n:'مِنْ prend une fatḥa d\'appui devant l\'article'}
    ],
    quiz:[
      {q:'« Le livre est sur la table »', ar:'الكِتابُ عَلى ـــــ', opts:['الطّاوِلَةُ','الطّاوِلَةَ','الطّاوِلَةِ'], correct:2, expl:'Après عَلى → <b>مجرور</b>.'},
      {q:'« Le livre du garçon est neuf »', ar:'ـــــ الوَلَدِ جَديدٌ', opts:['كِتابُ','الكِتابُ','كِتابٌ'], correct:0, expl:'1<sup>er</sup> terme d\'annexion : cas de sa fonction (ici sujet, ḍamma) mais <b>ni الـ ni tanwīn</b>.'},
      {q:'« J\'ai ouvert la porte de la maison »', ar:'فَتَحْتُ بابَ ـــــ', opts:['البَيْتُ','البَيْتَ','البَيْتِ'], correct:2, expl:'2<sup>e</sup> terme d\'annexion → <b>toujours مجرور</b>. (بابَ est le COD, d\'où sa fatḥa.)'},
      {q:'« Je suis sorti de la maison »', ar:'خَرَجْتُ مِنَ ـــــ', opts:['البَيْتُ','البَيْتَ','البَيْتِ'], correct:2, expl:'Après مِنْ → kasra.'}
    ]
  },
  {
    id:'kana', ic:'⑤', t:'كانَ et إنَّ', sub:'Les deux mots qui renversent la phrase nominale',
    html:`<p>Ta phrase nominale (deux nominatifs) se déforme dès qu'on met devant elle certains mots. Il y a exactement <b>deux familles</b>, et elles font l'inverse l'une de l'autre :</p>
    <div class="expl"><b>كانَ وَأَخَواتُها</b> — « kāna et ses sœurs » : le <b>2<sup>e</sup> terme passe à l'accusatif</b>.<br>
    البَيْتُ كَبيرٌ → كانَ البَيْتُ <b>كَبيرًا</b> <i>kāna l-baytu kabīran</i> (« la maison était grande »).<br>
    Les sœurs : أَصْبَحَ (devenir au matin), صارَ (devenir), لَيْسَ (ne pas être), ما زالَ (être encore), باتَ, ظَلَّ.</div>
    <div class="expl mt"><b>إنَّ وَأَخَواتُها</b> — « inna et ses sœurs » : le <b>1<sup>er</sup> terme passe à l'accusatif</b>.<br>
    البَيْتُ كَبيرٌ → إنَّ <b>البَيْتَ</b> كَبيرٌ <i>inna l-bayta kabīrun</i> (« certes, la maison est grande »).<br>
    Les sœurs : أَنَّ (que), لٰكِنَّ (mais), لَعَلَّ (peut-être), لَيْتَ (si seulement), كَأَنَّ (comme si).</div>
    <div class="expl warn"><b>Le moyen de ne jamais les confondre :</b> كانَ <b>pousse la fatḥa vers la droite</b> (sur l'attribut), إنَّ <b>la tire vers la gauche</b> (sur le sujet). Deux mots, deux directions.</div>
    <p>Ce sont les structures les plus fréquentes de la presse et du Coran. Les rater, c'est se trahir immédiatement.</p>`,
    ex:[
      {ar:'كانَ الوَلَدُ سَعيدًا', tr:'kāna l-waladu saʿīdan', fr:'le garçon était heureux'},
      {ar:'إنَّ الوَلَدَ سَعيدٌ', tr:'inna l-walada saʿīdun', fr:'certes, le garçon est heureux'},
      {ar:'لَيْسَ الطَّقْسُ جَميلًا', tr:'laysa ṭ-ṭaqsu jamīlan', fr:'le temps n\'est pas beau'},
      {ar:'أَعْلَمُ أَنَّ الكِتابَ مُفيدٌ', tr:'aʿlamu anna l-kitāba mufīdun', fr:'je sais que le livre est utile'}
    ],
    quiz:[
      {q:'« Le garçon était heureux »', ar:'كانَ الوَلَدُ ـــــ', opts:['سَعيدٌ','سَعيدًا','سَعيدٍ'], correct:1, expl:'كانَ met son <b>خَبَر</b> (le 2<sup>e</sup>) à l\'accusatif.'},
      {q:'« Certes, le garçon est heureux »', ar:'إنَّ ـــــ سَعيدٌ', opts:['الوَلَدُ','الوَلَدَ','الوَلَدِ'], correct:1, expl:'إنَّ met son <b>اسْم</b> (le 1<sup>er</sup>) à l\'accusatif — et laisse le second au nominatif.'},
      {q:'« Le temps n\'est pas beau »', ar:'لَيْسَ الطَّقْسُ ـــــ', opts:['جَميلٌ','جَميلًا','جَميلٍ'], correct:1, expl:'لَيْسَ est une sœur de كانَ → attribut à l\'accusatif.'},
      {q:'« Je sais que le livre est utile »', ar:'أَعْلَمُ أَنَّ ـــــ مُفيدٌ', opts:['الكِتابُ','الكِتابَ','الكِتابِ'], correct:1, expl:'أَنَّ est une sœur de إنَّ → le nom qui suit passe à l\'accusatif.'}
    ]
  },
  {
    id:'visible', ic:'⑥', t:'Là où les cas se VOIENT', sub:'Duel, pluriel sain, les cinq noms',
    html:`<p>Objection classique : « puisque les voyelles ne sont pas écrites, l'i3rab est invisible, donc facultatif ». <b>Faux</b> — pour toute une série de mots, le cas se marque par des <b>lettres</b>, visibles dans n'importe quel journal non vocalisé. Les rater, c'est faire une faute d'orthographe.</p>
    <div class="expl"><b>Le duel</b> (deux, exactement) : <b>ـانِ</b> au nominatif, <b>ـَيْنِ</b> aux deux autres cas.<br>
    الوَلَدانِ <i>al-waladāni</i> (les deux garçons, sujet) → رَأَيْتُ الوَلَدَيْنِ <i>raʾaytu l-waladayni</i>.</div>
    <div class="expl mt"><b>Le pluriel masculin sain</b> : <b>ـونَ</b> au nominatif, <b>ـينَ</b> aux deux autres.<br>
    المُعَلِّمونَ <i>al-muʿallimūna</i> → سَلَّمْتُ عَلى المُعَلِّمينَ <i>sallamtu ʿalā l-muʿallimīna</i>.<br>
    (Tu l\'as déjà vu sans le savoir : عِشْرونَ / عِشْرينَ, « vingt ».)</div>
    <div class="expl mt"><b>Le pluriel féminin sain</b> (ـات) : nominatif <b>ـاتُ</b>, mais accusatif <b>ـاتِ</b> — <b>kasra, pas fatḥa</b>. رَأَيْتُ المُعَلِّماتِ. Une bizarrerie qui trahit tout de suite un apprenant pressé.</div>
    <div class="expl mt"><b>Les cinq noms</b> (الأَسْماء الخَمْسَة) — أَب, أَخ, حَم, فو, ذو — marquent le cas par une <b>lettre longue</b> quand ils sont annexés :<br>
    أَبوكَ (sujet) · أَباكَ (COD) · أَبيكَ (après préposition). Idem أَخوكَ / أَخاكَ / أَخيكَ.</div>
    <p><b>Conclusion :</b> l'i3rab n'est pas un ornement de récitant. Il est dans le texte imprimé, tous les jours.</p>`,
    ex:[
      {ar:'جاءَ الوَلَدانِ', tr:'jāʾa l-waladāni', fr:'les deux garçons sont venus'},
      {ar:'رَأَيْتُ الوَلَدَيْنِ', tr:'raʾaytu l-waladayni', fr:'j\'ai vu les deux garçons'},
      {ar:'المُعَلِّمونَ في المَدْرَسَةِ', tr:'al-muʿallimūna fī l-madrasati', fr:'les enseignants sont à l\'école'},
      {ar:'هٰذا أَخوكَ وَرَأَيْتُ أَباكَ', tr:'hādhā akhūka wa-raʾaytu abāka', fr:'voici ton frère, et j\'ai vu ton père'}
    ],
    quiz:[
      {q:'« J\'ai vu les deux garçons »', ar:'رَأَيْتُ ـــــ', opts:['الوَلَدانِ','الوَلَدَيْنِ','الأَوْلادُ'], correct:1, expl:'Duel à l\'accusatif → <b>ـَيْنِ</b>.'},
      {q:'« Les enseignants sont venus »', ar:'جاءَ ـــــ', opts:['المُعَلِّمونَ','المُعَلِّمينَ','المُعَلِّمَ'], correct:0, expl:'Pluriel masculin sain, sujet → <b>ـونَ</b>.'},
      {q:'« J\'ai salué les enseignants »', ar:'سَلَّمْتُ عَلى ـــــ', opts:['المُعَلِّمونَ','المُعَلِّمينَ','المُعَلِّماتُ'], correct:1, expl:'Après عَلى → <b>ـينَ</b>.'},
      {q:'« Voici ton père »', ar:'هٰذا ـــــ', opts:['أَبوكَ','أَباكَ','أَبيكَ'], correct:0, expl:'Un des cinq noms, au nominatif → <b>و</b> long.'},
      {q:'« J\'ai vu ton frère »', ar:'رَأَيْتُ ـــــ', opts:['أَخوكَ','أَخاكَ','أَخيكَ'], correct:1, expl:'Accusatif → <b>ا</b> long : <i>akhāka</i>.'}
    ]
  },
  {
    id:'modes', ic:'⑦', t:'Les modes du verbe', sub:'مَرْفوع · مَنْصوب · مَجْزوم',
    html:`<p>Le verbe à l'inaccompli (présent/futur) a lui aussi <b>trois finales</b>. Elles ne dépendent pas de la fonction mais du <b>mot qui précède</b>. C'est mécanique — donc apprenable en une soirée.</p>
    <div class="expl"><b>مَرْفوع</b> — ḍamma <b>ـُ</b> : le mode par défaut. يَكْتُبُ <i>yaktubu</i> « il écrit ».</div>
    <div class="expl mt"><b>مَنْصوب</b> — fatḥa <b>ـَ</b> : après <b>أَنْ</b> (que), <b>لَنْ</b> (ne … jamais, futur nié), <b>كَيْ / لِـ</b> (afin que), <b>حَتّى</b> (jusqu'à ce que).<br>
    أُريدُ أَنْ <b>أَكْتُبَ</b> <i>urīdu an aktuba</i> « je veux écrire » · لَنْ <b>أَذْهَبَ</b> <i>lan adhhaba</i> « je n'irai pas ».</div>
    <div class="expl mt"><b>مَجْزوم</b> — sukūn <b>ـْ</b> (la finale tombe) : après <b>لَمْ</b> (négation du passé), <b>لا</b> de défense, <b>لِـ</b> d'ordre, et dans la condition <b>إِنْ</b>.<br>
    لَمْ <b>أَفْهَمْ</b> <i>lam afham</i> « je n'ai pas compris » · لا <b>تَذْهَبْ</b> <i>lā tadhhab</i> « ne pars pas ».</div>
    <p class="mt"><b>À retenir absolument :</b> <i>lam afham</i> est un verbe au <b>présent</b> mis au jussif, et il traduit un <b>passé</b>. C'est la façon la plus classique — et la plus élégante — de nier le passé. Ta darija dit <i>ma fhemtsh</i> ; le fuṣḥā dit لَمْ أَفْهَمْ.</p>
    <div class="expl"><b>Les cinq verbes</b> (الأَفْعال الخَمْسَة) — ceux qui finissent par ـونَ / ـينَ / ـانِ : leur ن <b>tombe</b> au manṣūb et au majzūm. تَكْتُبونَ → أَنْ <b>تَكْتُبوا</b>. Encore une marque visible sans voyelles.</div>`,
    ex:[
      {ar:'هُوَ يَكْتُبُ الآنَ', tr:'huwa yaktubu l-āna', fr:'il écrit maintenant'},
      {ar:'أُريدُ أَنْ أَتَعَلَّمَ العَرَبِيَّةَ', tr:'urīdu an ataʿallama l-ʿarabiyyata', fr:'je veux apprendre l\'arabe'},
      {ar:'لَنْ أَنْسى', tr:'lan ansā', fr:'je n\'oublierai pas'},
      {ar:'لَمْ أَفْهَمْ، مِنْ فَضْلِكَ أَعِدْ', tr:'lam afham, min faḍlika aʿid', fr:'je n\'ai pas compris, répète s\'il te plaît', n:'l\'impératif est un jussif sans préfixe'}
    ],
    quiz:[
      {q:'« Je veux écrire »', ar:'أُريدُ أَنْ ـــــ', opts:['أَكْتُبُ','أَكْتُبَ','أَكْتُبْ'], correct:1, expl:'Après أَنْ → <b>منصوب</b>, fatḥa.'},
      {q:'« Je n\'irai pas »', ar:'لَنْ ـــــ', opts:['أَذْهَبُ','أَذْهَبَ','أَذْهَبْ'], correct:1, expl:'لَنْ nie le futur et exige le <b>منصوب</b>.'},
      {q:'« Je n\'ai pas compris »', ar:'لَمْ ـــــ', opts:['أَفْهَمُ','أَفْهَمَ','أَفْهَمْ'], correct:2, expl:'لَمْ + <b>مجزوم</b> = négation du passé. La finale tombe.'},
      {q:'« Il écrit maintenant »', ar:'هُوَ ـــــ الآنَ', opts:['يَكْتُبُ','يَكْتُبَ','يَكْتُبْ'], correct:0, expl:'Rien devant le verbe → mode par défaut, <b>مرفوع</b>.'},
      {q:'« Ne pars pas ! »', ar:'لا ـــــ !', opts:['تَذْهَبُ','تَذْهَبَ','تَذْهَبْ'], correct:2, expl:'لا de défense → <b>مجزوم</b>. (Avec la ḍamma, لا تَذْهَبُ voudrait dire « tu ne pars pas ».)'}
    ]
  },
  {
    id:'adverbe', ic:'⑧', t:'L\'accusatif à tout faire', sub:'Pourquoi tu vois des ـً partout',
    html:`<p>Tu croises <b>ـً</b> dans tous les textes : شُكْرًا, أَهْلًا, عَفْوًا, جِدًّا, أَيْضًا, طَبْعًا. Ce n'est pas une décoration : l'arabe fabrique ses <b>adverbes</b> en mettant un nom à l'accusatif.</p>
    <div class="expl">كَثيرًا « beaucoup » (de كَثير, nombreux) · قَليلًا « un peu » · صَباحًا « le matin » · مَساءً « le soir » · جِدًّا « très » · شُكْرًا « merci ».</div>
    <p class="mt">Trois emplois classiques du même accusatif, à reconnaître :</p>
    <div class="expl"><b>الحال</b> — l'état pendant l'action : جاءَ الوَلَدُ <b>مُسْرِعًا</b> « il est venu <i>pressé</i> ».<br>
    <b>التَّمْييز</b> — la précision après une quantité : عِنْدي عِشْرونَ <b>كِتابًا</b> « j'ai vingt <i>livres</i> » (singulier accusatif !).<br>
    <b>المَفْعول المُطْلَق</b> — le nom du verbe qui renforce le verbe : شَكَرْتُهُ <b>شُكْرًا</b> جَزيلًا « je l'ai remercié d'un remerciement abondant ». Tournure très arabe, très classique : c'est l'équivalent élégant de nos adverbes en -ment.</div>
    <p>Après <b>كَمْ</b> et après les nombres de 11 à 99, le nom compté est <b>singulier et accusatif</b> : كَمْ كِتابًا؟ « combien de livres ? ». Retiens-le, c'est très fréquent et toujours raté.</p>`,
    ex:[
      {ar:'شُكْرًا جَزيلًا', tr:'shukran jazīlan', fr:'merci beaucoup'},
      {ar:'أَتَكَلَّمُ العَرَبِيَّةَ قَليلًا', tr:'atakallamu l-ʿarabiyyata qalīlan', fr:'je parle un peu arabe'},
      {ar:'عِنْدي عِشْرونَ كِتابًا', tr:'ʿindī ʿishrūna kitāban', fr:'j\'ai vingt livres'},
      {ar:'جاءَ الوَلَدُ مُسْرِعًا', tr:'jāʾa l-waladu musriʿan', fr:'le garçon est venu en hâte'}
    ],
    quiz:[
      {q:'« Merci beaucoup »', ar:'ـــــ جَزيلًا', opts:['شُكْرٌ','شُكْرًا','شُكْرٍ'], correct:1, expl:'Accusatif adverbial figé — c\'est un مَفْعول مُطْلَق.'},
      {q:'« J\'ai vingt livres »', ar:'عِنْدي عِشْرونَ ـــــ', opts:['كُتُبٍ','كِتابٌ','كِتابًا'], correct:2, expl:'تَمْييز : après un nombre de 11 à 99, le nom compté est <b>singulier + accusatif</b>.'},
      {q:'« Le garçon est venu en hâte »', ar:'جاءَ الوَلَدُ ـــــ', opts:['مُسْرِعٌ','مُسْرِعًا','مُسْرِعٍ'], correct:1, expl:'حال : l\'état du sujet pendant l\'action → accusatif.'},
      {q:'« Je parle un peu arabe »', ar:'أَتَكَلَّمُ العَرَبِيَّةَ ـــــ', opts:['قَليلٌ','قَليلًا','قَليلٍ'], correct:1, expl:'Adverbe de quantité = nom à l\'accusatif.'}
    ]
  },
  {
    id:'diptote', ic:'⑨', t:'Les noms qui refusent le tanwīn', sub:'مَمْنوع مِنَ الصَّرْف — le détail qui signe',
    html:`<p>Chapitre avancé, et c'est exactement pour ça qu'il est ici : <b>c'est lui qui sépare un arabe correct d'un arabe pur.</b></p>
    <p>Certains noms sont <b>مَمْنوع مِنَ الصَّرْف</b> (« interdits de flexion complète ») : ils <b>ne prennent jamais de tanwīn</b>, et au génitif ils prennent une <b>fatḥa au lieu de la kasra</b>. Deux cas au lieu de trois.</p>
    <div class="expl"><b>Qui est concerné :</b><br>
    · les <b>noms propres</b> non arabes ou de forme particulière : أَحْمَدُ, عُمَرُ, فاطِمَةُ, مَكَّةُ, لُبْنانُ, باريسُ<br>
    · les <b>élatifs</b> (plus grand, plus beau) : أَكْبَرُ, أَجْمَلُ<br>
    · les <b>pluriels brisés</b> de schème مَفاعِل / مَفاعيل : مَساجِدُ, مَفاتيحُ, مَدارِسُ<br>
    · les féminins en ـاء : صَحْراءُ, حَمْراءُ</div>
    <div class="expl warn"><b>Le point qui piège tout le monde :</b> dès que le mot reçoit <b>الـ</b> ou entre dans une <b>annexion</b>, il redevient normal et reprend la kasra.<br>
    صَلَّيْتُ في <b>مَساجِدَ</b> كَثيرَةٍ (fatḥa) · mais صَلَّيْتُ في <b>المَساجِدِ</b> (kasra).</div>
    <p>Quand tu entends quelqu'un dire <i>fī masājida</i> sans hésiter, tu sais qu'il a fait de la grammaire. C'est ce niveau-là que tu vises.</p>`,
    ex:[
      {ar:'صَلَّيْتُ في مَساجِدَ كَثيرَةٍ', tr:'ṣallaytu fī masājida kathīratin', fr:'j\'ai prié dans de nombreuses mosquées'},
      {ar:'ذَهَبْتُ مَعَ أَحْمَدَ', tr:'dhahabtu maʿa Aḥmada', fr:'je suis parti avec Ahmad'},
      {ar:'صَلَّيْتُ في المَساجِدِ', tr:'ṣallaytu fī l-masājidi', fr:'j\'ai prié dans les mosquées', n:'avec l\'article, la kasra revient'},
      {ar:'هٰذا أَكْبَرُ مِنْ ذٰلِكَ', tr:'hādhā akbaru min dhālika', fr:'ceci est plus grand que cela'}
    ],
    quiz:[
      {q:'« J\'ai prié dans de nombreuses mosquées »', ar:'صَلَّيْتُ في ـــــ كَثيرَةٍ', opts:['مَساجِدٍ','مَساجِدَ','مَساجِدُ'], correct:1, expl:'Pluriel brisé مَفاعِل, sans article ni annexion → <b>interdit de tanwīn</b>, génitif en <b>fatḥa</b>.'},
      {q:'« Je suis parti avec Ahmad »', ar:'ذَهَبْتُ مَعَ ـــــ', opts:['أَحْمَدٍ','أَحْمَدَ','أَحْمَدُ'], correct:1, expl:'Nom propre diptote → génitif en fatḥa, jamais de tanwīn.'},
      {q:'« J\'ai prié dans LES mosquées »', ar:'صَلَّيْتُ في ـــــ', opts:['المَساجِدَ','المَساجِدِ','مَساجِدَ'], correct:1, expl:'Avec الـ, le mot redevient normal : <b>kasra</b>.'}
    ]
  }
];

/* ---------- 5. LA MACHINE : racine & schème (الصَّرْف) ----------
   Le vrai moteur du fuṣḥā, et le meilleur cadeau qu'il fait :
   le vocabulaire cesse d'être une liste, il devient un calcul.
*/
FUSHA.sarf = {
  intro:`<p>Un mot arabe = une <b>racine</b> (3 consonnes, qui porte le sens) coulée dans un <b>schème</b> (un moule de voyelles, qui porte la fonction). Rien d'autre.</p>
  <div class="expl"><b>ك-ت-ب</b> = l'idée d'écrire.<br>
  كَتَبَ <i>kataba</i> il a écrit · كِتاب <i>kitāb</i> un livre · كاتِب <i>kātib</i> un écrivain · مَكْتوب <i>maktūb</i> écrit · مَكْتَب <i>maktab</i> un bureau · مَكْتَبَة <i>maktaba</i> une bibliothèque · مُكاتَبَة <i>mukātaba</i> une correspondance.<br>
  <b>Un seul mot à apprendre, sept mots obtenus.</b></div>
  <p class="mt">Les grammairiens décrivent les schèmes avec la racine témoin <b>ف-ع-ل</b> (« faire ») : c'est <b>الميزان الصَّرْفي</b>, « la balance morphologique ». مَكْتَب pèse مَفْعَل. مِفْتاح pèse مِفْعال.</p>
  <div class="expl warn"><b>Et le nom de cette app en est un :</b> <b>مِفْتاح</b> <i>miftāḥ</i>, « la clé », c'est la racine ف-ت-ح (ouvrir) dans le schème <b>مِفْعال</b> = l'instrument. La clé, c'est littéralement <b>« l'outil qui ouvre »</b>. Tu utilises la machine depuis le premier jour sans le savoir.</div>`,

  /* Les 10 formes du verbe */
  formes:[
    {n:'I',    ar:'فَعَلَ',      tr:'faʿala',      sens:'l\'action nue, le sens de base',
     r:'ك-ت-ب', der:{ar:'كَتَبَ', tr:'kataba', fr:'écrire'}, base:null},
    {n:'II',   ar:'فَعَّلَ',     tr:'faʿʿala',     sens:'intensif ou <b>causatif</b> — faire faire, faire beaucoup',
     r:'ع-ل-م', der:{ar:'عَلَّمَ', tr:'ʿallama', fr:'enseigner (= faire savoir)'}, base:{ar:'عَلِمَ', tr:'ʿalima', fr:'savoir'}},
    {n:'III',  ar:'فاعَلَ',     tr:'fāʿala',      sens:'l\'action <b>dirigée vers l\'autre</b>, l\'effort partagé',
     r:'ك-ت-ب', der:{ar:'كاتَبَ', tr:'kātaba', fr:'correspondre avec'}, base:{ar:'كَتَبَ', tr:'kataba', fr:'écrire'}},
    {n:'IV',   ar:'أَفْعَلَ',    tr:'afʿala',      sens:'<b>causatif</b> — provoquer l\'action',
     r:'خ-ر-ج', der:{ar:'أَخْرَجَ', tr:'akhraja', fr:'faire sortir / produire'}, base:{ar:'خَرَجَ', tr:'kharaja', fr:'sortir'}},
    {n:'V',    ar:'تَفَعَّلَ',   tr:'tafaʿʿala',   sens:'le <b>réfléchi de la II</b> — faire à soi-même, devenir',
     r:'ع-ل-م', der:{ar:'تَعَلَّمَ', tr:'taʿallama', fr:'apprendre (= s\'enseigner)'}, base:{ar:'عَلَّمَ', tr:'ʿallama', fr:'enseigner'}},
    {n:'VI',   ar:'تَفاعَلَ',   tr:'tafāʿala',    sens:'le <b>réciproque</b> — l\'un l\'autre',
     r:'ع-و-ن', der:{ar:'تَعاوَنَ', tr:'taʿāwana', fr:'coopérer'}, base:{ar:'عاوَنَ', tr:'ʿāwana', fr:'aider'}},
    {n:'VII',  ar:'اِنْفَعَلَ',  tr:'infaʿala',    sens:'le <b>passif-moyen</b> — l\'action subie, sans auteur',
     r:'ك-س-ر', der:{ar:'اِنْكَسَرَ', tr:'inkasara', fr:'se briser'}, base:{ar:'كَسَرَ', tr:'kasara', fr:'casser'}},
    {n:'VIII', ar:'اِفْتَعَلَ',  tr:'iftaʿala',    sens:'réfléchi / action prise <b>sur soi</b>',
     r:'ج-م-ع', der:{ar:'اِجْتَمَعَ', tr:'ijtamaʿa', fr:'se réunir'}, base:{ar:'جَمَعَ', tr:'jamaʿa', fr:'rassembler'}},
    {n:'IX',   ar:'اِفْعَلَّ',   tr:'ifʿalla',     sens:'réservée aux <b>couleurs et défauts</b>',
     r:'ح-م-ر', der:{ar:'اِحْمَرَّ', tr:'iḥmarra', fr:'rougir / devenir rouge'}, base:{ar:'أَحْمَر', tr:'aḥmar', fr:'rouge'}},
    {n:'X',    ar:'اِسْتَفْعَلَ', tr:'istafʿala',   sens:'<b>demander</b> ou <b>juger</b> — chercher à obtenir',
     r:'غ-ف-ر', der:{ar:'اِسْتَغْفَرَ', tr:'istaghfara', fr:'demander pardon'}, base:{ar:'غَفَرَ', tr:'ghafara', fr:'pardonner'}}
  ],

  /* Les schèmes du nom : la fonction se lit dans le moule */
  schemes:[
    {ar:'فاعِل', tr:'fāʿil', cle:'celui qui fait l\'action', sens:'le <b>participe actif</b> — l\'agent',
     ex:[{ar:'كاتِب', tr:'kātib', fr:'un écrivain', r:'ك-ت-ب'},{ar:'طالِب', tr:'ṭālib', fr:'un étudiant (« celui qui demande »)', r:'ط-ل-ب'},{ar:'هاتِف', tr:'hātif', fr:'un téléphone (« celui qui appelle »)', r:'ه-ت-ف'}]},
    {ar:'مَفْعول', tr:'mafʿūl', cle:'ce qui subit l\'action', sens:'le <b>participe passif</b>',
     ex:[{ar:'مَكْتوب', tr:'maktūb', fr:'écrit / le destin', r:'ك-ت-ب'},{ar:'مَعْروف', tr:'maʿrūf', fr:'connu', r:'ع-ر-ف'},{ar:'مَمْنوع', tr:'mamnūʿ', fr:'interdit', r:'م-ن-ع'}]},
    {ar:'مَفْعَل · مَفْعِل', tr:'mafʿal', cle:'le LIEU de l\'action', sens:'le <b>nom de lieu</b>',
     ex:[{ar:'مَكْتَب', tr:'maktab', fr:'un bureau (où l\'on écrit)', r:'ك-ت-ب'},{ar:'مَدْرَسَة', tr:'madrasa', fr:'une école (où l\'on étudie)', r:'د-ر-س'},{ar:'مَسْجِد', tr:'masjid', fr:'une mosquée (où l\'on se prosterne)', r:'س-ج-د'},{ar:'مَطْبَخ', tr:'maṭbakh', fr:'une cuisine (où l\'on cuit)', r:'ط-ب-خ'}]},
    {ar:'مِفْعال · مِفْعَل', tr:'mifʿāl', cle:'l\'INSTRUMENT', sens:'le <b>nom d\'outil</b>',
     ex:[{ar:'مِفْتاح', tr:'miftāḥ', fr:'une clé (ce qui ouvre)', r:'ف-ت-ح'},{ar:'مِصْباح', tr:'miṣbāḥ', fr:'une lampe', r:'ص-ب-ح'},{ar:'مِكْنَسَة', tr:'miknasa', fr:'un balai', r:'ك-ن-س'}]},
    {ar:'فَعّال', tr:'faʿʿāl', cle:'le métier, l\'intensif', sens:'celui qui fait <b>sans cesse</b> — d\'où les métiers',
     ex:[{ar:'خَبّاز', tr:'khabbāz', fr:'un boulanger (خبز, le pain)', r:'خ-ب-ز'},{ar:'نَجّار', tr:'najjār', fr:'un menuisier', r:'ن-ج-ر'},{ar:'سَيّارَة', tr:'sayyāra', fr:'une voiture (celle qui circule)', r:'س-ي-ر'}]},
    {ar:'فَعيل', tr:'faʿīl', cle:'la qualité durable', sens:'l\'<b>adjectif</b> de qualité stable',
     ex:[{ar:'كَبير', tr:'kabīr', fr:'grand', r:'ك-ب-ر'},{ar:'جَميل', tr:'jamīl', fr:'beau', r:'ج-م-ل'},{ar:'صَديق', tr:'ṣadīq', fr:'un ami (celui qui est sincère)', r:'ص-د-ق'}]},
    {ar:'مَصْدَر', tr:'maṣdar', cle:'le nom de l\'action', sens:'l\'<b>infinitif-nom</b> : « le fait de… ». Régulier pour les formes II à X — تَفْعيل, مُفاعَلَة, إِفْعال, تَفَعُّل, اِفْتِعال, اِسْتِفْعال',
     ex:[{ar:'تَعْليم', tr:'taʿlīm', fr:'l\'enseignement (forme II)', r:'ع-ل-م'},{ar:'اِسْتِقْلال', tr:'istiqlāl', fr:'l\'indépendance (forme X)', r:'ق-ل-ل'},{ar:'اِجْتِماع', tr:'ijtimāʿ', fr:'une réunion (forme VIII)', r:'ج-م-ع'}]}
  ],

  /* Le lexique moderne se FABRIQUE — démonstration sur son terrain */
  lexique:[
    {ar:'اِقْتِصاد', tr:'iqtiṣād', fr:'l\'économie', r:'ق-ص-د', rfr:'viser, être modéré', x:'Forme VIII (اِفْتِعال) : « le fait de viser juste, de ne pas gaspiller ».'},
    {ar:'اِسْتِثْمار', tr:'istithmār', fr:'l\'investissement', r:'ث-م-ر', rfr:'le fruit (ثَمَر)', x:'Forme X (اِسْتِفْعال) : « chercher à faire fructifier ». La métaphore française est exactement la même.'},
    {ar:'شَرِكَة', tr:'sharika', fr:'une société / entreprise', r:'ش-ر-ك', rfr:'associer, partager', x:'De شَريك « l\'associé » — la société est littéralement l\'association.'},
    {ar:'مُقابَلَة', tr:'muqābala', fr:'un entretien', r:'ق-ب-ل', rfr:'être en face de', x:'Maṣdar de la forme III (مُفاعَلَة) : « le fait de se faire face ». Ton entretien de stage, mot à mot.'},
    {ar:'تَسْويق', tr:'taswīq', fr:'le marketing', r:'س-و-ق', rfr:'le marché (سوق)', x:'Forme II (تَفْعيل) : « le fait de porter au marché ». Le mot que tu connais déjà en darija est la racine.'},
    {ar:'مُدير', tr:'mudīr', fr:'un directeur', r:'د-و-ر', rfr:'tourner, faire tourner', x:'Participe actif de la forme IV أَدارَ : « celui qui fait tourner la maison ». Même racine que دار.'},
    {ar:'مَصْرِف', tr:'maṣrif', fr:'une banque', r:'ص-ر-ف', rfr:'changer, écouler', x:'Schème du lieu : « l\'endroit où l\'on change (l\'argent) ». Synonyme courant : بَنْك.'},
    {ar:'حاسوب', tr:'ḥāsūb', fr:'un ordinateur', r:'ح-س-ب', rfr:'compter, calculer', x:'Forgé au XX<sup>e</sup> s. sur فاعول — « le calculateur ». Exactement la logique de <i>computer</i>.'}
  ],

  /* Les pluriels brisés : ils suivent des moules, eux aussi */
  pluriels:[
    {sg:'كِتاب', sgtr:'kitāb', pl:'كُتُب', pltr:'kutub', fr:'livre(s)', sch:'فِعال → فُعُل'},
    {sg:'قَلَم', sgtr:'qalam', pl:'أَقْلام', pltr:'aqlām', fr:'stylo(s)', sch:'فَعَل → أَفْعال'},
    {sg:'وَلَد', sgtr:'walad', pl:'أَوْلاد', pltr:'awlād', fr:'garçon(s)', sch:'فَعَل → أَفْعال'},
    {sg:'رَجُل', sgtr:'rajul', pl:'رِجال', pltr:'rijāl', fr:'homme(s)', sch:'فَعُل → فِعال'},
    {sg:'بَيْت', sgtr:'bayt', pl:'بُيوت', pltr:'buyūt', fr:'maison(s)', sch:'فَعْل → فُعول'},
    {sg:'مَدْرَسَة', sgtr:'madrasa', pl:'مَدارِس', pltr:'madāris', fr:'école(s)', sch:'مَفْعَلَة → مَفاعِل'},
    {sg:'مِفْتاح', sgtr:'miftāḥ', pl:'مَفاتيح', pltr:'mafātīḥ', fr:'clé(s)', sch:'مِفْعال → مَفاعيل'},
    {sg:'طالِب', sgtr:'ṭālib', pl:'طُلّاب', pltr:'ṭullāb', fr:'étudiant(s)', sch:'فاعِل → فُعّال'},
    {sg:'كَبير', sgtr:'kabīr', pl:'كِبار', pltr:'kibār', fr:'grand(s)', sch:'فَعيل → فِعال'},
    {sg:'مَدينَة', sgtr:'madīna', pl:'مُدُن', pltr:'mudun', fr:'ville(s)', sch:'فَعيلَة → فُعُل'}
  ]
};

/* ---------- 6. PARLER EN FUṢḤÁ PUR ----------
   Tout est vocalisé : c'est la seule façon de prononcer l'i3rab.
   { id, ic, t, note, items:[{ar,tr,fr,d,n}] }  d = son équivalent darija
*/
FUSHA.phrases = [
  {
    id:'presenter', ic:'🤲', t:'Se présenter',
    note:'Les réponses rituelles comptent autant que les questions — un fuṣḥā pur, c\'est aussi un fuṣḥā qui répond correctement.',
    items:[
      {ar:'السَّلامُ عَلَيْكُمْ', tr:'as-salāmu ʿalaykum', fr:'bonjour (paix sur vous)', d:'salam 3likum'},
      {ar:'وَعَلَيْكُمُ السَّلامُ', tr:'wa-ʿalaykumu s-salām', fr:'et sur vous la paix (la réponse)', n:'On répond <b>toujours</b>. Ne pas répondre est une faute sociale, pas linguistique.'},
      {ar:'صَباحُ الخَيْرِ', tr:'ṣabāḥu l-khayr', fr:'bonjour (le matin)', d:'sba7 lkhir'},
      {ar:'صَباحُ النّورِ', tr:'ṣabāḥu n-nūr', fr:'« matin de lumière » — la réponse consacrée', n:'On ne répète pas la formule : on la <b>surenchérit</b>. Très arabe.'},
      {ar:'كَيْفَ حالُكَ؟', tr:'kayfa ḥāluka', fr:'comment vas-tu ? (à un homme)', d:'kif dayr ? / labas ?', n:'À une femme : كَيْفَ حالُكِ <i>kayfa ḥāluki</i>.'},
      {ar:'بِخَيْرٍ، الحَمْدُ لِلّٰهِ', tr:'bi-khayrin, al-ḥamdu li-llāh', fr:'bien, Dieu merci', d:'labas, l7amdulillah'},
      {ar:'ما اسْمُكَ؟', tr:'ma-smuka', fr:'quel est ton nom ?', n:'اسْم commence par une <i>hamza instable</i> : on enchaîne <i>ma-smuka</i>, sans coup de glotte.'},
      {ar:'اِسْمي توما', tr:'ismī Tūmā', fr:'je m\'appelle Thomas', d:'smiti Thomas'},
      {ar:'أنا مِنْ فَرَنْسا', tr:'anā min Faransā', fr:'je viens de France', d:'ana men fransa'},
      {ar:'أَدْرُسُ إِدارَةَ الأَعْمالِ', tr:'adrusu idārata l-aʿmāl', fr:'j\'étudie la gestion / le commerce', n:'COD à l\'accusatif + annexion : <i>idārat<b>a</b> l-aʿmāl<b>i</b></i>. Deux règles en trois mots.'},
      {ar:'عُمْري واحِدٌ وَعِشْرونَ سَنَةً', tr:'ʿumrī wāḥidun wa-ʿishrūna sanatan', fr:'j\'ai 21 ans', n:'سَنَةً au singulier accusatif : c\'est le <i>tamyīz</i> du chapitre ⑧.'},
      {ar:'تَشَرَّفْتُ بِمَعْرِفَتِكَ', tr:'tasharraftu bi-maʿrifatika', fr:'enchanté (« j\'ai été honoré »)', n:'Forme V. Registre soutenu, exactement ce que tu cherches.'},
      {ar:'إِلى اللِّقاءِ', tr:'ilā l-liqāʾ', fr:'au revoir (« à la rencontre »)', d:'bslama'}
    ]
  },
  {
    id:'demander', ic:'☕', t:'Demander quelque chose',
    note:'Chaque phrase ici est une leçon de grammaire déguisée : accusatif du COD, annexion, subjonctif après أَنْ.',
    items:[
      {ar:'أُريدُ فِنْجانَ قَهْوَةٍ، مِنْ فَضْلِكَ', tr:'urīdu finjāna qahwatin, min faḍlik', fr:'je voudrais une tasse de café, s\'il te plaît', d:'bghit qahwa', n:'<i>finjāna</i> accusatif (COD) + <i>qahwatin</i> génitif (annexion). Le fuṣḥā en une phrase.'},
      {ar:'لَوْ سَمَحْتَ', tr:'law samaḥta', fr:'s\'il te plaît (« si tu permettais »)', d:'3afak'},
      {ar:'هَلْ عِنْدَكَ ماءٌ؟', tr:'hal ʿindaka māʾun', fr:'as-tu de l\'eau ?', d:'3ndek lma ?', n:'هَلْ ouvre toute question fermée. Sans lui, on peut aussi juste monter la voix.'},
      {ar:'أُريدُ أَنْ أَذْهَبَ إِلى المَدينَةِ', tr:'urīdu an adhhaba ilā l-madīna', fr:'je veux aller en ville', n:'أَنْ + <b>subjonctif</b> : <i>adhhab<b>a</b></i>, pas <i>adhhabu</i>.'},
      {ar:'كَمِ الثَّمَنُ؟', tr:'kami th-thaman', fr:'quel est le prix ?', d:'shhal thmen ?'},
      {ar:'أَيْنَ المَحَطَّةُ؟', tr:'ayna l-maḥaṭṭa', fr:'où est la gare / la station ?', d:'fin kayn l-ma7atta ?'},
      {ar:'هَلْ يُمْكِنُني أَنْ أَسْأَلَ سُؤالًا؟', tr:'hal yumkinunī an asʾala suʾālan', fr:'puis-je poser une question ?', n:'<i>asʾala suʾālan</i> : le verbe et son nom d\'action — le <b>مَفْعول مُطْلَق</b>.'}
    ]
  },
  {
    id:'sauver', ic:'🆘', t:'Te sauver quand ça décroche',
    note:'Les phrases les plus rentables de toutes : elles t\'achètent le droit de rester dans la conversation.',
    items:[
      {ar:'لَمْ أَفْهَمْ', tr:'lam afham', fr:'je n\'ai pas compris', d:'ma fhemtsh', n:'لَمْ + jussif. La finale tombe : <i>afham</i>, jamais <i>afhamu</i>.'},
      {ar:'هَلْ يُمْكِنُكَ أَنْ تُعيدَ؟', tr:'hal yumkinuka an tuʿīda', fr:'peux-tu répéter ?', d:'3awed 3afak'},
      {ar:'تَكَلَّمْ بِبُطْءٍ مِنْ فَضْلِكَ', tr:'takallam bi-buṭʾin min faḍlik', fr:'parle lentement, s\'il te plaît', d:'bshwiya 3afak'},
      {ar:'ماذا يَعْني هٰذا؟', tr:'mādhā yaʿnī hādhā', fr:'qu\'est-ce que ça veut dire ?', d:'ashnu m3natha ?'},
      {ar:'كَيْفَ نَقولُ هٰذا بِالعَرَبِيَّةِ؟', tr:'kayfa naqūlu hādhā bi-l-ʿarabiyya', fr:'comment dit-on ça en arabe ?', d:'kifash tgul... ?'},
      {ar:'أنا أَتَعَلَّمُ العَرَبِيَّةَ', tr:'anā ataʿallamu l-ʿarabiyya', fr:'j\'apprends l\'arabe', d:'ana kant3allem'},
      {ar:'لا أَتَكَلَّمُ العَرَبِيَّةَ جَيِّدًا بَعْدُ', tr:'lā atakallamu l-ʿarabiyyata jayyidan baʿdu', fr:'je ne parle pas encore bien arabe', n:'<i>baʿdu</i> avec ḍamma indéclinable = « pas encore ». Détail très classique.'},
      {ar:'آسِفٌ', tr:'āsifun', fr:'désolé', n:'Une femme dit آسِفَةٌ <i>āsifatun</i>.'}
    ]
  },
  {
    id:'avis', ic:'🧠', t:'Donner ton avis',
    note:'Le registre du débat. C\'est <b>là</b> que le fuṣḥā se parle vraiment : on n\'argumente pas en darija sur un plateau.',
    items:[
      {ar:'في رَأْيي…', tr:'fī raʾyī…', fr:'à mon avis…', n:'رَأْي garde sa hamza : <i>raʾy</i>, pas <i>ray</i>.'},
      {ar:'أَعْتَقِدُ أَنَّ هٰذا صَحيحٌ', tr:'aʿtaqidu anna hādhā ṣaḥīḥun', fr:'je crois que c\'est exact', n:'أَنَّ = sœur de إنَّ → ce qui suit passerait à l\'accusatif si c\'était un nom.'},
      {ar:'أَتَّفِقُ مَعَكَ', tr:'attafiqu maʿaka', fr:'je suis d\'accord avec toi'},
      {ar:'لا أَتَّفِقُ مَعَكَ', tr:'lā attafiqu maʿaka', fr:'je ne suis pas d\'accord'},
      {ar:'هٰذا صَحيحٌ، وَلٰكِنْ…', tr:'hādhā ṣaḥīḥun, wa-lākin…', fr:'c\'est vrai, mais…'},
      {ar:'ما الدَّليلُ؟', tr:'mā d-dalīl', fr:'quelle est la preuve ?', n:'دَليل = preuve, indice. Le mot central de toute discussion sérieuse.'},
      {ar:'مِنْ ناحِيَةٍ أُخْرى', tr:'min nāḥiyatin ukhrā', fr:'d\'un autre côté'},
      {ar:'عَلى العَكْسِ', tr:'ʿalā l-ʿaks', fr:'au contraire'},
      {ar:'بِالضَّبْطِ', tr:'bi-ḍ-ḍabṭ', fr:'exactement'}
    ]
  },
  {
    id:'discours', ic:'🎙️', t:'Les charnières du discours',
    note:'Le fuṣḥā articule beaucoup plus explicitement que le français. Ces mots-là font, à eux seuls, sonner « écrit ».',
    items:[
      {ar:'أَوَّلًا… ثانِيًا… أَخيرًا', tr:'awwalan… thāniyan… akhīran', fr:'premièrement… deuxièmement… enfin', n:'Trois accusatifs adverbiaux d\'affilée — le chapitre ⑧ en action.'},
      {ar:'بِالإِضافَةِ إِلى ذٰلِكَ', tr:'bi-l-iḍāfati ilā dhālika', fr:'de plus / en outre'},
      {ar:'عَلى سَبيلِ المِثالِ', tr:'ʿalā sabīli l-mithāl', fr:'par exemple (« sur la voie de l\'exemple »)'},
      {ar:'لِذٰلِكَ', tr:'li-dhālika', fr:'c\'est pourquoi'},
      {ar:'مَعَ ذٰلِكَ', tr:'maʿa dhālika', fr:'malgré cela'},
      {ar:'بِعِبارَةٍ أُخْرى', tr:'bi-ʿibāratin ukhrā', fr:'autrement dit'},
      {ar:'خُلاصَةُ القَوْلِ', tr:'khulāṣatu l-qawl', fr:'en résumé (« l\'essence du propos »)'},
      {ar:'ما زالَ السُّؤالُ مَطْروحًا', tr:'mā zāla s-suʾālu maṭrūḥan', fr:'la question reste posée', n:'ما زالَ est une sœur de كانَ → <i>maṭrūḥ<b>an</b></i> à l\'accusatif.'}
    ]
  },
  {
    id:'formules', ic:'📿', t:'Les formules qui traversent tout',
    note:'Elles sont en fuṣḥā <b>partout</b>, y compris dans la bouche de tes potes en pleine darija. C\'est le fuṣḥā que tu entends déjà tous les jours.',
    items:[
      {ar:'بِسْمِ اللّٰهِ', tr:'bismi llāh', fr:'au nom de Dieu (avant de commencer)'},
      {ar:'الحَمْدُ لِلّٰهِ', tr:'al-ḥamdu li-llāh', fr:'louange à Dieu / Dieu merci', d:'l7amdulillah'},
      {ar:'إِنْ شاءَ اللّٰهُ', tr:'in shāʾa llāh', fr:'si Dieu veut', d:'inshallah'},
      {ar:'ما شاءَ اللّٰهُ', tr:'mā shāʾa llāh', fr:'admiration (littéralement : ce que Dieu a voulu)'},
      {ar:'بارَكَ اللّٰهُ فيكَ', tr:'bāraka llāhu fīka', fr:'que Dieu te bénisse (= merci chaleureux)'},
      {ar:'جَزاكَ اللّٰهُ خَيْرًا', tr:'jazāka llāhu khayran', fr:'que Dieu te récompense en bien'},
      {ar:'اللّٰهُ أَعْلَمُ', tr:'allāhu aʿlam', fr:'Dieu sait mieux (= je n\'en sais rien)', n:'أَعْلَمُ est un élatif diptote — pas de tanwīn. Chapitre ⑨.'},
      {ar:'عَلى كُلِّ حالٍ', tr:'ʿalā kulli ḥāl', fr:'en tout cas'}
    ]
  }
];

/* ---------- 7. LA ROUTE : comment on y va vraiment ---------- */
FUSHA.route = [
  { ic:'🪜', t:'Les quatre paliers', x:"<b>1. Le fuṣḥā de la presse</b> — al-Jazeera, BBC Arabic, France 24 arabe. ~2000 mots et la grammaire de base suffisent. C'est le palier utile.<br><b>2. Le fuṣḥā littéraire</b> — Naguib Mahfouz, Ghassan Kanafani. Phrases longues, lexique riche.<br><b>3. Le turāth</b> — Ibn Khaldūn, al-Jāḥiẓ, al-Mutanabbī. La langue classique pleine.<br><b>4. Le Coran + le tajwīd</b> — le sommet de la norme, avec ses propres règles de récitation. C'est l'étalon historique de « l'arabe le plus pur »." },
  { ic:'📗', t:'La grammaire, par le chemin arabe', x:"<b>الآجُرّومِيَّة</b> (<i>al-Ājurrūmiyya</i>) — une cinquantaine de pages écrites au XIV<sup>e</sup> siècle par <b>Ibn Ājurrūm, un Fassi</b> : le manuel de grammaire arabe le plus utilisé de l'histoire, encore aujourd'hui, du Maroc à l'Indonésie. Tout ce module en est le premier tiers. Ensuite : <b>قَطْر النَّدى</b>, puis <b>أَلْفِيَّة ابْن مالِك</b> (1000 vers de grammaire, appris par cœur). Ce n'est pas un détour folklorique : c'est <b>la</b> voie, et elle est marocaine à sa racine." },
  { ic:'📘', t:'Les méthodes modernes', x:"<b>دُروس اللُّغَة العَرَبِيَّة</b> (« les livres de Médine », V. Abdur Rahim) — 3 tomes, tout en arabe dès la page 1, gratuits en ligne, et bâtis exactement sur l'ordre racine → schème → i3rab.<br><b>الكِتاب الأَساسي</b> et <b>Al-Kitaab</b> (Brustad, standard universitaire américain) pour un parcours plus classique." },
  { ic:'📖', t:'Le dictionnaire par racines', x:"Le <b>Hans Wehr</b> classe les mots <b>par racine</b>, pas par ordre alphabétique de surface : pour chercher مُسْتَشْفى (hôpital), il faut savoir que la racine est ش-ف-ي (guérir). Autrement dit : sans la salle ⚙️, un dictionnaire d'arabe est inutilisable — et avec elle, il devient une carte du sens. Côté arabe : <b>لِسان العَرَب</b> d'Ibn Manẓūr (XIII<sup>e</sup> s., 20 volumes)." },
  { ic:'👂', t:'L\'oreille', x:"Pour la prononciation la plus pure, la référence n'est pas un cours : c'est un <b>récitant</b> (le tajwīd code chaque son, chaque allongement, chaque assimilation) et un <b>journal télévisé</b>. Écoute 10 minutes de JT par jour sans chercher à tout comprendre — tu apprends le rythme, les charnières et l'i3rab audible." },
  { ic:'🎯', t:'Le dosage honnête', x:"Tu as déjà un parcours darija et des potes marocains — c'est ton avantage décisif, ne le lâche pas. Le fuṣḥā se travaille <b>à côté</b>, pas à la place : 10 minutes par jour ici (une salle, un drill), la darija restant l'entraînement de conversation. En six mois tu lis un titre de journal et tu comprends une <i>khuṭba</i>. Ce n'est pas rien — et ça ne coûte pas ta pratique orale." }
];
