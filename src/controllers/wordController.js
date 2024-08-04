import {
  getListWord,
  createWord,
  deleteWord,
  updateWord,
} from "../services/wordService";

const getAllWord = async (req, res) => {
  let response = await getListWord();
  return res.status(200).json(response);
};
const postCreateWord = async (req, res) => {
  const { listWord } = req.body;
  if (!listWord) {
    return res.status(500).json({
      message: "Missing input parameters",
      errCode: 1,
    });
  }
  let response = await createWord(listWord);
  return res.status(200).json(response);
};
const postDeleteWord = async (req, res) => {
  const { listId } = req.body;
  if (!listId) {
    return res.status(500).json({
      message: "Missing input parameters",
      errCode: 1,
    });
  }
  let response = await deleteWord(listId);
  return res.status(200).json(response);
};
const postUpdateWord = async (req, res) => {
  const { wordId, levelVocab, vocab, topicId, phonetic, vietnamese, example } =
    req.body;
  if (!wordId) {
    return res.status(500).json({
      message: "Missing input parameters",
      errCode: 1,
    });
  }
  let response = await updateWord(
    wordId,
    levelVocab,
    vocab,
    topicId,
    phonetic,
    vietnamese,
    example
  );
  return res.status(200).json(response);
};
module.exports = {
  getAllWord,
  postCreateWord,
  postDeleteWord,
  postUpdateWord,
};
