import {
  getListLevel,
  createLevel,
  deleteLevel,
  updateLevel,
  addTopicLevel,
  deleteTopicLevel,
  currentLevel,
} from "../services/levelService";

const getAllLevel = async (req, res) => {
  let response = await getListLevel();
  return res.status(200).json(response);
};
const postCreateLevel = async (req, res) => {
  const { listLevel } = req.body;
  if (!listLevel) {
    return res.status(500).json({
      message: "Missing input parameters",
      errCode: 1,
    });
  }
  let response = await createLevel(listLevel);
  return res.status(200).json(response);
};
const postDeleteLevel = async (req, res) => {
  const { listId } = req.body;
  if (!listId) {
    return res.status(500).json({
      message: "Missing input parameters",
      errCode: 1,
    });
  }
  let response = await deleteLevel(listId);
  return res.status(200).json(response);
};

const postUpdateLevel = async (req, res) => {
  const { levelId, levelName } = req.body;
  if (!levelId || !levelName) {
    return res.status(500).json({
      message: "Missing input parameters",
      errCode: 1,
    });
  }
  let response = await updateLevel(levelId, levelName);
  return res.status(200).json(response);
};

const postAddTopicLevel = async (req, res) => {
  const { levelId, listTopicId } = req.body;
  if (!levelId || !listTopicId) {
    return res.status(500).json({
      message: "Missing input parameters",
      errCode: 1,
    });
  }
  let response = await addTopicLevel(levelId, listTopicId);
  return res.status(200).json(response);
};

const postDeleteTopicLevel = async (req, res) => {
  const { levelId, listTopicId } = req.body;
  if (!levelId || !listTopicId) {
    return res.status(500).json({
      message: "Missing input parameters",
      errCode: 1,
    });
  }
  let response = await deleteTopicLevel(levelId, listTopicId);
  return res.status(200).json(response);
};

const getCurrentLevel = async (req, res) => {
  const studentid = req.body.studentid;
  if (!studentid) {
    return res.status(500).json({
      message: "Missing input parameters",
      errCode: 1,
    });
  }
  let response = await currentLevel(studentid);
  return res.status(200).json(response);
};

module.exports = {
  getAllLevel,
  postCreateLevel,
  postUpdateLevel,
  postDeleteLevel,
  postAddTopicLevel,
  postDeleteTopicLevel,
  getCurrentLevel,
};
