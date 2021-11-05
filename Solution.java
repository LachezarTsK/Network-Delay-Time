
import java.util.Arrays;

public class Solution {

    public int[] distanceFromStart;
    public boolean[] visited;
    public int[][] neighbours;
    public final int INFINITY = 10001;//(numberOfNodes x maxTravelTime) + 1

    public int networkDelayTime(int[][] times, int numberOfNodes, int start) {

        this.visited = new boolean[numberOfNodes + 1];
        initializeNeighbours(times, numberOfNodes);
        initializeDistanceFromStart(numberOfNodes, start);
        dijkstraSearch(numberOfNodes);

        return timeForTheSignalToBeReceivedByAllNodes(numberOfNodes);
    }

    public void dijkstraSearch(int numberOfNodes) {
        int current = selectNodeWithMininumTime(numberOfNodes);

        while (current != -1) {
            visited[current] = true;
            for (int node = 1; node <= numberOfNodes; node++) {
                if (distanceFromStart[node] > distanceFromStart[current] + neighbours[current][node]) {
                    distanceFromStart[node] = distanceFromStart[current] + neighbours[current][node];
                }
            }
            current = selectNodeWithMininumTime(numberOfNodes);
        }
    }

    public int selectNodeWithMininumTime(int numberOfNodes) {
        int minTime = INFINITY;
        int index = -1;
        for (int i = 1; i <= numberOfNodes; i++) {
            if (!visited[i] && distanceFromStart[i] < minTime) {
                minTime = distanceFromStart[i];
                index = i;
            }
        }
        return index;
    }

    public int timeForTheSignalToBeReceivedByAllNodes(int numberOfNodes) {

        int timeToRecieveTheSignal = 0;
        for (int i = 1; i <= numberOfNodes; i++) {
            if (distanceFromStart[i] == INFINITY) {
                return -1;
            }
            timeToRecieveTheSignal = Math.max(timeToRecieveTheSignal, distanceFromStart[i]);
        }
        return timeToRecieveTheSignal;
    }

    public void initializeNeighbours(int[][] times, int numberOfNodes) {

        neighbours = new int[numberOfNodes + 1][numberOfNodes + 1];
        for (int i = 0; i <= numberOfNodes; i++) {
            Arrays.fill(neighbours[i], INFINITY);
        }

        int size = times.length;
        for (int i = 0; i < size; i++) {
            int from = times[i][0];
            int to = times[i][1];
            neighbours[from][to] = times[i][2];
        }
    }

    public void initializeDistanceFromStart(int numberOfNodes, int start) {
        distanceFromStart = new int[numberOfNodes + 1];
        Arrays.fill(distanceFromStart, INFINITY);
        distanceFromStart[start] = 0;
    }
}
