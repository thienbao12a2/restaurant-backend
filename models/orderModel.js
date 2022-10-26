const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderDetails: {
    type: Object,
    required: [true, "Must have an order"],
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
