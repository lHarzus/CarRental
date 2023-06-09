const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const Profile = require("../../models/Profile");
const User = require("../../models/User");

// @route   GET api/profile/me
// @desc    Get current users profile
// @access  Private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["name", "avatar"]
    );

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/profile
// @desc    Create or update user profile
// @access  Private
router.post(
  "/",
  [auth, [check("phone", "Phone number is required").not().isEmpty()]],
  async (req, res) => {
    const erros = validationResult(req);
    if (!erros.isEmpty()) return res.status(400).json({ erros: erros.array() });

    const { phone, address, payment } = req.body;

    //Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    profileFields.phone = phone;
    if (address) profileFields.address = address;
    if (payment)
      profileFields.payment = payment.split(",").map((p) => p.trim());

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        //Update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.json(profile);
      }

      //Create
      profile = new Profile(profileFields);

      await profile.save();
      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   GET api/profile
// @desc    Get all profiles
// @access  Public
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user id
// @access  Public
router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);

    if (!profile) return res.status(400).json({ msg: "Profile not found" });

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId")
      return res.status(400).json({ msg: "Profile not found" });
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/profile
// @desc    Delete profile & user
// @access  Private
router.delete("/", auth, async (req, res) => {
  try {
    await Profile.findOneAndRemove({ user: req.user.id });

    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: "User deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/profile/payment
// @desc    Add profile experience
// @access  Private
router.put(
  "/payment",
  [
    auth,
    [
      check("number", "Card number is required").not().isEmpty(),
      check("code", "Card code is required").not().isEmpty(),
      check("name", "Card name is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const erros = validationResult(req);
    if (!erros.isEmpty()) return res.status(400).json({ erros: erros.array() });

    const { number, code, name } = req.body;

    const newExp = {
      number,
      code,
      name,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.payment.unshift(newExp);

      await profile.save();

      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   DELETE api/profile/payment/:payment_id
// @desc    Delete profile payment
// @access  Private
router.delete("/payment/:payment_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    const removeIndex = profile.payment
      .map((item) => item.id)
      .indexOf(req.params.payment_id);

    profile.payment.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/profile/order
// @desc    Add profile order
// @access  Private
router.put("/order", auth, async (req, res) => {
  const { car, pickup, dropoff } = req.body;

  const newExp = {
    car,
    pickup,
    dropoff,
  };

  try {
    const profile = await Profile.findOne({ user: req.user.id });

    profile.orders.unshift(newExp);

    await profile.save();

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/profile/history
// @desc    Add profile history
// @access  Private
router.put("/history", auth, async (req, res) => {
  const { car, pickup, dropoff } = req.body;

  const newExp = {
    car,
    pickup,
    dropoff,
  };

  try {
    const profile = await Profile.findOne({ user: req.user.id });

    profile.history.unshift(newExp);

    await profile.save();

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/profile/order/:order_id
// @desc    Delete profile order
// @access  Private
router.delete("/order/:order_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    const removeIndex = profile.orders
      .map((item) => item.id)
      .indexOf(req.params.order_id);

    profile.orders.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
