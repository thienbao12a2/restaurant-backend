const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const morgan = require("morgan");
const restaurantRouter = require("./routes/restaurantRoutes");
const cors = require("cors");
const app = express();
app.use(cors());
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    withCredentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("connected123");
  // get that socket and listen to events
  socket.on("chat message", function (msg) {
    // emit data from the server
    io.emit("chat message", msg);
  });
});

app.use((req, res, next) => {
  //   res.header("Access-Control-Allow-Origin", "*");
  //   res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  //   res.header(
  //     "Access-Control-Allow-Headers",
  //     "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization"
  //   );
  req.io = io;
  return next();
});
app.use(morgan("dev"));
app.use(express.json());
app.use("/api/v1/my-restaurant", restaurantRouter);
module.exports = httpServer;
