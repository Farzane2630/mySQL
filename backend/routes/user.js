import { Router } from "express";
import { createUser, getUsers, login } from "../db.js";
import jwt from "jsonwebtoken";

const router = Router();

export const signUpUser = () =>
  router.post("/users", async (req, res) => {
    const { name, email, password } = req.body;

    const createNewUser = await createUser({ name, email, password });

    res
      .status(201)
      .send({ message: "user is created successfully", user: createNewUser });
  });

export const getAllUsers = () =>
  router.get("/users", async (req, res) => {
    const users = await getUsers();

    res.status(201).send(users);
  });

export const loginUser = () =>
  router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const response = await login({ email, password });

      res.status(200).send({
        message: "Login successful",
        user: response.user,
        token: response.token
      });
    } catch (error) {
      res.status(401).send({ message: "Login failed", error: error.message });
    }
  });
