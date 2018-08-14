import React, { Component, createContext } from 'react';
import Board from './Board';
import { gameStates, itemState } from '../constants';

class Item {
  constructor(row,col) {
    this.row = row;
    this.col= col;
  }
}

const positionsAroundArray = (row,col) => [
  //right
  new Item(row,col + 1),
  //left
  new Item(row, col - 1),
  //up
  new Item(row - 1, col),
  //down
  new Item(row + 1, col),
  //up right
  new Item(row - 1, col + 1),
  //up left
  new Item(row - 1, col - 1),
  //down right
  new Item(row +1, col + 1),
  //down left
  new Item(row + 1, col - 1)
]

const gameContext = createContext({
  setGameState: () => {},
  gameState: gameStates.PLAYING,
})

class Game extends Component {

  state = {
    loading:true,
    numberOfMines: 25,
    rows: 10,
    cols: 15,
    mines: [],
    gameState: gameStates.LOADING,
    setGameState: (newState) => {this.setState({gameState: newState})},
    minesAroundCount: (row,col) => this.getMinesAroundCount(row,col)
  }

  /**
   * @param {number} i mine row
   * @param {number} j mine col
   * @returns {boolean} wether there is a mine with those coordinates
   */
  findMine = (i,j) => 
    this.state.mines.find(mine => mine.row === i && mine.col === j)

  /**
   * @param {number} row
   * @param {number} col
   * @returns {boolean} wether there is an item with those coordinates on the board
   */
  existsInBoard = (row,col) => (
    (row >= 0 && row < this.state.rows) &&
    (col >= 0 && row < this.state.cols)
  )

  /**
   * @param {number} row
   * @param {number} col
   * @returns {number} wether there is an item with those coordinates on the board
   */
  getMinesAroundCount = (row,col) => {
    const positions = positionsAroundArray(row,col)
      return positions.filter(item => this.existsInBoard(item.row,item.col))
      .filter(item => !!this.findMine(item.row,item.col))
      .length
  }
  

  /**
  * generate mine positions
  */
  getRandomMines = () => {
    const randomCol = Math.floor((Math.random() * this.state.cols));
    const randomRow = Math.floor((Math.random() * this.state.rows));
    //generate other mine if coordinates are already taken by another mine
    if(this.findMine(randomRow,randomCol)) {
      this.getRandomMines()
    } else {
      this.setState(
        //add new mine
        ({mines}) => ({
          mines: [
            ...mines,
            {row: randomRow,col: randomCol, status:itemState.UNCOVERED}
          ]
        }),
        //get a new mine position if needed after state is set
        () => {
          if(this.state.mines.length < this.state.numberOfMines) {
            this.getRandomMines() 
          }
        }
      )
    }
  }

  
  componentDidMount() {
    this.getRandomMines()
    this.setState({gameState:gameStates.PLAYING})
  }

  render() {
    return (
      <gameContext.Provider value={this.state}>
        <Board 
          rows={this.state.rows}
          cols={this.state.cols}
          mines={this.state.mines}/>
      </gameContext.Provider>
    );
  }
}

export const GameContext = gameContext.Consumer

export default Game;
