const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

exports.createUser = async (req, res) => {
  console.log(req.body);
  try {
    const newPassword = await bcrypt.hash(req.body.password, 10);
    await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: newPassword,
    });
    res.json({ status: "success" });
  } catch (err) {
    res.json({ status: "error", error: "Duplicate email" });
  }
};

exports.loginUser = async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });
  console.log(req.body.email);

  if (!user) {
    return res.json({
      status: "error",
      error: "Invalid username or password.",
    });
  }

  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (isPasswordValid) {
    const token = jwt.sign(
      {
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
      },
      "TEAM4SWE2022"
    );

    return res.json({
      status: "success",
      userToken: token,
      user: `${user.firstName} ${user.lastName}`,
    });
  } else {
    return res.json({ status: "error", user: false });
  }
};
