const mongoose = require("mongoose");

const mealPlanSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    day: {
      type: String,
      enum: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      required: true,
    },
    date: {
      type: String,
    },
    mealType: {
      type: String,
      enum: ["Breakfast", "Lunch", "Dinner", "Snacks"],
      default: "Lunch",
    },
    title: {
      type: String,
      required: [true, "Meal title is required"],
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    recipe: {
      type: String,
      default: "",
    },
    prepTime: {
      type: String,
      default: "30 mins",
    },
    calories: {
      type: Number,
      default: 450,
    },
    image: {
      type: String,
      default: "/images/meal_thali.jpg",
    },
    ingredients: [
      {
        name: String,
        amount: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("MealPlan", mealPlanSchema);
