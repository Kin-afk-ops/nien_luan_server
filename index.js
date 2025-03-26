const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
// const productRoutes = require('./src/routes/app.route');

// Router
const appRouter = require("./src/routes/app.route");
const infoUserRoute = require("./src/routes/infoUser");
const addressInfoUserRoute = require("./src/routes/addressInfoUser");
const productRoute = require("./src/routes/product");
const imageProductRoute = require("./src/routes/imageProduct");
const commentProductRoute = require("./src/routes/commentProduct");
const cartRoute = require("./src/routes/cart");
const orderRoute = require("./src/routes/order");

const app = express();

const corsOptions = {
  origin: ["http://localhost:3000"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

app.use("/api", appRouter);
app.use("/api/infoUser", infoUserRoute);
app.use("/api/addressInfoUser", addressInfoUserRoute);
app.use("/api/product", productRoute);
app.use("/api/imageProduct", imageProductRoute);
app.use("/api/commentProduct", commentProductRoute);
app.use("/api/cart", cartRoute);
app.use("/api/order", orderRoute);
