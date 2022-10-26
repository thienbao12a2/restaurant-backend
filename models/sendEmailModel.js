const mongoose = require("mongoose");

const sendEmailSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Customer's email is required"],
  },
  subject: {
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
});

const SendEmail = mongoose.model("SendEmail", sendEmailSchema);

module.exports = SendEmail;
