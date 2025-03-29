import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import cors from "cors"

const app = express();
const PORT = 5000;

const filePath = path.join(import.meta.dirname, 'game-scores.json');

app.use(cors())
app.use(express.json());

app.post('/update-score', async (req, res) => {
  try {
    const { player1, player2, player1Wins, player2Wins, ties } = req.body;

    if (!player1 || !player2 || player1Wins === undefined || player2Wins === undefined || ties === undefined) {
      return res.status(400).json({ message: 'Invalid data received' });
    }

    const scoreData = {
      player1,
      player2,
      player1Wins,
      player2Wins,
      ties,
    };

    await fs.writeFile(filePath, JSON.stringify(scoreData, null, 2));

    res.status(200).json({ message: 'Score data saved successfully' });
  } catch (err) {
    console.error('Error saving score data:', err);
    res.status(500).json({ message: 'Error saving score data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
