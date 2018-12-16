/**
 * Class representing each character in the input maze
 */
export default class Coordinate {
    visited = false;
    //#type;
    constructor(type){
        this.type = type;
    }

    isVisited()
    {
        return this.visited;
    }

    setVisited(visited)
    {
        this.visited = visited;
    }

    getType()
    {
        return this.type;
    }

    setType(type)
    {
        this.type = type;
    }

}