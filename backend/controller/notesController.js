import {
  createNote,
  deleteNote,
  getNote,
  getNotes,
  updateNote,
} from "../db.js";

// @desc    get notes list
// route    GET - /api/notes
export const readNotes = async (req, res) => {
  const user_id = req.user.user_id;
  const notes = await getNotes(user_id);

  res.status(201).send(notes);
};

// @desc    get a single note
// route    GET - /api/notes/:id
export const readNote = async (req, res, next) => {
   const user_id = req.user.user_id;
  const id = req.params.id;
  const note = await getNote({id, user_id});
  console.log(note);
  
  if (note.length == 0) {
    const error = new Error(`note with id ${id} does not exist!`);
    error.status = 404;
    return next(error);
  }
  res.status(201).send(note[0]);
};

// @desc    create a new note
// route    POST - /api/notes
export const createNewNote = async (req, res, next) => {
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
};

// @desc    delete a single note
// route    DELETE - /api/notes/:id
export const deleteOneNote = async (req, res, next) => {
  const user_id = req.user.user_id;
  const id = req.params.id;
  const note = await deleteNote({ id, user_id });

  if (!note.success) {
    const error = new Error(note.message);
    error.status = 404;
    return next(error);
  }
  res.status(201).json({ msg: note.message });
};

// @desc    update a single note
// route    PUT - /api/notes/:id
export const updateOneNote = async (req, res, next) => {
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
  res.status(201).json({ msg: result.message });
};
