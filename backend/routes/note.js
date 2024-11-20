import { Router } from "express";
import {
  createNote,
  deleteNote,
  getNote,
  getNotes,
  updateNote,
} from "../db.js";
import authenticateToken from "../auth.js";

const router = Router();

router.get("/", authenticateToken, async (req, res) => {
  const user_id = req.user.user_id;
  const notes = await getNotes(user_id);

  res.status(201).send(notes);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const note = await getNote(id);
  res.status(201).send(note[0]);

  console.log(note);
});

router.post("/", authenticateToken, async (req, res) => {
  const user_id = req.user.user_id;
  const { title, content, category } = req.body;
  const newNote = await createNote({ title, content, category, user_id });
  res.status(201).send({ message: "Note created", note: newNote });
});

router.delete("/:id", authenticateToken, async (req, res) => {
  const user_id = req.user.user_id;
  const id = req.params.id;
  const note = await deleteNote({ id, user_id });
  res.status(201).send(note);
});

router.put("/:id", authenticateToken, async (req, res) => {
  const user_id = req.user.user_id;
  const id = req.params.id;
  const { title, content, category } = req.body;

  try {
    const result = await updateNote({
      id,
      title,
      content,
      category,
      user_id,
    });
    if (result.affectedRows > 0) {
      res.status(200).send({ message: "Note updated successfully", result });
    } else {
      res.status(404).send({ message: "Note not found" });
    }
  } catch (error) {
    res.status(500).send({ message: "Error updating note", error });
  }
});

export default router;
