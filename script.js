import Dijkstra from "./Dijkstra.js";
let canvas = document.getElementById("canvas");
let router = document.getElementById("router");
let routerCount = 0;
let routers = [];
let connections = [];
router.addEventListener("click", onDeviceClick);

function onDeviceClick() {
  canvas.addEventListener("click", onDevicePlace);
}

function onDevicePlace(event) {
  let x = event.clientX;
  let y = event.clientY;
  let routerWrapper = document.createElement("div");
  let router = document.createElement("img");
  router.addEventListener("click", routerClicked);
  router.src = "./images/router.png";
  router.id = "router" + routerCount;
  router.classList.add("router");
  routerWrapper.classList.add("router-wrapper");
  routerWrapper.id += router.id;
  routerWrapper.setAttribute("data-content", router.id);
  routerWrapper.appendChild(router);
  let idElement = document.createElement("p");
  idElement.textContent = router.id;
  routerWrapper.appendChild(idElement);

  let weightElement = document.createElement("p");
  weightElement.classList.add(router.id);
  routerWrapper.appendChild(weightElement);
  canvas.appendChild(routerWrapper);
  y = y - router.height / 2 + "px";
  x = x - canvas.getBoundingClientRect().x - router.width / 2 + "px";
  routerWrapper.style.top = y;
  routerWrapper.style.left = x;
  canvas.removeEventListener("click", onDevicePlace);
  routers.push(router.id.toString());
  updateDisplay();
  routerCount += 1;
}

let clickedRouters = [];
function routerClicked(event) {
  clickedRouters.push(event.target);

  // I wanna add a visual to show all actions in a feed
  if (clickedRouters.length % 2 == 0) {
    let weight = prompt("What weight should this line hold?");
    if (weight == null) {
      clickedRouters = [];
      return;
    }
    let el1 = clickedRouters.shift();
    let el2 = event.target;

    linedraw(el1, el2, parseInt(weight));
    // add info for doing Dijkstra
    connections.push({
      firstNode: el1.id,
      secondNode: el2.id,
      weight: parseInt(weight),
    });
    updateDisplay();
    clickedRouters = [];
  }
}

// mostly borrowed code below. augmented for this use case. very nice!
let lineCounter = 0;
function linedraw(el1, el2, weight) {
  el1 = el1.getBoundingClientRect();
  el2 = el2.getBoundingClientRect();
  let x1 = el1.x + el1.width / 2;
  let y1 = el1.y + el1.height / 2;
  let x2 = el2.x + el2.width / 2;
  let y2 = el2.y + el2.height / 2;
  if (x2 < x1) {
    let tmp;
    tmp = x2;
    x2 = x1;
    x1 = tmp;
    tmp = y2;
    y2 = y1;
    y1 = tmp;
  }

  let lineLength = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  let m = (y2 - y1) / (x2 - x1);

  let degree = (Math.atan(m) * 180) / Math.PI;

  document.getElementById("lines").innerHTML +=
    "<div class='line' id='line" +
    lineCounter +
    "'" +
    " data-weight='" +
    weight +
    "'" +
    "style='transform-origin: top left; transform: rotate(" +
    degree +
    "deg); width: " +
    lineLength +
    "px; height: 1px; background: black; position: absolute; top: " +
    y1 +
    "px; left: " +
    x1 +
    "px;'></div>";

  lineCounter += 1;
}

function updateDisplay() {
  let dijkstra = new Dijkstra(connections, routers, routers[0]);
  let finalConnections = dijkstra.performDijkstra();
  for (let result in finalConnections) {
    let routerElement = document.querySelector("." + result);
    routerElement.textContent = finalConnections[result].weight;
  }
  console.log(finalConnections);
}

window.addEventListener("resize", function () {
  lineCounter = 0;
  document.getElementById("lines").innerHTML = "";
  for (let conn of connections) {
    let el1 = document.getElementById(conn.firstNode);
    let el2 = document.getElementById(conn.secondNode);
    linedraw(el1, el2, parseInt(conn.weight));
  }
});
