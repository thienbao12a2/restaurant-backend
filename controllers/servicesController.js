const Order = require("../models/orderModel");
const PastOrder = require("../models/pastOrderModel");
const Booking = require("../models/bookingModel");
const Gallery = require("../models/galleryModel");
const Menu = require("../models/menuModel");

exports.getServices = async (req, res) => {
  try {
    console.log("getser");
    const order = await Order.find();
    const pastOrder = await PastOrder.find();
    const booking = await Booking.find();
    const gallery = await Gallery.find();
    const menu = await Menu.find();
    // res.header("Access-Control-Allow-Origin", "*");
    // res.writeHead(200, {
    //   "ngrok-skip-browser-warning": "skip-browser-warning",
    // });
    res.status(200).json({
      status: "success",
      data: {
        order,
        pastOrder,
        booking,
        gallery,
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

// exports.createOrder = async (req, res) => {
//   try {
//     const orderNumber = Math.round(Math.random() * Math.pow(10, 5));
//     const newOrder = await Order.create(req.body);
//     const { orders } = newOrder;
//     const { name, phone_number } = orders;
//     sendMessageOrdering(name, orderNumber, phone_number);
//     console.log(req.io);
//     if (req.io) {
//       console.log("connected");
//       const data = newOrder;
//       req.io.emit(`${orderNumber}-online-order`, data);
//     }
//     res.status(201).json({
//       status: "success",
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(400).json({
//       status: "failed",
//       message: "Invalid data sent213!",
//     });
//   }
// };
