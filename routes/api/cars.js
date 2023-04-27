const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Car = require("../../models/Car");
// @route   Post api/cars
// @desc    Add car
// @access  Public
router.post(
  "/",
  [
    check("brand", "brand is required").not().isEmpty(),
    check("model", "model is required").not().isEmpty(),
    check("category", "category is required").not().isEmpty(),
    check("fuel", "Fuel is required").not().isEmpty(),
    check("topSpeed", "topSpeed is required").not().isEmpty(),
    check("consumption", "consumption is required").not().isEmpty(),
    check("capacity", "capacity is required").not().isEmpty(),
    check("hp", "hp is required").not().isEmpty(),
    check("price", "price is required").not().isEmpty(),
    check("year", "year is required").not().isEmpty(),
    check("photo", "photo is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req); //check if theres any errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.errors }); //badrequest
    }

    const {
      brand,
      model,
      category,
      fuel,
      topSpeed,
      capacity,
      hp,
      price,
      year,
      consumption,
      photo,
    } = req.body;

    const car = new Car({
      brand,
      model,
      category,
      fuel,
      topSpeed,
      capacity,
      hp,
      price,
      year,
      consumption,
      photo,
    });

    car.save();

    res.json(car);

    try {
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

// @route   DELETE api/car/:car_id
// @desc    Delete car
// @access  Public
router.delete("/delete/:car_id", async (req, res) => {
  try {
    await Car.findOneAndRemove({ _id: req.params.car_id });

    res.json({ msg: "Car deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/cars
// @desc    Get all cars
// @access  Public
router.get("/", async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
