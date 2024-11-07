import mysql from "mysql2";

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: "root",
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    connectTimeout: 20000,
  })
  .promise();

export async function createNote({ title, content, category }) {
  const [result] = await pool.query(
    "INSERT INTO notes (title, content, category) VALUES (? , ?, ?) ",
    [title, content, category]
  );
  return result;
}

export async function getNotes() {
  const [notes] = await pool.query("SELECT * FROM notes");
  return notes;
}
export async function getNote(id) {
  const [note] = await pool.query("SELECT * FROM notes WHERE id = ?", id);
  return note;
}
export async function deleteNote(id) {
  const [note] = await pool.query("DELETE FROM notes WHERE id = ?", id);
  return note;
}

export async function updateNote({ id, title, content, category }) {
  const [note] = await pool.query(
    "UPDATE notes SET title = ?, content = ?, category = ? WHERE id = ? ",
    [title, content, category, id]
  );

  return note;
}

// users table

pool.query(`CREATE TABLE IF NOT EXISTS users (
   id INT AUTO_INCREMENT PRIMARY KEY,
   name VARCHAR(255),
   email VARCHAR(255) NOT NULL,
   password VARCHAR(255) NOT NULL
  )`);

export async function createUser({ name, email, password }) {
  const [newUser] = await pool.query(
    "INSERT INTO users (name, email, password) VALUES (?,?,?)",
    [name, email, password]
  );
  return newUser;
}

export async function getUsers() {
  const [users] = await pool.query("SELECT * FROM users");
  return users;
}

export async function login({ email, password }) {
  try {
    const [users] = await pool.query("SELECT * FROM users WHERE email = ? ", [
      email,
    ]);

    if (users.length === 0) {
      throw new Error("User not found!");
    }

    const user = users[0];

    if (password != user.password) {
      throw new Error("Invalid credentials");
    }

    return {
      email: user.email,
      name: user.name,
    };
  } catch (error) {
    throw new Error("An error occurred during login");
  }
}
