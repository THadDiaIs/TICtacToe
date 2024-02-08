import { useState } from 'react'
import './App.css'


let Square = ({ symbol, id, onClick }) => <div className="square" onClick={(e) => onClick(id)}>{symbol}</div>

let Winner = ({ msg }) => msg && <div className="msg" id="msg">{msg}</div>

function App() {
  let [squares, setSquares] = useState(new Array(9).fill(null))
  let [turn, setTurn] = useState("x")
  let [winnerMsg, setWinnerMsg] = useState(null)
  let winnConfig = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]]

  let resetGame = (resetionTime) => {
    setTimeout(() => {
      setSquares(new Array(9).fill(null))
      setWinnerMsg(null)
    }, resetionTime);
  }

  let checkWinner = () => {
    if (squares.every(sqr => sqr)) {
      setWinnerMsg("It's a draw!, lets play again.")
      resetGame(4000)
    } else {
      winnConfig.some(conf => {
        let winnr = turn === "x"
          ? "x"
          : "o";
        if ([squares[conf[0] - 1], squares[conf[1] - 1], squares[conf[2] - 1]].toString() === new Array(3).fill(winnr).toString()) {
          setWinnerMsg(`${winnr} wins this game, Lets play again!`)
          resetGame(4000);
        }
      });
    }
  }

  let setSquare = (idx) => {
    if (!squares[idx]) {
      squares[idx] = turn
      setSquares([...squares])
      setTurn(turn === "x" ? "o" : "x")
    }
    checkWinner()
  }

  return (
    <main>
      <div className="scoreboard">
        <h2 className="title">Tic-Tac-Toe</h2>
      </div>
      <section className='squares-container'>
        {squares.map((sqr, idx) => <Square key={idx} symbol={sqr} id={idx} onClick={setSquare} />)}
      </section>
      <div className="info">
        <p className="current-turn">Current turn: <strong className='current-symbol'>{turn}</strong></p>
      </div>
      <Winner msg={winnerMsg} />
    </main>
  )
}

export default App
