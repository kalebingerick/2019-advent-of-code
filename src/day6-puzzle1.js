const fs = require('fs');
const path = require('path');

class Stack {
  constructor() {
    this.stack = []
  }
  
  // Inserts the element into the top of the stack
  push(element) {
    this.stack.push(element)
  }
  
  // Removes the element from the top of the stack and return that element
  pop() {
    if (this.isEmpty()) return 'Stack is empty!'
    return this.stack.pop()
  }
  
  // Return which element is on top of the stack
  peek() {
    if (this.isEmpty()) return 'Stack is empty'
    return this.stack[this.stack.length - 1]
  }
  
  // helper method
  isEmpty() {
    return !this.stack.length
  }
}

class Graph {
  constructor() { 
    this.adjacencyList = new Map();
    this.vertices = [];
    this.orbitsMap = new Map();
    this.root = null;
  }

  addVertex(v) {
    if (this.adjacencyList.get(v) == undefined) {
      this.adjacencyList.set(v, []);
      this.vertices.push(v)
    }
    if (this.root == null) {
      this.root = v;
    }
  }

  addEdge(v, value) {
    this.adjacencyList.get(v).push(value);
  }

  setRoot(newRoot) {
    this.root = newRoot;
  }

  getTotalOrbitsCount(rootNode) {
    let total = 0;
    for (let i of this.adjacencyList.keys()) {
      total += this.getOrbits(i, rootNode);
    }
    return total;
  }

  getOrbits(node, rootNode) {
    if (this.orbitsMap.get(node) == undefined) {
      this.orbitsMap.set(node, this.runBFS(node, rootNode));
    }
    console.log(`${node}: ${this.orbitsMap.get(node)}`);
    return this.orbitsMap.get(node);
  }

  runBFS(node, rootNode) {
    let count = 0;
    if (rootNode === node) {
      return 0;
    }
    
    var queue = [];
    queue.push(rootNode);
    
    while (queue.length > 0) {
      let levelSize = queue.length;
      while (levelSize > 0) {
        let currentNode = queue[0];
        // console.log(currentNode);
        if (currentNode == node) {
          return count;
        }
        queue.push(...this.adjacencyList.get(currentNode));
        queue.shift()
        levelSize--;
      }
      count++;
      if (queue[0] == node) {
        break;
      }
    }
    return count;
  }
}

const g = new Graph();
const data = fs.readFileSync(
  path.join(__dirname, '../input-files/day6.txt'),
  'utf-8'
);
const orbits = data.split('\n');

for (let i in orbits) {
  const node1 = orbits[i].split(')')[0];
  const node2 = orbits[i].split(')')[1];
  g.addVertex(node1);
  g.addVertex(node2);
  g.addEdge(node1, node2);
  if (g.root == node2) {
    g.setRoot(node1);
  }
}
// console.log(g.getOrbits('G', 'COM'));
// console.log(g.getOrbits('C', 'COM'));
console.log(g.getTotalOrbitsCount('COM'));
console.log(g.root)


