import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Util from '../Utility';
import Constants from '../constants';
import MazeConstructor from '../classes/MazeConstructor';

/**
 * Main component that renders content on the screen
 */
class MazeComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inputMaze: '',
            solvedMaze: null,
            showError: false,
            pathNotFound: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.solveMaze = this.solveMaze.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.resetAll = this.resetAll.bind(this);
    }

    /**
     * Updates inputMaze entered by user in the textarea
     * @param {String} value 
     */
    handleChange(value) {
        this.setState({
            inputMaze: value,
            showError: false
        })
    }

    /**
     * Handles button click. It calls solveMaze function in initial click and resetAll function in case user wants to solve another maze
     */
    handleClick() {
        const { solvedMaze, pathNotFound } = this.state;
        solvedMaze || pathNotFound ? this.resetAll() : this.solveMaze();
    }

    /**
     * Resets everything so that program returns to its initial state
     */
    resetAll() {
        this.setState({
            solvedMaze: null,
            inputMaze: '',
            showError: false,
            errorMsg: null,
            pathNotFound: false
        })
    }

    /**
     * Handles bulk of the logic. It validates if maze is not empty, contructs the maze and sends the constructed maze to utility function to get the path.
     */
    solveMaze() {
        const { inputMaze } = this.state;
        if (inputMaze != '') {
            const mazeConstructor = new MazeConstructor();
            const builtMaze = mazeConstructor.prepareMaze(inputMaze);

            //Check if there was any validation error while preparing maze
            if (typeof builtMaze === 'string') {
                this.setState({
                    showError: true,
                    errorMsg: builtMaze
                })
            } else {
                const isSolved = Util.getPath(builtMaze, mazeConstructor.getStartPosition());
                if (isSolved) {
                    this.setState({
                        solvedMaze: builtMaze
                    })
                } else {
                    this.setState({
                        pathNotFound: true
                    })
                }
            }

        } else {
            this.setState({
                showError: true,
                errorMsg: Constants.MAZE_EMPTY
            })
        }
    }

    render() {
        const { solvedMaze, inputMaze, showError, errorMsg, pathNotFound } = this.state;
        return (
            <div id="maze-container" className="maze-container">
                <div className="container-fluid">
                    <div className="row content">
                        {/* <div className="col-lg-1"></div> */}
                        <div className="col-xs-12 col-md-5" >

                            <textarea id="input-maze" className={showError ? `input-maze` : ''} rows="20" cols="55" onChange={e => this.handleChange(e.target.value)} placeholder={Constants.INPUT_MAZE_PLACEHOLDER} value={inputMaze}></textarea>
                            {showError ?
                                <div className="text-danger">
                                    {errorMsg}
                                </div>
                                : null}
                        </div>

                        <div className="col-xs-12 col-md-2">
                            <Button data-test='button' bsStyle="primary" onClick={this.handleClick}>{solvedMaze || pathNotFound ? Constants.BUTTON_RESET_ALL : Constants.BUTTON_SOLVE_MAZE}</Button>
                        </div>

                        {solvedMaze ?
                            <div className="col-xs-12 col-md-5" id="solved-maze-container">
                                {solvedMaze && solvedMaze.map((arr, index1) => {
                                    return <div key={index1}>
                                        {
                                            arr.map((coordinate, index) => {
                                                const className = coordinate.getType() == 'PATH' ? 'red' : '';
                                                //index1 == 9 ? console.log('coordinate.getType()', coordinate.getType()) : null
                                                return coordinate.getType() == 'BLANK' ? <span key={index}>&nbsp;</span> :
                                                    <span key={index} className={className}>{Constants[coordinate.getType()]}</span>
                                            })

                                        }
                                    </div>


                                })}
                                {solvedMaze ? <div className="row content"><span className="red">{Constants.PATH}</span> represents solved path </div> : null}
                            </div>
                            : null}

                        {
                            pathNotFound ? <div className="col-xs-12 col-md-5 red">{Constants.NO_VALID_PATH}</div> : null
                        }

                    </div>
                </div>
            </div>
        );
    }
}

export default MazeComponent;