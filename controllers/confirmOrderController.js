const Order = require("../models/orderModel");
const { sendMessageOrdering } = require("../lib/Functions/ThirdPartyAPI");

exports.confirmOrder = async (req, res) => {
  try {
    const { orders } = req.body;
    const { orderDetails } = orders;
    const { name, phone_number, orderID } = orderDetails;
    console.log(orderDetails);
    const updatedOrders = await Order.findByIdAndUpdate(
      orders._id,
      { orderDetails },
      { runValidators: true, new: true },
      () => sendMessageOrdering(name, phone_number, orderID)
    );
    console.log("UpdateD", updatedOrders);
    res.status(200).json({
      status: "success",
      data: {
        updatedOrders,
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
//     const socket_IO = req.io;
//     const newOrder = await Order.create(req.body);
//     const { orderDetails } = newOrder;
//     console.log("newOrder", newOrder);
//     const { name, phone_number, orderID } = orderDetails;
//     if (socket_IO && newOrder) {
//       socket_IO.emit("add-order-to-active-orders", orderDetails, () =>
//         sendMessageOrdering(name, phone_number, orderID)
//       );
//       res.status(201).json({
//         status: "success",
//       });
//     } else {
//       throw "Connection to Socket or MongoDB has been interrupted";
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(400).json({
//       status: "failed",
//       message: "Invalid data sent213!",
//     });
//   }
// };
