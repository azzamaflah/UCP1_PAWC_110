const express = require("express");
const todosRoutes = require("./routes/tododb.js");
const app = express();
require("dotenv").config();
const port = process.env.PORT;
app.use(express.json());

const db = require("./database/db");
const expressLayouts = require("express-ejs-layouts");

app.use(expressLayouts);

app.use(express.json());

app.use("/todos", todosRoutes);
app.set("view engine", "ejs");
app.get("/", (req, res) => {
  res.render("index", { layout: "layouts/main-layouts.ejs" });
});

app.get("/contact", (req, res) => {
  res.render("contact", {
    layout: "layouts/main-layouts.ejs",
  });
});

app.listen(port, () => {
  console.log(`server berjalan di http://localhost:${port}`);
});

app.get("/todo-view", (req, res) => {
  db.query("SELECT * FROM binatang", (err, todos) => {
    if (err) return res.status(500).send("Internal Server Error");
    res.render("todo", {
      layout: "layouts/main-layouts.ejs",
      todos: todos,
    });
  });
});
