(function () {
  const ROOT_ID = "bbcc-app";
  const STORAGE_KEY = "bbcc-app-v1";

  injectStyles();
  ensureRoot();

  const PROGRAM = [
    {
      id: "chest_triceps",
      title: "День 1 — Грудь + трицепс",
      short: "Грудь",
      exercises: [
        ["Жим Смит 30°", 4, "8–12", "2–3 мин", "Грудь"],
        ["Брусья с акцентом на грудь", 3, "8–12", "2–3 мин", "Грудь"],
        ["Жим гантелей 30°", 3, "8–12", "2 мин", "Грудь"],
        ["Сведение в кроссовере", 3, "12–20", "60–90 сек", "Грудь"],
        ["Жим на трицепс в Смите", 3, "8–12", "2 мин", "Трицепс"],
        ["Жим из-за головы на блоке", 3, "12–20", "60–90 сек", "Трицепс"],
        ["Жим трицепса на блоке вниз", 3, "10–15", "60–90 сек", "Трицепс"]
      ]
    },
    {
      id: "biceps_legs",
      title: "День 2 — Бицепс + предплечья + ноги",
      short: "Бицепс/ноги",
      exercises: [
        ["Сгибания на блоке из-за спины одной рукой", 4, "10–15", "60–90 сек", "Бицепс"],
        ["Сгибания сидя под углом на блоке", 3, "10–15", "60–90 сек", "Бицепс"],
        ["Молотки на блоке с канатом", 3, "12–20", "60–90 сек", "Брахиалис"],
        ["Обратный подъём на блоке", 3, "12–20", "60–90 сек", "Предплечья"],
        ["Сгибание кистей", 3, "15–25", "45–60 сек", "Предплечья"],
        ["Разгибание кистей", 3, "15–25", "45–60 сек", "Предплечья"],
        ["Гакк-присед", 3, "8–12", "2–3 мин", "Ноги"],
        ["Жим ногами сидя", 3, "10–15", "2 мин", "Ноги"],
        ["Сгибание ног лёжа", 4, "10–15", "90 сек", "Ноги"],
        ["Разгибание ног сидя", 3, "12–20", "60–90 сек", "Ноги"],
        ["Икры сидя", 4, "10–20", "60–90 сек", "Икры"]
      ]
    },
    {
      id: "shoulders_neck",
      title: "День 4 — Плечи + трапеции + шея",
      short: "Плечи",
      exercises: [
        ["Махи в сторону на блоке из-за спины", 4, "12–20", "60–90 сек", "Средняя дельта"],
        ["Протяжка", 3, "10–15", "90–120 сек", "Средняя дельта"],
        ["Задняя дельта в кроссовере", 4, "15–25", "60–90 сек", "Задняя дельта"],
        ["Жим в тренажёре на плечи", 3, "8–12", "2 мин", "Передняя дельта"],
        ["Шраги на блоке", 3, "12–20", "60–90 сек", "Трапеции"],
        ["Шея вверх-вниз", 3, "15–20", "45–60 сек", "Шея"],
        ["Шея боком", 3, "15–20", "45–60 сек", "Шея"]
      ]
    },
    {
      id: "back_grip",
      title: "День 5 — Спина + трапеции + хват",
      short: "Спина",
      exercises: [
        ["Подтягивания", 3, "6–10", "2–3 мин", "Спина"],
        ["Верхний блок", 3, "10–15", "90–120 сек", "Спина"],
        ["Пуловер на блоке", 3, "12–20", "60–90 сек", "Широчайшие"],
        ["Тяга грифа с упором грудью", 3, "8–12", "2 мин", "Спина"],
        ["Горизонтальная тяга сидя", 3, "10–15", "90–120 сек", "Спина"],
        ["Face pull", 3, "15–25", "60–90 сек", "Трапеции / задняя дельта"],
        ["Вис / удержание / farmer hold", 3, "30–60 сек", "90–120 сек", "Хват"]
      ]
    }
  ].map((day) => ({
    ...day,
    exercises: day.exercises.map(([name, sets, reps, rest, group]) => ({ name, sets, reps, rest, group }))
  }));

  const DEFAULT_NUTRITION = [
    { id: "oats", meal: "Шейк", name: "Овсянка", amount: 300, unit: "г", mode: "100g", kcal: 370, p: 13, c: 51, f: 7 },
    { id: "pb", meal: "Шейк", name: "Арахисовая паста", amount: 30, unit: "г", mode: "100g", kcal: 588, p: 25, c: 20, f: 50 },
    { id: "walnuts", meal: "Шейк", name: "Грецкие орехи", amount: 30, unit: "г", mode: "100g", kcal: 654, p: 15, c: 14, f: 65 },
    { id: "banana", meal: "Шейк", name: "Банан", amount: 110, unit: "г", mode: "100g", kcal: 89, p: 1.1, c: 23, f: 0.3 },
    { id: "honey", meal: "Шейк", name: "Мёд", amount: 30, unit: "г", mode: "100g", kcal: 304, p: 0, c: 82, f: 0 },
    { id: "egg_protein", meal: "Шейк", name: "Яичный протеин", amount: 0, unit: "г", mode: "100g", kcal: 350, p: 82, c: 4, f: 1 },
    { id: "gingerbread", meal: "До тренировки", name: "Тульский пряник", amount: 130, unit: "г", mode: "100g", kcal: 340, p: 4, c: 77, f: 2 },
    { id: "rice", meal: "После тренировки", name: "Рис сухой", amount: 200, unit: "г", mode: "100g", kcal: 350, p: 7, c: 78, f: 0.7 },
    { id: "turkey", meal: "После тренировки", name: "Индейка / филе", amount: 300, unit: "г", mode: "100g", kcal: 110, p: 22, c: 0, f: 1.5 },
    { id: "egg_whites", meal: "Вечер", name: "Белки яиц C1", amount: 10, unit: "шт", mode: "unit", kcal: 17, p: 3.6, c: 0.2, f: 0 },
    { id: "yolks", meal: "Вечер", name: "Желтки", amount: 4, unit: "шт", mode: "unit", kcal: 55, p: 2.7, c: 0.6, f: 4.5 }
  ];

  const MEASURE_FIELDS = [
    ["waistNavel", "Талия по пупку"],
    ["waistNarrow", "Талия узкое место"],
    ["belly", "Живот"],
    ["chest", "Грудь"],
    ["shoulders", "Плечи"],
    ["armRelaxed", "Бицепс расслабленный"],
    ["armFlexed", "Бицепс напряжённый"],
    ["forearm", "Предплечье"],
    ["thigh", "Бедро"],
    ["glutes", "Ягодицы"],
    ["neck", "Шея"],
    ["calf", "Икра"]
  ];

  const DEFAULT_SETTINGS = {
    currentWeight: "93",
    goalWeight: "100",
    desiredWeeklyGain: "0.30"
  };

  let calOpenFor = null;
  let calCursor = today().slice(0, 7);
  let state = initState();

  function initState() {
    const saved = load();
    return {
      tab: saved.ui?.tab || "dashboard",
      dayId: saved.ui?.dayId || PROGRAM[0].id,
      date: saved.ui?.date || today(),
      bodyWeight: saved.ui?.bodyWeight || "",
      statExercise: saved.ui?.statExercise || PROGRAM[0].exercises[0].name,
      logs: saved.logs || [],
      drafts: saved.drafts || {},
      bodyWeights: saved.bodyWeights || [],
      measurements: saved.measurements || [],
      nutrition: saved.nutrition || DEFAULT_NUTRITION,
      settings: Object.assign({}, DEFAULT_SETTINGS, saved.settings || {}),
      weightEntry: saved.ui?.weightEntry || { date: today(), weight: "", note: "" },
      measureEntry: saved.ui?.measureEntry || Object.assign({ date: today(), note: "" }, emptyMeasurements())
    };
  }

  function root() {
    return document.getElementById(ROOT_ID);
  }

  function ensureRoot() {
    if (!document.getElementById(ROOT_ID)) {
      const div = document.createElement("div");
      div.id = ROOT_ID;
      document.body.appendChild(div);
    }
  }

  function today() {
    return new Date().toISOString().slice(0, 10);
  }

  function uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2);
  }

  function load() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    } catch {
      return {};
    }
  }

  function save() {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        logs: state.logs,
        drafts: state.drafts,
        bodyWeights: state.bodyWeights,
        measurements: state.measurements,
        nutrition: state.nutrition,
        settings: state.settings,
        ui: {
          tab: state.tab,
          dayId: state.dayId,
          date: state.date,
          bodyWeight: state.bodyWeight,
          statExercise: state.statExercise,
          weightEntry: state.weightEntry,
          measureEntry: state.measureEntry
        }
      })
    );
  }

  function n(v) {
    return Number(String(v ?? "").replace(",", ".")) || 0;
  }

  function fmt(v, d = 1) {
    return isFinite(v) ? Number(v).toLocaleString("ru-RU", { maximumFractionDigits: d, minimumFractionDigits: d }) : "—";
  }

  function esc(v) {
    return String(v ?? "").replace(/[&<>'"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", "\"": "&quot;" }[c]));
  }

  function addDays(dateISO, days) {
    const d = new Date(dateISO + "T12:00:00");
    d.setDate(d.getDate() + days);
    return d.toISOString().slice(0, 10);
  }

  function dateDiffDays(a, b) {
    const da = new Date(a + "T12:00:00");
    const db = new Date(b + "T12:00:00");
    return Math.max(1, Math.round((db - da) / 86400000));
  }

  function emptyMeasurements() {
    const o = {};
    MEASURE_FIELDS.forEach(([k]) => (o[k] = ""));
    return o;
  }

  function makeSets(count) {
    return Array.from({ length: count }, () => ({ weight: "", reps: "", rir: "", note: "" }));
  }

  function buildDraft(day) {
    return day.exercises.map((ex) => Object.assign({}, ex, { setsData: makeSets(ex.sets) }));
  }

  function currentDay() {
    return PROGRAM.find((d) => d.id === state.dayId) || PROGRAM[0];
  }

  function draftKey() {
    return state.date + "_" + state.dayId;
  }

  function currentDraft() {
    return state.drafts[draftKey()] || buildDraft(currentDay());
  }

  function setDraft(draft) {
    state.drafts[draftKey()] = draft;
    save();
  }

  function volume(sets) {
    return sets.reduce((s, x) => s + n(x.weight) * n(x.reps), 0);
  }

  function bestSet(sets) {
    return sets.reduce(
      (best, x) => (n(x.weight) * n(x.reps) > best.score ? Object.assign({}, x, { score: n(x.weight) * n(x.reps) }) : best),
      { weight: "", reps: "", score: 0 }
    );
  }

  function e1rm(w, r) {
    return n(w) && n(r) ? Math.round(n(w) * (1 + n(r) / 30)) : 0;
  }

  function nutritionTotals(item) {
    const factor = item.mode === "unit" ? n(item.amount) : n(item.amount) / 100;
    return {
      kcal: factor * n(item.kcal),
      p: factor * n(item.p),
      c: factor * n(item.c),
      f: factor * n(item.f)
    };
  }

  function sumNutrition() {
    return state.nutrition.reduce(
      (s, item) => {
        const t = nutritionTotals(item);
        return { kcal: s.kcal + t.kcal, p: s.p + t.p, c: s.c + t.c, f: s.f + t.f };
      },
      { kcal: 0, p: 0, c: 0, f: 0 }
    );
  }

  function sorted(rows) {
    return rows.slice().sort((a, b) => a.date.localeCompare(b.date));
  }

  function latestWeight() {
    const rows = sorted(state.bodyWeights).filter((r) => n(r.weight));
    return n(rows.at(-1)?.weight || state.settings.currentWeight || 93);
  }

  function weightTrend() {
    const rows = sorted(state.bodyWeights).filter((r) => n(r.weight));
    if (rows.length >= 2) {
      const recent = rows.slice(-14);
      const a = recent[0];
      const b = recent.at(-1);
      const days = dateDiffDays(a.date, b.date);
      return ((n(b.weight) - n(a.weight)) / days) * 7;
    }
    return n(state.settings.desiredWeeklyGain) || 0.3;
  }

  function upsertWeight(date, weight, note) {
    const exists = state.bodyWeights.some((r) => r.date === date);
    state.bodyWeights = exists
      ? state.bodyWeights.map((r) => (r.date === date ? Object.assign({}, r, { weight, note }) : r))
      : state.bodyWeights.concat({ id: uid(), date, weight, note });
  }

  window.bbSetTab = (tab) => {
    state.tab = tab;
    save();
    render();
  };

  window.bbSet = (path, value) => {
    const keys = path.split(".");
    let obj = state;
    for (let i = 0; i < keys.length - 1; i++) obj = obj[keys[i]];
    obj[keys.at(-1)] = value;
    save();
  };

  window.bbSelectDay = (value) => {
    state.dayId = value;
    save();
    render();
  };

  window.bbUpdateSet = (exIndex, setIndex, field, value) => {
    const d = currentDraft();
    d[exIndex].setsData[setIndex][field] = value;
    setDraft(d);
    markFilledFields();
  };

  window.bbAddSet = (exIndex) => {
    const d = currentDraft();
    d[exIndex].setsData.push({ weight: "", reps: "", rir: "", note: "" });
    setDraft(d);
    render();
  };

  window.bbRemoveSet = (exIndex, setIndex) => {
    const d = currentDraft();
    d[exIndex].setsData.splice(setIndex, 1);
    setDraft(d);
    render();
  };

  window.bbPrefill = () => {
    const last = state.logs.find((log) => log.dayId === state.dayId);
    if (!last) return;
    const d = currentDraft().map((ex) => {
      const prev = last.exercises.find((e) => e.name === ex.name);
      if (!prev) return ex;
      ex.setsData = ex.setsData.map((s, i) =>
        Object.assign({}, s, {
          weight: s.weight || prev.setsData[i]?.weight || "",
          reps: s.reps || prev.setsData[i]?.reps || ""
        })
      );
      return ex;
    });
    setDraft(d);
    render();
  };

  window.bbSaveWorkout = () => {
    const exercises = currentDraft().map((ex) => Object.assign({}, ex, { setsData: ex.setsData.filter((s) => s.weight || s.reps || s.rir || s.note) }));
    state.logs.unshift({ id: uid(), date: state.date, bodyWeight: state.bodyWeight, dayId: state.dayId, dayTitle: currentDay().title, exercises });
    if (state.bodyWeight) upsertWeight(state.date, state.bodyWeight, "из тренировки");
    delete state.drafts[draftKey()];
    state.bodyWeight = "";
    state.tab = "history";
    save();
    render();
  };

  window.bbDeleteLog = (id) => {
    state.logs = state.logs.filter((l) => l.id !== id);
    save();
    render();
  };

  window.bbSetStatExercise = (value) => {
    state.statExercise = value;
    save();
    render();
  };

  window.bbSetNutrition = (id, field, value) => {
    state.nutrition = state.nutrition.map((i) => (i.id === id ? Object.assign({}, i, { [field]: value }) : i));
    save();
    render();
  };

  window.bbSaveWeight = () => {
    if (!state.weightEntry.weight) return;
    upsertWeight(state.weightEntry.date, state.weightEntry.weight, state.weightEntry.note);
    state.weightEntry = { date: addDays(state.weightEntry.date, 1), weight: "", note: "" };
    save();
    render();
  };

  window.bbSaveMeasurements = () => {
    const exists = state.measurements.some((r) => r.date === state.measureEntry.date);
    const found = state.measurements.find((r) => r.date === state.measureEntry.date);
    const payload = Object.assign({}, state.measureEntry, { id: exists ? found.id : uid() });
    state.measurements = exists ? state.measurements.map((r) => (r.date === payload.date ? payload : r)) : state.measurements.concat(payload);
    save();
    render();
  };

  window.bbExport = () => {
    const blob = new Blob(
      [JSON.stringify({ logs: state.logs, drafts: state.drafts, bodyWeights: state.bodyWeights, measurements: state.measurements, nutrition: state.nutrition, settings: state.settings }, null, 2)],
      { type: "application/json" }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "bbcc-backup-" + today() + ".json";
    a.click();
    URL.revokeObjectURL(url);
  };

  window.bbImport = (input) => {
    const file = input.files && input.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const p = JSON.parse(String(reader.result));
        Object.assign(state, {
          logs: p.logs || state.logs,
          drafts: p.drafts || state.drafts,
          bodyWeights: p.bodyWeights || state.bodyWeights,
          measurements: p.measurements || state.measurements,
          nutrition: p.nutrition || state.nutrition,
          settings: Object.assign(state.settings, p.settings || {})
        });
        save();
        render();
      } catch {
        alert("Не получилось импортировать файл");
      }
    };
    reader.readAsText(file);
  };

  window.bbToggleCal = (name) => {
    calOpenFor = calOpenFor === name ? null : name;
    const val = getDateValue(name);
    if (val) calCursor = val.slice(0, 7);
    render();
  };

  window.bbCalMonth = (delta) => {
    const [y, m] = calCursor.split("-").map(Number);
    const d = new Date(y, m - 1 + delta, 1);
    calCursor = d.toISOString().slice(0, 7);
    render();
  };

  window.bbPickDate = (name, day) => {
    const iso = calCursor + "-" + String(day).padStart(2, "0");
    setDateValue(name, iso);
    calOpenFor = null;
    save();
    render();
  };

  function getDateValue(name) {
    if (name === "main") return state.date;
    if (name === "weight") return state.weightEntry.date;
    if (name === "measure") return state.measureEntry.date;
    return today();
  }

  function setDateValue(name, iso) {
    if (name === "main") state.date = iso;
    if (name === "weight") state.weightEntry.date = iso;
    if (name === "measure") state.measureEntry.date = iso;
  }

  function datePicker(name, value) {
    const popup = calOpenFor === name ? calendarPopup(name, value) : "";
    return `<div class="bb-calendar"><button type="button" class="bb-input" onclick="bbToggleCal('${name}')" style="text-align:left;display:flex;justify-content:space-between;"><span>${esc(value)}</span><span class="bb-muted">▾</span></button>${popup}</div>`;
  }

  function calendarPopup(name, value) {
    const [year, month] = calCursor.split("-").map(Number);
    const first = new Date(year, month - 1, 1);
    const days = new Date(year, month, 0).getDate();
    const start = (first.getDay() + 6) % 7;
    let cells = "";
    for (let i = 0; i < start; i++) cells += `<div class="bb-cal-empty"></div>`;
    for (let d = 1; d <= days; d++) {
      const iso = calCursor + "-" + String(d).padStart(2, "0");
      cells += `<button class="bb-cal-day ${iso === value ? "active" : ""}" onclick="bbPickDate('${name}',${d})">${d}</button>`;
    }
    return `<div class="bb-cal-popup"><div class="bb-cal-head"><button class="bb-btn" onclick="bbCalMonth(-1)">‹</button><b>${calCursor}</b><button class="bb-btn" onclick="bbCalMonth(1)">›</button></div><div class="bb-cal-week"><span>Пн</span><span>Вт</span><span>Ср</span><span>Чт</span><span>Пт</span><span>Сб</span><span>Вс</span></div><div class="bb-cal-days">${cells}</div></div>`;
  }

  function metric(label, value) {
    return `<div class="bb-metric"><strong>${esc(value)}</strong><span class="bb-muted bb-small">${esc(label)}</span></div>`;
  }

  function forecast(title, value, sub) {
    return `<div class="bb-log-ex"><div class="bb-muted bb-small">${esc(title)}</div><div style="font-size:26px;font-weight:900;margin-top:4px;">${esc(value)}</div><div class="bb-muted bb-small">${esc(sub)}</div></div>`;
  }

  function macro(label, value, unit) {
    return `<div class="bb-metric"><span class="bb-muted bb-small">${esc(label)}</span><strong>${esc(value)} <small>${esc(unit || "")}</small></strong></div>`;
  }

  function tabs() {
    return [
      ["dashboard", "Главная"],
      ["log", "Тренировка"],
      ["body", "Анализ тела"],
      ["nutrition", "Питание"],
      ["stats", "Прогресс"],
      ["history", "История"],
      ["program", "План"]
    ]
      .map(([id, label]) => `<button class="bb-tab ${state.tab === id ? "active" : ""}" onclick="bbSetTab('${id}')">${label}</button>`)
      .join("");
  }

  function setting(key, label, suffix) {
    return `<div class="bb-field" style="margin-bottom:10px;"><label>${label}</label><div style="display:flex;gap:8px;align-items:center;"><input class="bb-input" value="${esc(state.settings[key])}" onchange="bbSet('settings.${key}',this.value)"><span class="bb-muted bb-small">${suffix}</span></div></div>`;
  }

  function renderDashboard() {
    const total = sumNutrition();
    const lw = latestWeight();
    const wt = weightTrend();
    const goal = n(state.settings.goalWeight) || 100;
    const left = Math.max(0, goal - lw);
    const weeks = wt > 0 ? left / wt : null;
    const latestMeasure = sorted(state.measurements).at(-1);

    return `<div class="bb-grid3">
      <div class="bb-card span2"><h2 class="bb-section-title">Куда движемся</h2><p class="bb-muted">Прогноз считается по реальной динамике веса. Если записей мало — по плановому темпу.</p><div class="bb-grid" style="margin-top:14px;">${forecast("Через неделю", fmt(lw + wt) + " кг", fmt(wt) + " кг/нед")}${forecast("Через месяц", fmt(lw + wt * 4.3) + " кг", "≈ 30 дней")}${forecast("Через 3 месяца", fmt(lw + wt * 12.9) + " кг", "≈ 90 дней")}${forecast("До 100 кг", weeks ? fmt(weeks, 0) + " нед" : "—", fmt(left) + " кг осталось")}</div></div>
      <div class="bb-card"><h2 class="bb-section-title">Настройки цели</h2>${setting("currentWeight", "Текущий вес", "кг")}${setting("goalWeight", "Цель", "кг")}${setting("desiredWeeklyGain", "Плановый темп", "кг/нед")}</div>
      <div class="bb-card"><h2 class="bb-section-title">Сегодня</h2><div class="bb-field"><label>Дата</label>${datePicker("main", state.date)}</div><div class="bb-field" style="margin-top:10px;"><label>Тренировка</label><select class="bb-select" onchange="bbSelectDay(this.value)">${PROGRAM.map((d) => `<option value="${d.id}" ${d.id === state.dayId ? "selected" : ""}>${esc(d.title)}</option>`).join("")}</select></div><button class="bb-btn bb-primary" style="width:100%;margin-top:12px;" onclick="bbSetTab('log')">Открыть тренировку</button></div>
      <div class="bb-card span2"><h2 class="bb-section-title">Рацион сейчас</h2><div class="bb-grid">${macro("Калории", Math.round(total.kcal), "ккал")}${macro("Белок", fmt(total.p, 0), "г")}${macro("Углеводы", fmt(total.c, 0), "г")}${macro("Жиры", fmt(total.f, 0), "г")}</div></div>
      <div class="bb-card"><h2 class="bb-section-title">Последние замеры</h2>${latestMeasure ? `<div class="bb-grid2"><div class="bb-log-ex"><span class="bb-muted bb-small">Талия</span><br><b>${esc(latestMeasure.waistNavel || "—")} см</b></div><div class="bb-log-ex"><span class="bb-muted bb-small">Рука</span><br><b>${esc(latestMeasure.armFlexed || "—")} см</b></div><div class="bb-log-ex"><span class="bb-muted bb-small">Грудь</span><br><b>${esc(latestMeasure.chest || "—")} см</b></div><div class="bb-log-ex"><span class="bb-muted bb-small">Дата</span><br><b>${esc(latestMeasure.date)}</b></div></div>` : `<p class="bb-muted">Сделай первые замеры в разделе “Анализ тела”.</p>`}</div>
    </div>`;
  }

  function renderLog() {
    const d = currentDraft();
    return `<div class="bb-card"><div class="bb-grid"><div class="bb-field"><label>Дата</label>${datePicker("main", state.date)}</div><div class="bb-field span2"><label>Тренировка</label><select class="bb-select" onchange="bbSelectDay(this.value)">${PROGRAM.map((day) => `<option value="${day.id}" ${day.id === state.dayId ? "selected" : ""}>${esc(day.title)}</option>`).join("")}</select></div><div class="bb-field"><label>Вес тела</label><input class="bb-input" value="${esc(state.bodyWeight)}" onchange="bbSet('bodyWeight',this.value)" placeholder="93.0"></div></div><div style="margin-top:12px;display:flex;gap:8px;flex-wrap:wrap;"><button class="bb-btn" onclick="bbPrefill()">Подтянуть прошлые веса</button><span class="bb-pill">Черновик сохраняется автоматически</span></div></div>${d.map((ex, ei) => `<div class="bb-card"><div class="bb-ex-head"><div><div class="bb-ex-title">${esc(ex.name)}</div><div class="bb-muted bb-small">${esc(ex.group)} · цель ${ex.sets}×${esc(ex.reps)} · отдых ${esc(ex.rest)}</div></div><button class="bb-btn" onclick="bbAddSet(${ei})">+ подход</button></div><div class="bb-table-wrap"><table class="bb-table"><thead><tr><th>#</th><th>Вес, кг</th><th>Повторы</th><th>RIR</th><th>Заметка</th><th></th></tr></thead><tbody>${ex.setsData.map((set, si) => `<tr><td class="bb-muted">${si + 1}</td><td><input class="bb-input bb-mini" value="${esc(set.weight)}" oninput="bbUpdateSet(${ei},${si},'weight',this.value)" placeholder="80"></td><td><input class="bb-input bb-mini" value="${esc(set.reps)}" oninput="bbUpdateSet(${ei},${si},'reps',this.value)" placeholder="12"></td><td><input class="bb-input bb-mini" value="${esc(set.rir)}" oninput="bbUpdateSet(${ei},${si},'rir',this.value)" placeholder="1–3"></td><td><input class="bb-input" value="${esc(set.note)}" oninput="bbUpdateSet(${ei},${si},'note',this.value)" placeholder="чисто / тяжело / болит локоть"></td><td><button class="bb-danger" onclick="bbRemoveSet(${ei},${si})">удалить</button></td></tr>`).join("")}</tbody></table></div></div>`).join("")}<button class="bb-btn bb-primary" style="width:100%;padding:16px;" onclick="bbSaveWorkout()">Завершить и сохранить тренировку</button>`;
  }

  function renderBody() {
    const lw = latestWeight();
    const wt = weightTrend();
    const rows = sorted(state.bodyWeights).filter((r) => n(r.weight)).slice(-14).reverse();
    return `<div class="bb-grid3"><div class="bb-card span2"><h2 class="bb-section-title">Ежедневный вес</h2><div class="bb-grid"><div>${datePicker("weight", state.weightEntry.date)}</div><input class="bb-input" value="${esc(state.weightEntry.weight)}" onchange="bbSet('weightEntry.weight',this.value)" placeholder="Вес, кг"><input class="bb-input span2" value="${esc(state.weightEntry.note)}" onchange="bbSet('weightEntry.note',this.value)" placeholder="заметка: сон, соль, отёк"></div><button class="bb-btn bb-primary" style="margin-top:12px;" onclick="bbSaveWeight()">Записать вес</button><div class="bb-grid" style="margin-top:16px;">${forecast("Сейчас", fmt(lw) + " кг", "последняя запись")}${forecast("Тренд", fmt(wt) + " кг/нед", "по факту")}${forecast("Через месяц", fmt(lw + wt * 4.3) + " кг", "прогноз")}${forecast("Через 3 месяца", fmt(lw + wt * 12.9) + " кг", "прогноз")}</div><div style="margin-top:16px;">${rows.map((r) => `<div class="bb-log-ex" style="margin-bottom:8px;display:flex;justify-content:space-between;gap:8px;"><span>${esc(r.date)}</span><b>${esc(r.weight)} кг</b><span class="bb-muted bb-small">${esc(r.note || "")}</span></div>`).join("")}</div></div><div class="bb-card"><h2 class="bb-section-title">Правило замеров</h2><p class="bb-muted">Вес — каждый день утром натощак. Замеры — 1 раз в неделю. Главный ориентир на массе: вес растёт медленно, талия не летит вверх, силовые растут.</p></div><div class="bb-card span3"><h2 class="bb-section-title">Недельные замеры</h2><div style="max-width:320px;margin-bottom:12px;">${datePicker("measure", state.measureEntry.date)}</div><div class="bb-grid">${MEASURE_FIELDS.map(([k, l]) => `<div class="bb-field"><label>${l}</label><input class="bb-input" value="${esc(state.measureEntry[k])}" onchange="bbSet('measureEntry.${k}',this.value)" placeholder="см"></div>`).join("")}<div class="bb-field span4"><label>Заметка</label><input class="bb-input" value="${esc(state.measureEntry.note)}" onchange="bbSet('measureEntry.note',this.value)" placeholder="форма, фото, самочувствие"></div></div><button class="bb-btn bb-primary" style="margin-top:14px;" onclick="bbSaveMeasurements()">Сохранить замеры недели</button><div class="bb-grid2" style="margin-top:16px;">${sorted(state.measurements).slice(-6).reverse().map((r) => `<div class="bb-log-ex"><b>${esc(r.date)}</b><div class="bb-grid2" style="margin-top:10px;"><span>Талия: <b>${esc(r.waistNavel || "—")}</b></span><span>Живот: <b>${esc(r.belly || "—")}</b></span><span>Грудь: <b>${esc(r.chest || "—")}</b></span><span>Рука: <b>${esc(r.armFlexed || "—")}</b></span><span>Бедро: <b>${esc(r.thigh || "—")}</b></span><span>Предплечье: <b>${esc(r.forearm || "—")}</b></span></div></div>`).join("")}</div></div></div>`;
  }

  function renderNutrition() {
    const total = sumNutrition();
    const meals = [...new Set(state.nutrition.map((i) => i.meal))];
    return `<div class="bb-card"><div class="bb-ex-head"><div><h2 class="bb-section-title">Калькулятор текущего питания</h2><p class="bb-muted">Твои граммовки. Меняешь число — всё пересчитывается и сохраняется.</p></div><div class="bb-grid bb-macro-grid">${macro("Ккал", Math.round(total.kcal), "")}${macro("Белок", fmt(total.p, 0), "г")}${macro("Углеводы", fmt(total.c, 0), "г")}${macro("Жиры", fmt(total.f, 0), "г")}</div></div></div>${meals.map((meal) => `<div class="bb-card"><h2 class="bb-section-title">${esc(meal)}</h2><div class="bb-table-wrap"><table class="bb-table"><thead><tr><th>Продукт</th><th>Кол-во</th><th>Ккал</th><th>Б</th><th>У</th><th>Ж</th><th>Итого</th></tr></thead><tbody>${state.nutrition.filter((i) => i.meal === meal).map((item) => { const t = nutritionTotals(item); return `<tr><td><b>${esc(item.name)}</b><div class="bb-muted bb-small">на ${item.mode === "unit" ? "1 шт" : "100 г"}</div></td><td><input class="bb-input bb-mini" value="${esc(item.amount)}" onchange="bbSetNutrition('${item.id}','amount',this.value)"> <span class="bb-muted">${esc(item.unit)}</span></td><td><input class="bb-input bb-mini" value="${esc(item.kcal)}" onchange="bbSetNutrition('${item.id}','kcal',this.value)"></td><td><input class="bb-input bb-mini" value="${esc(item.p)}" onchange="bbSetNutrition('${item.id}','p',this.value)"></td><td><input class="bb-input bb-mini" value="${esc(item.c)}" onchange="bbSetNutrition('${item.id}','c',this.value)"></td><td><input class="bb-input bb-mini" value="${esc(item.f)}" onchange="bbSetNutrition('${item.id}','f',this.value)"></td><td class="bb-muted">${Math.round(t.kcal)} ккал · Б ${fmt(t.p, 0)} · У ${fmt(t.c, 0)} · Ж ${fmt(t.f, 0)}</td></tr>`; }).join("")}</tbody></table></div></div>`).join("")}`;
  }

  function renderStats() {
    const names = [...new Set(PROGRAM.flatMap((d) => d.exercises.map((e) => e.name)).concat(state.logs.flatMap((l) => l.exercises.map((e) => e.name))))];
    const rows = state.logs
      .flatMap((log) => log.exercises.filter((e) => e.name === state.statExercise).map((ex) => { const b = bestSet(ex.setsData); return { date: log.date, volume: volume(ex.setsData), best: b, e1rm: e1rm(b.weight, b.reps) }; }))
      .sort((a, b) => a.date.localeCompare(b.date));
    const max = Math.max(1, ...rows.map((r) => r.volume));
    let fc = "";
    if (rows.length >= 2) {
      const first = rows[0];
      const last = rows.at(-1);
      const days = dateDiffDays(first.date, last.date);
      const weekly = ((last.e1rm - first.e1rm) / days) * 7;
      fc = `<div class="bb-grid">${forecast("Текущий e1RM", fmt(last.e1rm, 0) + " кг", "по лучшему сету")}${forecast("Через неделю", fmt(last.e1rm + weekly, 0) + " кг", fmt(weekly, 1) + " кг/нед")}${forecast("Через месяц", fmt(last.e1rm + weekly * 4.3, 0) + " кг", "прогноз")}${forecast("Через 3 месяца", fmt(last.e1rm + weekly * 12.9, 0) + " кг", "прогноз")}</div>`;
    }
    return `<div class="bb-card"><div class="bb-ex-head"><div><h2 class="bb-section-title">Прогресс по силовым</h2><p class="bb-muted">Объём, лучший подход, примерный e1RM и прогноз.</p></div><select class="bb-select" style="max-width:420px;" onchange="bbSetStatExercise(this.value)">${names.map((nm) => `<option ${nm === state.statExercise ? "selected" : ""}>${esc(nm)}</option>`).join("")}</select></div>${fc}</div><div class="bb-card">${rows.length ? rows.map((r) => `<div class="bb-log-ex" style="margin-bottom:10px;"><div style="display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;"><b>${esc(r.date)}</b><span class="bb-muted bb-small">объём ${Math.round(r.volume)} кг · лучший ${esc(r.best.weight)}×${esc(r.best.reps)} · e1RM ${r.e1rm} кг</span></div><div class="bb-stat-bar"><div class="bb-stat-fill" style="width:${Math.max(5, (r.volume / max) * 100)}%"></div></div></div>`).join("") : `<div class="bb-log-ex bb-muted">Пока нет записей по этому упражнению.</div>`}</div>`;
  }

  function renderHistory() {
    return `<div class="bb-actions"><button class="bb-btn" onclick="bbExport()">Экспорт JSON</button><label class="bb-btn">Импорт JSON <input type="file" accept="application/json" style="display:none" onchange="bbImport(this)"></label></div>${state.logs.length ? state.logs.map((log) => `<div class="bb-card"><div class="bb-ex-head"><div><div class="bb-ex-title">${esc(log.dayTitle)}</div><div class="bb-muted bb-small">${esc(log.date)}${log.bodyWeight ? ` · вес ${esc(log.bodyWeight)} кг` : ""}</div></div><button class="bb-danger" onclick="bbDeleteLog('${log.id}')">Удалить</button></div><div class="bb-grid2">${log.exercises.map((ex) => `<div class="bb-log-ex"><b>${esc(ex.name)}</b><div class="bb-muted bb-small" style="margin:6px 0;">объём ${Math.round(volume(ex.setsData))} кг</div><div class="bb-small">${ex.setsData.map((s) => `${esc(s.weight || "—")}×${esc(s.reps || "—")}${s.rir ? ` RIR${esc(s.rir)}` : ""}`).join(" · ")}</div></div>`).join("")}</div></div>`).join("") : `<div class="bb-card bb-muted">История пока пустая.</div>`}`;
  }

  function renderProgram() {
    return `<div class="bb-grid2">${PROGRAM.map((day) => `<div class="bb-card"><h2 class="bb-section-title">${esc(day.title)}</h2>${day.exercises.map((ex) => `<div class="bb-log-ex" style="margin-bottom:10px;"><b>${esc(ex.name)}</b><div class="bb-muted bb-small">${ex.sets}×${esc(ex.reps)} · отдых ${esc(ex.rest)} · ${esc(ex.group)}</div></div>`).join("")}</div>`).join("")}</div>`;
  }

  function render() {
    const total = sumNutrition();
    const body = state.tab === "dashboard" ? renderDashboard() : state.tab === "log" ? renderLog() : state.tab === "body" ? renderBody() : state.tab === "nutrition" ? renderNutrition() : state.tab === "stats" ? renderStats() : state.tab === "history" ? renderHistory() : renderProgram();
    root().innerHTML = `<div class="bb-wrap"><div class="bb-card bb-hero"><div class="bb-hero-inner"><div><div class="bb-muted bb-small">Тренировки · тело · питание · прогноз</div><div class="bb-title">Bodybuilding Control Center</div><div class="bb-subtitle">Личный дневник под текущую цель: 93 → 100 кг, контроль талии, силовых, питания и прогресса.</div></div><div class="bb-metrics">${metric("вес сейчас", fmt(latestWeight()) + " кг")}${metric("цель", state.settings.goalWeight + " кг")}${metric("тренировок", state.logs.length)}${metric("ккал/день", Math.round(total.kcal))}</div></div></div><div class="bb-tabs">${tabs()}</div>${body}</div>`;
    markFilledFields();
  }

  function markFilledFields() {
    const app = root();
    if (!app) return;
    app.querySelectorAll(".bb-input, .bb-select").forEach((el) => {
      const value = String(el.value || "").trim();
      el.classList.toggle("bb-filled", value.length > 0);
      el.addEventListener("input", () => el.classList.toggle("bb-filled", String(el.value || "").trim().length > 0));
      el.addEventListener("change", () => el.classList.toggle("bb-filled", String(el.value || "").trim().length > 0));
    });
  }

  function injectStyles() {
    const style = document.createElement("style");
    style.textContent = `
      #bbcc-app { min-height: 100vh; background: #09090b; color: #f4f4f5; font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; padding: 16px; box-sizing: border-box; }
      #bbcc-app * { box-sizing: border-box; }
      @supports (padding: max(0px)) { #bbcc-app { padding-left: max(10px, env(safe-area-inset-left)); padding-right: max(10px, env(safe-area-inset-right)); padding-bottom: max(18px, env(safe-area-inset-bottom)); } }
      input, select, textarea, button { font-size: 16px !important; }
      .bb-wrap { max-width: 1180px; margin: 0 auto; }
      .bb-card { background: #18181b; border: 1px solid #27272a; border-radius: 28px; padding: 20px; margin-bottom: 16px; box-shadow: 0 20px 45px rgba(0,0,0,.22); }
      .bb-hero { background: linear-gradient(135deg, #18181b, #09090b); }
      .bb-hero-inner { display: flex; justify-content: space-between; gap: 18px; align-items: flex-end; }
      .bb-title { font-size: clamp(32px, 5vw, 56px); line-height: 1; font-weight: 900; letter-spacing: -0.04em; margin: 8px 0 12px; }
      .bb-subtitle { color: #d4d4d8; max-width: 760px; line-height: 1.45; }
      .bb-muted { color: #a1a1aa; }
      .bb-small { font-size: 13px; }
      .bb-metrics { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; min-width: 560px; }
      .bb-metric { background: #09090b; border: 1px solid #27272a; border-radius: 20px; padding: 14px; text-align: center; }
      .bb-metric strong { display: block; font-size: 22px; line-height: 1.1; }
      .bb-tabs { position: sticky; top: 8px; z-index: 50; display: flex; gap: 8px; overflow-x: auto; padding: 8px; border: 1px solid #27272a; border-radius: 22px; background: rgba(9,9,11,.92); backdrop-filter: blur(10px); margin-bottom: 16px; -webkit-overflow-scrolling: touch; }
      .bb-tab, .bb-btn { border: 1px solid #27272a; background: #18181b; color: #e4e4e7; border-radius: 16px; padding: 10px 14px; cursor: pointer; font: inherit; white-space: nowrap; min-height: 44px; }
      .bb-tab.active, .bb-primary { background: #2563eb !important; color: #ffffff !important; border-color: #60a5fa !important; font-weight: 800; box-shadow: 0 0 0 1px rgba(96,165,250,.22), 0 10px 26px rgba(37,99,235,.24); }
      .bb-tab:hover, .bb-btn:hover { background: #1d4ed8 !important; color: #ffffff !important; border-color: #60a5fa !important; }
      .bb-primary:hover { background: #1d4ed8 !important; border-color: #93c5fd !important; color: #ffffff !important; }
      .bb-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
      .bb-grid2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; }
      .bb-grid3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
      .span2 { grid-column: span 2; }
      .span3 { grid-column: span 3; }
      .span4 { grid-column: span 4; }
      .bb-field label { display: block; color: #a1a1aa; font-size: 13px; margin-bottom: 6px; }
      .bb-input, .bb-select { width: 100%; min-height: 44px; border-radius: 16px; border: 1px solid #27272a; background: #09090b; color: #f4f4f5; padding: 12px 14px; outline: none; font: inherit; }
      .bb-input:focus, .bb-select:focus { border-color: #60a5fa !important; box-shadow: 0 0 0 3px rgba(37,99,235,.20); }
      .bb-input.bb-filled, .bb-select.bb-filled { border-color: #2563eb !important; background: linear-gradient(180deg, rgba(37,99,235,.16), rgba(9,9,11,.96)) !important; box-shadow: inset 0 0 0 1px rgba(96,165,250,.14); }
      .bb-mini { width: 92px; }
      .bb-section-title { font-size: 24px; font-weight: 850; margin: 0 0 6px; letter-spacing: -0.02em; }
      .bb-ex-title { font-size: 20px; font-weight: 800; margin-bottom: 4px; }
      .bb-ex-head { display: flex; justify-content: space-between; gap: 12px; align-items: center; margin-bottom: 14px; }
      .bb-table-wrap { overflow-x: auto; -webkit-overflow-scrolling: touch; scrollbar-width: thin; }
      .bb-table { width: 100%; min-width: 820px; border-collapse: collapse; font-size: 14px; }
      .bb-table th, .bb-table td { border-bottom: 1px solid rgba(39,39,42,.9); padding: 8px; text-align: left; vertical-align: middle; }
      .bb-table th { color: #a1a1aa; font-weight: 500; }
      .bb-danger { color: #fca5a5; background: transparent; border: 0; cursor: pointer; }
      .bb-stat-bar { height: 12px; background: #27272a; border-radius: 999px; overflow: hidden; margin-top: 8px; }
      .bb-stat-fill { height: 100%; background: linear-gradient(90deg, #1d4ed8, #60a5fa); border-radius: 999px; }
      .bb-pill { display:inline-flex; align-items:center; border:1px solid #27272a; background:#09090b; border-radius:999px; padding:6px 10px; color:#a1a1aa; font-size:12px; }
      .bb-log-ex { background: #09090b; border: 1px solid #27272a; border-radius: 18px; padding: 14px; }
      .bb-actions { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 14px; }
      .bb-calendar { position: relative; }
      .bb-cal-popup { position: absolute; z-index: 100; width: 310px; top: 52px; left: 0; background: #09090b; border: 1px solid #27272a; border-radius: 20px; padding: 12px; box-shadow: 0 24px 70px rgba(0,0,0,.6); }
      .bb-cal-head { display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; }
      .bb-cal-week, .bb-cal-days { display:grid; grid-template-columns: repeat(7, 1fr); gap:4px; text-align:center; }
      .bb-cal-week { color:#71717a; font-size:12px; margin-bottom:6px; }
      .bb-cal-day { min-height:44px; border:0; border-radius:12px; padding:8px 0; background:#18181b; color:#f4f4f5; cursor:pointer; }
      .bb-cal-day:hover { background:#1d4ed8 !important; color:#ffffff !important; }
      .bb-cal-day.active { background:#2563eb !important; color:#ffffff !important; font-weight:800; box-shadow: 0 0 0 1px rgba(147,197,253,.45) inset; }
      .bb-cal-empty { min-height: 32px; }
      @media (max-width: 900px) { .bb-hero-inner { display:block; } .bb-metrics { min-width:0; grid-template-columns: repeat(2, 1fr); margin-top:16px; } .bb-grid, .bb-grid2, .bb-grid3 { grid-template-columns: 1fr !important; } .span2, .span3, .span4 { grid-column: auto !important; } .bb-card { border-radius: 22px; padding: 14px; } }
      @media (max-width: 480px) { #bbcc-app { padding: 8px; } .bb-wrap { width:100%; max-width:100%; } .bb-title { font-size:34px; line-height:.95; } .bb-subtitle { font-size:14px; } .bb-card { padding:13px; margin-bottom:12px; border-radius:22px; } .bb-metrics { grid-template-columns: repeat(2, minmax(0, 1fr)); gap:8px; margin-top:14px; } .bb-metric { padding:11px 8px; border-radius:16px; } .bb-metric strong { font-size:20px; } .bb-tabs { top:6px; padding:6px; gap:6px; border-radius:18px; scroll-snap-type:x mandatory; } .bb-tab { scroll-snap-align:start; padding:10px 12px; border-radius:14px; font-size:14px !important; } .bb-ex-head { align-items:flex-start; flex-direction:column; } .bb-ex-title { font-size:18px; line-height:1.2; } .bb-section-title { font-size:21px; line-height:1.15; } .bb-input,.bb-select { padding:11px 12px; border-radius:14px; } .bb-mini { width:78px; padding-left:9px; padding-right:9px; } .bb-table { min-width:700px; font-size:13px; } .bb-table th,.bb-table td { padding:7px 6px; } .bb-table-wrap { margin-left:-4px; margin-right:-4px; padding-bottom:6px; } .bb-log-ex { border-radius:16px; padding:12px; } .bb-cal-popup { position:fixed; left:10px; right:10px; top:88px; width:auto; max-width:none; border-radius:22px; } .bb-cal-day { padding:10px 0; } }
      @media (max-width: 430px) { .bb-title { font-size:31px; } .bb-metric strong { font-size:18px; } .bb-small, .bb-muted.bb-small { font-size:12px; } .bb-table { min-width:660px; } .bb-mini { width:72px; } }
      @media (max-width: 390px) { .bb-title { font-size:28px; } .bb-card { padding:11px; } .bb-table { min-width:640px; } }
    `;
    document.head.appendChild(style);
  }

  render();
})();

