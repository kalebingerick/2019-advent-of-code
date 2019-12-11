const BLACK = 0;
const WHITE = 1;
const LEFT = 0;
const RIGHT = 1;

class Amp {
  constructor(opcode, input) {
    this.instructionSet = opcode;
    this.pointer = 0;
    this.input = [input];
    this.relativeBase = 0;
    this.lastOutput = Infinity;
  }

  run() {
    let instruction = this.getInstruction(this.getInstructionAtPointer(this.pointer));
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
        this.lastOutput = this.handleOutput();
        return this.lastOutput;
      } else if (instruction == "jump-if-true") {
        this.handleJumpIfTrue();
      } else if (instruction == "jump-if-false") {
        this.handleJumpIfFalse();
      } else if (instruction == "less-than") {
        this.handleLessThan();
      } else if (instruction == "equals") {
        this.handleEquals();
      } else if (instruction == "relative-base") {
        this.handleRelativeBase();
      }
      instruction = this.getInstruction(this.getInstructionAtPointer(this.pointer));
    }
  }

  addInput(input) {
    this.input.push(input);
  }

  doAdd() {
    var parameter1 = this.read(this.pointer, 1);
    var parameter2 = this.read(this.pointer, 2);

    this.write(this.pointer, 3, parameter1 + parameter2);
    this.pointer += 4;
  }

  doMultiply() {
    var parameter1 = this.read(this.pointer, 1);
    var parameter2 = this.read(this.pointer, 2);

    this.write(this.pointer, 3, parameter1 * parameter2);
    this.pointer += 4;
  }

  handleInput() {
    this.write(this.pointer, 1, this.input.shift());
    this.pointer += 2;
  }

  handleOutput() {
    let output = this.read(this.pointer, 1);
    this.pointer += 2;
    return output;
  }

  handleJumpIfTrue() {
    let parameter = this.read(this.pointer, 1);
    if (parameter != 0) {
      this.pointer = this.read(this.pointer, 2);
    } else {
      this.pointer += 3
    }
  }

  handleJumpIfFalse() {
    let parameter = this.read(this.pointer, 1);
    if (parameter == 0) {
      this.pointer = this.read(this.pointer, 2);
    } else {
      this.pointer += 3
    }
  }

  handleLessThan() {
    let parameter1 = this.read(this.pointer, 1);
    let parameter2 = this.read(this.pointer, 2);
    if (parameter1 < parameter2) {
      this.write(this.pointer, 3, 1);
    } else {
      this.write(this.pointer, 3, 0);
    }
    this.pointer += 4;
  }

  handleEquals() {
    let parameter1 = this.read(this.pointer, 1);
    let parameter2 = this.read(this.pointer, 2);
    if (parameter1 == parameter2) {
      this.write(this.pointer, 3, 1);
    } else {
      this.write(this.pointer, 3, 0);
    }
    this.pointer += 4;
  }

  handleRelativeBase() {
    let parameter = this.read(this.pointer, 1);
    this.relativeBase += parameter;
    this.pointer += 2;
  }

  read(pointer, index) {
    const mode = Math.floor(this.getInstructionAtPointer(pointer)/(Math.pow(10, index+1)) % 10);
    if (mode == 0) {
      return this.getInstructionAtPointer(this.getInstructionAtPointer(pointer+index));
    } else if (mode == 1) {
      return this.getInstructionAtPointer(pointer+index);
    } else if (mode == 2) {
      return this.getInstructionAtPointer(this.getInstructionAtPointer(pointer+index)+this.relativeBase);
    } else {
      throw "unknown parameter mode";
    }
  }

  write(pointer, index, val) {
    const mode = Math.floor(this.getInstructionAtPointer(pointer)/(Math.pow(10, index+1)) % 10);
    if (mode == 0) {
      var outputPointer = this.getInstructionAtPointer(this.pointer+3);
      this.instructionSet[outputPointer] = val;
    } else if (mode == 1) {
      throw "unacceptable parameter mode";
    } else if (mode == 2) {
      var outputPointer = this.getInstructionAtPointer(pointer + index) + this.relativeBase;
      this.instructionSet[outputPointer] = val;
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
    } else if (instruction == 9) {
      return "relative-base";
    } else if (instruction == 99) {
      return "end";
    } else {
      throw "unknown";
    }
  }

  increaseMemory(newLength) {
    const currentLength = this.instructionSet.length;
    if (newLength > currentLength) {
      this.instructionSet.length = newLength;
      this.instructionSet.fill(0, currentLength);
    }
  }

  getInstructionAtPointer(pointer) {
    if (this.instructionSet[pointer] == undefined) {
      this.increaseMemory(pointer+1);
    }
    return this.instructionSet[pointer];
  }
}

