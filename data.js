/* ============================================================
   MIFTAH — Socle arabe (darija) : sons, arabizi, alphabet, mots
   Contenu volontairement PAN-MAGHRÉBIN : ce qui est commun au
   marocain / algérien / tunisien. On spécialisera plus tard.
   ============================================================ */

/* ---------- 1. LES SONS (le vrai mur) ----------
   s = { ar, arabizi, nom, deja (tu l'as déjà ?), comment, piege, mot:{ar,arabizi,fr}, paire:[{ar,arabizi,fr},{...}] }
*/
window.SONS = [
  {
    ar:'خ', arabizi:'kh / 5', nom:'khā’', deja:'✅ Tu l\'as déjà !',
    comment:"C'est <b>exactement la jota espagnole</b> de <i>jamón</i>, ou le <i>ch</i> allemand de <i>Bach</i>. Le fond de la langue remonte vers le voile du palais et l'air racle. Tu le fais déjà sans y penser.",
    piege:"Ne le confonds pas avec un simple « k ». C'est un frottement continu, pas un claquement.",
    mot:{ar:'خبز', arabizi:'khubz', fr:'le pain'},
    paire:null
  },
  {
    ar:'غ', arabizi:'gh / 8', nom:'ghayn', deja:'✅ Tu l\'as déjà !',
    comment:"C'est <b>ton R français</b>. Celui de « Paris », « rouge ». Même endroit que le خ, mais avec les cordes vocales qui vibrent. Dis « خ » puis ajoute ta voix : tu obtiens غ.",
    piege:"Les francophones ont un avantage énorme ici — les anglophones galèrent des mois sur ce son que tu produis depuis l'enfance.",
    mot:{ar:'غالي', arabizi:'ghali', fr:'cher (coûteux)'},
    paire:null
  },
  {
    ar:'ح', arabizi:'7', nom:'ḥā’', deja:'❌ Nouveau',
    comment:"Un <b>H soufflé, chaud, serré</b>. Imagine que tu embues une vitre en hiver — mais en resserrant le fond de la gorge, comme si on te serrait légèrement le cou. Ce n'est PAS le « h » anglais de <i>hello</i> (ça, c'est ه).",
    piege:"Le réflexe francophone est de ne rien prononcer du tout (notre « h » est muet). Ici, si on n'entend rien, c'est raté.",
    mot:{ar:'حوت', arabizi:'7ut', fr:'le poisson'},
    paire:null
  },
  {
    ar:'ع', arabizi:'3', nom:'‘ayn', deja:'❌ Le boss',
    comment:"<b>Le son le plus célèbre de l'arabe.</b> C'est le ح… avec la voix. Serre le fond de la gorge (comme pour retenir un bâillement ou soulever une charge lourde) et fais sonner. Beaucoup le décrivent comme « la voix qu'on écrase ».",
    piege:"Ne le remplace pas par une voyelle ou une coupure glottale. Si tu dis « aïn » au lieu de « 3ayn », tu dis autre chose. Prends ton temps : ce son se travaille des semaines, c'est normal.",
    mot:{ar:'عين', arabizi:'3in', fr:'l\'œil / la source'},
    paire:null
  },
  {
    ar:'ق', arabizi:'9 / q', nom:'qāf', deja:'❌ Nouveau',
    comment:"Un <b>K produit tout au fond</b>, contre la luette, là où tu prononces ton R. Dis « ka », puis refais-le en reculant le point de contact le plus loin possible. Le son devient plus sombre, plus « lourd ».",
    piege:"⚠️ <b>En darija marocaine, ق se dit bien « q »</b> (au fond) dans les villes — c'est ce que tu dois viser. Mais tu l'entendras parfois en « g » dur (campagnes, influence bédouine) : <i>gal</i> pour <i>qal</i> (il a dit), <i>gelb</i> pour <i>qelb</i>. Les deux existent, ne t'inquiète pas.",
    mot:{ar:'قلب', arabizi:'9alb', fr:'le cœur'},
    paire:[{ar:'كلب', arabizi:'kalb', fr:'le chien'},{ar:'قلب', arabizi:'9alb', fr:'le cœur'}]
  },
  {
    ar:'ص', arabizi:'S', nom:'ṣād (S emphatique)', deja:'❌ Nouveau',
    comment:"Un <b>S « lourd »</b>. La langue s'aplatit et se creuse, l'arrière remonte. L'astuce qui marche : <b>ce n'est pas le S qui change, ce sont les voyelles autour</b> qui deviennent sombres. « sa » clair → « ṣa » sonne presque « so ».",
    piege:"Si tu prononces un S normal, tu changes le mot. Écoute la <i>couleur de la voyelle</i>, pas la consonne.",
    mot:{ar:'صيف', arabizi:'Sif', fr:'l\'été'},
    paire:[{ar:'سيف', arabizi:'sif', fr:'l\'épée'},{ar:'صيف', arabizi:'Sif', fr:'l\'été'}]
  },
  {
    ar:'ط', arabizi:'T', nom:'ṭā’ (T emphatique)', deja:'❌ Nouveau',
    comment:"Même logique que ص : un <b>T lourd et sombre</b>. Langue creusée, arrière relevé. Les voyelles autour s'assombrissent : « ti » devient presque « to ».",
    piege:"Même piège : c'est la voyelle voisine qui trahit l'emphase. Entraîne l'oreille avant la bouche.",
    mot:{ar:'طين', arabizi:'Tin', fr:'la boue / l\'argile'},
    paire:[{ar:'تين', arabizi:'tin', fr:'la figue'},{ar:'طين', arabizi:'Tin', fr:'la boue'}]
  }
];

