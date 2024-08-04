import db from "../models/index";

import { unlockLevel } from "./levelService";

const getLeaderboardByGame = (levelId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await db.Game.findAll({
        where: {
          levelId: levelId,
        },
        include: {
          model: db.Student,
          attributes: ["name", "grade", "phonenumber"],
        },
        attributes: ["score", "updatedAt"],
        order: [["score", "DESC"]],
      });

      if (result.length > 0) {
        resolve({
          message: "Get learderboard successfully!",
          errCode: 0,
          leaderboard: result,
        });
      } else {
        resolve({
          message: "Level does not have any student passing!",
          errCode: 1,
          leaderboard: result,
        });
      }
    } catch (e) {
      reject({
        message: "Fail to get leaderboard!",
        errCode: 2,
        output: e,
      });
    }
  });
};

const getLeaderboardAllGame = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let query = `
          SELECT
              Students.id,
              Students.name AS Name,
              Schools.name AS School,
              Students.grade AS Grade,
              SUM(games.score) AS Score,
              DATE_FORMAT(MAX(games.LastTime), '%d/%m/%Y') AS LastTime,
              SUM(games.totalTime) AS TotalTime
          FROM
              Students
          INNER JOIN (
              WITH ranked_scores AS (
                  SELECT
                      studentId,
                      levelId,
                      score,
                      updatedAt,
                      TIMESTAMPDIFF(SECOND, createdAt, updatedAt) AS totalTime,
                      ROW_NUMBER() OVER (
                          PARTITION BY studentId, levelId
                          ORDER BY
                              score DESC,
                              TIMESTAMPDIFF(SECOND, createdAt, updatedAt) ASC
                      ) AS row_num
                  FROM
                      Games
              )
              SELECT
                  studentId,
                  levelId,
                  score,
                  totalTime,
                  updatedAt AS LastTime
              FROM
                  ranked_scores
              WHERE
                  row_num = 1
          ) AS games
          ON
              Students.id = games.studentId
          INNER JOIN Schools ON Students.schoolId = Schools.id
          GROUP BY
              Students.id,
              Students.name,
              Schools.name
          ORDER BY
              Score DESC
      `;


      const result = await db.sequelize.query(query, {
        type: db.sequelize.QueryTypes.SELECT,
      });

      if (result.length > 0) {
        resolve({
          message: "Get leaderboard successfully!",
          errCode: 0,
          leaderboard: result,
        });
      } else {
        resolve({
          message: "Leaderboard has no records!",
          errCode: 2,
          leaderboard: [],
        });
      }
    } catch (e) {
      console.log(e);
      reject({
        message: "Fail to get leaderboard!",
        errCode: 2,
        output: e,
      });
    }
  });
};

const getWordsByProbability = (words, probabilities, numWords) => {
  // Phân loại các từ theo mức độ khó
  const levels = {
    Easy: [],
    Medium: [],
    Hard: [],
  };

  words.forEach((word) => {
    if (levels[word.levelVocab]) {
      levels[word.levelVocab].push(word);
    }
  });

  // Tính số lượng từ cần lấy cho mỗi mức độ khó
  const easyCount = Math.floor(probabilities[0] * numWords);
  const mediumCount = Math.floor(probabilities[1] * numWords);
  const hardCount = Math.floor(probabilities[2] * numWords);

  let result = [];

  // Hàm để lấy từ từ mức độ khó cụ thể
  const getWords = (level, count) => {
    let selectedWords = [];
    while (count > 0) {
      if (levels[level].length > 0) {
        selectedWords.push(levels[level].shift());
        count--;
      } else {
        if (level === "Hard") {
          level = "Medium";
        } else if (level === "Medium") {
          level = "Easy";
        } else {
          break;
        }
      }
    }
    return selectedWords;
  };

  result = result.concat(getWords("Hard", hardCount));
  result = result.concat(getWords("Medium", mediumCount));
  result = result.concat(getWords("Easy", easyCount));

  // Kiểm tra nếu vẫn chưa đủ số lượng từ yêu cầu thì lấy thêm từ mức độ Beginner
  if (result.length < numWords) {
    result = result.concat(getWords("Easy", numWords - result.length));
  }
  if (result.length < numWords) {
    result = result.concat(getWords("Medium", numWords - result.length));
  }
  if (result.length < numWords) {
    result = result.concat(getWords("Hard", numWords - result.length));
  }

  return result;
};

const getRandomWords = (levelId, probabilities, numWords) => {
  return new Promise(async (resolve, reject) => {
    try {
      let listTopic = await db.Level_Topic.findAll({
        where: {
          levelId: levelId,
        },
        raw: true,
      }).then((levels) => {
        return levels.map((level) => level.topicId);
      });
      let listRandomWord = [];

      for (let topicId of listTopic) {
        let listWord = await db.Word.findAll({
          where: {
            topicId: topicId,
          },
          order: db.Sequelize.literal("rand()"),
        });

        listRandomWord = listRandomWord.concat(listWord);
      }
      let listRandomWordByProbability = getWordsByProbability(
        listRandomWord,
        probabilities,
        numWords
      );
      resolve({
        message: "Get list word successfully!",
        errCode: 0,
        listWord: listRandomWordByProbability,
      });
    } catch (error) {
      console.log(error);
      resolve(error);
    }
  });
};

