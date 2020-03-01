import React from "react"
import ReactDOM from "react-dom"

import './style.css'

class Square extends React.Component {

    render() {
        return (
            <form>
                <input 
                    type="text" 
                    value="3"
                />
            </form>
        )
    }
}

class Board extends React.Component {

    renderSquare(i) {
        return (
            <Square
            />
        )
    }

    renderSudokuBoard(boardArray, boardKeys) {
        let table = []

        // Outer loop to create rows
        for (let i = 0; i < 9; i++) {
            let children = []

            // Inner loop to create columns
            for (let j = 0; j < 9; j++) {
                children.push(
                    <td 
                        key={boardKeys[i][j]}
                    >
                        { boardArray[i][j] }
                    </td>)
            }
            
            // Add children to parent
            table.push(
                <tbody key={boardKeys[0][i]}>
                    <tr >{children}</tr>
                </tbody>)
        }
        return table
    }

    render() {
        return (
            <table>
                { this.renderSudokuBoard(
                    this.props.boardArray, this.props.boardKeys) }
            </table>
        )
    }
}

class SudokuGame extends React.Component {
    constructor(props) {
        super(props);

        var boardArray = Array(9);
        var boardKeys = Array(9); 

        for (let i = 0; i < boardArray.length; i++) {
            boardArray[i] = Array(9).fill(1);
            boardKeys[i] = Array(9);
            for (let j = 0; j < 9; j++) {
                boardKeys[i][j] = 9*i + j;
            }
        }

        this.state = {
            gameEnded: false,
            boardArray: boardArray,
            boardKeys: boardKeys,
        }
    }

    render() {
        const boardArray = this.state.boardArray;
        const boardKeys = this.state.boardKeys;
        return (
            <div className="game">
                <div className="game-board">
                    <Board 
                        boardArray = {boardArray}
                        boardKeys = {boardKeys}
                    />
                </div>
            </div>
        );
    }
}

ReactDOM.render(<SudokuGame />, document.getElementById("root"));