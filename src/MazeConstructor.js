import Constants from './constants';
import Coordinate from './model/Coordinate';

/**
 * Constructs input maze in to Array of Arrays
 */
export default class MazeConstructor {
    maze = null;
    wall = Constants.WALL;
    start = Constants.START;
    finish = Constants.FINISH;
    blank = Constants.BLANK;
    hasStart = false;
    hasFinish = false;
    startPosition = null;

    constructor(maze) {
        this.maze = maze;
    }

    /**
     * Returns the coordinate of start position in the input maze in format [row, col]
     */
    getStartPosition() {
        return this.startPosition;
    }

    /**
     * Constructs the input maze into [[Coordinate/s]]. Assumes input maze is surrounded with walls.
     * 
     * Performs below validations:
     * Input maze should have start and finish position
     * Input maze rows should be of equal lengths
     * No other characters, except defined in constants file, are allowed
     * 
     * Incase of validation error, returns error message. Otherwise returns constructed Array of Arrays.
     */
    prepareMaze() {
        const mazeArr = new Array();
        const lines = this.maze.split("\n");
        const width = lines[0].length;
        let errorMsg = null;
        for (let row = 0; row < lines.length; row++) {
            mazeArr[row] = new Array();
            //Assumption: surrounded with walls
            const currLine = lines[row].trim();
            const currWidth = currLine.length;
            if (width == currWidth) {
                for (let colIndex = 0; colIndex < currWidth; colIndex++) {
                    const char = currLine.charAt(colIndex);
                    const coordinateType = this.getCoordinateType(char, row, colIndex);
                    if (typeof coordinateType == 'boolean') {
                        errorMsg = Constants.UNKNOWN_CHARACTERS;
                        row = lines.length;
                        break;
                    }
                    mazeArr[row][colIndex] = new Coordinate(coordinateType);

                }
            } else {
                errorMsg = Constants.ROWS_INEQUAL;
                break;
            }

        }

        if (errorMsg === null) {
            if (!this.hasStart) return Constants.START_MISSING;
            if (!this.hasFinish) return Constants.FINISH_MISSING;
        }

        console.log('final mazeArr in MazeConstructor', mazeArr, errorMsg);
        return errorMsg ? errorMsg : mazeArr;
    }

    /**
     * Retrieves coordinate type for a char in the input maze
     * @param {*} char at a particular coordinate in input maze
     * @param {*} row row index of the char
     * @param {*} col col index of the char
     */
    getCoordinateType(char, row, col) {
        switch (char) {
            case this.wall:
                return 'WALL'

            case this.start:
                this.hasStart = true;
                this.startPosition = [row, col];
                return 'START'

            case this.finish:
                this.hasFinish = true;
                return 'FINISH'

            case this.blank:
                return 'BLANK'

            default:
                return false;
        }
    }
}