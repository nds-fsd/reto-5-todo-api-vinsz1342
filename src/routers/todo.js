const express = require("express");
const { todos } = require("../data/index");

const todoRouter = express.Router();
todoRouter.use(express.json());

todoRouter.get("/todo", (req, res) => {
  res.json(todos);
});

todoRouter.post("/todo", (req, res) => {
  const { text, fecha, done } = req.body;
  const newTodo = {
    id: todos.length + 1,
    text,
    fecha,
    done,
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

todoRouter.get("/todo/:id", (req, res) => {
  const todoId = parseInt(req.params.id, 10);
  const foundTodo = todos.find((todo) => todo.id === todoId);

  if (foundTodo) {
    res.json(foundTodo);
  } else {
    res.status(404).json({ error: "Todo not found" });
  }
});

todoRouter.patch("/todo/:id", (req, res) => {
  const todoId = parseInt(req.params.id);
  const foundTodo = todos.find((todo) => todo.id === todoId);

  if (foundTodo) {
    const { text, fecha, done } = req.body;
    foundTodo.text = text || foundTodo.text;
    foundTodo.fecha = fecha || foundTodo.fecha;
    foundTodo.done = done || foundTodo.done;
    res.json(foundTodo);
  } else {
    res.status(404).json({ error: "Todo not found" });
  }
});

todoRouter.delete("/todo/:id", (req, res) => {
  const todoId = parseInt(req.params.id);
  const foundIndex = todos.findIndex((todo) => todo.id === todoId);

  if (foundIndex !== -1) {
    todos.splice(foundIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ error: "Todo not found" });
  }
});

module.exports = todoRouter;
