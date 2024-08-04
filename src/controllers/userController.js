import {
  handleUserLogin,
  handleUserSignUp,
  handleUserUpdate,
  handleUserUpdateAvatar,
  handleUserChangePassword,
  getListStudent,
  studentAchievement,
  studentInfomation,
  studentCreateWord,
  studentDeleteWord,
  listStudentWord,
} from "../services/userService";
// example login

let handleLogin = async (req, res) => {
  const { phoneNumber, password } = req.body;
  if (!phoneNumber || !password) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing input parameter !",
    });
  }
  let response = await handleUserLogin(phoneNumber, password);
  return res.status(200).json(response);
};

let handleSignUp = async (req, res) => {
  let { name, schoolId, grade, birthday, phoneNumber, password } = req.body;

  if (!phoneNumber || !password || !name || !schoolId || !grade || !birthday) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing input parameter !",
    });
  }
  let userData = await handleUserSignUp(
    name,
    schoolId,
    grade,
    birthday,
    phoneNumber,
    password
  );
  return res.status(200).json(userData);
};

let handleUpdateAvatar = async (req, res) => {
  const {
    studentId,
    AvatarId,
    FrameId
  } = req.body;
  if (studentId === null || AvatarId === null || FrameId === null) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing input parameter !",
    })
  }
  let response = await handleUserUpdateAvatar(
    studentId,
    AvatarId,
    FrameId
  );
  return res.status(200).json(response)
}

let handleUpdate = async (req, res) => {
  const {
    schoolId,
    grade,
    birthday,
    phoneNumber,
    oldPassword,
    newPassword,
    isForgotPassword,
    name,
  } = req.body;

  let response = await handleUserUpdate(
    schoolId,
    grade,
    birthday,
    phoneNumber,
    oldPassword,
    newPassword,
    isForgotPassword,
    name
  );
  return res.status(200).json(response);
};

let handleChangePassword = async (req, res) => {
  let changePasswordData = req.body;
  let userData = await handleUserChangePassword(changePasswordData);
  return res.status(200).json(userData);
};

let getAllStudent = async (req, res) => {
  let response = await getListStudent();
  return res.status(200).json(response);
};

let getStudentAchievement = async (req, res) => {
  const id = req.body.id;
  if (!id) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing input parameter !",
    });
  }
  let response = await studentAchievement(id);
  return res.status(200).json(response);
};

let getStudentInfomation = async (req, res) => {
  const id = req.body.id;
  if (!id) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing input parameter !",
    });
  }
  let response = await studentInfomation(id);
  return res.status(200).json(response);
};

const postStudentCreateWord = async (req, res) => {
  const { studentId, listWordId } = req.body;
  if (!studentId || !listWordId) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing input parameter !",
    });
  }
  let response = await studentCreateWord(studentId, listWordId).catch((err) =>
    console.log(err)
  );
  return res.status(200).json(response);
};
const postStudentDeleteWord = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing input parameter !",
    });
  }
  let response = await studentDeleteWord(id).catch((err) => console.log(err));
  return res.status(200).json(response);
};
const getAllStudentWord = async (req, res) => {
  const { studentId } = req.body;
  if (!studentId) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing input parameter !",
    });
  }
  let response = await listStudentWord(studentId).catch((err) =>
    console.log(err)
  );
  return res.status(200).json(response);
};

export {
  handleLogin,
  handleSignUp,
  handleUpdate,
  handleUpdateAvatar,
  handleChangePassword,
  getAllStudent,
  getStudentAchievement,
  getStudentInfomation,
  postStudentCreateWord,
  postStudentDeleteWord,
  getAllStudentWord,
};
