import express from "express";
import {
  getAllUsersCtrl,
  getUserByIdCtrl,
  loginUserCtrl,
  registerUserCtrl,
} from "../controllers/user";
const router = express.Router();

router.route("/register").post(registerUserCtrl);
router.route("/login").post(loginUserCtrl);
router.route("/:id").get(getUserByIdCtrl);
router.route("/").get(getAllUsersCtrl);

export default router;
