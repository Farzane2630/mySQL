import mysql from "mysql2";
import jwt from "jsonwebtoken";

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: "root",
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    connectTimeout: 20000,
  })
  .promise();

export async function createNote({ title, content, category, user_id }) {
  const [result] = await pool.query(
    "INSERT INTO notes (title, content, category, user_id) VALUES (? , ?, ?, ?) ",
    [title, content, category, user_id]
  );
  return result;
}

// pool.query(`ALTER TABLE notes  IF NOT EXISTS
// ADD user_id INT,
// ADD FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
// `);
export async function getNotes(user_id) {
  const [notes] = await pool.query("SELECT * FROM notes WHERE user_id = ?", [
    user_id,
  ]);
  return notes;
}
export async function getNote(id) {
  const [note] = await pool.query("SELECT * FROM notes WHERE id = ?", id);
  return note;
}
export async function deleteNote({ id, user_id }) {
  const [result] = await pool.query(
    "DELETE FROM notes WHERE id = ? AND user_id =? ",
    [id,
    user_id]
  );
  if (result.affectedRows > 0) {
    return { success: true, message: "Note deleted successfully" };
  } else {
    return { success: false, message: "No matching note found" };
  }
}

export async function updateNote({ user_id, id, title, content, category }) {
  const [result] = await pool.query(
    "UPDATE notes SET title = ?, content = ?, category = ? WHERE user_id = ? AND id = ?",
    [title, content, category, user_id, id]
  );
  if (result.affectedRows > 0) {
    return { success: true, message: "Note updated successfully" };
  } else {
    return { success: false, message: "No matching note found" };
  }

  
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

    const token = jwt.sign(
      { user_id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  } catch (error) {
    throw new Error("An error occurred during login");
  }
}

export async function deleteUser(id) {
  const [result] = await pool.query("DELETE FROM users WHERE id=?", [id]);

  return result;
}
