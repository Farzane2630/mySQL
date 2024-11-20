import express from "express";
import cors from "cors";
import users from "./routes/user.js";
import notes from "./routes/note.js";
import errorHandler from "./middleware/error.js";
import notFound from "./middleware/notFound.js";

const port = process.env.PORT || 8080;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/notes", notes);
app.use("/api/users", users);

// Handle Errors
app.use(notFound)
app.use(errorHandler);

app.listen(port, () => console.log(`server is running on port ${port}`));
