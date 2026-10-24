const GroceryItem = require("../models/GroceryItem");
const { getDBStatus } = require("../config/db");

let memoryGroceries = [
  { id: "1", name: "Milk", quantity: "2 Litres", category: "Dairy", done: true, estimatedPrice: 120 },
  { id: "2", name: "Eggs", quantity: "1 Dozen", category: "Dairy", done: true, estimatedPrice: 84 },
  { id: "3", name: "Onions", quantity: "2 kg", category: "Vegetables", done: false, estimatedPrice: 70 },
  { id: "4", name: "Tomatoes", quantity: "1.5 kg", category: "Vegetables", done: false, estimatedPrice: 60 },
  { id: "5", name: "Rice", quantity: "5 kg", category: "Pantry", done: false, estimatedPrice: 320 },
  { id: "6", name: "Cooking Oil", quantity: "2 Litres", category: "Pantry", done: false, estimatedPrice: 280 },
  { id: "7", name: "Chicken", quantity: "1 kg", category: "Meat", done: false, estimatedPrice: 240 },
  { id: "8", name: "Spices", quantity: "Assorted pack", category: "Spices", done: false, estimatedPrice: 150 },
];

exports.getGroceries = async (req, res) => {
  try {
    if (getDBStatus()) {
      const items = await GroceryItem.find({ userId: req.user._id }).sort({ createdAt: -1 });
      return res.json({ success: true, count: items.length, data: items });
    }
    return res.json({ success: true, count: memoryGroceries.length, data: memoryGroceries });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.createGrocery = async (req, res) => {
  try {
    const { name, quantity, category, estimatedPrice } = req.body;
    if (!name) {
      return res.status(400).json({ success: false, message: "Item name is required." });
    }

    if (getDBStatus()) {
      const item = await GroceryItem.create({
        userId: req.user._id,
        name,
        quantity: quantity || "1 unit",
        category: category || "Pantry",
        estimatedPrice: Number(estimatedPrice) || 0,
        done: false,
      });
      return res.status(201).json({ success: true, data: item });
    }

    const newItem = {
      id: Date.now().toString(),
      name,
      quantity: quantity || "1 unit",
      category: category || "Pantry",
      estimatedPrice: Number(estimatedPrice) || 0,
      done: false,
    };
    memoryGroceries.push(newItem);
    return res.status(201).json({ success: true, data: newItem });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateGrocery = async (req, res) => {
  try {
    const { id } = req.params;

    if (getDBStatus()) {
      const item = await GroceryItem.findOne({ _id: id, userId: req.user._id });
      if (!item) {
        return res.status(404).json({ success: false, message: "Grocery item not found." });
      }
      Object.assign(item, req.body);
      const updated = await item.save();
      return res.json({ success: true, data: updated });
    }

    const idx = memoryGroceries.findIndex((g) => g.id === id);
    if (idx !== -1) {
      memoryGroceries[idx] = { ...memoryGroceries[idx], ...req.body };
      return res.json({ success: true, data: memoryGroceries[idx] });
    }
    return res.status(404).json({ success: false, message: "Item not found." });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteGrocery = async (req, res) => {
  try {
    const { id } = req.params;

    if (getDBStatus()) {
      const item = await GroceryItem.findOneAndDelete({ _id: id, userId: req.user._id });
      if (!item) {
        return res.status(404).json({ success: false, message: "Item not found." });
      }
      return res.json({ success: true, message: "Grocery item deleted." });
    }

    memoryGroceries = memoryGroceries.filter((g) => g.id !== id);
    return res.json({ success: true, message: "Grocery item deleted." });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