/* ---------- 2. L'ARABIZI (écrire dès le jour 1) ----------
   Les chiffres remplacent les sons absents du clavier latin.
   C'est comme ça que tes potes s'écrivent réellement.
*/
window.ARABIZI = [
  { n:'2', ar:'ء', son:'coupure glottale (le « uh-oh »)', ex:'so2al = question' },
  { n:'3', ar:'ع', son:'le ‘ayn (voix écrasée)', ex:'3ndi = j\'ai' },
  { n:'5', ar:'خ', son:'kh, la jota espagnole', ex:'5ubz / khubz = pain' },
  { n:'7', ar:'ح', son:'H soufflé chaud', ex:'7ut = poisson' },
  { n:'8', ar:'غ', son:'gh, le R français', ex:'8ali / ghali = cher' },
  { n:'9', ar:'ق', son:'qāf, le K du fond', ex:'9alb = cœur' },
  { n:'6', ar:'ط', son:'T emphatique', ex:'6ariq / Tariq = chemin' }
];

/* ---------- 3. L'ALPHABET (28 lettres) ----------
   l = [nom, isolée, initiale, médiane, finale, son/arabizi, note]
   ⚠ 6 lettres ne s'attachent JAMAIS à la suivante : ا د ذ ر ز و
*/
window.ALPHABET = [
  ['alif','ا','ا','ـا','ـا','a / â','Ne s\'attache jamais à gauche'],
  ['bā’','ب','بـ','ـبـ','ـب','b',''],
  ['tā’','ت','تـ','ـتـ','ـت','t',''],
  ['thā’','ث','ثـ','ـثـ','ـث','th','Souvent prononcé t ou s en darija'],
  ['jīm','ج','جـ','ـجـ','ـج','j','Le j français (g de « gîte »)'],
  ['ḥā’','ح','حـ','ـحـ','ـح','7','Le H soufflé chaud'],
  ['khā’','خ','خـ','ـخـ','ـخ','kh / 5','La jota espagnole'],
  ['dāl','د','د','ـد','ـد','d','Ne s\'attache jamais à gauche'],
  ['dhāl','ذ','ذ','ـذ','ـذ','dh','Ne s\'attache jamais à gauche'],
  ['rā’','ر','ر','ـر','ـر','r','R roulé — ne s\'attache jamais à gauche'],
  ['zāy','ز','ز','ـز','ـز','z','Ne s\'attache jamais à gauche'],
  ['sīn','س','سـ','ـسـ','ـس','s',''],
  ['shīn','ش','شـ','ـشـ','ـش','sh / ch',''],
  ['ṣād','ص','صـ','ـصـ','ـص','S','S emphatique (lourd)'],
  ['ḍād','ض','ضـ','ـضـ','ـض','D','D emphatique — « la langue du ḍād » = l\'arabe'],
  ['ṭā’','ط','طـ','ـطـ','ـط','T / 6','T emphatique'],
  ['ẓā’','ظ','ظـ','ـظـ','ـظ','Z','Z emphatique'],
  ['‘ayn','ع','عـ','ـعـ','ـع','3','LE son de l\'arabe'],
  ['ghayn','غ','غـ','ـغـ','ـغ','gh / 8','Ton R français'],
  ['fā’','ف','فـ','ـفـ','ـف','f',''],
  ['qāf','ق','قـ','ـقـ','ـق','9 / q','K du fond (ou g / coupure selon le dialecte)'],
  ['kāf','ك','كـ','ـكـ','ـك','k',''],
  ['lām','ل','لـ','ـلـ','ـل','l',''],
  ['mīm','م','مـ','ـمـ','ـم','m',''],
  ['nūn','ن','نـ','ـنـ','ـن','n',''],
  ['hā’','ه','هـ','ـهـ','ـه','h','H léger (≠ ح)'],
  ['wāw','و','و','ـو','ـو','w / ou','Ne s\'attache jamais à gauche'],
  ['yā’','ي','يـ','ـيـ','ـي','y / i','']
];

