/* GymTrack — app privada de seguimiento de gimnasio (estilo FitNotes, 100% cliente) */
(function () {
  'use strict';

  var STORE_KEY = 'gymtrack_v1';
  var GROUPS = ['Pecho', 'Espalda', 'Piernas', 'Hombros', 'Bíceps', 'Tríceps', 'Core', 'Cardio'];
  var SEED = [
    ['Press de banca', 'Pecho'], ['Press inclinado', 'Pecho'], ['Aperturas', 'Pecho'], ['Fondos', 'Pecho'],
    ['Dominadas', 'Espalda'], ['Remo sentado', 'Espalda'], ['Jalón al pecho', 'Espalda'], ['Peso muerto', 'Espalda'],
    ['Sentadilla', 'Piernas'], ['Prensa de pierna', 'Piernas'], ['Extensiones', 'Piernas'], ['Curl femoral', 'Piernas'], ['Gemelos', 'Piernas'],
    ['Press militar', 'Hombros'], ['Elevaciones laterales', 'Hombros'], ['Pájaros', 'Hombros'],
    ['Curl de bíceps', 'Bíceps'], ['Curl martillo', 'Bíceps'], ['Curl concentrado', 'Bíceps'], ['Extensiones de tríceps', 'Tríceps'], ['Press francés', 'Tríceps'], ['Patada de tríceps', 'Tríceps'],
    ['Plancha', 'Core'], ['Crunch', 'Core'], ['Twist ruso', 'Core'],
    ['Cinta', 'Cardio', 'cardio'], ['Bicicleta', 'Cardio', 'cardio'], ['Elíptica', 'Cardio', 'cardio']
  ];

  var TABNAMES = { home: 'Inicio', library: 'Ejercicios', calendar: 'Calendario', measures: 'Medidas', theme: 'Tema', settings: 'Ajustes' };
  var TABICONS = {
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
    library: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><line x1="3" y1="9" x2="3" y2="15"/><line x1="21" y1="9" x2="21" y2="15"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="7" y1="6" x2="7" y2="18"/><line x1="17" y1="6" x2="17" y2="18"/></svg>',
    calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
    measures: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>',
    settings: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
    theme: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r="1.4"/><circle cx="17.5" cy="10.5" r="1.4"/><circle cx="8.5" cy="7.5" r="1.4"/><circle cx="6.5" cy="12.5" r="1.4"/><path d="M12 2a10 10 0 0 0 0 20c2.5 0 2.5-2.5 2.5-2.5 0-1.4-1-2-2-3s.5-3 2.5-3 3 1.5 3 3a10 10 0 0 0-3-16.5z"/></svg>'
  };

  /* ---------------- state ---------------- */
  function load() { try { var r = localStorage.getItem(STORE_KEY); return r ? JSON.parse(r) : null; } catch (e) { return null; } }
  function save() { try { localStorage.setItem(STORE_KEY, JSON.stringify(db)); } catch (e) {} }
  function seed() {
    var exercises = SEED.map(function (e, i) { return { id: 'ex' + i, name: e[0], muscle: e[1], type: e[2] || 'strength', note: '' }; });
    return {
      settings: { name: '', units: 'kg', distanceUnit: 'km', rest: 90, accent: '#C8FF4D' },
      exercises: exercises,
      routines: [],
      workouts: [],
      measurements: { weight: [], custom: [] },
      draft: null
    };
  }
  var db = load() || seed();
  if (!db.routines) db.routines = [];
  if (!db.measurements) db.measurements = { weight: [], custom: [] };
  if (!db.settings.distanceUnit) db.settings.distanceUnit = 'km';
  if (!db.settings.accent) db.settings.accent = '#C8FF4D';
  db.exercises.forEach(function (e) {
    if (e.muscle === 'Brazos') e.muscle = /biceps|bíceps|curl/i.test(e.name || '') ? 'Bíceps' : 'Tríceps';
    if (!e.type) e.type = (e.muscle === 'Cardio') ? 'cardio' : 'strength';
    if (e.note === undefined) e.note = '';
  });

  var view = 'home';
  var state = { search: '', cal: { y: new Date().getFullYear(), m: new Date().getMonth() } };
  var rest = { remaining: 0, total: 0, running: false };
  var wakeLock = null;
  var msTarget = null;

  function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }
  function todayISO() { var d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
  function newDraft(title) { return { id: uid(), title: title || '', note: '', date: todayISO(), startedAt: Date.now(), items: [] }; }
  function exType(it) { return it.type || 'strength'; }
  function val(v) { return (v === '' || v == null) ? '' : v; }
  function num(v) { v = parseFloat(v); return isNaN(v) ? 0 : v; }

  /* ---------------- helpers ---------------- */
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function fmtTime(s) { s = Math.max(0, Math.floor(s || 0)); var m = Math.floor(s / 60), ss = s % 60; return (m < 10 ? '0' : '') + m + ':' + (ss < 10 ? '0' : '') + ss; }
  function fmtNum(v) { if (v == null || isNaN(v)) return '—'; var r = Math.round(v * 10) / 10; return (r % 1 === 0) ? String(r) : r.toFixed(1); }
  function fmtDate(d) { return new Intl.DateTimeFormat('es-ES', { weekday: 'long', day: 'numeric', month: 'long' }).format(d); }
  function fmtDateLong(iso) { return new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(iso)); }
  function fmtDateShort(iso) { return new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'short' }).format(new Date(iso)); }
  function dateKey(iso) { return (iso || '').slice(0, 10); }
  function isThisMonth(iso) { var d = new Date(iso), n = new Date(); return d.getMonth() === n.getMonth() && d.getFullYear() === n.getFullYear(); }
  function isoWeekStart(d) { var x = new Date(d); x.setHours(0, 0, 0, 0); var day = (x.getDay() + 6) % 7; x.setDate(x.getDate() - day); return x; }

  /* ---------------- audio / wake ---------------- */
  var audioCtx = null;
  function beep() {
    try {
      audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
      var o = audioCtx.createOscillator(), g = audioCtx.createGain();
      o.connect(g); g.connect(audioCtx.destination); o.type = 'sine'; o.frequency.value = 880;
      g.gain.setValueAtTime(0.001, audioCtx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.3, audioCtx.currentTime + 0.02);
      g.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.4);
      o.start(); o.stop(audioCtx.currentTime + 0.42);
    } catch (e) {}
  }
  function requestWake() { try { if ('wakeLock' in navigator) navigator.wakeLock.request('screen').then(function (l) { wakeLock = l; }).catch(function () {}); } catch (e) {} }
  function releaseWake() { try { if (wakeLock) wakeLock.release(); } catch (e) {} wakeLock = null; }
  function toast(msg) {
    var t = document.getElementById('toast');
    if (!t) { t = document.createElement('div'); t.id = 'toast'; document.body.appendChild(t); }
    t.textContent = msg; t.classList.add('show'); clearTimeout(t._h); t._h = setTimeout(function () { t.classList.remove('show'); }, 2200);
  }

  /* ---------------- rest timer ---------------- */
  function startRest(sec) { rest.total = sec; rest.remaining = sec; rest.running = true; }
  function stopRest() { rest.running = false; rest.remaining = 0; rest.total = 0; }
  function restTick() {
    if (!rest.running) return;
    rest.remaining--;
    if (rest.remaining <= 0) { rest.remaining = 0; rest.running = false; beep(); render(); return; }
    paintRest();
  }
  function paintRest() {
    var t = document.getElementById('restTime'); if (t) t.textContent = fmtTime(rest.remaining);
    var sheet = document.getElementById('restSheet');
    if (sheet) {
      var pct = rest.total ? rest.remaining / rest.total : 0;
      var ring = sheet.querySelector('.rest-ring');
      if (ring) ring.style.background = 'conic-gradient(var(--accent) ' + (pct * 360) + 'deg, var(--surface2) 0deg)';
      var tog = sheet.querySelector('[data-action="rest-toggle"]');
      if (tog) tog.textContent = rest.running ? 'Pausar' : 'Reanudar';
    }
  }
  function elapsedTick() {
    var e = document.getElementById('elapsed');
    if (e && db.draft) e.textContent = fmtTime(Math.floor((Date.now() - db.draft.startedAt) / 1000));
  }

  /* ---------------- charts ---------------- */
  function lineChart(points) {
    if (!points || points.length === 0) return '<div class="empty" style="padding:24px">Sin datos todavía</div>';
    var w = 320, h = 130, pad = 16;
    var xs = points.map(function (p) { return p.t; }), ys = points.map(function (p) { return p.v; });
    var minX = Math.min.apply(null, xs), maxX = Math.max.apply(null, xs);
    var minY = Math.min.apply(null, ys), maxY = Math.max.apply(null, ys);
    var spanX = (maxX - minX) || 1, spanY = (maxY - minY) || 1;
    function X(t) { return pad + (maxX === minX ? (w - 2 * pad) / 2 : (t - minX) / spanX * (w - 2 * pad)); }
    function Y(v) { return h - pad - (v - minY) / spanY * (h - 2 * pad); }
    var path = points.map(function (p, i) { return (i ? 'L' : 'M') + X(p.t).toFixed(1) + ' ' + Y(p.v).toFixed(1); }).join(' ');
    var dots = points.map(function (p) { return '<circle cx="' + X(p.t).toFixed(1) + '" cy="' + Y(p.v).toFixed(1) + '" r="2.6" fill="var(--accent)"/>'; }).join('');
    var grid = '<line x1="' + pad + '" y1="' + Y(maxY).toFixed(1) + '" x2="' + (w - pad) + '" y2="' + Y(maxY).toFixed(1) + '" stroke="var(--border)"/><line x1="' + pad + '" y1="' + Y(minY).toFixed(1) + '" x2="' + (w - pad) + '" y2="' + Y(minY).toFixed(1) + '" stroke="var(--border)"/>';
    return '<svg class="chart" viewBox="0 0 ' + w + ' ' + h + '" preserveAspectRatio="none" width="100%" height="' + h + '">' + grid +
      '<path d="' + path + '" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linejoin="round"/>' + dots + '</svg>' +
      '<div class="chart-axis"><span>' + fmtNum(minY) + '</span><span>' + fmtNum(maxY) + '</span></div>';
  }
  function weekly(n) {
    var map = {};
    db.workouts.forEach(function (w) { var k = isoWeekStart(new Date(w.date)).toISOString().slice(0, 10); map[k] = (map[k] || 0) + 1; });
    var out = [], cur = isoWeekStart(new Date());
    for (var i = n - 1; i >= 0; i--) {
      var d = new Date(cur); d.setDate(d.getDate() - 7 * i);
      var k = d.toISOString().slice(0, 10);
      out.push({ label: (i === 0 ? 'Ahora' : String(d.getDate())), v: map[k] || 0 });
    }
    return out;
  }
  function barChart(items) {
    if (!items.length) return '';
    var max = Math.max.apply(null, items.map(function (i) { return i.v; }).concat([1]));
    return '<div class="barchart">' + items.map(function (it) {
      var h = it.v ? Math.max(10, it.v / max * 100) : 3;
      return '<div class="bar-col"><div class="bar" style="height:' + h + '%">' + (it.v ? it.v : '') + '</div><div class="bar-lbl">' + it.label + '</div></div>';
    }).join('') + '</div>';
  }

  /* ---------------- exercise analytics ---------------- */
  function exerciseRecords(id) {
    var sets = [], sessions = 0;
    db.workouts.forEach(function (w) {
      var has = false;
      w.items.forEach(function (it) {
        if (it.exerciseId !== id) return; has = true;
        it.sets.forEach(function (s) {
          sets.push({ date: w.date, reps: num(s.reps), weight: num(s.weight), time: num(s.time), distance: num(s.distance) });
        });
      });
      if (has) sessions++;
    });
    sets.sort(function (a, b) { return a.date.localeCompare(b.date); });
    var ex = db.exercises.find(function (e) { return e.id === id; });
    var cardio = ex && ex.type === 'cardio';
    var prs = {}, points = [];
    if (cardio) {
      var md = 0, mt = 0;
      sets.forEach(function (s) { if (s.distance > md) md = s.distance; if (s.time > mt) mt = s.time; });
      prs = { maxDistance: md, maxTime: mt };
      var byDayC = {}; sets.forEach(function (s) { if (s.distance > 0) byDayC[dateKey(s.date)] = Math.max(byDayC[dateKey(s.date)] || 0, s.distance); });
      points = Object.keys(byDayC).map(function (k) { return { t: new Date(k + 'T00:00:00').getTime(), v: byDayC[k] }; });
    } else {
      var mw = 0, mr = 0, mv = 0;
      sets.forEach(function (s) { if (s.weight > mw) mw = s.weight; if (s.reps > mr) mr = s.reps; var vol = (s.weight > 0 && s.reps > 0) ? s.weight * s.reps : 0; if (vol > mv) mv = vol; });
      prs = { maxWeight: mw, maxReps: mr, maxVolume: mv };
      var byDayW = {}; sets.forEach(function (s) { if (s.weight > 0) byDayW[dateKey(s.date)] = Math.max(byDayW[dateKey(s.date)] || 0, s.weight); });
      points = Object.keys(byDayW).map(function (k) { return { t: new Date(k + 'T00:00:00').getTime(), v: byDayW[k] }; });
    }
    return { sets: sets, sessions: sessions, cardio: cardio, prs: prs, points: points };
  }

  /* ---------------- set inputs ---------------- */
  function mainInputs(type, s, i, j) {
    var f1 = type === 'cardio' ? 'time' : 'reps', f2 = type === 'cardio' ? 'distance' : 'weight';
    var u2 = type === 'cardio' ? db.settings.distanceUnit : db.settings.units;
    return '<input class="set-in" type="number" inputmode="decimal" data-field="' + f1 + '" data-item="' + i + '" data-set="' + j + '" data-num="dec" value="' + val(s[f1]) + '" placeholder="0">' +
      '<span class="x">×</span>' +
      '<input class="set-in" type="number" inputmode="decimal" data-field="' + f2 + '" data-item="' + i + '" data-set="' + j + '" data-num="dec" value="' + val(s[f2]) + '" placeholder="0">' +
      '<span class="unit">' + u2 + '</span>';
  }
  function dropInputs(type, dp, i, j, k) {
    var f1 = type === 'cardio' ? 'time' : 'reps', f2 = type === 'cardio' ? 'distance' : 'weight';
    var u2 = type === 'cardio' ? db.settings.distanceUnit : db.settings.units;
    var attrs = 'data-item="' + i + '" data-set="' + j + '" data-drop="' + k + '"';
    return '<input class="set-in" type="number" inputmode="decimal" data-field="drop" data-metric="' + f1 + '" ' + attrs + ' data-num="dec" value="' + val(dp[f1]) + '" placeholder="0">' +
      '<span class="x">×</span>' +
      '<input class="set-in" type="number" inputmode="decimal" data-field="drop" data-metric="' + f2 + '" ' + attrs + ' data-num="dec" value="' + val(dp[f2]) + '" placeholder="0">' +
      '<span class="unit">' + u2 + '</span>';
  }
  function renderSet(type, s, i, j) {
    var done = s.done ? ' done' : '';
    var main = '<div class="set-row' + done + '"><div class="set-idx">' + (j + 1) + '</div>' + mainInputs(type, s, i, j) +
      '<button class="set-check' + (s.done ? ' on' : '') + '" data-action="toggle-set" data-item="' + i + '" data-set="' + j + '">' + (s.done ? '✓' : '') + '</button></div>';
    var drops = (s.drops && s.drops.length) ? s.drops.map(function (dp, k) {
      return '<div class="drop-row"><span class="drop-tag">Drop ' + (k + 1) + '</span>' + dropInputs(type, dp, i, j, k) +
        '<button class="icon-btn sm danger" data-action="remove-drop" data-item="' + i + '" data-set="' + j + '" data-drop="' + k + '">✕</button></div>';
    }).join('') : '';
    var addDrop = '<button class="add-drop" data-action="add-drop" data-item="' + i + '" data-set="' + j + '">+ Drop set</button>';
    return main + drops + addDrop;
  }
  function formatSet(it, s) {
    var type = exType(it);
    var v = type === 'cardio' ? (fmtNum(s.distance) + ' ' + db.settings.distanceUnit + (s.time ? ' · ' + fmtNum(s.time) + ' min' : '')) : (s.reps + ' reps · ' + fmtNum(s.weight) + ' ' + db.settings.units);
    if (s.drops && s.drops.length) {
      v += s.drops.map(function (dp, k) {
        var dv = type === 'cardio' ? (fmtNum(dp.distance) + ' ' + db.settings.distanceUnit) : (dp.reps + '×' + fmtNum(dp.weight));
        return ' · Drop' + (k + 1) + ': ' + dv;
      }).join('');
    }
    return v;
  }

  /* ---------------- renderers ---------------- */
  function topbar(title) { return '<div class="topbar"><div class="tb-title">' + title + '</div></div>'; }

  function renderHome() {
    var name = db.settings.name || 'atleta';
    var w = db.workouts;
    var last = w.length ? w[w.length - 1] : null;
    var monthCount = w.filter(function (x) { return isThisMonth(x.date); }).length;
    var cont = '';
    if (db.draft) {
      cont = '<button class="card continue" data-action="continue"><div class="c-top"><div><div class="c-title">' + esc(db.draft.title || 'Entrenamiento') + '</div>' +
        '<div class="c-sub">En curso · ' + fmtDateLong(db.draft.date + 'T00:00:00') + '</div></div>' +
        '<span class="pill-accent">Continuar ›</span></div></button>';
    }
    var routines = db.routines.map(function (r) {
      return '<div class="routine-card"><div class="routine-info"><div class="routine-name">' + esc(r.name) + '</div>' +
        '<div class="routine-sub">' + r.items.length + ' ejercicios</div></div>' +
        '<div class="routine-actions"><button class="mini accent" data-action="routine-start" data-id="' + r.id + '">Entrenar</button>' +
        '<button class="mini" data-action="routine-edit" data-id="' + r.id + '">✎</button>' +
        '<button class="mini danger" data-action="routine-del" data-id="' + r.id + '">🗑</button></div></div>';
    }).join('');
    return topbar('GymTrack') +
      '<div class="view">' +
      '<div class="greet">Hola, <b>' + esc(name) + '</b></div>' +
      '<div class="date">' + esc(fmtDate(new Date())) + '</div>' +
      '<button class="cta" data-action="start">▶  Empezar entrenamiento</button>' + cont +
      '<div class="section-title">Rutinas</div>' +
      (routines || '<div class="empty" style="padding:20px">Aún no tienes rutinas. Crea una para entrenar más rápido.</div>') +
      '<button class="add-ex" data-action="routine-new" style="margin-top:6px">+ Crear rutina</button>' +
      '<div class="stats">' +
      '<div class="stat"><div class="stat-n">' + monthCount + '</div><div class="stat-l">este mes</div></div>' +
      '<div class="stat"><div class="stat-n">' + w.length + '</div><div class="stat-l">totales</div></div>' +
      '<div class="stat"><div class="stat-n">' + (last ? esc(fmtDateShort(last.date)) : '—') + '</div><div class="stat-l">último</div></div>' +
      '</div>' +
      '<div class="section-title">Progreso · últimas 8 semanas</div>' +
      (w.length ? barChart(weekly(8)) : '<div class="empty" style="padding:20px">Entrena para ver tu progreso semanal.</div>') +
      '</div>';
  }

  function renderWorkout() {
    var d = db.draft;
    var elapsed = fmtTime(Math.floor((Date.now() - d.startedAt) / 1000));
    var items = d.items.map(function (it, i) {
      var type = exType(it);
      var sets = it.sets.map(function (s, j) { return renderSet(type, s, i, j); }).join('');
      return '<div class="ex-card"><div class="ex-head"><div><div class="ex-name">' + esc(it.name) + '</div><div class="pill">' + esc(it.muscle) + (type === 'cardio' ? ' · cardio' : '') + '</div></div>' +
        '<button class="icon-btn danger" data-action="remove-item" data-item="' + i + '">✕</button></div>' +
        '<div class="set-head"><span>#</span><span>' + (type === 'cardio' ? 'MIN' : 'REPS') + '</span><span></span><span>' + (type === 'cardio' ? db.settings.distanceUnit : db.settings.units) + '</span><span></span></div>' +
        sets + '<button class="add-set" data-action="add-set" data-item="' + i + '">+ Añadir serie</button></div>';
    }).join('');

    var restSheet = '';
    if (rest.running || rest.remaining > 0) {
      var pct = rest.total ? rest.remaining / rest.total : 0;
      restSheet = '<div class="rest" id="restSheet"><div class="rest-ring" style="background:conic-gradient(var(--accent) ' + (pct * 360) + 'deg, var(--surface2) 0deg)">' +
        '<div class="rest-inner"><div class="rest-time" id="restTime">' + fmtTime(rest.remaining) + '</div><div class="rest-lbl">descanso</div></div></div>' +
        '<div class="rest-btns"><button data-action="rest-add">+30s</button><button data-action="rest-toggle">' + (rest.running ? 'Pausar' : 'Reanudar') + '</button><button data-action="rest-skip">Saltar</button></div></div>';
    }
    var chevDown = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:20px;height:20px"><polyline points="6 9 12 15 18 9"/></svg>';
    return '<div class="workout"><div class="wh">' +
      '<button class="icon-btn" data-action="workout-exit" title="Guardar y salir">' + chevDown + '</button>' +
      '<input class="wh-title" data-field="title" value="' + esc(d.title) + '" placeholder="Entrenamiento">' +
      '<div class="wh-time" id="elapsed">' + elapsed + '</div></div>' +
      '<div class="wbody">' +
      '<div class="wo-date"><label>Fecha del entrenamiento</label><input type="date" data-bind="workout-date" value="' + (d.date || todayISO()) + '"></div>' +
      '<input class="note-input" data-bind="workout-note" value="' + esc(d.note) + '" placeholder="Nota del entrenamiento…">' +
      items + '<button class="add-ex" data-action="open-picker">+ Añadir ejercicio</button></div>' +
      '<div class="wfoot"><button class="cta block" data-action="finish">Finalizar entrenamiento</button>' +
      '<button class="discard-link" data-action="discard-draft">Descartar entrenamiento</button></div>' + restSheet + '</div>';
  }

  function libListHTML(q) {
    q = (q || '').toLowerCase();
    var f = db.exercises.filter(function (e) { return e.name.toLowerCase().indexOf(q) >= 0; });
    var byGroup = {};
    f.forEach(function (e) { (byGroup[e.muscle] = byGroup[e.muscle] || []).push(e); });
    var out = '';
    Object.keys(byGroup).forEach(function (g) {
      out += '<div class="lib-group">' + esc(g) + '</div>' + byGroup[g].map(function (e) {
        return '<button class="lib-item" data-action="exercise" data-id="' + e.id + '"><span>' + esc(e.name) + '</span><span class="chev">›</span></button>';
      }).join('');
    });
    return out || '<div class="empty">Sin resultados</div>';
  }
  function renderLibrary() {
    return topbar('Ejercicios') + '<div class="view">' +
      '<div class="search"><input id="libSearch" placeholder="Buscar ejercicio..." value="' + esc(state.search) + '"></div>' +
      '<button class="add-ex" data-action="create-exercise" style="margin-bottom:6px">+ Crear ejercicio (fuerza o cardio)</button>' +
      '<div id="libList">' + libListHTML(state.search) + '</div></div>';
  }

  function renderCalendar() {
    var y = state.cal.y, m = state.cal.m;
    var first = new Date(y, m, 1);
    var startDow = (first.getDay() + 6) % 7;
    var days = new Date(y, m + 1, 0).getDate();
    var byDay = {};
    db.workouts.forEach(function (w) { var k = dateKey(w.date); (byDay[k] = byDay[k] || []).push(w); });
    var cells = '', d = 1;
    for (var i = 0; i < 42; i++) {
      if (i < startDow || d > days) { cells += '<div class="cal-cell empty"></div>'; continue; }
      var iso = y + '-' + String(m + 1).padStart(2, '0') + '-' + String(d).padStart(2, '0');
      var has = byDay[iso];
      var isToday = iso === todayISO();
      cells += '<div class="cal-cell' + (has ? ' has' : '') + (isToday ? ' today' : '') + '"' + (has ? ' data-action="cal-day" data-date="' + iso + '"' : '') + '>' +
        '<span class="cal-num">' + d + '</span>' + (has ? '<span class="cal-dot"></span>' : '') + '</div>';
      d++;
    }
    var monthName = new Intl.DateTimeFormat('es-ES', { month: 'long', year: 'numeric' }).format(new Date(y, m, 1));
    return topbar('Calendario') + '<div class="view cal-view"><div class="cal-head"><button class="icon-btn" data-action="cal-prev">‹</button>' +
      '<div class="cal-month">' + esc(monthName) + '</div><button class="icon-btn" data-action="cal-next">›</button></div>' +
      '<div class="cal-grid cal-dow">' + ['L', 'M', 'X', 'J', 'V', 'S', 'D'].map(function (d) { return '<div>' + d + '</div>'; }).join('') + '</div>' +
      '<div class="cal-grid cal-body">' + cells + '</div>' +
      (Object.keys(byDay).length ? '<div class="cal-legend">Días con entrenamiento resaltados · toca para ver</div>' : '<div class="empty">Sin entrenamientos este mes.</div>') +
      '</div>';
  }

  function renderMeasures() {
    function card(title, latest, unit, points, kind, id) {
      return '<div class="measure-card"><div class="measure-head"><div><div class="measure-name">' + esc(title) + '</div>' +
        '<div class="measure-latest">' + (latest != null ? fmtNum(latest) + ' ' + esc(unit) : 'Sin datos') + '</div></div>' +
        '<button class="mini accent" data-action="ms-add" data-kind="' + kind + '"' + (id ? ' data-id="' + id + '"' : '') + '>+ Añadir</button></div>' +
        lineChart(points) + '</div>';
    }
    var wpts = db.measurements.weight.slice().sort(function (a, b) { return a.date.localeCompare(b.date); }).map(function (e) { return { t: new Date(e.date + 'T00:00:00').getTime(), v: e.value }; });
    var wLatest = wpts.length ? wpts[wpts.length - 1].v : null;
    var html = topbar('Medidas') + '<div class="view"><div class="section-title">Peso corporal</div>' + card('Peso', wLatest, db.settings.units, wpts, 'weight', '');
    db.measurements.custom.forEach(function (c) {
      var e = c.entries.slice().sort(function (a, b) { return a.date.localeCompare(b.date); });
      var pts = e.map(function (x) { return { t: new Date(x.date + 'T00:00:00').getTime(), v: x.value }; });
      var latest = e.length ? e[e.length - 1].value : null;
      html += '<div class="measure-card"><div class="measure-head"><div><div class="measure-name">' + esc(c.name) + '</div>' +
        '<div class="measure-latest">' + (latest != null ? fmtNum(latest) + ' ' + esc(c.unit) : 'Sin datos') + '</div></div>' +
        '<div class="routine-actions"><button class="mini accent" data-action="ms-add" data-kind="custom" data-id="' + c.id + '">+ Añadir</button>' +
        '<button class="mini danger" data-action="ms-del" data-id="' + c.id + '">🗑</button></div></div>' + lineChart(pts) + '</div>';
    });
    html += '<button class="add-ex" data-action="ms-new" style="margin-top:6px">+ Crear medida personalizada</button></div>';
    return html;
  }

  function renderHistory() {
    if (!db.workouts.length) return topbar('Historial') + '<div class="view"><div class="empty">Aún no tienes entrenamientos.<br>Toca “Empezar” para tu primera sesión.</div></div>';
    var list = db.workouts.map(function (w) {
      return '<div class="hist-item" data-action="detail" data-id="' + w.id + '"><div class="hist-main"><div class="hist-title">' + esc(w.title) + '</div>' +
        '<div class="hist-sub">' + fmtDateLong(w.date) + ' · ' + fmtTime(w.durationSec) + ' · ' + w.items.length + ' ej.' + (w.note ? ' · 📝' : '') + '</div></div>' +
        '<button class="icon-btn danger sm" data-action="del-workout" data-id="' + w.id + '">🗑</button></div>';
    }).join('');
    return topbar('Historial') + '<div class="view">' + list + '</div>';
  }

  function renderSettings() {
    var s = db.settings;
    return topbar('Ajustes') + '<div class="view settings">' +
      '<div class="field"><label>Nombre</label><input data-setting="name" value="' + esc(s.name) + '" placeholder="Tu nombre"></div>' +
      '<div class="field"><label>Peso (kg/lb)</label><div class="seg"><button class="seg-btn ' + (s.units === 'kg' ? 'on' : '') + '" data-action="set-units" data-v="kg">kg</button>' +
      '<button class="seg-btn ' + (s.units === 'lb' ? 'on' : '') + '" data-action="set-units" data-v="lb">lb</button></div></div>' +
      '<div class="field"><label>Distancia (cardio)</label><div class="seg"><button class="seg-btn ' + (s.distanceUnit === 'km' ? 'on' : '') + '" data-action="set-dist" data-v="km">km</button>' +
      '<button class="seg-btn ' + (s.distanceUnit === 'mi' ? 'on' : '') + '" data-action="set-dist" data-v="mi">mi</button></div></div>' +
      '<div class="field"><label>Descanso por defecto (segundos)</label><input type="number" inputmode="numeric" data-setting="rest" value="' + s.rest + '"></div>' +
      '<div class="card-actions"><button class="btn" data-action="export">Exportar datos (copia de seguridad)</button>' +
      '<button class="btn" data-action="import">Importar datos</button>' +
      '<button class="btn danger" data-action="clear">Borrar todos los datos</button></div>' +
      '<div class="about">GymTrack · Tus datos nunca salen de tu iPhone.</div></div>';
  }

  var ACCENTS = [
    ['Lima', '#C8FF4D'], ['Verde', '#4ADE80'], ['Cian', '#22D3EE'], ['Azul', '#60A5FA'],
    ['Violeta', '#A78BFA'], ['Rosa', '#F472B6'], ['Naranja', '#FB923C'], ['Rojo', '#F87171'],
    ['Amarillo', '#FACC15'], ['Blanco', '#F4F4F7']
  ];
  function renderTheme() {
    var cur = (db.settings.accent || '#C8FF4D').toLowerCase();
    var sw = ACCENTS.map(function (a) {
      var on = a[1].toLowerCase() === cur ? ' on' : '';
      return '<button class="swatch' + on + '" data-action="set-accent" data-color="' + a[1] + '" style="background:' + a[1] + '">' +
        '<span class="swatch-name">' + a[0] + '</span>' + (on ? '<span class="swatch-check">✓</span>' : '') + '</button>';
    }).join('');
    return topbar('Tema') + '<div class="view"><div class="section-title">Color de acento</div>' +
      '<p class="theme-hint">Elige el color de los botones y acentos de la app.</p>' +
      '<div class="swatch-grid">' + sw + '</div></div>';
  }

  function render() {
    var app = document.getElementById('app');
    var savedScroll = null;
    if (view === 'workout' && db.draft) { var wb = app.querySelector('.wbody'); if (wb) savedScroll = wb.scrollTop; }
    if (view === 'workout' && db.draft) {
      app.className = 'mode-workout'; app.innerHTML = renderWorkout();
      if (savedScroll != null) { var wb2 = app.querySelector('.wbody'); if (wb2) wb2.scrollTop = savedScroll; }
      return;
    }
    app.className = 'mode-tabs';
    var content;
    if (view === 'home') content = renderHome();
    else if (view === 'library') content = renderLibrary();
    else if (view === 'calendar') content = renderCalendar();
    else if (view === 'measures') content = renderMeasures();
    else if (view === 'theme') content = renderTheme();
    else if (view === 'history') content = renderHistory();
    else content = renderSettings();
    var tabs = '<nav class="tabbar">' + ['home', 'library', 'calendar', 'measures', 'theme', 'settings'].map(function (v) {
      return '<button class="tab ' + (view === v ? 'active' : '') + '" data-action="nav" data-view="' + v + '">' +
        '<span class="ti">' + TABICONS[v] + '</span><span class="tl">' + TABNAMES[v] + '</span></button>';
    }).join('') + '</nav>';
    app.innerHTML = content + tabs;
  }

  /* ---------------- overlays ---------------- */
  var overlay = document.getElementById('overlay');
  function closeOverlay() { overlay.classList.remove('show'); overlay.innerHTML = ''; }

  function openPicker() {
    function list(q) {
      q = (q || '').toLowerCase();
      var f = db.exercises.filter(function (e) { return e.name.toLowerCase().indexOf(q) >= 0; });
      var byGroup = {}; f.forEach(function (e) { (byGroup[e.muscle] = byGroup[e.muscle] || []).push(e); });
      var out = '';
      Object.keys(byGroup).forEach(function (g) {
        out += '<div class="picker-group">' + esc(g) + '</div>' + byGroup[g].map(function (e) {
          return '<button class="picker-item" data-action="pick" data-id="' + e.id + '">' + esc(e.name) + '</button>';
        }).join('');
      });
      if (!out) out = '<button class="picker-item" data-action="create-exercise" data-name="' + esc(q) + '">+ Crear “' + esc(q) + '”</button>';
      return out;
    }
    overlay.innerHTML = '<div class="modal"><div class="modal-head"><input id="pickerSearch" placeholder="Buscar ejercicio..."><button class="icon-btn" data-action="close-picker">✕</button></div>' +
      '<div class="modal-body" id="pickerList">' + list('') + '</div></div>';
    overlay.classList.add('show');
    var s = document.getElementById('pickerSearch');
    s.addEventListener('input', function () { document.getElementById('pickerList').innerHTML = list(s.value); });
    setTimeout(function () { s.focus(); }, 50);
  }

  function openExercise(id) {
    var ex = db.exercises.find(function (e) { return e.id === id; });
    if (!ex) return;
    var r = exerciseRecords(id);
    var prHTML = r.cardio
      ? statGrid([['Distancia máx', fmtNum(r.prs.maxDistance) + ' ' + db.settings.distanceUnit], ['Tiempo máx', fmtNum(r.prs.maxTime) + ' min'], ['Sesiones', r.sessions]])
      : statGrid([['Peso máx', fmtNum(r.prs.maxWeight) + ' ' + db.settings.units], ['Reps máx', r.prs.maxReps], ['Volumen máx', fmtNum(r.prs.maxVolume) + ' ' + db.settings.units], ['Sesiones', r.sessions]]);
    var history = r.sets.length ? r.sets.slice().reverse().map(function (s) {
      var val = r.cardio ? (fmtNum(s.distance) + ' ' + db.settings.distanceUnit + (s.time ? ' · ' + fmtNum(s.time) + ' min' : '')) : (s.reps + ' reps · ' + fmtNum(s.weight) + ' ' + db.settings.units);
      return '<div class="hist-sub" style="padding:6px 4px">' + fmtDateLong(s.date) + ' — ' + val + '</div>';
    }).join('') : '<div class="empty" style="padding:20px">Aún no has registrado series.</div>';
    overlay.innerHTML = '<div class="modal tall"><div class="modal-head"><div><div class="m-title">' + esc(ex.name) + '</div><div class="m-sub">' + esc(ex.muscle) + (ex.type === 'cardio' ? ' · cardio' : '') + '</div></div><button class="icon-btn" data-action="close-picker">✕</button></div>' +
      '<div class="modal-body">' +
      '<div class="detail-actions"><button class="cta block" data-action="pick" data-id="' + ex.id + '">+ Añadir a entreno</button></div>' +
      prHTML + '<div class="section-title">Progreso</div>' + lineChart(r.points) +
      '<div class="section-title">Histórico</div>' + history +
      '<div class="field" style="margin-top:14px"><label>Nota</label><input data-bind="ex-note" data-id="' + ex.id + '" value="' + esc(ex.note) + '" placeholder="Notas del ejercicio…"></div>' +
      '<div class="card-actions"><button class="btn danger" data-action="del-exercise" data-id="' + ex.id + '">Eliminar ejercicio</button></div>' +
      '</div></div>';
    overlay.classList.add('show');
  }
  function statGrid(pairs) {
    return '<div class="stat-grid">' + pairs.map(function (p) { return '<div class="stat-card"><div class="stat-card-n">' + p[1] + '</div><div class="stat-card-l">' + p[0] + '</div></div>'; }).join('') + '</div>';
  }

  function openDetail(id) {
    var w = db.workouts.find(function (x) { return x.id === id; });
    if (!w) return;
    var items = w.items.map(function (it) {
      var sets = it.sets.map(function (s, j) {
        return '<div class="set-row"><div class="set-idx">' + (j + 1) + '</div><div class="ro">' + formatSet(it, s) + '</div></div>';
      }).join('');
      return '<div class="ex-card"><div class="ex-head"><div><div class="ex-name">' + esc(it.name) + '</div><div class="pill">' + esc(it.muscle) + '</div></div></div>' + sets + '</div>';
    }).join('');
    var note = w.note ? '<div class="m-sub" style="padding:0 4px 10px">📝 ' + esc(w.note) + '</div>' : '';
    overlay.innerHTML = '<div class="modal"><div class="modal-head"><div><div class="m-title">' + esc(w.title) + '</div><div class="m-sub">' + fmtDateLong(w.date) + ' · ' + fmtTime(w.durationSec) + '</div></div><button class="icon-btn" data-action="close-picker">✕</button></div>' +
      '<div class="modal-body">' + note + items + '</div></div>';
    overlay.classList.add('show');
  }

  function openDay(iso) {
    var list = db.workouts.filter(function (w) { return dateKey(w.date) === iso; }).map(function (w) {
      return '<div class="hist-item" data-action="detail" data-id="' + w.id + '"><div class="hist-main"><div class="hist-title">' + esc(w.title) + '</div>' +
        '<div class="hist-sub">' + fmtTime(w.durationSec) + ' · ' + w.items.length + ' ej.</div></div></div>';
    }).join('');
    overlay.innerHTML = '<div class="modal"><div class="modal-head"><div class="m-title">' + esc(fmtDateLong(iso + 'T00:00:00')) + '</div><button class="icon-btn" data-action="close-picker">✕</button></div>' +
      '<div class="modal-body">' + (list || '<div class="empty">Sin entrenamientos.</div>') + '</div></div>';
    overlay.classList.add('show');
  }

  function openRoutineModal(editId) {
    var edit = editId ? db.routines.find(function (r) { return r.id === editId; }) : null;
    var rows = db.exercises.map(function (e) {
      var sel = edit ? edit.items.find(function (it) { return it.exerciseId === e.id; }) : null;
      return '<div class="rt-row"><label class="rt-chk"><input type="checkbox" data-id="' + e.id + '"' + (sel ? ' checked' : '') + '><span>' + esc(e.name) + '</span></label>' +
        '<input class="rt-sets" type="number" min="1" inputmode="numeric" placeholder="series" value="' + (sel ? sel.targetSets : '') + '"></div>';
    }).join('');
    overlay.innerHTML = '<div class="modal tall"><div class="modal-head"><input id="rtName" placeholder="Nombre de la rutina" value="' + esc(edit ? edit.name : '') + '"><button class="icon-btn" data-action="close-picker">✕</button></div>' +
      '<div class="modal-body">' + rows + '</div><div class="modal-foot"><button class="cta block" data-action="rt-save" data-edit="' + (editId || '') + '">Guardar rutina</button></div></div>';
    overlay.classList.add('show');
  }

  function openExerciseModal() {
    var opts = GROUPS.concat(['Otros']).map(function (g) { return '<option value="' + g + '">' + g + '</option>'; }).join('');
    overlay.innerHTML = '<div class="modal"><div class="modal-head"><div class="m-title">Crear ejercicio</div><button class="icon-btn" data-action="close-picker">✕</button></div>' +
      '<div class="modal-body"><div class="field"><label>Nombre</label><input id="exName" placeholder="Ej. Press Arnold"></div>' +
      '<div class="field"><label>Grupo muscular</label><select id="exMuscle" class="select">' + opts + '</select></div>' +
      '<div class="field"><label>Tipo</label><div class="seg"><button class="seg-btn on" data-action="ex-type" data-v="strength">Fuerza</button><button class="seg-btn" data-action="ex-type" data-v="cardio">Cardio</button></div></div>' +
      '</div><div class="modal-foot"><button class="cta block" data-action="ex-save">Crear</button></div></div>';
    overlay.classList.add('show');
  }

  function openMsModal(kind, id) {
    msTarget = { kind: kind, id: id };
    overlay.innerHTML = '<div class="modal"><div class="modal-head"><div class="m-title">Añadir medida</div><button class="icon-btn" data-action="close-picker">✕</button></div>' +
      '<div class="modal-body"><div class="field"><label>Fecha</label><input id="msDate" type="date" value="' + todayISO() + '"></div>' +
      '<div class="field"><label>Valor' + (kind === 'weight' ? ' (' + db.settings.units + ')' : '') + '</label><input id="msValue" type="number" inputmode="decimal" placeholder="0"></div></div>' +
      '<div class="modal-foot"><button class="cta block" data-action="ms-save">Guardar</button></div></div>';
    overlay.classList.add('show');
  }

  /* ---------------- actions ---------------- */
  function pickExercise(id) {
    var ex = db.exercises.find(function (e) { return e.id === id; });
    if (!ex) return;
    if (!db.draft) db.draft = newDraft('');
    db.draft.items.push({ exerciseId: ex.id, name: ex.name, muscle: ex.muscle, type: ex.type, sets: [{ reps: '', weight: '', time: '', distance: '', done: false, drops: [] }] });
    save(); closeOverlay(); view = 'workout'; render();
  }
  function createExercise(nameFromPicker) {
    var name = nameFromPicker || (typeof prompt !== 'undefined' ? prompt('Nombre del ejercicio') : '');
    if (!name) return; name = name.trim(); if (!name) return;
    var m = (typeof prompt !== 'undefined') ? prompt('Grupo muscular (' + GROUPS.join(', ') + ')', 'Otros') : 'Otros';
    var muscle = GROUPS.indexOf(m) >= 0 ? m : 'Otros';
    var ex = { id: uid(), name: name, muscle: muscle, type: muscle === 'Cardio' ? 'cardio' : 'strength', note: '' };
    db.exercises.push(ex); save();
    if (overlay.classList.contains('show')) openPicker();
    pickExercise(ex.id);
  }
  function startRoutine(id) {
    var r = db.routines.find(function (x) { return x.id === id; }); if (!r) return;
    if (db.draft && db.draft.items.length) { if (!confirm('Ya tienes un entrenamiento en curso. ¿Empezar la rutina igualmente (se perderá el actual)?')) return; }
    db.draft = newDraft(r.name);
    db.draft.items = r.items.map(function (it) {
      var sets = []; for (var k = 0; k < (it.targetSets || 1); k++) sets.push({ reps: '', weight: '', time: '', distance: '', done: false, drops: [] });
      return { exerciseId: it.exerciseId, name: it.name, muscle: it.muscle, type: it.type, sets: sets };
    });
    save(); requestWake(); view = 'workout'; render();
  }
  function finishWorkout() {
    var d = db.draft; if (!d) return;
    var day = d.date || todayISO();
    var t = new Date();
    var time = String(t.getHours()).padStart(2, '0') + ':' + String(t.getMinutes()).padStart(2, '0') + ':' + String(t.getSeconds()).padStart(2, '0');
    var w = { id: uid(), title: d.title || 'Entrenamiento', date: day + 'T' + time, durationSec: Math.floor((Date.now() - d.startedAt) / 1000), note: d.note || '', items: d.items };
    db.workouts.push(w);
    db.workouts.sort(function (a, b) { return b.date.localeCompare(a.date); });
    db.draft = null; save(); stopRest(); releaseWake(); view = 'history'; render(); toast('Entrenamiento guardado ✓');
  }
  function exportData() {
    var blob = new Blob([JSON.stringify(db, null, 2)], { type: 'application/json' });
    var url = URL.createObjectURL(blob); var a = document.createElement('a');
    a.href = url; a.download = 'gymtrack-backup-' + new Date().toISOString().slice(0, 10) + '.json'; a.click(); URL.revokeObjectURL(url);
  }

  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-action]'); if (!el) return;
    var a = el.dataset.action;
    switch (a) {
      case 'nav': view = el.dataset.view; render(); break;
      case 'start': db.draft = newDraft(''); requestWake(); view = 'workout'; render(); break;
      case 'continue': requestWake(); view = 'workout'; render(); break;
      case 'workout-exit': save(); releaseWake(); view = 'home'; render(); break;
      case 'discard-draft': if (confirm('¿Descartar el entrenamiento en curso?')) { db.draft = null; save(); stopRest(); releaseWake(); view = 'home'; render(); } break;
      case 'open-picker': openPicker(); break;
      case 'close-picker': closeOverlay(); break;
      case 'pick': pickExercise(el.dataset.id); break;
      case 'exercise': openExercise(el.dataset.id); break;
      case 'create-exercise': openExerciseModal(); break;
      case 'ex-save': {
        var nm = (document.getElementById('exName').value || '').trim();
        if (!nm) { alert('Ponle un nombre'); return; }
        var muscle = document.getElementById('exMuscle').value;
        var type = overlay.querySelector('[data-action="ex-type"].on') ? overlay.querySelector('[data-action="ex-type"].on').dataset.v : 'strength';
        var ex = { id: uid(), name: nm, muscle: muscle, type: type, note: '' };
        db.exercises.push(ex); save();
        if (db.draft) { pickExercise(ex.id); }
        else { closeOverlay(); render(); toast('Ejercicio “' + nm + '” creado'); }
        break;
      }
      case 'ex-type': { var sibs = el.parentNode.querySelectorAll('[data-action="ex-type"]'); sibs.forEach(function (b) { b.classList.remove('on'); }); el.classList.add('on'); break; }
      case 'del-exercise': if (confirm('¿Eliminar este ejercicio de la biblioteca?')) { db.exercises = db.exercises.filter(function (x) { return x.id !== el.dataset.id; }); save(); closeOverlay(); render(); } break;
      case 'add-set': { var i = +el.dataset.item; var it = db.draft.items[i]; it.sets.push({ reps: '', weight: '', time: '', distance: '', done: false, drops: [] }); save(); render(); break; }
      case 'add-drop': { var di = +el.dataset.item, dj = +el.dataset.set; var st = db.draft.items[di].sets[dj]; st.drops = st.drops || []; var ty = exType(db.draft.items[di]); st.drops.push(ty === 'cardio' ? { time: '', distance: '' } : { reps: '', weight: '' }); save(); render(); break; }
      case 'remove-drop': { db.draft.items[+el.dataset.item].sets[+el.dataset.set].drops.splice(+el.dataset.drop, 1); save(); render(); break; }
      case 'remove-set': { db.draft.items[+el.dataset.item].sets.splice(+el.dataset.set, 1); save(); render(); break; }
      case 'remove-item': { db.draft.items.splice(+el.dataset.item, 1); save(); render(); break; }
      case 'toggle-set': {
        var ti = +el.dataset.item, tj = +el.dataset.set; var s = db.draft.items[ti].sets[tj];
        s.done = !s.done; if (s.done) startRest(db.settings.rest); save(); render(); break;
      }
      case 'finish': finishWorkout(); break;
      case 'detail': openDetail(el.dataset.id); break;
      case 'del-workout': if (confirm('¿Borrar este entrenamiento?')) { db.workouts = db.workouts.filter(function (w) { return w.id !== el.dataset.id; }); save(); render(); } break;
      case 'set-units': db.settings.units = el.dataset.v; save(); render(); break;
      case 'set-dist': db.settings.distanceUnit = el.dataset.v; save(); render(); break;
      case 'set-accent': db.settings.accent = el.dataset.color; save(); applyAccent(); render(); break;
      case 'export': exportData(); break;
      case 'import': document.getElementById('fileInput').click(); break;
      case 'clear': if (confirm('¿Borrar TODOS los datos? Esta acción no se puede deshacer.')) { localStorage.removeItem(STORE_KEY); db = seed(); save(); view = 'home'; render(); } break;
      case 'routine-new': openRoutineModal(null); break;
      case 'routine-edit': openRoutineModal(el.dataset.id); break;
      case 'routine-start': startRoutine(el.dataset.id); break;
      case 'routine-del': if (confirm('¿Borrar esta rutina?')) { db.routines = db.routines.filter(function (r) { return r.id !== el.dataset.id; }); save(); render(); } break;
      case 'rt-save': {
        var name = (document.getElementById('rtName').value || '').trim() || 'Rutina';
        var items = [];
        overlay.querySelectorAll('.rt-row').forEach(function (row) {
          var cb = row.querySelector('input[type="checkbox"]'); if (!cb.checked) return;
          var ex = db.exercises.find(function (x) { return x.id === cb.dataset.id; }); if (!ex) return;
          var sets = parseInt(row.querySelector('.rt-sets').value, 10) || 1;
          items.push({ exerciseId: ex.id, name: ex.name, muscle: ex.muscle, type: ex.type, targetSets: sets });
        });
        var editId = el.dataset.edit;
        if (editId) { var r = db.routines.find(function (x) { return x.id === editId; }); if (r) { r.name = name; r.items = items; } }
        else db.routines.push({ id: uid(), name: name, items: items });
        save(); closeOverlay(); render(); toast('Rutina guardada');
        break;
      }
      case 'cal-prev': state.cal.m--; if (state.cal.m < 0) { state.cal.m = 11; state.cal.y--; } render(); break;
      case 'cal-next': state.cal.m++; if (state.cal.m > 11) { state.cal.m = 0; state.cal.y++; } render(); break;
      case 'cal-day': openDay(el.dataset.date); break;
      case 'ms-new': { var nm2 = (typeof prompt !== 'undefined') ? prompt('Nombre de la medida (p. ej. Bíceps)') : ''; if (!nm2) return; nm2 = nm2.trim(); if (!nm2) return; var un = (typeof prompt !== 'undefined') ? prompt('Unidad (p. ej. cm)', 'cm') : 'cm'; db.measurements.custom.push({ id: uid(), name: nm2, unit: un || 'cm', entries: [] }); save(); render(); break; }
      case 'ms-add': openMsModal(el.dataset.kind, el.dataset.id); break;
      case 'ms-save': {
        var date = document.getElementById('msDate').value || todayISO();
        var valn = parseFloat(document.getElementById('msValue').value);
        if (isNaN(valn)) { alert('Introduce un valor'); return; }
        if (msTarget.kind === 'weight') db.measurements.weight.push({ date: date, value: valn });
        else { var c = db.measurements.custom.find(function (x) { return x.id === msTarget.id; }); if (c) c.entries.push({ date: date, value: valn }); }
        save(); closeOverlay(); render(); toast('Medida guardada');
        break;
      }
      case 'ms-del': if (confirm('¿Eliminar esta medida y sus registros?')) { db.measurements.custom = db.measurements.custom.filter(function (c) { return c.id !== el.dataset.id; }); save(); render(); } break;
      case 'rest-toggle': rest.running = !rest.running; paintRest(); break;
      case 'rest-add': rest.remaining += 30; rest.total = Math.max(rest.total, rest.remaining); paintRest(); break;
      case 'rest-skip': stopRest(); render(); break;
    }
  });

  document.addEventListener('input', function (e) {
    var el = e.target;
    if (el.dataset.field !== undefined) {
      if (el.dataset.field === 'title') { if (db.draft) { db.draft.title = el.value; save(); } return; }
      if (el.dataset.field === 'drop') {
        var di = +el.dataset.item, dj = +el.dataset.set, dk = +el.dataset.drop;
        db.draft.items[di].sets[dj].drops[dk][el.dataset.metric] = (el.value === '' ? '' : (parseFloat(el.value) || 0)); save(); return;
      }
      var i = +el.dataset.item, j = +el.dataset.set;
      db.draft.items[i].sets[j][el.dataset.field] = (el.value === '' ? '' : (parseFloat(el.value) || 0)); save();
    } else if (el.dataset.setting !== undefined) {
      var k = el.dataset.setting;
      if (k === 'units') db.settings.units = el.value;
      else if (k === 'name') db.settings.name = el.value;
      else if (k === 'rest') db.settings.rest = parseInt(el.value, 10) || 0;
      save();
    } else if (el.dataset.bind !== undefined) {
      if (el.dataset.bind === 'workout-note') { if (db.draft) { db.draft.note = el.value; save(); } }
      else if (el.dataset.bind === 'workout-date') { if (db.draft) { db.draft.date = el.value; save(); } }
      else if (el.dataset.bind === 'ex-note') { var ex = db.exercises.find(function (x) { return x.id === el.dataset.id; }); if (ex) { ex.note = el.value; save(); } }
    } else if (el.id === 'libSearch') {
      state.search = el.value; var l = document.getElementById('libList'); if (l) l.innerHTML = libListHTML(state.search);
    }
  });

  document.getElementById('fileInput').addEventListener('change', function (e) {
    var f = e.target.files[0]; if (!f) return;
    var r = new FileReader();
    r.onload = function () {
      try {
        var data = JSON.parse(r.result);
        if (data && data.workouts) { if (confirm('¿Importar datos? Esto reemplazará tus datos actuales.')) { db = data; if (!db.measurements) db.measurements = { weight: [], custom: [] }; if (!db.routines) db.routines = []; save(); view = 'home'; render(); toast('Datos importados'); } }
      } catch (err) { alert('Archivo no válido'); }
    };
    r.readAsText(f); e.target.value = '';
  });

  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'visible' && view === 'workout' && db.draft) requestWake();
  });

  // Sube el campo enfocado por encima del teclado del móvil
  document.addEventListener('focusin', function (e) {
    var el = e.target;
    if (el && (el.tagName === 'INPUT' || el.tagName === 'SELECT' || el.tagName === 'TEXTAREA')) {
      setTimeout(function () { try { el.scrollIntoView({ block: 'center', behavior: 'smooth' }); } catch (_) {} }, 250);
    }
  });

  function shade(hex, pct) {
    var h = (hex || '#C8FF4D').replace('#', '');
    if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    var r = parseInt(h.slice(0, 2), 16), g = parseInt(h.slice(2, 4), 16), b = parseInt(h.slice(4, 6), 16);
    r = Math.max(0, Math.round(r * (1 + pct))); g = Math.max(0, Math.round(g * (1 + pct))); b = Math.max(0, Math.round(b * (1 + pct)));
    return '#' + [r, g, b].map(function (x) { return x.toString(16).padStart(2, '0'); }).join('');
  }
  function applyAccent() {
    var c = db.settings.accent || '#C8FF4D';
    try { document.documentElement.style.setProperty('--accent', c); document.documentElement.style.setProperty('--accent-press', shade(c, -0.12)); } catch (e) {}
  }

  /* ---------------- init ---------------- */
  if (db.draft && !db.draft.startedAt) db.draft.startedAt = Date.now();
  if (db.draft && !db.draft.date) db.draft.date = todayISO();
  applyAccent();
  render();
  setInterval(elapsedTick, 1000);
  setInterval(restTick, 1000);
  if ('serviceWorker' in navigator) { window.addEventListener('load', function () { navigator.serviceWorker.register('sw.js').catch(function () {}); }); }
})();
