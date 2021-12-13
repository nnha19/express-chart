//As of now, I am only familiar with MongoDB database, but I do have
// intention to learn MySQL and PostgreSQL.

const express = require("express");
const mongoose = require("mongoose");
const Chart = require("./Models/Chart");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
require("dotenv").config();
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.CONNECT_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("CONNECTED TO MONGODB");
  })
  .catch((err) => console.log(err));

app.get("/bar", async (req, res) => {
  try {
    // Get Age
    const people = await Chart.find({});
    const genders = people.map((p) => p.age);
    res.status(200).json(genders);
  } catch (err) {
    res.status(400).json(err);
  }
});

app.get("/pie", async (req, res) => {
  try {
    // Get gender
    const people = await Chart.find({});
    const age = people.map((p) => p.gender);
    res.status(200).json(age);
  } catch (err) {
    res.status(400).json(err);
  }
});

app.post("/chart", (req, res) => {
  // Create new person
  const { age, name, gender } = req.body;
  Chart.create({ age, name, gender })
    .then((resp) => {
      res.status(200).json(resp);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});
app.get("/chart", async (req, res) => {
  // get chart
  try {
    const chart = await Chart.find({});
    res.status(200).json(chart);
  } catch (err) {
    res.status(400).json(err);
  }
});

app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON ${PORT}`);
});
