import express from "express";
import authMiddleware from "../middleware/auth";
const router = express.Router();
import {
  ContinueBardChatCtrl,
  GetAllChatsCtrl,
  GetSingleBardChatCtrl,
  NewBardChatCtrl,
} from "../controllers/bard";

router
  .route("/:bardId")
  .get(authMiddleware, GetSingleBardChatCtrl)
  .put(authMiddleware, ContinueBardChatCtrl);
router.route("/create-chat").post(authMiddleware, NewBardChatCtrl);
router.route("/").get(authMiddleware, GetAllChatsCtrl);
export default router;
