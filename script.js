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
  { time: "Год 0. Нулевая ночь", title: "Разлом над Кромом", place: "Кром, западная гряда", summary: "Первый разлом гасит небо над городом.", weather: "черный снег", tint: "#e44778", zones: [{ x: 0.26, y: 0.32, r: 0.08 }], pins: [{ x: 0.25, y: 0.34, label: "Кром", text: "Место первого знака." }, { x: 0.38, y: 0.55, label: "Пепельный порт", text: "Город у тёмной воды." }], models: [{ from: [0.16, 0.68], to: [0.25, 0.34], color: "#48d2c8" }] },
  { time: "Год 1. Первый зов", title: "Марш через Вересковую сушь", place: "Вересковая сушь", summary: "Караван идёт по высохшим степям.", weather: "пыльные молнии", tint: "#d9a84e", zones: [{ x: 0.43, y: 0.48, r: 0.09 }], pins: [{ x: 0.44, y: 0.49, label: "Вересковая сушь", text: "Пограничная территория." }, { x: 0.58, y: 0.39, label: "Башня Слуха", text: "Станция ранних сигналов." }], models: [{ from: [0.25, 0.34], to: [0.58, 0.39], color: "#48d2c8" }] },
  { time: "Год 2. Пепельный дождь", title: "Падение южных маяков", place: "Пепельный порт", summary: "Береговая линия меняется.", weather: "соленый пепел", tint: "#b7303b", zones: [{ x: 0.38, y: 0.6, r: 0.07 }], pins: [{ x: 0.36, y: 0.61, label: "Пепельный порт", text: "Узел южного побережья." }, { x: 0.63, y: 0.64, label: "Мертвый пролив", text: "Граница конфликта." }], models: [{ from: [0.36, 0.61], to: [0.63, 0.64], color: "#d9a84e" }] },
  { time: "Год 3. Глухие знамена", title: "Сбор на центральной площади", place: "Город Ним", summary: "Фракции сходятся в центре.", weather: "безветрие", tint: "#48d2c8", zones: [{ x: 0.51, y: 0.5, r: 0.09 }], pins: [{ x: 0.51, y: 0.5, label: "Ним", text: "Столица событий." }, { x: 0.73, y: 0.46, label: "Архив Тишины", text: "Архив хроник." }], models: [{ from: [0.58, 0.39], to: [0.51, 0.5], color: "#48d2c8" }] },
  { time: "Год 4. Железная луна", title: "Ночь над Восточным кругом", place: "Восточный круг", summary: "Появляется восточный слой карты.", weather: "лунный гул", tint: "#8d63ff", zones: [{ x: 0.73, y: 0.34, r: 0.1 }], pins: [{ x: 0.73, y: 0.34, label: "Восточный круг", text: "Лунные механизмы." }, { x: 0.82, y: 0.56, label: "Сад Стекла", text: "Тихая долина." }], models: [{ from: [0.73, 0.34], to: [0.82, 0.56], color: "#8d63ff" }] },
  { time: "Год 5. Река без отражений", title: "Переправа через темную воду", place: "Река Ноль", summary: "Путь проходит по реке.", weather: "низкий туман", tint: "#48d2c8", zones: [{ x: 0.6, y: 0.66, r: 0.07 }], pins: [{ x: 0.59, y: 0.66, label: "Река Ноль", text: "Речной маршрут." }, { x: 0.48, y: 0.78, label: "Остров Сна", text: "Промежуточная база." }], models: [{ from: [0.38, 0.6], to: [0.48, 0.78], color: "#48d2c8" }] },
  { time: "Год 6. Последний костер", title: "Осада северного костра", place: "Северный костер", summary: "Финальная зона сжимается.", weather: "сухой мороз", tint: "#ff6a3d", zones: [{ x: 0.33, y: 0.21, r: 0.09 }], pins: [{ x: 0.33, y: 0.21, label: "Северный костер", text: "Опорная точка." }, { x: 0.21, y: 0.48, label: "Старый тракт", text: "Старый путь." }], models: [{ from: [0.51, 0.5], to: [0.33, 0.21], color: "#ff6a3d" }] },
  { time: "Год 7. Черновечье", title: "Мир после последнего звука", place: "Черный горизонт", summary: "Линии сходятся в финале.", weather: "тишина", tint: "#f6f0e8", zones: [{ x: 0.5, y: 0.44, r: 0.12 }], pins: [{ x: 0.5, y: 0.44, label: "Черный горизонт", text: "Финальная точка." }, { x: 0.69, y: 0.24, label: "Белый предел", text: "Тизер новой главы." }], models: [{ from: [0.33, 0.21], to: [0.5, 0.44], color: "#f6f0e8" }] }
];

const mapNodes = [
  { id: "krom", x: 0.25, y: 0.34 },
  { id: "port", x: 0.36, y: 0.61 },
  { id: "nim", x: 0.51, y: 0.5 },
  { id: "east", x: 0.73, y: 0.34 },
  { id: "north", x: 0.33, y: 0.21 },
  { id: "river", x: 0.59, y: 0.66 },
  { id: "horizon", x: 0.5, y: 0.44 },
  { id: "glass", x: 0.82, y: 0.56 },
  { id: "island", x: 0.48, y: 0.78 }
];

