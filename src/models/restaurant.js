const mongoose = require("mongoose");

// Restaurant schema definition
const restaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, // removes extra spaces
    },
    address: {
      type: String,
      trim: true,
    },
    food: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Food", // Model names should be capitalized
      },
    ],
  },
  { timestamps: true } // adds createdAt & updatedAt
);

// Add index for faster queries by name
restaurantSchema.index({ name: 1 });

// Restaurant model
const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;
