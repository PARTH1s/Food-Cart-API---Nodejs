const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// User schema definition
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true, // store emails in lowercase
      trim: true, // remove spaces
    },
    password: {
      type: String,
      required: true,
      minlength: 6, // enforce stronger passwords
    },
  },
  { timestamps: true }
);

// Hash password before saving user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // skip if password not modified
  try {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
  } catch (err) {
    next(err);
  }
});

// Compare entered password with hashed password
userSchema.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (err) {
    console.error("Error in password validation:", err);
    return false;
  }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
