import db from "../models/index";
import { createTopic } from "./topicService";

const getListWord = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      let listWord = await db.Word.findAll({ raw: true }).catch((err) => {
        console.log(err);
        resolve({
          errCode: 2,
          message: "Error in BE!",
          error: err,
        });
      });
      resolve({
        errCode: 0,
        message: "Get list word successfully!",
        listWord: listWord,
      });
    } catch (error) {
      reject({
        errCode: 3,
        message: "Get list word unsuccessfully!",
        error: error,
      });
    }
  });
};

const normalizeString = (string) =>
  string.trim().toLowerCase().replace(/\s+/g, "");

const compareStrings = (str1, str2) => {
  return normalizeString(str1) === normalizeString(str2);
};

const createWord = async (listWord) => {
  return new Promise(async (resolve, reject) => {
    try {
      //! Tạo topic
      let listTopic = listWord.map((word) => {
        return {
          nameEn: word.nameEn,
          nameVi: word.nameVi,
        };
      });

      await createTopic(listTopic);

      //! Lấy danh sách list topic sau khi được thêm
      let currentListTopic = await db.Topic.findAll({
        raw: true,
        attributes: ["id", "nameEn", "nameVi"],
      });

      //! Insert từ vựng

      let listWordNormalize = listWord.map((item) => {
        let result = currentListTopic.find(
          (topic) =>
            compareStrings(topic.nameEn, item.nameEn) &&
            compareStrings(topic.nameVi, item.nameVi)
        );

        return {
          ...item,
          topicId: result.id,
        };
      });

      await db.Word.bulkCreate(listWordNormalize).catch((err) => {
        console.log(err);
      });

      resolve({
        errCode: 0,
        message: "Create listWord successfully!",
      });
    } catch (error) {
      resolve({
        errCode: 2,
        message: "Create listWord unsuccessfully!",
        error: error,
      });
    }
  });
};

const deleteWord = async (listId) => {
  return new Promise(async (resolve, reject) => {
    try {
      //? delete the word of topic
      await db.Word.destroy({
        where: {
          id: listId,
        },
      }).catch((err) => {
        return resolve({
          errCode: 2,
          message: "Delete list word unsuccessfully!",
        });
      });

      return resolve({
        errCode: 0,
        message: `Delete word id: ${listId} successfully!`,
      });
    } catch (error) {
      console.log(error);
      return reject({
        errCode: 3,
        message: "Delete list word unsuccessfully!",
        error: error,
      });
    }
  });
};

const updateWord = async (
  wordId,
  levelVocab,
  vocab,
  topicId,
  phonetic,
  vietnamese,
  example
) => {
  return new Promise(async (resolve, reject) => {
    try {
      //? update role
      await db.Word.update(
        {
          levelVocab,
          vocab,
          topicId,
          phonetic,
          vietnamese,
          example,
        },
        {
          where: {
            id: wordId,
          },
        }
      ).catch((err) => {
        console.log(err);
        resolve({
          errCode: 0,
          message: `Update word unsuccessfully!`,
        });
      });
      resolve({
        errCode: 0,
        message: `Update word ${wordId} successfully!`,
      });
    } catch (error) {
      reject({
        errCode: 3,
        message: `Update word ${wordId} unsuccessfully!`,
        error: error,
      });
    }
  });
};

module.exports = {
  getListWord,
  createWord,
  deleteWord,
  updateWord,
};
