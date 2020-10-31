const express = require("express");
const router = express.Router();

router.get("/popular", (req, res) => {
  res.status(200).send("인기순");
});

router.get("/bestreply", (req, res) => {
  res.status(200).send("댓글 순");
});

router.get("/age", (req, res) => {
  res.status(200).send("나이별");
});

module.exports = router;
