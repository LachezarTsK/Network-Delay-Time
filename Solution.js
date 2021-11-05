
var distanceFromStart;
var visited;
var neighbours;
const INFINITY = 10001;//(numberOfNodes x maxTravelTime) + 1

/**
 * @param {number[][]} times
 * @param {number} numberOfNodes
 * @param {number} start
 * @return {number}
 */
var networkDelayTime = function (times, numberOfNodes, start) {
    visited = new Array(numberOfNodes + 1);
    initializeNeighbours(times, numberOfNodes);
    initializeDistanceFromStart(numberOfNodes, start);
    dijkstraSearch(numberOfNodes, start);

    return timeForTheSignalToBeReceivedByAllNodes(numberOfNodes);
};

/**
 * @param {number} numberOfNodes
 */
function dijkstraSearch(numberOfNodes) {
    let current = selectNodeWithMininumTime(numberOfNodes);

    while (current !== -1) {
        visited[current] = true;
        for (let node = 1; node <= numberOfNodes; node++) {
            if (distanceFromStart[node] > distanceFromStart[current] + neighbours[current][node]) {
                distanceFromStart[node] = distanceFromStart[current] + neighbours[current][node];
            }
        }
        current = selectNodeWithMininumTime(numberOfNodes);
    }
}

/**
 * @param {number} numberOfNodes
 * @return {number}
 */
function selectNodeWithMininumTime(numberOfNodes) {
    let minTime = INFINITY;
    let index = -1;
    for (let i = 1; i <= numberOfNodes; i++) {
        if (!visited[i] && distanceFromStart[i] < minTime) {
            minTime = distanceFromStart[i];
            index = i;
        }
    }
    return index;
}

/**
 * @param {number} numberOfNodes
 * @return {number}
 */
function timeForTheSignalToBeReceivedByAllNodes(numberOfNodes) {

    let timeToRecieveTheSignal = 0;
    for (let i = 1; i <= numberOfNodes; i++) {
        if (distanceFromStart[i] === INFINITY) {
            return -1;
        }
        timeToRecieveTheSignal = Math.max(timeToRecieveTheSignal, distanceFromStart[i]);
    }
    return timeToRecieveTheSignal;
}

/**
 * @param {number[][]} times
 * @param {number} numberOfNodes
 */
function initializeNeighbours(times, numberOfNodes) {

    neighbours = new Array(numberOfNodes + 1);
    for (let i = 0; i <= numberOfNodes; i++) {
        neighbours[i] = new Array(numberOfNodes + 1);
        neighbours[i].fill(INFINITY);
    }

    let size = times.length;
    for (let i = 0; i < size; i++) {
        let from = times[i][0];
        let to = times[i][1];
        neighbours[from][to] = times[i][2];
    }
}

/**
 * @param {number} numberOfNodes
 * @param {number} start
 */
function initializeDistanceFromStart(numberOfNodes, start) {
    distanceFromStart = new Array(numberOfNodes + 1);
    distanceFromStart.fill(INFINITY);
    distanceFromStart[start] = 0;
}
