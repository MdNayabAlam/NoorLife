const CalendarEvent = require("../models/CalendarEvent");
const { getDBStatus } = require("../config/db");

let memoryEvents = [
  { id: "1", date: "15 May", fullDate: "2025-05-15", title: "Parent-Teacher Meeting", time: "10:00 AM - 11:00 AM", color: "#1b4332", category: "School" },
  { id: "2", date: "16 May", fullDate: "2025-05-16", title: "Electricity Bill Due", time: "All Day", color: "#e76f51", category: "Bills" },
  { id: "3", date: "18 May", fullDate: "2025-05-18", title: "Sister's Birthday", time: "All Day", color: "#d4a373", category: "Family" },
];

exports.getEvents = async (req, res) => {
  try {
    if (getDBStatus()) {
      const events = await CalendarEvent.find({ userId: req.user._id }).sort({ createdAt: -1 });
      return res.json({ success: true, count: events.length, data: events });
    }
    return res.json({ success: true, count: memoryEvents.length, data: memoryEvents });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.createEvent = async (req, res) => {
  try {
    const { title, date, fullDate, time, category, color } = req.body;
    if (!title) {
      return res.status(400).json({ success: false, message: "Title is required." });
    }

    if (getDBStatus()) {
      const event = await CalendarEvent.create({
        userId: req.user._id,
        title,
        date: date || "Today",
        fullDate,
        time: time || "All Day",
        category: category || "Family",
        color: color || "#1b4332",
      });
      return res.status(201).json({ success: true, data: event });
    }

    const newEvent = {
      id: Date.now().toString(),
      title,
      date: date || "Today",
      fullDate,
      time: time || "All Day",
      category: category || "Family",
      color: color || "#1b4332",
    };
    memoryEvents.push(newEvent);
    return res.status(201).json({ success: true, data: newEvent });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    if (getDBStatus()) {
      const event = await CalendarEvent.findOneAndDelete({ _id: id, userId: req.user._id });
      if (!event) {
        return res.status(404).json({ success: false, message: "Event not found." });
      }
      return res.json({ success: true, message: "Event deleted." });
    }

    memoryEvents = memoryEvents.filter((e) => e.id !== id);
    return res.json({ success: true, message: "Event deleted." });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
