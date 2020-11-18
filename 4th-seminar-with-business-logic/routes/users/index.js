const express = require("express");
const router = express.Router();

const userController = require("../../controller/userController");

// 회원가입
router.post("/signup", userController.signup);

// 로그인
router.post("/signin", userController.signin);

// 전체 유저 조회
router.get("/", userController.getAllUsers);

// 특정 아이디로 유저 조회
router.get("/:id", userController.getOneUser);

// 유저 정보 수정
router.put("/:id", userController.updateUser);

// 유저 삭제
router.delete("/:id", userController.deleteUser);

module.exports = router;
