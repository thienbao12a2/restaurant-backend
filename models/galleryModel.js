const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema({
  image: {
    type: String,
    required: [true, "An image must have a URL."],
    unique: true,
  },
});

const Gallery = mongoose.model("Gallery", gallerySchema);

module.exports = Gallery;
