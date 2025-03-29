import { useState } from "react";

const NameInput = ({ onStartGame }) => {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");

  const handleNameChange = (e) => {
    const { name, value } = e.target;
    if (name === "player1") {
      setPlayer1(value);
    } else if (name === "player2") {
      setPlayer2(value);
    }
  };

  const handleStartGame = () => {
    if (player1 && player2) {
      onStartGame(player1, player2);
    } else {
      alert("Please enter names for both players");
    }
  };

  return (
    <div className="game">
      <h1>Enter Player Names</h1>
      <br />
      <input
        type="text"
        name="player1"
        placeholder="Enter Player 1 Name (X)"
        value={player1}
        onChange={handleNameChange}
      />
      <input
        type="text"
        name="player2"
        placeholder="Enter Player 2 Name (O)"
        value={player2}
        onChange={handleNameChange}
      />
      <button className="reset-button" onClick={handleStartGame}>
        Start Game
      </button>
    </div>
  );
};

export default NameInput;
