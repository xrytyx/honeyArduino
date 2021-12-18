
// Set up serial
let serial;
let latestData = "waiting for data";

let xValue;
let lastX = [];

let yValue;
let lastY = [];

let zValue;
let lastZ = [];


let Honey;
let img;
let imgbuzz;

let spacing = 300;

function preload() {
  // honeyComb = loadModel('HoneyC.obj', true);
  Honey = loadModel('HexBee.obj', true);
  img = loadImage ('comb.jpg');
  imgbuzz = loadImage ('beebuzz.png');

}



function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
  serial = new p5.SerialPort();

  serial.list();
  serial.open('/dev/tty.usbmodem14401');

  serial.on('connected', serverConnected);

  serial.on('list', gotList);

  serial.on('data', gotData);

  serial.on('error', gotError);

  serial.on('open', gotOpen);

  serial.on('close', gotClose);
}

function serverConnected() {
  print("Connected to Server");
}

function gotList(thelist) {
  print("List of Serial Ports:");

  for (let i = 0; i < thelist.length; i++) {
    print(i + " " + thelist[i]);
  }
}

function gotOpen() {
  print("Serial Port is Open");
}

function gotClose(){
  print("Serial Port is Closed");
  latestData = "Serial Port is Closed";
}

function gotError(theerror) {
  print(theerror);
}

function gotData() {
  let currentString = serial.readLine();
  trim(currentString);
  if (!currentString) return;
  // console.log(currentString);
  latestData = currentString;
}

function draw() {
  background(255,255,255);
  fill(0,0,0);
  text(latestData, 10, 10);

  let splitString = split(latestData, ' ');
  // console.log(splitString);
  // console.log(splitString[1]);
  xValue = float(splitString[1]);

  // lastX.push(xValue);

  // let remappedXValue = map(avg(lastX), -15, 15, 0, 360);
  // lastX.slice(lastX.length-30);
  // console.log(avg(lastX));

  yValue = float(splitString[4]);
  zValue = float(splitString[7]);
  console.log(latestData);

  let remappedXValue = map(xValue, -15, 15, 0, 360);
  let remappedYValue = map(yValue, -15, 15, 0, 360);
  let remappedZValue = map(zValue, -15, 15, 0, 360);
  // lastY.push(yValue);
  // lastZ.push(zValue);

  // push();
  // translate(xValue+50, 50);
  // rotate(xValue);
  // ellipse(0, 0, xValue, 10);
  // pop();

  ambientLight(255);
  noStroke();

  for (x = 0; x <= width; x += spacing) {
    for (y = 0; y <= height; y += spacing) {



      push();
      translate(-3 + x, -3 +y);


      rotateX(remappedXValue);
      rotateY(remappedYValue);
      rotateZ(remappedZValue);

      texture(img);
      model(Honey);
      pop();

    }

  }



  // image(imgbuzz,mouseX, mouseY);







  // let splitStringX = split(splitString[1], ' ');

  // Polling method
  /*
  if (serial.available() > 0) {
  let data = serial.read();
  ellipse(50,50,data,data);
}
*/
}


function avg(t) {
  let sum = 0;
  for (let item of t) {
    sum += item;
  }
  return sum / t.length;
}
