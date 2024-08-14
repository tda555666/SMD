require("dotenv").config();


const mongoose = require("mongoose");

// MongoDB Connection
mongoose
  .connect(
    "mongodb+srv://danielmatuko19809:adee1LPGfhaUN8xS@cluster0.akgpyuc.mongodb.net/TooDooList?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));


const User = require("./modules/user");

const express = require("express");
const cors = require("cors");
const app = express();

const port = process.env.PORT || 3055;

// Middleware

app.use(express.json());

app.use(cors({ origin: "http://localhost:5173" }));

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// User Registration Route
app.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Username or Email already exists" });
    }

    const user = new User({ username, email, password });
    await user.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
