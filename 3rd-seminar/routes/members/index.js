const express = require("express");
const userRouter = express.Router();
const userController = require("../../controllers/userController");

// Create user
userRouter.post("/", userController.getAllUsers);

// Get all users
userRouter.get("/", userController.getAllUsers);

// Get user
userRouter.get("/:idx", userController.getOneUser);

// Delete user
userRouter.delete("/:idx", userController.deleteUser);

/** idx값으로 특정 멤버 정보 수정 */
userRouter.put("/:idx", userController.updateUser);

module.exports = userRouter;
