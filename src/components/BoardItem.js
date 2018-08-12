import React from "react"
import { itemTypes } from "../constants";

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
  const clickItem = () => props.onClick(props.row,props.col)
  
  return (
    <div style={style.container} onClick={clickItem}>
      <span>{props.type === itemTypes.MINE && 'X'}</span>
    </div>
  )
}


export default BoardItem