/* ============================================================
   MIFTAH — moteur. Locale-first (localStorage), mobile-first.
   Principe : on attaque par les SONS et l'OREILLE, pas par l'alphabet.
   ============================================================ */
'use strict';

const DAY = 86400000;
const todayStr = () => new Date().toISOString().slice(0, 10);
const yest = () => new Date(Date.now() - DAY).toISOString().slice(0, 10);
const NEW_PER_DAY = 12;
const SON_PALIERS = 4;          // un son se travaille sur 4 jours minimum
const GOAL_CARDS = 15;

const DEFAULT = {
  xp: 0, streak: 0, lastActive: null,
  sons: {},        // ar -> {n, last}
  cards: {},       // index -> SRS
  newToday: 0, newDate: todayStr(),
  alphaBest: 0,
  daily: { date: todayStr(), son: 0, cards: 0, ecrire: 0, acts: {} },
  parcours: { day: 1, claimed: {} },   // jour courant du parcours + jours déjà récompensés
  firstRun: true
};
let S = load();
function load() {
  try { return Object.assign({}, DEFAULT, JSON.parse(localStorage.getItem('miftah') || '{}')); }
  catch (e) { return Object.assign({}, DEFAULT); }
}
function save() { localStorage.setItem('miftah', JSON.stringify(S)); }

function resetDay() {
  const t = todayStr();
  if (S.newDate !== t) { S.newDate = t; S.newToday = 0; }
  if (!S.daily || S.daily.date !== t) S.daily = { date: t, son: 0, cards: 0, ecrire: 0, acts: {} };
  if (!S.daily.acts) S.daily.acts = {};
  if (!S.parcours) S.parcours = { day: 1, claimed: {} };
  if (!S.parcours.claimed) S.parcours.claimed = {};
  if (S.lastActive !== t) {
    S.lastActive === yest() ? S.streak += 1 : S.streak = 1;
    S.lastActive = t;
  }
  save();
}
function levelFromXp(xp) {
  let lv = 1, need = 100, acc = 0;
  while (xp >= acc + need) { acc += need; lv++; need = Math.round(need * 1.32); }
  return { lv, into: xp - acc, need };
}
function addXp(n) {
  const b = levelFromXp(S.xp).lv; S.xp += n; save();
  if (levelFromXp(S.xp).lv > b) toast(`⭐ Niveau ${levelFromXp(S.xp).lv}`);
}

/* ---------- Voix arabe (honnêteté sur la limite) ---------- */
let voiceAR = null, voiceChecked = false;
function pickVoice() {
  if (!('speechSynthesis' in window)) return;
  const vs = speechSynthesis.getVoices();
  if (vs.length) voiceChecked = true;
  voiceAR = vs.find(v => /^ar/i.test(v.lang)) || null;
}
if ('speechSynthesis' in window) { pickVoice(); speechSynthesis.onvoiceschanged = pickVoice; }
function speak(arText) {
  if (!('speechSynthesis' in window)) { toast('Synthèse vocale indisponible'); return; }
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(arText);
  u.lang = 'ar-SA'; u.rate = 0.8;
  if (voiceAR) u.voice = voiceAR;
  speechSynthesis.speak(u);
}
function audioWarn() {
  if (voiceAR || !voiceChecked) return '';
  return `<div class="audiowarn"><b>⚠️ Aucune voix arabe détectée sur cet appareil.</b><br>
    Sur iPhone : Réglages → Accessibilité → Contenu vocal → Voix → Arabe. Sinon, le son ne marchera pas —
    mais tes potes restent de toute façon ta meilleure référence audio.</div>`;
}
const TTS_NOTE = `<div class="sub mt">🔊 La voix de synthèse parle l'<b>arabe standard</b>, pas la darija : elle te donne les <i>sons</i> correctement, mais pas l'accent de tes potes. Pour l'accent, écoute-les eux.</div>`;

/* ---------- Sons : paliers ---------- */
function sonProg(ar) { return S.sons[ar] || { n: 0, last: null }; }
function sonTakenToday(ar) { return sonProg(ar).last === todayStr(); }
function sonsMastered() { return SONS.filter(s => sonProg(s.ar).n >= SON_PALIERS).length; }

/* ---------- Mots : SRS ---------- */
function cardState(i) { return S.cards[i] || { ease: 2.5, interval: 0, reps: 0, due: 0, introduced: false }; }
function dueCards() { const now = Date.now(); const o = []; for (const i in S.cards) { const c = S.cards[i]; if (c.introduced && c.due <= now) o.push(+i); } return o; }
function newAvailable(unl) {
  const cap = unl ? Infinity : Math.max(0, NEW_PER_DAY - S.newToday);
  const o = [];
  for (let i = 0; i < MOTS.length && o.length < cap; i++) if (!S.cards[i] || !S.cards[i].introduced) o.push(i);
  return o;
}
function learned() { let n = 0; for (const i in S.cards) if (S.cards[i].introduced) n++; return n; }
function rateCard(i, r) {
  const c = cardState(i); if (!c.introduced) { c.introduced = true; S.newToday++; }
  const now = Date.now();
  if (r === 0) { c.reps = 0; c.ease = Math.max(1.3, c.ease - .2); c.interval = 0; c.due = now + 60000; }
  else {
    if (c.interval < 1) c.interval = r === 3 ? 4 : 1;
    else c.interval = Math.round(c.interval * (r === 1 ? 1.2 : r === 2 ? c.ease : c.ease * 1.3));
    if (r === 1) c.ease = Math.max(1.3, c.ease - .15);
    if (r === 3) c.ease += .15;
    c.reps++; c.due = now + Math.max(1, c.interval) * DAY;
  }
  S.cards[i] = c; addXp(r === 0 ? 1 : 3); S.daily.cards++; save();
}
function nextLbl(i, r) {
  const c = cardState(i); if (r === 0) return '<1 j';
  let iv = c.interval < 1 ? (r === 3 ? 4 : 1) : Math.round(c.interval * (r === 1 ? 1.2 : r === 2 ? c.ease : c.ease * 1.3));
  return Math.max(1, iv) + ' j';
}

/* ---------- Rendu ---------- */
const app = document.getElementById('app');
let view = 'home';
function setView(v) { FROM_SESSION = false; if (v === 'home') viewDay = null; view = v; document.querySelectorAll('.nav button').forEach(b => b.classList.toggle('on', b.dataset.v === v)); render(); }
document.querySelectorAll('.nav button').forEach(b => b.addEventListener('click', () => setView(b.dataset.v)));

