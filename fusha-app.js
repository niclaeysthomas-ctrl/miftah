/* ============================================================
   MIFTAH — moteur du module FUṢḤÁ (l'arabe classique)
   Salles : Comprendre · Sons perdus · Le Pont · L'i3rab ·
            La machine (racine/schème) · Parler pur · La route
   Store dédié : S.fus  (rien ne touche au parcours darija)
   ============================================================ */

function FS(){
  if(!S.fus) S.fus={};
  const f=S.fus;
  f.lu=f.lu||{}; f.pont=f.pont||{}; f.chap=f.chap||{}; f.sons=f.sons||{}; f.sarf=f.sarf||{}; f.dit=f.dit||{};
  return f;
}

/* ---- bidi : isole chaque mot arabe inséré dans une phrase française ----
   Sans ça, « البَيْتُ كَبيرٌ → كانَ … » s'affiche à l'envers : la flèche et la
   ponctuation neutres se font absorber par le sens droite-à-gauche.        */
const AR_RUN=/[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]+(?:[ \u00A0]+[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]+)*/g;
function bidi(s){ return typeof s==='string' ? s.replace(AR_RUN, m=>'<bdi>'+m+'</bdi>') : s; }
(function isolerArabe(){
  const F=window.FUSHA; if(!F||F._bidi) return; F._bidi=true;
  F.lecons.forEach(l=>{ l.html=bidi(l.html); });
  F.sons.forEach(s=>{ s.comment=bidi(s.comment); s.piege=bidi(s.piege); });
  F.regles_pont.forEach(r=>{ r.x=bidi(r.x); r.t=bidi(r.t); });
  F.ponts.forEach(g=>{ g.note=bidi(g.note); g.paires.forEach(p=>{ if(p.n) p.n=bidi(p.n); }); });
  F.i3rab.forEach(c=>{ c.html=bidi(c.html);
    c.ex.forEach(e=>{ if(e.n) e.n=bidi(e.n); });
    c.quiz.forEach(q=>{ q.expl=bidi(q.expl); q.q=bidi(q.q); }); });
  F.sarf.intro=bidi(F.sarf.intro);
  F.sarf.formes.forEach(f=>{ f.sens=bidi(f.sens); });
  F.sarf.schemes.forEach(x=>{ x.sens=bidi(x.sens); x.cle=bidi(x.cle); });
  F.sarf.lexique.forEach(m=>{ m.x=bidi(m.x); });
  F.phrases.forEach(g=>{ g.note=bidi(g.note); g.items.forEach(i=>{ if(i.n) i.n=bidi(i.n); }); });
  F.route.forEach(r=>{ r.x=bidi(r.x); });
})();

/* ---- toutes les paires du Pont, à plat, avec une clé stable ---- */
const PONT_ALL=(function(){ const o=[];
  FUSHA.ponts.forEach(g=>g.paires.forEach((p,i)=>{ const q={key:g.id+':'+i, gid:g.id, gt:g.t}; for(const k in p) q[k]=p[k]; o.push(q); }));
  return o; })();
function pontByKey(k){ return PONT_ALL.find(p=>p.key===k); }
function pontKnown(){ return Object.keys(FS().pont).length; }
function pontDue(){ const t=todayStr(), out=[]; const st=FS().pont; for(const k in st) if(st[k].due<=t && pontByKey(k)) out.push(k); return out; }
function ratePont(key,q){ // 0 = à revoir · 2 = je l'ai
  const st=FS().pont; let c=st[key];
  if(!c) c=(st[key]={ef:2.5,ivl:0,reps:0,due:todayStr()});
  const ad=n=>new Date(Date.now()+n*864e5).toISOString().slice(0,10);
  if(q===0){ c.reps=0; c.ivl=0; c.ef=Math.max(1.3,c.ef-0.2); c.due=ad(1); }
  else { c.reps++; c.ivl=c.reps===1?1:c.reps===2?3:Math.round((c.ivl||1)*c.ef); c.due=ad(c.ivl); }
  save();
}
function chapPassed(){ const c=FS().chap; return FUSHA.i3rab.filter(x=>(c[x.id]||0)>=80).length; }
function lecturesLues(){ const l=FS().lu; return FUSHA.lecons.filter(x=>l[x.id]).length; }

/* ---- note honnête sur l'audio : ici, la synthèse dit vrai ---- */
const FUS_TTS = `<div class="sub mt">🔊 Ici la voix de synthèse est une <b style="color:var(--blue)">référence légitime</b> : toutes les voix arabes lisent le fuṣḥā. Deux réserves — elle lit souvent en <i>waqf</i> (elle avale la finale casuelle) et son rythme est plat.</div>`;

