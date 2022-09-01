import { useState } from 'react';       //Para crear el estado de la app
import './App.css';
import Board from './components/Board/Board';
import ScoreBoard from './components/ScoreBoard/ScoreBoard';

const winningPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
//Posibles posiciones ganadoras


const App = () => {

  const [turn, setTurn] = useState('X');
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [winningSquares, setWinningSquares] = useState([]);
  const [score, setScore] = useState({
    X: 0,
    O: 0,
  });
  //Estado base o inicial de la app

  const reset = () => {
    setTurn('X');
    setSquares(Array(9).fill(null));
    setWinningSquares([]);
  }
  //Reset

  const checkForWinner = newSquares => {
    for(let i = 0; i < winningPositions.length; i++) {
      const [a,b,c] = winningPositions[i];
      if(newSquares[a] && newSquares[a] === newSquares[b] && newSquares[a] === newSquares[c]) {
        endGame(newSquares[a], winningPositions[i]);
        return
      }
    }
    //Si hay ganador

    if(!newSquares.includes(null)) {
      endGame(null, Array.from(Array(10).keys()));    //Se le pasa nulo y el array
      return
    }
    setTurn(turn === 'X' ? 'O' : 'X');
  }
  //SI hay empate

  const handleClick = square => {
    let newSquares = [...squares];
    newSquares.splice(square, 1, turn);
    setSquares(newSquares);
    checkForWinner(newSquares);
  }

  const endGame = (result, winningPositions) => { //Tenemos en]l result y posiciones ganadoras
    setTurn(null);                                //No es turno de nadie
    if(result !== null) {                         //SI no hubo empate, 
      setScore({                                  //Se le suma puntos al que corresponda
        ...score,
        [result]: score[result] + 1,              //
      })
    }
    setWinningSquares(winningPositions);
    setTimeout(reset, 2000);
  }
  //Fin del juego

  return (
    <div className="container">
      <Board winningSquares={winningSquares} turn={turn} squares={squares} onClick={handleClick}/>
      <ScoreBoard scoreO={score.O} scoreX={score.X} />
    </div>
  );
}

export default App;
