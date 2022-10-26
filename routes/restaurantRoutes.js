const express = require("express");
const menuController = require("../controllers/menuController");
const hourController = require("../controllers/hourController");
const galleryController = require("../controllers/galleryController");
const bookingController = require("../controllers/bookingController");
const orderController = require("../controllers/orderController");
const userController = require("../controllers/userController");
const servicesController = require("../controllers/servicesController");
const confirmOrderController = require("../controllers/confirmOrderController");
const emailController = require("../controllers/emailController");
const router = express.Router();

router
  .route("/menu")
  .get(menuController.getMenu)
  .post(menuController.createMenu);

router
  .route("/hours")
  .get(hourController.getHours)
  .post(hourController.createHours);

router
  .route("/gallery")
  .get(galleryController.getGallery)
  .post(galleryController.createGallery);

router
  .route("/booking")
  .get(bookingController.getBooking)
  .post(bookingController.createBooking);

router
  .route("/order")
  .get(orderController.getOrder)
  .post(orderController.createOrder);

router
  .route("/past-order")
  .get(orderController.getPastOrder)
  .post(orderController.createPastOrder);

router.route("/confirmOrder").post(confirmOrderController.confirmOrder);

router.route("/register").post(userController.createUser);

router.route("/login").post(userController.loginUser);

router.route("/services").get(servicesController.getServices);

router
  .route("/email")
  .get(emailController.getEmail)
  .post(emailController.sendEmail);

router.route("/contactRestaurant").post(emailController.contactRestaurant);

router.route("/readEmail").post(emailController.readEmail);

module.exports = router;
