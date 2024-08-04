import db from "../models/index";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
let salt = bcrypt.genSaltSync(10);

let handleUserLogin = (phoneNumber, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let admin = await db.Admin.findOne({
        where: {
          username: phoneNumber,
        },
      });

      if (admin) {
        if (admin.password == password)
          return resolve({
            isAdmin: true,
          });
        else {
          return resolve({
            message: "Wrong password!",
            errCode: 2,
          });
        }
      }

      let student = await db.Student.findOne({
        where: { phoneNumber: phoneNumber },
        raw: true,
      });

      if (student) {
        let checkPassword = bcrypt.compareSync(password, student.password);

        if (!checkPassword) {
          return resolve({
            message: "Wrong password!",
            errCode: 2,
          });
        }
      } else {
        return resolve({
          message: "Phonenumber does not exist!",
          errCode: 1,
        });
      }
      return resolve({
        student: {
          "id": student.id,
          "name": student.name,
          "grade": student.grade,
          "birthday": student.birthday,
          "phoneNumber": student.phoneNumber,
          "schoolId": student.schoolId,
          "cup": student.cup,
          "AvatarId": student.AvatarId,
          "FrameId": student.FrameId
        },
        message: "Login sucessfully!",
        errCode: 0,
      });
    } catch (e) {
      return resolve({
        message: "Server bug!",
        errCode: 0,
      });
    }
  });
};

let handleUserSignUp = (
  name,
  schoolId,
  grade,
  birthday,
  phoneNumber,
  password
) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Check if phoneNumber already exists
      const existingUser = await db.Student.findOne({
        where: { phoneNumber: phoneNumber },
      });

      const existingAdmin = await db.Admin.findOne({
        where: { username: phoneNumber },
      });

      if (existingUser || existingAdmin) {
        return resolve({
          message: "Phone number already exists",
          errCode: "2",
        });
        //return res.status(400).json({ error: "Phone number already exists" });
      } else {
        let hashPassword = bcrypt.hashSync(password, salt);
        let id = uuidv4();

        const newUser = await db.Student.create({
          id: id,
          name: name,
          schoolId: schoolId,
          grade: grade,
          birthday: birthday,
          phoneNumber: phoneNumber,
          password: hashPassword,
          cup: 0,
          AvatarId: 0,
          FrameId: 0
        });

        // Send a success response
        //res.status(201).json(newUser);
        resolve({
          message: "Sign up sucessfully",
          errCode: "0",
        });
      }
      // Create a new user in the database
    } catch (error) {
      // Handle any errors
      console.error("Error signing up:", error);
      reject({
        message: "An error occurred while signing up",
        errCode: "1",
      });
    }
  });
};
let handleUserUpdateAvatar = (studentId, AvatarId, FrameId) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Student.update(
        {
          AvatarId: AvatarId,
          FrameId: FrameId
        },
        {
          where: {
            id: studentId,
          },
        }
      ).catch((err) => console.log(err));

      resolve({
        message: "Update student avatar & frame successfully",
        errCode: "0",
      });
    } catch (error) {
      console.log(error);
      // Handle any errors
      reject({
        message: "An error occurred while update avatar & frame",
        errCode: "4",
      });
    }
  })
}
let handleUserUpdate = (
  schoolId,
  grade,
  birthday,
  phoneNumber,
  oldPassword,
  newPassword,
  isForgotPassword,
  name
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const student = await db.Student.findOne({
        where: {
          phoneNumber: phoneNumber,
        },
      });

      if (!student) {
        resolve({
          message: "Student does not exist",
          errCode: "3",
        });
      } else {
        //update

        if (!isForgotPassword) {
          let checkPassword = bcrypt.compareSync(oldPassword, student.password);
          if (!checkPassword) {
            return resolve({
              message: "Wrong password",
              errCode: "4",
            });
          }
        }

        let hashNewPassword = bcrypt.hashSync(newPassword, salt);
        await db.Student.update(
          {
            schoolId,
            grade,
            birthday,
            password: hashNewPassword,
            name,
          },
          {
            where: {
              id: student.id,
            },
          }
        ).catch((err) => console.log(err));

        resolve({
          message: "Update student successfully",
          errCode: "0",
        });
      }
    } catch (error) {
      console.log(error);
      // Handle any errors
      reject({
        message: "An error occurred while signing up",
        errCode: "4",
      });
    }
  });
};

