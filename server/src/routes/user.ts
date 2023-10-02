import express from "express";
import {
  forgotPasswordCtrl,
  getAllUsersCtrl,
  getUserByIdCtrl,
  loginUserCtrl,
  registerUserCtrl,
  resetPasswordCtrl,
} from "../controllers/user";
const router = express.Router();

router.route("/register").post(registerUserCtrl);
router.route("/login").post(loginUserCtrl);
router.route("/forgot-password").post(forgotPasswordCtrl);
router.route("/reset-password").put(resetPasswordCtrl);
router.route("/:id").get(getUserByIdCtrl);
router.route("/").get(getAllUsersCtrl);

export default router;
