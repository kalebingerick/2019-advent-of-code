// key = [0,0]
// value = 0, 1, 2
function drawWire(coordinate, prevStartingPoint, map) {
  // coordinate like R8, L7, etc
  // prevStartingPoint = [1,3]
  const type = coordinate.substring(0,1);
  const value = parseInt(coordinate.substring(1));
  let newKey;
  if (type == 'R') {
    for (let i = 1; i <= value; i++) {
      addToMap([prevStartingPoint[0] + i, prevStartingPoint[1]], map);
    }
    newKey = [prevStartingPoint[0] + value, prevStartingPoint[1]];
  } else if (type == 'L') {
    for (let i = 1; i <= value; i++) {
      addToMap([prevStartingPoint[0] - i, prevStartingPoint[1]], map);
    }
    newKey = [prevStartingPoint[0] - value, prevStartingPoint[1]];
  } else if (type == 'U') {
    for (let i = 1; i <= value; i++) {
      addToMap([prevStartingPoint[0], prevStartingPoint[1] + i], map);
    }
    newKey = [prevStartingPoint[0], prevStartingPoint[1] + value];
  } else if (type == 'D') {
    for (let i = 1; i <= value; i++) {
      addToMap([prevStartingPoint[0], prevStartingPoint[1] - i], map);
    }
    newKey = [prevStartingPoint[0], prevStartingPoint[1] - value];
  } else {
    throw err("unknown coordinate type");
  }
  return newKey;
}

function addToMap(newKey, map) {
  if (map[newKey] == undefined) {
    map[newKey] = 1;
  } else {
    map[newKey] = map[newKey] + 1;
  }
  return newKey;
}

function calculateManhattanDistance(x, y) {
  return Math.abs(x) + Math.abs(y);
}

function calculateDistance(coordinates1, coordinates2) {
  let prevStartingPoint = [0,0];
  const map = {};
  coordinates1.split(',').forEach(coordinate => {
    prevStartingPoint = drawWire(coordinate, prevStartingPoint, map);
  });
  prevStartingPoint = [0,0];
  coordinates2.split(',').forEach(coordinate => {
    prevStartingPoint = drawWire(coordinate, prevStartingPoint, map);
  });

  let lowestDistance = Infinity;
  Object.keys(map).forEach(key => {
    if (map[key] == 2) {
      const x = parseInt(key.split(',')[0]);
      const y = parseInt(key.split(',')[1]);
      lowestDistance = Math.min(lowestDistance, calculateManhattanDistance(x, y));
    }
  })
  return lowestDistance;
}

module.exports = calculateDistance;