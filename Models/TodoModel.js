import mongoose from "mongoose";

const todoSchema = mongoose.Schema({
  TODO: {
    type: String,
    require: false,
  },
  description: {
    type: String,
    require: false,
  },
});

const userTodoSchema = mongoose.Schema({
  email: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    require: false,
  },
  todos: [todoSchema],
});

const UserTodo = mongoose.model("UserTodo", userTodoSchema);

export default UserTodo;
