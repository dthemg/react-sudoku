import React from "react"
import ReactDOM from "react-dom"

import './style.css'

class Square extends React.Component {
    render() {
        return (
            <button 
                className="square"
            >
            </button>
        )
    }
}

class Board extends React.Component {
    constructor(props) {
        super(props);
    }

    renderSquare(i) {
        return (
            <Square
            />
        )
    }

    renderSudokuBoard(boardArray) {
        let table = []

        // Outer loop to create rows
        for (let i = 0; i < 9; i++) {
            let children = []
            // Inner loop to create columns
            for (let j = 0; j < 9; j++) {
                children.push(<td>{ boardArray[i][j] }</td>)
            }
            // Add children to parent
            table.push(<tr>{children}</tr>)
        }
        return table
    }

    render() {
        return (
            <table>
                { this.renderSudokuBoard(this.props.boardArray) }
            </table>
        )
    }
}

class SudokuGame extends React.Component {
    constructor(props) {
        super(props);

        var boardArray = Array(9);
        for (let i = 0; i < boardArray.length; i++) {
            boardArray[i] = Array(9).fill(1);
        }

        this.state = {
            gameEnded: false,
            boardArray: boardArray,
        }
    }

    render() {
        const boardArray = this.state.boardArray
        return (
            <div className="game">
                <div className="game-board">
                    <Board 
                        boardArray = {boardArray}
                    />
                </div>
            </div>
        );
    }
}

ReactDOM.render(<SudokuGame />, document.getElementById("root"));