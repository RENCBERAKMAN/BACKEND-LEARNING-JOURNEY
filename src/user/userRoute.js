const express = require("express");
const router = express.Router();
const {
  createUser,
  getUserList,
  updateUser,
  deleteUser
} = require("./userController");

router.post("/", createUser);
router.get("/", getUserList);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;