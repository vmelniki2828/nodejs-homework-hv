const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const app = require("./app");

// const { DB_HOST } = process.env;
const DB_HOST = 'mongodb+srv://Vlad:VGpKp3FpPZHskpmJ@cluster0.oj6ocpv.mongodb.net/?retryWrites=true&w=majority'

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000);
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });

//VGpKp3FpPZHskpmJ
