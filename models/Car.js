const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  fuel: {
    type: String,
    required: true,
  },
  topSpeed: {
    type: Number,
    required: true,
  },
  consumption: {
    type: Number,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  hp: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
});

module.exports = Car = mongoose.model("car", CarSchema);
