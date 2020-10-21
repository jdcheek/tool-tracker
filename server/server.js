const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const inventoryRouter = require("./routes/inventory.routes");
const usersRouter = require("./routes/user.routes");
const authRouter = require("./routes/auth.routes")
//TODO import Helmet

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.options("*", cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, 
  {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.use("/inventory", inventoryRouter);
app.use("/user", usersRouter);
app.use("/login", authRouter)

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
