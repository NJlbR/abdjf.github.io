const tabs = document.querySelectorAll("[data-route]");
const views = document.querySelectorAll(".view");

function showRoute(route) {
  views.forEach((view) => view.classList.toggle("is-visible", view.id === route));
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.classList.toggle("is-active", tab.dataset.route === route);
  });
  if (route === "map") {
    requestAnimationFrame(resizeCanvas);
  }
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
  {
    time: "Год 0. Нулевая ночь",
    title: "Разлом над Кромом",
    place: "Кром, западная гряда",
    summary: "Первый разлом гасит небо над городом. Проводники отмечают точки, где позже появятся дороги Черновечья.",
    weather: "черный снег",
    tint: "#e44778",
    zones: [{ x: 0.26, y: 0.32, r: 0.11, label: "Разлом" }],
    pins: [
      { x: 0.25, y: 0.34, label: "Кром", text: "Место первого знака. Здесь начинается маршрут героя." },
      { x: 0.38, y: 0.55, label: "Пепельный порт", text: "Торговый город, где исчезают корабли." }
    ],
    models: [
      { name: "Искатель", from: [0.16, 0.68], to: [0.25, 0.34], color: "#48d2c8", text: "Тестовая модель персонажа идет к Кромскому разлому." }
    ]
  },
  {
    time: "Год 1. Первый зов",
    title: "Марш через Вересковую сушь",
    place: "Вересковая сушь",
    summary: "Голос из разлома ведет караван на юг. На карте проявляется первый маршрут, а северная зона становится недоступной.",
    weather: "пыльные молнии",
    tint: "#d9a84e",
    zones: [{ x: 0.43, y: 0.48, r: 0.14, label: "Сухой фронт" }],
    pins: [
      { x: 0.44, y: 0.49, label: "Вересковая сушь", text: "Слой пустых поселений между двумя королевствами." },
      { x: 0.58, y: 0.39, label: "Башня Слуха", text: "Станция, принимающая голоса будущих треков." }
    ],
    models: [
      { name: "Караван", from: [0.25, 0.34], to: [0.58, 0.39], color: "#48d2c8", text: "Движение модели синхронизировано с выбранной сценой." },
      { name: "Тень", from: [0.69, 0.71], to: [0.44, 0.49], color: "#e44778", text: "Враждебная сущность появляется только в этой точке времени." }
    ]
  },
  {
    time: "Год 2. Пепельный дождь",
    title: "Падение южных маяков",
    place: "Пепельный порт",
    summary: "Береговая линия меняется: маяки гаснут, порт становится главным узлом для следующей главы.",
    weather: "соленый пепел",
    tint: "#b7303b",
    zones: [{ x: 0.38, y: 0.6, r: 0.1, label: "Затопление" }],
    pins: [
      { x: 0.36, y: 0.61, label: "Пепельный порт", text: "Всплывающее окно можно заменить полноценной карточкой лора." },
      { x: 0.63, y: 0.64, label: "Мертвый пролив", text: "Граница будущего конфликта." }
    ],
    models: [
      { name: "Сигнальный огонь", from: [0.36, 0.61], to: [0.63, 0.64], color: "#d9a84e", text: "Модель может быть заменена спрайтом, видео или 3D-объектом." }
    ]
  },
  {
    time: "Год 3. Глухие знамена",
    title: "Сбор на центральной площади",
    place: "Город Ним",
    summary: "Фракции сходятся в центре карты. Маркеры показывают, как несколько сюжетных линий могут жить в одном моменте.",
    weather: "безветрие",
    tint: "#48d2c8",
    zones: [{ x: 0.51, y: 0.5, r: 0.12, label: "Площадь" }],
    pins: [
      { x: 0.51, y: 0.5, label: "Ним", text: "Столица, где объявляют начало Черновечья." },
      { x: 0.73, y: 0.46, label: "Архив Тишины", text: "Место для будущей большой модалки с документами." }
    ],
    models: [
      { name: "Посланник", from: [0.58, 0.39], to: [0.51, 0.5], color: "#48d2c8", text: "Сюжетная модель с линейным маршрутом." },
      { name: "Хор", from: [0.73, 0.46], to: [0.51, 0.5], color: "#d9a84e", text: "Групповая модель может раскрывать пояснение по клику." }
    ]
  },
  {
    time: "Год 4. Железная луна",
    title: "Ночь над Восточным кругом",
    place: "Восточный круг",
    summary: "На востоке появляется новый слой карты. Цвет зоны и поведение моделей задаются из конфигурации сцены.",
    weather: "лунный гул",
    tint: "#8d63ff",
    zones: [{ x: 0.73, y: 0.34, r: 0.15, label: "Лунный круг" }],
    pins: [
      { x: 0.73, y: 0.34, label: "Восточный круг", text: "Точка для будущей анимированной 3D-модели." },
      { x: 0.82, y: 0.56, label: "Сад Стекла", text: "Побочная история будущего релиза." }
    ],
    models: [
      { name: "Лунный механизм", from: [0.73, 0.34], to: [0.82, 0.56], color: "#8d63ff", text: "Пульсирующий объект показывает смену состояния мира." }
    ]
  },
  {
    time: "Год 5. Река без отражений",
    title: "Переправа через темную воду",
    place: "Река Ноль",
    summary: "Герои пересекают реку, где карта показывает не только точки, но и активный маршрут между ними.",
    weather: "низкий туман",
    tint: "#48d2c8",
    zones: [{ x: 0.6, y: 0.66, r: 0.1, label: "Туман" }],
    pins: [
      { x: 0.59, y: 0.66, label: "Река Ноль", text: "Отсюда легко добавить альтернативные ветки маршрута." },
      { x: 0.48, y: 0.78, label: "Остров Сна", text: "Появляется только после пятой точки времени." }
    ],
    models: [
      { name: "Лодка", from: [0.38, 0.6], to: [0.48, 0.78], color: "#48d2c8", text: "Движение имитирует переправу между сценами." }
    ]
  },
  {
    time: "Год 6. Последний костер",
    title: "Осада северного костра",
    place: "Северный костер",
    summary: "Финальная зона сжимается вокруг северного узла. Маркеры помогают читать причинно-следственные связи.",
    weather: "сухой мороз",
    tint: "#ff6a3d",
    zones: [{ x: 0.33, y: 0.21, r: 0.13, label: "Осада" }],
    pins: [
      { x: 0.33, y: 0.21, label: "Северный костер", text: "Опорная точка перед финальным треком." },
      { x: 0.21, y: 0.48, label: "Старый тракт", text: "Здесь можно показать флэшбек или скрытый объект." }
    ],
    models: [
      { name: "Страж", from: [0.51, 0.5], to: [0.33, 0.21], color: "#ff6a3d", text: "Тестовая модель меняет цвет под сцену." },
      { name: "Искатель", from: [0.48, 0.78], to: [0.33, 0.21], color: "#48d2c8", text: "Один персонаж может продолжать путь через несколько сцен." }
    ]
  },
  {
    time: "Год 7. Черновечье",
    title: "Мир после последнего звука",
    place: "Черный горизонт",
    summary: "Все сюжетные линии сходятся в финальной композиции. Карта затемняется, оставляя активными ключевые объекты.",
    weather: "тишина",
    tint: "#f6f0e8",
    zones: [{ x: 0.5, y: 0.44, r: 0.22, label: "Черновечье" }],
    pins: [
      { x: 0.5, y: 0.44, label: "Черный горизонт", text: "Финальная точка, в которую можно добавить полноэкранное пояснение." },
      { x: 0.69, y: 0.24, label: "Белый предел", text: "Место для тизера следующей главы." }
    ],
    models: [
      { name: "Голос", from: [0.33, 0.21], to: [0.5, 0.44], color: "#f6f0e8", text: "Финальная модель остается интерактивной." }
    ]
  }
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
let activeHover = null;
let animationStart = performance.now();
let canvasBox = canvas.getBoundingClientRect();
let frameId = null;

