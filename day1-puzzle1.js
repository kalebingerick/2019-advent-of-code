
function calculateFuel(mass) {
  return Math.floor(mass / 3) - 2;
}

function calculateFuelForCraft(masses) {
  let sum = 0;
  masses.forEach(mass => {
    sum += calculateFuel(mass);
  });
  return sum;
}

module.exports = calculateFuelForCraft;