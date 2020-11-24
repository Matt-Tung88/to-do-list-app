const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
// const path = require("path");

const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


app.use(express.json());

// const ObjectId = require("mongoose").Types.ObjectId;

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model("User", userSchema);


const todoSchema = new mongoose.Schema({
  userId: mongoose.Schema.ObjectId,
  todos: [{ checked: Boolean, text: String, id: String }],
});

const Todos = mongoose.model("Todos", todoSchema);

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
    message: "success",
  });
});



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

const db = mongoose.connection;
mongoose.connect( process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});



db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log(`MongoDB running on ${port}!`);
});

if (process.env.NODE_ENV === "production") {
  //   app.use(express.static(path.join(__dirname, "../build")));
  app.use(express.static("client/build"));
}

app.listen(port, () => console.log(`Your app is running on https://to-do-list-app-mt.herokuapp.com/ on port: ${port}!`));
