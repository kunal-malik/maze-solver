import Constants from '../constants';
import Coordinate from '../model/Coordinate';

/**
 * Constructs input maze in to Array of Arrays
 */
export default class MazeConstructor {

    constructor() {
        let _wall = Constants.WALL;
        let _start = Constants.START;
        let _finish = Constants.FINISH;
        let _blank = Constants.BLANK;
        let _hasStart = false;
        let _hasFinish = false;
        let _startPosition = null;

        /**
         * Returns the coordinate of start position in the input maze in format [row, col]
         */
        this.getStartPosition = function () {
            return _startPosition;
        }

        /**
         * Retrieves coordinate type for a char in the input maze
         * @param {*} char at a particular coordinate in input maze
         * @param {*} row row index of the char
         * @param {*} col col index of the char
         */
        this.getCoordinateType = function (char, row, col) {
            switch (char) {
                case _wall:
                    return 'WALL'

                case _start:
                    _hasStart = true;
                    _startPosition = [row, col];
                    return 'START'

                case _finish:
                    _hasFinish = true;
                    return 'FINISH'

                case _blank:
                    return 'BLANK'

                default:
                    return false;
            }
        }

        /**
         * Constructs the input maze into [[Coordinate/s]]. Assumes input maze is surrounded with walls.
         * Performs below validations:
         * Input maze should have start and finish position
         * Input maze rows should be of equal lengths
         * No other characters, except defined in constants file, are allowed
         * 
         * @param {String} inputMaze provided by the user
         * Incase of validation error, returns error message. Otherwise returns constructed Array of Arrays.
         */
        this.prepareMaze = function (inputMaze) {
            const mazeArr = new Array();
            const lines = inputMaze.split("\n");
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
                if (!_hasStart) return Constants.START_MISSING;
                if (!_hasFinish) return Constants.FINISH_MISSING;
            }

            //console.log('final mazeArr in MazeConstructor', mazeArr, errorMsg);
            return errorMsg ? errorMsg : mazeArr;
        }
    }
}