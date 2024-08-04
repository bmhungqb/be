import {
  getLeaderboardByGame,
  getLeaderboardAllGame,
  getRandomWords,
  saveGame,
} from "../services/gameService";

const getGameLeaderboard = async (req, res) => {
  let levelId = req.body.levelId;
  if (!levelId) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing input parameter !",
    });
  }
  let leaderboad = await getLeaderboardByGame(levelId);
  return res.status(200).json(leaderboad);
};

const getAllGameLeaderboard = async (req, res) => {
  let leaderboad = await getLeaderboardAllGame();
  return res.status(200).json(leaderboad);
};

const postNewGame = async (req, res) => {
  const { levelId, probabilities = [0.4, 0.4, 0.2], numWords = 10 } = req.body;
  let sumP = probabilities.reduce((sum, p) => sum + p, 0);
  sumP = Math.round(sumP * 1e10) / 1e10
  let maxP = Math.max(...probabilities);
  let minP = Math.min(...probabilities);

  if (sumP != 1) {
    return res.status(200).json({
      errCode: 99,
      message: "Sum of probabilities must equal 1!",
    });
  }
  if (minP < 0 || maxP > 1) {
    return res.status(200).json({
      errCode: 999,
      message: "Probabilities must be in range [0, 1]!",
    });
  }

  if (!levelId) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing input parameters",
    });
  }
  let response = await getRandomWords(levelId, probabilities, numWords);
  return res.status(200).json(response);
};

const postSaveGame = async (req, res) => {
  const { levelId, studentId, score, items, time } = req.body;
  if (!levelId || !studentId || !score || !items || !time) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing input parameters",
    });
  }
  let response = await saveGame(levelId, studentId, score, items, time);
  return res.status(200).json(response);
};

const testApi = async (req, res) => {
  return res.status(200).json({
    errCode: 0,
    message: "Test api successfully!",
  });
};

export {
  getGameLeaderboard,
  getAllGameLeaderboard,
  postNewGame,
  postSaveGame,
  testApi,
};
