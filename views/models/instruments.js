
const mongoose = require("mongoose");


const instrumentsSchema = new mongoose.Schema({
  name: String,
  isReadyToPlay: Boolean,
});

const Instrument = mongoose.model("Instrument", instrumentSchema); 

module.exports = Fruit;