let getListStudent = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let listStudent = await db.Student.findAll(
        // { raw: true },
        {
          attributes: {
            exclude: ["password"],
          },
        }
      ).catch((err) => {
        console.log(err);
        resolve({
          errCode: 2,
          message: "Error in BE!",
          error: err,
        });
      });
      resolve({
        errCode: 0,
        message: "Get list users successfully!",
        listStudent: listStudent,
      });
    } catch (error) {
      reject({
        errCode: 3,
        message: "Get list users unsuccessfully!",
        error: error,
      });
    }
  });
};

let studentAchievement = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let query = `
        SELECT achievementId AS id, name
        FROM Achievement_Student 
        INNER JOIN Achievements
        ON Achievement_Student.achievementId = Achievements.id
        WHERE studentId = ?
      `;
      let listAchievement = await db.sequelize
        .query(query, {
          replacements: [id],
          type: db.sequelize.QueryTypes.SELECT,
        })
        .catch((err) => {
          console.log(err);
          resolve({
            errCode: 2,
            message: "Error in BE!",
            error: err,
          });
        });
      resolve({
        errCode: 0,
        message: "Get list achievement successfully!",
        listAchievement,
      });
    } catch (error) {
      reject({
        errCode: 3,
        message: "Get list achievement unsuccessfully!",
        error: error,
      });
    }
  });
};

let studentInfomation = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let student = await db.Student.findOne({
        where: {
          id,
        },
      }).catch((err) => {
        resolve({
          errCode: 2,
          message: "Error in BE!",
          error: err,
        });
      });

      if (!student) {
        return resolve({
          errCode: 6,
          message: "Student does not exist!",
        });
      }

      //? Get score of student
      let query = `
      SELECT studentId, SUM(score) AS score
      FROM Games
      WHERE studentId = ?
      GROUP BY studentId
      `;
      let studentGames = await db.sequelize.query(query, {
        type: db.sequelize.QueryTypes.SELECT,
        replacements: [id],
      });
      if (studentGames.length > 0) student.score = studentGames[0].score;
      else student.score = 0;
      resolve({
        errCode: 0,
        message: "Get student information successfully!",
        student,
      });
    } catch (error) {
      reject({
        errCode: 3,
        message: "Get student information unsuccessfully!",
        error: error,
      });
    }
  });
};

function removeCommonElements(arr1, arr2) {
  return arr1.filter((element) => !arr2.includes(element));
}

const studentCreateWord = (studentId, listWordId) => {
  return new Promise(async (resolve, reject) => {
    try {
      //! get current list word

      let currentListWord = await db.Student_Word.findAll({
        where: {
          studentId,
        },
        attributes: ["wordId"],
      }).then((result) => {
        return result.map((word) => word.wordId);
      });

      let filterListWord = removeCommonElements(listWordId, currentListWord);

      let listWord = filterListWord.map((wordId) => {
        return {
          studentId,
          wordId,
        };
      });

      await db.Student_Word.bulkCreate(listWord);
      resolve({
        errCode: 0,
        message: "Add list word successfully!",
      });
    } catch (error) {
      reject({
        errCode: 3,
        message: "Add list word unsuccessfully!",
        error: error,
      });
    }
  });
};
const studentDeleteWord = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Student_Word.destroy({ where: { id } });
      resolve({
        errCode: 0,
        message: "Delete word successfully!",
      });
    } catch (error) {
      reject({
        errCode: 3,
        message: "Delete word unsuccessfully!",
        error: error,
      });
    }
  });
};
const listStudentWord = (studentId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let listWordId = await db.Student_Word.findAll({
        where: {
          studentId,
        },
        attributes: ["wordId"],
      }).then((result) => {
        return result.map((word) => word.wordId);
      });

      let listWord = await db.Word.findAll({
        where: { id: listWordId },
      });

      resolve({
        errCode: 0,
        message: "Get list word successfully!",
        listWord,
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

export {
  handleUserLogin,
  handleUserSignUp,
  handleUserUpdate,
  handleUserUpdateAvatar,
  getListStudent,
  studentAchievement,
  studentInfomation,
  studentCreateWord,
  studentDeleteWord,
  listStudentWord,
};
