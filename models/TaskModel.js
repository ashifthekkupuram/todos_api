const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TaskModelSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "A Task must have a title"],
      minlength: [6, 'title must have 6 characters']
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const TaskModel = mongoose.model("Task", TaskModelSchema);

module.exports = TaskModel;
