import {
  getListSchool,
  createSchool,
  deleteSchool,
  updateSchool,
} from "../services/schoolService";

const getAllSchool = async (req, res) => {
  let response = await getListSchool();
  return res.status(200).json(response);
};
const postCreateSchool = async (req, res) => {
  const { listSchool } = req.body;
  if (!listSchool) {
    return res.status(500).json({
      message: "Missing input parameters",
      errCode: 1,
    });
  }
  let response = await createSchool(listSchool);
  return res.status(200).json(response);
};
const postDeleteSchool = async (req, res) => {
  const { listId } = req.body;
  if (!listId) {
    return res.status(500).json({
      message: "Missing input parameters",
      errCode: 1,
    });
  }
  let response = await deleteSchool(listId);
  return res.status(200).json(response);
};
const postUpdateSchool = async (req, res) => {
  const { schoolId, schoolName } = req.body;
  if (!schoolId || !schoolName) {
    return res.status(500).json({
      message: "Missing input parameters",
      errCode: 1,
    });
  }
  let response = await updateSchool(schoolId, schoolName);
  return res.status(200).json(response);
};
module.exports = {
  getAllSchool,
  postCreateSchool,
  postDeleteSchool,
  postUpdateSchool,
};