function render() {
  resetDay();
  document.getElementById('streak').textContent = S.streak;
  document.getElementById('hlevel').textContent = levelFromXp(S.xp).lv;
  document.querySelectorAll('.nav button').forEach(b => b.classList.toggle('on', b.dataset.v === view));
  window.scrollTo(0, 0);
  if (view === 'home') return renderHome();
  if (view === 'parler') return renderParler();
  if (view === 'sons') return renderSons();
  if (view === 'mots') return renderMots();
  if (view === 'verbes') return renderVerbes();
  if (view === 'ecrire') return renderEcrire();
  if (view === 'fusha') return renderFusha();
}
function esc(s) { return (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

/* ---------- LE PARCOURS (accueil) ---------- */
let viewDay = null;                                  // jour affiché (null = jour courant)
function dayObj(n) { return PARCOURS.jours[n - 1]; }
function actKey(day, a) {
  if (a.type === 'son') return 'd' + day + ':son:' + a.i;
  if (a.type === 'alpha' || a.type === 'alphaquiz') return 'd' + day + ':alpha';
  if (a.type === 'mots') return 'd' + day + ':mots';
  if (a.type === 'bilan') return 'd' + day + ':bilan';
  return 'd' + day + ':' + a.type + ':' + a.id;
}
function actDone(day, a) { return !!(S.daily.acts && S.daily.acts[actKey(day, a)]); }
function dayComplete(n) { const d = dayObj(n); return !!d && d.activities.every(a => actDone(n, a)); }

function renderHome() {
  const total = PARCOURS.jours.length;
  const cur = Math.min(S.parcours.day, total);
  const vd = Math.min(viewDay || cur, cur);
  const d = dayObj(vd);
  const sem = PARCOURS.semaines.find(s => (s.jours || []).includes(vd)) || PARCOURS.semaines[0];
  const acts = d.activities;
  const doneN = acts.filter(a => actDone(vd, a)).length;
  const pct = Math.round(doneN / acts.length * 100);
  const complete = doneN === acts.length;
  const L = levelFromXp(S.xp);
  const ICON = { expr: '🗣️', moule: '🧱', son: '🔊', alpha: '✍️', alphaquiz: '✍️', mots: '🃏', bilan: '🏁' };

  app.innerHTML = `
    ${S.firstRun ? `
    <div class="card" style="border-color:var(--accent)">
      <h2>Bienvenue — voici ton chemin</h2>
      <div class="sub mt">Fini le zapping entre modules : tu as un <b style="color:var(--txt)">parcours</b>. Un jour = une séance courte.
      On attaque par ce qui te fait <b style="color:var(--txt)">parler tout de suite</b> — des blocs de phrases — avec les sons et l'alphabet en fond.</div>
      <div class="sub mt">Et deux cadeaux pour démarrer : sur les 5 sons durs de l'arabe, <b style="color:var(--txt)">tu en as déjà deux</b> —
      le <b class="ar" style="color:var(--accent)">خ</b> (jota espagnole) et le <b class="ar" style="color:var(--accent)">غ</b> (ton R français).</div>
      <button class="btn mt" onclick="S.firstRun=false;save();render()">Commencer le Jour 1 →</button>
    </div>` : ''}

    <div class="card">
      <div class="sub" style="text-transform:uppercase;letter-spacing:.07em;font-size:11px;font-weight:800;color:var(--accent)">🧭 ${PARCOURS.mois} — ${PARCOURS.titre}</div>
      <h2 class="mt" style="font-size:16px">Semaine ${sem.n} · ${sem.titre}</h2>
      <div class="daystrip mt">${PARCOURS.jours.map(j => {
        const st = (j.n < cur || dayComplete(j.n)) ? 'ok' : j.n > cur ? 'lock' : 'now';
        return `<button class="dcell ${st}${j.n === vd ? ' sel' : ''}" ${j.n > cur ? 'disabled' : ''} onclick="pickDay(${j.n})">
          <span class="dn">${(j.n < cur || dayComplete(j.n)) ? '✓' : j.n}</span><span class="dl">J${j.n}</span></button>`;
      }).join('')}</div>
    </div>

    <div class="card">
      <div class="qmeta"><span style="font-weight:800;color:var(--txt)">Jour ${vd} · ${esc(d.titre)}</span><span>${doneN}/${acts.length}</span></div>
      <div class="sub mb">${esc(d.sub)}</div>
      <div class="pbar mb"><i style="width:${pct}%"></i></div>
      ${acts.map((a, k) => `<button class="actrow ${actDone(vd, a) ? 'ok' : ''}" onclick="launchAct(${vd},${k})">
        <span class="aic">${ICON[a.type] || '▶️'}</span>
        <span class="abody"><span class="at">${esc(a.t)}</span>${a.min ? `<span class="ad">~${a.min} min</span>` : ''}</span>
        <span class="atick">${actDone(vd, a) ? '✅' : '▶︎'}</span></button>`).join('')}
      ${complete ? `<div class="expl center mt">✅ Séance du Jour ${vd} bouclée.</div>
        ${vd === cur && cur < total ? `<button class="btn mt" onclick="nextDay()">Passer au Jour ${vd + 1} →</button>` : ''}
        ${vd === cur && cur >= total ? `<div class="sub center mt">Tu es au bout du contenu construit. La <b style="color:var(--txt)">Semaine 2</b> arrive. 💪</div>` : ''}` : ''}
    </div>

    <div class="card">
      <div class="sub" style="display:flex;justify-content:space-between"><span>Niveau ${L.lv}</span><span>${L.into}/${L.need} XP · 🔥 ${S.streak}</span></div>
      <div class="pbar"><i style="width:${Math.round(L.into / L.need * 100)}%"></i></div>
      <div class="row2 mt">
        <div><div class="logo" style="font-size:22px">${sonsMastered()}/${SONS.length}</div><div class="sub">sons maîtrisés</div></div>
        <div><div class="logo" style="font-size:22px">${learned()}/${MOTS.length}</div><div class="sub">mots appris</div></div>
      </div>
    </div>

    <div class="card">
      <h2 style="font-size:14px">🚪 Salles d'entraînement libre</h2>
      <div class="sub">Le parcours te guide ; ici tu farmes quand tu veux.</div>
      <div class="room2 mt">
        <button class="roomb" onclick="setView('parler')">💬<span>Parler</span></button>
        <button class="roomb" onclick="setView('sons')">🔊<span>Sons</span></button>
        <button class="roomb" onclick="setView('mots')">🃏<span>Mots</span></button>
        <button class="roomb" onclick="setView('verbes')">⚡<span>Verbes</span></button>
        <button class="roomb" onclick="setView('ecrire')">✍️<span>Écrire</span></button>
      </div>
    </div>

    <div class="card">
      <h2 style="font-size:15px">La route, sans mensonge</h2>
      <div class="sub mt">Bribes : <b style="color:var(--txt)">~3 mois</b> · Conversation simple : <b style="color:var(--txt)">~8-12 mois</b> · Fluide : <b style="color:var(--txt)">~2 ans</b>.
      30 min/jour <b style="color:var(--accent)">+ tes potes marocains</b> — c'est eux, ton avantage. L'app ne les remplace pas.</div>
    </div>`;
}
function pickDay(n) { viewDay = n; render(); }
function nextDay() { if (S.parcours.day < PARCOURS.jours.length) S.parcours.day++; viewDay = null; save(); toast('➡️ Jour ' + S.parcours.day); render(); }

/* ---------- Lancement d'une activité depuis la séance ---------- */
let FROM_SESSION = false;                            // clé d'activité en cours (ou false)
function launchAct(day, k) {
  const a = dayObj(day).activities[k];
  FROM_SESSION = actKey(day, a);
  window.scrollTo(0, 0);
  switch (a.type) {
    case 'son': return openSon(a.i);
    case 'mots': {
      const q = dueCards().concat(newAvailable(false));
      if (!q.length) { markActDone(); toast('Rien à réviser 🎉'); return render(); }
      return startRev(false);
    }
    case 'moule': return startPhrase('moule', a.id);
    case 'expr': return startPhrase('expr', a.id);
    case 'alpha': return startLetters(a.letters, {});
    case 'alphaquiz': return startLetters(a.letters, { quizOnly: true });
    case 'bilan': return renderBilan(day);
  }
}
function markActDone() {
  if (!FROM_SESSION) return;
  (S.daily.acts = S.daily.acts || {})[FROM_SESSION] = true;
  const cur = S.parcours.day, d = dayObj(cur);
  if (d && d.activities.every(a => actDone(cur, a))) {
    S.parcours.claimed = S.parcours.claimed || {};
    if (!S.parcours.claimed[cur]) { S.parcours.claimed[cur] = true; addXp(40); toast('✅ Jour ' + cur + ' bouclé · +40 XP'); }
  }
  save();
}
function sessBack() { return FROM_SESSION ? `<button class="btn" onclick="backToSeance()">← Retour à la séance</button>` : ''; }
function backToSeance() { FROM_SESSION = false; setView('home'); }

/* ---------- SONS ---------- */
function renderSons() {
  app.innerHTML = `
    ${audioWarn()}
    <div class="card">
      <h2>Les sons — commence ici</h2>
      <div class="sub mt">L'alphabet fait peur mais tombe en un mois. <b style="color:var(--txt)">Les sons, eux, se travaillent des semaines</b> — c'est le seul vrai mur.
      Chaque son demande <b style="color:var(--txt)">${SON_PALIERS} paliers</b>, et <b style="color:var(--accent)">un seul palier par jour</b> : l'oreille a besoin de nuits, pas de bourrage.</div>
    </div>
    ${SONS.map((s, i) => {
      const p = sonProg(s.ar), ok = p.n >= SON_PALIERS, today = sonTakenToday(s.ar);
      return `<button class="sonrow ${ok ? 'ok' : ''}" onclick="openSon(${i})">
        <div class="glyph ar">${s.ar}</div>
        <div class="info">
          <div class="nm">${s.nom} · <span style="color:var(--muted);font-weight:600">${s.arabizi}</span></div>
          <div class="sm">${ok ? 'Maîtrisé ✓' : today ? `Palier ${p.n}/${SON_PALIERS} · repos jusqu'à demain` : p.n ? `Palier ${p.n}/${SON_PALIERS} · un palier t'attend` : s.deja}</div>
        </div>
        <div class="pal ${!ok && !today ? 'on' : ''}">${ok ? '✓' : p.n + '/' + SON_PALIERS}</div>
      </button>`;
    }).join('')}`;
}
function openSon(i) {
  const s = SONS[i], p = sonProg(s.ar), ok = p.n >= SON_PALIERS, today = sonTakenToday(s.ar);
  app.innerHTML = `
    <div class="qmeta"><span>Son ${i + 1}/${SONS.length}</span><span>${ok ? 'Maîtrisé ✓' : `Palier ${p.n}/${SON_PALIERS}`}</span></div>
    <div class="card">
      <div class="deja ${s.deja.startsWith('✅') ? '' : 'no'}">${s.deja}</div>
      <div class="glyphbig ar">${s.ar}</div>
      <div class="center"><b style="font-size:18px">${s.nom}</b> <span class="pill">arabizi : ${s.arabizi}</span></div>
      <div class="expl">${s.comment}</div>
      <div class="expl warn">⚠️ ${s.piege}</div>
      <div class="wordcard">
        <div class="w ar">${s.mot.ar}</div>
        <div class="t">${s.mot.arabizi}</div>
        <div class="f">${s.mot.fr}</div>
        <button class="spk" onclick="speak('${s.mot.ar}')">🔊</button>
      </div>
      ${TTS_NOTE}
    </div>
    ${ok ? `<div class="card center sub">Son maîtrisé. Tu peux refaire le drill pour l'entretenir (+5 XP).</div>` : ''}
    ${today && !ok ? `<div class="card center sub">✋ Palier déjà pris aujourd'hui. Ton oreille travaille pendant la nuit — reviens demain.</div>` : ''}
    <button class="btn" onclick="startDrill(${i})">${ok ? '↻ Entretenir l\'oreille' : '👂 Drill d\'oreille'}</button>
    ${FROM_SESSION ? `<button class="btn ghost mt" onclick="backToSeance()">← Retour à la séance</button>` : `<button class="btn ghost mt" onclick="setView('sons')">Retour</button>`}`;
}

/* Drill : discrimination à l'oreille */
let D = null;
function drillItems(i) {
  const s = SONS[i], items = [];
  for (let k = 0; k < 6; k++) {
    if (s.paire) {
      const a = s.paire[0], b = s.paire[1];
      const cible = Math.random() < .5 ? a : b;
      items.push({ play: cible.ar, opts: [a, b], correct: cible === a ? 0 : 1, why: `« ${cible.arabizi} » = ${cible.fr}. La différence tient au seul son ${s.ar}.` });
    } else {
      const autres = SONS.filter(x => x.ar !== s.ar).sort(() => Math.random() - .5).slice(0, 2).map(x => x.mot);
      const opts = [s.mot, ...autres].sort(() => Math.random() - .5);
      const cible = Math.random() < .55 ? s.mot : opts[Math.floor(Math.random() * 3)];
      items.push({ play: cible.ar, opts, correct: opts.indexOf(cible), why: `C'était « ${cible.arabizi} » (${cible.fr}).` });
    }
  }
  return items;
}
function startDrill(i) {
  D = { i, items: drillItems(i), k: 0, correct: 0, answered: false };
  renderDrill();
}
function renderDrill() {
  if (D.k >= D.items.length) return finishDrill();
  const s = SONS[D.i], it = D.items[D.k];
  D.answered = false;
  app.innerHTML = `
    <div class="qmeta"><span>👂 ${s.nom} · ${s.ar}</span><span>${D.k + 1}/${D.items.length}</span></div>
    <div class="pbar mb"><i style="width:${D.k / D.items.length * 100}%"></i></div>
    <div class="center sub mb">Écoute et choisis ce que tu entends.</div>
    <button class="spk" style="width:74px;height:74px;font-size:30px" onclick="speak('${it.play}')">🔊</button>
    <div id="opts" class="mt">${it.opts.map((o, k) =>
      `<button class="opt" onclick="answerDrill(${k})"><b class="ar" style="font-size:22px">${o.ar}</b> &nbsp; <span style="color:var(--accent);font-weight:800">${o.arabizi}</span> <span class="sub">— ${o.fr}</span></button>`).join('')}</div>
    <div id="after"></div>
    <div class="mt"><button class="btn ghost" onclick="setView('sons')">Quitter</button></div>`;
  setTimeout(() => speak(it.play), 350);
}
function answerDrill(k) {
  if (D.answered) return; D.answered = true;
  const it = D.items[D.k], ok = k === it.correct;
  document.querySelectorAll('#opts .opt').forEach((b, idx) => {
    b.setAttribute('disabled', '');
    if (idx === it.correct) b.classList.add('good'); else if (idx === k) b.classList.add('bad'); else b.classList.add('dim');
  });
  if (ok) D.correct++;
  const last = D.k === D.items.length - 1;
  document.getElementById('after').innerHTML = `
    <div class="expl ${ok ? '' : 'warn'}">${ok ? '✅ ' : '❌ '}${it.why}</div>
    <button class="btn mt" onclick="${last ? 'finishDrill()' : 'nextDrill()'}">${last ? 'Résultat' : 'Suivant'}</button>`;
}
function nextDrill() { D.k++; renderDrill(); }
function finishDrill() {
  const s = SONS[D.i], pct = Math.round(D.correct / D.items.length * 100), pass = D.correct >= 5;
  let msg = '';
  if (!pass) msg = 'Insuffisant pour un palier — mais l\'oreille se construit, refais-le.';
  else if (S.sons[s.ar] && sonProg(s.ar).n >= SON_PALIERS) { addXp(5); msg = 'Entretien fait. +5 XP'; }
  else if (sonTakenToday(s.ar)) { addXp(3); msg = 'Palier déjà pris aujourd\'hui · +3 XP — le prochain demain.'; }
  else {
    const p = sonProg(s.ar); p.n++; p.last = todayStr(); S.sons[s.ar] = p; S.daily.son++; save();
    if (p.n >= SON_PALIERS) { addXp(60); msg = `🎧 Son <b>${s.nom}</b> maîtrisé ! +60 XP`; }
    else { addXp(20); msg = `Palier ${p.n}/${SON_PALIERS} · +20 XP — reviens demain pour le suivant.`; }
  }
  markActDone();
  app.innerHTML = `
    <div class="card big">
      <div class="em">${pass ? (pct === 100 ? '🎯' : '👂') : '💪'}</div>
      <div class="score" style="color:${pass ? 'var(--good)' : 'var(--accent)'}">${pct}%</div>
      <div class="lab">${D.correct}/${D.items.length}</div>
      <div class="mt sub">${msg}</div>
    </div>
    ${sessBack()}
    <button class="btn ${FROM_SESSION ? 'sec' : ''}" onclick="startDrill(${D.i})">Refaire</button>
    ${FROM_SESSION ? '' : `<button class="btn ghost mt" onclick="setView('sons')">Retour aux sons</button>`}`;
}

