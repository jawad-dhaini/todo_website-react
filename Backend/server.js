const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const port = process.env.PORT;
const connectDB = require("./db/db");
const Routes = require("./routes/routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", Routes);

connectDB();

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
