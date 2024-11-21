import { Router } from "express";
import {
  getUsersList,
  loginUser,
  signUpNewUser,
} from "../controller/usersController.js";

const router = Router();

router.post("/", signUpNewUser);

router.get("/", getUsersList);

router.post("/login", loginUser);

export default router;