/* ---------- MOTS (SRS) ---------- */
function renderMots() {
  const due = dueCards().length, nw = newAvailable(false).length, tot = due + nw;
  const themes = {}; MOTS.forEach(m => themes[m[3]] = (themes[m[3]] || 0) + 1);
  app.innerHTML = `
    ${audioWarn()}
    <div class="card">
      <h2>Les mots du socle</h2>
      <div class="sub mt">${MOTS.length} mots choisis pour être compris <b style="color:var(--txt)">au Maroc, en Algérie ET en Tunisie</b>.
      Sens tiré au hasard 🇫🇷↔️arabizi. (Les verbes conjugués sont volontairement absents : ils changent selon le dialecte — on les ajoutera quand tu sauras lequel.)</div>
      <div class="row2 mt">
        <div><div class="logo" style="font-size:22px;color:var(--blue)">${due}</div><div class="sub">à réviser</div></div>
        <div><div class="logo" style="font-size:22px">${learned()}<span style="font-size:14px;color:var(--muted)">/${MOTS.length}</span></div><div class="sub">appris</div></div>
      </div>
    </div>
    <button class="btn" onclick="startRev(false)" ${tot === 0 ? 'disabled' : ''}>${tot ? `Session du jour · ${tot} carte(s)` : 'Rien à réviser 🎉'}</button>
    <button class="btn sec mt" onclick="startRev(true)">♾️ Session illimitée (${due + newAvailable(true).length})</button>
    <div class="card mt">
      <h2 style="font-size:14px">Thèmes</h2>
      <div class="mt">${Object.entries(themes).map(([t, n]) => `<span class="pill" style="margin:3px 4px 3px 0">${t} · ${n}</span>`).join('')}</div>
    </div>`;
}
let R = null;
function startRev(unl) {
  const q = dueCards().concat(newAvailable(unl));
  if (!q.length) { toast('Rien à réviser 🎉'); return; }
  R = { q, i: 0, shown: false, done: 0 };
  renderCard();
}
function renderCard() {
  if (R.i >= R.q.length) return finishRev();
  const idx = R.q[R.i], [az, fr, ar, th] = MOTS[idx];
  const isNew = !S.cards[idx] || !S.cards[idx].introduced;
  R.dir = Math.random() < .5 ? 'ar2fr' : 'fr2ar';
  const prompt = R.dir === 'ar2fr' ? `<div class="front">${az}</div><div class="arw ar">${ar}</div>` : `<div class="front">${fr}</div>`;
  const back = R.dir === 'ar2fr' ? fr : `${az}<div class="arw ar" style="margin-top:4px">${ar}</div>`;
  R.shown = false;
  app.innerHTML = `
    <div class="qmeta"><span>${isNew ? '🆕 Nouveau' : '🔁 Révision'} · ${th}</span><span>${R.i + 1}/${R.q.length}</span></div>
    <div class="flash" onclick="flip()">
      <div class="theme">${R.dir === 'ar2fr' ? '🇲🇦 → 🇫🇷' : '🇫🇷 → 🇲🇦'}</div>
      ${prompt}
      <div id="back" class="hidden"><div class="back">${back}</div></div>
      <div id="hint" class="tap">${R.dir === 'ar2fr' ? 'Traduis en français' : 'Dis-le en darija'} · touche pour révéler</div>
    </div>
    <button class="spk" onclick="speak('${ar}')">🔊</button>
    <div id="rate"></div>
    <div class="mt"><button class="btn ghost" onclick="setView('mots')">Quitter</button></div>`;
}
function flip() {
  if (R.shown) return; R.shown = true;
  document.getElementById('back').classList.remove('hidden');
  document.getElementById('hint').classList.add('hidden');
  const idx = R.q[R.i];
  speak(MOTS[idx][2]);
  document.getElementById('rate').innerHTML = `<div class="srsrow">
    <button class="again" onclick="doRate(0)">Encore<small>${nextLbl(idx,0)}</small></button>
    <button class="hard" onclick="doRate(1)">Dur<small>${nextLbl(idx,1)}</small></button>
    <button class="good" onclick="doRate(2)">Bien<small>${nextLbl(idx,2)}</small></button>
    <button class="easy" onclick="doRate(3)">Facile<small>${nextLbl(idx,3)}</small></button></div>`;
}
function doRate(r) {
  const idx = R.q[R.i]; rateCard(idx, r); R.done++;
  if (r === 0) R.q.push(idx);
  R.i++; renderCard();
}
function finishRev() {
  save();
  markActDone();
  app.innerHTML = `<div class="card big"><div class="em">🧠</div><div class="score" style="color:var(--good)">+${R.done}</div>
    <div class="lab">carte(s) travaillée(s)</div><div class="mt sub">Reviens demain : elles réapparaîtront au bon moment.</div></div>
    ${sessBack()}
    ${FROM_SESSION ? '' : `<button class="btn" onclick="setView('mots')">Terminé</button>`}`;
}

