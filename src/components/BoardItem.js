import React from "react"
import { itemTypes, gameStates } from "../constants";
import { GameContext } from "./Game";

const style = {
  container: {
    display: "block",
    float:"left", 
    width: "48px",
    height: "48px",
    border: "1px solid"
  }
}

const BoardItem = (props) => {
  const {gameState,minesAroundCount} = props
  const clickItem = () => props.onClick(props.row,props.col)
  
  return (
    <div style={style.container} onClick={gameState === gameStates.PLAYING ? clickItem : null}>
      {
      gameState === gameStates.LOADING ?
      "..." :
      <span>{props.type === itemTypes.MINE ? 'X' : minesAroundCount(props.row,props.col) }</span>
      }
    </div>
  )
}


export default props => (
  <GameContext>
    {({gameState,minesAroundCount}) => 
    <BoardItem {...props} gameState={gameState} minesAroundCount={minesAroundCount} />}
  </GameContext>
);