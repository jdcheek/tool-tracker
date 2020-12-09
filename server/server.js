const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const inventoryRouter = require("./routes/inventory.routes");
const usersRouter = require("./routes/user.routes");
const authRouter = require("./routes/auth.routes");

require("dotenv").config();

const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "..", "/client", "/build")));
app.use(
  cors({
    origin: "*",
    credentials: false,
  })
);
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const db = mongoose.connection;
db.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

db.on("error", (error) => {
  console.log(error);
});

app.use("/inventory", inventoryRouter);
app.use("/user", usersRouter);
app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
