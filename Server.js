const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const path = require("path");

const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// app.use(express.static(path.join(__dirname, "../build")));

// app.get('*', function (req, res) {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
//   });

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// const ObjectId = require("mongoose").Types.ObjectId;

app.use(express.json());

app.post("/reigster", async (req, res) => {
  const { username, password } = req.body;
  //   const user = new User({username, password});
  const user = await User.findOne({ username }).exec();
  if (user) {
    res.status(500);
    res.send("user already exists");
    return;
  }
  await User.create({ username, password });
  res.json({
    // username,
    // password,
    message: "success",
  });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  //   const user = new User({username, password});
  const user = await User.findOne({ username }).exec();
  if (!user || user.password !== password) {
    res.status(403);
    res.send("invalid login");
    return;
  }
  await User.create({ username, password });
  res.json({
    // username,
    // password,
    message: "success",
  });
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

app.post("/todo", async (req, res) => {
  const { authorization } = req.headers;
  const [, token] = authorization.split(" ");
  const [username, password] = token.split(":");
  const todosItems = req.body;
  const user = await User.findOne({ username }).exec();
  if (!user || user.password !== password) {
    res.status(403);
    res.send("invalid login");
    return;
  }
  const todos = await Todos.findOne({ userId: user._id }).exec();
  if (!todos) {
    await Todos.create({
      userId: user._id,
      todos: [],
    });
  } else {
    todos.todos = todosItems;
    await todos.save();
  }
  res.json(todosItems);
});

const db = mongoose.connection;
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const todoSchema = new mongoose.Schema({
  userId: mongoose.Schema.ObjectId,
  todos: [{ checked: Boolean, text: String }],
});

const Todos = mongoose.model("Todos", todoSchema);

app.get("/todo", async (req, res) => {
  const { authorization } = req.headers;
  const [, token] = authorization.split(" ");
  const [username, password] = token.split(":");
  const user = await User.findOne({ username }).exec();
  if (!user || user.password !== password) {
    res.status(403);
    res.send("invalid login");
    return;
  }
  const { todos } = await Todos.findOne({ userId: user._id }).exec();
  res.json(todos);
});


db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log(`Example app listening on port ${port}!`);
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../build")));
}

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
