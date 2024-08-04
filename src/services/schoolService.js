import db from "../models/index";

const getListSchool = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      let listSchool = await db.School.findAll({ raw: true }).catch((err) => {
        console.log(err);
        resolve({
          errCode: 2,
          message: "Error in BE!",
          error: err,
        });
      });
      resolve({
        errCode: 0,
        message: "Get list school successfully!",
        listSchool: listSchool,
      });
    } catch (error) {
      reject({
        errCode: 3,
        message: "Get list school unsuccessfully!",
        error: error,
      });
    }
  });
};
const createSchool = async (listSchool) => {
  return new Promise(async (resolve, reject) => {
    try {
      db.School.bulkCreate(listSchool)
        .catch((err) => {
          console.log(err);
        })
        .catch((err) => console.log(err));

      resolve({
        errCode: 0,
        message: "Create listSchool successfully!",
      });
    } catch (error) {
      reject({
        errCode: 2,
        message: "Create listSchool unsuccessfully!",
        error: error,
      });
    }
  });
};

const deleteSchool = async (listId) => {
  return new Promise(async (resolve, reject) => {
    try {
      //? delete the word of topic
      await db.School.destroy({
        where: {
          id: listId,
        },
      }).catch((err) => {
        return resolve({
          errCode: 2,
          message: "Delete list school unsuccessfully!",
        });
      });

      return resolve({
        errCode: 0,
        message: `Delete school id: ${listId} successfully!`,
      });
    } catch (error) {
      console.log(error);
      return reject({
        errCode: 3,
        message: "Delete list school unsuccessfully!",
        error: error,
      });
    }
  });
};

const updateSchool = async (schoolId, schoolName) => {
  return new Promise(async (resolve, reject) => {
    try {
      //? update role
      await db.School.update(
        {
          name: schoolName,
        },
        {
          where: {
            id: schoolId,
          },
        }
      ).catch((err) => {
        console.log(err);
        resolve({
          errCode: 0,
          message: `Update school unsuccessfully!`,
        });
      });
      resolve({
        errCode: 0,
        message: `Update school ${schoolId} successfully!`,
      });
    } catch (error) {
      reject({
        errCode: 3,
        message: `Update school ${schoolId} unsuccessfully!`,
        error: error,
      });
    }
  });
};

module.exports = {
  getListSchool,
  createSchool,
  deleteSchool,
  updateSchool,
};
