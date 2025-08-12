import express from "express";
import Todo from "../models/todo.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

router.post("/todos",isAuthenticated ,async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    res.status(400).json({ message: "All fileds are required" });
  }

  const newtodo = await Todo.create({ title, description });
  res.status(201).json({
    message: "new todo added Successfully",
    success: true,

    newtodo,
  });
});

router.get("/alltodos",isAuthenticated, async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res
      .status(400)
      .json({ success: false, message: "all fileds required" });
  }

  const Alltodo = await Todo.find();
  return res
    .status(200)
    .json({ success: true, message: "All todo found", Alltodo });
});

router.put("/edit-todo/:id",isAuthenticated, async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res
      .status(400)
      .json({ message: false, message: "All fileds are mantedetory" });
  }

  const edittodo = await Todo.findById(req.params.id );
  if (!edittodo)
    return res
      .status(400)
      .json({
        success: false,
        message: "todo in not found",
      });

  const newTodo = await Todo.updateOne({ title, description });
  return res
    .status(201)
    .json({ success: true, message: "todo edit successfully", newTodo });
});

router.delete("/delete-todo/:id", async (req, res) => {
//   const { title, description } = req.body;

//   if (!title || !description) {
//     return res
//       .status(400)
//       .json({ message: false, message: "All fileds are mantedetory" });
//   }

  const edittodo = await Todo.findById(req.params.id );
  if (!edittodo)
    return res
      .status(400)
      .json({
        success: false,
        message: "todo in not found",
      });

  const newTodo = await Todo.deleteOne({_id:req.params.id});
  return res
    .status(201)
    .json({ success: true, message: "todo delelted successfully", newTodo });
});

export default router;