const mapPaths = [
  ["krom", "north", -10],
  ["krom", "nim", 6],
  ["nim", "horizon", -5],
  ["nim", "east", -8],
  ["east", "glass", 10],
  ["nim", "port", 12],
  ["port", "river", 5],
  ["river", "island", 8],
  ["horizon", "north", -8]
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

const mapImage = new Image();
mapImage.src = "assets/world-map.jpg";
const riderImage = new Image();
riderImage.src = "assets/player-knight.png";

let sceneIndex = 0;
let canvasBox = canvas.getBoundingClientRect();
let frameId = null;
let activeHover = null;
let animationStart = performance.now();

function resizeCanvas() {
  canvasBox = canvas.getBoundingClientRect();
  const ratio = window.devicePixelRatio || 1;
  canvas.width = Math.max(1, Math.floor(canvasBox.width * ratio));
  canvas.height = Math.max(1, Math.floor(canvasBox.height * ratio));
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  startRenderLoop();
}

const point = (x, y) => [x * canvasBox.width, y * canvasBox.height];

function drawFallbackSea() {
  const sea = ctx.createLinearGradient(0, 0, 0, canvasBox.height);
  sea.addColorStop(0, "#0c2f4a");
  sea.addColorStop(1, "#061725");
  ctx.fillStyle = sea;
  ctx.fillRect(0, 0, canvasBox.width, canvasBox.height);
}

function drawMapImage() {
  if (mapImage.complete && mapImage.naturalWidth > 0) ctx.drawImage(mapImage, 0, 0, canvasBox.width, canvasBox.height);
  else drawFallbackSea();
  ctx.fillStyle = "rgba(4, 10, 18, 0.15)";
  ctx.fillRect(0, 0, canvasBox.width, canvasBox.height);
}

function nodeById(id) {
  return mapNodes.find((n) => n.id === id);
}

function drawMapPaths() {
  ctx.lineCap = "round";
  mapPaths.forEach(([from, to, curve]) => {
    const a = nodeById(from);
    const b = nodeById(to);
    if (!a || !b) return;
    const [ax, ay] = point(a.x, a.y);
    const [bx, by] = point(b.x, b.y);
    const dx = bx - ax;
    const dy = by - ay;
    const len = Math.hypot(dx, dy) || 1;
    const nx = -dy / len;
    const ny = dx / len;
    const mx = (ax + bx) * 0.5 + nx * curve;
    const my = (ay + by) * 0.5 + ny * curve;

    ctx.strokeStyle = "rgba(58, 37, 17, 0.7)";
    ctx.lineWidth = 7;
    ctx.beginPath();
    ctx.moveTo(ax, ay);
    ctx.quadraticCurveTo(mx, my, bx, by);
    ctx.stroke();

    ctx.setLineDash([14, 10]);
    ctx.strokeStyle = "rgba(245, 221, 156, 0.95)";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(ax, ay);
    ctx.quadraticCurveTo(mx, my, bx, by);
    ctx.stroke();
    ctx.setLineDash([]);
  });
}

function drawZone(scene, pulse) {
  scene.zones.forEach((zone) => {
    const [x, y] = point(zone.x, zone.y);
    const radius = zone.r * Math.min(canvasBox.width, canvasBox.height) * (1 + pulse * 0.05);
    const glow = ctx.createRadialGradient(x, y, radius * 0.1, x, y, radius);
    glow.addColorStop(0, `${scene.tint}aa`);
    glow.addColorStop(1, `${scene.tint}00`);
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  });
}

function drawPins(scene) {
  scene.pins.forEach((pin) => {
    const [x, y] = point(pin.x, pin.y);
    ctx.fillStyle = "rgba(12, 11, 9, 0.9)";
    ctx.beginPath();
    ctx.arc(x, y, 11, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#f4c66d";
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "rgba(246, 240, 232, 0.92)";
    ctx.font = "700 11px Segoe UI";
    ctx.fillText(pin.label, x + 12, y - 10);
  });
}

function drawKnight(scene) {
  const model = scene.models[0];
  if (!model) return;
  const t = (Math.sin((performance.now() - animationStart) / 900) + 1) / 2;
  const [sx, sy] = point(model.from[0], model.from[1]);
  const [tx, ty] = point(model.to[0], model.to[1]);
  const x = sx + (tx - sx) * t;
  const y = sy + (ty - sy) * t;
  const angle = Math.atan2(ty - sy, tx - sx) + Math.PI / 2;

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);

  if (riderImage.complete && riderImage.naturalWidth > 0) {
    const h = 98;
    const w = (riderImage.naturalWidth / riderImage.naturalHeight) * h;
    ctx.drawImage(riderImage, -w / 2, -h / 2, w, h);
  } else {
    ctx.fillStyle = "rgba(239, 228, 207, 0.92)";
    ctx.beginPath();
    ctx.arc(0, -10, 8, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

function draw() {
  frameId = null;
  if (!canvasBox.width || !canvasBox.height) return;
  const scene = scenes[sceneIndex];
  const pulse = (Math.sin((performance.now() - animationStart) / 540) + 1) / 2;
  drawMapImage();
  drawMapPaths();
  drawZone(scene, pulse);
  drawPins(scene);
  drawKnight(scene);
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
  return scene.pins.map((pin) => ({ ...pin, type: "Город", radius: 18 }));
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
mapImage.addEventListener("load", startRenderLoop);
riderImage.addEventListener("load", startRenderLoop);

buildTicks();
renderScene();
resizeCanvas();
