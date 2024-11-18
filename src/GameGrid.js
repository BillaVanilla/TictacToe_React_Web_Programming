import React from "react";
import Square from "./Square.js";

function GameGrid(props) {
  const moves = props.moves;

  // Inline Square component
  const Square = ({ player, onClick }) => (
    <button 
      className={`square ${player}`} 
      onClick={onClick}
    >
      {player}
    </button>
  );

  return (
    <div id="game-grid">
      {moves.map((player, index) => (
        <Square 
          key={index} 
          player={player} 
          onClick={() => props.click(index)} 
        />
      ))}
    </div>
  );
}

export default GameGrid;
