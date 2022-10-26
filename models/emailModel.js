const mongoose = require("mongoose");

const emailSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Customer's name is required"],
  },
  phone_number: {
    type: Number,
    required: [true, "Customer's phone number is required"],
  },
  email: {
    type: String,
    required: [true, "Customer's email is required"],
  },
  event_type: {
    type: String,
    required: [true, "Event type is required"],
  },
  message: {
    type: String,
    required: [true, "Message is required"],
  },
  timeStamp: {
    type: String,
    required: [true, "Message must have time stamp"],
  },
  read: {
    type: Boolean,
    required: [true, "Message must have a status"],
  },
});

const Email = mongoose.model("Email", emailSchema);

module.exports = Email;
