
```javascript
const tabs = document.querySelectorAll("[data-route]");
const views = document.querySelectorAll(".view");

function showRoute(route) {
  views.forEach((view) => view.classList.toggle("is-visible", view.id === route));
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.classList.toggle("is-active", tab.dataset.route === route);
  });
  if (route === "map") requestAnimationFrame(resizeCanvas);
}

tabs.forEach((control) => {
  control.addEventListener("click", (event) => {
    event.preventDefault();
    const route = control.dataset.route;
    history.replaceState(null, "", `#${route}`);
    showRoute(route);
  });
});

showRoute(location.hash.replace("#", "") || "home");

const scenes = [
  { time: "Год 0. Нулевая ночь", title: "Разлом над Кромом", place: "Кром, западная гряда", summary: "Первый разлом гасит небо над городом.", weather: "черный снег", tint: "#e44778", zones: [{ x: 0.26, y: 0.32, r: 0.11, label: "Разлом" }], pins: [{ x: 0.25, y: 0.34, label: "Кром", text: "Место первого знака." }, { x: 0.38, y: 0.55, label: "Пепельный порт", text: "Город у тёмной воды." }], models: [{ name: "Искатель", from: [0.16, 0.68], to: [0.25, 0.34], color: "#48d2c8", text: "Герой идёт к Кромскому разлому." }] },
  { time: "Год 1. Первый зов", title: "Марш через Вересковую сушь", place: "Вересковая сушь", summary: "Караван идёт по высохшим степям.", weather: "пыльные молнии", tint: "#d9a84e", zones: [{ x: 0.43, y: 0.48, r: 0.14, label: "Сухой фронт" }], pins: [{ x: 0.44, y: 0.49, label: "Вересковая сушь", text: "Пограничная территория." }, { x: 0.58, y: 0.39, label: "Башня Слуха", text: "Станция ранних сигналов." }], models: [{ name: "Караван", from: [0.25, 0.34], to: [0.58, 0.39], color: "#48d2c8", text: "Движение каравана." }, { name: "Тень", from: [0.69, 0.71], to: [0.44, 0.49], color: "#e44778", text: "Скрытое преследование." }] },
  { time: "Год 2. Пепельный дождь", title: "Падение южных маяков", place: "Пепельный порт", summary: "Береговая линия меняется.", weather: "соленый пепел", tint: "#b7303b", zones: [{ x: 0.38, y: 0.6, r: 0.1, label: "Затопление" }], pins: [{ x: 0.36, y: 0.61, label: "Пепельный порт", text: "Узел южного побережья." }, { x: 0.63, y: 0.64, label: "Мертвый пролив", text: "Граница конфликта." }], models: [{ name: "Сигнальный огонь", from: [0.36, 0.61], to: [0.63, 0.64], color: "#d9a84e", text: "Передача сигнала." }] },
  { time: "Год 3. Глухие знамена", title: "Сбор на центральной площади", place: "Город Ним", summary: "Фракции сходятся в центре.", weather: "безветрие", tint: "#48d2c8", zones: [{ x: 0.51, y: 0.5, r: 0.12, label: "Площадь" }], pins: [{ x: 0.51, y: 0.5, label: "Ним", text: "Столица событий." }, { x: 0.73, y: 0.46, label: "Архив Тишины", text: "Архив хроник." }], models: [{ name: "Посланник", from: [0.58, 0.39], to: [0.51, 0.5], color: "#48d2c8", text: "Маршрут посланника." }, { name: "Хор", from: [0.73, 0.46], to: [0.51, 0.5], color: "#d9a84e", text: "Сход фракций." }] },
  { time: "Год 4. Железная луна", title: "Ночь над Восточным кругом", place: "Восточный круг", summary: "Появляется восточный слой карты.", weather: "лунный гул", tint: "#8d63ff", zones: [{ x: 0.73, y: 0.34, r: 0.15, label: "Лунный круг" }], pins: [{ x: 0.73, y: 0.34, label: "Восточный круг", text: "Лунные механизмы." }, { x: 0.82, y: 0.56, label: "Сад Стекла", text: "Тихая долина." }], models: [{ name: "Лунный механизм", from: [0.73, 0.34], to: [0.82, 0.56], color: "#8d63ff", text: "Смена состояния мира." }] },
  { time: "Год 5. Река без отражений", title: "Переправа через темную воду", place: "Река Ноль", summary: "Путь проходит по реке.", weather: "низкий туман", tint: "#48d2c8", zones: [{ x: 0.6, y: 0.66, r: 0.1, label: "Туман" }], pins: [{ x: 0.59, y: 0.66, label: "Река Ноль", text: "Речной маршрут." }, { x: 0.48, y: 0.78, label: "Остров Сна", text: "Промежуточная база." }], models: [{ name: "Лодка", from: [0.38, 0.6], to: [0.48, 0.78], color: "#48d2c8", text: "Переправа." }] },
  { time: "Год 6. Последний костер", title: "Осада северного костра", place: "Северный костер", summary: "Финальная зона сжимается.", weather: "сухой мороз", tint: "#ff6a3d", zones: [{ x: 0.33, y: 0.21, r: 0.13, label: "Осада" }], pins: [{ x: 0.33, y: 0.21, label: "Северный костер", text: "Опорная точка." }, { x: 0.21, y: 0.48, label: "Старый тракт", text: "Старый путь." }], models: [{ name: "Страж", from: [0.51, 0.5], to: [0.33, 0.21], color: "#ff6a3d", text: "Оборона." }, { name: "Искатель", from: [0.48, 0.78], to: [0.33, 0.21], color: "#48d2c8", text: "Возвращение героя." }] },
  { time: "Год 7. Черновечье", title: "Мир после последнего звука", place: "Черный горизонт", summary: "Линии сходятся в финале.", weather: "тишина", tint: "#f6f0e8", zones: [{ x: 0.5, y: 0.44, r: 0.22, label: "Черновечье" }], pins: [{ x: 0.5, y: 0.44, label: "Черный горизонт", text: "Финальная точка." }, { x: 0.69, y: 0.24, label: "Белый предел", text: "Тизер новой главы." }], models: [{ name: "Голос", from: [0.33, 0.21], to: [0.5, 0.44], color: "#f6f0e8", text: "Финальный путь." }] }
];

