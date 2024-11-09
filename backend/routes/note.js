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

export const getAllNotes = () =>
  router.get("/notes", authenticateToken, async (req, res) => {
    const user_id = req.user.user_id;
    const notes = await getNotes(user_id);

    res.status(201).send(notes);
  });

export const getOneNote = () =>
  router.get("/notes/:id", async (req, res) => {
    const id = req.params.id;
    const note = await getNote(id);
    res.status(201).send(note[0]);

    console.log(note);
  });

export const addNewNote = () =>
  router.post("/notes", authenticateToken, async (req, res) => {
    const user_id = req.user.user_id;
    const { title, content, category } = req.body;
    const newNote = await createNote({ title, content, category, user_id });
    res.status(201).send({ message: "Note created", note: newNote });
  });

export const deleteOneNote = () =>
  router.delete("/notes/:id", authenticateToken, async (req, res) => {
    const user_id = req.user.user_id;
    const id = req.params.id;
    const note = await deleteNote({ id, user_id });
    res.status(201).send(note);
  });

export const updateOneNote = () =>
  router.put("/notes/:id", authenticateToken, async (req, res) => {
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
