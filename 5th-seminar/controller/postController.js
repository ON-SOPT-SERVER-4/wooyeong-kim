const util = require("../modules/util");
const responseMessage = require("../modules/responseMessage");
const statusCode = require("../modules/statusCode");
const { User, Post, Like } = require("../models");

module.exports = {
  createPost: async (req, res) => {
    // 여기선 validation 생략, 간단하게 진행
    const { title, contents, userId } = req.body;
    try {
      const user = await User.findOne({ where: { id: userId } });
      const post = await Post.create({
        title,
        contents,
      });
      await user.addPost(post);
      return res
        .status(statusCode.OK)
        .send(
          util.success(
            statusCode.OK,
            responseMessage.CREATE_POST_SUCCESS,
            post,
          ),
        );
    } catch (error) {
      console.log(error);
      return res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .send(
          util.fail(
            statusCode.INTERNAL_SERVER_ERROR,
            responseMessage.INTERNAL_SERVER_ERROR,
          ),
        );
    }
  },
  readAllPosts: async (req, res) => {
    try {
      const posts = await Post.findAll({
        include: [
          {
            model: User,
            attributes: ["userName", "email"],
          },
          {
            model: User,
            as: "Liker",
            attributes: { exclude: ["password", "salt"] },
          },
        ],
      });
      return res
        .status(statusCode.OK)
        .send(
          util.success(
            statusCode.OK,
            responseMessage.READ_POST_ALL_SUCCESS,
            posts,
          ),
        );
    } catch (error) {
      console.log(error);
      return res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .send(
          util.fail(
            statusCode.INTERNAL_SERVER_ERROR,
            responseMessage.INTERNAL_SERVER_ERROR,
          ),
        );
    }
  },
  createLike: async (req, res) => {
    const PostId = req.params.postId;
    const UserId = req.body.userId;

    try {
      const like = await Like.create({ UserId, PostId });
      return res
        .status(statusCode.OK)
        .send(
          util.success(
            statusCode.OK,
            responseMessage.CREATE_LIKE_SUCCESS,
            posts,
          ),
        );
    } catch (error) {
      console.log(error);
      return res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .send(
          util.fail(
            statusCode.INTERNAL_SERVER_ERROR,
            responseMessage.INTERNAL_SERVER_ERROR,
          ),
        );
    }
  },
};