/* ---------- VERBES (darija marocaine) ---------- */
function renderVerbes() {
  app.innerHTML = `
    <div class="card" style="border-color:var(--accent)">
      <h2>⚡ Les verbes marocains</h2>
      <div class="sub mt">Voilà pourquoi j'attendais de savoir <b style="color:var(--txt)">quel</b> dialecte : la conjugaison change complètement d'un pays à l'autre.
      Maintenant qu'on sait que c'est le <b style="color:var(--txt)">marocain</b>, voici la règle qui débloque tout —
      et elle tient en une ligne.</div>
    </div>
    ${VERBES_REGLES.map(r => `<div class="regle">
      <div class="rt">${r.titre}</div>
      <div class="rk">${r.cle}</div>
      <div class="rx">${r.txt}</div>
    </div>`).join('')}
    <div class="card mt">
      <h2 style="font-size:15px">${VERBES.length} verbes essentiels</h2>
      <div class="sub">Touche un verbe pour voir sa conjugaison complète au présent.</div>
    </div>
    ${VERBES.map((v, i) => `<button class="vrow" onclick="openVerbe(${i})">
      <span class="vg ar">${v.ar}</span>
      <span class="vfr">${v.fr}</span>
      <span class="vb">${v.p[2]}</span>
    </button>`).join('')}
    <button class="btn mt" onclick="startVQuiz()">Drill de conjugaison · 8 questions</button>`;
}
function openVerbe(i) {
  const v = VERBES[i];
  app.innerHTML = `
    <div class="card">
      <div class="center"><div class="glyphbig ar" style="font-size:60px">${v.ar}</div>
      <b style="font-size:19px">${v.fr}</b><br><span class="pill">forme de base : ${v.base}</span></div>
      <button class="spk" onclick="speak('${v.ar}')">🔊</button>
      <div class="sub center mb">Présent (avec <b style="color:var(--accent)">ka-</b>)</div>
      <div class="conj">
        ${v.p.map((f, k) => `<div class="cp">${PERSONNES[k]}</div><div class="cv">${f}</div>`).join('')}
      </div>
      <div class="expl mt">Négation : <b style="color:var(--accent)">ma</b>${v.p[0]}<b style="color:var(--accent)">sh</b> · Futur : <b style="color:var(--accent)">ghadi</b> ${v.p[0].replace(/^ka/, '')}</div>
    </div>
    <button class="btn ghost" onclick="setView('verbes')">Retour</button>`;
}
let V = null;
function startVQuiz() {
  const items = [];
  const pool = VERBES.slice().sort(() => Math.random() - .5);
  for (let k = 0; k < 8; k++) {
    const v = pool[k % pool.length];
    const pi = [0, 1, 2, 4][Math.floor(Math.random() * 4)];   // je / tu / il / nous
    const good = v.p[pi];
    const wrongs = v.p.filter(x => x !== good).sort(() => Math.random() - .5).slice(0, 2);
    const opts = [good, ...wrongs].sort(() => Math.random() - .5);
    items.push({
      q: `<b style="color:var(--accent)">${v.fr}</b><br><span style="font-size:15px;color:var(--muted);font-weight:600">à la personne : <b style="color:var(--txt)">${PERSONNES[pi]}</b></span>`,
      opts, correct: opts.indexOf(good),
      why: `${PERSONNES[pi]} → <b>${good}</b>. Rappelle-toi : kan- = je · kat- = tu/elle · kay- = il.`
    });
  }
  V = { items, k: 0, correct: 0, answered: false }; renderV();
}
function renderV() {
  if (V.k >= V.items.length) return finishV();
  const it = V.items[V.k]; V.answered = false;
  app.innerHTML = `
    <div class="qmeta"><span>⚡ Conjugaison</span><span>${V.k + 1}/${V.items.length}</span></div>
    <div class="pbar mb"><i style="width:${V.k / V.items.length * 100}%"></i></div>
    <div style="font-size:18px;font-weight:700;margin:8px 0 14px">${it.q}</div>
    <div id="opts">${it.opts.map((o, k) => `<button class="opt" onclick="answerV(${k})"><b style="color:var(--accent)">${o}</b></button>`).join('')}</div>
    <div id="after"></div>
    <div class="mt"><button class="btn ghost" onclick="setView('verbes')">Quitter</button></div>`;
}
function answerV(k) {
  if (V.answered) return; V.answered = true;
  const it = V.items[V.k], ok = k === it.correct;
  document.querySelectorAll('#opts .opt').forEach((b, i) => { b.setAttribute('disabled', ''); if (i === it.correct) b.classList.add('good'); else if (i === k) b.classList.add('bad'); else b.classList.add('dim'); });
  if (ok) V.correct++;
  const last = V.k === V.items.length - 1;
  document.getElementById('after').innerHTML = `<div class="expl ${ok ? '' : 'warn'}">${ok ? '✅ ' : '❌ '}${it.why}</div>
    <button class="btn mt" onclick="${last ? 'finishV()' : 'nextV()'}">${last ? 'Résultat' : 'Suivant'}</button>`;
}
function nextV() { V.k++; renderV(); }
function finishV() {
  const pct = Math.round(V.correct / V.items.length * 100);
  if (V.correct >= 5) { addXp(25); S.daily.ecrire++; save(); }
  app.innerHTML = `<div class="card big"><div class="em">${pct >= 85 ? '🎯' : '⚡'}</div>
    <div class="score" style="color:${V.correct >= 5 ? 'var(--good)' : 'var(--accent)'}">${pct}%</div>
    <div class="lab">${V.correct}/${V.items.length}</div>
    <div class="mt sub">${V.correct >= 5 ? '+25 XP — la règle ka- rentre.' : 'Relis la règle ka- et refais-le.'}</div></div>
    <button class="btn" onclick="startVQuiz()">Refaire</button>
    <button class="btn ghost mt" onclick="setView('verbes')">Retour</button>`;
}

