function isValidPassword(password) {
  const passArr = password.toString().split('').map(Number);
  let repeatedNum = false;
  let pointer0 = 0;
  let pointer1 = 1;
  let pointer2 = 2;
  while (pointer1 <= 6) {
    if (passArr[pointer0] > passArr[pointer1]) {
      return false;
    } else if (passArr[pointer0] == passArr[pointer1]) {
      if (pointer2 >= passArr.length || passArr[pointer2] != passArr[pointer1]) {
        repeatedNum = true;
      } else {
        let inc = 0;
        while (pointer0 + inc < passArr.length && passArr[pointer0 + inc] == passArr[pointer2]) {
          inc++;
        }
        pointer0 += inc - 1;
        pointer1 += inc - 1;
        pointer2 += inc - 1;
        continue;
      }
    }
    pointer0++;
    pointer1++;
    pointer2++;
  }
  if (repeatedNum) {
    console.log(password);
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