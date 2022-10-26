const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  item_name: {
    type: String,
    required: [true, "An item must have a name"],
    unique: true,
  },
  category: {
    type: String,
    required: [true, "An item must have a category"],
  },
  price: {
    type: Number,
    required: [true, "An item must have a name"],
  },
  description: {
    type: String,
    trim: true,
  },
  item_image: {
    type: String,
    required: [true, "An item must have an image"],
  },
  new: {
    type: Boolean,
  },
  popular: {
    type: Boolean,
  },
});

const Menu = mongoose.model("Menu", menuSchema);

module.exports = Menu;
