const Booking = require("../models/bookingModel");
const { sendMessageBooking } = require("../lib/Functions/ThirdPartyAPI");

exports.getBooking = async (req, res) => {
  try {
    const booking = await Booking.find();
    res.status(200).json({
      status: "success",
      data: {
        booking,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: "Invalid data sent!",
    });
  }
};

exports.createBooking = async (req, res) => {
  try {
    const socket_IO = req.io;
    const newBooking = await Booking.create(req.body);
    if (socket_IO && newBooking) {
      sendMessageBooking(newBooking);
      socket_IO.emit("add-reservations", newBooking);
      res.status(201).json({
        status: "success",
        // data: {
        //   newBooking,
        // },
      });
    } else {
      throw "Connection to Socket or MongoDB has been interrupted";
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};
