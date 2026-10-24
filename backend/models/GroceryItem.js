const mongoose = require("mongoose");

const grocerySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: [true, "Item name is required"],
      trim: true,
    },
    quantity: {
      type: String,
      default: "1 unit",
    },
    category: {
      type: String,
      default: "Pantry",
    },
    estimatedPrice: {
      type: Number,
      default: 0,
    },
    done: {
      type: Boolean,
      default: false,
    },
    notes: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("GroceryItem", grocerySchema);
