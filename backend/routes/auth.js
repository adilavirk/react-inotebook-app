// to import express
const express = require("express");
// import user model
const User = require("../models/User");
const router = express.Router();
//import express validator for validation
const { body, validationResult } = require("express-validator");
// import bcryptjs
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// import middleware
const fetchuser = require("../middleware/fetchuser");
const JWT_SECRET = "Iamadilavirk";
//Route1: create a User using:POST "/api/auth/createuser".No login required
router.post(
  "/createuser",
  [
    body("email", "Enter a valid email").isEmail(),
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  // for validation (code copied from express validator)
  // if there are errors return the Bad request and the Errors
  async (req, res) => {
    success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    // to create user in database
    // Check wether user with this email exists already
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({
          error: "Sorry a user with this email already exists",
        });
      }
      // to generate salt and it returns promise
      const salt = await bcrypt.genSalt(10);
      const secPassword = await bcrypt.hash(req.body.password, salt);
      // create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        // password: req.body.password,
        password: secPassword,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      // res.json(user);
      res.json({ success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error occured");
    }

    //Route:2 Authenticate a User using:POST /api/auth/login . No login required(2.login endpoint)
    router.post(
      "/login",
      [
        body("email", "Enter a valid email").isEmail(),
        body("password", "Password cannot be blank").exists(),
      ],
      // for validation (code copied from express validator)
      // if there are errors return the Bad request and the Errors
      async (req, res) => {
        let success = false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        // use of destructuring(password and email ko bahir nikalenga req.body sa)
        const { email, password } = req.body;
        try {
          // user ko db sa pull krlenga jiska enter krda email db ma save email sa match krta h
          let user = await User.findOne({ email });
          // agr asa is email wala koi user exist hi nhi krta db ma then:
          if (!user) {
            success = false;
            return res
              .status(400)
              .json({ error: "Please try to login with correct Credentials" });
          }
          // to compare password(jo user na dala h wo aur jo db ma save h dono ko compare krenga)
          const passwordCompare = await bcrypt.compare(password, user.password);
          // compare() method true or false return krega
          // agr password match nhi hota compare k bad then:
          if (!passwordCompare) {
            success = false;
            return res.status(400).json({
              success,
              error: "Please try to login with correct Credentials",
            });
          }
          // if password is correct then:
          const data = {
            user: {
              id: user.id,
            },
          };
          const authtoken = jwt.sign(data, JWT_SECRET);
          success = true;
          res.json({ success, authtoken });
        } catch (error) {
          console.error(error.message);
          res.status(500).send("Internal server error occured");
        }
      }
    );
    //Route:3 Get Loggedin user details using:POST /api/auth/getuser . Login required
    router.post("/getuser", fetchuser, async (req, res) => {
      try {
        let userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
      } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error occured");
      }
    });
  }
);
module.exports = router;
