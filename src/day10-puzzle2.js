const fs = require('fs');
const path = require('path');

function buildAsteroidBelt() {
  const data = fs.readFileSync(
    path.join(__dirname, 'day10.txt'),
    'utf-8'
  );
  const asteroids = data.split('\n');
  asteroids.forEach((asteroidLine, index) => {
    asteroids[index] = asteroidLine.split('');
  });
  const asteroidPoints = [];
  for (let i = 0; i < asteroids.length; i++) {
    for (let j = 0; j < asteroids[i].length; j++) {
      if (asteroids[i][j] == '#') {
        asteroidPoints.push([j,i]);
      }
    }
  }
  return asteroidPoints;
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

function vaporize(startingPoint, asteroids) {
  let numVaporized = 0;
  anglesList = {};
  for (let i in asteroids) {
    const asteroid = asteroids[i];
    let angle = Math.atan2(asteroid[0] - startingPoint[0], asteroid[1] - startingPoint[1]) * (180/Math.PI);
    if (anglesList[angle] == undefined) {
      anglesList[angle] = [asteroid];
    } else {
      anglesList[angle].push(asteroid);
    }
  }

  let sortedKeys = Object.keys(anglesList).sort((a,b) => { return a-b }).reverse();
  for (let i in sortedKeys) {
    const optionsToVaporize = anglesList[sortedKeys[i]];
    if (optionsToVaporize.length == 1) {
      numVaporized++;
      const a = anglesList[sortedKeys[i]].shift();
      console.log(`${numVaporized}th asteroid vaporized is (${a[0]}, ${a[1]})`)
    } else if (optionsToVaporize.length == 0) {
      continue;
    } else {
      const sortedOptions = optionsToVaporize.sort((a, b) => {
        return Math.hypot(a[0]-startingPoint[0], a[1]-startingPoint[1]) < Math.hypot(b[0]-startingPoint[0], b[1]-startingPoint[1]) ? -1 : 1;
      });
      numVaporized++;
      const a = sortedOptions.shift();
      console.log(`${numVaporized}th asteroid vaporized is (${a[0]}, ${a[1]})`)
      anglesList[sortedKeys[i]] = sortedOptions;
    }
  }
}

function main() {
  const asteroids = buildAsteroidBelt();
  let max = -Infinity;
  let maxX = 0;
  let maxY = 0;
  for (index in asteroids) {
    let [numVisible, x, y] = findNumPointsForAsteroid(asteroids[index][0], asteroids[index][1], asteroids);
    if (numVisible > max) {
      maxX = x;
      maxY = y;
      max = numVisible;
    }
  }
  console.log(`At (${maxX},${maxY}) there are ${max} asteroids seen`);
  const startingPoint = [26,36];
  vaporize(startingPoint, asteroids);
}

main();