/* ================= MOTEUR DE QUIZ GÉNÉRIQUE ================= */
/* item = { q, ar, sub, opts:[], correct, expl, say, arOpts } */
const QMSG={
  'sons':"Ta bouche prend le pli — c'est un travail musculaire, pas un travail de mémoire. Répète à voix haute.",
  'iʿrāb':"L'i3rab ne se comprend pas une fois : il se réflexe. Refais-le jusqu'à ne plus hésiter.",
  'formes':"La machine tourne. Chaque forme apprise te donne des dizaines de verbes d'avance.",
  'schèmes':"Tu commences à lire le moule avant le mot. C'est exactement ce que fait un arabophone lettré.",
  'pluriels':"Apprends toujours le pluriel AVEC le singulier — en arabe, c'est un couple, pas une variante.",
  'le pont':"Ces mots-là, tu les avais déjà. Tu viens de les faire passer de l'autre côté.",
  'phrases':"Maintenant redis-les à voix haute avec les finales. C'est là que ça devient de l'arabe pur.",
  'def':"Reviens-y demain : c'est l'espacement qui grave, pas la durée."
};
let Q=null;
function runQuiz(o){
  Q={t:o.t, items:o.items, k:0, correct:0, answered:false, xp:o.xp||15, done:o.done, again:o.again, back:o.back||'fusha', tag:o.tag||''};
  window.scrollTo(0,0); renderQ();
}
function renderQ(){
  if(Q.k>=Q.items.length) return finishQ();
  const it=Q.items[Q.k]; Q.answered=false;
  app.innerHTML=`
    <div class="qmeta"><span>${Q.t}</span><span>${Q.k+1}/${Q.items.length}</span></div>
    <div class="pbar mb"><i style="width:${Q.k/Q.items.length*100}%"></i></div>
    ${it.q?`<div class="center" style="font-size:16px;font-weight:700;margin:8px 0 2px">${it.q}</div>`:''}
    ${it.ar?`<div class="fqbig ar">${it.ar}</div>`:''}
    ${it.sub?`<div class="center sub mb">${it.sub}</div>`:''}
    <div id="opts">${it.opts.map((o,k)=>`<button class="opt" style="text-align:center" onclick="answerQ(${k})">${it.arOpts?`<span class="ar" style="font-size:23px">${o}</span>`:o}</button>`).join('')}</div>
    <div id="after"></div>
    <div class="mt"><button class="btn ghost" onclick="quitQ()">Quitter</button></div>`;
}
function answerQ(k){
  if(Q.answered) return; Q.answered=true;
  const it=Q.items[Q.k], ok=k===it.correct;
  document.querySelectorAll('#opts .opt').forEach((b,i)=>{ b.setAttribute('disabled',''); if(i===it.correct)b.classList.add('good'); else if(i===k)b.classList.add('bad'); else b.classList.add('dim'); });
  if(ok) Q.correct++;
  if(it.say) speak(it.say);
  const last=Q.k===Q.items.length-1;
  document.getElementById('after').innerHTML=`
    <div class="expl ${ok?'':'warn'}">${ok?'✅ ':'❌ '}${it.expl||''}</div>
    ${it.say?`<div class="center"><button class="spk" onclick="speak('${it.say}')">🔊</button></div>`:''}
    <button class="btn mt" onclick="${last?'finishQ()':'nextQ()'}">${last?'Résultat':'Suivant'}</button>`;
}
function nextQ(){ Q.k++; renderQ(); }
function quitQ(){ Q=null; setView('fusha'); }
function finishQ(){
  const n=Q.items.length, pct=n?Math.round(Q.correct/n*100):0, pass=pct>=70;
  if(pass) addXp(Q.xp);
  if(Q.done) Q.done(pct);
  const again=Q.again||'', tag=Q.tag;
  app.innerHTML=`
    <div class="card big"><div class="em">${pass?'⚜️':'📐'}</div>
      <div class="score" style="color:${pass?'var(--good)':'var(--accent)'}">${pct}%</div>
      <div class="lab">${Q.correct}/${n} · ${tag}</div>
      <div class="mt sub">${pass?`+${Q.xp} XP. ${QMSG[tag]||QMSG.def}`:'Moins de 70 % : relis la fiche au-dessus, puis reviens. Ici, comprendre la règle vaut mieux que retenir la réponse.'}</div>
    </div>
    ${again?`<button class="btn" onclick="${again}">Refaire</button>`:''}
    <button class="btn ghost mt" onclick="setView('fusha')">← Retour au fuṣḥā</button>`;
  Q=null;
}
function shuffle(a){ return a.slice().sort(()=>Math.random()-.5); }
function pickWrong(pool,val,n){ return shuffle(pool.filter(x=>x!==val)).slice(0,n); }

