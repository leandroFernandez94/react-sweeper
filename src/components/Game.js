import React, { Component, createContext } from 'react';
import Board from './Board';
import { gameStates, itemState } from '../constants';

const gameContext = createContext({
  setGameState: () => {},
  gameState: gameStates.PLAYING,
})

const initialContext = {
  setGameState: (newState) => {this.gameState = newState},
  gameState: gameStates.PLAYING
}

class Game extends Component {

  state = {
    laoding:true,
    numberOfMines: 25,
    rows: 10,
    cols: 15,
    mines: []
  }

  /**
   * @param {number} i mine row
   * @param {number} j mine col
   */
  findMine = (i,j) => {
    return this.state.mines.find(mine => mine.row === i && mine.col === j)
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
    this.setState({loading:false})
  }

  render() {
    return (
      <gameContext.Provider value={initialContext}>
        <Board 
          rows={this.state.rows}
          cols={this.state.cols}
          mines={this.state.mines}
          loading={this.state.loading}/>
      </gameContext.Provider>
    );
  }
}

export const GameContext = gameContext.Consumer

export default Game;
