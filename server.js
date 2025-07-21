const dotenv = require("dotenv");
dotenv.config();

const express = require("express"); 
const app = express();
const mongoose = require('mongoose')
const Instrument = require("./models/instruments.js");

const methodOverride = require('method-override')

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method")); 



mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});


// GET 
app.get("/", async (req, res) => {
    res.render("index.ejs");
});


//GET fruits/new
app.get("/instruments/new", (req, res) => {
    res.render("instruments/new.ejs");
});


//POST /fruits
app.post("/instruments", async (req, res) => {
  if (req.body.isCool === "on") {
    req.body.isCool = true;
  } else {
    req.body.isCool = false;
  }
  await Instrument.create(req.body);
  res.redirect("/instruments/new");
});



//GET instruments

// app.get("/instruments", async (req, res) => {
//     const allInstruments = await Instrument.find();
//     console.log(allInstruments);
//     res.send("Welcome to the cool instruments index page.");
// });


//GET /Instruments
app.get("/instruments", async (req, res) => {
  const allInstruments = await Instrument.find();
  res.render("instruments/index.ejs", { instruments: allInstruments });
});


//GET instruments /new
app.get("/instruments/new", (req, res) => {
  res.render("instruments/new.ejs");
});


app.get("/instruments/:instrumentId", async (req, res) => {
  const foundInstrument = await Instrument.findById(req.params.instrumentId);
  res.render('instruments/show.ejs', {instrument: foundInstrument });
  
});


//POST /instruments
app.post("/instruments", async (req, res) => {
    if (req.body.isCool === "on") {
        req.body.isCool = true;
    } else {
        req.body.isCool = false;
    }
    await Instrument.create(req.body);
    res.redirect("/instruments/new");
});


//DELETE route
app.delete("/instruments/:instrumentId", async (req, res) => {
  await Instrument.findByIdAndDelete(req.params.instrumentId);
res.redirect("/instruments");
});



app.listen(3000, () => {
    console.log('Listening on port 3000');
});