/* ================= LE HUB ================= */
function renderFusha(){
  const f=FS(), due=pontDue().length, lus=lecturesLues(), chaps=chapPassed(), su=Object.keys(f.sons).length;
  const next=fusNext(due,lus,chaps);
  app.innerHTML=`
    <div class="card fcard">
      <div class="center ar" style="font-size:34px;line-height:1.6">الفُصْحى</div>
      <h2 class="center" style="color:var(--blue)">L'arabe le plus pur</h2>
      <div class="sub mt">Le fuṣḥā (« la plus éloquente ») est la langue de l'écrit, du JT, du discours et du Coran — du Maroc à Oman. <b style="color:var(--txt)">Personne ne l'a comme langue maternelle</b> : tout le monde l'apprend. Sur ce terrain-là, tu n'es pas en retard sur tes potes.</div>
      <div class="expl mt fus">La darija reste ton avantage (tes potes te répondent). Le fuṣḥā, lui, t'ouvre <b>l'écrit, la structure et 15 siècles de textes</b>. On le travaille <b>à côté</b>, 10 min/jour — pas à la place.</div>
    </div>

    <div class="card">
      <h2 style="font-size:15px">🎯 10 minutes aujourd'hui</h2>
      <div class="sub">${next.why}</div>
      <button class="btn mt" onclick="${next.go}">${next.label}</button>
    </div>

    <div class="row2 mb">
      <div class="chip center" style="padding:9px">📜 <b>${lus}</b>/${FUSHA.lecons.length} <span class="k">fiches lues</span></div>
      <div class="chip center" style="padding:9px">⚜️ <b>${chaps}</b>/${FUSHA.i3rab.length} <span class="k">chapitres validés</span></div>
      <div class="chip center" style="padding:9px">🗝️ <b>${pontKnown()}</b>/${PONT_ALL.length} <span class="k">paires du pont</span></div>
      <div class="chip center" style="padding:9px">🔁 <b>${due}</b> <span class="k">à réviser</span></div>
    </div>

    ${fusTile('🏛️','Comprendre','Ce que c\'est, où ça se parle, ce que « pur » veut dire',lus+'/'+FUSHA.lecons.length,'fLecons()')}
    ${fusTile('🔊','Les sons perdus','ث ذ ظ ق ء + les voyelles brèves que la darija a effacées',su+'/'+FUSHA.sons.length,'fSons()')}
    ${fusTile('🗝️','Le Pont darija → fuṣḥā','Tes 130 mots de darija, transposés — avec la règle',pontKnown()+'/'+PONT_ALL.length,'fPont()')}
    ${fusTile('⚜️','L\'iʿrāb','Les désinences de cas : LE marqueur de l\'arabe pur',chaps+'/'+FUSHA.i3rab.length,'fI3rab()')}
    ${fusTile('⚙️','La machine','Racine + schème : le vocabulaire devient un calcul','10 formes','fSarf()')}
    ${fusTile('💬','Parler pur','53 phrases entièrement vocalisées, avec l\'i3rab',FUSHA.phrases.length+' blocs','fParler()')}
    ${fusTile('🧭','La route','Les 4 paliers, les manuels, le dictionnaire par racines','6 fiches','fRoute()')}
    ${audioWarn()}
    ${FUS_TTS}`;
}
function fusTile(ic,t,d,badge,go){
  return `<button class="tile" onclick="${go}">
    <div class="ic" style="background:linear-gradient(135deg,#5b9bd526,#5b9bd50d);color:var(--blue)">${ic}</div>
    <div class="body"><div class="t">${t}</div><div class="d">${d}</div></div>
    <div class="badge zero">${badge}</div></button>`;
}
function fusNext(due,lus,chaps){
  const f=FS();
  const lec=FUSHA.lecons.find(x=>!f.lu[x.id]);
  if(lec) return {label:'📜 Lire : '+lec.t, why:'Commence par le cadrage — sans lui, tu apprendrais des règles sans savoir à quoi elles servent.', go:`openFLecon('${lec.id}')`};
  if(due>0) return {label:'🔁 Réviser '+due+' paire(s)', why:'Le rappel espacé est dû aujourd\'hui. C\'est ce qui fait rester le vocabulaire.', go:'startPontRev()'};
  const ch=FUSHA.i3rab.find(x=>(f.chap[x.id]||0)<80);
  if(ch) return {label:'⚜️ Chapitre '+ch.ic+' — '+ch.t, why:'Le cœur du module : c\'est l\'i3rab qui fait la différence entre un arabe correct et un arabe pur.', go:`openChap('${ch.id}')`};
  const son=FUSHA.sons.find(s=>!f.sons[s.ar]);
  if(son) return {label:'🔊 Le son '+son.ar+' — '+son.t, why:'La grammaire est en place ; il reste la bouche.', go:`openFSon('${son.ar}')`};
  const grp=FUSHA.phrases[Math.floor(Math.random()*FUSHA.phrases.length)];
  return {label:'💬 '+grp.ic+' '+grp.t, why:'Tout est révisé. Il ne reste qu\'à parler — à voix haute, avec les finales.', go:`startFPhrase('${grp.id}')`};
}

