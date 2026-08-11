/* Renders the whole site from TRIP (see trip-data.js).
   No libraries, no build step — just open index.html. */

const $ = (sel) => document.querySelector(sel);

const ICONS = { travel: "✈️", stay: "🏨", activity: "📍", food: "🍽️", note: "📝",
                flight: "✈️", train: "🚆", bus: "🚌", cab: "🚕" };

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const WEEKDAYS = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

/* "2026-09-12" -> "Sat, 12 Sep" */
function niceDate(iso, long) {
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  const wd = WEEKDAYS[dt.getDay()];
  return long ? `${wd}, ${d} ${MONTHS[m - 1]} ${y}`
              : `${wd.slice(0, 3)}, ${d} ${MONTHS[m - 1]}`;
}

function todayISO() {
  const n = new Date();
  return `${n.getFullYear()}-${String(n.getMonth() + 1).padStart(2, "0")}-${String(n.getDate()).padStart(2, "0")}`;
}

function daysBetween(fromISO, toISO) {
  const a = new Date(fromISO + "T00:00:00");
  const b = new Date(toISO + "T00:00:00");
  return Math.round((b - a) / 86400000);
}

function esc(s) {
  return String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
}

function el(html) {
  const t = document.createElement("template");
  t.innerHTML = html.trim();
  return t.content.firstElementChild;
}

function travellerName(id) {
  if (id === "shared") return "Shared / hand luggage";
  const t = (TRIP.travellers || []).find((p) => p.id === id);
  return t ? `${t.emoji || ""} ${t.name}`.trim() : id;
}

/* ---------- header ---------- */
function renderHeader() {
  $("#trip-title").textContent = TRIP.title;
  $("#trip-sub").textContent = TRIP.subtitle || "";
  document.title = TRIP.title;

  const left = daysBetween(todayISO(), TRIP.startDate);
  const box = $("#countdown");
  if (left > 1)       box.textContent = `${left} days to go`;
  else if (left === 1) box.textContent = "Tomorrow!";
  else if (left === 0) box.textContent = "We leave today";
  else if (daysBetween(todayISO(), TRIP.endDate) >= 0) box.textContent = "Trip in progress";
  else box.textContent = `${niceDate(TRIP.startDate)} – ${niceDate(TRIP.endDate)}`;
}

/* ---------- one timeline item ---------- */
function itemRow(it) {
  return el(`
    <div class="item">
      <div class="icon">${ICONS[it.type] || "•"}</div>
      ${it.time ? `<div class="time">${esc(it.time)}</div>` : ""}
      <div class="body">
        <strong>${esc(it.title)}</strong>
        ${it.detail ? `<span>${esc(it.detail)}</span>` : ""}
      </div>
    </div>`);
}