/* ---------- 3bis. LES VERBES (darija MAROCAINE) ----------
   La règle d'or : présent = ka + (n/t/y) + racine.  Pluriel : + u
   v = { fr, base (il a fait — la « forme de base »), ar, p:[je,tu,il,elle,nous,vous,ils] }
*/
window.VERBES_REGLES = [
  { titre:'Le présent : le préfixe <b>ka-</b>',
    cle:'ka + (n / t / y) + racine',
    txt:"C'est LA règle du marocain. Le préfixe change selon la personne, et c'est tout : <b>kan-</b> = je · <b>kat-</b> = tu / elle · <b>kay-</b> = il. Pour le pluriel, on ajoute <b>-u</b> à la fin. Une seule règle et tu conjugues tout." },
  { titre:'La négation : <b>ma … sh</b>',
    cle:'ma + verbe + sh',
    txt:"On <b>encadre</b> le verbe, exactement comme le « ne … pas » français. <i>kanakul</i> (je mange) → <b>ma</b>kanakul<b>sh</b> (je ne mange pas). <i>3ndi</i> (j'ai) → <b>ma</b>3ndi<b>sh</b> (je n'ai pas). Tu connais déjà ce mécanisme." },
  { titre:'Le futur : <b>ghadi</b>',
    cle:'ghadi + verbe SANS le ka-',
    txt:"<b>ghadi</b> (souvent réduit à <i>gha-</i>) + le verbe sans <b>ka</b>. <i>kanmshi</i> (je vais / je pars) → <b>ghadi nmshi</b> (j'irai). C'est notre « je vais aller ». Simple." },
  { titre:'Le passé : les suffixes',
    cle:'racine + t / ti / — / at / na / tu / u',
    txt:"Là, plus de préfixe : on colle la terminaison à la fin. <i>khdem</i> (il a travaillé) → khdem<b>t</b> (j'ai travaillé), khdem<b>ti</b> (tu as travaillé), khedm<b>at</b> (elle a travaillé), khdem<b>na</b> (nous avons travaillé)." }
];
window.VERBES = [
  { fr:'travailler', base:'khdem', ar:'خدم', p:['kankhdem','katkhdem','kaykhdem','katkhdem','kankhedmu','katkhedmu','kaykhedmu'] },
  { fr:'comprendre', base:'fhem', ar:'فهم', p:['kanfhem','katfhem','kayfhem','katfhem','kanfehmu','katfehmu','kayfehmu'] },
  { fr:'savoir', base:'3ref', ar:'عرف', p:['kan3ref','kat3ref','kay3ref','kat3ref','kan3erfu','kat3erfu','kay3erfu'] },
  { fr:'écrire', base:'kteb', ar:'كتب', p:['kankteb','katkteb','kaykteb','katkteb','kanketbu','katketbu','kayketbu'] },
  { fr:'entendre / écouter', base:'sme3', ar:'سمع', p:['kansma3','katsma3','kaysma3','katsma3','kansem3u','katsem3u','kaysem3u'] },
  { fr:'boire', base:'shreb', ar:'شرب', p:['kanshreb','katshreb','kayshreb','katshreb','kanshorbu','katshorbu','kayshorbu'] },
  { fr:'dormir', base:'n3es', ar:'نعس', p:['kan3es','kat3es','kay3es','kat3es','kan3esu','kat3esu','kay3esu'] },
  { fr:'manger', base:'kla', ar:'كلا', p:['kanakul','katakul','kayakul','katakul','kanaklu','kataklu','kayaklu'] },
  { fr:'aller / partir', base:'msha', ar:'مشى', p:['kanmshi','katmshi','kaymshi','katmshi','kanmshiw','katmshiw','kaymshiw'] },
  { fr:'venir', base:'ja', ar:'جا', p:['kanji','katji','kayji','katji','kanjiw','katjiw','kayjiw'] },
  { fr:'dire', base:'gal / qal', ar:'قال', p:['kangul','katgul','kaygul','katgul','kangulu','katgulu','kaygulu'] },
  { fr:'voir / regarder', base:'shaf', ar:'شاف', p:['kanshuf','katshuf','kayshuf','katshuf','kanshufu','katshufu','kayshufu'] },
  { fr:'vouloir / aimer', base:'bgha', ar:'بغى', p:['kanbghi','katbghi','kaybghi','katbghi','kanbghiw','katbghiw','kaybghiw'] },
  { fr:'lire / étudier', base:'qra', ar:'قرا', p:['kanqra','katqra','kayqra','katqra','kanqraw','katqraw','kayqraw'] }
];
window.PERSONNES = ['je (ana)','tu (nta)','il (huwa)','elle (hiya)','nous (7na)','vous (ntuma)','ils (huma)'];

/* ---------- 3bis. MNÉMOTECHNIQUE : squelettes + points ----------
   LE secret de l'alphabet : 28 lettres = ~18 squelettes + des points.
   ب ت ث sont LA MÊME barque — seuls les points changent. Apprendre les
   squelettes divise le travail par deux, les points font le reste. */
