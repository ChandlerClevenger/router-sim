let canvas = document.getElementById("canvas");
let router = document.getElementById("router");
router.addEventListener("click", onDeviceClick);

function onDeviceClick() {
  canvas.addEventListener("click", onCanvasUp);
}

function onCanvasUp(event) {
  let x = event.clientX;
  let y = event.clientY;
  let boundRect = canvas.getBoundingClientRect();
  console.log(`X ${x}: Y ${y}`);
  let image = document.createElement("img");
  console.log(boundRect);
  image.src = "./images/router.png";
  image.style =
    "width:10vw; height:auto; position:absolute; top:" +
    y +
    "px; left:" +
    (x - canvas.getBoundingClientRect().x) +
    "px;";
  canvas.appendChild(image);
  canvas.removeEventListener("click", onCanvasUp);
}

// change from event based constraint to a stack of elements
// then there can be a dict of edges made between routers
