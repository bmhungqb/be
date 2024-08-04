import {
  getListTopic,
  createTopic,
  deleteTopic,
  updateTopic,
} from "../services/topicService";

const getAllTopic = async (req, res) => {
  let response = await getListTopic();
  return res.status(200).json(response);
};
const postCreateTopic = async (req, res) => {
  const { listTopic } = req.body;
  if (!listTopic) {
    return res.status(500).json({
      message: "Missing input parameters",
      errCode: 1,
    });
  }
  let response = await createTopic(listTopic);
  return res.status(200).json(response);
};
const postDeleteTopic = async (req, res) => {
  const { topicId } = req.body;
  if (!topicId) {
    return res.status(500).json({
      message: "Missing input parameters",
      errCode: 1,
    });
  }
  let response = await deleteTopic(topicId);
  return res.status(200).json(response);
};
const postUpdateTopic = async (req, res) => {
  const { topicId, nameEn, nameVi } = req.body;
  if (!topicId || !(nameEn || nameVi)) {
    return res.status(500).json({
      message: "Missing input parameters",
      errCode: 1,
    });
  }
  let response = await updateTopic(topicId, nameEn, nameVi);
  return res.status(200).json(response);
};
module.exports = {
  getAllTopic,
  postCreateTopic,
  postDeleteTopic,
  postUpdateTopic,
};
