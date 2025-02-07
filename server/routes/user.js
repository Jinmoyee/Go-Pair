import express from "express";
import {
  loginUser,
  registerUser,
  // verifyUser,
} from "../controllers/user.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = express.Router();

router.post("/user/register", registerUser);
// router.post("/user/verify", verifyUser);
router.post("/user/login", loginUser);
// router.post("/logout", logoutUser);

export default router;
