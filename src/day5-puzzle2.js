function evaluateOpcode(opcode, initialInput) {
  var pointer = 0;
  var instruction = getInstruction(opcode[pointer]);
  while (true) {
    if (instruction == "end") {
      return opcode;
    } else if (instruction == "add") {
      pointer = doAddAndReturnPointer(opcode, pointer);
    } else if (instruction == "multiply") {
      pointer = doMultiplyAndReturnPointer(opcode, pointer);
    } else if (instruction == "input") {
      pointer = handleInputAndReturnPointer(opcode, pointer, initialInput);
    } else if (instruction == "output") {
      pointer = handleOutputAndReturnPointer(opcode, pointer);
    } else if (instruction == "jump-if-true") {
      pointer = handleJumpIfTrueAndReturnPointer(opcode, pointer);
    } else if (instruction == "jump-if-false") {
      pointer = handleJumpIfFalseAndReturnPointer(opcode, pointer);
    } else if (instruction == "less-than") {
      pointer = handleLessThanAndReturnPointer(opcode, pointer);
    } else if (instruction == "equals") {
      pointer = handleEqualsAndReturnPointer(opcode, pointer);
    }
    instruction = getInstruction(opcode[pointer]);
  }
}

function doAddAndReturnPointer(opcodeReference, pointer) {
  var outputPointer = opcodeReference[pointer+3];

  var parameter1 = getParameter(pointer, 1, opcodeReference);
  var parameter2 = getParameter(pointer, 2, opcodeReference);

  console.log(`Setting opcode[${outputPointer}] to ${parameter1} + ${parameter2}`);
  opcodeReference[outputPointer] = parameter1 + parameter2;
  return pointer + 4;
}

function doMultiplyAndReturnPointer(opcode, pointer) {
  var outputPointer = opcode[pointer+3];

  var parameter1 = getParameter(pointer, 1, opcode);
  var parameter2 = getParameter(pointer, 2, opcode);

  console.log(`Setting opcode[${outputPointer}] to ${parameter1} * ${parameter2}`);
  opcode[outputPointer] = parameter1 * parameter2;
  return pointer + 4;
}

function handleInputAndReturnPointer(opcode, pointer, input) {
  var outputPointer = opcode[pointer+1];
  opcode[outputPointer] = input;
  return pointer + 2;
}

function handleOutputAndReturnPointer(opcode, pointer) {
  var parameter = getParameter(pointer, 1, opcode);
  console.log(parameter);
  return pointer + 2;
}

function handleJumpIfTrueAndReturnPointer(opcode, pointer) {
  var parameter = getParameter(pointer, 1, opcode);
  if (parameter != 0) {
    return getParameter(pointer, 2, opcode);
  } else {
    return pointer + 3;
  }
}

function handleJumpIfFalseAndReturnPointer(opcode, pointer) {
  var parameter = getParameter(pointer, 1, opcode);
  if (parameter == 0) {
    return getParameter(pointer, 2, opcode);
  } else {
    return pointer + 3;
  }
}

function handleLessThanAndReturnPointer(opcode, pointer) {
  var parameter1 = getParameter(pointer, 1, opcode);
  var parameter2 = getParameter(pointer, 2, opcode);
  if (parameter1 < parameter2) {
    opcode[opcode[pointer+3]] = 1;
  } else {
    opcode[opcode[pointer+3]] = 0;
  }
  return pointer + 4;
}

function handleEqualsAndReturnPointer(opcode, pointer) {
  var parameter1 = getParameter(pointer, 1, opcode);
  var parameter2 = getParameter(pointer, 2, opcode);
  if (parameter1 == parameter2) {
    opcode[opcode[pointer+3]] = 1;
  } else {
    opcode[opcode[pointer+3]] = 0;
  }
  return pointer + 4;
}

function getParameter(pointer, index, opcode) {
  const mode = Math.floor(opcode[pointer]/(Math.pow(10, index+1)) % 10);
  if (mode == 0) {
    return opcode[opcode[pointer+index]];
  } else if (mode == 1) {
    return opcode[pointer+index];
  } else {
    throw "unknown parameter mode";
  }
}

function evaluateOpcodes(data, initialInput) {
  const opcode = data.split(",").map(Number);
  evaluateOpcode(opcode, initialInput);
}

function getInstruction(v) {
  let instruction = v % 100;
  if (instruction == 1) {
    return "add";
  } else if (instruction == 2) {
    return "multiply";
  } else if (instruction == 3) {
    return "input";
  } else if (instruction == 4) {
    return "output";
  } else if (instruction == 5) {
    return "jump-if-true";
  } else if (instruction == 6) {
    return "jump-if-false";
  } else if (instruction == 7) {
    return "less-than";
  } else if (instruction == 8) {
    return "equals";
  } else if (instruction == 99) {
    return "end";
  } else {
    throw "unknown";
  }
}