const canvas = document.getElementById("loreCanvas");
const ctx = canvas.getContext("2d");
const slider = document.getElementById("timeSlider");
const sceneCard = document.getElementById("sceneCard");
const timelineName = document.getElementById("timelineName");
const tooltip = document.getElementById("mapTooltip");
const ticks = document.getElementById("ticks");
const prevScene = document.getElementById("prevScene");
const nextScene = document.getElementById("nextScene");

let sceneIndex = 0;
let canvasBox = canvas.getBoundingClientRect();
let frameId = null;
let activeHover = null;
let animationStart = performance.now();

const terrain = {
  rivers: [[[0.14, 0.39], [0.22, 0.44], [0.35, 0.49], [0.46, 0.59], [0.61, 0.66], [0.77, 0.74]]],
  mountains: [[0.23, 0.24], [0.31, 0.28], [0.69, 0.3], [0.75, 0.34], [0.41, 0.66], [0.81, 0.68]],
  fields: [[0.3, 0.42, 0.12, 0.08], [0.54, 0.46, 0.17, 0.09], [0.66, 0.58, 0.13, 0.08]],
  cities: [[0.25, 0.34, "Кром"], [0.51, 0.5, "Ним"], [0.36, 0.61, "Пепел"], [0.73, 0.34, "Восток"]]
};

function resizeCanvas() {
  canvasBox = canvas.getBoundingClientRect();
  const ratio = window.devicePixelRatio || 1;
  canvas.width = Math.max(1, Math.floor(canvasBox.width * ratio));
  canvas.height = Math.max(1, Math.floor(canvasBox.height * ratio));
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  startRenderLoop();
}

const point = (x, y) => [x * canvasBox.width, y * canvasBox.height];

