import { Router } from "express";
import authenticateToken from "../auth.js";
import { createNewNote, deleteOneNote, readNote, readNotes, updateOneNote } from "../controller/notesController.js";

const router = Router();

router.get("/", authenticateToken, readNotes)

// !!! issue: unauth users access notes/:is  !!!
router.get("/:id", readNote);

router.post("/", authenticateToken, createNewNote);

router.delete("/:id", authenticateToken, deleteOneNote);

router.put("/:id", authenticateToken, updateOneNote);

export default router;
