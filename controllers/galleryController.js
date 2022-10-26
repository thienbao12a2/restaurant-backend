const Gallery = require("../models/galleryModel");

exports.getGallery = async (req, res) => {
  try {
    const gallery = await Gallery.find();
    res.status(200).json({
      status: "success",
      data: {
        gallery,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: "Invalid data sent!",
    });
  }
};

exports.createGallery = async (req, res) => {
  try {
    const newGallery = await Gallery.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        newGallery,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};
