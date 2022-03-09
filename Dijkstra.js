export default class Dijkstra {
  constructor(edges, nodes, startingNode) {
    this.edges = edges;
    this.nodes = nodes;
    this.startingNode = startingNode;
  }

  performDijkstra() {
    let visitedNodes = [];
    let currentNode = this.startingNode;
    let finalConnections = initializeFinalConnections(
      this.edges,
      this.nodes,
      currentNode
    );
    visitedNodes.push(currentNode);

    while (visitedNodes.length != this.nodes.length) {
      currentNode = pickBestNode(finalConnections, this.nodes, visitedNodes);
      visitedNodes.push(currentNode);

      finalConnections = updateConnections(
        finalConnections,
        this.edges,
        currentNode
      );
    }
    return finalConnections;
  }
}

function updateConnections(finalConnections, edges, currentNode) {
  for (let edge of edges) {
    if (edge.firstNode == currentNode || edge.secondNode == currentNode) {
      let notCurrent =
        edge.firstNode == currentNode ? edge.secondNode : edge.firstNode;
      let currNode =
        edge.firstNode == notCurrent ? edge.secondNode : edge.firstNode;
      if (
        finalConnections[currNode].weight + edge.weight <
        finalConnections[notCurrent].weight
      ) {
        finalConnections[notCurrent] = {
          weight: finalConnections[currNode].weight + edge.weight,
          prevNode: currNode,
        };
      }
    }
  }
  return finalConnections;
}

function initializeFinalConnections(edges, nodes, currentNode) {
  let initCons = {};
  initCons[currentNode] = { weight: 0, prevNode: currentNode };

  for (let edge of edges) {
    if (edge.firstNode == currentNode || edge.secondNode == currentNode) {
      let notCurrent =
        edge.firstNode == currentNode ? edge.secondNode : edge.firstNode;
      let prevNode =
        edge.firstNode == notCurrent ? edge.secondNode : edge.firstNode;
      initCons[notCurrent] = { weight: edge.weight, prevNode: prevNode };
    }
  }

  for (let node of nodes) {
    if (!initCons[node]) {
      initCons[node] = { weight: Infinity, prevNode: null };
    }
  }
  return initCons;
}

function pickBestNode(finalConnections, nodes, visitedNodes) {
  let nodesToVisit = nodes.filter((node) => !visitedNodes.includes(node));
  let minNode = nodesToVisit[0];
  for (let node of nodesToVisit) {
    if (finalConnections[node].weight < finalConnections[minNode].weight) {
      minNode = node;
    }
  }
  return minNode;
}
