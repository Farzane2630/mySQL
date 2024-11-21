import { createUser, getUsers, login } from "../db.js";

// @desc    sign up new user
// route    POST - /api/users
export const signUpNewUser = async (req, res, next) => {
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
};

// @desc    login user
// route    POST - /api/users/login
export const loginUser = async (req, res) => {
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
};

// @desc    get users list
// route    GET - /api/users
export const getUsersList = async (req, res) => {
  const users = await getUsers();

  res.status(201).send(users);
}
