
const fuelForGivenMass = {};
const calculateFuelForGivenMass = (mass) => {
  if(!fuelForGivenMass[mass]) {
     fuelForGivenMass[mass] = Math.floor(mass / 3) - 2;
  }
  return fuelForGivenMass[mass];
}

const fuelForMass = {}
const calculateFuel = (mass) => {
  if(!fuelForMass[mass]) {
    const fuelRequired = calculateFuelForGivenMass(mass);
    if(fuelRequired > 0) return 0;
    fuelForMass[mass] = fuelRequired + calculateFuel(fuelRequired)
  }
  return fuelForMass[mass]
}

module.exports = (masses) => masses.reduce((sum, mass) => sum + calculateFuel(mass), 0)