/* ---------- ÉCRIRE : arabizi + alphabet ---------- */
function renderEcrire() {
  app.innerHTML = `
    <div class="card" style="border-color:var(--accent)">
      <h2>✍️ L'arabizi — écris-leur cette semaine</h2>
      <div class="sub mt">Tes potes ne s'écrivent pas en alphabet arabe : ils s'écrivent en <b style="color:var(--txt)">arabizi</b>, avec des chiffres pour les sons absents du clavier latin.
      <b style="color:var(--accent)">Tu peux leur écrire dès maintenant, sans connaître une seule lettre.</b> Les chiffres ont été choisis pour <i>ressembler</i> à la lettre arabe.</div>
    </div>
    ${ARABIZI.map(z => `<div class="ztab">
      <div class="num">${z.n}</div><div class="g ar">${z.ar}</div>
      <div class="d"><b>${z.son}</b><small>${esc(z.ex)}</small></div>
    </div>`).join('')}
    <button class="btn" onclick="startZQuiz()">Quiz arabizi · 6 questions</button>

    <div class="card mt" style="border-color:var(--accent)">
      <h2>🖋️ L'Atelier — lire & écrire</h2>
      <div class="sub mt">Pour aller vite, deux gestes qu'un simple coup d'œil ne donne pas : <b style="color:var(--txt)">écrire la lettre de mémoire</b> (pas la recopier) et <b style="color:var(--txt)">déchiffrer de vrais mots</b>. L'Atelier alterne <b style="color:var(--txt)">lire</b> → <b style="color:var(--txt)">écrire sans modèle</b> → <b style="color:var(--txt)">lire un mot</b>, en répétition espacée. Rappel : 28 lettres = 18 squelettes + des points.</div>
      ${(()=>{const d=alphaDue().length, n=alphaNew(5).length, m=alphaMastered(), seen=Object.keys(S.alpha||{}).length;
        return `<div class="pill mt">${d?d+' à réviser':'rien de dû'}</div> <div class="pill">${n} nouvelle${n>1?'s':''} dispo</div> <div class="pill ${m?'warn':''}">${seen}/28 vues${m?' · '+m+' gravées':''}</div>`;})()}
      <button class="btn mt" onclick="startAtelier(false)">${Object.keys(S.alpha||{}).length?'Séance d\'écriture':'Commencer — famille par famille'}</button>
      <button class="btn sec mt" onclick="startAtelier(true)">🏃 Marathon — farm illimité (lecture + écriture)</button>
    </div>
    <div class="card mt">
      <h2>🔤 Les 28, en accès libre</h2>
      <div class="sub mt">Chacune change de forme selon sa place (isolée / début / milieu / fin) — ça fait peur et ça tombe en un mois. <b style="color:var(--txt)">Règle d'or : 6 lettres (ا د ذ ر ز و) ne s'attachent JAMAIS à la suivante.</b> Touche une lettre : mnémo, famille, tracé.</div>
      ${S.alphaBest ? `<div class="pill warn mt">Record reconnaissance : ${S.alphaBest}/10</div>` : ''}
    </div>
    <div class="sub mb" style="font-size:11px">Bordure : <span style="color:var(--accent)">apprise</span> · <span style="color:var(--blue)">en cours</span> · <span style="color:var(--good)">gravée</span></div>
    <div class="agrid mb">${ALPHABET.map((l, i) => { const mt = letterMaturity(i), seen = !!alphaState(i);
      const col = mt >= 3 ? 'var(--good)' : mt >= 2 ? 'var(--blue)' : mt >= 1 ? 'var(--accent)' : 'var(--line)';
      return `<button class="acell" onclick="openLettre(${i})" style="border-color:${seen ? col : 'var(--line)'}">
      <div class="g ar">${l[1]}</div><div class="s">${l[5]}</div><div class="n">${l[0]}</div></button>`; }).join('')}</div>
    <button class="btn sec" onclick="startAQuiz()">Drill de reconnaissance · 10 lettres</button>`;
}
function openLettre(i) {
  const l = ALPHABET[i];
  const fam = famOf(l[0]);
  app.innerHTML = `
    <div class="card">
      <div class="glyphbig ar">${l[1]}</div>
      <div class="center"><b style="font-size:19px">${l[0]}</b> · <span class="pill">son : ${l[5]}</span></div>
      ${MNEMO[l[0]] ? `<div class="expl mt">💡 ${MNEMO[l[0]]}</div>` : ''}
      ${l[6] ? `<div class="sub mt center">${l[6]}</div>` : ''}
      ${fam ? `<div class="sub mt center">Sa famille — même squelette, seuls les points changent :</div>
      <div class="forms">${fam.map(n => { const x = ALPHABET.find(a => a[0] === n); return `<div class="fcell" style="${x[0]===l[0]?'border-color:var(--accent)':''}"><div class="g ar">${x[1]}</div><div class="l">${x[5]}</div></div>`; }).join('')}</div>` : ''}
      <div class="sub mt center">Ses 4 formes selon la position :</div>
      <div class="forms">
        <div class="fcell"><div class="g ar">${l[1]}</div><div class="l">isolée</div></div>
        <div class="fcell"><div class="g ar">${l[2]}</div><div class="l">début</div></div>
        <div class="fcell"><div class="g ar">${l[3]}</div><div class="l">milieu</div></div>
        <div class="fcell"><div class="g ar">${l[4]}</div><div class="l">fin</div></div>
      </div>
      <div class="sub mt center">✍️ Trace-la — la main grave ce que l'œil oublie :</div>
      ${traceHtml(l[1])}
    </div>
    <button class="btn ghost" onclick="setView('ecrire')">Retour</button>`;
  initTrace();
}
/* Quiz arabizi */
let Z = null;
function startZQuiz() {
  const items = ARABIZI.slice().sort(() => Math.random() - .5).slice(0, 6).map(z => {
    const wrong = ARABIZI.filter(x => x.n !== z.n).sort(() => Math.random() - .5).slice(0, 2);
    const opts = [z, ...wrong].sort(() => Math.random() - .5);
    return { q: `En arabizi, le <b style="font-size:22px;color:var(--accent)">${z.n}</b> représente…`, opts, correct: opts.indexOf(z), why: `${z.n} = ${z.ar} — ${z.son}. Ex : ${z.ex}` };
  });
  Z = { items, k: 0, correct: 0, answered: false }; renderZ();
}
function renderZ() {
  if (Z.k >= Z.items.length) return finishZ();
  const it = Z.items[Z.k]; Z.answered = false;
  app.innerHTML = `
    <div class="qmeta"><span>✍️ Arabizi</span><span>${Z.k + 1}/${Z.items.length}</span></div>
    <div class="pbar mb"><i style="width:${Z.k / Z.items.length * 100}%"></i></div>
    <div style="font-size:18px;font-weight:700;margin:8px 0 14px">${it.q}</div>
    <div id="opts">${it.opts.map((o, k) => `<button class="opt" onclick="answerZ(${k})"><b class="ar" style="font-size:24px">${o.ar}</b> &nbsp; <span class="sub">${o.son}</span></button>`).join('')}</div>
    <div id="after"></div>
    <div class="mt"><button class="btn ghost" onclick="setView('ecrire')">Quitter</button></div>`;
}
function answerZ(k) {
  if (Z.answered) return; Z.answered = true;
  const it = Z.items[Z.k], ok = k === it.correct;
  document.querySelectorAll('#opts .opt').forEach((b, i) => { b.setAttribute('disabled', ''); if (i === it.correct) b.classList.add('good'); else if (i === k) b.classList.add('bad'); else b.classList.add('dim'); });
  if (ok) Z.correct++;
  const last = Z.k === Z.items.length - 1;
  document.getElementById('after').innerHTML = `<div class="expl ${ok ? '' : 'warn'}">${ok ? '✅ ' : '❌ '}${it.why}</div>
    <button class="btn mt" onclick="${last ? 'finishZ()' : 'nextZ()'}">${last ? 'Résultat' : 'Suivant'}</button>`;
}
function nextZ() { Z.k++; renderZ(); }
function finishZ() {
  const pct = Math.round(Z.correct / Z.items.length * 100);
  if (Z.correct >= 4) { addXp(20); S.daily.ecrire++; save(); }
  app.innerHTML = `<div class="card big"><div class="em">✍️</div><div class="score" style="color:${Z.correct >= 4 ? 'var(--good)' : 'var(--accent)'}">${pct}%</div>
    <div class="lab">${Z.correct}/${Z.items.length}</div>
    <div class="mt sub">${Z.correct >= 4 ? '+20 XP — tu peux leur écrire.' : 'Relis le tableau et refais-le.'}</div></div>
    <button class="btn" onclick="startZQuiz()">Refaire</button>
    <button class="btn ghost mt" onclick="setView('ecrire')">Retour</button>`;
}
/* Drill alphabet */
let A = null;
function startAQuiz() {
  const items = ALPHABET.slice().sort(() => Math.random() - .5).slice(0, 10).map(l => {
    const forms = [l[1], l[2], l[3], l[4]];
    const shown = forms[Math.floor(Math.random() * 4)];
    // distracteurs : la même famille d'abord — confondre ب et ت est la vraie difficulté, pas ب et م
    const famD = (famOf(l[0]) || []).filter(n => n !== l[0]).map(n => ALPHABET.find(a => a[0] === n));
    const others = ALPHABET.filter(x => x[0] !== l[0] && !famD.includes(x)).sort(() => Math.random() - .5);
    const wrong = [...famD, ...others].slice(0, 2);
    const opts = [l, ...wrong].sort(() => Math.random() - .5);
    return { shown, opts, correct: opts.indexOf(l), why: `${l[0]} — son « ${l[5]} »${l[6] ? '. ' + l[6] : ''}` };
  });
  A = { items, k: 0, correct: 0, answered: false }; renderA();
}
function renderA() {
  if (A.k >= A.items.length) return finishA();
  const it = A.items[A.k]; A.answered = false;
  app.innerHTML = `
    <div class="qmeta"><span>🔤 Reconnaissance</span><span>${A.k + 1}/${A.items.length}</span></div>
    <div class="pbar mb"><i style="width:${A.k / A.items.length * 100}%"></i></div>
    <div class="glyphbig ar">${it.shown}</div>
    <div class="center sub mb">Quelle lettre est-ce ?</div>
    <div id="opts">${it.opts.map((o, k) => `<button class="opt" onclick="answerA(${k})"><b>${o[0]}</b> <span class="sub">— son « ${o[5]} »</span></button>`).join('')}</div>
    <div id="after"></div>
    <div class="mt"><button class="btn ghost" onclick="setView('ecrire')">Quitter</button></div>`;
}
function answerA(k) {
  if (A.answered) return; A.answered = true;
  const it = A.items[A.k], ok = k === it.correct;
  document.querySelectorAll('#opts .opt').forEach((b, i) => { b.setAttribute('disabled', ''); if (i === it.correct) b.classList.add('good'); else if (i === k) b.classList.add('bad'); else b.classList.add('dim'); });
  if (ok) A.correct++;
  const last = A.k === A.items.length - 1;
  document.getElementById('after').innerHTML = `<div class="expl ${ok ? '' : 'warn'}">${ok ? '✅ ' : '❌ '}${it.why}</div>
    <button class="btn mt" onclick="${last ? 'finishA()' : 'nextA()'}">${last ? 'Résultat' : 'Suivant'}</button>`;
}
function nextA() { A.k++; renderA(); }
function finishA() {
  if (A.correct > (S.alphaBest || 0)) { S.alphaBest = A.correct; toast(`🏆 Record : ${A.correct}/10`); }
  if (A.correct >= 6) { addXp(20); S.daily.ecrire++; }
  save();
  app.innerHTML = `<div class="card big"><div class="em">🔤</div><div class="score" style="color:${A.correct >= 6 ? 'var(--good)' : 'var(--accent)'}">${A.correct}/10</div>
    <div class="lab">record : ${S.alphaBest}/10</div>
    <div class="mt sub">${A.correct >= 6 ? '+20 XP' : 'Revois les lettres et refais-le.'}</div></div>
    <button class="btn" onclick="startAQuiz()">Refaire</button>
    <button class="btn ghost mt" onclick="setView('ecrire')">Retour</button>`;
}

/* ---------- Utils ---------- */
let tT;
function toast(m) { const e = document.getElementById('toast'); e.innerHTML = m; e.classList.add('show'); clearTimeout(tT); tT = setTimeout(() => e.classList.remove('show'), 2400); }

/* ---------- Boot ---------- */
resetDay();
render();
setTimeout(() => { pickVoice(); if (view === 'sons' || view === 'mots') render(); }, 600);
if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});


/* ================= DOJO ALPHABET : mnémo + SRS + tracé ================= */
function famOf(name){ for(const f of AFAM){ if(f.includes(name)) return f; } return null; }
function alphaState(i){ return (S.alpha=S.alpha||{})[i]; }
function alphaDue(){ const t=todayStr(), out=[]; for(const i in (S.alpha||{})) if(S.alpha[i].due<=t) out.push(+i); return out; }
/* nouvelles lettres : par FAMILLE (le squelette s'apprend d'un bloc) */
const ALPHA_ORDER=(()=>{ const seen=new Set(), out=[];
  ALPHABET.forEach((l,i)=>{ if(seen.has(i)) return;
    const fam=famOf(l[0]);
    if(fam) fam.forEach(n=>{ const j=ALPHABET.findIndex(x=>x[0]===n); if(!seen.has(j)){ out.push(j); seen.add(j); } });
    else { out.push(i); seen.add(i); } });
  return out; })();
function alphaNew(cap){
  if(!S.alphaNew||S.alphaNew.date!==todayStr()) S.alphaNew={date:todayStr(),n:0};
  const left=Math.max(0,cap-S.alphaNew.n), out=[];
  for(const i of ALPHA_ORDER){ if(out.length>=left) break; if(!alphaState(i)) out.push(i); }
  return out;
}
function rateAlpha(i,q){ // 0 encore · 2 bien
  let c=alphaState(i);
  if(!c) c=(S.alpha[i]={ef:2.5,ivl:0,reps:0,due:todayStr(),lapses:0});
  const ad=n=>{ const d=new Date(Date.now()+n*864e5); return d.toISOString().slice(0,10); };
  if(q===0){ c.lapses++; c.reps=0; c.ivl=0; c.ef=Math.max(1.3,c.ef-0.2); c.due=ad(1); }
  else { c.reps++; c.ivl=c.reps===1?1:c.reps===2?3:Math.round(c.ivl*c.ef); c.due=ad(c.ivl); }
  save();
}
function alphaMastered(){ return Object.values(S.alpha||{}).filter(c=>(c.ivl||0)>=21).length; }

/* ---- tracé au doigt ---- (hidden=true : modèle caché, pour l'écriture de mémoire) */
function traceHtml(glyph, hidden){
  return `<div class="trace" style="position:relative;width:230px;height:230px;margin:10px auto;border:1.5px solid var(--line);border-radius:14px;background:var(--card2);overflow:hidden">
    <div id="trGhost" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:150px;color:var(--accent);opacity:${hidden?'0':'.16'};pointer-events:none;font-family:inherit" class="ar">${glyph}</div>
    <canvas id="trCv" width="230" height="230" style="position:absolute;inset:0;touch-action:none"></canvas>
  </div>
  <div class="center">
    <button class="btn ghost" style="display:inline-block;width:auto;padding:8px 14px" onclick="trClear()">🧽 Effacer</button>
    <button class="btn ghost" style="display:inline-block;width:auto;padding:8px 14px" onclick="trGhostTog()">👁 Modèle</button>
  </div>`;
}
function initTrace(){
  const cv=document.getElementById('trCv'); if(!cv) return;
  const ctx=cv.getContext('2d');
  ctx.lineWidth=7; ctx.lineCap='round'; ctx.lineJoin='round'; ctx.strokeStyle='#e8b04b';
  let on=false;
  const pos=e=>{ const r=cv.getBoundingClientRect(); return [e.clientX-r.left,e.clientY-r.top]; };
  cv.onpointerdown=e=>{ on=true; const [x,y]=pos(e); ctx.beginPath(); ctx.moveTo(x,y); e.preventDefault(); };
  cv.onpointermove=e=>{ if(!on) return; const [x,y]=pos(e); ctx.lineTo(x,y); ctx.stroke(); e.preventDefault(); };
  cv.onpointerup=cv.onpointerleave=()=>{ on=false; };
}
function trClear(){ const cv=document.getElementById('trCv'); if(cv) cv.getContext('2d').clearRect(0,0,230,230); }
function trGhostTog(){ const g=document.getElementById('trGhost'); if(g) g.style.opacity=g.style.opacity==='0'?'.16':'0'; }

