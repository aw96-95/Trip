/* Renders the whole site from TRIP (see trip-data.js).
   No libraries, no build step — just open index.html. */

const $ = (sel) => document.querySelector(sel);

/* ---------- language ----------------------------------------------------
   One language is shown at a time. The choice is remembered on the phone. */
let LANG = localStorage.getItem("trip-lang") || "en";

/* Pick the right language out of a value that may be a plain string
   ("same in both languages") or an { en, hi } pair. */
function t(v) {
  if (v == null) return "";
  if (typeof v === "string") return v;
  return v[LANG] || v.en || "";
}

/* Fixed labels the site itself uses. */
const UI = {
  today:      { en: "Today",      hi: "आज" },
  plan:       { en: "Plan",       hi: "योजना" },
  travelTab:  { en: "Travel",     hi: "सफ़र" },
  bags:       { en: "Bags",       hi: "सामान" },
  checkTab:   { en: "Checklist",  hi: "सूची" },

  daysToGo:   { en: "days to go", hi: "दिन बाकी" },
  tomorrow:   { en: "Tomorrow!",  hi: "कल!" },
  leaveToday: { en: "We leave today", hi: "आज निकलना है" },
  inProgress: { en: "Trip in progress", hi: "यात्रा चल रही है" },
  leaveTom:   { en: "We leave tomorrow", hi: "कल निकलना है" },
  /* {d} is replaced by the date — the two languages put it in different places */
  leaveOn:    { en: "We leave on {d}", hi: "{d} को निकलना है" },
  dayOne:     { en: "How day one looks", hi: "पहला दिन ऐसा रहेगा" },
  badgeToday: { en: "TODAY", hi: "आज" },
  nothing:    { en: "Nothing scheduled for today", hi: "आज कुछ तय नहीं है" },
  fullPlan:   { en: "The full plan is in the Plan tab.", hi: "पूरी योजना 'योजना' टैब में है।" },

  tonight:    { en: "Tonight", hi: "आज रात" },
  numbers:    { en: "Important numbers", hi: "ज़रूरी नंबर" },
  callHotel:  { en: "Call hotel", hi: "होटल को फ़ोन" },
  call:       { en: "Call", hi: "फ़ोन करें" },
  openMaps:   { en: "Open in Maps", hi: "नक्शे में खोलें" },

  flights:    { en: "Flights & trains", hi: "फ़्लाइट और ट्रेन" },
  whereStay:  { en: "Where we stay", hi: "कहाँ रुकेंगे" },
  checkIn:    { en: "Check in", hi: "चेक-इन" },
  checkOut:   { en: "Check out", hi: "चेक-आउट" },
  booking:    { en: "Booking", hi: "बुकिंग" },
  seats:      { en: "Seats", hi: "सीट" },

  whoseBag:   { en: "What's in whose bag", hi: "किसके बैग में क्या है" },
  shared:     { en: "Shared / hand luggage", hi: "साझा / हाथ का सामान" },
  bagsSoon:   { en: "Packing list coming soon.", hi: "सामान की सूची जल्द आएगी।" },
  planSoon:   { en: "Day-by-day plan coming soon.", hi: "दिन-वार योजना जल्द आएगी।" },

  checklist:  { en: "Checklist", hi: "तैयारी की सूची" },
  goodToKnow: { en: "Good to know", hi: "ध्यान रखने की बातें" },
  savedHere:  { en: "Tick marks are saved on this phone only.",
                hi: "निशान सिर्फ़ इसी फ़ोन में सुरक्षित रहते हैं।" },
  progress:   { en: "done", hi: "पूरा" },
  progressOf: { en: "of", hi: "में से" },
  allSet:     { en: "All set — nothing left to pack.", hi: "सब तैयार है।" },
  openCheck:  { en: "Open the Checklist tab to tick off the rest.",
                hi: "बाकी काम 'सूची' टैब में निपटा लें।" },

  switchTo:   { en: "हिंदी", hi: "English" },

  gateTitle:  { en: "Enter the code", hi: "कोड डालें" },
  gateOpen:   { en: "Open", hi: "खोलें" },
  gateWrong:  { en: "That code is not right. Try again.", hi: "कोड ग़लत है। दोबारा कोशिश करें।" }
};

const u = (key) => UI[key][LANG] || UI[key].en;

const ICONS = { travel: "✈️", stay: "🏨", activity: "📍", food: "🍽️", note: "📝",
                flight: "✈️", train: "🚆", bus: "🚌", cab: "🚕" };

