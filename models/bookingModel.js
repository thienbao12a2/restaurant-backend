const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  timeStamp: {
    type: String,
    required: [true, "Message must have time stamp"],
  },
  name: {
    type: String,
    required: [true, "Customer's name is required"],
  },
  phone_number: {
    type: String,
    required: [true, "Customer's phone number is required"],
  },
  guest_number: {
    type: Number,
    required: [true, "Party size is required"],
  },
  date: {
    type: String,
    required: [true, "Reservation date is required"],
  },
  reservationID: {
    type: String,
    required: [true, "Reservation must have an ID"],
  },
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
