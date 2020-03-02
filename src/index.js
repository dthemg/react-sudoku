import React from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"

import './style.css'


class Board extends React.Component {

    onChange(event) {
        this.props.onChange(event);
    }

    square(key, input) {
        return (
            <td key={key}>
                <form 
                    key={key}
                >
                    {input}
                </form>
            </td>
        )
    }

    editableSquare(key) {
        let input = (
            <input
                key={key}
                data-key={key}
                maxLength="1"
                onChange={(event) => this.onChange(event)}
            />
        )
        return this.square(key, input);
    }

    starterSquare(val, key) {
        let input = (
            <input 
                key={key}
                value={val}
                disabled
            />
        )

        return this.square(key, input);
    }

    renderSudokuBoard() {
        let table = []

        // Outer loop to create rows
        for (let i = 0; i < 9; i++) {
            let children = []

            // Inner loop to create cells
            for (let j = 0; j < 9; j++) {
                let key = this.props.boardKeys[i][j];
                if (this.props.boardDisabled[i][j]) {
                    children.push(this.starterSquare(this.props.boardArray[i][j], key))
                } else {
                    children.push(this.editableSquare(key))    
                }
            }
            
            // Add row to parent
            table.push(
                <tbody key={this.props.boardKeys[0][i]}>
                    <tr >{children}</tr>
                </tbody>)
        }
        return table
    }

    render() {
        return (
            <table>
                { this.renderSudokuBoard() }
            </table>
        )
    }
}

Board.propTypes = {
    boardArray: PropTypes.array,
    boardKeys: PropTypes.array,
    boardDisabled: PropTypes.array,
    onChange: PropTypes.func
}

class SudokuGame extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);

        var boardArray = Array(9);
        var boardKeys = Array(9); 
        var boardDisabled = Array(9);

        for (let i = 0; i < boardArray.length; i++) {
            boardArray[i] = Array(9).fill(NaN);
            boardKeys[i] = Array(9);
            boardDisabled[i] = Array(9).fill(false);
            for (let j = 0; j < 9; j++) {
                boardKeys[i][j] = 9*i + j;
            }
        }

        // Add some predefined numbers
        boardArray = populateBoard(boardArray);

        for (let i = 0; i < boardArray.length; i++) {
            for(let j = 0; j < 9; j++) {
                if (!isNaN(boardArray[i][j])) {
                    boardDisabled[i][j] = true;
                }
            }
        }

        this.state = {
            gameEnded: false,
            boardArray: boardArray,
            boardKeys: boardKeys,
            boardDisabled: boardDisabled,
        }
    }

    // Store new value
    onChange(event) {
        let key = event.target.dataset.key;
        
        const arr = this.state.boardArray;
        let row = (key - key % 9) / 9;
        let col = key % 9;

        let newVal = parseInt(event.target.value);
        if (Number.isNaN(newVal) || newVal === 0) {
            console.error("Cannot add value: ", event.target.value);
            
        } else {
            arr[row][col] = parseInt(newVal);

            if (this.boardIsLegal(arr)) {
                this.setState({
                    boardArray: arr,
                })
            }
        }
    }

    boardIsLegal() {
        let legal = true;
        const board = this.state.boardArray;

        // Check rows
        for (let rowIdx in board) {
            let row = board[rowIdx].filter(function (value) {
                return !Number.isNaN(value);
            })
            let unique = [...new Set(row)];
            
            if (row.length !== unique.length) {
                legal = false;
            }
        }

        // Check cols
        for (let colIdx=0; colIdx<9; colIdx++) {
            let col = [];
            for (let rowIdx in board) {
                col.push(board[rowIdx][colIdx])
            }
            col = col.filter(function (value) {
                return !Number.isNaN(value);
            })
            let unique = [...new Set(col)];
            if (col.length !== unique.length) {
                legal = false;
            }
        }

        return legal;
    }

    render() {
        const boardArray = this.state.boardArray;
        const boardKeys = this.state.boardKeys;
        const boardDisabled = this.state.boardDisabled;

        return (
            <div className="game">
                <div className="game-board">
                    <Board 
                        boardArray = { boardArray }
                        boardKeys = { boardKeys }
                        onChange = { this.onChange }
                        boardDisabled = { boardDisabled } 
                    />
                </div>
            </div>
        );
    }
}

function populateBoard(boardArr) {
    boardArr[0][0] = 1;
    boardArr[0][1] = 9;
    boardArr[0][3] = 6;
    boardArr[0][4] = 4;
    boardArr[0][5] = 2;
    boardArr[0][7] = 5;
    boardArr[0][8] = 3;
    boardArr[1][0] = 2;
    boardArr[1][2] = 8;
    boardArr[1][4] = 3;
    boardArr[1][5] = 1;
    boardArr[2][0] = 3;
    boardArr[2][5] = 9;
    boardArr[3][2] = 9;
    boardArr[3][3] = 2;
    boardArr[3][4] = 6;
    boardArr[3][5] = 8;
    boardArr[4][2] = 6;
    boardArr[4][6] = 9;
    boardArr[5][3] = 5;
    boardArr[5][4] = 9;
    boardArr[5][5] = 3;
    boardArr[5][6] = 4;
    boardArr[6][3] = 4;
    boardArr[6][8] = 1;
    boardArr[7][3] = 3;
    boardArr[7][4] = 1;
    boardArr[7][6] = 2;
    boardArr[7][8] = 9;
    boardArr[8][0] = 7;
    boardArr[8][1] = 1;
    boardArr[8][3] = 9;
    boardArr[8][4] = 8;
    boardArr[8][5] = 6;
    boardArr[8][7] = 4;
    boardArr[8][8] = 5;
    return boardArr;
}

ReactDOM.render(<SudokuGame />, document.getElementById("root"));