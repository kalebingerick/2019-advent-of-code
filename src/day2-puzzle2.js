function evaluateOpcode(opcode) {
  var pointer = 0;
  var currentOpcode = evaluateVarAtPointer(opcode[pointer]);
  while (true) {
    if (currentOpcode == "end") {
      return opcode;
    } else if (currentOpcode == "add") {
      var outputPointer = opcode[pointer+3];
      var inputPointer1 = opcode[pointer+1];
      var inputPointer2 = opcode[pointer+2];
      console.log(`Setting opcode[${outputPointer}] to ${opcode[inputPointer1]} + ${opcode[inputPointer2]}`);
      opcode[outputPointer] = opcode[inputPointer1] + opcode[inputPointer2];
      console.log(opcode[outputPointer]);
      pointer += 4;
    } else {
      var outputPointer = opcode[pointer+3];
      var inputPointer1 = opcode[pointer+1];
      var inputPointer2 = opcode[pointer+2];
      console.log(`Setting opcode[${outputPointer}] to ${opcode[inputPointer1]} * ${opcode[inputPointer2]}`);
      opcode[outputPointer] = opcode[inputPointer1] * opcode[inputPointer2];
      console.log(opcode[outputPointer]);
      pointer += 4;
    }
    currentOpcode = evaluateVarAtPointer(opcode[pointer]);
  }
}

function evaluateOpcodes(opcode, desiredOutput) {
  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 100; j++) {
      const newOpcode = opcode.slice(0);
      newOpcode[1] = i;
      newOpcode[2] = j;
      if (evaluateOpcode(newOpcode)[0] == desiredOutput) {
        return (100 * newOpcode[1]) + newOpcode[2];
      }
    }
  }
}

function evaluateVarAtPointer(v) {
  if (v == 1) {
    return "add";
  } else if (v == 2) {
    return "multiply";
  } else if (v == 99) {
    return "end";
  } else {
    throw "unknown";
  }
}

module.exports = evaluateOpcodes;