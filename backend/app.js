import express from "express";
import cors from "cors";
import { getAllUsers, loginUser, signUpUser } from "./routes/user.js";
import {
  addNewNote,
  deleteOneNote,
  getAllNotes,
  getOneNote,
  updateOneNote,
} from "./routes/note.js";

const app = express();

// app.use(
//   cors({
//     origin: "http://localhost:4200", //frontend's URL
//     methods: "GET,POST,PUT,DELETE",
//     credentials: true, // in case using cookies or authentication
//   })
// );

app.use(cors());
app.use(express.json());

app.use("/", signUpUser());
app.use("/", getAllUsers());
app.use("/", loginUser());

app.use("/", getAllNotes());
app.use("/", getOneNote());
app.use("/", addNewNote());
app.use("/", deleteOneNote());
app.use("/", updateOneNote());

app.listen(8080, () => console.log("server is running on port 8000"));
