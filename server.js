const mongoose = require('mongoose')
const dotenv = require("dotenv");
dotenv.config(); 
const express = require("express");const app = express();


const instrumentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: String,
})

const Instrument = mongoose.model('instrument', instrumentSchema)
module.exports = Instrument

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});



app.get("/", async (req, res) => {
  res.send("hello, friend!");
});


app.get("/", async (req, res) => {
  res.render("index.ejs");
});


app.listen(3000, () => {
  console.log('Listening on port 3000');
});