const getAchievement = (cup) => {
  // nothing
  if (cup <= 0) return 0;
  // Khung xanh + hồng
  if (cup == 1) return 1;
  // Đồng
  if (cup == 2) return 2;
  // Bạc
  if (cup == 3) return 3;
  // Vàng
  if (cup >= 4 && cup < 6) return 4;
  //Kim cương
  if (cup >= 6) return 5;
};

let getAchievementsByListId = (listId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let listAchievement = await db.Achievement.findAll({
        where: { id: { [db.Sequelize.Op.in]: listId } },
        raw: true,
        attributes: ["id", "name"],
      });

      return resolve(listAchievement);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

let getItemsByListId = (listId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let listItem = await db.Item.findAll({
        where: { id: { [db.Sequelize.Op.in]: listId } },
        raw: true,
        attributes: ["id", "name"],
      });
      return resolve(listItem);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};
const saveListAchievement = (studentId, listId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const listStudentAchievement = listId.map((achievementId) => ({
        studentId,
        achievementId,
      }));

      await db.Achievement_Student.bulkCreate(listStudentAchievement).catch(
        (err) => {
          console.log(err);
        }
      );

      return resolve(1);
    } catch (error) {
      console.log(error);
      return resolve(0);
    }
  });
};

const saveGame = (levelId, studentId, score, items, time, minScore = 200) => {
  return new Promise(async (resolve, reject) => {
    try {
      //! Get items of student before adding new items
      let beforeItem = await currentItemsOfStudent(studentId);

      const endTime = new Date();
      const startTime = new Date(endTime.getTime() - time * 1000);

      //! Lưu record game
      let game = await db.Game.create({
        levelId: levelId,
        studentId: studentId,
        score: score,
        createdAt: startTime,
      }).catch((err) => {
        console.log(err);
      });
      //! Nếu điểm lớn hơn điểm tối thiểu thì unlock level
      let isPassLevel = true;
      if (score > minScore) {
        unlockLevel(levelId, studentId);

        //console.log("Vượt qua level");
      } else {
        isPassLevel = false;
        //console.log("Không vượt qua level");
      }

      //! Thêm student id vào
      items = items.map((element) => {
        return {
          ...element,
          studentId,
        };
      });

      //! Lưu số item kiếm được
      await db.Student_Item.bulkCreate(items).catch((err) => {
        console.log(err);
      });

      //! logic check if student's level up
      let afterItem = await currentItemsOfStudent(studentId);
      let gainedCup = 0;
      let listItemId = [];

      for (let i = 0; i < 6; i++) {
        let countBefore = parseInt(beforeItem[i].count) < 500;
        let countAfter = parseInt(afterItem[i].count) >= 500;
        if (countBefore && countAfter) {
          gainedCup++;
          listItemId.push(i + 1);
        }
      }

      //! Get items info that trigger getting new cup
      let listItemTriggerCup = await getItemsByListId(listItemId);

      let student = await db.Student.findOne({ where: { id: studentId } });
      let beforeCup = student.cup;
      let beforeAchievement = getAchievement(beforeCup);
      let afterAchievement = getAchievement(beforeCup + gainedCup);

      let listAchievementId = [];

      if (beforeAchievement != afterAchievement && afterAchievement >= 2) {
        for (let j = beforeAchievement; j < afterAchievement; j++) {
          listAchievementId.push(j + 1);
        }
      }
      await saveListAchievement(studentId, listAchievementId);
      let listAchievement = await getAchievementsByListId(
        listAchievementId
      ).catch((err) => {
        console.log(err);
      });

      if (gainedCup > 0) {
        await db.Student.increment(
          {
            cup: gainedCup,
          },
          {
            where: {
              id: studentId,
            },
          }
        );
      }
      // Logic get achievement

      resolve({
        message: "Create game successfully!",
        errCode: 0,
        game: game,
        isPassLevel,
        listAchievement,
        itemsGetCup: listItemTriggerCup,
      });
    } catch (error) {
      console.log("🚀 ~ returnnewPromise ~ error:", error);
      resolve({
        message: "Create game unsuccessfully!",
        errCode: 1,
      });
    }
  });
};

const currentItemsOfStudent = async (studentId) => {
  let query = `
        SELECT id, name, count
    FROM Items LEFT JOIN
        (SELECT itemId, SUM(quantity) AS "count" 
        FROM Student_Item
        WHERE studentId = ?
        GROUP BY itemId 
        ORDER BY itemId) AS COUNT_ITEM
    ON Items.id = COUNT_ITEM.itemId
  `;
  let currentItem = await db.sequelize.query(query, {
    replacements: [studentId],
    type: db.sequelize.QueryTypes.SELECT,
  });

  currentItem = currentItem.map((element) => {
    return {
      ...element,
      count: element.count || 0,
    };
  });

  return currentItem;
};

export {
  getLeaderboardByGame,
  getLeaderboardAllGame,
  getRandomWords,
  saveGame,
  currentItemsOfStudent,
};
