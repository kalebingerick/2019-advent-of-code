function calculateFuelForGivenMass(mass) {
  return Math.floor(mass / 3) - 2;
}

function calculateFuel(mass) {
  let sum = 0;
  let currentFuel = calculateFuelForGivenMass(mass);
  sum += currentFuel;
  while (currentFuel > 0) {
    currentFuel = calculateFuelForGivenMass(currentFuel);
    if (currentFuel > 0) {
      sum += currentFuel;
    }
  }
  return sum;
}

function calculateFuelForCraft(masses) {
  let sum = 0;
  masses.forEach(mass => {
    sum += calculateFuel(mass);
  });
  return sum;
}

module.exports = calculateFuelForCraft;