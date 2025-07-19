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

// const Instrument = require("./models/instrument.js");


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



app.get("/instruments/new", (req, res) => {
  res.render("instruments/new.ejs");
});

app.use(express.urlencoded({ extended: false }));

// server.js


app.post("/instruments", async (req, res) => {
  console.log(req.body);
  res.redirect("/instruments/new");
});



// server.js

// POST /fruits
app.post("/instruments", async (req, res) => {
  if (req.body.isCool === "on") {
    req.body.isCool = true;
  } else {
    req.body.isCool = false;
  }
  await Instrument.create(req.body);
  res.redirect("/instruments/new");
});




app.listen(3000, () => {
  console.log('Listening on port 3000');
});

