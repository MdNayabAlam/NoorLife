const BudgetEntry = require("../models/BudgetEntry");
const { getDBStatus } = require("../config/db");

let memoryBudget = [
  { id: "1", type: "income", category: "Salary", amount: 55000, date: "2025-05-01", note: "Monthly Primary Salary" },
  { id: "2", type: "income", category: "Freelance", amount: 10000, date: "2025-05-05", note: "Tutoring & Consultation" },
  { id: "3", type: "expense", category: "Rent & Housing", amount: 16000, date: "2025-05-02", note: "Apartment Rent & Maintenance" },
  { id: "4", type: "expense", category: "Groceries", amount: 9500, date: "2025-05-08", note: "Monthly Ration & Fresh Produce" },
  { id: "5", type: "expense", category: "Utilities & Bills", amount: 3400, date: "2025-05-10", note: "Electricity & High-speed Fiber" },
  { id: "6", type: "expense", category: "Kids Education", amount: 5000, date: "2025-05-11", note: "School Books & Fees" },
  { id: "7", type: "expense", category: "Charity & Sadaqah", amount: 2500, date: "2025-05-12", note: "Local Community Support" },
];

exports.getBudgetSummary = async (req, res) => {
  try {
    let entries = memoryBudget;
    if (getDBStatus()) {
      entries = await BudgetEntry.find({ userId: req.user._id }).sort({ date: -1 });
    }

    const totalIncome = entries
      .filter((e) => e.type === "income")
      .reduce((sum, e) => sum + e.amount, 0);

    const totalExpense = entries
      .filter((e) => e.type === "expense")
      .reduce((sum, e) => sum + e.amount, 0);

    const balance = totalIncome - totalExpense;
    const savingsRate = totalIncome > 0 ? Math.round((balance / totalIncome) * 100) : 0;

    return res.json({
      success: true,
      data: {
        summary: { totalIncome, totalExpense, balance, savingsRate },
        entries,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.createBudgetEntry = async (req, res) => {
  try {
    const { type, category, amount, note, date } = req.body;
    if (!type || !amount) {
      return res.status(400).json({ success: false, message: "Type and amount are required." });
    }

    if (getDBStatus()) {
      const entry = await BudgetEntry.create({
        userId: req.user._id,
        type,
        category: category || "General",
        amount: Number(amount),
        note: note || "",
        date: date || new Date().toISOString().split("T")[0],
      });
      return res.status(201).json({ success: true, data: entry });
    }

    const newEntry = {
      id: Date.now().toString(),
      type,
      category: category || "General",
      amount: Number(amount),
      note: note || "",
      date: date || new Date().toISOString().split("T")[0],
    };
    memoryBudget.unshift(newEntry);
    return res.status(201).json({ success: true, data: newEntry });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteBudgetEntry = async (req, res) => {
  try {
    const { id } = req.params;

    if (getDBStatus()) {
      const entry = await BudgetEntry.findOneAndDelete({ _id: id, userId: req.user._id });
      if (!entry) {
        return res.status(404).json({ success: false, message: "Entry not found." });
      }
      return res.json({ success: true, message: "Entry deleted." });
    }

    memoryBudget = memoryBudget.filter((e) => e.id !== id);
    return res.json({ success: true, message: "Entry deleted." });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
