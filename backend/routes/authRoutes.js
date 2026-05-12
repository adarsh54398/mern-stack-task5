const router = require("express").Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");


// ================= REGISTER =================

router.post("/register", async (req, res) => {

  try {

    const { name, email, password } = req.body;

    console.log("REGISTER:", req.body);

    const userExist = await User.findOne({
      email,
    });

    if (userExist) {

      return res.status(400).json({
        msg: "User already exists",
      });

    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.json({
      msg: "Registration Successful",
      user,
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      msg: err.message,
    });

  }

});


// ================= LOGIN =================

router.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body;

    console.log("LOGIN:", email, password);

    const user = await User.findOne({
      email,
    });

    console.log("USER:", user);

    if (!user) {

      return res.status(400).json({
        msg: "User not found",
      });

    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    console.log("MATCH:", isMatch);

    if (!isMatch) {

      return res.status(400).json({
        msg: "Invalid Password",
      });

    }

    const token = jwt.sign(
      { id: user._id },
      "mysecretkey"
    );

    res.json({
      msg: "Login Successful",
      token,
      user,
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      msg: err.message,
    });

  }

});

module.exports = router;