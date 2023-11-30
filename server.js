const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = require("./app");
const bodyParser = require("body-parser");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

//connect to database:
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log("Database connections successful");
  })
  .catch((err) => {
    console.log(err);
    console.log("Error while connecting to database");
  });

//starting server:
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
