const mongoose = require("mongoose");
const dotenv = require("dotenv");
const httpServer = require("./app");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log("DB Connection Successful!");
  });
const port = process.env.PORT || 8000;
httpServer.listen(port, () => {
  console.log(`App running on port ${port}...`);
  // (async () => {
  //   const ngrokUrl = await ngrok.connect({
  //     proto: "http", // http|tcp|tls, defaults to http
  //     addr: 8000, // port or network address
  //     auth: "", // http basic authentication for tunnel; for now make this empty instead of 'user:pwd'

  //     //subdomain: 'butidiners',                                // reserved tunnel name https://butidiners.ngrok.io (only works on the paid plan)
  //     authtoken: "2C0AomzhEkCGZTVS6whT5JPGgCI_6deXTXEVWYqtrfoYn1Xd", // your authtoken from ngrok.com
  //     region: "us", // one of ngrok regions (us, eu, au, ap), defaults to us
  //     //configPath: './ngrok.yml',                              // custom path for ngrok config file; we shouldn't have to worry about this right now
  //     //binPath: default => default.replace('app.asar', 'app.asar.unpacked'), // custom binary path, eg for prod in electron
  //   });
  //   console.log(ngrokUrl);

  //   if (ngrokUrl) {
  //     const url = ngrokUrl + "/fulfillCheckoutPurchase";
  //     stripe.webhookEndpoints.update(
  //       "we_1ElLeKKsEylVTkPffwry9Jxp",
  //       { url },
  //       (err, endpoint) => {
  //         if (err) {
  //           return res
  //             .status(400)
  //             .send(`Failed to update webhook endpoint. (error ${err})`);
  //         }
  //         if (endpoint) {
  //           return res
  //             .status(200)
  //             .send("Successfully updated webhook endpoint.");
  //         }
  //       }
  //     );
  //   } else {
  //     return res.status(400).send("Failed to create ngrok URL.");
  //   }
  // })();
});
