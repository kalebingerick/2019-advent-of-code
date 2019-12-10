const fs = require('fs');
const path = require('path');

function buildAsteroidBelt() {
  const data = fs.readFileSync(
    path.join(__dirname, '../input-files/day10.txt'),
    'utf-8'
  );
  const asteroids = data.split('\n');
  asteroids.forEach((asteroidLine, index) => {
    asteroids[index] = asteroidLine.split('');
  });
  return asteroids;
}

function findNumPointsForAsteroid(x, y, asteroidPoints) {
  let numVisibleAsteroids = asteroidPoints.length - 1;
  const alreadySeenAngles = [];
  for (index in asteroidPoints) {
    if (asteroidPoints[index][0] == x && asteroidPoints[index][1] == y) {
      continue;
    }
    const angle = Math.atan2(asteroidPoints[index][0] - x, asteroidPoints[index][1] - y);
    if (alreadySeenAngles.includes(angle)) {
      numVisibleAsteroids--;
    } else {
      alreadySeenAngles.push(angle);
    }
    // console.log(`Point: [${x},${y}] -> [${asteroidPoints[index][0]},${asteroidPoints[index][1]}]. Angle: ${angle}`);
  }
  console.log(`Number of visible asteroids from (${x},${y}): ${numVisibleAsteroids}`);
  return [numVisibleAsteroids, x, y];
}

function main() {
  const asteroids = buildAsteroidBelt();
  const asteroidPoints = [];
  for (let i = 0; i < asteroids.length; i++) {
    for (let j = 0; j < asteroids[i].length; j++) {
      if (asteroids[j][i] == '#') {
        asteroidPoints.push([i,j]);
      }
    }
  }
  let max = -Infinity;
  let maxX = 0;
  let maxY = 0;
  for (index in asteroidPoints) {
    let [numVisible, x, y] = findNumPointsForAsteroid(asteroidPoints[index][0], asteroidPoints[index][1], asteroidPoints);
    if (numVisible > max) {
      maxX = x;
      maxY = y;
      max = numVisible;
    }
  }
  console.log(`At (${maxX},${maxY}) there are ${max} asteroids seen`);
}

main();