window.AFAM = [
  ['bā’','tā’','thā’'], ['jīm','ḥā’','khā’'], ['dāl','dhāl'], ['rā’','zāy'],
  ['sīn','shīn'], ['ṣād','ḍād'], ['ṭā’','ẓā’'], ['‘ayn','ghayn'], ['fā’','qāf']
];
window.MNEMO = {
  'alif':  "Un bâton : la lettre « 1 ». Un trait vertical, rien d'autre — c'est ton A.",
  'bā’':   "🚣 LA BARQUE, un point DESSOUS : le poisson nage sous la Barque = B.",
  'tā’':   "🚣 La même barque, DEUX points DESSUS : deux mouettes atterrissenT dessus = T.",
  'thā’':  "🚣 La barque, TROIS points dessus : THree en anglais = th.",
  'jīm':   "🎣 LE HAMEÇON, un point DEDANS : il a pris quelque chose au ventre — un Jab = J.",
  'ḥā’':   "🎣 Le même hameçon, NU (aucun point) : le H « à nu », soufflé chaud du fond de la gorge.",
  'khā’':  "🎣 L'hameçon, point DESSUS : la poussière qu'on raKHe en crachant la jota.",
  'dāl':   "🚪 Une porte entrouverte : Dāl, comme « door ». Elle ne s'attache jamais à gauche.",
  'dhāl':  "🚪 La même porte + un point : dh — la porte qui grince (« the » anglais).",
  'rā’':   "〰️ Une virgule qui glisse vers le bas : le R Roulé qui déRape.",
  'zāy':   "〰️ La même virgule + un point : le point qui fait Zzz.",
  'sīn':   "🐍 Trois petites dents : le Sss du serpent qui montre les dents.",
  'shīn':  "🐍 Les trois dents + trois points : les points CHuchotent = ch.",
  'ṣād':   "🦢 Un cygne au gros ventre : le S emphatique — lourd, le ventre plein.",
  'ḍād':   "🦢 Le cygne + un point : le D emphatique. « La langue du ḍād » = l'arabe lui-même.",
  'ṭā’':   "🚩 Un drapeau planté sur une colline : le T emphatique, PLANTÉ, massif.",
  'ẓā’':   "🚩 Le drapeau + un point : le Z emphatique.",
  '‘ayn':  "3️⃣ Un 3 écrit à l'envers — c'est POUR ÇA que l'arabizi l'écrit « 3 » ! LE son de l'arabe.",
  'ghayn': "3️⃣ Le même 3 inversé + point dessus : tu te GHargarises (ton R français).",
  'fā’':   "🪁 Un cerf-volant, UN point : F comme le Fil du cerf-volant.",
  'qāf':   "🪁 Le même rond, DEUX points et la queue qui PLONGE : le Q du fond de la gorge — plus profond, comme sa queue (le « 9 » arabizi).",
  'kāf':   "Un K qui s'est allongé : penche la tête, le trait oblique du K latin est dedans.",
  'lām':   "🤠 Un Lasso dressé : L. (Avec alif : لا = « la » = non !)",
  'mīm':   "🐌 Un escargot et sa traînée : M comme Mollusque.",
  'nūn':   "🥣 Une coupe avec UNe perle au-dessus : N comme uNe perle.",
  'hā’':   "💍 Un petit anneau : le H doux, un soupir dans une bague (rien à voir avec ح le soufflé).",
  'wāw':   "Un 9 penché qui dit « OUh » : W. Jamais attaché à gauche.",
  'yā’':   "🦆 Un canard, DEUX points DESSOUS : les deux œufs sous le canard = Y / i."
};

