const mongoose = require("mongoose");

const pastOrderSchema = new mongoose.Schema({
  orderDetails: {
    type: Object,
    required: [true, "Must have a past order"],
  },
});

const PastOrder = mongoose.model("PastOrder", pastOrderSchema);

module.exports = PastOrder;