const continents = [
  [[0.13, 0.28], [0.25, 0.18], [0.39, 0.22], [0.43, 0.35], [0.35, 0.49], [0.2, 0.51], [0.11, 0.42]],
  [[0.45, 0.31], [0.58, 0.24], [0.76, 0.28], [0.83, 0.43], [0.76, 0.59], [0.58, 0.57], [0.47, 0.45]],
  [[0.31, 0.57], [0.45, 0.55], [0.55, 0.68], [0.48, 0.83], [0.34, 0.78], [0.25, 0.68]],
  [[0.66, 0.62], [0.84, 0.61], [0.9, 0.74], [0.78, 0.84], [0.63, 0.78]]
];

function cssVar(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function resizeCanvas() {
  canvasBox = canvas.getBoundingClientRect();
  const ratio = window.devicePixelRatio || 1;
  canvas.width = Math.max(1, Math.floor(canvasBox.width * ratio));
  canvas.height = Math.max(1, Math.floor(canvasBox.height * ratio));
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  startRenderLoop();
}

function point(x, y) {
  return [x * canvasBox.width, y * canvasBox.height];
}

function drawPolygon(points, fill, stroke) {
  ctx.beginPath();
  points.forEach(([x, y], index) => {
    const [px, py] = point(x, y);
    if (index === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  });
  ctx.closePath();
  ctx.fillStyle = fill;
  ctx.fill();
  ctx.strokeStyle = stroke;
  ctx.lineWidth = 1.4;
  ctx.stroke();
}

function drawMapBase() {
  const w = canvasBox.width;
  const h = canvasBox.height;
  const water = ctx.createLinearGradient(0, 0, w, h);
  water.addColorStop(0, "#101c22");
  water.addColorStop(0.5, "#0b141b");
  water.addColorStop(1, "#070b10");
  ctx.fillStyle = water;
  ctx.fillRect(0, 0, w, h);

  ctx.strokeStyle = "rgba(246, 240, 232, 0.04)";
  ctx.lineWidth = 1;
  for (let x = 0; x < w; x += 54) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
  for (let y = 0; y < h; y += 54) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }

  continents.forEach((shape, index) => {
    drawPolygon(shape, index % 2 ? "#303f35" : "#27362f", "rgba(246, 240, 232, 0.2)");
  });
}

function drawZones(scene, pulse) {
  scene.zones.forEach((zone) => {
    const [x, y] = point(zone.x, zone.y);
    const radius = zone.r * Math.min(canvasBox.width, canvasBox.height) * (1 + pulse * 0.06);
    const gradient = ctx.createRadialGradient(x, y, radius * 0.12, x, y, radius);
    gradient.addColorStop(0, `${scene.tint}88`);
    gradient.addColorStop(0.65, `${scene.tint}24`);
    gradient.addColorStop(1, `${scene.tint}00`);
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = `${scene.tint}99`;
    ctx.setLineDash([8, 8]);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = "rgba(246, 240, 232, 0.76)";
    ctx.font = "700 12px Segoe UI";
    ctx.fillText(zone.label, x + radius * 0.36, y - radius * 0.36);
  });
}

function drawRoute(scene) {
  scene.models.forEach((model) => {
    const [sx, sy] = point(model.from[0], model.from[1]);
    const [tx, ty] = point(model.to[0], model.to[1]);
    ctx.strokeStyle = `${model.color}66`;
    ctx.lineWidth = 2;
    ctx.setLineDash([7, 8]);
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
    ctx.fillStyle = "rgba(5, 5, 6, 0.72)";
    ctx.beginPath();
    ctx.arc(x, y, 13, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = cssVar("--accent");
    ctx.beginPath();
    ctx.arc(x, y, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(246, 240, 232, 0.78)";
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = "rgba(246, 240, 232, 0.86)";
    ctx.font = "700 12px Segoe UI";
    ctx.fillText(pin.label, x + 14, y - 12);
  });
}

function drawModels(scene, pulse) {
  const t = (Math.sin((performance.now() - animationStart) / 700) + 1) / 2;
  scene.models.forEach((model) => {
    const [sx, sy] = point(model.from[0], model.from[1]);
    const [tx, ty] = point(model.to[0], model.to[1]);
    const x = sx + (tx - sx) * t;
    const y = sy + (ty - sy) * t;
    const size = 10 + pulse * 2;

    ctx.fillStyle = "rgba(0, 0, 0, 0.42)";
    ctx.beginPath();
    ctx.ellipse(x, y + 9, 18, 7, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = model.color;
    ctx.beginPath();
    ctx.moveTo(x, y - size);
    ctx.lineTo(x + size, y + size);
    ctx.lineTo(x - size, y + size);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "rgba(246, 240, 232, 0.88)";
    ctx.stroke();

    ctx.fillStyle = "rgba(246, 240, 232, 0.92)";
    ctx.font = "800 11px Segoe UI";
    ctx.fillText(model.name, x + 14, y + 5);
  });
}

function draw() {
  frameId = null;
  if (!canvasBox.width || !canvasBox.height) return;
  const scene = scenes[sceneIndex];
  const pulse = (Math.sin((performance.now() - animationStart) / 520) + 1) / 2;
  drawMapBase();
  drawZones(scene, pulse);
  drawRoute(scene);
  drawPins(scene);
  drawModels(scene, pulse);
  startRenderLoop();
}

function startRenderLoop() {
  if (frameId === null) {
    frameId = requestAnimationFrame(draw);
  }
}

function renderScene() {
  const scene = scenes[sceneIndex];
  slider.value = sceneIndex;
  timelineName.textContent = `${sceneIndex + 1}. ${scene.title}`;
  sceneCard.innerHTML = `
    <time>${scene.time}</time>
    <h3>${scene.title}</h3>
    <p>${scene.summary}</p>
    <div class="scene-meta">
      <span>место</span>
      <strong>${scene.place}</strong>
      <span>состояние</span>
      <strong>${scene.weather}</strong>
    </div>
  `;
  ticks.querySelectorAll("button").forEach((button, index) => {
    button.classList.toggle("is-active", index === sceneIndex);
  });
  activeHover = null;
  hideTooltip();
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
    button.textContent = `0${index + 1}`;
    button.title = scene.title;
    button.addEventListener("click", () => setScene(index));
    ticks.appendChild(button);
  });
}

function getInteractiveItems(scene) {
  const pins = scene.pins.map((pin) => ({ ...pin, type: "Место", radius: 18 }));
  const models = scene.models.map((model) => {
    const [sx, sy] = model.from;
    const [tx, ty] = model.to;
    return {
      x: (sx + tx) / 2,
      y: (sy + ty) / 2,
      label: model.name,
      text: model.text,
      type: "Модель",
      radius: 28
    };
  });
  return [...pins, ...models];
}

function findHover(clientX, clientY) {
  const rect = canvas.getBoundingClientRect();
  const localX = clientX - rect.left;
  const localY = clientY - rect.top;
  const items = getInteractiveItems(scenes[sceneIndex]);
  return items.find((item) => {
    const [x, y] = point(item.x, item.y);
    return Math.hypot(localX - x, localY - y) < item.radius;
  });
}

function showTooltip(item, clientX, clientY) {
  tooltip.innerHTML = `<strong>${item.type}: ${item.label}</strong><span>${item.text}</span>`;
  tooltip.classList.add("is-visible");
  const rect = canvas.getBoundingClientRect();
  const x = Math.min(clientX - rect.left + 16, rect.width - 280);
  const y = Math.max(12, clientY - rect.top - 16);
  tooltip.style.left = `${Math.max(12, x)}px`;
  tooltip.style.top = `${y}px`;
}

function hideTooltip() {
  tooltip.classList.remove("is-visible");
}

canvas.addEventListener("mousemove", (event) => {
  const item = findHover(event.clientX, event.clientY);
  if (item) {
    activeHover = item;
    showTooltip(item, event.clientX, event.clientY);
    canvas.style.cursor = "pointer";
  } else {
    activeHover = null;
    hideTooltip();
    canvas.style.cursor = "crosshair";
  }
});

canvas.addEventListener("click", (event) => {
  const item = activeHover || findHover(event.clientX, event.clientY);
  if (item) {
    showTooltip(item, event.clientX, event.clientY);
  }
});

canvas.addEventListener("mouseleave", hideTooltip);

slider.addEventListener("input", (event) => setScene(Number(event.target.value)));
prevScene.addEventListener("click", () => setScene(sceneIndex - 1));
nextScene.addEventListener("click", () => setScene(sceneIndex + 1));
window.addEventListener("resize", resizeCanvas);

buildTicks();
renderScene();
resizeCanvas();
