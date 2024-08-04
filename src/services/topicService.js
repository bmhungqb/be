import db from "../models/index";

const getListTopic = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      let listTopic = await db.Topic.findAll({ raw: true }).catch((err) => {
        console.log(err);
        resolve({
          errCode: 2,
          message: "Error in BE!",
          error: err,
        });
      });
      resolve({
        errCode: 0,
        message: "Get list topic successfully!",
        listTopic: listTopic,
      });
    } catch (error) {
      reject({
        errCode: 3,
        message: "Get list topic unsuccessfully!",
        error: error,
      });
    }
  });
};

const capitalizeFirstLetter = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();

const normalizeString = (string) => string.trim().toLowerCase();

const mergeObjects = (arr) => {
  let map = new Map();

  arr.forEach((obj) => {
    let topicEn = normalizeString(obj.nameEn);
    let topicVn = normalizeString(obj.nameVi);

    if (map.has(topicEn)) {
      let existingObj = map.get(topicEn);
      existingObj.nameVi = capitalizeFirstLetter(topicVn);
    } else {
      map.set(topicEn, {
        nameEn: capitalizeFirstLetter(topicEn),
        nameVi: capitalizeFirstLetter(topicVn),
      });
    }
  });

  return Array.from(map.values());
};

const removeDuplicates = (arr1, arr2) => {
  return arr1.filter(
    (obj1) =>
      !arr2.some(
        (obj2) => obj1.nameEn === obj2.nameEn && obj1.nameVi === obj2.nameVi
      )
  );
};

const createTopic = async (listTopic) => {
  return new Promise(async (resolve, reject) => {
    try {
      // //check before add topic:
      // const uniqueListTopic = Array.from(
      //   new Set(listTopic.map((item) => JSON.stringify(item)))
      // ).map((item) => JSON.parse(item));

      // // Kiểm tra có phần tử bị lặp trong mảng truyền vào
      // if (listTopic.length !== uniqueListTopic.length) {
      //   return resolve({
      //     errCode: 4,
      //     message: "Create list topic unsuccessfully!",
      //     error: "There are duplicate elements in the input list topic.",
      //   });
      // }

      let currentListTopic = await db.Topic.findAll({
        raw: true,
        attributes: ["nameEn", "nameVi"],
      });

      // const set1 = new Set(listTopic.map((item) => JSON.stringify(item)));
      // const set2 = new Set(
      //   currentListTopic.map((item) => JSON.stringify(item))
      // );

      // // Kiểm tra xem có phần tử nào trong set1 tồn tại trong set2
      // const hasDuplicates = [...set1].some((item) => set2.has(item));

      // if (hasDuplicates) {
      //   return resolve({
      //     errCode: 5,
      //     message: "Create list topic unsuccessfully!",
      //     error:
      //       "There are duplicate elements between input list topic and current list topic.",
      //   });
      // }

      let normalizeTopics = mergeObjects(listTopic);

      let removeDuplicateTopics = removeDuplicates(
        normalizeTopics,
        currentListTopic
      );

      if (removeDuplicateTopics.length > 0) {
        await db.Topic.bulkCreate(removeDuplicateTopics, {}).catch((err) => {
          console.log(err);
        });
      }

      return resolve({
        errCode: 0,
        message: "Create list topic successfully!",
      });
    } catch (error) {
      reject({
        errCode: 2,
        message: "Create topic unsuccessfully!",
        error: error,
      });
    }
  });
};

const deleteTopic = async (topicId) => {
  return new Promise(async (resolve, reject) => {
    try {
      //? delete the word of topic
      await db.Word.destroy({
        where: {
          topicId: topicId,
        },
      }).catch((err) => {
        return resolve({
          errCode: 2,
          message: "Delete word of topic unsuccessfully!",
        });
      });

      //? delete the topic
      await db.Topic.destroy({
        where: {
          id: topicId,
        },
      }).catch((err) => {
        console.log(err);
        return resolve({
          errCode: 3,
          message: "Delete topic unsuccessfully!",
        });
      });

      return resolve({
        errCode: 0,
        message: `Delete topic ${topicId} successfully!`,
      });
    } catch (error) {
      console.log(error);
      return reject({
        errCode: 3,
        message: "Delete topic unsuccessfully!",
        error: error,
      });
    }
  });
};

const updateTopic = async (topicId, nameEn, nameVi) => {
  return new Promise(async (resolve, reject) => {
    try {
      //? update role
      await db.Topic.update(
        {
          nameEn,
          nameVi,
        },
        {
          where: {
            id: topicId,
          },
        }
      ).catch((err) => {
        console.log(err);
        resolve({
          errCode: 0,
          message: `Update topic ${topicId} unsuccessfully!`,
        });
      });
      resolve({
        errCode: 0,
        message: `Update topic ${topicId} successfully!`,
      });
    } catch (error) {
      reject({
        errCode: 3,
        message: `Update topic ${topicId} unsuccessfully!`,
        error: error,
      });
    }
  });
};

module.exports = {
  getListTopic,
  createTopic,
  deleteTopic,
  updateTopic,
};
