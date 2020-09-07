const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const inventoryRouter = require("./routes/inventory");
const usersRouter = require("./routes/users");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.options("*", cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.use("/inventory", inventoryRouter);
app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

// 31:53
