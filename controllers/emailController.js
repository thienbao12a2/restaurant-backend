const dotenv = require("dotenv");
dotenv.config({ path: "../config.env" });
const Email = require("../models/emailModel");
const SendEmail = require("../models/sendEmailModel");
const nodemailer = require("nodemailer");

exports.getEmail = async (req, res) => {
  try {
    const email = await Email.find();
    const sentEmail = await SendEmail.find();
    res.status(200).json({
      status: "success",
      data: {
        emails: email,
        sentEmails: sentEmail,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: "Invalid data sent!",
    });
  }
};
exports.contactRestaurant = async (req, res) => {
  try {
    const socket_IO = req.io;
    console.log(req.body);
    const updatedInbox = await Email.create(req.body);
    if (socket_IO && updatedInbox) {
      socket_IO.emit("add-email-to-inbox", updatedInbox);
      socket_IO.emit("increment-email-count", updatedInbox);
      res.status(201).json({
        status: "success",
      });
    } else {
      throw "Connection to Socket or MongoDB has been interrupted";
    }
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: "Invalid data sent!",
    });
  }
};
exports.sendEmail = (req, res) => {
  try {
    const { email, subject, message } = req.body;
    const mailTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_APPPASSWORD,
      },
    });
    const mailDetails = {
      from: "baoton20182018@gmail.com",
      to: email,
      subject,
      text: message,
    };
    mailTransporter.sendMail(mailDetails, async (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Email sent successfully");
        const sentEmail = await SendEmail.create(req.body);
        res.status(201).json({
          status: "success",
          data: {
            sentEmails: sentEmail,
          },
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};
exports.readEmail = async (req, res) => {
  try {
    const { newCheckUnreadEmail } = req.body;
    // const toBeUpdate = {
    //   name: newCheckUnreadEmail.name,
    //   phone_number: newCheckUnreadEmail.phone_number,
    //   email: newCheckUnreadEmail.email,
    //   event_type: newCheckUnreadEmail.event_type,
    //   message:  newCheckUnreadEmail.message,
    //   timeStamp: newCheckUnreadEmail.timeStamp,

    // };
    console.log(newCheckUnreadEmail.read);
    console.log(newCheckUnreadEmail);
    const updatedEmailList = await Email.findByIdAndUpdate(
      newCheckUnreadEmail._id,
      { read: newCheckUnreadEmail.read },
      { runValidators: true, new: true }
    );

    res.status(200).json({
      status: "success",
      data: {
        updatedEmailList,
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