function drawRelief() {
  const w = canvasBox.width;
  const h = canvasBox.height;
  const sky = ctx.createLinearGradient(0, 0, 0, h);
  sky.addColorStop(0, "#0a1319");
  sky.addColorStop(1, "#090f14");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, w, h);

  for (let i = 0; i < 130; i++) {
    const x = (Math.sin(i * 91) * 0.5 + 0.5) * w;
    const y = (Math.sin(i * 53) * 0.5 + 0.5) * h;
    const r = 20 + (i % 11) * 6;
    const g = ctx.createRadialGradient(x, y, 2, x, y, r);
    g.addColorStop(0, "rgba(68,97,78,0.06)");
    g.addColorStop(1, "rgba(68,97,78,0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawRivers() {
  ctx.strokeStyle = "rgba(89, 171, 196, 0.5)";
  ctx.lineWidth = 3;
  terrain.rivers.forEach((river) => {
    ctx.beginPath();
    river.forEach(([x, y], idx) => {
      const [px, py] = point(x, y);
      if (!idx) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    });
    ctx.stroke();
  });
}

function drawMountains() {
  terrain.mountains.forEach(([x, y]) => {
    const [px, py] = point(x, y);
    ctx.fillStyle = "#46544b";
    ctx.beginPath();
    ctx.moveTo(px, py - 16);
    ctx.lineTo(px + 15, py + 12);
    ctx.lineTo(px - 15, py + 12);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "rgba(246,240,232,0.34)";
    ctx.beginPath();
    ctx.moveTo(px, py - 16);
    ctx.lineTo(px + 2, py - 2);
    ctx.lineTo(px - 7, py + 4);
    ctx.closePath();
    ctx.fill();
  });
}

function drawFields() {
  terrain.fields.forEach(([x, y, w, h]) => {
    const [px, py] = point(x, y);
    const fw = w * canvasBox.width;
    const fh = h * canvasBox.height;
    ctx.fillStyle = "rgba(107, 127, 72, 0.2)";
    ctx.fillRect(px, py, fw, fh);
    ctx.strokeStyle = "rgba(170, 193, 111, 0.22)";
    ctx.strokeRect(px, py, fw, fh);
  });
}

function drawCities() {
  terrain.cities.forEach(([x, y, name]) => {
    const [px, py] = point(x, y);
    ctx.fillStyle = "#232018";
    ctx.fillRect(px - 8, py - 6, 16, 12);
    ctx.fillStyle = "#7a6a4d";
    ctx.fillRect(px - 10, py - 10, 20, 4);
    ctx.fillStyle = "rgba(246,240,232,0.82)";
    ctx.font = "700 11px Segoe UI";
    ctx.fillText(name, px + 12, py - 10);
  });
}

function drawZone(scene, pulse) {
  scene.zones.forEach((zone) => {
    const [x, y] = point(zone.x, zone.y);
    const radius = zone.r * Math.min(canvasBox.width, canvasBox.height) * (1 + pulse * 0.05);
    const glow = ctx.createRadialGradient(x, y, radius * 0.1, x, y, radius);
    glow.addColorStop(0, `${scene.tint}90`);
    glow.addColorStop(1, `${scene.tint}00`);
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  });
}

function drawRoutes(scene) {
  scene.models.forEach((model) => {
    const [sx, sy] = point(model.from[0], model.from[1]);
    const [tx, ty] = point(model.to[0], model.to[1]);
    ctx.strokeStyle = `${model.color}88`;
    ctx.setLineDash([10, 8]);
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.lineTo(tx, ty);
    ctx.stroke();
    ctx.setLineDash([]);
  });
}

function drawPins(scene) {
  scene.pins.forEach((pin) => {
    const [x, y] = point(pin.x, pin.y);
    ctx.fillStyle = "rgba(26, 21, 13, 0.9)";
    ctx.beginPath();
    ctx.arc(x, y, 11, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#dcb16a";
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fill();
  });
}

function drawPlayerModel(scene) {
  const model = scene.models[0];
  if (!model) return;
  const t = (Math.sin((performance.now() - animationStart) / 900) + 1) / 2;
  const [sx, sy] = point(model.from[0], model.from[1]);
  const [tx, ty] = point(model.to[0], model.to[1]);
  const x = sx + (tx - sx) * t;
  const y = sy + (ty - sy) * t;

  ctx.fillStyle = "rgba(0,0,0,0.35)";
  ctx.beginPath();
  ctx.ellipse(x, y + 15, 16, 7, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#e9dfd0";
  ctx.beginPath();
  ctx.arc(x, y - 10, 6, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "#d0b690";
  ctx.lineWidth = 4;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(x, y - 4);
  ctx.lineTo(x, y + 10);
  ctx.moveTo(x - 8, y + 3);
  ctx.lineTo(x + 8, y + 3);
  ctx.moveTo(x, y + 10);
  ctx.lineTo(x - 7, y + 20);
  ctx.moveTo(x, y + 10);
  ctx.lineTo(x + 7, y + 20);
  ctx.stroke();

  ctx.strokeStyle = model.color;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(x, y + 2, 18, 0, Math.PI * 2);
  ctx.stroke();
}

function draw() {
  frameId = null;
  if (!canvasBox.width || !canvasBox.height) return;
  const scene = scenes[sceneIndex];
  const pulse = (Math.sin((performance.now() - animationStart) / 540) + 1) / 2;
  drawRelief();
  drawFields();
  drawRivers();
  drawMountains();
  drawCities();
  drawZone(scene, pulse);
  drawRoutes(scene);
  drawPins(scene);
  drawPlayerModel(scene);
  startRenderLoop();
}

function startRenderLoop() {
  if (frameId === null) frameId = requestAnimationFrame(draw);
}

function renderScene() {
  const scene = scenes[sceneIndex];
  slider.value = sceneIndex;
  timelineName.textContent = `${sceneIndex + 1}. ${scene.title}`;
  sceneCard.innerHTML = `<time>${scene.time}</time><h3>${scene.title}</h3><p>${scene.summary}</p><div class="scene-meta"><span>место</span><strong>${scene.place}</strong><span>состояние</span><strong>${scene.weather}</strong></div>`;
  ticks.querySelectorAll("button").forEach((button, index) => button.classList.toggle("is-active", index === sceneIndex));
}

function setScene(index) {
  sceneIndex = Math.max(0, Math.min(scenes.length - 1, index));
  animationStart = performance.now();
  renderScene();
}

function buildTicks() {
  ticks.innerHTML = "";
  scenes.forEach((scene, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = `${index + 1}`;
    button.title = `${scene.time} — ${scene.title}`;
    button.addEventListener("click", () => setScene(index));
    ticks.appendChild(button);
  });
}

function getInteractiveItems(scene) {
  const pins = scene.pins.map((pin) => ({ ...pin, type: "Город", radius: 18 }));
  return [...pins];
}

function findHover(clientX, clientY) {
  const rect = canvas.getBoundingClientRect();
  const localX = clientX - rect.left;
  const localY = clientY - rect.top;
  return getInteractiveItems(scenes[sceneIndex]).find((item) => {
    const [x, y] = point(item.x, item.y);
    return Math.hypot(localX - x, localY - y) < item.radius;
  });
}

function showTooltip(item, clientX, clientY) {
  tooltip.innerHTML = `<strong>${item.type}: ${item.label}</strong><span>${item.text}</span>`;
  tooltip.classList.add("is-visible");
  const rect = canvas.getBoundingClientRect();
  tooltip.style.left = `${Math.max(12, Math.min(clientX - rect.left + 16, rect.width - 280))}px`;
  tooltip.style.top = `${Math.max(12, clientY - rect.top - 16)}px`;
}

canvas.addEventListener("mousemove", (event) => {
  const item = findHover(event.clientX, event.clientY);
  if (item) {
    activeHover = item;
    showTooltip(item, event.clientX, event.clientY);
    canvas.style.cursor = "pointer";
  } else {
    activeHover = null;
    tooltip.classList.remove("is-visible");
    canvas.style.cursor = "crosshair";
  }
});

canvas.addEventListener("click", (event) => {
  const item = activeHover || findHover(event.clientX, event.clientY);
  if (item) showTooltip(item, event.clientX, event.clientY);
});

canvas.addEventListener("mouseleave", () => tooltip.classList.remove("is-visible"));
slider.addEventListener("input", (event) => setScene(Number(event.target.value)));
prevScene.addEventListener("click", () => setScene(sceneIndex - 1));
nextScene.addEventListener("click", () => setScene(sceneIndex + 1));
window.addEventListener("resize", resizeCanvas);

buildTicks();
renderScene();
resizeCanvas();
