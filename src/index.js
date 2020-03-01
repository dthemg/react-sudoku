import React from "react"
import ReactDOM from "react-dom"

import './style.css'


class Board extends React.Component {

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
                                key={this.props.boardKeys[i][j]}
                                data-key={this.props.boardKeys[i][j]}
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
        this.onChange = this.onChange.bind(this);

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

    // Store new value
    onChange(event) {
        let key = event.target.dataset.key;
        
        const arr = this.state.boardArray;
        let row = (key - key % 9) / 9;
        let col = key % 9;

        arr[row][col] = parseInt(event.target.value);
        this.setState({
            boardArray: arr,
        })
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