function buildNewCurrentLocation(currentLocation, currentOrientation, turnDirection) {
  let orientation;
  if (currentOrientation === "NORTH") {
    currentLocation[0] = turnDirection === LEFT ? currentLocation[0] - 1 : currentLocation[0] + 1;
    orientation = turnDirection === LEFT ? "WEST" : "EAST";
  } else if (currentOrientation === "SOUTH") {
    currentLocation[0] = turnDirection === LEFT ? currentLocation[0] + 1 : currentLocation[0] - 1;
    orientation = turnDirection === LEFT ? "EAST" : "WEST";
  } else if (currentOrientation === "EAST") {
    currentLocation[1] = turnDirection === LEFT ? currentLocation[1] - 1 : currentLocation[1] + 1;
    orientation = turnDirection === LEFT ? "NORTH" : "SOUTH";
  } else if (currentOrientation === "WEST") {
    currentLocation[1] = turnDirection === LEFT ? currentLocation[1] + 1 : currentLocation[1] - 1;
    orientation = turnDirection === LEFT ? "SOUTH" : "NORTH";
  } else {
    throw "unknown orientation - are you off the map??";
  }
  return [currentLocation, orientation];
}

function main() {
  const instructions = [3,8,1005,8,315,1106,0,11,0,0,0,104,1,104,0,3,8,1002,8,-1,10,101,1,10,10,4,10,1008,8,0,10,4,10,101,0,8,29,2,1006,16,10,3,8,102,-1,8,10,1001,10,1,10,4,10,1008,8,0,10,4,10,102,1,8,55,3,8,102,-1,8,10,1001,10,1,10,4,10,108,1,8,10,4,10,101,0,8,76,1,101,17,10,1006,0,3,2,1005,2,10,3,8,1002,8,-1,10,1001,10,1,10,4,10,1008,8,1,10,4,10,101,0,8,110,1,107,8,10,3,8,1002,8,-1,10,1001,10,1,10,4,10,108,0,8,10,4,10,101,0,8,135,1,108,19,10,2,7,14,10,2,104,10,10,3,8,1002,8,-1,10,101,1,10,10,4,10,1008,8,1,10,4,10,101,0,8,170,1,1003,12,10,1006,0,98,1006,0,6,1006,0,59,3,8,1002,8,-1,10,1001,10,1,10,4,10,1008,8,0,10,4,10,102,1,8,205,1,4,18,10,1006,0,53,1006,0,47,1006,0,86,3,8,1002,8,-1,10,101,1,10,10,4,10,108,0,8,10,4,10,1001,8,0,239,2,9,12,10,3,8,1002,8,-1,10,1001,10,1,10,4,10,1008,8,1,10,4,10,101,0,8,266,1006,0,8,1,109,12,10,3,8,1002,8,-1,10,1001,10,1,10,4,10,108,1,8,10,4,10,1001,8,0,294,101,1,9,9,1007,9,1035,10,1005,10,15,99,109,637,104,0,104,1,21102,936995730328,1,1,21102,1,332,0,1105,1,436,21102,1,937109070740,1,21101,0,343,0,1106,0,436,3,10,104,0,104,1,3,10,104,0,104,0,3,10,104,0,104,1,3,10,104,0,104,1,3,10,104,0,104,0,3,10,104,0,104,1,21102,1,179410308187,1,21101,0,390,0,1105,1,436,21101,0,29195603035,1,21102,1,401,0,1106,0,436,3,10,104,0,104,0,3,10,104,0,104,0,21102,825016079204,1,1,21102,1,424,0,1105,1,436,21102,1,825544672020,1,21102,435,1,0,1106,0,436,99,109,2,21202,-1,1,1,21102,1,40,2,21102,467,1,3,21101,0,457,0,1105,1,500,109,-2,2106,0,0,0,1,0,0,1,109,2,3,10,204,-1,1001,462,463,478,4,0,1001,462,1,462,108,4,462,10,1006,10,494,1102,0,1,462,109,-2,2106,0,0,0,109,4,1202,-1,1,499,1207,-3,0,10,1006,10,517,21102,1,0,-3,22101,0,-3,1,22101,0,-2,2,21101,1,0,3,21101,0,536,0,1106,0,541,109,-4,2106,0,0,109,5,1207,-3,1,10,1006,10,564,2207,-4,-2,10,1006,10,564,21202,-4,1,-4,1105,1,632,21202,-4,1,1,21201,-3,-1,2,21202,-2,2,3,21101,583,0,0,1106,0,541,22102,1,1,-4,21101,0,1,-1,2207,-4,-2,10,1006,10,602,21101,0,0,-1,22202,-2,-1,-2,2107,0,-3,10,1006,10,624,21202,-1,1,1,21101,624,0,0,106,0,499,21202,-2,-1,-2,22201,-4,-2,-4,109,-5,2106,0,0];
  const input = 0;

  const robot = new Amp(instructions, input);
  const map = {};
  let currentLocation = [0,0];
  let currentOrientation = "NORTH";
  map[currentLocation] = 1;

  robot.addInput(map[currentLocation]);
  let paintColor;
  let turnDirection;
  let numPainted = 0;
  while (paintColor != "done" && turnDirection != "done") {
    paintColor = robot.run();
    turnDirection = robot.run();
    if (map[currentLocation] == undefined) {
      numPainted++;
    }
    map[currentLocation] = paintColor;
    robot.addInput(map[currentLocation]);
    [currentLocation, currentOrientation] = buildNewCurrentLocation(currentLocation, currentOrientation, turnDirection);

    const data = [{
      x: Object.keys(map).map(coordinate => coordinate[0]),
      y: Object.keys(map).map(coordinate => coordinate[1]),
      type: "scatter",
      mode: "markers"
    }];
  }
  return numPainted + 1;
}

main();