const MONTHS = {
  en: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
  hi: ["जन","फ़र","मार्च","अप्रैल","मई","जून","जुलाई","अग","सित","अक्तू","नव","दिस"]
};
const WEEKDAYS = {
  en: ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
  hi: ["रविवार","सोमवार","मंगलवार","बुधवार","गुरुवार","शुक्रवार","शनिवार"]
};
const WEEKDAYS_SHORT = {
  en: ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],
  hi: ["रवि","सोम","मंगल","बुध","गुरु","शुक्र","शनि"]
};

/* "2026-09-12" -> "Sat, 12 Sep" (or the Hindi equivalent) */
function niceDate(iso, long) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  const month = MONTHS[LANG][m - 1];
  return long ? `${WEEKDAYS[LANG][dt.getDay()]}, ${d} ${month} ${y}`
              : `${WEEKDAYS_SHORT[LANG][dt.getDay()]}, ${d} ${month}`;
}

function todayISO() {
  const n = new Date();
  return `${n.getFullYear()}-${String(n.getMonth() + 1).padStart(2, "0")}-${String(n.getDate()).padStart(2, "0")}`;
}

function daysBetween(fromISO, toISO) {
  return Math.round((new Date(toISO + "T00:00:00") - new Date(fromISO + "T00:00:00")) / 86400000);
}

function esc(s) {
  return String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
}

/* Escape + translate in one step — used for every piece of trip content. */
const e = (v) => esc(t(v));

function el(html) {
  const tpl = document.createElement("template");
  tpl.innerHTML = html.trim();
  return tpl.content.firstElementChild;
}

function travellerName(id) {
  if (id === "shared") return u("shared");
  const p = (TRIP.travellers || []).find((x) => x.id === id);
  return p ? `${p.emoji || ""} ${t(p.name)}`.trim() : id;
}

/* ---------- header ---------- */
function renderHeader() {
  $("#trip-title").textContent = t(TRIP.title);
  $("#trip-sub").textContent = t(TRIP.subtitle);
  $("#lang-toggle").textContent = u("switchTo");
  document.title = t(TRIP.title);
  document.documentElement.lang = LANG;

  const left = daysBetween(todayISO(), TRIP.startDate);
  const box = $("#countdown");
  if (left > 1)        box.textContent = `${left} ${u("daysToGo")}`;
  else if (left === 1) box.textContent = u("tomorrow");
  else if (left === 0) box.textContent = u("leaveToday");
  else if (daysBetween(todayISO(), TRIP.endDate) >= 0) box.textContent = u("inProgress");
  else box.textContent = `${niceDate(TRIP.startDate)} – ${niceDate(TRIP.endDate)}`;
}

/* ---------- one timeline item ---------- */
function itemRow(it) {
  return el(`
    <div class="item">
      <div class="icon">${ICONS[it.type] || "•"}</div>
      ${it.time ? `<div class="time">${esc(it.time)}</div>` : ""}
      <div class="body">
        <strong>${e(it.title)}</strong>
        ${t(it.detail) ? `<span>${e(it.detail)}</span>` : ""}
      </div>
    </div>`);
}

/* How much of the checklist is still pending. */
function checklistProgressCard() {
  let total = 0, done = 0;
  (TRIP.checklist || []).forEach((group, gi) => {
    (group.items || []).forEach((_, ii) => {
      total++;
      if (localStorage.getItem(`trip-check-${gi}-${ii}`) === "1") done++;
    });
  });
  if (!total) return null;
  return el(`
    <div class="card">
      <h3>${u("checklist")}: ${done} ${u("progressOf")} ${total} ${u("progress")}</h3>
      <p>${done === total ? u("allSet") : u("openCheck")}</p>
    </div>`);
}