/* ================= MOTEUR DE PAQUET (découverte / révision) ================= */
/* cards = [{front, sub, ar, tr, note, key}] ; rate(key,q) optionnel */
let DK=null;
function startDeck(o){ DK={t:o.t, cards:o.cards.slice(), i:0, shown:false, rate:o.rate, onEnd:o.onEnd, again:0}; window.scrollTo(0,0); renderDK(); }
function renderDK(){
  if(!DK) return;
  if(DK.i>=DK.cards.length){ const end=DK.onEnd; DK=null; return end&&end(); }
  const c=DK.cards[DK.i]; DK.shown=false;
  app.innerHTML=`
    <div class="qmeta"><span>${DK.t}</span><span>${DK.i+1}/${DK.cards.length}</span></div>
    <div class="flash" onclick="dkFlip()">
      <div class="theme">Comment dit-on ça en fuṣḥā ?</div>
      <div class="front">${c.front}</div>
      ${c.sub?`<div class="sub mt">${c.sub}</div>`:''}
      <div id="dkback" class="hidden">
        <div class="arw ar" style="font-size:33px;margin-top:14px;line-height:1.9">${c.ar}</div>
        <div class="back" style="color:var(--blue);font-size:18px">${c.tr}</div>
      </div>
      <div id="dkhint" class="tap">Dis-le à voix haute · touche pour vérifier</div>
    </div>
    <div id="dkafter"></div>
    <div class="mt"><button class="btn ghost" onclick="setView('fusha')">Quitter</button></div>`;
}
function dkFlip(){
  if(!DK||DK.shown) return; DK.shown=true;
  const c=DK.cards[DK.i];
  document.getElementById('dkback').classList.remove('hidden');
  document.getElementById('dkhint').classList.add('hidden');
  speak(c.ar);
  document.getElementById('dkafter').innerHTML=`
    ${c.note?`<div class="expl">${c.note}</div>`:''}
    <div class="center"><button class="spk" onclick="speak('${c.ar}')">🔊</button></div>
    <div class="srsrow" style="grid-template-columns:1fr 1fr"><button class="again" onclick="dkRate(0)">À revoir</button><button class="easy" onclick="dkRate(2)">Je l'ai ✓</button></div>`;
}
function dkRate(q){
  if(!DK||DK.i>=DK.cards.length) return;
  const c=DK.cards[DK.i];
  if(DK.rate && c.key) DK.rate(c.key,q);
  if(q===0){ DK.again++; if(DK.cards.length<40) DK.cards.push(c); }
  DK.i++; renderDK();
}

/* ================= 🏛️ SALLE 1 — COMPRENDRE ================= */
function fLecons(){
  const f=FS();
  app.innerHTML=`
    <div class="card fcard"><h2>🏛️ Comprendre</h2>
      <div class="sub mt">Neuf fiches de cadrage. Lis-les dans l'ordre : elles répondent à « qu'est-ce que je demande exactement, et jusqu'où ça va ».</div></div>
    ${FUSHA.lecons.map(l=>`<button class="tile" onclick="openFLecon('${l.id}')">
      <div class="ic" style="background:linear-gradient(135deg,#5b9bd526,#5b9bd50d);color:var(--blue)">${l.ic}</div>
      <div class="body"><div class="t">${l.t}</div><div class="d">${l.sub}</div></div>
      <div class="badge ${f.lu[l.id]?'':'zero'}">${f.lu[l.id]?'✓':'—'}</div></button>`).join('')}
    <button class="btn ghost mt" onclick="setView('fusha')">← Retour</button>`;
}
function openFLecon(id){
  const i=FUSHA.lecons.findIndex(l=>l.id===id), l=FUSHA.lecons[i], f=FS();
  const nxt=FUSHA.lecons[i+1];
  window.scrollTo(0,0);
  app.innerHTML=`
    <div class="qmeta"><span>🏛️ Comprendre</span><span>${i+1}/${FUSHA.lecons.length}</span></div>
    <div class="card fcard">
      <div class="center" style="font-size:38px">${l.ic}</div>
      <h2 class="center">${l.t}</h2>
      <div class="sub center">${l.sub}</div>
      <div class="mt" style="font-size:14.5px;line-height:1.6">${l.html}</div>
    </div>
    <button class="btn" onclick="lireLecon('${l.id}'${nxt?`,'${nxt.id}'`:''})">${f.lu[l.id]?(nxt?'Fiche suivante →':'Terminé'):'✅ Lu'+(nxt?' — fiche suivante →':' (+5 XP)')}</button>
    <button class="btn ghost mt" onclick="fLecons()">← Les fiches</button>`;
}
function lireLecon(id,nxt){
  const f=FS();
  if(!f.lu[id]){ f.lu[id]=true; save(); addXp(5); toast('📜 +5 XP'); }
  if(nxt) openFLecon(nxt); else fLecons();
}