/* ================= L'ATELIER — lire & écrire (SM-2) =================
   Un seul store SM-2 (S.alpha). Chaque lettre due est révisée avec le
   TYPE de carte adapté à sa maturité :
     • intro : présentation + tracé guidé (nouvelle lettre)
     • read  : forme au hasard → quel son ? (lecture / reconnaissance)
     • write : « écris le son X » → canvas VIDE → révèle le modèle (écriture de mémoire)
     • word  : déchiffre un vrai mot qui contient la lettre (lecture en contexte)
   Plus une lettre est mûre, plus elle passe en 'word' (lecture réelle).   */
const AR_BASE = ALPHABET.map(l => l[1]);
const AR_SET = new Set(AR_BASE);
function decodable(ar){ for(const ch of ar){ if(ch===' ') continue; if(!AR_SET.has(ch)) return false; } return true; }
const READ_WORDS = MOTS.filter(m => { const n=[...m[2]].filter(c=>c!==' ').length; return decodable(m[2]) && n>=2 && n<=5; });
function wordForLetter(i){ const g=ALPHABET[i][1], pool=READ_WORDS.filter(m=>m[2].indexOf(g)>=0); return pool.length?pool[Math.floor(Math.random()*pool.length)]:null; }
function decompose(ar){ return [...ar].filter(c=>c!==' ').map(ch=>{ const l=ALPHABET.find(a=>a[1]===ch); return {g:ch, nom:l?l[0]:'?', son:l?l[5]:'?'}; }); }
function letterMaturity(i){ const c=alphaState(i); if(!c) return 0; const iv=c.ivl||0; return iv>=21?3:iv>=6?2:1; }
function pickCardMode(i){
  if(letterMaturity(i)>=2 && wordForLetter(i)) return Math.random()<.45 ? 'word' : (Math.random()<.5?'read':'write');
  return Math.random()<.5 ? 'read' : 'write';
}
const AT_LABEL = { intro:'nouvelle lettre', read:'lire', write:'écrire de mémoire', word:'lire un mot' };

let AT=null;
function startAtelier(marathon){
  let queue;
  if(marathon){
    const seen=Object.keys(S.alpha||{}).map(Number);
    queue=[];
    ALPHA_ORDER.filter(i=>!alphaState(i)).slice(0, seen.length?2:6).forEach(i=>queue.push({i,mode:'intro'}));
    if(seen.length) for(let n=0;n<18;n++){ const i=seen[Math.floor(Math.random()*seen.length)]; queue.push({i,mode:pickCardMode(i)}); }
  } else {
    const due=alphaDue().sort(()=>Math.random()-.5), news=alphaNew(5);
    queue=[...due.map(i=>({i,mode:pickCardMode(i)})), ...news.map(i=>({i,mode:'intro'}))];
  }
  if(!queue.length){ toast('Alphabet à jour — reviens quand des lettres seront dues, ou lance le Marathon 🎉'); return; }
  AT={queue,k:0,good:0,marathon:!!marathon};
  window.scrollTo(0,0); renderAT();
}
function atHead(mode){ return `<div class="qmeta"><span>🖋️ L'Atelier · ${AT_LABEL[mode]}</span><span>${AT.k+1}/${AT.queue.length}</span></div>`; }
function renderAT(){
  if(AT.k>=AT.queue.length) return finishAT();
  const it=AT.queue[AT.k], l=ALPHABET[it.i];
  if(it.mode==='intro') return renderAtIntro(it,l);
  if(it.mode==='write') return renderAtWrite(it,l);
  if(it.mode==='word')  return renderAtWord(it,l);
  return renderAtRead(it,l);
}
function renderAtIntro(it,l){
  const fam=famOf(l[0]), ex=letterExample(it.i);
  app.innerHTML=atHead('intro')+`
    <div class="card">
      <div class="glyphbig ar">${l[1]}</div>
      <div class="center"><b style="font-size:19px">${l[0]}</b> · <span class="pill">son : ${l[5]}</span></div>
      <div class="expl mt">💡 ${MNEMO[l[0]]||''}</div>
      ${fam?`<div class="sub mt center">Sa famille (même squelette, seuls les points changent) :</div>
      <div class="forms">${fam.map(n=>{const x=ALPHABET.find(a=>a[0]===n);return `<div class="fcell"><div class="g ar">${x[1]}</div><div class="l">${x[5]}</div></div>`;}).join('')}</div>`:''}
      <div class="forms mt">
        <div class="fcell"><div class="g ar">${l[1]}</div><div class="l">isolée</div></div>
        <div class="fcell"><div class="g ar">${l[2]}</div><div class="l">début</div></div>
        <div class="fcell"><div class="g ar">${l[3]}</div><div class="l">milieu</div></div>
        <div class="fcell"><div class="g ar">${l[4]}</div><div class="l">fin</div></div>
      </div>
      ${ex?`<div class="wordcard mt"><div class="sub" style="font-size:11px">Elle apparaît dans :</div><div class="w ar">${ex.ar}</div><div class="t">${ex.az}</div><div class="f">${ex.fr}</div></div>`:''}
      <div class="sub mt center">✍️ Trace-la avec le modèle — juste après, tu l'écriras de mémoire :</div>
      ${traceHtml(l[1])}
    </div>
    <button class="btn" onclick="atIntroDone()">Je l'ai vue — on s'entraîne →</button>
    <button class="btn ghost mt" onclick="quitAtelier()">Quitter</button>`;
  initTrace();
}
function atIntroDone(){
  const it=AT.queue[AT.k];
  rateAlpha(it.i,2);
  if(!S.alphaNew||S.alphaNew.date!==todayStr()) S.alphaNew={date:todayStr(),n:0};
  S.alphaNew.n++; addXp(4); save();
  AT.queue.splice(Math.min(AT.k+3,AT.queue.length),0,{i:it.i,mode:'write',fresh:true});
  AT.k++; renderAT();
}
function renderAtRead(it,l){
  const fam=(famOf(l[0])||[]).filter(n=>n!==l[0]).map(n=>ALPHABET.find(a=>a[0]===n));
  const others=ALPHABET.filter(a=>a[0]!==l[0]&&!fam.includes(a)).sort(()=>Math.random()-.5);
  const opts=[l,...[...fam,...others].slice(0,3)].sort(()=>Math.random()-.5);
  const shown=[l[1],l[2],l[3],l[4]][Math.floor(Math.random()*4)];
  AT.cur={l,correct:opts.indexOf(l)};
  app.innerHTML=atHead('read')+`
    <div class="glyphbig ar">${shown}</div>
    <div class="center sub mb">Lis : quel son fait cette lettre ?</div>
    <div id="opts">${opts.map((o,k)=>`<button class="opt" onclick="atAnswer(${k})"><b style="color:var(--accent)">${o[5]}</b> <span class="sub">— ${o[0]}</span></button>`).join('')}</div>
    <div id="after"></div>
    <div class="mt"><button class="btn ghost" onclick="quitAtelier()">Quitter</button></div>`;
}
function atAnswer(k){
  const it=AT.queue[AT.k], ok=k===AT.cur.correct, l=AT.cur.l;
  document.querySelectorAll('#opts .opt').forEach((b,i)=>{ b.setAttribute('disabled',''); if(i===AT.cur.correct)b.classList.add('good'); else if(i===k)b.classList.add('bad'); else b.classList.add('dim'); });
  if(!it.fresh) rateAlpha(it.i, ok?2:0);
  if(ok) AT.good++; addXp(ok?2:1);
  document.getElementById('after').innerHTML=`<div class="expl ${ok?'':'warn'} mt">${ok?'✓':'✗'} <b>${l[0]}</b> — son « ${l[5]} »${MNEMO[l[0]]?'. '+MNEMO[l[0]]:''}</div>
    <button class="btn mt" onclick="atNext(${ok?1:0})">Continuer</button>`;
}
function renderAtWrite(it,l){
  app.innerHTML=atHead('write')+`
    <div class="card">
      <div class="center" style="font-size:19px;font-weight:800;margin:6px 0 2px">Écris la lettre qui fait « <span style="color:var(--accent)">${l[5]}</span> »</div>
      <div class="center sub mb">${l[0]} — <b style="color:var(--txt)">de mémoire</b>, sans regarder le modèle</div>
      ${traceHtml(l[1], true)}
    </div>
    <div id="wrate"><button class="btn" onclick="atWriteReveal()">Voir le modèle & comparer</button></div>
    <button class="btn ghost mt" onclick="quitAtelier()">Quitter</button>`;
  initTrace();
}
function atWriteReveal(){
  const g=document.getElementById('trGhost'); if(g) g.style.opacity='.3';
  document.getElementById('wrate').innerHTML=`
    <div class="expl mt center">Compare ton tracé au modèle. Sois honnête — c'est ça qui grave.</div>
    <div class="srsrow" style="grid-template-columns:1fr 1fr">
      <button class="again" onclick="atSelfRate(0)">Raté ✗</button>
      <button class="easy" onclick="atSelfRate(2)">Réussi ✓</button></div>`;
}
function renderAtWord(it,l){
  const w=it.word||(it.word=wordForLetter(it.i));
  if(!w){ AT.queue[AT.k]={i:it.i,mode:'read'}; return renderAT(); }
  AT.cur={l,word:w};
  app.innerHTML=atHead('word')+`
    <div class="card">
      <div class="center sub">Déchiffre ce mot à voix haute, lettre par lettre :</div>
      <div class="glyphbig ar" style="font-size:60px">${w[2]}</div>
      <div class="center sub">il contient le <b class="ar" style="color:var(--accent);font-size:18px">${l[1]}</b> (${l[5]})</div>
      <div id="wordback" class="hidden">
        <div class="sub mt center">Dans l'ordre de lecture :</div>
        <div class="forms">${decompose(w[2]).map((d,n)=>`<div class="fcell"><div class="l" style="color:var(--dim)">${n+1}</div><div class="g ar">${d.g}</div><div class="l">${d.son}</div></div>`).join('')}</div>
        <div class="wordcard mt"><div class="t">${w[0]}</div><div class="f">${w[1]}</div><button class="spk" onclick="speak('${w[2]}')">🔊</button></div>
      </div>
    </div>
    <div id="wrate"><button class="btn" onclick="atWordReveal()">Vérifier ma lecture</button></div>
    <button class="btn ghost mt" onclick="quitAtelier()">Quitter</button>`;
}
function atWordReveal(){
  document.getElementById('wordback').classList.remove('hidden');
  speak(AT.cur.word[2]);
  document.getElementById('wrate').innerHTML=`
    <div class="srsrow" style="grid-template-columns:1fr 1fr">
      <button class="again" onclick="atSelfRate(0)">J'ai galéré ✗</button>
      <button class="easy" onclick="atSelfRate(2)">Lu ✓</button></div>`;
}
function atSelfRate(q){
  const it=AT.queue[AT.k];
  if(!it.fresh) rateAlpha(it.i, q);
  if(q===2) AT.good++; addXp(q===2?3:1);
  atNext(q===2?1:0);
}
function atNext(ok){
  const it=AT.queue[AT.k];
  if(!ok && !it.fresh) AT.queue.splice(Math.min(AT.k+4,AT.queue.length),0,{i:it.i,mode:it.mode==='word'?'read':it.mode,fresh:true});
  AT.k++; renderAT();
}
function quitAtelier(){ AT=null; setView('ecrire'); }
function finishAT(){
  S.daily.ecrire++; save();
  const total=AT.queue.length, good=AT.good, marathon=AT.marathon; AT=null;
  app.innerHTML=`
    <div class="card big">
      <div class="em">🖋️</div>
      <div class="score" style="color:var(--good)">${good}/${total}</div>
      <div class="lab">cartes lues & écrites</div>
      <div class="mt sub">Tu as lu, écrit de mémoire et déchiffré de vrais mots. ${alphaMastered()?alphaMastered()+' lettre(s) gravée(s) (intervalle ≥ 3 semaines).':'Le rappel espacé fait le reste — reviens demain.'}</div>
    </div>
    <button class="btn" onclick="startAtelier(${marathon})">${marathon?'Encore un marathon 🏃':'Refaire'}</button>
    <button class="btn ghost mt" onclick="setView('ecrire')">Terminé</button>`;
}


