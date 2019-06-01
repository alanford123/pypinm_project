// socket
var socket = io.connect("http://" + document.domain + ":" + location.port);

socket.on("connect", function() {
  console.log("connected");
});


//form
let button = document.getElementById('submit');
let startButton = document.getElementById('start');
let mass = document.getElementById('mass');
let gravity = document.getElementById('g');
button.addEventListener('click',function(){
console.log(mass.value,gravity.value)
    socket.emit("settings", { g0: gravity.value, m: mass.value });
})

startButton.addEventListener('click',function(){
    console.log('startingCalc')
        socket.emit("startCalculation");
    })

    socket.on("calculationResponse", function(response) {
        console.log(response.data);
      });