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

// !!! issue: unauth users access notes/:is  !!!
router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  const note = await getNote(id);
  if (note.length == 0) {
    const error = new Error(`note with id ${id} does not exist!`);
    error.status = 404;
    return next(error);
  }
  res.status(201).send(note[0]);
});

router.post("/", authenticateToken, async (req, res, next) => {
  const user_id = req.user.user_id;
  const { title, content, category } = req.body;
  const newNote = await createNote({ title, content, category, user_id });

  if (!title || !content || !category) {
    const error = new Error("invalid input.");
    // check error status codes in document !!!!!!!
    error.status = 403;
    return next(error);
  }
  res.status(201).send({ message: "Note created", note: newNote });
});

router.delete("/:id", authenticateToken, async (req, res, next) => {
  const user_id = req.user.user_id;
  const id = req.params.id;
  const note = await deleteNote({ id, user_id });

  if (!note.success) {
    const error = new Error(note.message);
    error.status = 404;
    return next(error);
  }
  res.status(201).json({ msg: note.message });
});

router.put("/:id", authenticateToken, async (req, res, next) => {
  const user_id = req.user.user_id;
  const id = req.params.id;
  const { title, content, category } = req.body;
  const newNote = { id, title, content, category, user_id };

  const result = await updateNote(newNote);
  
  if (!result.success) {
    const error = new Error(result.message);
    error.status = 404;
    return next(error);
  }
  res.status(201).json({msg: result.message});
});

export default router;
