const perm = require('array-permutation');

class Amp {
  constructor(opcode, phaseSetting) {
    this.instructionSet = opcode;
    this.pointer = 0;
    this.input = [phaseSetting];
    this.lastOutput = -Infinity;
  }

  run() {
    let instruction = this.getInstruction(this.instructionSet[this.pointer]);
    while (true) {
      if (instruction == "end") {
        return "done";
      } else if (instruction == "add") {
        this.doAdd();
      } else if (instruction == "multiply") {
        this.doMultiply();
      } else if (instruction == "input") {
        this.handleInput();
      } else if (instruction == "output") {
        return this.handleOutput();
      } else if (instruction == "jump-if-true") {
        this.handleJumpIfTrue();
      } else if (instruction == "jump-if-false") {
        this.handleJumpIfFalse();
      } else if (instruction == "less-than") {
        this.handleLessThan();
      } else if (instruction == "equals") {
        this.handleEquals();
      }
      instruction = this.getInstruction(this.instructionSet[this.pointer]);
    }
  }

  addInput(input) {
    this.input.push(input);
  }

  doAdd() {
    var outputPointer = this.instructionSet[this.pointer+3];

    var parameter1 = this.getParameter(this.pointer, 1);
    var parameter2 = this.getParameter(this.pointer, 2);

    this.instructionSet[outputPointer] = parameter1 + parameter2;
    this.pointer += 4;
  }

  doMultiply() {
    var outputPointer = this.instructionSet[this.pointer+3];

    var parameter1 = this.getParameter(this.pointer, 1);
    var parameter2 = this.getParameter(this.pointer, 2);

    this.instructionSet[outputPointer] = parameter1 * parameter2;
    this.pointer += 4;
  }

  handleInput() {
    let outputPointer = this.instructionSet[this.pointer+1];
    this.instructionSet[outputPointer] = this.input.shift();
    this.pointer += 2;
  }

  handleOutput() {
    let output = this.getParameter(this.pointer, 1);
    this.lastOutput = output;
    this.pointer += 2;
    return output;
  }

  handleJumpIfTrue() {
    let parameter = this.getParameter(this.pointer, 1);
    if (parameter != 0) {
      this.pointer = this.getParameter(this.pointer, 2);
    } else {
      this.pointer += 3
    }
  }

  handleJumpIfFalse() {
    let parameter = this.getParameter(this.pointer, 1);
    if (parameter == 0) {
      this.pointer = this.getParameter(this.pointer, 2);
    } else {
      this.pointer += 3
    }
  }

  handleLessThan() {
    let parameter1 = this.getParameter(this.pointer, 1);
    let parameter2 = this.getParameter(this.pointer, 2);
    if (parameter1 < parameter2) {
      this.instructionSet[this.instructionSet[this.pointer+3]] = 1;
    } else {
      this.instructionSet[this.instructionSet[this.pointer+3]] = 0;
    }
    this.pointer += 4;
  }

  handleEquals() {
    let parameter1 = this.getParameter(this.pointer, 1);
    let parameter2 = this.getParameter(this.pointer, 2);
    if (parameter1 == parameter2) {
      this.instructionSet[this.instructionSet[this.pointer+3]] = 1;
    } else {
      this.instructionSet[this.instructionSet[this.pointer+3]] = 0;
    }
    this.pointer += 4;
  }

  getParameter(pointer, index) {
    const mode = Math.floor(this.instructionSet[pointer]/(Math.pow(10, index+1)) % 10);
    if (mode == 0) {
      return this.instructionSet[this.instructionSet[pointer+index]];
    } else if (mode == 1) {
      return this.instructionSet[pointer+index];
    } else {
      throw "unknown parameter mode";
    }
  }

  getInstruction(v) {
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
}

function main() {
  const instructionSet = [3,8,1001,8,10,8,105,1,0,0,21,42,67,76,89,110,191,272,353,434,99999,3,9,102,2,9,9,1001,9,2,9,1002,9,2,9,1001,9,2,9,4,9,99,3,9,1001,9,4,9,102,4,9,9,101,3,9,9,1002,9,2,9,1001,9,4,9,4,9,99,3,9,102,5,9,9,4,9,99,3,9,1001,9,3,9,1002,9,3,9,4,9,99,3,9,102,3,9,9,101,2,9,9,1002,9,3,9,101,5,9,9,4,9,99,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,99,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,101,2,9,9,4,9,3,9,101,2,9,9,4,9,99,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,2,9,9,4,9,99,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,2,9,9,4,9,99];

  let maxSignal = -Infinity;
  for (let phaseSettings of perm(5, 10, 1)) {
    const ampA = new Amp([...instructionSet], phaseSettings[0]);
    const ampB = new Amp([...instructionSet], phaseSettings[1]);
    const ampC = new Amp([...instructionSet], phaseSettings[2]);
    const ampD = new Amp([...instructionSet], phaseSettings[3]);
    const ampE = new Amp([...instructionSet], phaseSettings[4]);

    ampA.addInput(0);
    let output;
    while (output != "done") {
      output = ampA.run();
      ampB.addInput(output);
      output = ampB.run();
      ampC.addInput(output);
      output = ampC.run();
      ampD.addInput(output);
      output = ampD.run();
      ampE.addInput(output);
      output = ampE.run();
      ampA.addInput(output);
    }
    console.log(ampE.lastOutput);
    maxSignal = Math.max(maxSignal, ampE.lastOutput);
  }
  console.log(maxSignal);
}

main();