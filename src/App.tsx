import { useState } from "react";
import NameInput from "./components/NameInput";
import Game from "./components/Game";
import "./App.css";

const App = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");

  const handleStartGame = (name1, name2) => {
    setPlayer1(name1.toUpperCase());
    setPlayer2(name2.toUpperCase());
    setGameStarted(true);
  };

  return (
    <div className="App">
      {!gameStarted ? (
        <NameInput onStartGame={handleStartGame} />
      ) : (
        <Game player1={player1} player2={player2} />
      )}
    </div>
  );
};

export default App;
