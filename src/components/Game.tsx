import { useState, useEffect } from "react";

const Game = ({ player1, player2 }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [stats, setStats] = useState({
    player1Wins: 0,
    player2Wins: 0,
    ties: 0,
  });

  useEffect(() => {
    if (player1 && player2) {
      sessionStorage.setItem("player1", player1);
      sessionStorage.setItem("player2", player2);
    }
  }, [player1, player2]);

  useEffect(() => {
    const updatedStats = {
      player1,
      player2,
      player1Wins: stats.player1Wins,
      player2Wins: stats.player2Wins,
      ties: stats.ties,
    };

    fetch("http://localhost:5000/update-score", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedStats),
    })
      .then((response) => response.json())
      .then((data) => console.log("Data saved:", data))
      .catch((error) => console.error("Error:", error));
  }, [stats, player1, player2]);

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
    checkWinner(newBoard);
  };

  const checkWinner = (board) => {
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
    for (let line of lines) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        updateStats(board[a]);
        return;
      }
    }
    if (!board.includes(null)) {
      setWinner("Tie");
      setStats((prevStats) => ({ ...prevStats, ties: prevStats.ties + 1 }));
    }
  };

  const updateStats = (winner) => {
    if (winner === "X") {
      setStats((prevStats) => ({
        ...prevStats,
        player1Wins: prevStats.player1Wins + 1,
      }));
    } else if (winner === "O") {
      setStats((prevStats) => ({
        ...prevStats,
        player2Wins: prevStats.player2Wins + 1,
      }));
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  return (
    <div className="game">
      <h1 className="title">Tic Tac Toe</h1>
      <div className="player-info">
        <p>
          {player1} (X) : {stats.player1Wins} Wins
        </p>
        <p>
          {player2} (O) : {stats.player2Wins} Wins
        </p>
        <p>Ties: {stats.ties}</p>
      </div>
      {winner && (
        <div className="winner-message">
          {winner === "Tie"
            ? "It's a Tie!"
            : `${winner === "X" ? player1 : player2} Wins!`}
        </div>
      )}

      <div className="board">
        {board.map((_, index) => (
          <button
            key={index}
            className={`square ${board[index]}`}
            onClick={() => handleClick(index)}
          >
            {board[index]}
          </button>
        ))}
      </div>

      <button className="reset-button" onClick={resetGame}>
        Start New Game
      </button>
    </div>
  );
};

export default Game;
