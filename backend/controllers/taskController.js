const Task = require("../models/Task");
const { getDBStatus } = require("../config/db");

// In-memory store fallback
let memoryTasks = [
  { id: "1", title: "Kitchen cleaning", time: "08:00 AM", category: "Kitchen", priority: "Medium", done: true },
  { id: "2", title: "Prepare lunch", time: "11:00 AM", category: "Kitchen", priority: "High", done: true },
  { id: "3", title: "Laundry", time: "02:00 PM", category: "Chores", priority: "Low", done: true },
  { id: "4", title: "Room cleaning", time: "04:00 PM", category: "Home", priority: "Medium", done: true },
  { id: "5", title: "Help kids with study", time: "06:00 PM", category: "Family", priority: "High", done: false },
  { id: "6", title: "Plan tomorrow's meals", time: "08:00 PM", category: "Kitchen", priority: "Low", done: false },
];

exports.getTasks = async (req, res) => {
  try {
    if (getDBStatus()) {
      const tasks = await Task.find({ userId: req.user._id }).sort({ createdAt: -1 });
      return res.json({ success: true, count: tasks.length, data: tasks });
    }
    return res.json({ success: true, count: memoryTasks.length, data: memoryTasks });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { title, time, category, priority } = req.body;
    if (!title) {
      return res.status(400).json({ success: false, message: "Task title is required." });
    }

    if (getDBStatus()) {
      const task = await Task.create({
        userId: req.user._id,
        title,
        time: time || "Anytime",
        category: category || "General",
        priority: priority || "Medium",
        done: false,
      });
      return res.status(201).json({ success: true, data: task });
    }

    const newTask = {
      id: Date.now().toString(),
      title,
      time: time || "Anytime",
      category: category || "General",
      priority: priority || "Medium",
      done: false,
    };
    memoryTasks.unshift(newTask);
    return res.status(201).json({ success: true, data: newTask });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    if (getDBStatus()) {
      const task = await Task.findOne({ _id: id, userId: req.user._id });
      if (!task) {
        return res.status(404).json({ success: false, message: "Task not found." });
      }
      Object.assign(task, req.body);
      const updated = await task.save();
      return res.json({ success: true, data: updated });
    }

    const idx = memoryTasks.findIndex((t) => t.id === id);
    if (idx !== -1) {
      memoryTasks[idx] = { ...memoryTasks[idx], ...req.body };
      return res.json({ success: true, data: memoryTasks[idx] });
    }
    return res.status(404).json({ success: false, message: "Task not found." });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    if (getDBStatus()) {
      const task = await Task.findOneAndDelete({ _id: id, userId: req.user._id });
      if (!task) {
        return res.status(404).json({ success: false, message: "Task not found." });
      }
      return res.json({ success: true, message: "Task deleted successfully." });
    }

    memoryTasks = memoryTasks.filter((t) => t.id !== id);
    return res.json({ success: true, message: "Task deleted successfully." });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
