import React, { useState } from 'react'
import './TicTacToe.css'
import circle_icon from '../Assets/circle.svg'
import cross_icon from '../Assets/x-solid.svg'
const  TURNS = {
    X: "x",
    O: "o"
};

const Square = ({ children, isSelected, updateBoard, index}) => {

    const className = `square ${isSelected ? 'is-selected' : ''}`

    const handleClick = () => {
        updateBoard(index)
    }
    return (
        <div onClick={handleClick} className={className}>
            {children}
        </div>
    )
}

const WINNER_COMBOS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

export const TicTacToe = () => {

    const [board, setBoard] = useState(Array(9).fill(null))

    const [turn, setTurn] = useState(TURNS.X)
    const [winner, setWinner] = useState(null)

    const checkWinner = (boardToCheck) => {
        for (const combo of WINNER_COMBOS) {
            const [a,b,c] = combo
            if (
                boardToCheck[a] && 
                boardToCheck[a] === boardToCheck[b] &&
                boardToCheck[a] === boardToCheck[c]
            ) {
                return boardToCheck[a]
            }
        }
        return null
    }

    const resetGame = () => {
        setBoard(Array(9).fill(null))
        setTurn(TURNS.X)
        setWinner(null)
    }

    const updateBoard = (index) => {

        if (board[index] || winner) return

        const newBoard = [...board]
        newBoard[index] = turn
        setBoard(newBoard)

        const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
        setTurn(newTurn)

        const newWinner = checkWinner(newBoard)
        if (newWinner) {
            setWinner((prevWinner) => {
                console.log(`el ganador es: ${newWinner} y el anterior ganador era: ${prevWinner}`)
                return newWinner
            })
        }
    }

/* 
    let [count, setCount] = useState(0);
    let [lock, setLock] = useState(false); */

   

    return (
    <div className='board'>
    <h1 className='title'>TicTacToe</h1>
    <button onClick={resetGame}>Reset</button>
    <section className="game">
        {
        board.map((square, index) => {
        return (
        <Square 
        key={index}
        index={index}
        updateBoard={updateBoard}
        >
            {square}
        </Square>
        )
        })
        }
    </section>
    <section className="turn">
    <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
    <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
    </section>
    {
        winner !== null && (
            <section className="winner">
                <div className="text">
                    <h2>
                        {
                           winner === false 
                           ? 'Empatados'
                           : 'Ganó' + ' ' + winner 
                        }
                    </h2>

                    <header className='win'>
                        {
                            winner &&
                            <Square>{winner}</Square>
                        }                        
                    </header>
                    <footer>
                        <button onClick={resetGame}>Empezar de nuevo</button>
                    </footer>
                </div>
            </section>
        )
    }
    </div>
    )
}


{/*      <div className="board">
        <div className="row1">
            <div className="boxes" onClick={(e) => {toggle(e,0)}}></div>
            <div className="boxes" onClick={(e) => {toggle(e,1)}}></div>
            <div className="boxes" onClick={(e) => {toggle(e,2)}}></div>
        </div>
        <div className="row2">
            <div className="boxes" onClick={(e) => {toggle(e,3)}}></div>
            <div className="boxes" onClick={(e) => {toggle(e,4)}}></div>
            <div className="boxes" onClick={(e) => {toggle(e,5)}}></div>
        </div>
        <div className="row3">
            <div className="boxes" onClick={(e) => {toggle(e,6)}}></div>
            <div className="boxes" onClick={(e) => {toggle(e,7)}}></div>
            <div className="boxes" onClick={(e) => {toggle(e,8)}}></div>
        </div>
     </div> */}