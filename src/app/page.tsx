"use client";

import { useState } from "react";

export default function Home() {
  const names = ["X", "O"];
  const [index, setIndex] = useState(0);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [winner, setWinner] = useState<string>();
  const [winningIndices, setWinningIndices] = useState<number[]>();
  const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function checkWinner(newBoard: string[]) {
    for (const pattern of winningPatterns) {
      const [a, b, c] = pattern;
      if (
        newBoard[a] &&
        newBoard[a] === newBoard[b] &&
        newBoard[a] === newBoard[c]
      ) {
        setWinner(newBoard[a]);
        setWinningIndices(pattern);
      }
    }
  }

  function handleClick(i: number) {
    if (board[i] || winner) return;

    const newBoard = [...board];
    newBoard[i] = names[index];

    setBoard(newBoard);
    checkWinner(newBoard);
    setIndex((prev) => (prev + 1) % names.length);
    console.log(`Button ${i} clicked, value: ${names[index]}`);
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <p className="text-[50px] font-bold">Tic Tac Toe</p>
      {winner ? (
        <p className="text-[30px] font-bold text-green-500">
          {winner} wins! 🎉
        </p>
      ) : (
        <p className="text-[24px]">
          Player <span className="text-[30px] font-bold">{names[index]}</span>{" "}
          turn
        </p>
      )}

      <div className="grid grid-cols-3 p-1">
        {board.map((value, i) => (
          <Button
            key={i}
            index={i}
            value={value}
            onClick={handleClick}
            isWinning={winningIndices?.includes(i)}
          />
        ))}
      </div>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => {
          setBoard(Array(9).fill(null));
          setWinner(undefined);
          setIndex(0);
          setWinningIndices(undefined);
        }}
      >
        Restart Game 🔄
      </button>
    </div>
  );
}

function Button(props: {
  index: number;
  value: string | null;
  isWinning: boolean | undefined;
  onClick: (i: number) => void;
}) {
  return (
    <button
      className={`bg-white w-20 h-20 text-6xl text-black rounded m-0.5 border-2 border-black 
      ${props.isWinning ? "bg-green-400" : props.value}`}
      onClick={() => props.onClick(props.index)}
    >
      {props.value}
    </button>
  );
}
