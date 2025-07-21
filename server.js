const dotenv = require("dotenv");
const mongoose = require('mongoose')
dotenv.config();
const express = require("express"); const app = express();
console.log(process.env.MONGODB_URI)
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});


const instrumentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: String,
})

const Instrument = mongoose.model('instrument', instrumentSchema)
module.exports = Instrument





app.get("/", async (req, res) => {
    res.render("index.ejs");
});


app.get("/instruments/new", (req, res) => {
    res.render("instruments/new.ejs");
});

app.use(express.urlencoded({ extended: false }));



app.post("/instruments", async (req, res) => {
    console.log(req.body);
    
    res.redirect("/instruments/new");
});






app.post("/instruments", async (req, res) => {
    if (req.body.isCool === "on") {
        req.body.isCool = true;
    } else {
        req.body.isCool = false;
    }
    await Instrument.create(req.body);
    res.redirect("/instruments/new");
});



app.get("/instruments", async (req, res) => {
    const allInstruments = await Instrument.find();
    console.log(allInstruments);
    res.send("Welcome to the cool instruments index page.");
});





app.get("/instruments", async (req, res) => {
  const allInstruments = await Fruit.find();
  res.render("instruments/index.ejs", { instrument: allInstruments });
});



//DELETE route
app.delete("/fruits/:fruitId", async (req, res) => {
  await Fruit.findByIdAndDelete(req.params.fruitId);
res.redirect('/fruits');
});








app.listen(3000, () => {
    console.log('Listening on port 3000');
});