/* ---------- 4. LES MOTS DU SOCLE ----------
   [arabizi, français, script arabe, thème]
   Darija marocaine (la plupart de ces mots passent aussi en Algérie/Tunisie).
*/
window.MOTS = [
  // Salutations & politesse
  ['salam','salut / paix','سلام','Salutations'],
  ['salam 3likum','bonjour (à vous)','سلام عليكم','Salutations'],
  ['sba7 lkhir','bonjour (le matin)','صباح الخير','Salutations'],
  ['msa lkhir','bonsoir','مساء الخير','Salutations'],
  ['labas ?','ça va ?','لاباس','Salutations'],
  ['labas','ça va (bien)','لاباس','Salutations'],
  ['bikhir','bien / en bonne santé','بخير','Salutations'],
  ['l7amdulillah','Dieu merci (= ça va)','الحمد لله','Salutations'],
  ['shukran','merci','شكرا','Salutations'],
  ['bslama','au revoir','بسلامة','Salutations'],
  ['marhba','bienvenue','مرحبا','Salutations'],
  ['smeh li','excuse-moi / pardon','سمح لي','Salutations'],
  ['3afak','s\'il te plaît','عفاك','Salutations'],
  ['inshallah','si Dieu veut (= j\'espère)','إن شاء الله','Salutations'],
  ['mabruk','félicitations','مبروك','Salutations'],

  // Mots-questions
  ['shnu / ash','quoi','شنو','Questions'],
  ['shkun','qui','شكون','Questions'],
  ['fin / win','où','فين','Questions'],
  ['imta / waqtash','quand','إمتى','Questions'],
  ['3lash','pourquoi','علاش','Questions'],
  ['kifash','comment','كيفاش','Questions'],
  ['sh7al','combien','شحال','Questions'],
  ['ana / nta','je / tu','أنا / نتا','Questions'],
  ['w','et','و','Questions'],
  ['walakin','mais','ولكن','Questions'],

  // Réponses & base
  ['ah / iyeh','oui','آه','Base'],
  ['la','non','لا','Base'],
  ['bezzaf','beaucoup / trop','بزاف','Base'],
  ['shwiya','un peu','شوية','Base'],
  ['daba','maintenant','دابا','Base'],
  ['ghedda','demain','غدا','Base'],
  ['lbare7','hier','البارح','Base'],
  ['lyum','aujourd\'hui','اليوم','Base'],
  ['hna','ici','هنا','Base'],
  ['temma','là-bas','تما','Base'],
  ['mzyan','bien / bon','مزيان','Base'],
  ['khayb','mauvais / moche','خايب','Base'],
  ['kbir','grand','كبير','Base'],
  ['sghir','petit','صغير','Base'],
  ['jdid','nouveau','جديد','Base'],
  ['qdim','ancien / vieux','قديم','Base'],
  ['ghali','cher (coûteux)','غالي','Base'],
  ['rkhis','pas cher','رخيص','Base'],
  ['sahel','facile','ساهل','Base'],
  ['s3ib','difficile','صعيب','Base'],

  // Personnes & famille
  ['rajel','homme','راجل','Personnes'],
  ['mra','femme','مرا','Personnes'],
  ['weld','garçon / fils','ولد','Personnes'],
  ['bent','fille','بنت','Personnes'],
  ['sa7bi','mon ami','صاحبي','Personnes'],
  ['baba','papa','بابا','Personnes'],
  ['mama','maman','ماما','Personnes'],
  ['khuya','mon frère','خويا','Personnes'],
  ['khti','ma sœur','ختي','Personnes'],
  ['3a2ila','famille','عائلة','Personnes'],
  ['nas','les gens','ناس','Personnes'],
  ['jar','voisin','جار','Personnes'],

  // Le quotidien
  ['dar','maison','دار','Quotidien'],
  ['bit','chambre / pièce','بيت','Quotidien'],
  ['bab','porte','باب','Quotidien'],
  ['triq','route / chemin','طريق','Quotidien'],
  ['souq','marché','سوق','Quotidien'],
  ['mdina','ville','مدينة','Quotidien'],
  ['blad','pays / bled','بلاد','Quotidien'],
  ['flus','argent','فلوس','Quotidien'],
  ['khedma','travail','خدمة','Quotidien'],
  ['medrasa','école','مدرسة','Quotidien'],
  ['ktab','livre','كتاب','Quotidien'],
  ['telifun','téléphone','تيليفون','Quotidien'],
  ['tomobil','voiture','طوموبيل','Quotidien'],
  ['wqt','temps / heure','وقت','Quotidien'],
  ['nhar','jour','نهار','Quotidien'],
  ['lil','nuit','ليل','Quotidien'],
  ['3am','année','عام','Quotidien'],
  ['shhar','mois','شهر','Quotidien'],

  // Manger & boire
  ['makla','nourriture','ماكلة','Manger'],
  ['khubz','pain','خبز','Manger'],
  ['ma','eau','ما','Manger'],
  ['atay','thé','أتاي','Manger'],
  ['qahwa','café','قهوة','Manger'],
  ['7lib','lait','حليب','Manger'],
  ['l7am','viande','لحم','Manger'],
  ['7ut','poisson','حوت','Manger'],
  ['bid','œufs','بيض','Manger'],
  ['jben','fromage','جبن','Manger'],
  ['tmr','dattes','تمر','Manger'],
  ['zit','huile','زيت','Manger'],
  ['mel7','sel','ملح','Manger'],
  ['sukkar','sucre','سكر','Manger'],
  ['ldid','délicieux','لذيذ','Manger'],

  // Le corps & l'état
  ['ras','tête','راس','Corps'],
  ['3in','œil','عين','Corps'],
  ['yedd','main','يد','Corps'],
  ['rjel','pied / jambe','رجل','Corps'],
  ['qalb','cœur','قلب','Corps'],
  ['fumm','bouche','فم','Corps'],
  ['mrid','malade','مريض','Corps'],
  ['3yyan','fatigué','عيان','Corps'],
  ['fer7an','content','فرحان','Corps'],
  ['jou3an','affamé','جوعان','Corps'],
  ['3atshan','assoiffé','عطشان','Corps'],

  // Les nombres
  ['wa7ed','un','واحد','Nombres'],
  ['jouj / tnin','deux','جوج','Nombres'],
  ['tlata','trois','ثلاثة','Nombres'],
  ['reb3a','quatre','أربعة','Nombres'],
  ['khamsa','cinq','خمسة','Nombres'],
  ['setta','six','ستة','Nombres'],
  ['seb3a','sept','سبعة','Nombres'],
  ['tmnya','huit','ثمنية','Nombres'],
  ['ts3ud / ts3a','neuf','تسعة','Nombres'],
  ['3achra','dix','عشرة','Nombres'],
  ['3echrin','vingt','عشرين','Nombres'],
  ['mya','cent','مية','Nombres'],
  ['alf','mille','ألف','Nombres'],

  // Phrases de survie
  ['ana ma fhemtsh','je n\'ai pas compris','أنا ما فهمتش','Phrases'],
  ['3awed 3afak','répète s\'il te plaît','عاود عفاك','Phrases'],
  ['bshwiya 3afak','plus lentement s\'il te plaît','بشوية عفاك','Phrases'],
  ['kifash tgul... ?','comment on dit… ?','كيفاش تقول','Phrases'],
  ['ashnu m3natha ?','ça veut dire quoi ?','أشنو معناها','Phrases'],
  ['ana kant3allem','j\'apprends','أنا كنتعلم','Phrases'],
  ['3ndi','j\'ai','عندي','Phrases'],
  ['ma3ndish','je n\'ai pas','ما عنديش','Phrases'],
  ['bghit','je veux','بغيت','Phrases'],
  ['ma bghitsh','je ne veux pas','ما بغيتش','Phrases'],
  ['3reft','je sais','عرفت','Phrases'],
  ['ma3reftsh','je ne sais pas','ما عرفتش','Phrases'],
  ['shhal thmen ?','combien ça coûte ?','شحال ثمن','Phrases'],
  ['fin kayn... ?','où est… ?','فين كاين','Phrases'],
  ['smiti...','je m\'appelle…','سميتي','Phrases'],
  ['ana men fransa','je viens de France','أنا من فرنسا','Phrases']
];

