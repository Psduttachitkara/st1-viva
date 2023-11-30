const express = require("express");
const app = express();
const path = require("path");

//global middlewares:
app.use(express.static(`${__dirname}/public`));
app.use(express.json());

//route-handlers:
const productRoutes = require("./routes/productRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

app.use("/api/products", productRoutes);
app.use("/api/reviews", reviewRoutes);
// app.use("/api/v1/users", usersRouter);

//routes for rendering template:
app.get("/", (req, res) => {
  res.status(200).render(
    "base",
    //passing data to template:
    {
      tour: "The Forest Hiker",
      user: "Priyanshu",
    }
  );
});

app.get("/overview", (req, res) => {
  res.status(200).render("overview", {
    title: "All tours",
  });
});

//for unhandled routes:
app.all("*", (req, res, next) => {
  console.log(`Error 404, can't find ${req.originalUrl} URL`);
  next();
});

module.exports = app;
