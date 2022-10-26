// const Hours = require("../models/hourModel");
let { store_hours } = require("../local_data");

exports.getHours = async (req, res) => {
  try {
    console.log(store_hours);
    res.status(200).json({
      status: "success",
      data: {
        store_hours,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: "Invalid data sent!",
    });
  }
};

exports.createHours = async (req, res) => {
  try {
    store_hours = req.body.store_hours;
    res.status(201).json({
      status: "success",
      data: {
        store_hours,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "failed",
      message: "Invalid data sent!",
    });
  }
};