console.log('Looking for 1, 0, 1, 0, 0');
evaluateOpcodes('3,9,8,9,10,9,4,9,99,-1,8', 8);
evaluateOpcodes('3,9,8,9,10,9,4,9,99,-1,8', 4);
evaluateOpcodes('3,9,7,9,10,9,4,9,99,-1,8', 0);
evaluateOpcodes('3,9,7,9,10,9,4,9,99,-1,8', 9);
evaluateOpcodes('3,9,7,9,10,9,4,9,99,-1,8', 8);

evaluateOpcodes('3,3,1108,-1,8,3,4,3,99', 8);
evaluateOpcodes('3,3,1108,-1,8,3,4,3,99', 4);
evaluateOpcodes('3,3,1107,-1,8,3,4,3,99', 0);
evaluateOpcodes('3,3,1107,-1,8,3,4,3,99', 9);
evaluateOpcodes('3,3,1107,-1,8,3,4,3,99', 8);

console.log('Looking for 0, 1')
evaluateOpcodes('3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9', 0);
evaluateOpcodes('3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9', 4);

evaluateOpcodes('3,3,1105,-1,9,1101,0,0,12,4,12,99,1', 0);
evaluateOpcodes('3,3,1105,-1,9,1101,0,0,12,4,12,99,1', 1);

evaluateOpcodes('3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99', 7);
evaluateOpcodes('3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99', 8);
evaluateOpcodes('3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99', 9);

// evaluateOpcodes('3,225,1,225,6,6,1100,1,238,225,104,0,101,14,135,224,101,-69,224,224,4,224,1002,223,8,223,101,3,224,224,1,224,223,223,102,90,169,224,1001,224,-4590,224,4,224,1002,223,8,223,1001,224,1,224,1,224,223,223,1102,90,45,224,1001,224,-4050,224,4,224,102,8,223,223,101,5,224,224,1,224,223,223,1001,144,32,224,101,-72,224,224,4,224,102,8,223,223,101,3,224,224,1,223,224,223,1102,36,93,225,1101,88,52,225,1002,102,38,224,101,-3534,224,224,4,224,102,8,223,223,101,4,224,224,1,223,224,223,1102,15,57,225,1102,55,49,225,1102,11,33,225,1101,56,40,225,1,131,105,224,101,-103,224,224,4,224,102,8,223,223,1001,224,2,224,1,224,223,223,1102,51,39,225,1101,45,90,225,2,173,139,224,101,-495,224,224,4,224,1002,223,8,223,1001,224,5,224,1,223,224,223,1101,68,86,224,1001,224,-154,224,4,224,102,8,223,223,1001,224,1,224,1,224,223,223,4,223,99,0,0,0,677,0,0,0,0,0,0,0,0,0,0,0,1105,0,99999,1105,227,247,1105,1,99999,1005,227,99999,1005,0,256,1105,1,99999,1106,227,99999,1106,0,265,1105,1,99999,1006,0,99999,1006,227,274,1105,1,99999,1105,1,280,1105,1,99999,1,225,225,225,1101,294,0,0,105,1,0,1105,1,99999,1106,0,300,1105,1,99999,1,225,225,225,1101,314,0,0,106,0,0,1105,1,99999,108,226,677,224,1002,223,2,223,1006,224,329,1001,223,1,223,1007,226,226,224,1002,223,2,223,1006,224,344,101,1,223,223,1008,226,226,224,102,2,223,223,1006,224,359,1001,223,1,223,107,226,677,224,1002,223,2,223,1005,224,374,101,1,223,223,1107,677,226,224,102,2,223,223,1006,224,389,101,1,223,223,108,677,677,224,102,2,223,223,1006,224,404,1001,223,1,223,1108,677,226,224,102,2,223,223,1005,224,419,101,1,223,223,1007,677,226,224,1002,223,2,223,1006,224,434,101,1,223,223,1107,226,226,224,1002,223,2,223,1006,224,449,101,1,223,223,8,677,226,224,102,2,223,223,1006,224,464,1001,223,1,223,1107,226,677,224,102,2,223,223,1005,224,479,1001,223,1,223,1007,677,677,224,102,2,223,223,1005,224,494,1001,223,1,223,1108,677,677,224,102,2,223,223,1006,224,509,101,1,223,223,1008,677,677,224,102,2,223,223,1005,224,524,1001,223,1,223,107,226,226,224,1002,223,2,223,1005,224,539,101,1,223,223,7,226,226,224,102,2,223,223,1005,224,554,101,1,223,223,1108,226,677,224,1002,223,2,223,1006,224,569,1001,223,1,223,107,677,677,224,102,2,223,223,1005,224,584,101,1,223,223,7,677,226,224,1002,223,2,223,1005,224,599,101,1,223,223,108,226,226,224,1002,223,2,223,1005,224,614,101,1,223,223,1008,677,226,224,1002,223,2,223,1005,224,629,1001,223,1,223,7,226,677,224,102,2,223,223,1005,224,644,101,1,223,223,8,677,677,224,102,2,223,223,1005,224,659,1001,223,1,223,8,226,677,224,102,2,223,223,1006,224,674,1001,223,1,223,4,223,99,226', 5);