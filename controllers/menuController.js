const Menu = require("../models/menuModel");

exports.getMenu = async (req, res) => {
  try {
    const menu = await Menu.find();
    res.status(200).json({
      status: "success",
      data: {
        menu,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: "Invalid data sent!",
    });
  }
};

exports.createMenu = async (req, res) => {
  try {
    const newMenu = await Menu.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        menu: newMenu,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "failed",
      message: "Invalid data sent213!",
    });
  }
};
