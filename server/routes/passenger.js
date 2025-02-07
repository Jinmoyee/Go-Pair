import express from "express";
import {
    loginPassenger,
    registerPassenger,
} from "../controllers/passenger.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = express.Router();

router.post("/passenger/register", registerPassenger);
router.post("/passenger/login", loginPassenger);

export default router;
