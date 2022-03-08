let canvas = document.getElementById("canvas");
let router = document.getElementById("router");
let routerCount = 0;
router.addEventListener("click", onDeviceClick);

function onDeviceClick() {
  canvas.addEventListener("click", onCanvasUp);
}

function onCanvasUp(event) {
  let x = event.clientX;
  let y = event.clientY;
  let image = document.createElement("img");
  image.src = "./images/router.png";
  image.id = routerCount;
  image.classList.add("router");
  image.style =
    "height:auto; position:absolute; top:" +
    y +
    "px; left:" +
    (x - canvas.getBoundingClientRect().x) +
    "px;";
  image.addEventListener("click", routerClicked);
  canvas.appendChild(image);
  canvas.removeEventListener("click", onCanvasUp);

  routerCount += 1;
}

// change from event based constraint to a stack of elements
// then there can be a dict of edges made between routers

let routerStack = [];
function routerClicked(event) {
  routerStack.push(event.target);

  if (routerStack.length % 2 == 1) {
    console.log("added");
  } else {
    console.log("removed");
    let firstRouter = routerStack.shift();
    console.log(firstRouter);
    console.log(
      `FirstX = ${firstRouter.x} | FirstY = ${firstRouter.y}\n SecondX = ${event.clientX} | SecondY = ${event.clientY}`
    );
    linedraw(firstRouter, event.target);
    routerStack = [];
  }
}

// borrowed code below. augmented for this use case. very nice!
function linedraw(el1, el2) {
  let x1 = el1.x + el1.width / 2;
  let y1 = el1.y + el1.height / 2;
  let x2 = el2.x + el2.width / 2;
  let y2 = el2.y + el2.height / 2;
  if (x2 < x1) {
    var tmp;
    tmp = x2;
    x2 = x1;
    x1 = tmp;
    tmp = y2;
    y2 = y1;
    y1 = tmp;
  }

  var lineLength = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  var m = (y2 - y1) / (x2 - x1);

  var degree = (Math.atan(m) * 180) / Math.PI;

  document.getElementById("lines").innerHTML +=
    "<div class='line' style='transform-origin: top left; transform: rotate(" +
    degree +
    "deg); width: " +
    lineLength +
    "px; height: 1px; background: black; position: absolute; top: " +
    y1 +
    "px; left: " +
    x1 +
    "px;'></div>";
}