/* ================= 🔊 SALLE 2 — LES SONS PERDUS ================= */
const SON_CONF={'ث':['ت','س'],'ذ':['د','ز'],'ظ':['ض','ز'],'ق':['ك','غ'],'ء':['ع','ه']};
function fSons(){
  const f=FS();
  app.innerHTML=`
    <div class="card fcard"><h2>🔊 Les sons que la darija a perdus</h2>
      <div class="sub mt">Ta bouche marocaine a pris des habitudes : elle fond ث dans t, ذ dans d, ظ dans ض, et écrase les voyelles brèves. En fuṣḥā, <b style="color:var(--txt)">tout ressort</b>. C'est le curseur n°2 de la pureté.</div></div>
    ${FUSHA.sons.map(s=>`<button class="sonrow" onclick="openFSon('${s.ar}')">
      <div class="glyph ar" style="color:var(--blue)">${s.ar}</div>
      <div class="info"><div class="nm">${s.nom} <span class="sub">· ${s.tr}</span></div><div class="sm">${s.t}</div></div>
      <div class="pal ${f.sons[s.ar]?'on':''}">${f.sons[s.ar]?'✓':'—'}</div></button>`).join('')}
    <button class="btn mt" onclick="startSonDrill()">🎧 Drill : ne plus retomber en darija</button>
    <button class="btn ghost mt" onclick="setView('fusha')">← Retour</button>
    ${audioWarn()}`;
}
function openFSon(ar){
  const s=FUSHA.sons.find(x=>x.ar===ar); window.scrollTo(0,0);
  app.innerHTML=`
    <div class="qmeta"><span>🔊 ${s.nom}</span><span>${s.tr}</span></div>
    <div class="card fcard">
      <div class="glyphbig ar" style="color:var(--blue)">${s.ar}</div>
      <h2 class="center">${s.t}</h2>
      <div class="expl mt">${s.comment}</div>
      <div class="expl warn mt"><b>Le réflexe marocain à casser :</b> ${s.piege}</div>
    </div>
    <div class="card"><h2 style="font-size:14px">Le même mot, deux prononciations</h2>
      <div class="sub mb">À gauche ce que dirait ta darija, à droite le fuṣḥā. Écoute, puis répète en exagérant.</div>
      ${s.contraste.map(c=>`<div class="fbridge">
        <div class="dz">${c.d}<div class="sub" style="font-size:11px">${c.fr}</div></div>
        <div class="center" style="color:var(--blue);font-weight:900">→</div>
        <div><div class="fz ar">${c.ar}</div><div class="ft" style="color:var(--blue);font-weight:800;font-size:13px">${c.tr}</div></div>
        <div style="grid-column:1/-1;text-align:center"><button class="spk sm" onclick="speak('${c.ar}')">🔊</button></div>
      </div>`).join('')}
    </div>
    <button class="btn" onclick="sonFait('${s.ar}')">✅ Je l'ai travaillé à voix haute (+5 XP)</button>
    <button class="btn sec mt" onclick="startSonDrill()">🎧 Drill</button>
    <button class="btn ghost mt" onclick="fSons()">← Les sons</button>`;
}
function sonFait(ar){ const f=FS(); if(!f.sons[ar]){ f.sons[ar]=1; save(); addXp(5); toast('🔊 +5 XP'); } else { f.sons[ar]++; save(); } fSons(); }
function startSonDrill(){
  const items=[];
  FUSHA.sons.forEach(s=>{
    const conf=SON_CONF[s.ar];
    if(conf){
      shuffle(s.contraste).slice(0,2).forEach(c=>{
        const opts=shuffle([s.ar,conf[0],conf[1]]);
        items.push({q:'Quel son y a-t-il vraiment dans ce mot ?', ar:c.ar, sub:'« '+c.fr+' » — <i>'+c.tr+'</i>',
          opts, correct:opts.indexOf(s.ar), arOpts:true, say:c.ar,
          expl:`<b>${s.ar}</b> (${s.nom}) — ${s.tr}. En darija tu dirais <i>${c.d}</i> ; en fuṣḥā c'est <b>${c.tr}</b>.`});
      });
    }
    shuffle(s.contraste).slice(0,2).forEach(c=>{
      const opts=shuffle([c.tr,c.d]);
      items.push({q:'Laquelle est la prononciation <b>fuṣḥā</b> ?', ar:c.ar, sub:'« '+c.fr+' »',
        opts, correct:opts.indexOf(c.tr), say:c.ar,
        expl:`<b>${c.tr}</b>. <i>${c.d}</i> est le réflexe darija. ${s.nom} : ${s.t.toLowerCase()}.`});
    });
  });
  runQuiz({t:'🎧 Drill des sons', items:shuffle(items).slice(0,14), xp:15, tag:'sons', again:'startSonDrill()'});
}

