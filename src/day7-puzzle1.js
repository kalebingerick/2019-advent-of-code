const perm = require('array-permutation');

function evaluateOpcode(opcode, inputArr) {
  var pointer = 0;
  var instruction = getInstruction(opcode[pointer]);
  var inputPointer = 0;
  var output = Infinity;
  while (true) {
    if (instruction == "end") {
      return [opcode, output];
    } else if (instruction == "add") {
      pointer = doAddAndReturnPointer(opcode, pointer);
    } else if (instruction == "multiply") {
      pointer = doMultiplyAndReturnPointer(opcode, pointer);
    } else if (instruction == "input") {
      pointer = handleInputAndReturnPointer(opcode, pointer, inputArr[inputPointer]);
      inputPointer++;
    } else if (instruction == "output") {
      var parameter = getParameter(pointer, 1, opcode);
      output = parameter;
      pointer += 2;
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

  opcodeReference[outputPointer] = parameter1 + parameter2;
  return pointer + 4;
}

function doMultiplyAndReturnPointer(opcode, pointer) {
  var outputPointer = opcode[pointer+3];

  var parameter1 = getParameter(pointer, 1, opcode);
  var parameter2 = getParameter(pointer, 2, opcode);

  opcode[outputPointer] = parameter1 * parameter2;
  return pointer + 4;
}

function handleInputAndReturnPointer(opcode, pointer, input) {
  var outputPointer = opcode[pointer+1];
  opcode[outputPointer] = input;
  return pointer + 2;
}

function handleOutputAndReturnPointer(opcode, pointer) {
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

function evaluateOpcodes(data, phaseSettings, initialInput) {
  let opcode = data.split(",").map(Number);
  let input = initialInput;
  for (let i of phaseSettings) {
    [opcode, input] = evaluateOpcode(opcode, [i,input]);
  }
  return input;
}

const initialOpcode = '3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5';
const initialInput = 0;

let maxSignal = -Infinity;
for (let p of perm(5,10,1)) {
  maxSignal = Math.max(evaluateOpcodes(initialOpcode, p, initialInput), maxSignal);
}

console.log(maxSignal);