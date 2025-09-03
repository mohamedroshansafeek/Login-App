const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
const port = process.env.PORT || 5000;
// app.listen(port, () => console.log(`Server running on port ${port}`));
// app.use(cors({
//   origin:  [ "http://localhost:5173" ],
//   methods: [ "GET","POST","PUT","DELETE" ],
//   credentials: true
// }));
app.use(express.json());

const SECRET_KEY = "supersecret"; // move to env in production
let users = []; // In-memory storage (replace with DB later)

// ✅ Root route for testing backend
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// ✅ Signup route
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = users.find((u) => u.email === email);
  if (userExists) {
    return res.status(400).json({ error: "User already exists!" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { name, email, password: hashedPassword };
  users.push(newUser);

  res.json({ message: "Signup successful!" });
});

// ✅ Login route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email);
  if (!user) {
    return res.status(400).json({ error: "User not found!" });
  }

  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) {
    return res.status(400).json({ error: "Invalid password!" });
  }

  const token = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: "1h" });
  res.json({ message: "Login successful!", token });
});

app.listen(port, () => console.log(`✅ Backend running on port ${port}`));
