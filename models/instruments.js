
const mongoose = require("mongoose");


const instrumentsSchema = new mongoose.Schema({
  name: String,
  isCool: Boolean,
});


const Instrument = mongoose.model('instrument', instrumentsSchema)
module.exports = Instrument
