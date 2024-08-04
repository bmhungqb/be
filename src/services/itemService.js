import db from "../models/index";

const getListItem = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      let listItem = await db.Item.findAll({ raw: true }).catch((err) => {
        console.log(err);
        resolve({
          errCode: 2,
          message: "Error in BE!",
          error: err,
        });
      });
      resolve({
        errCode: 0,
        message: "Get list item successfully!",
        listItem: listItem,
      });
    } catch (error) {
      reject({
        errCode: 3,
        message: "Get list item unsuccessfully!",
        error: error,
      });
    }
  });
};
const createItem = async (listItem) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Item.bulkCreate(listItem)
        .catch((err) => {
          console.log(err);
        })
        .catch((err) => console.log(err));

      resolve({
        errCode: 0,
        message: "Create listItem successfully!",
      });
    } catch (error) {
      reject({
        errCode: 2,
        message: "Create listItem unsuccessfully!",
        error: error,
      });
    }
  });
};

const deleteItem = async (listId) => {
  return new Promise(async (resolve, reject) => {
    try {
      //? delete the word of topic
      await db.Item.destroy({
        where: {
          id: listId,
        },
      }).catch((err) => {
        return resolve({
          errCode: 2,
          message: "Delete list item unsuccessfully!",
        });
      });

      return resolve({
        errCode: 0,
        message: `Delete item id: ${listId} successfully!`,
      });
    } catch (error) {
      console.log(error);
      return reject({
        errCode: 3,
        message: "Delete list item unsuccessfully!",
        error: error,
      });
    }
  });
};

const updateItem = async (itemId, itemName) => {
  return new Promise(async (resolve, reject) => {
    try {
      //? update role
      await db.Item.update(
        {
          name: itemName,
        },
        {
          where: {
            id: itemId,
          },
        }
      ).catch((err) => {
        console.log(err);
        resolve({
          errCode: 0,
          message: `Update item unsuccessfully!`,
        });
      });
      resolve({
        errCode: 0,
        message: `Update item ${itemId} successfully!`,
      });
    } catch (error) {
      reject({
        errCode: 3,
        message: `Update school ${itemId} unsuccessfully!`,
        error: error,
      });
    }
  });
};

module.exports = {
  getListItem,
  createItem,
  deleteItem,
  updateItem,
};
