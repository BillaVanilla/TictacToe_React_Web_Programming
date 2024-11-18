import React from "react";

function Square(props) {  
   return (
      <button 
         className={`square ${props.player}`}
         onClick={props.click}
      >
         {props.player}
      </button>
   );
}

export default Square;
