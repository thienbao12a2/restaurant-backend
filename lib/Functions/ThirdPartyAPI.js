const dotenv = require("dotenv");
dotenv.config({ path: `${__dirname}/../../config.env` });
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

exports.sendMessageBooking = ({ name, phone_number, guest_number, date }) => {
  client.messages
    .create({
      body: `Hello ${name}, Thank you for supporting Empire Steakhouse. Your reservation has been confirmed for ${guest_number} ${
        guest_number > 1 ? "guests" : "guest"
      } on ${date}`,
      to: `+1${phone_number}`,
      from: "+16292764511",
    })
    .then((message) => console.log(message))
    .catch((error) => console.log(error));
};

exports.sendMessageOrdering = (name, phone_number, orderID) => {
  console.log(phone_number, orderID);
  client.messages
    .create({
      body: `Hello ${name}, Thank you for supporting Empire Steak House. Your order number is ${orderID}. Your order should be ready in 20 minutes`,
      to: `+1${phone_number}`,
      from: "+16292764511",
    })
    .then((message) => console.log(message))
    .catch((error) => console.log(error));
};
