import React from 'react'
import Board from './Board'
import { useState } from 'react'


export default function Game(){

    const initialState = {
        squares: Array(9).fill(null),
        player2IsNext: true
    }

    const [state, setState] = useState(initialState);

    function handleClick(i){
        const squares = state.squares.slice()
        if(squares[i] || winnerFunction(squares) || draw){
            return;
        }
        squares[i] = state.player2IsNext ? 'X' : 'O'
        setState({
            squares: squares,
            player2IsNext: !state.player2IsNext
        });
    }
    
    function newGame(){
        setState(initialState)
    }

        let winner = winnerFunction(state.squares);
        let draw = checkDraw(state.squares);
        let status;

        if(draw){
            status = 'Draw';
        }
        if(winner){
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (state.player2IsNext ? 'X' : 'O');
        }

        return (
            <div className="container">
                <div className="game-info">
                    {winner && (
                        <>
                        <button onClick={() => newGame()}>New Game</button>
                        </>
                    )}
                    {draw && (
                        <>
                        <h4>Its a draw!</h4>
                        <button onClick={() => newGame()}>New Game</button>
                        </>
                    )}
                    <div>{status}</div>
                </div>
                <div className="game">
                    <Board 
                    squares={state.squares} 
                    onClick={(i) => handleClick(i)} />
                </div>
            </div>
        )


        
}

function winnerFunction(squares){
    const legalLines = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];
    for(let i = 0; i<legalLines.length; i++){
        const [x,y,z] = legalLines[i];
        if(squares[x] && squares[x] === squares[y] && squares[x] === squares[z]){
            return squares[x];
        }
    }
    return null;
}

function checkDraw(squares){
    let temp = []
    for(let i = 0; i<squares.length; i++){
        if(squares[i] !== null){
            temp.push(squares[i]);
        }
    }
    if(temp.length == squares.length){
        return true;
    }
    return false;
}
