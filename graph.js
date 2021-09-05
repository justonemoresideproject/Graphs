class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for(let node of vertexArray){
      this.addVertex(node);
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    this.nodes.delete(vertex);
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    const toVisitStack = [start];
    const seen = new Set(toVisitStack);
    while(toVisitStack.length){
      let current = toVisitStack.pop();
      for(let adj of current.adjacent){
        if(!seen.has(adj)){
          seen.add(adj);
          toVisitStack.push(adj);
        }
      }
    }
    return seen;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    const toVisitQueue = [start];
    const seen = [toVisitQueue]
    while(toVisitQueue.length){
      let current = toVisitQueue.shift();
      for(let adj of current.adjacent){
        if(!seen.includes(adj)){
          seen.push(current.value);
          toVisitQueue.push(adj);
        }
      }
    }
    return seen;
  }

  // recursively send out x amount of recursive functions and return the shortest one along with its path
  shortestPath(v1, v2, seen=new Set([v1]), count=0){
    if(v1 == v2) return seen;
    for(let neighbor of v1.adjacent){
      if(!seen.has(neighbor)){
        seen.add(neighbor);
        if(this.shortestPath(neighbor, v2, seen)){
          return seen;
        }
      }
    }
    return new Error('Vertices are not connected');
  }
}

module.exports = {Graph, Node}