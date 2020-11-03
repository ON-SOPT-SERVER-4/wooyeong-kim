const express = require("express");
const memberRouter = express.Router();
const memberController = require("../../controllers/memberController");

// Create member
memberRouter.post("/", memberController.getAllMembers);

// Get all members
memberRouter.get("/", memberController.getAllMembers);

// Get member
memberRouter.get("/:idx", memberController.getOneMember);

// Delete member
memberRouter.delete("/:idx", memberController.deleteMember);

/** idx값으로 특정 멤버 정보 수정 */
memberRouter.put("/:idx", memberController.updateMember);

module.exports = memberRouter;
