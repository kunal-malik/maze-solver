/**
 * Initiates the logic to find the path from start to finish position in the input maze
 * @param {[[Coordinate/s]]} maze input maze entered by the user in format Array of Arrays
 * @param {Array} startPosition start position in the input maze in format [row, col]
 * Returns boolean stating whether a valid path was found or not
 */
function getPath(maze, startPosition) {
    return findPath(maze, startPosition[0], startPosition[1]);
}

/**
 * Recursive DFS function to solve the path between start and finish position/coordinate
 * @param {[[Coordinate/s]]} maze constructed input maze
 * @param {*} row current row of the coordinate
 * @param {*} col current col of the coordinate
 * Returns boolean stating whether a valid path was found or not
 */
function findPath(maze, row, col) {
    if (proceed(maze, row, col)) {
        const coordinate = maze[row][col];
        coordinate.setVisited(true);
        if (coordinate.getType() === 'FINISH') {
            return true;
        } else if (coordinate.getType() === 'WALL') {
            return false;
        } else if (
            findPath(maze, row, col + 1)
            ||
            findPath(maze, row - 1, col)
            ||
            findPath(maze, row, col - 1)
            ||
            findPath(maze, row + 1, col)
        ) {
            if (coordinate.getType() === 'BLANK') {
                coordinate.setType('PATH');
            }
            return true;
        }
        return false;
    } else {
        return false;
    }
}

/**
 * Validates the coordinate if recursive function should proceed evaluating it or not. We do not proceed if:
 * Coordinate is out of bounds
 * Coordinate has been visited earlier
 * @param {*} maze 
 * @param {*} row 
 * @param {*} col 
 */
function proceed(maze, row, col) {
    if (row >= 0 && col >= 0 && row < maze.length && col < maze[0].length) {
        const coordinate = maze[row][col];
        if (coordinate.isVisited()) {
            return false
        }
    } else {
        return false
    }
    return true;
}

export default {
    getPath
}