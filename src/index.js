import React from "react"
import ReactDOM from "react-dom"

import './style.css'


class Board extends React.Component {
    constructor() {
        super();
        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        this.props.onChange(event);
    }

    renderSudokuBoard() {
        let table = []

        // Outer loop to create rows
        for (let i = 0; i < 9; i++) {
            let children = []

            // Inner loop to create cells
            for (let j = 0; j < 9; j++) {
                children.push(
                    <td key={this.props.boardKeys[i][j]}>
                        <form 
                            key={this.props.boardKeys[i][j]}
                        >
                            <input 
                                placeholder="7"
                                type="text" 
                                onChange={(event) => this.onChange(event) }
                            />
                        </form>
                    </td>)    
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

    onChange(event) {
        console.log(event)
    }

    render() {
        const boardArray = this.state.boardArray;
        const boardKeys = this.state.boardKeys;
        return (
            <div className="game">
                <div className="game-board">
                    <Board 
                        boardArray = { boardArray }
                        boardKeys = { boardKeys }
                        onChange = { this.onChange }
                    />
                </div>
            </div>
        );
    }
}

ReactDOM.render(<SudokuGame />, document.getElementById("root"));