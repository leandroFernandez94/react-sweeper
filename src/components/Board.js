import React, {Component} from "react"
import BoardItem from "./BoardItem"
import { itemTypes, gameStates } from "../constants";
import { GameContext } from "./Game";

/**
 * 
 * @param {number} cols number of columns for the board
 * @param {number} rows number of rows for the board
 */
const generateStyle=(cols,rows) =>({
  border: "1px solid blue",
  width: `${cols*50}px`,
  height: `${rows*50}px`
})

class Board extends Component {
  clickBoardItem = (row,col) => {
    console.log(`clicked (${row},${col})`)
  }

  populateBoard = () => {
    const {cols,rows,mines} = this.props
    return Array.from(Array(rows),(_rv,ri) => {
      return Array.from(Array(cols),(_cv,ci) => (
        <BoardItem
          col={ci}
          row={ri}
          key={`c${ci}r${ri}`}
          onClick={this.clickBoardItem}
          type={
            mines.find(mine => mine.row === ri && mine.col === ci) ?
              itemTypes.MINE : itemTypes.NUMBER
          }
        />
      ))
    })
  }

  render() {
    return(
      <div style={generateStyle(this.props.cols,this.props.rows)}>
        {[].concat(...this.populateBoard())}
      </div>
    )
  }
}

export default Board