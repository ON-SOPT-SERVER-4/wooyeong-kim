const express = require("express");
const crypto = require("crypto");
const router = express.Router();
const util = require("../../modules/util");
const responseMessage = require("../../modules/responseMessage");
const statusCode = require("../../modules/statusCode");
const { User } = require("../../models");

// 회원가입
router.post("/signup", async (req, res) => {
  const { email, password, userName } = req.body;

  if (!email || !password || !userName) {
    console.log("필요한 값이 없습니다!");
    return res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
  }

  try {
    const alreadyEmail = await User.findOne({
      where: {
        email,
      },
    });

    if (alreadyEmail) {
      console.log("이미 존재하는 이름입니다");
      return res
        .status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, responseMessage.ALREADY_ID));
    }
    const salt = crypto.randomBytes(64).toString("base64");

    const hashedPassword = crypto
      .pbkdf2Sync(password, salt, 10000, 64, "sha512")
      .toString("base64");

    const user = await User.create({
      email,
      password: hashedPassword,
      userName,
      salt,
    });

    console.log(user);

    return res.status(statusCode.OK).send(
      util.success(statusCode.OK, responseMessage.SIGN_UP_SUCCESS, {
        id: user.id,
        email,
        userName,
      }),
    );
  } catch (error) {
    console.log(error);
    return res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(
        util.fail(
          statusCode.INTERNAL_SERVER_ERROR,
          responseMessage.SIGN_UP_FAIL,
        ),
      );
  }
});

// 로그인
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    console.log("필요한 값이 없습니다!");
    return res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
  }

  try {
    const alreadyEmail = await User.findOne({
      where: {
        email,
      },
    });
    console.log(alreadyEmail);

    if (!alreadyEmail) {
      console.log("없는 이메일입니다.");
      return res
        .status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER));
    }

    const { id, userName, salt, password: hashedPassword } = alreadyEmail;
    const inputPassword = crypto
      .pbkdf2Sync(password, salt, 10000, 64, "sha512")
      .toString("base64");

    if (inputPassword !== hashedPassword) {
      console.log("비밀번호가 일치하지 않습니다.");
      return res
        .status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.OK, responseMessage.MISS_MATCH_PW));
    }

    return res.status(statusCode.OK).send(
      util.success(statusCode.OK, responseMessage.SIGN_IN_SUCCESS, {
        id,
        email,
        userName,
      }),
    );
  } catch (error) {
    console.log(error);
    return res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(
        util.fail(
          statusCode.INTERNAL_SERVER_ERROR,
          responseMessage.SIGN_IN_FAIL,
        ),
      );
  }
});

// 전체 유저 조회
router.get("/", async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "email", "userName"],
    });
    console.log(users);
    return res
      .status(statusCode.OK)
      .send(
        util.success(
          statusCode.OK,
          responseMessage.READ_USER_ALL_SUCCESS,
          users,
        ),
      );
  } catch (error) {
    console.log(error);
    return res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(
        util.fail(
          statusCode.INTERNAL_SERVER_ERROR,
          responseMessage.READ_USER_ALL_FAIL,
        ),
      );
  }
});

// 특정 아이디로 유저 조회
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findOne({
      where: {
        id,
      },
      attributes: ["id", "email", "userName"],
    });
    if (!user) {
      console.log("존재하지 않는 아이디입니다.");
      return res
        .status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER));
    }

    return res
      .status(statusCode.OK)
      .send(
        util.success(statusCode.OK, responseMessage.READ_USER_SUCCESS, user),
      );
  } catch (error) {
    console.log(error);
    return res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(
        util.fail(
          statusCode.INTERNAL_SERVER_ERROR,
          responseMessage.READ_USER_FAIL,
        ),
      );
  }
});

// 유저 정보 수정
router.put("/:id", async (req, res) => {
  const { email, userName, password } = req.body;
  const { id } = req.params;
  try {
    const salt = crypto.randomBytes(64).toString("base64");

    const hashedPassword = crypto
      .pbkdf2Sync(password, salt, 10000, 64, "sha512")
      .toString("base64");
    const updatedUser = await User.update(
      {
        email,
        password: hashedPassword,
        userName,
        salt,
      },
      {
        where: {
          id,
        },
      },
    );
    if (!updatedUser) {
      console.log("존재하지 않는 아이디입니다.");
      return res
        .status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER));
    }
    return res
      .status(statusCode.OK)
      .send(
        util.success(
          statusCode.OK,
          responseMessage.UPDATE_USER_SUCCESS,
          updatedUser,
        ),
      );
  } catch (error) {
    console.log(error);
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(
        util.fail(
          statusCode.INTERNAL_SERVER_ERROR,
          responseMessage.UPDATE_USER_FAIL,
        ),
      );
  }
});

// 유저 삭제
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      return res
        .status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER));
    }

    const deletedUser = await User.destroy({
      where: {
        id,
      },
      attributes: ["id", "email", "userName"],
    });
    return res
      .status(statusCode.OK)
      .send(
        util.success(
          statusCode.OK,
          responseMessage.DELETE_USER_SUCCESS,
          deletedUser,
        ),
      );
  } catch (error) {
    console.log(error);
    return res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(
        util.fail(
          statusCode.INTERNAL_SERVER_ERROR,
          responseMessage.DELETE_USER_FAIL,
        ),
      );
  }
});

module.exports = router;
