let numLines = 180;
let radius;
let centerX, centerY;
let barHeights = [];
let waveOffset = 0;
let lastWaveTime = 0;
let waveSpeed = 2; // Adjusted for one full rotation in about 1 second
let waveAmplitude = 30; // Increased for more noticeable effect
let waveWidth = 30; // Controls the width of the affected area
let isWaveActive = false;

function setup() {
  let canvas = createCanvas(800, 800);
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

function draw() {
  background(255);

  let currentTime = millis();

  // Check if it's time to start a new wave
  if (currentTime - lastWaveTime > 10000 && !isWaveActive) {
    isWaveActive = true;
    waveOffset = 0;
    lastWaveTime = currentTime;
  }

  // Update wave offset if active
  if (isWaveActive) {
    waveOffset += waveSpeed;
    if (waveOffset >= 360) {
      isWaveActive = false;
      waveOffset = 0;
    }
  }

  // Draw inner pink bars and outer grey lines with localized wave effect
  for (let i = 0; i < numLines; i++) {
    let angle = map(i, 0, numLines, 0, 360);
    let angleDiff = (angle - waveOffset + 360) % 360;
    let waveEffect = 0;

    if (isWaveActive && angleDiff < waveWidth) {
      let normalizedAngle = map(angleDiff, 0, waveWidth, 0, 180);
      waveEffect = sin(normalizedAngle) * waveAmplitude;
    }

    // Inner pink bars
    let x1 = centerX + cos(angle) * (radius * 0.3);
    let y1 = centerY + sin(angle) * (radius * 0.3);
    let x2 = centerX + cos(angle) * (radius * 0.3 + barHeights[i] + waveEffect);
    let y2 = centerY + sin(angle) * (radius * 0.3 + barHeights[i] + waveEffect);
    strokeWeight(3);
    stroke(255, 20, 100);
    line(x1, y1, x2, y2);

    // Outer grey lines
    stroke(200);
    strokeWeight(1);
    let x3 = centerX + cos(angle) * (radius * 1.2 + waveEffect);
    let y3 = centerY + sin(angle) * (radius * 1.2 + waveEffect);
    line(x2, y2, x3, y3);
  }

  // Draw central white circle
  noStroke();
  fill(255);
  circle(centerX, centerY, radius * 0.6);
}
