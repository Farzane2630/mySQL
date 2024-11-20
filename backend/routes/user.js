import { Router } from "express";
import { createUser, getUsers, login } from "../db.js";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/", async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    const error = new Error("invalid input");
    error.status = 400;
    return next(error);
  }
  const createNewUser = await createUser({ name, email, password });
  res
    .status(201)
    .send({ message: "user is created successfully", user: createNewUser });
});

router.get("/", async (req, res) => {
  const users = await getUsers();

  res.status(201).send(users);
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const response = await login({ email, password });

    res.status(200).send({
      message: "Login successful",
      user: response.user,
      token: response.token,
    });
  } catch (error) {
    res.status(401).send({ message: "Login failed", error: error.message });
  }
});

export default router;
