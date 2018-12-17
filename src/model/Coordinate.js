/**
 * Class representing each character in the input maze
 */
export default class Coordinate {
    constructor(type) {
        let _type = type;
        let _visited = false;

        this.getType = function () {
            return _type;
        }

        this.setType = function (type) {
            _type = type;
        }

        this.isVisited = function () {
            return _visited;
        }

        this.setVisited = function (visited) {
            _visited = visited;
        }

    }
}