/* ============================================================
   5. LE PARCOURS — la colonne vertébrale (Mois 1)
   On n'apprend plus des modules isolés : on suit un chemin.
   Un jour = une séance courte. Principe : PARLER tout de suite
   (des blocs de phrases), l'alphabet en fond (10 min/j max),
   les sons en douceur. Contenu 100 % darija marocaine.
   ============================================================ */

/* ---------- 5a. LES BLOCS — des MOULES + des EXPRESSIONS ----------
   On ne mémorise pas « bghit = vouloir ». On apprend le moule
   « bghit ___ » et on fabrique 10 phrases avec.
   moule : { id, kind:'moule', t, stem:{az,ar,fr}, note, slots:[{fr,full:{az,ar}}], neg:{fr,az,ar} }
   expr  : { id, kind:'expr',  t, note, items:[{az,ar,fr}] }
*/
window.BLOCS = [
  {
    id:'bghit', kind:'moule', t:'bghit ___ — je veux ___',
    stem:{ az:'bghit', ar:'بغيت', fr:'je veux' },
    note:"Tu gardes le début, tu changes la fin — et tu parles. (Attention : avec <b>ka-</b>, <i>kanbghi</i> veut dire « j'aime ».)",
    slots:[
      { fr:'je veux un café',          full:{ az:'bghit qahwa',       ar:'بغيت قهوة' } },
      { fr:'je veux un thé',           full:{ az:'bghit atay',        ar:'بغيت أتاي' } },
      { fr:'je veux du pain',          full:{ az:'bghit khubz',       ar:'بغيت خبز'  } },
      { fr:'je veux manger',           full:{ az:'bghit nakul',       ar:'بغيت ناكل' } },
      { fr:'je veux partir / y aller', full:{ az:'bghit nemshi',      ar:'بغيت نمشي' } },
      { fr:'je veux dormir',           full:{ az:'bghit n3es',        ar:'بغيت نعس'  } },
      { fr:'je veux boire un thé',     full:{ az:'bghit nshreb atay', ar:'بغيت نشرب أتاي' } }
    ],
    neg:{ fr:'je ne veux pas', az:'ma bghitsh', ar:'ما بغيتش' }
  },
  {
    id:'3ndi', kind:'moule', t:'3ndi ___ — j\'ai ___',
    stem:{ az:'3ndi', ar:'عندي', fr:'j\'ai' },
    note:"Négation : on <b>encadre</b>, comme « ne … pas ». <i>3ndi</i> → <b>ma</b> 3ndi<b>sh</b> = je n'ai pas.",
    slots:[
      { fr:'j\'ai le temps',     full:{ az:'3ndi lwqt',   ar:'عندي الوقت' } },
      { fr:'j\'ai de l\'argent', full:{ az:'3ndi flus',   ar:'عندي فلوس'  } },
      { fr:'j\'ai du travail',   full:{ az:'3ndi khedma', ar:'عندي خدمة'  } },
      { fr:'j\'ai une question', full:{ az:'3ndi su2al',  ar:'عندي سؤال'  } },
      { fr:'j\'ai un ami',       full:{ az:'3ndi sa7bi',  ar:'عندي صاحبي' } }
    ],
    neg:{ fr:'je n\'ai pas d\'argent', az:'ma 3ndish flus', ar:'ما عنديش فلوس' }
  },

  {
    id:'bonjour', kind:'expr', t:'Dire bonjour',
    note:'Les premiers mots que tes potes attendent de toi.',
    items:[
      { az:'salam',        ar:'سلام',       fr:'salut / bonjour' },
      { az:'salam 3likum', ar:'سلام عليكم', fr:'bonjour (à vous)' },
      { az:'sba7 lkhir',   ar:'صباح الخير', fr:'bonjour (le matin)' },
      { az:'msa lkhir',    ar:'مساء الخير', fr:'bonsoir' }
    ]
  },
  {
    id:'cava', kind:'expr', t:'Demander « ça va ? »',
    note:'kif <b>dayr</b> à un homme, kif <b>dayra</b> à une femme — l\'accord se sent tout de suite.',
    items:[
      { az:'labas ?',              ar:'لاباس؟',        fr:'ça va ?' },
      { az:'labas',                ar:'لاباس',         fr:'ça va (bien)' },
      { az:'kif dayr ?',           ar:'كيف داير؟',     fr:'comment vas-tu ? (à un homme)' },
      { az:'kif dayra ?',          ar:'كيف دايرة؟',    fr:'comment vas-tu ? (à une femme)' },
      { az:'bikhir, l7amdulillah', ar:'بخير الحمد لله',fr:'bien, Dieu merci' }
    ]
  },
  {
    id:'moi', kind:'expr', t:'Parler de toi',
    note:'De quoi te présenter en dix secondes.',
    items:[
      { az:'ana...',         ar:'أنا',          fr:'moi… / je suis…' },
      { az:'smiti...',       ar:'سميتي',        fr:'je m\'appelle…' },
      { az:'ana men fransa', ar:'أنا من فرنسا', fr:'je viens de France' },
      { az:'nta',            ar:'نتا',          fr:'toi (à un homme)' },
      { az:'nti',            ar:'نتي',          fr:'toi (à une femme)' }
    ]
  },
  {
    id:'questions', kind:'expr', t:'Les mots-questions',
    note:'Sept mots qui ouvrent presque toutes les phrases.',
    items:[
      { az:'shnu / ash', ar:'شنو',   fr:'quoi' },
      { az:'fin',        ar:'فين',   fr:'où' },
      { az:'kifash',     ar:'كيفاش', fr:'comment' },
      { az:'3lash',      ar:'علاش',  fr:'pourquoi' },
      { az:'shkun',      ar:'شكون',  fr:'qui' },
      { az:'imta',       ar:'إمتى',  fr:'quand' },
      { az:'sh7al',      ar:'شحال',  fr:'combien' }
    ]
  },
  {
    id:'base', kind:'expr', t:'Oui, non, merci',
    note:'Le minimum vital de la politesse.',
    items:[
      { az:'ah / iyeh', ar:'آه',    fr:'oui' },
      { az:'la',        ar:'لا',    fr:'non' },
      { az:'wakha',     ar:'واخا',  fr:'d\'accord / OK' },
      { az:'shukran',   ar:'شكرا',  fr:'merci' },
      { az:'3afak',     ar:'عفاك',  fr:'s\'il te plaît' },
      { az:'smeh li',   ar:'سمح لي',fr:'pardon / excuse-moi' },
      { az:'bslama',    ar:'بسلامة',fr:'au revoir' }
    ]
  },
  {
    id:'debrouille', kind:'expr', t:'Se débrouiller en conversation',
    note:'Quand tu es largué : ces phrases te sauvent et font ralentir l\'autre.',
    items:[
      { az:'kan3ref',        ar:'كنعرف',      fr:'je sais' },
      { az:'ma kan3refsh',   ar:'ما كنعرفش',  fr:'je ne sais pas' },
      { az:'ma fhemtsh',     ar:'ما فهمتش',   fr:'je n\'ai pas compris' },
      { az:'3awed 3afak',    ar:'عاود عفاك',  fr:'répète s\'il te plaît' },
      { az:'bshwiya 3afak',  ar:'بشوية عفاك', fr:'plus lentement s\'il te plaît' },
      { az:'ana kant3allem', ar:'أنا كنتعلم', fr:'j\'apprends (le darija)' }
    ]
  }
];

