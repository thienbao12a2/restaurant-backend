const mongoose = require("mongoose");

const hourSchema = new mongoose.Schema({
  open_hours: {
    type: String,
    required: [true, "An store must have opening and closing time."],
    unique: true,
  },
});

const Hours = mongoose.model("Hours", hourSchema);

module.exports = Hours;
