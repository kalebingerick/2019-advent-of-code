// key = [0,0]
// value = 0, 1, 2
function drawWire(coordinate, prevStartingPoint, numSteps, map) {
  // coordinate like R8, L7, etc
  // prevStartingPoint = [1,3]
  const type = coordinate.substring(0,1);
  const value = parseInt(coordinate.substring(1));
  let newKey;
  if (type == 'R') {
    for (let i = 1; i <= value; i++) {
      numSteps = addToMap([prevStartingPoint[0] + i, prevStartingPoint[1]], numSteps, map);
    }
    newKey = [prevStartingPoint[0] + value, prevStartingPoint[1]];
  } else if (type == 'L') {
    for (let i = 1; i <= value; i++) {
      numSteps = addToMap([prevStartingPoint[0] - i, prevStartingPoint[1]], numSteps, map);
    }
    newKey = [prevStartingPoint[0] - value, prevStartingPoint[1]];
  } else if (type == 'U') {
    for (let i = 1; i <= value; i++) {
      numSteps = addToMap([prevStartingPoint[0], prevStartingPoint[1] + i], numSteps, map);
    }
    newKey = [prevStartingPoint[0], prevStartingPoint[1] + value];
  } else if (type == 'D') {
    for (let i = 1; i <= value; i++) {
      numSteps = addToMap([prevStartingPoint[0], prevStartingPoint[1] - i], numSteps, map);
    }
    newKey = [prevStartingPoint[0], prevStartingPoint[1] - value];
  } else {
    throw err("unknown coordinate type");
  }
  return [newKey, numSteps];
}

function addToMap(newKey, numSteps, map) {
  if (map[newKey] == undefined) {
    map[newKey] = numSteps;
  }
  numSteps++;
  return numSteps;
}

function calculateDistance(coordinates1, coordinates2) {
  let prevStartingPoint = [0,0];
  const map1 = {};
  let numSteps = 1;
  coordinates1.split(',').forEach(coordinate => {
    [prevStartingPoint, numSteps] = drawWire(coordinate, prevStartingPoint, numSteps, map1);
  });
  const map2 = {};
  prevStartingPoint = [0,0];
  numSteps = 1;
  coordinates2.split(',').forEach(coordinate => {
    [prevStartingPoint, numSteps] = drawWire(coordinate, prevStartingPoint, numSteps, map2);
  });

  let lowestDistance = Infinity;
  Object.keys(map1).forEach(key => {
    if (map2[key] != undefined) {
      lowestDistance = Math.min(lowestDistance, map1[key] + map2[key]);
    }
  });
  return lowestDistance;
}

module.exports = calculateDistance;