/* ================= PARLER : fabriquer des phrases ================= */
/* Le cœur du parcours : on n'apprend pas des mots, on fabrique des
   phrases. Un « moule » (bghit ___) génère des dizaines de phrases ;
   les « expressions » sont des blocs qu'on sort tels quels.        */
function renderParler(){
  const moules=BLOCS.filter(b=>b.kind==='moule'), exprs=BLOCS.filter(b=>b.kind==='expr');
  app.innerHTML=`
    <div class="card" style="border-color:var(--accent)">
      <h2>💬 Parler — fabrique des phrases</h2>
      <div class="sub mt">La règle d'or : <b style="color:var(--txt)">on ne mémorise pas des mots, on fabrique des phrases.</b>
      Pas <i>bghit = vouloir</i>, mais <b style="color:var(--accent)">bghit qahwa</b> = je veux un café,
      <b style="color:var(--accent)">bghit nemshi</b> = je veux partir, <b style="color:var(--accent)">ma bghitsh</b> = je ne veux pas.</div>
    </div>
    <div class="card"><h2 style="font-size:14px">🧱 Les moules — une structure = dix phrases</h2>
      <div class="sub">Tu gardes le début, tu changes la fin.</div></div>
    ${moules.map(tileBloc).join('')}
    <div class="card mt"><h2 style="font-size:14px">🗣️ Les expressions — à sortir telles quelles</h2></div>
    ${exprs.map(tileBloc).join('')}
    ${audioWarn()}
    ${TTS_NOTE}`;
}
function tileBloc(b){
  const n=b.kind==='moule'?(b.slots.length+(b.neg?1:0)):b.items.length;
  const sub=b.kind==='moule'?`<span class="ar" style="color:var(--accent)">${b.stem.ar}</span> ${b.stem.az} ___ · ${n} phrases`:`${n} expressions`;
  return `<button class="tile" onclick="FROM_SESSION=false;startPhrase('${b.kind}','${b.id}')">
    <div class="ic">${b.kind==='moule'?'🧱':'🗣️'}</div>
    <div class="body"><div class="t">${b.t}</div><div class="d">${sub}</div></div>
    <div class="badge zero">${n}</div></button>`;
}

let P=null;
function startPhrase(kind,id){
  const b=BLOCS.find(x=>x.id===id); if(!b){ toast('Bloc introuvable'); return; }
  let targets;
  if(kind==='moule'){
    targets=b.slots.map(s=>({fr:s.fr,az:s.full.az,ar:s.full.ar}));
    if(b.neg) targets.push({fr:b.neg.fr,az:b.neg.az,ar:b.neg.ar,neg:true});
  } else {
    targets=b.items.map(s=>({fr:s.fr,az:s.az,ar:s.ar}));
  }
  P={kind,b,targets,phase:'discover',i:0,quiz:null,qk:0,correct:0,answered:false,shown:false};
  window.scrollTo(0,0); renderPhrase();
}
function phraseStem(){
  if(P.kind!=='moule') return `<div class="card"><div class="sub">${P.b.note||''}</div></div>`;
  const s=P.b.stem;
  return `<div class="regle"><div class="rk"><span class="ar">${s.ar}</span> · ${s.az} ___ <span style="color:var(--muted);font-weight:600">= ${s.fr} ___</span></div>
    <div class="rx">${P.b.note}</div></div>`;
}
function renderPhrase(){
  if(P.phase==='discover'){
    if(P.i>=P.targets.length) return buildPhraseQuiz();
    const t=P.targets[P.i]; P.shown=false;
    app.innerHTML=`
      <div class="qmeta"><span>${P.kind==='moule'?'🧱':'🗣️'} ${P.b.t}</span><span>Découverte ${P.i+1}/${P.targets.length}</span></div>
      ${phraseStem()}
      <div class="flash" onclick="phraseFlip()">
        <div class="theme">Comment on dit…</div>
        <div class="front">${t.fr}</div>
        <div id="pback" class="hidden"><div class="back">${t.az}</div><div class="arw ar" style="margin-top:4px">${t.ar}</div></div>
        <div id="phint" class="tap">Dis-le à voix haute · touche pour vérifier</div>
      </div>
      <div id="pspk" class="center"></div>
      <div class="mt"><button class="btn ghost" onclick="quitPhrase()">Quitter</button></div>`;
  } else {
    if(P.qk>=P.quiz.length) return finishPhrase();
    const it=P.quiz[P.qk]; P.answered=false;
    app.innerHTML=`
      <div class="qmeta"><span>${P.kind==='moule'?'🧱':'🗣️'} ${P.b.t} · fabrique</span><span>${P.qk+1}/${P.quiz.length}</span></div>
      <div class="pbar mb"><i style="width:${P.qk/P.quiz.length*100}%"></i></div>
      <div class="center" style="font-size:19px;font-weight:800;margin:8px 0 16px">${it.fr}</div>
      <div id="opts">${it.opts.map((o,k)=>`<button class="opt" onclick="answerPhrase(${k})"><b style="color:var(--accent)">${o.az}</b> &nbsp;<span class="ar" style="color:var(--muted)">${o.ar}</span></button>`).join('')}</div>
      <div id="after"></div>
      <div class="mt"><button class="btn ghost" onclick="quitPhrase()">Quitter</button></div>`;
  }
}
function phraseFlip(){
  if(P.shown) return; P.shown=true;
  const t=P.targets[P.i];
  document.getElementById('pback').classList.remove('hidden');
  document.getElementById('phint').classList.add('hidden');
  speak(t.ar);
  document.getElementById('pspk').innerHTML=`<button class="spk" onclick="speak('${t.ar}')">🔊</button>
    <div class="srsrow" style="grid-template-columns:1fr 1fr"><button class="again" onclick="phraseAgain()">À revoir</button><button class="easy" onclick="phraseNext()">Je l'ai ✓</button></div>`;
}
function phraseAgain(){ P.targets.push(P.targets[P.i]); phraseNext(); }
function phraseNext(){ P.i++; renderPhrase(); }
function buildPhraseQuiz(){
  const pool=P.targets;
  P.quiz=pool.slice().sort(()=>Math.random()-.5).slice(0,Math.min(6,pool.length)).map(t=>{
    const wrong=pool.filter(x=>x.az!==t.az).sort(()=>Math.random()-.5).slice(0,3);
    const opts=[t,...wrong].sort(()=>Math.random()-.5);
    return {fr:t.fr,ar:t.ar,opts,correct:opts.indexOf(t)};
  });
  P.phase='quiz'; P.qk=0; P.correct=0; renderPhrase();
}
function answerPhrase(k){
  if(P.answered) return; P.answered=true;
  const it=P.quiz[P.qk], ok=k===it.correct;
  document.querySelectorAll('#opts .opt').forEach((b,i)=>{ b.setAttribute('disabled',''); if(i===it.correct)b.classList.add('good'); else if(i===k)b.classList.add('bad'); else b.classList.add('dim'); });
  if(ok) P.correct++;
  speak(it.ar);
  const last=P.qk===P.quiz.length-1;
  document.getElementById('after').innerHTML=`<div class="expl ${ok?'':'warn'}">${ok?'✅ ':'❌ '}<b>${it.opts[it.correct].az}</b> — ${it.fr}</div>
    <button class="btn mt" onclick="${last?'finishPhrase()':'nextPhrase()'}">${last?'Résultat':'Suivant'}</button>`;
}
function nextPhrase(){ P.qk++; renderPhrase(); }
function quitPhrase(){ if(FROM_SESSION) backToSeance(); else setView('parler'); }
function finishPhrase(){
  const pct=P.quiz.length?Math.round(P.correct/P.quiz.length*100):100;
  const pass=P.correct>=Math.ceil(P.quiz.length*0.6);
  if(pass) addXp(15);
  markActDone();
  app.innerHTML=`<div class="card big"><div class="em">${pass?'💬':'🧱'}</div>
    <div class="score" style="color:${pass?'var(--good)':'var(--accent)'}">${pct}%</div>
    <div class="lab">${P.correct}/${P.quiz.length} phrase(s)</div>
    <div class="mt sub">${pass?'+15 XP — tu fabriques, tu ne récites pas. Maintenant, envoie-en une à un pote.':'Refais-le : vise 3 phrases sur 4 avant de passer.'}</div></div>
    ${sessBack()}
    <button class="btn ${FROM_SESSION?'sec':''}" onclick="startPhrase('${P.kind}','${P.b.id}')">Refaire</button>
    ${FROM_SESSION?'':`<button class="btn ghost mt" onclick="setView('parler')">Retour</button>`}`;
}


