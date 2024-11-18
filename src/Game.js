import React, { useState } from "react";
import GameGrid from "./GameGrid.js";

function Game() {
   // State variables
   const [moves, setMoves] = useState(Array(9).fill(""));
   const [turn, setTurn] = useState("X");
   const [winner, setWinner] = useState(null);

   // Winning combinations
   const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]             // Diagonals
   ];

   // Function to check for a winner or a tie
   const checkWinner = (updatedMoves) => {
      for (const combo of winningCombinations) {
         const [a, b, c] = combo;
         if (
            updatedMoves[a] &&
            updatedMoves[a] === updatedMoves[b] &&
            updatedMoves[a] === updatedMoves[c]
         ) {
            return updatedMoves[a]; // Return the winner ("X" or "O")
         }
      }
      return updatedMoves.every(move => move !== "") ? "Tie" : null; // Return "Tie" if all squares are filled
   };

   // Function to handle square clicks
   const gridClick = (whichSquare) => {
      if (winner || moves[whichSquare] !== "" || turn === "O") return; // Ignore clicks if game is over, square is occupied, or it's not the human's turn

      const movesCopy = [...moves];
      movesCopy[whichSquare] = turn;
      setMoves(movesCopy);

      const gameResult = checkWinner(movesCopy);
      if (gameResult) {
         setWinner(gameResult);
      } else {
         setTurn("O");
         setTimeout(() => computerMove(movesCopy), 500); // Delay computer move for better UX
      }
   };

   // Simple computer algorithm to make a move
   const computerMove = (currentMoves) => {
      const movesCopy = [...currentMoves];

      // Check for a winning move or a blocking move
      for (let combo of winningCombinations) {
         const [a, b, c] = combo;
         const line = [movesCopy[a], movesCopy[b], movesCopy[c]];

         // Try to win
         if (line.filter(val => val === "O").length === 2 && line.includes("")) {
            const index = line.indexOf("");
            movesCopy[combo[index]] = "O";
            setMoves(movesCopy);
            setWinner(checkWinner(movesCopy));
            setTurn("X");
            return;
         }

         // Try to block X
         if (line.filter(val => val === "X").length === 2 && line.includes("")) {
            const index = line.indexOf("");
            movesCopy[combo[index]] = "O";
            setMoves(movesCopy);
            setTurn("X");
            return;
         }
      }

      // Random move if no winning or blocking move is found
      const availableSquares = movesCopy.map((val, index) => (val === "" ? index : null)).filter(val => val !== null);
      if (availableSquares.length > 0) {
         const randomMove = availableSquares[Math.floor(Math.random() * availableSquares.length)];
         movesCopy[randomMove] = "O";
         setMoves(movesCopy);
         setWinner(checkWinner(movesCopy));
         setTurn("X");
      }
   };

   // Function to start a new game
   const newGame = () => {
      setMoves(Array(9).fill(""));
      setTurn("X");
      setWinner(null);
   };

   return (
      <>
         <h1>Tic-Tac-Toe</h1>
         <GameGrid moves={moves} click={gridClick} />
         <p>
            {winner 
               ? (winner === "Tie" ? "It's a Tie!" : `Winner: ${winner}`) 
               : `Turn: ${turn}`}
         </p>
         <p>
            <button onClick={newGame}>New Game</button>
         </p>
      </>
   );
}

export default Game;