/* ---------- Today ---------- */
function renderToday() {
  const root = $("#view-today");
  root.innerHTML = "";
  const iso = todayISO();
  const day = (TRIP.days || []).find((d) => d.date === iso);

  if (!day) {
    const next = (TRIP.days || []).find((d) => d.date > iso);
    if (next) {
      const away = daysBetween(iso, next.date);
      root.appendChild(el(`
        <div class="card">
          <h3>${away === 1 ? u("leaveTom") : u("leaveOn").replace("{d}", esc(niceDate(next.date)))}</h3>
          <p>${e(next.headline) || e(next.city)}</p>
        </div>`));
      root.appendChild(el(`<h2 class="section-title" style="margin-top:20px">${u("dayOne")}</h2>`));
      (next.items || []).forEach((it) => root.appendChild(itemRow(it)));
      const prog = checklistProgressCard();
      if (prog) root.appendChild(prog);
    } else {
      root.appendChild(el(`<div class="card"><h3>${u("nothing")}</h3><p>${u("fullPlan")}</p></div>`));
    }
  } else {
    root.appendChild(el(`
      <div class="day-head">
        <span class="date">${esc(niceDate(day.date, true))}</span>
        <span class="badge-today">${u("badgeToday")}</span>
        ${t(day.city) ? `<span class="city">${e(day.city)}</span>` : ""}
      </div>`));
    if (t(day.headline)) root.appendChild(el(`<div class="card"><h3>${e(day.headline)}</h3></div>`));
    (day.items || []).forEach((it) => root.appendChild(itemRow(it)));
  }

  const stay = (TRIP.stays || []).find((s) => s.checkIn <= iso && iso < s.checkOut);
  if (stay) {
    root.appendChild(el(`
      <div class="card">
        <h3>🏨 ${u("tonight")}: ${e(stay.name)}</h3>
        <p>${e(stay.address)}</p>
        <div class="btn-row">
          ${stay.phone ? `<a class="btn" href="tel:${esc(stay.phone)}">${u("callHotel")}</a>` : ""}
          ${stay.mapUrl ? `<a class="btn" href="${esc(stay.mapUrl)}" target="_blank" rel="noopener">${u("openMaps")}</a>` : ""}
        </div>
      </div>`));
  }

  if ((TRIP.contacts || []).length) {
    const links = TRIP.contacts
      .map((c) => `<a class="btn" href="tel:${esc(c.phone)}">${e(c.label)}</a>`).join("");
    root.appendChild(el(`<div class="card"><h3>${u("numbers")}</h3><div class="btn-row">${links}</div></div>`));
  }
}

/* ---------- Plan (all days) ---------- */
function renderPlan() {
  const root = $("#view-plan");
  root.innerHTML = "";
  const iso = todayISO();

  (TRIP.days || []).forEach((day) => {
    root.appendChild(el(`
      <div class="day-head">
        <span class="date">${esc(niceDate(day.date))}</span>
        ${day.date === iso ? `<span class="badge-today">${u("badgeToday")}</span>` : ""}
        ${t(day.city) ? `<span class="city">${e(day.city)}</span>` : ""}
      </div>`));
    if (t(day.headline)) root.appendChild(el(`<div class="card"><h3>${e(day.headline)}</h3></div>`));
    (day.items || []).forEach((it) => root.appendChild(itemRow(it)));
  });

  if (!(TRIP.days || []).length) root.appendChild(el(`<div class="card"><p>${u("planSoon")}</p></div>`));
}

/* ---------- Travel + Stay ---------- */
function renderTravel() {
  const root = $("#view-travel");
  root.innerHTML = "";

  if ((TRIP.travel || []).length) {
    root.appendChild(el(`<h2 class="section-title">${u("flights")}</h2>`));
    TRIP.travel.forEach((tr) => {
      root.appendChild(el(`
        <div class="card">
          <h3>${ICONS[tr.type] || "🎫"} ${e(tr.label)}</h3>
          <p>${esc(niceDate(tr.date))}</p>
          <div class="route">
            <div class="end"><b>${e(tr.depart)}</b><span>${e(tr.from)}</span></div>
            <div class="arrow">→</div>
            <div class="end to"><b>${e(tr.arrive)}</b><span>${e(tr.to)}</span></div>
          </div>
          <dl>
            ${t(tr.confirmation) ? `<div class="kv"><dt>${u("booking")}</dt><dd>${e(tr.confirmation)}</dd></div>` : ""}
            ${t(tr.seats) ? `<div class="kv"><dt>${u("seats")}</dt><dd>${e(tr.seats)}</dd></div>` : ""}
          </dl>
          ${t(tr.notes) ? `<p>${e(tr.notes)}</p>` : ""}
        </div>`));
    });
  }

  if ((TRIP.stays || []).length) {
    root.appendChild(el(`<h2 class="section-title" style="margin-top:24px">${u("whereStay")}</h2>`));
    TRIP.stays.forEach((s) => {
      root.appendChild(el(`
        <div class="card">
          <h3>🏨 ${e(s.name)}</h3>
          <p>${e(s.address)}</p>
          <dl>
            <div class="kv"><dt>${u("checkIn")}</dt><dd>${esc(niceDate(s.checkIn))}</dd></div>
            <div class="kv"><dt>${u("checkOut")}</dt><dd>${esc(niceDate(s.checkOut))}</dd></div>
            ${t(s.confirmation) ? `<div class="kv"><dt>${u("booking")}</dt><dd>${e(s.confirmation)}</dd></div>` : ""}
          </dl>
          ${t(s.notes) ? `<p>${e(s.notes)}</p>` : ""}
          <div class="btn-row">
            ${s.phone ? `<a class="btn" href="tel:${esc(s.phone)}">${u("call")}</a>` : ""}
            ${s.mapUrl ? `<a class="btn" href="${esc(s.mapUrl)}" target="_blank" rel="noopener">${u("openMaps")}</a>` : ""}
          </div>
        </div>`));
    });
  }
}

