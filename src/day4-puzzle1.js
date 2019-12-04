function isValidPassword(password) {
  const passArr = password.toString().split('').map(Number);
  let repeatedNum = false;
  let pointer0 = 0;
  let pointer1 = 1;
  while (pointer1 <= 6) {
    if (passArr[pointer0] > passArr[pointer1]) {
      return false;
    } else if (passArr[pointer0] == passArr[pointer1]) {
      repeatedNum = true;
    }
    pointer0++;
    pointer1++;
  }
  return repeatedNum;
}

function findNumValidPasswords(low, high) {
  let numValid = 0;
  for (let i = low; i <= high; i++) {
    if (isValidPassword(i)) {
      numValid++;
    }
  }
  return numValid;
}

module.exports = findNumValidPasswords;