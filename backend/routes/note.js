import { Router } from "express";
import { createNote, deleteNote, getNote, getNotes, updateNote } from "../db.js";

const router = Router();

export const getAllNotes = () =>
  router.get("/notes", async (req, res) => {
    const notes = await getNotes();
    res.status(201).send(notes);

    console.log(notes);
  });

export const getOneNote = () =>
  router.get("/notes/:id", async (req, res) => {
    const id = req.params.id;
    const note = await getNote(id);
    res.status(201).send(note[0]);

    console.log(note);
  });

export const addNewNote = () =>
  router.post("/notes", async (req, res) => {
    const note = req.body;
    const newNote = await createNote(note);
    res.status(201).send(newNote);
  });

export const deleteOneNote = () =>
  router.delete("/notes/:id", async (req, res) => {
    const id = req.params.id;
    const note = await deleteNote(id);
    res.status(201).send(note);
  });

export const updateOneNote = () =>
  router.put("/notes/:id", async (req, res) => {
    const id = req.params.id;
    const { title, content, category } = req.body;
    
    try {
      const result = await updateNote({ id, title, content, category });
      if (result.affectedRows > 0) {
        res.status(200).send({ message: "Note updated successfully", result });
      } else {
        res.status(404).send({ message: "Note not found" });
      }
    } catch (error) {
      res.status(500).send({ message: "Error updating note", error });
    }
  });
