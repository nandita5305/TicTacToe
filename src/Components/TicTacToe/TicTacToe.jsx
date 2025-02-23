import React, { useState, useRef } from 'react';
import './TicTacToe.css';
import circle_icon from '../Assets/circle.png';
import cross_icon from '../Assets/cross.png';

const TicTacToe = () => {
    const [count, setCount] = useState(0);
    const [lock, setLock] = useState(false);
    const [xWins, setXWins] = useState(0);
    const [oWins, setOWins] = useState(0);
    const [data, setData] = useState(Array(9).fill(""));
    const [winningLine, setWinningLine] = useState([]); // Track winning boxes for animation
    const [winningDirection, setWinningDirection] = useState(""); // Track winning direction (row1, row2, row3, column1, column2, column3, diagonal-1, diagonal-2)
    const titleRef = useRef(null);

    const toggle = (e, num) => {
        if (lock || data[num] !== "") return;

        const newData = [...data];
        newData[num] = count % 2 === 0 ? "x" : "o";
        setData(newData);
        setCount(count + 1);
        checkWin(newData);
    };

    const checkWin = (data) => {
        const winPatterns = [
            { pattern: [0, 1, 2], direction: "row1" },    // Top row
            { pattern: [3, 4, 5], direction: "row2" },    // Middle row
            { pattern: [6, 7, 8], direction: "row3" },    // Bottom row
            { pattern: [0, 3, 6], direction: "column1" }, // Left column
            { pattern: [1, 4, 7], direction: "column2" }, // Middle column
            { pattern: [2, 5, 8], direction: "column3" }, // Right column
            { pattern: [0, 4, 8], direction: "diagonal-1" }, // Diagonal (top-left to bottom-right)
            { pattern: [2, 4, 6], direction: "diagonal-2" }  // Diagonal (top-right to bottom-left)
        ];

        for (let { pattern, direction } of winPatterns) {
            const [a, b, c] = pattern;
            if (data[a] && data[a] === data[b] && data[a] === data[c]) {
                setWinningLine(pattern); // Set the winning line for animation
                setWinningDirection(direction); // Set the winning direction
                won(data[a]);
                return;
            }
        }

        // Check for draw
        if (count === 8) {
            setLock(true);
            titleRef.current.innerHTML = "It's a Draw!";
        }
    };

    const won = (winner) => {
        setLock(true);
        titleRef.current.innerHTML = `Congratulations: <img src='${winner === "x" ? cross_icon : circle_icon}' alt='Winner' /> Wins`;

        // Update the win counters
        if (winner === 'x') {
            setXWins(xWins + 1);
        } else {
            setOWins(oWins + 1);
        }
    };

    const reset = () => {
        setLock(false);
        setData(Array(9).fill(""));
        setCount(0);
        setWinningLine([]); // Reset winning line
        setWinningDirection(""); // Reset winning direction
        titleRef.current.innerHTML = 'Tic Tac Toe Game In <span>React</span>';
    };

    return (
        <div className='container'>
            <div className="win-counter">
                X = {xWins} | O = {oWins}
            </div>
            <h1 className='title' ref={titleRef}>Tic Tac Toe Game In <span>React</span></h1>
            <div className="board">
                {data.map((value, index) => (
                    <div
                        key={index}
                        className="boxes"
                        onClick={(e) => toggle(e, index)}
                    >
                        {value === "x" && <img src={cross_icon} alt="X" />}
                        {value === "o" && <img src={circle_icon} alt="O" />}
                    </div>
                ))}
                {/* Winning Line Overlay */}
                {winningLine.length > 0 && (
                    <div className={`winning-line ${winningDirection}`}></div>
                )}
            </div>
            <button className="reset" onClick={reset}>Reset</button>
        </div>
    );
};

export default TicTacToe;