const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

//Router
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");

const app = express();

const corsOptions = {
  origin: ["http://localhost:3000"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

dotenv.config();

const PORT = process.env.PORT || 6969;
const MONGO_URL = process.env.MONGO_URL;

//connect database
mongoose
  .connect(MONGO_URL)
  .then(console.log("connect to Mongoose"))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log("connect to port " + PORT);
});

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
