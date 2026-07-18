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
  daily: { date: todayStr(), son: 0, cards: 0, ecrire: 0 },
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
  if (!S.daily || S.daily.date !== t) S.daily = { date: t, son: 0, cards: 0, ecrire: 0 };
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
function setView(v) { view = v; document.querySelectorAll('.nav button').forEach(b => b.classList.toggle('on', b.dataset.v === v)); render(); }
document.querySelectorAll('.nav button').forEach(b => b.addEventListener('click', () => setView(b.dataset.v)));

function render() {
  resetDay();
  document.getElementById('streak').textContent = S.streak;
  document.getElementById('hlevel').textContent = levelFromXp(S.xp).lv;
  document.querySelectorAll('.nav button').forEach(b => b.classList.toggle('on', b.dataset.v === view));
  window.scrollTo(0, 0);
  if (view === 'home') return renderHome();
  if (view === 'sons') return renderSons();
  if (view === 'mots') return renderMots();
  if (view === 'verbes') return renderVerbes();
  if (view === 'ecrire') return renderEcrire();
}
function esc(s) { return (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

function renderHome() {
  const L = levelFromXp(S.xp);
  const due = dueCards().length, nw = newAvailable(false).length;
  const d = S.daily;
  const goals = [
    ['🔊', 'Travailler un son', d.son >= 1, `${Math.min(d.son,1)}/1`],
    ['🃏', 'Réviser des mots', d.cards >= GOAL_CARDS, `${Math.min(d.cards, GOAL_CARDS)}/${GOAL_CARDS}`],
    ['✍️', 'Écrire (arabizi/alphabet)', d.ecrire >= 1, `${Math.min(d.ecrire,1)}/1`]
  ];
  const pct = Math.round(goals.filter(g => g[2]).length / 3 * 100);
  app.innerHTML = `
    ${S.firstRun ? `
    <div class="card" style="border-color:var(--accent)">
      <h2>Bienvenue — et deux bonnes nouvelles</h2>
      <div class="sub mt">Sur les 5 sons « impossibles » de l'arabe, <b style="color:var(--txt)">tu en possèdes déjà deux</b> :
      le <b class="ar" style="color:var(--accent)">خ</b> est la <i>jota</i> espagnole (jamón) et le
      <b class="ar" style="color:var(--accent)">غ</b> est ton <b>R français</b>. Tu ne pars pas de zéro.</div>
      <div class="sub mt">Ici on attaque par <b style="color:var(--txt)">les sons et l'oreille</b>, pas par l'alphabet — c'est là qu'est le vrai mur.
      Et tu pourras <b style="color:var(--txt)">écrire à tes potes dès cette semaine</b> grâce à l'arabizi, sans connaître une seule lettre.</div>
      <button class="btn mt" onclick="S.firstRun=false;save();setView('sons')">Commencer par les sons →</button>
    </div>` : ''}

    <div class="card">
      <div class="sub" style="text-transform:uppercase;letter-spacing:.07em;font-size:11px;font-weight:800">Objectif du jour · ${pct}%</div>
      <div class="pbar mb" style="margin-top:8px"><i style="width:${pct}%"></i></div>
      ${goals.map(g => `<div style="display:flex;align-items:center;gap:9px;padding:4px 0;font-size:14px">
        <span>${g[2] ? '✅' : '⬜️'}</span><span style="flex:1;color:${g[2] ? 'var(--txt)' : 'var(--muted)'}">${g[0]} ${g[1]}</span>
        <b style="font-size:12px;color:${g[2] ? 'var(--good)' : 'var(--muted)'}">${g[3]}</b></div>`).join('')}
    </div>

    <div class="card">
      <div class="sub" style="display:flex;justify-content:space-between"><span>Niveau ${L.lv}</span><span>${L.into}/${L.need} XP</span></div>
      <div class="pbar"><i style="width:${Math.round(L.into / L.need * 100)}%"></i></div>
      <div class="row2 mt">
        <div><div class="logo" style="font-size:22px">${sonsMastered()}/${SONS.length}</div><div class="sub">sons maîtrisés</div></div>
        <div><div class="logo" style="font-size:22px">${learned()}/${MOTS.length}</div><div class="sub">mots appris</div></div>
      </div>
    </div>

    <button class="tile" onclick="setView('sons')">
      <div class="ic">🔊</div>
      <div class="body"><div class="t">Les sons — le vrai mur</div><div class="d">7 sons, paliers étalés sur plusieurs jours</div></div>
      <div class="badge ${sonsMastered() === SONS.length ? '' : 'zero'}">${sonsMastered()}/${SONS.length}</div>
    </button>
    <button class="tile" onclick="setView('mots')">
      <div class="ic">🃏</div>
      <div class="body"><div class="t">Les mots du socle</div><div class="d">${due} à réviser · ${nw} nouveau(x)</div></div>
      <div class="badge ${(due + nw) === 0 ? 'zero' : ''}">${due + nw}</div>
    </button>
    <button class="tile" onclick="setView('ecrire')">
      <div class="ic">✍️</div>
      <div class="body"><div class="t">Écrire</div><div class="d">Arabizi (tout de suite) · alphabet (quand tu veux)</div></div>
      <div class="badge zero">${ALPHABET.length}</div>
    </button>

    <div class="card">
      <h2 style="font-size:15px">La route, sans mensonge</h2>
      <div class="sub mt">Comprendre des bribes : <b style="color:var(--txt)">~3 mois</b> · Conversation simple : <b style="color:var(--txt)">~8-12 mois</b> · Fluide au quotidien : <b style="color:var(--txt)">~2 ans</b>.
      À 30 min/jour <b style="color:var(--accent)">+ pratique réelle avec tes potes</b> — c'est eux, ton avantage. L'app ne remplace personne.</div>
    </div>`;
}

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
    <button class="btn ghost mt" onclick="setView('sons')">Retour</button>`;
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
  app.innerHTML = `
    <div class="card big">
      <div class="em">${pass ? (pct === 100 ? '🎯' : '👂') : '💪'}</div>
      <div class="score" style="color:${pass ? 'var(--good)' : 'var(--accent)'}">${pct}%</div>
      <div class="lab">${D.correct}/${D.items.length}</div>
      <div class="mt sub">${msg}</div>
    </div>
    <button class="btn" onclick="startDrill(${D.i})">Refaire</button>
    <button class="btn ghost mt" onclick="setView('sons')">Retour aux sons</button>`;
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
  app.innerHTML = `<div class="card big"><div class="em">🧠</div><div class="score" style="color:var(--good)">+${R.done}</div>
    <div class="lab">carte(s) travaillée(s)</div><div class="mt sub">Reviens demain : elles réapparaîtront au bon moment.</div></div>
    <button class="btn" onclick="setView('mots')">Terminé</button>`;
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
      <h2>🥋 Le Dojo alphabet</h2>
      <div class="sub mt">Le secret : <b style="color:var(--txt)">28 lettres = 18 squelettes + des points</b>. ب ت ث sont LA MÊME barque — seuls les points changent.
      Chaque lettre arrive avec son <b style="color:var(--txt)">image mnémo</b>, son <b style="color:var(--txt)">tracé au doigt</b>, et la répétition espacée fait le reste : 5 nouvelles par jour max, les anciennes reviennent pile quand tu vas les oublier.</div>
      ${(()=>{const d=alphaDue().length, n=alphaNew(5).length, m=alphaMastered(), seen=Object.keys(S.alpha||{}).length;
        return `<div class="pill mt">${d?d+' à réviser':'rien de dû'}</div> <div class="pill">${n} nouvelle${n>1?'s':''} dispo</div> <div class="pill ${m?'warn':''}">${seen}/28 vues${m?' · '+m+' gravées':''}</div>`;})()}
      <button class="btn mt" onclick="startAlphaDojo()">${Object.keys(S.alpha||{}).length?'Session alphabet':'Commencer l\'alphabet — famille par famille'}</button>
    </div>
    <div class="card mt">
      <h2>🔤 Les 28, en accès libre</h2>
      <div class="sub mt">Chacune change de forme selon sa place (isolée / début / milieu / fin) — ça fait peur et ça tombe en un mois. <b style="color:var(--txt)">Règle d'or : 6 lettres (ا د ذ ر ز و) ne s'attachent JAMAIS à la suivante.</b> Touche une lettre : mnémo, famille, tracé.</div>
      ${S.alphaBest ? `<div class="pill warn mt">Record reconnaissance : ${S.alphaBest}/10</div>` : ''}
    </div>
    <div class="agrid mb">${ALPHABET.map((l, i) => `<button class="acell" onclick="openLettre(${i})">
      <div class="g ar">${l[1]}</div><div class="s">${l[5]}</div><div class="n">${l[0]}</div></button>`).join('')}</div>
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

/* ---- tracé au doigt ---- */
function traceHtml(glyph){
  return `<div class="trace" style="position:relative;width:230px;height:230px;margin:10px auto;border:1.5px solid var(--line);border-radius:14px;background:var(--card2);overflow:hidden">
    <div id="trGhost" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:150px;color:var(--accent);opacity:.16;pointer-events:none;font-family:inherit" class="ar">${glyph}</div>
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

/* ---- session dojo ---- */
let AD=null;
function startAlphaDojo(){
  const due=alphaDue().sort(()=>Math.random()-.5);
  const news=alphaNew(5);
  const queue=[...due.map(i=>({i,mode:Math.random()<.5?'rec':'prod'})), ...news.map(i=>({i,mode:'intro'}))];
  if(!queue.length){ toast('Alphabet à jour — les lettres reviendront quand la mémoire en aura besoin 🎉'); return; }
  AD={queue,k:0,good:0,first:new Set()};
  renderAD();
}
function renderAD(){
  if(AD.k>=AD.queue.length) return finishAD();
  const it=AD.queue[AD.k], l=ALPHABET[it.i];
  if(it.mode==='intro'){
    const fam=famOf(l[0]);
    app.innerHTML=`
      <div class="qmeta"><span>🥋 Nouvelle lettre</span><span>${AD.k+1}/${AD.queue.length}</span></div>
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
        <div class="sub mt center">✍️ Trace-la 3 fois — la main grave ce que l'œil oublie :</div>
        ${traceHtml(l[1])}
      </div>
      <button class="btn" onclick="adIntroDone()">Je la connais — quiz !</button>`;
    initTrace();
    return;
  }
  /* quiz : distracteurs de la MÊME famille d'abord (la vraie difficulté), puis voisins */
  const fam=(famOf(l[0])||[]).filter(n=>n!==l[0]).map(n=>ALPHABET.find(a=>a[0]===n));
  const others=ALPHABET.filter(a=>a[0]!==l[0]&&!fam.includes(a)).sort(()=>Math.random()-.5);
  const distract=[...fam,...others].slice(0,3);
  const opts=[l,...distract].sort(()=>Math.random()-.5);
  AD.cur={l,opts,correct:opts.indexOf(l)};
  const forms=[l[1],l[2],l[3],l[4]], shown=forms[Math.floor(Math.random()*4)];
  if(it.mode==='rec'){
    app.innerHTML=`
      <div class="qmeta"><span>🥋 Alphabet · lecture</span><span>${AD.k+1}/${AD.queue.length}</span></div>
      <div class="glyphbig ar">${shown}</div>
      <div class="center sub mb">Quelle lettre ?</div>
      <div id="opts">${opts.map((o,k)=>`<button class="opt" onclick="answerAD(${k})"><b>${o[0]}</b> <span class="sub">— son « ${o[5]} »</span></button>`).join('')}</div>
      <div id="after"></div>`;
  } else {
    app.innerHTML=`
      <div class="qmeta"><span>🥋 Alphabet · écriture</span><span>${AD.k+1}/${AD.queue.length}</span></div>
      <div class="center" style="font-size:19px;font-weight:700;margin:14px 0">Laquelle fait « <span style="color:var(--accent)">${l[5]}</span> » (${l[0]}) ?</div>
      <div class="forms">${opts.map((o,k)=>`<button class="fcell opt" style="cursor:pointer" onclick="answerAD(${k})"><div class="g ar" style="font-size:44px">${o[1]}</div></button>`).join('')}</div>
      <div id="after"></div>`;
  }
}
function adIntroDone(){
  const it=AD.queue[AD.k];
  rateAlpha(it.i,2); S.alphaNew.n++; addXp(4); save();
  /* la nouvelle lettre repasse en quiz 3 positions plus loin, dans la même session */
  AD.queue.splice(Math.min(AD.k+4,AD.queue.length),0,{i:it.i,mode:'rec',fresh:true});
  AD.k++; renderAD();
}
function answerAD(k){
  const it=AD.queue[AD.k], ok=k===AD.cur.correct, l=AD.cur.l;
  document.querySelectorAll('#opts .opt, .forms .opt').forEach((b,i)=>{ b.setAttribute('disabled','');
    if(i===AD.cur.correct) b.classList.add('good'); else if(i===k) b.classList.add('bad'); else b.classList.add('dim'); });
  if(!it.fresh) rateAlpha(it.i, ok?2:0);
  if(ok) AD.good++;
  addXp(ok?2:1);
  const after=document.getElementById('after');
  after.innerHTML=`<div class="expl mt">${ok?'✓':'✗'} <b>${l[0]}</b> — ${MNEMO[l[0]]||l[6]||''}</div>
    <button class="btn mt" onclick="adNext(${ok?1:0})">Continuer</button>`;
}
function adNext(ok){
  const it=AD.queue[AD.k];
  if(!ok&&!it.fresh) AD.queue.splice(Math.min(AD.k+4,AD.queue.length),0,{i:it.i,mode:it.mode,fresh:true});
  AD.k++; renderAD();
}
function finishAD(){
  S.daily.ecrire++; save();
  const total=AD.queue.length, good=AD.good; AD=null;
  app.innerHTML=`
    <div class="card big">
      <div class="em">🥋</div>
      <div class="score" style="color:var(--good)">${good}/${total}</div>
      <div class="lab">cartes d'alphabet</div>
      <div class="mt sub">Les lettres ratées sont revenues dans la session, et la répétition espacée a pris date. ${alphaMastered()?alphaMastered()+' lettre(s) déjà gravée(s) (intervalle ≥ 3 semaines).':'Reviens demain : c\'est le rappel qui grave.'}</div>
    </div>
    <button class="btn" onclick="setView('ecrire')">Terminé</button>`;
}
