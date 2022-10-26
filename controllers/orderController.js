const Order = require("../models/orderModel");
const PastOrder = require("../models/pastOrderModel");
// const moment = require("moment-timezone");
const { sendMessageOrdering } = require("../lib/Functions/ThirdPartyAPI");
const moment = require("moment-timezone");

exports.getOrder = async (req, res) => {
  try {
    const order = await Order.find();
    res.status(200).json({
      status: "success",
      data: {
        order,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: "Invalid data sent!",
    });
  }
};

exports.getPastOrder = async (req, res) => {
  try {
    const pastOrder = await PastOrder.find();
    res.status(200).json({
      status: "success",
      data: {
        pastOrder,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: "Invalid data sent!",
    });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const socket_IO = req.io;
    const newOrder = await Order.create(req.body);
    // const { orderDetails } = newOrder;
    // console.log("newOrder", newOrder);
    // const { name, phone_number, orderID } = orderDetails;
    if (socket_IO && newOrder) {
      socket_IO.emit("add-order-to-active-orders", newOrder);
      res.status(201).json({
        status: "success",
      });
    } else {
      throw "Connection to Socket or MongoDB has been interrupted";
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "failed",
      message: "Invalid data sent213!",
    });
  }
};

exports.createPastOrder = async (req, res) => {
  try {
    console.log(req.body);
    const { orders } = req.body;
    const { orderDetails, _id } = orders;

    const socket_IO = req.io;
    const newPastOrder = await PastOrder.create({
      orderDetails: {
        completeTimeStamp: moment().toISOString(),
        ...orderDetails,
      },
    });

    const deleteLiveOrder = await Order.deleteOne({ _id });
    if (socket_IO && newPastOrder) {
      socket_IO.emit("add-order-to-past-orders", newPastOrder);
      res.status(201).json({
        status: "success",
      });
    } else {
      throw "Connection to Socket or MongoDB has been interrupted";
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "failed",
      message: "Invalid data sent213!",
    });
  }
};
