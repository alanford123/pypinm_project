// socket
var socket = io.connect("http://" + document.domain + ":" + location.port);

socket.on("connect", function() {
  console.log("connected");
});

//form
let button = document.getElementById("submit");
let startButton = document.getElementById("start");
let drawButton = document.getElementById("draw");
let pressure = document.getElementById("pressure");
let diam = document.getElementById("diam");
let height = document.getElementById("height");
let gravity = document.getElementById("g");
button.addEventListener("click", function() {
  console.log(height.value, gravity.value);
  socket.emit("settings", {
    g0: gravity.value,
    height: height.value,
    diam: diam.value,
    pressure: pressure.value
  });
});

startButton.addEventListener("click", function() {
  console.log("startingCalc");
  socket.emit("startCalculation");
});

drawButton.addEventListener("click", function() {
  console.log("drawing");
  drawGraph();
});

let a = null;
let t = null;

socket.on("calculationResponse", function(response) {
  console.log(response);
  a = response.a;
  t = response.t;
});

function drawGraph() {
  TESTER = document.getElementById("tester");
  Plotly.plot(
    TESTER,
    [
      {
        x: t,
        y: a
      }
    ],
    {
      margin: { t: 0 }
    }
  );
}