/* ================= LETTRES DU JOUR : alphabet en fond ================= */
/* 10 min max/jour : quelques lettres, leurs 4 formes, un mot connu qui
   les contient, un tracé au doigt, puis un mini-quiz de reconnaissance. */
let LT=null;
function letterExample(idx){ const g=ALPHABET[idx][1]; const m=MOTS.find(x=>x[2].indexOf(g)>=0); return m?{az:m[0],fr:m[1],ar:m[2]}:null; }
function startLetters(idxs,opts){
  opts=opts||{};
  LT={idxs:(idxs||[]).slice(),i:0,phase:opts.quizOnly?'quiz':'learn',quiz:null,qk:0,correct:0,answered:false};
  window.scrollTo(0,0);
  if(LT.phase==='quiz'){ buildLetterQuiz(); } else { renderLT(); }
}
function renderLT(){
  if(LT.phase==='learn'){
    if(LT.i>=LT.idxs.length) return buildLetterQuiz();
    const idx=LT.idxs[LT.i], l=ALPHABET[idx], ex=letterExample(idx);
    app.innerHTML=`
      <div class="qmeta"><span>✍️ Lettre ${LT.i+1}/${LT.idxs.length}</span><span>10 min/jour, pas plus</span></div>
      <div class="card">
        <div class="glyphbig ar">${l[1]}</div>
        <div class="center"><b style="font-size:19px">${l[0]}</b> · <span class="pill">son : ${l[5]}</span></div>
        ${MNEMO[l[0]]?`<div class="expl mt">💡 ${MNEMO[l[0]]}</div>`:''}
        <div class="sub mt center">Ses 4 formes selon la position :</div>
        <div class="forms">
          <div class="fcell"><div class="g ar">${l[1]}</div><div class="l">isolée</div></div>
          <div class="fcell"><div class="g ar">${l[2]}</div><div class="l">début</div></div>
          <div class="fcell"><div class="g ar">${l[3]}</div><div class="l">milieu</div></div>
          <div class="fcell"><div class="g ar">${l[4]}</div><div class="l">fin</div></div>
        </div>
        ${ex?`<div class="wordcard mt"><div class="sub" style="font-size:11px">On la retrouve dans un mot que tu connais :</div>
          <div class="w ar">${ex.ar}</div><div class="t">${ex.az}</div><div class="f">${ex.fr}</div>
          <button class="spk" onclick="speak('${ex.ar}')">🔊</button></div>`:''}
        <div class="sub mt center">✍️ Trace-la — la main grave ce que l'œil oublie :</div>
        ${traceHtml(l[1])}
      </div>
      <button class="btn" onclick="ltNext()">${LT.i===LT.idxs.length-1?'Petit quiz →':'Lettre suivante →'}</button>
      <button class="btn ghost mt" onclick="quitLetters()">Quitter</button>`;
    initTrace();
  } else {
    if(LT.qk>=LT.quiz.length) return finishLetters();
    const it=LT.quiz[LT.qk]; LT.answered=false;
    app.innerHTML=`
      <div class="qmeta"><span>✍️ Reconnais la lettre</span><span>${LT.qk+1}/${LT.quiz.length}</span></div>
      <div class="pbar mb"><i style="width:${LT.qk/LT.quiz.length*100}%"></i></div>
      <div class="glyphbig ar">${it.shown}</div>
      <div class="center sub mb">Quelle lettre / quel son ?</div>
      <div id="opts">${it.opts.map((o,k)=>`<button class="opt" onclick="answerLT(${k})"><b>${o[0]}</b> <span class="sub">— son « ${o[5]} »</span></button>`).join('')}</div>
      <div id="after"></div>
      <div class="mt"><button class="btn ghost" onclick="quitLetters()">Quitter</button></div>`;
  }
}
function ltNext(){ LT.i++; renderLT(); }
function buildLetterQuiz(){
  LT.quiz=LT.idxs.slice().sort(()=>Math.random()-.5).map(idx=>{
    const l=ALPHABET[idx], forms=[l[1],l[2],l[3],l[4]], shown=forms[Math.floor(Math.random()*4)];
    const fam=(famOf(l[0])||[]).filter(n=>n!==l[0]).map(n=>ALPHABET.find(a=>a[0]===n));
    const others=ALPHABET.filter(a=>a[0]!==l[0]&&!fam.includes(a)).sort(()=>Math.random()-.5);
    const wrong=[...fam,...others].slice(0,3);
    const opts=[l,...wrong].sort(()=>Math.random()-.5);
    return {shown,opts,correct:opts.indexOf(l)};
  }).slice(0,8);
  LT.phase='quiz'; LT.qk=0; LT.correct=0; renderLT();
}
function answerLT(k){
  if(LT.answered) return; LT.answered=true;
  const it=LT.quiz[LT.qk], ok=k===it.correct, l=it.opts[it.correct];
  document.querySelectorAll('#opts .opt').forEach((b,i)=>{ b.setAttribute('disabled',''); if(i===it.correct)b.classList.add('good'); else if(i===k)b.classList.add('bad'); else b.classList.add('dim'); });
  if(ok) LT.correct++;
  const last=LT.qk===LT.quiz.length-1;
  document.getElementById('after').innerHTML=`<div class="expl ${ok?'':'warn'}">${ok?'✅ ':'❌ '}<b>${l[0]}</b> — son « ${l[5]} »${l[6]?'. '+l[6]:''}</div>
    <button class="btn mt" onclick="${last?'finishLetters()':'nextLT()'}">${last?'Résultat':'Suivant'}</button>`;
}
function nextLT(){ LT.qk++; renderLT(); }
function quitLetters(){ if(FROM_SESSION) backToSeance(); else setView('ecrire'); }
function finishLetters(){
  const pct=LT.quiz.length?Math.round(LT.correct/LT.quiz.length*100):100;
  if(LT.correct>=Math.ceil(LT.quiz.length*0.6)) addXp(15);
  S.daily.ecrire++; markActDone();
  app.innerHTML=`<div class="card big"><div class="em">✍️</div>
    <div class="score" style="color:var(--good)">${pct}%</div><div class="lab">${LT.correct}/${LT.quiz.length}</div>
    <div class="mt sub">Les lettres rentrent par petites touches. Pour les graver sur la durée, le <b style="color:var(--txt)">Dojo alphabet</b> (onglet Écrire) prend le relais avec la répétition espacée.</div></div>
    ${sessBack()}
    <button class="btn ${FROM_SESSION?'sec':''}" onclick="startLetters([${LT.idxs.join(',')}],{quizOnly:true})">Refaire le quiz</button>
    ${FROM_SESSION?'':`<button class="btn ghost mt" onclick="setView('ecrire')">Retour</button>`}`;
}


/* ================= BILAN de fin de semaine ================= */
function renderBilan(day){
  const say=[
    ['Saluer',        'salam · sba7 lkhir',                 'سلام'],
    ['Demander',      'kif dayr? / kif dayra? · labas?',    'كيف داير؟'],
    ['Te présenter',  'ana... · smiti... · ana men fransa', 'سميتي'],
    ['Vouloir',       'bghit qahwa · bghit nemshi · ma bghitsh','بغيت'],
    ['Avoir',         '3ndi lwqt · 3ndi flus · ma 3ndish',  'عندي'],
    ['Te sauver',     'ma fhemtsh · 3awed 3afak · ma kan3refsh','ما فهمتش']
  ];
  app.innerHTML=`
    <div class="qmeta"><span>🏁 Bilan · Semaine 1</span><span>Jour ${day}</span></div>
    <div class="card" style="border-color:var(--accent)">
      <h2>Tu tiens déjà deux minutes</h2>
      <div class="sub mt">Lis chaque ligne <b style="color:var(--txt)">à voix haute</b>, comme si tu parlais à un pote. Si une phrase coince, retourne à son bloc dans 💬 Parler.</div>
    </div>
    ${say.map(s=>`<div class="vrow"><span class="vg ar">${s[2]}</span>
      <span class="vfr">${s[0]}<div class="sub" style="font-weight:600;color:var(--muted)">${s[1]}</div></span>
      <button class="spk sm" onclick="speak('${s[2]}')">🔊</button></div>`).join('')}
    <div class="card mt center sub">Objectif de la semaine atteint : <b style="color:var(--txt)">saluer → te présenter → dire ce que tu veux</b>. C'est déjà une conversation.</div>
    <button class="btn" onclick="finishBilan()">✅ J'ai tout dit à voix haute</button>
    ${FROM_SESSION?'':`<button class="btn ghost mt" onclick="setView('home')">Retour</button>`}`;
}
function finishBilan(){ addXp(20); markActDone(); if(FROM_SESSION) backToSeance(); else setView('home'); }
