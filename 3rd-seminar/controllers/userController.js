const encrypt = require("../modules/encrypt");
const responseMessage = require("../modules/responseMessage");
const statusCode = require("../modules/statusCode");
const updateUsersDB = require("../modules/updateUsersDB");
const usersDB = require("../modules/users");
const util = require("../modules/util");

module.exports = {
  signup: async (req, res) => {
    const { id, password } = req.body;

    if (!id || !password) {
      return res
        .status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }
    const users = usersDB;
    const user = users.filter((user) => user.id === id);
    if (user.length !== 0) {
      return res
        .status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, responseMessage.ALREADY_ID));
    }
    try {
      const { encryptedPassword, salt } = await encrypt(password);
      users.push({ id, password: encryptedPassword, salt });
      updateUsersDB(users);
      res
        .status(statusCode.OK)
        .send(util.success(statusCode.OK, responseMessage.SIGN_UP_SUCCESS, id));
    } catch (error) {
      console.log(error);
      res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .send(
          util.fail(
            statusCode.INTERNAL_SERVER_ERROR,
            responseMessage.INTERNAL_SERVER_ERROR,
          ),
        );
    }
  },

  signin: async (req, res) => {
    const { id, password } = req.body;

    if (!id || !password) {
      return res
        .status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }
    const users = usersDB;
    const user = users.filter((user) => user.id === id)[0];
    if (!user) {
      return res
        .status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER));
    }
    try {
      const saltToCheck = user.salt;
      const { encryptedPassword: passwordToCheck } = await encrypt(
        password,
        saltToCheck,
      );
      if (passwordToCheck === user.password) {
        return res
          .status(statusCode.OK)
          .send(util.success(statusCode.OK, responseMessage.SIGN_IN_SUCCESS));
      } else {
        return res
          .status(statusCode.UNAUTHORIZED)
          .send(
            util.fail(statusCode.UNAUTHORIZED, responseMessage.MISS_MATCH_PW),
          );
      }
    } catch (error) {
      console.log(error);
      res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .send(
          util.fail(
            statusCode.INTERNAL_SERVER_ERROR,
            responseMessage.INTERNAL_SERVER_ERROR,
            id,
          ),
        );
    }
  },

  getAllUsers: (req, res) => {
    const users = usersDB;
    res
      .status(statusCode.OK)
      .send(
        util.success(
          statusCode.OK,
          responseMessage.MEMBER_READ_ALL_SUCCESS,
          users,
        ),
      );
  },
};
