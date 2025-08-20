const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        price: { type: Number, required: true, min: 0 },
    },
    { timestamps: true } // adds createdAt & updatedAt fields
);

const Food = mongoose.model("Food", foodSchema);

module.exports = Food;