/* ---------- Bags ---------- */
function renderBags() {
  const root = $("#view-bags");
  root.innerHTML = `<h2 class="section-title">${u("whoseBag")}</h2>`;
  (TRIP.bags || []).forEach((b) => {
    const items = (b.contents || []).map((c) => `<li>${e(c)}</li>`).join("");
    root.appendChild(el(`
      <div class="card">
        <h3>${esc(travellerName(b.owner))}</h3>
        <p>${e(b.bag)}</p>
        <ul class="plain">${items}</ul>
      </div>`));
  });
  if (!(TRIP.bags || []).length) root.appendChild(el(`<div class="card"><p>${u("bagsSoon")}</p></div>`));
}

/* ---------- Checklist (saved on this phone) ---------- */
function renderChecklist() {
  const root = $("#view-check");
  root.innerHTML = `<h2 class="section-title">${u("checklist")}</h2>`;

  (TRIP.checklist || []).forEach((group, gi) => {
    const card = el(`<div class="card"><h3>${e(group.group)}</h3></div>`);
    (group.items || []).forEach((text, ii) => {
      const key = `trip-check-${gi}-${ii}`;
      const done = localStorage.getItem(key) === "1";
      const row = el(`
        <label class="check${done ? " done" : ""}">
          <input type="checkbox" ${done ? "checked" : ""}>
          <span>${e(text)}</span>
        </label>`);
      row.querySelector("input").addEventListener("change", (ev) => {
        localStorage.setItem(key, ev.target.checked ? "1" : "0");
        row.classList.toggle("done", ev.target.checked);
      });
      card.appendChild(row);
    });
    root.appendChild(card);
  });

  if ((TRIP.notes || []).length) {
    root.appendChild(el(`
      <div class="card">
        <h3>${u("goodToKnow")}</h3>
        <ul class="plain">${TRIP.notes.map((n) => `<li>${e(n)}</li>`).join("")}</ul>
      </div>`));
  }

  root.appendChild(el(`<footer>${u("savedHere")}</footer>`));
}

/* ---------- draw everything ---------- */
function renderAll() {
  renderHeader();
  renderToday();
  renderPlan();
  renderTravel();
  renderBags();
  renderChecklist();
  document.querySelectorAll("nav button").forEach((b) => {
    b.querySelector(".label").textContent = u(b.dataset.ui);
  });
}

/* ---------- tabs + language switch ---------- */
function setupControls() {
  const buttons = document.querySelectorAll("nav button");
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.setAttribute("aria-selected", String(b === btn)));
      document.querySelectorAll("main section").forEach((s) => {
        s.hidden = s.id !== `view-${btn.dataset.view}`;
      });
      window.scrollTo(0, 0);
    });
  });

  $("#lang-toggle").addEventListener("click", () => {
    LANG = LANG === "en" ? "hi" : "en";
    localStorage.setItem("trip-lang", LANG);
    renderAll();
  });
}

/* ---------- passcode ------------------------------------------------------
   A shared code so a stray link doesn't show our bookings to a stranger.
   It runs in the browser, so it is a doormat lock, not a safe. Nothing
   truly private (ID numbers, card details) should go in trip-data.js. */
function unlock() {
  $("#gate").remove();
  document.body.classList.remove("locked");
  renderAll();
  setupControls();
}

function setupGate() {
  const code = String(TRIP.passcode || "");
  if (!code || localStorage.getItem("trip-unlocked") === code) {
    $("#gate").remove();
    document.body.classList.remove("locked");
    renderAll();
    setupControls();
    return;
  }

  /* The gate is the first screen, before anyone has picked a language,
     so it shows both. Everything past it follows the toggle. */
  $("#gate-title").textContent = `${UI.gateTitle.en} · ${UI.gateTitle.hi}`;
  $("#gate-submit").textContent = `${UI.gateOpen.en} · ${UI.gateOpen.hi}`;

  const tryCode = () => {
    if ($("#gate-input").value.trim() === code) {
      localStorage.setItem("trip-unlocked", code);
      unlock();
    } else {
      $("#gate-error").textContent = u("gateWrong");
      $("#gate-input").value = "";
    }
  };

  $("#gate-submit").addEventListener("click", tryCode);
  $("#gate-input").addEventListener("keydown", (ev) => { if (ev.key === "Enter") tryCode(); });
  $("#gate-input").focus();
}

setupGate();
