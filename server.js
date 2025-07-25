const dotenv = require("dotenv");
dotenv.config();

const express = require("express"); 
const app = express();
const mongoose = require('mongoose')
const Instrument = require("./models/instruments.js");

const methodOverride = require('method-override')

 // new code below this line
 const path = require("path");


 app.use(express.urlencoded({ extended: false }));
 app.use(methodOverride("_method"));

 app.use(express.static(path.join(__dirname, "public")));

 app.get("/", async (req, res) => {
   res.render("index.ejs");
 });



mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});
// GET 
app.get("/", async (req, res) => {
    res.render("index.ejs");
});


//GET instruments/new
app.get("/instruments/new", (req, res) => {
    res.render("instruments/new.ejs");
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




//GET /Instruments
app.get("/instruments", async (req, res) => {
  const allInstruments = await Instrument.find();
  res.render("instruments/index.ejs", { instruments: allInstruments });
});


//GET instruments /new
app.get("/instruments/new", (req, res) => {
  res.render("instruments/new.ejs");
});



//GET instruments/:id  
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




//GET instruments/:id/edit
// Shows a form to edit an existing instrument

app.get("/instruments/:instrumentId/edit", async (req, res) => {
  const foundInstrument = await Instrument.findById(req.params.instrumentId);
  res.render("instruments/edit.ejs", {
    instrument: foundInstrument,
  });
});

// see if it's finding instrument, getting params, see where it's breaking

//PUT instruments/:id 
// edit an existing instrument







app.put("/instruments/:instrumentId", async (req, res) => {

  if (req.body.isCool === "on") {
    req.body.isCool = true;
  } else {
    req.body.isCool = false;
  }
  
  await Instrument.findByIdAndUpdate(req.params.instrumentId, req.body);

  res.redirect(`/instruments/${req.params.instrumentId}`);
});




// server.js


app.put("/instruments/:instrumentId", async (req, res) => {
  if (req.body.isCool === "on") {
    req.body.isCool = true;
  } else {
    req.body.isCool = false;
  }
  
  await Instrument.findByIdAndUpdate(req.params.instrumentId, req.body);
  res.redirect(`/instruments/${req.params.instrumentId}`);
});



//DELETE route
app.delete("/instruments/:instrumentId", async (req, res) => {
  await Instrument.findByIdAndDelete(req.params.instrumentId);
res.redirect("/instruments");
});


app.get("/instruments/:instrumentId/edit", async (req, res) => {
  const foundInstrument = await Instrument.findById(req.params.instrumentId);
  res.render("instruments/edit.ejs", {
    instrument: foundInstrument,
  });
});



app.put("/instruments/:instrumentId", async (req, res) => {
  if (req.body.isCool === "on") {
    req.body.isCool = true;
  } else {
    req.body.isCool = false;
  }
  
  await Instrument.findByIdAndUpdate(req.params.instrumentId, req.body);

  
  res.redirect(`/instruments/${req.params.instrumentId}`);
});




app.listen(3000, () => {
    console.log('Listening on port 3000');
});

