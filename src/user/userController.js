const User = require("../models/User");

const getUserList = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      data: users
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
      error: err.message
    });
  }
};

const createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json({
      success: true,
      data: savedUser
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "User creation failed",
      error: err.message
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json({
      success: true,
      data: updatedUser
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "User update failed",
      error: err.message
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "User deleted successfully"
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "User deletion failed",
      error: err.message
    });
  }
};

module.exports = {
  getUserList,
  createUser,
  updateUser,
  deleteUser
};