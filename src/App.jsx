/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Confetti from "react-confetti";
import "./App.css";

const Square = ({ value, onSquareClick, classe }) => {
  return (
    <button className={classe} onClick={onSquareClick}>
      {value}
    </button>
  );
};

function App() {
  const [square, setSquare] = useState(Array(9).fill(null));
  const [XisNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(false);
  const [isDraw, setIsDraw] = useState(false);
  const [timer, setTimer] = useState(15);
  const [Xscore, setXscore] = useState(0);
  const [Oscore, setOscore] = useState(0);
  const [isFirstMove, setIsFirstMove] = useState(true);
  const [hasWinner, setHasWinner] = useState(null);

  useEffect(() => {
    if(timer <= 0) {
      XisNext ? null : null;
    }
    const interval = setInterval(() => {
      if (timer > 0 && !winner && !isDraw) {
        setTimer(timer - 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [timer, winner, isDraw, XisNext]);

  const handleClick = (i) => {
    setIsFirstMove(false);
    if (square[i] || calculateWinner(square)) {
      return;
    }
    const nextSquares = [...square];
    nextSquares[i] = XisNext ? "X" : "O";
    setSquare(nextSquares);
    setXIsNext(!XisNext);
    setTimer(15);
    calculateWinner(square);
  };

  const calculateWinner = (square) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (square[a] && square[a] === square[b] && square[a] === square[c]) {
        console.log(square[a]);
        return square[a];
      }
    }
    return null;
  };

  useEffect(() => {
    setHasWinner(calculateWinner(square));
    if (hasWinner) {
      setWinner(true);
      if (hasWinner === "X") {
        setXscore((prevXscore) => prevXscore + 1);
      } else {
        setOscore((prevYscore) => prevYscore + 1);
      }
    } else if (square.every((square) => square !== null)) {
      setIsDraw(true);
    }
  }, [square, hasWinner]);

  const resetGame = () => {
    setSquare(Array(9).fill(null));
    setXIsNext(true);
    setWinner(false);
    setIsDraw(false);
    setTimer(15);
    setIsFirstMove(true);
    setHasWinner(null);
  };

  let status;
  if (hasWinner) {
    status = `Winner is "${hasWinner}"!`;
  } else if (isDraw) {
    status = "It's Over";
  } else {
    status = isFirstMove ? `Let's start with "X"` : "Next Player is " + (XisNext ? '"X"' : '"O"');
  }

  useEffect(() => {
    console.log("X score", Xscore);
    console.log("O score", Oscore);
    console.log("The Winner is :", hasWinner);
  }, [Xscore, Oscore, hasWinner]);

  return (
    <>
      {!hasWinner && <div className="title">Let&apos;s Play Tic-Tac-Toe</div>}
      {hasWinner && <Confetti />}
      <div className="game-status">{status}</div>
      {Xscore === 0 ? null : (
        <div className="x-score">
          &quot;X&quot; score is <span>{Xscore}</span>
        </div>
      )}
      {Oscore === 0 ? null : (
        <div className="y-score">
          &quot;O&quot; score is <span>{Oscore}</span>
        </div>
      )}
      {hasWinner || isDraw ? (
        <div className="popup">
          <p>{hasWinner ? "Congratulations!" : "Match is draw"}</p>
          <button onClick={resetGame}>Restart</button>
        </div>
      ) : null}
      {!winner && !isDraw && (
        <>
          <table className="game-board">
            <tbody>
              <tr>
                  <td><Square classe="btn1" value={square[0]} onSquareClick={()=>handleClick(0)}/></td>
                  <td><Square classe="btn2" value={square[1]} onSquareClick={()=>handleClick(1)}/></td>
                  <td><Square classe="btn3" value={square[2]} onSquareClick={()=>handleClick(2)}/></td>
              </tr>
              <tr>
                  <td><Square classe="btn4" value={square[3]} onSquareClick={()=>handleClick(3)}/></td>
                  <td><Square classe="btn5" value={square[4]} onSquareClick={()=>handleClick(4)}/></td>
                  <td><Square classe="btn6" value={square[5]} onSquareClick={()=>handleClick(5)}/></td>
              </tr>
              <tr>
                  <td><Square classe="btn7" value={square[6]} onSquareClick={()=>handleClick(6)}/></td>
                  <td><Square classe="btn8" value={square[7]} onSquareClick={()=>handleClick(7)}/></td>
                  <td><Square classe="btn9" value={square[8]} onSquareClick={()=>handleClick(8)}/></td>
              </tr>
            </tbody>
          </table>
          {!isFirstMove && <div className="timer">Time left : {timer}</div>}
        </>
      )}
      <footer>
        <div className="left">
          <span>© {new Date().getFullYear()}</span> All rights reserved
        </div>
        <div className="right">
          Developed by <span>Hari prasath K</span>
        </div>
      </footer>
    </>
  );
}

export default App;
