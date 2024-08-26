let numLines = 180;
let radius;
let centerX, centerY;
let barHeights = [];
let time = 0;

function setup() {
  let canvas = createCanvas(600, 600);
  canvas.style("display", "block");
  radius = min(width, height) * 0.4;
  centerX = width / 2;
  centerY = height / 2;
  angleMode(DEGREES);

  // Pre-calculate bar heights
  for (let i = 0; i < numLines; i++) {
    barHeights[i] = random(0, radius * 0.8);
  }
}

function getDistortion(angle, time) {
  let distortionAmount = radius * 0.15;
  return sin(angle * 6 + time) * distortionAmount;
}

function draw() {
  background(255);

  // Draw inner pink bars
  strokeWeight(3);
  stroke(255, 20, 100);
  for (let i = 0; i < numLines; i++) {
    let angle = map(i, 0, numLines, 0, 360);
    let distortion = getDistortion(angle, time);
    let x1 = centerX + cos(angle) * radius * 0.3;
    let y1 = centerY + sin(angle) * radius * 0.3;
    let x2 = centerX + cos(angle) * (radius + distortion);
    let y2 = centerY + sin(angle) * (radius + distortion);
    line(x1, y1, x2, y2);
  }

  // Draw outer circle of thin lines
  stroke(200);
  strokeWeight(1);
  for (let i = 0; i < numLines; i++) {
    let angle = map(i, 0, numLines, 0, 360);
    let distortion = getDistortion(angle, time);
    let x1 = centerX + cos(angle) * (radius + distortion);
    let y1 = centerY + sin(angle) * (radius + distortion);
    let x2 = centerX + cos(angle) * (radius * 1.2 + distortion);
    let y2 = centerY + sin(angle) * (radius * 1.2 + distortion);
    line(x1, y1, x2, y2);
  }

  // Draw central white circle
  noStroke();
  fill(255);
  circle(centerX, centerY, radius * 0.6);

  // Animate the distortion
  time += 0.05;
}