/* ---------- 5b. LE PARCOURS : Mois 1, Semaine 1 détaillée ----------
   activités : {type:'expr'|'moule', id} · {type:'son', i} ·
   {type:'alpha'|'alphaquiz', letters:[index ALPHABET]} · {type:'mots'} · {type:'bilan'}
   Alphabet en fond, ses deux groupes :  G1 ا ب ت ث ن ي · G2 د ذ ر ز و
*/
window.PARCOURS = {
  mois:'Mois 1', titre:'Je commence à parler',
  semaines:[
    { n:1, titre:'Sons + phrases ultra-utiles',        jours:[1,2,3,4,5,6,7] },
    { n:2, titre:'La vie de tous les jours',           locked:true },
    { n:3, titre:'Le passé et le futur, version simple',locked:true },
    { n:4, titre:'Tenir une vraie petite conversation', locked:true }
  ],
  jours:[
    { n:1, titre:'Bonjour !', sub:'Saluer, dire oui/non/merci — et ton tout premier son.',
      activities:[
        { type:'expr',  id:'bonjour',   t:'Dire bonjour', min:3 },
        { type:'expr',  id:'base',      t:'Oui, non, merci', min:3 },
        { type:'son',   i:0,            t:'Le son خ (kh) — tu l\'as déjà', min:4 },
        { type:'alpha', letters:[0,1],  t:'Lettres du jour : ا ب', min:8 }
      ] },
    { n:2, titre:'Comment ça va ?', sub:'Demander des nouvelles — et ta première phrase à toi.',
      activities:[
        { type:'expr',  id:'cava',      t:'« Ça va ? »', min:3 },
        { type:'moule', id:'bghit',     t:'Fabriquer : je veux…', min:6 },
        { type:'son',   i:1,            t:'Le son غ (gh) — ton R français', min:4 },
        { type:'alpha', letters:[2,3],  t:'Lettres du jour : ت ث', min:8 },
        { type:'mots',                  t:'Réviser les mots', min:5 }
      ] },
    { n:3, titre:'Je veux…', sub:'Tu construis des phrases, tu poses des questions.',
      activities:[
        { type:'moule', id:'bghit',     t:'Je veux… (+ « je ne veux pas »)', min:6 },
        { type:'expr',  id:'questions', t:'Les mots-questions', min:4 },
        { type:'son',   i:2,            t:'Le son ح (7) — le H chaud', min:4 },
        { type:'alpha', letters:[24,27],t:'Lettres du jour : ن ي', min:8 },
        { type:'mots',                  t:'Réviser les mots', min:5 }
      ] },
    { n:4, titre:'Moi, je m\'appelle…', sub:'Te présenter, dire ce que tu as.',
      activities:[
        { type:'expr',  id:'moi',       t:'Parler de toi', min:4 },
        { type:'moule', id:'3ndi',      t:'Fabriquer : j\'ai…', min:6 },
        { type:'son',   i:3,            t:'Le son ع (3) — le boss', min:5 },
        { type:'alpha', letters:[7,8],  t:'Lettres du jour : د ذ', min:8 },
        { type:'mots',                  t:'Réviser les mots', min:5 }
      ] },
    { n:5, titre:'J\'ai / je n\'ai pas', sub:'Tu encadres le verbe avec « ma … sh ».',
      activities:[
        { type:'moule', id:'3ndi',      t:'J\'ai… (+ « je n\'ai pas »)', min:6 },
        { type:'expr',  id:'debrouille',t:'Se débrouiller', min:4 },
        { type:'son',   i:4,            t:'Le son ق (9/q) — le K du fond', min:5 },
        { type:'alpha', letters:[9,10], t:'Lettres du jour : ر ز', min:8 },
        { type:'mots',                  t:'Réviser les mots', min:5 }
      ] },
    { n:6, titre:'Se débrouiller', sub:'Tu recombines tout ce que tu sais déjà.',
      activities:[
        { type:'expr',  id:'debrouille',t:'Se débrouiller', min:4 },
        { type:'moule', id:'bghit',     t:'Je veux…', min:5 },
        { type:'moule', id:'3ndi',      t:'J\'ai…', min:5 },
        { type:'son',   i:5,            t:'Le son ص (S) — le S lourd', min:5 },
        { type:'alpha', letters:[26],   t:'Lettre du jour : و', min:6 }
      ] },
    { n:7, titre:'Bilan — tu tiens 2 minutes', sub:'On assemble : saluer → te présenter → dire ce que tu veux.',
      activities:[
        { type:'son',      i:6,         t:'Le son ط (T) — le T lourd', min:5 },
        { type:'alphaquiz',letters:[0,1,2,3,24,27,7,8,9,10,26], t:'Quiz : les 11 lettres de la semaine', min:6 },
        { type:'mots',                  t:'Grande révision', min:8 },
        { type:'bilan',                 t:'Bilan de la Semaine 1', min:5 }
      ] }
  ]
};