/* Small nudge card: how much of the checklist is still pending. */
function checklistProgressCard() {
  let total = 0, done = 0;
  (TRIP.checklist || []).forEach((group, gi) => {
    (group.items || []).forEach((_, ii) => {
      total++;
      if (localStorage.getItem(`trip-check-${gi}-${ii}`) === "1") done++;
    });
  });
  if (!total) return document.createComment("");
  return el(`
    <div class="card">
      <h3>Checklist: ${done} of ${total} done</h3>
      <p>${done === total ? "All set — nothing left to pack." : "Open the Checklist tab to tick off the rest."}</p>
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
          <h3>${away === 1 ? "We leave tomorrow" : `We leave on ${esc(niceDate(next.date))}`}</h3>
          <p>${esc(next.headline || next.city || "")}</p>
        </div>`));
      root.appendChild(el(`<h2 class="section-title" style="margin-top:20px">How day one looks</h2>`));
      (next.items || []).forEach((it) => root.appendChild(itemRow(it)));
      root.appendChild(checklistProgressCard());
    } else {
      root.appendChild(el(`
        <div class="card">
          <h3>Nothing scheduled for today</h3>
          <p>The full plan is in the <b>Plan</b> tab.</p>
        </div>`));
    }
  } else {
    root.appendChild(el(`
      <div class="day-head">
        <span class="date">${esc(niceDate(day.date, true))}</span>
        <span class="badge-today">TODAY</span>
        ${day.city ? `<span class="city">${esc(day.city)}</span>` : ""}
      </div>`));
    if (day.headline) root.appendChild(el(`<div class="card"><h3>${esc(day.headline)}</h3></div>`));
    (day.items || []).forEach((it) => root.appendChild(itemRow(it)));
  }

  /* today's stay */
  const stay = (TRIP.stays || []).find((s) => s.checkIn <= iso && iso < s.checkOut);
  if (stay) {
    root.appendChild(el(`
      <div class="card">
        <h3>🏨 Tonight: ${esc(stay.name)}</h3>
        <p>${esc(stay.address || "")}</p>
        <div class="btn-row">
          ${stay.phone ? `<a class="btn" href="tel:${esc(stay.phone)}">Call hotel</a>` : ""}
          ${stay.mapUrl ? `<a class="btn" href="${esc(stay.mapUrl)}" target="_blank" rel="noopener">Open in Maps</a>` : ""}
        </div>
      </div>`));
  }

  if ((TRIP.contacts || []).length) {
    const links = TRIP.contacts
      .map((c) => `<a class="btn" href="tel:${esc(c.phone)}">${esc(c.label)}</a>`).join("");
    root.appendChild(el(`<div class="card"><h3>Important numbers</h3><div class="btn-row">${links}</div></div>`));
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
        ${day.date === iso ? `<span class="badge-today">TODAY</span>` : ""}
        ${day.city ? `<span class="city">${esc(day.city)}</span>` : ""}
      </div>`));
    if (day.headline) root.appendChild(el(`<div class="card"><h3>${esc(day.headline)}</h3></div>`));
    (day.items || []).forEach((it) => root.appendChild(itemRow(it)));
  });

  if (!(TRIP.days || []).length) root.appendChild(el(`<div class="card"><p>Day-by-day plan coming soon.</p></div>`));
}

/* ---------- Travel + Stay ---------- */
function renderTravel() {
  const root = $("#view-travel");
  root.innerHTML = "";

  if ((TRIP.travel || []).length) {
    root.appendChild(el(`<h2 class="section-title">Flights &amp; trains</h2>`));
    TRIP.travel.forEach((t) => {
      root.appendChild(el(`
        <div class="card">
          <h3>${ICONS[t.type] || "🎫"} ${esc(t.label)}</h3>
          <p>${esc(niceDate(t.date))}</p>
          <div class="route">
            <div class="end"><b>${esc(t.depart || "")}</b><span>${esc(t.from || "")}</span></div>
            <div class="arrow">→</div>
            <div class="end to"><b>${esc(t.arrive || "")}</b><span>${esc(t.to || "")}</span></div>
          </div>
          <dl style="margin:12px 0 0">
            ${t.confirmation ? `<div class="kv"><dt>Booking</dt><dd>${esc(t.confirmation)}</dd></div>` : ""}
            ${t.seats ? `<div class="kv"><dt>Seats</dt><dd>${esc(t.seats)}</dd></div>` : ""}
          </dl>
          ${t.notes ? `<p>${esc(t.notes)}</p>` : ""}
        </div>`));
    });
  }

  if ((TRIP.stays || []).length) {
    root.appendChild(el(`<h2 class="section-title" style="margin-top:24px">Where we stay</h2>`));
    TRIP.stays.forEach((s) => {
      root.appendChild(el(`
        <div class="card">
          <h3>🏨 ${esc(s.name)}</h3>
          <p>${esc(s.address || "")}</p>
          <dl style="margin:12px 0 0">
            <div class="kv"><dt>Check in</dt><dd>${esc(niceDate(s.checkIn))}</dd></div>
            <div class="kv"><dt>Check out</dt><dd>${esc(niceDate(s.checkOut))}</dd></div>
            ${s.confirmation ? `<div class="kv"><dt>Booking</dt><dd>${esc(s.confirmation)}</dd></div>` : ""}
          </dl>
          ${s.notes ? `<p>${esc(s.notes)}</p>` : ""}
          <div class="btn-row">
            ${s.phone ? `<a class="btn" href="tel:${esc(s.phone)}">Call</a>` : ""}
            ${s.mapUrl ? `<a class="btn" href="${esc(s.mapUrl)}" target="_blank" rel="noopener">Open in Maps</a>` : ""}
          </div>
        </div>`));
    });
  }
}

/* ---------- Bags ---------- */
function renderBags() {
  const root = $("#view-bags");
  root.innerHTML = `<h2 class="section-title">What's in whose bag</h2>`;
  (TRIP.bags || []).forEach((b) => {
    const items = (b.contents || []).map((c) => `<li>${esc(c)}</li>`).join("");
    root.appendChild(el(`
      <div class="card">
        <h3>${esc(travellerName(b.owner))}</h3>
        <p>${esc(b.bag || "")}</p>
        <ul class="plain">${items}</ul>
      </div>`));
  });
  if (!(TRIP.bags || []).length) root.appendChild(el(`<div class="card"><p>Packing list coming soon.</p></div>`));
}

/* ---------- Checklist (saved on this phone) ---------- */
function renderChecklist() {
  const root = $("#view-check");
  root.innerHTML = `<h2 class="section-title">Checklist</h2>`;

  (TRIP.checklist || []).forEach((group, gi) => {
    const card = el(`<div class="card"><h3>${esc(group.group)}</h3></div>`);
    (group.items || []).forEach((text, ii) => {
      const key = `trip-check-${gi}-${ii}`;
      const done = localStorage.getItem(key) === "1";
      const row = el(`
        <label class="check${done ? " done" : ""}">
          <input type="checkbox" ${done ? "checked" : ""}>
          <span>${esc(text)}</span>
        </label>`);
      row.querySelector("input").addEventListener("change", (e) => {
        localStorage.setItem(key, e.target.checked ? "1" : "0");
        row.classList.toggle("done", e.target.checked);
      });
      card.appendChild(row);
    });
    root.appendChild(card);
  });

  if ((TRIP.notes || []).length) {
    root.appendChild(el(`
      <div class="card">
        <h3>Good to know</h3>
        <ul class="plain">${TRIP.notes.map((n) => `<li>${esc(n)}</li>`).join("")}</ul>
      </div>`));
  }

  root.appendChild(el(`<footer>Tick boxes are saved on this phone only.</footer>`));
}

/* ---------- tabs ---------- */
function setupTabs() {
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
}

renderHeader();
renderToday();
renderPlan();
renderTravel();
renderBags();
renderChecklist();
setupTabs();
