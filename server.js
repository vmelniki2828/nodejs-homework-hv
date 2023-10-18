const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const app = require("./app");

const { DB_HOST } = process.env;

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
