const util = require("../modules/util");
const responseMessage = require("../modules/responseMessage");
const statusCode = require("../modules/statusCode");
let membersDB = require("../modules/members");

module.exports = {
  createUser: (req, res) => {
    const { name, part, age } = req.body;

    if (!name || !part || !age) {
      console.log("필요한 값이 없습니다!");
      return res
        .status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }
    const idx = membersDB[membersDB.length - 1].idx + 1;
    membersDB.push({
      idx,
      name,
      part,
      age,
    });
    return res
      .status(statusCode.OK)
      .send(
        util.success(
          statusCode.OK,
          responseMessage.MEMBER_CREATE_SUCCESS,
          membersDB,
        ),
      );
  },

  getAllUsers: (req, res) => {
    const members = membersDB;
    return res
      .status(statusCode.OK)
      .send(
        util.success(
          statusCode.OK,
          responseMessage.MEMBER_READ_ALL_SUCCESS,
          members,
        ),
      );
  },

  getOneUser: (req, res) => {
    const {
      params: { idx },
    } = req;
    if (!idx) {
      console.log("필요한 값이 없습니다");
      return res
        .status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }

    const member = membersDB.find((member) => member.idx == idx);

    if (member === undefined) {
      console.log("idx가 유효하지 않습니다");
      return res
        .status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER));
    }
    return res
      .status(statusCode.OK)
      .send(
        util.success(
          statusCode.OKk,
          responseMessage.MEMBER_READ_SUCCESS,
          member,
        ),
      );
  },

  deleteUser: (req, res) => {
    const {
      params: { idx },
    } = req;
    if (!idx) {
      console.log("필요한 값이 없습니다");
      return res
        .status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }
    const member = membersDB.filter((member) => member.idx == idx);

    if (member.length === 0) {
      console.log("idx가 유효하지 않습니다");
      return res
        .status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER));
    }
    membersDB = membersDB.filter((member) => member.idx != idx);
    return res
      .status(statusCode.OK)
      .send(
        util.success(
          statusCode.OK,
          responseMessage.MEMBER_DELETE_SUCCESS,
          membersDB,
        ),
      );
  },

  updateUser: (req, res) => {
    const {
      params: { idx },
    } = req;
    const {
      body: { name, part, age },
    } = req;

    if (!idx) {
      console.log("필요한 값이 없습니다!");
      return res
        .status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }
    if (!name || !part || !age) {
      console.log("필요한 값이 없습니다!");
      return res
        .status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }
    const memberIdx = membersDB.findIndex((member) => member.idx == idx);
    if (memberIdx === -1) {
      console.log("idx가 유효하지 않습니다.");
      return res
        .status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER));
    }
    membersDB[memberIdx] = {
      idx: +idx,
      name,
      part,
      age,
    };
    return res
      .status(statusCode.OK)
      .send(
        util.success(
          statusCode.OK,
          responseMessage.MEMBER_UPDATE_SUCCESS,
          membersDB,
        ),
      );
  },
};