/* ================= 🗝️ SALLE 3 — LE PONT ================= */
function fPont(){
  const f=FS(), due=pontDue().length;
  app.innerHTML=`
    <div class="card fcard"><h2>🗝️ Le Pont darija → fuṣḥā</h2>
      <div class="sub mt">Tu connais déjà ~130 mots de darija. Tu ne repars pas de zéro : la darija <b style="color:var(--txt)">est</b> du fuṣḥā compressé. Chaque paire te montre où le mot atterrit — et la règle qui relie les deux.</div>
    </div>
    ${due?`<button class="btn" onclick="startPontRev()">🔁 Réviser ${due} paire(s) dues</button>`:`<div class="card center sub">Rien à réviser aujourd'hui. Ouvre un thème ci-dessous pour en apprendre.</div>`}
    <div class="card mt"><h2 style="font-size:14px">Les 8 correspondances régulières</h2>
      <div class="sub">Elles marchent dans les deux sens. Apprends-les une fois, elles servent sur des centaines de mots.</div></div>
    ${FUSHA.regles_pont.map(r=>`<div class="regle"><div class="rt" style="color:var(--blue)">${r.t}</div><div class="rx mt">${r.x}</div></div>`).join('')}
    <div class="card mt"><h2 style="font-size:14px">Les thèmes</h2></div>
    ${FUSHA.ponts.map(g=>{ const kn=g.paires.filter((p,i)=>FS().pont[g.id+':'+i]).length;
      return `<button class="tile" onclick="startPont('${g.id}')">
        <div class="ic" style="background:linear-gradient(135deg,#5b9bd526,#5b9bd50d);color:var(--blue)">${g.ic}</div>
        <div class="body"><div class="t">${g.t}</div><div class="d">${g.paires.length} paires</div></div>
        <div class="badge ${kn?'':'zero'}">${kn}/${g.paires.length}</div></button>`; }).join('')}
    <button class="btn ghost mt" onclick="setView('fusha')">← Retour</button>
    ${FUS_TTS}`;
}
function pontCard(p){
  return {front:p.fr, sub:'en darija : <b style="color:var(--accent)">'+p.d+'</b>', ar:p.ar, tr:p.tr, note:p.n||'', key:p.key};
}
function startPont(gid){
  const g=FUSHA.ponts.find(x=>x.id===gid);
  const list=g.paires.map((p,i)=>{ const q={key:gid+':'+i}; for(const k in p) q[k]=p[k]; return q; });
  startDeck({ t:'🗝️ '+g.t, cards:list.map(pontCard), rate:ratePont,
    onEnd:()=>startPontQuiz(g,list) });
}
function startPontQuiz(g,list){
  const pool=list.map(p=>p.ar);
  const items=shuffle(list).slice(0,Math.min(7,list.length)).map(p=>{
    const opts=shuffle([p.ar].concat(pickWrong(pool,p.ar,3)));
    return {q:'« '+p.fr+' »', sub:'en darija : <b style="color:var(--accent)">'+p.d+'</b>', opts, correct:opts.indexOf(p.ar), arOpts:true, say:p.ar,
      expl:`<b>${p.tr}</b> — ${p.fr}. ${p.n||''}`};
  });
  runQuiz({t:'🗝️ '+g.t+' · production', items, xp:15, tag:'le pont', again:`startPont('${g.id}')`});
}
function startPontRev(){
  const keys=pontDue();
  if(!keys.length){ toast('Rien à réviser 🎉'); return fPont(); }
  const cards=shuffle(keys).map(k=>pontCard(pontByKey(k)));
  startDeck({ t:'🔁 Révision du Pont', cards, rate:ratePont, onEnd:()=>{
    addXp(10);
    app.innerHTML=`<div class="card big"><div class="em">🗝️</div>
      <div class="score" style="color:var(--good)">${cards.length}</div>
      <div class="lab">paire(s) revues</div>
      <div class="mt sub">+10 XP. Le rappel espacé replacera automatiquement les ratées demain.</div></div>
      <button class="btn ghost" onclick="setView('fusha')">← Retour au fuṣḥā</button>`;
  }});
}

/* ================= ⚜️ SALLE 4 — L'IʿRÁB ================= */
function fI3rab(){
  const f=FS();
  app.innerHTML=`
    <div class="card fcard"><h2>⚜️ L'iʿrāb — الإعْراب</h2>
      <div class="sub mt">Le curseur n°1 de la pureté, et la vraie porte d'entrée de l'arabe écrit : <b style="color:var(--txt)">le nom change de finale selon sa fonction</b>. Neuf chapitres, dans l'ordre. Un chapitre est validé à 80 %.</div>
      <div class="expl mt">Ordre conseillé : ① les trois cas → ② phrase nominale → ③ phrase verbale → ④ préposition & annexion. Les cinq suivants sont ce qui distingue « correct » de « pur ».</div>
    </div>
    ${FUSHA.i3rab.map(c=>{ const b=f.chap[c.id]||0;
      return `<button class="tile" onclick="openChap('${c.id}')">
        <div class="ic" style="background:linear-gradient(135deg,#5b9bd526,#5b9bd50d);color:var(--blue)">${c.ic}</div>
        <div class="body"><div class="t">${c.t}</div><div class="d ar" style="direction:rtl;text-align:left">${c.sub}</div></div>
        <div class="badge ${b>=80?'':'zero'}">${b?b+'%':'—'}</div></button>`; }).join('')}
    <button class="btn ghost mt" onclick="setView('fusha')">← Retour</button>`;
}
function fexRow(e){
  return `<div class="fex">
    <div class="fa ar">${e.ar}</div>
    <div class="ft">${e.tr}</div>
    <div class="ff">${e.fr}</div>
    ${e.n?`<div class="fn">${e.n}</div>`:''}
    <div style="text-align:right"><button class="spk sm" onclick="speak('${e.ar}')">🔊</button></div>
  </div>`;
}
function openChap(id){
  const i=FUSHA.i3rab.findIndex(c=>c.id===id), c=FUSHA.i3rab[i], f=FS();
  window.scrollTo(0,0);
  app.innerHTML=`
    <div class="qmeta"><span>⚜️ Chapitre ${c.ic}</span><span>${i+1}/${FUSHA.i3rab.length}${f.chap[c.id]?' · '+f.chap[c.id]+'%':''}</span></div>
    <div class="card fcard">
      <h2>${c.t}</h2><div class="sub ar" style="direction:rtl;text-align:left;font-size:15px">${c.sub}</div>
      <div class="mt" style="font-size:14.5px;line-height:1.6">${c.html}</div>
    </div>
    <div class="card"><h2 style="font-size:14px">Sur des vraies phrases</h2>
      <div class="sub mb">Lis-les à voix haute <b>avec les finales</b> — c'est là que ça rentre.</div>
      ${c.ex.map(fexRow).join('')}
    </div>
    <button class="btn" onclick="startChapQuiz('${c.id}')">📐 Quiz du chapitre (${c.quiz.length} questions)</button>
    <button class="btn ghost mt" onclick="fI3rab()">← Les chapitres</button>
    ${FUS_TTS}`;
}
function startChapQuiz(id){
  const c=FUSHA.i3rab.find(x=>x.id===id);
  const items=shuffle(c.quiz).map(it=>({
    q:it.q, ar:it.ar, opts:it.opts, correct:it.correct, arOpts:true, expl:it.expl,
    say:it.ar==='؟'?it.opts[it.correct]:it.ar.replace(/ـ+/, it.opts[it.correct])
  }));
  runQuiz({t:'⚜️ '+c.t, items, xp:20, tag:'iʿrāb', again:`startChapQuiz('${id}')`,
    done:pct=>{ const f=FS(); if(pct>(f.chap[id]||0)){ f.chap[id]=pct; save(); } }});
}

/* ================= ⚙️ SALLE 5 — LA MACHINE ================= */
function fSarf(){
  const S1=FUSHA.sarf;
  app.innerHTML=`
    <div class="card fcard"><h2>⚙️ Racine & schème — الصَّرْف</h2>
      <div class="mt" style="font-size:14.5px;line-height:1.6">${S1.intro}</div></div>

    <div class="card"><h2 style="font-size:14px">Les 10 formes du verbe</h2>
      <div class="sub mb">Une racine + une forme = un sens <b>prévisible</b>. C'est le levier de vocabulaire le plus puissant de la langue.</div>
      <table class="ftab">${S1.formes.map(f=>`<tr>
        <td class="fnum">${f.n}</td>
        <td><span class="ar" style="font-size:19px;color:var(--blue)">${f.ar}</span><div class="sub" style="font-size:11px">${f.tr}</div></td>
        <td>${f.sens}
          <div class="mt" style="font-size:12.5px">${f.base?`<span class="sub">${f.base.tr} « ${f.base.fr} » →</span> `:''}<b class="ar" style="font-size:17px">${f.der.ar}</b> <i>${f.der.tr}</i> « ${f.der.fr} »
          <button class="spk sm" onclick="speak('${f.der.ar}')">🔊</button></div></td></tr>`).join('')}</table>
      <button class="btn mt" onclick="startFormeQuiz()">📐 Drill des formes</button>
    </div>

    <div class="card"><h2 style="font-size:14px">Les schèmes du nom</h2>
      <div class="sub mb">Le moule te dit la fonction avant même que tu connaisses le mot.</div>
      ${S1.schemes.map(s=>`<div class="regle">
        <div class="rt"><span class="ar" style="color:var(--blue)">${s.ar}</span> <span class="sub">${s.tr}</span></div>
        <div class="rx mt">${s.sens}</div>
        ${s.ex.map(e=>`<div class="vrow" style="margin-top:7px">
          <span class="vg ar" style="font-size:21px">${e.ar}</span>
          <span class="vfr">${e.fr}<div class="sub" style="font-weight:600">${e.tr} · racine ${e.r}</div></span>
          <button class="spk sm" onclick="speak('${e.ar}')">🔊</button></div>`).join('')}
      </div>`).join('')}
      <button class="btn mt" onclick="startSchemeQuiz()">📐 Drill des schèmes</button>
    </div>

    <div class="card"><h2 style="font-size:14px">Le lexique moderne se fabrique</h2>
      <div class="sub mb">Huit mots de ton terrain — l'école de commerce — décomposés. Aucun n'est un emprunt : tous sont calculés à partir d'une racine.</div>
      ${S1.lexique.map(m=>`<div class="fex">
        <div class="fa ar">${m.ar}</div>
        <div class="ft">${m.tr} — ${m.fr}</div>
        <div class="ff">racine <b>${m.r}</b> : ${m.rfr}</div>
        <div class="fn">${m.x}</div>
        <div style="text-align:right"><button class="spk sm" onclick="speak('${m.ar}')">🔊</button></div></div>`).join('')}
    </div>

    <div class="card"><h2 style="font-size:14px">Les pluriels brisés</h2>
      <div class="sub mb">Le pluriel arabe ne s'ajoute pas : il <b>reforme</b> le mot dans un autre moule. Ils s'apprennent avec le singulier, comme un couple.</div>
      <table class="ftab">${S1.pluriels.map(p=>`<tr>
        <td><span class="ar" style="font-size:19px">${p.sg}</span><div class="sub" style="font-size:11px">${p.sgtr}</div></td>
        <td class="center" style="color:var(--blue)">→</td>
        <td><span class="ar" style="font-size:19px;color:var(--blue)">${p.pl}</span><div class="sub" style="font-size:11px">${p.pltr} · ${p.fr}</div></td>
        <td class="sub" style="font-size:11px">${p.sch}</td></tr>`).join('')}</table>
      <button class="btn mt" onclick="startPlurielQuiz()">📐 Drill des pluriels</button>
    </div>
    <button class="btn ghost mt" onclick="setView('fusha')">← Retour</button>`;
}
function startFormeQuiz(){
  const F=FUSHA.sarf.formes.filter(f=>f.base), pool=F.map(f=>f.der.fr);
  const items=shuffle(F).map(f=>{
    const opts=shuffle([f.der.fr].concat(pickWrong(pool,f.der.fr,3)));
    return {q:`Racine <b>${f.r}</b> — <span class="ar">${f.base.ar}</span> <i>${f.base.tr}</i> « ${f.base.fr} »`,
      ar:f.der.ar, sub:'forme '+f.n+' · <span class="ar">'+f.ar+'</span> — que veut dire ce verbe ?',
      opts, correct:opts.indexOf(f.der.fr), say:f.der.ar,
      expl:`Forme <b>${f.n}</b> (${f.tr}) : ${f.sens}. Donc <b>${f.der.tr}</b> = ${f.der.fr}.`};
  });
  runQuiz({t:'⚙️ Les 10 formes', items, xp:20, tag:'formes', again:'startFormeQuiz()'});
}
function startSchemeQuiz(){
  const SC=FUSHA.sarf.schemes.filter(s=>s.ar!=='مَصْدَر'), pool=SC.map(s=>s.cle), items=[];
  SC.forEach(s=>{ shuffle(s.ex).slice(0,2).forEach(e=>{
    const opts=shuffle([s.cle].concat(pickWrong(pool,s.cle,3)));
    items.push({q:'Ce mot est bâti sur quel moule ?', ar:e.ar, sub:`<i>${e.tr}</i> · racine ${e.r}`,
      opts, correct:opts.indexOf(s.cle), say:e.ar,
      expl:`Schème <b class="ar">${s.ar}</b> (${s.tr}) = ${s.cle}. ${e.ar} <i>${e.tr}</i> = ${e.fr}.`});
  }); });
  runQuiz({t:'⚙️ Les schèmes', items:shuffle(items).slice(0,12), xp:20, tag:'schèmes', again:'startSchemeQuiz()'});
}
function startPlurielQuiz(){
  const P=FUSHA.sarf.pluriels, pool=P.map(p=>p.pl);
  const items=shuffle(P).map(p=>{
    const opts=shuffle([p.pl].concat(pickWrong(pool,p.pl,3)));
    return {q:'Quel est le pluriel ?', ar:p.sg, sub:`<i>${p.sgtr}</i> — ${p.fr}`,
      opts, correct:opts.indexOf(p.pl), arOpts:true, say:p.pl,
      expl:`<b>${p.pltr}</b> — moule <b>${p.sch}</b>.`};
  });
  runQuiz({t:'⚙️ Pluriels brisés', items, xp:15, tag:'pluriels', again:'startPlurielQuiz()'});
}

/* ================= 💬 SALLE 6 — PARLER PUR ================= */
function fParler(){
  app.innerHTML=`
    <div class="card fcard"><h2>💬 Parler en fuṣḥā pur</h2>
      <div class="sub mt">Tout est <b style="color:var(--txt)">vocalisé</b> : c'est la seule façon de prononcer l'i3rab. Dis chaque phrase à voix haute <b>avec les finales</b>, puis coupe la dernière (le <i>waqf</i>) si tu t'arrêtes là.</div>
      <div class="expl mt">Beaucoup de ces phrases portent une règle des chapitres ⚜️ : quand la note l'indique, relis-la — tu verras la grammaire fonctionner en direct.</div>
    </div>
    ${FUSHA.phrases.map(g=>`<button class="tile" onclick="startFPhrase('${g.id}')">
      <div class="ic" style="background:linear-gradient(135deg,#5b9bd526,#5b9bd50d);color:var(--blue)">${g.ic}</div>
      <div class="body"><div class="t">${g.t}</div><div class="d">${g.items.length} phrases</div></div>
      <div class="badge zero">${g.items.length}</div></button>`).join('')}
    <button class="btn ghost mt" onclick="setView('fusha')">← Retour</button>
    ${FUS_TTS}`;
}
function startFPhrase(id){
  const g=FUSHA.phrases.find(x=>x.id===id);
  const cards=g.items.map(it=>({front:it.fr, sub:it.d?'en darija : <b style="color:var(--accent)">'+it.d+'</b>':'', ar:it.ar, tr:it.tr, note:it.n||''}));
  startDeck({ t:g.ic+' '+g.t, cards, onEnd:()=>{
    const pool=g.items.map(i=>i.ar);
    const items=shuffle(g.items).slice(0,Math.min(6,g.items.length)).map(it=>{
      const opts=shuffle([it.ar].concat(pickWrong(pool,it.ar,3)));
      return {q:'« '+it.fr+' »', opts, correct:opts.indexOf(it.ar), arOpts:true, say:it.ar,
        expl:`<b>${it.tr}</b> — ${it.fr}. ${it.n||''}`};
    });
    runQuiz({t:g.ic+' '+g.t+' · production', items, xp:15, tag:'phrases', again:`startFPhrase('${id}')`});
  }});
}

/* ================= 🧭 SALLE 7 — LA ROUTE ================= */
function fRoute(){
  app.innerHTML=`
    <div class="card fcard"><h2>🧭 La route</h2>
      <div class="sub mt">Où va ce module, et comment on continue quand il ne suffit plus. Sans marketing : ce qui marche vraiment, et ce que ça coûte.</div></div>
    ${FUSHA.route.map(r=>`<div class="card">
      <h2 style="font-size:15px">${r.ic} ${r.t}</h2>
      <div class="sub mt" style="line-height:1.6">${r.x}</div></div>`).join('')}
    <button class="btn ghost mt" onclick="setView('fusha')">← Retour</button>`;
}
