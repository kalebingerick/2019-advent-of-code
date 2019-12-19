module.exports = (masses) => masses.reduce((sum, mass) => sum + (Math.floor(mass / 3) - 2), 0)
