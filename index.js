const dotenv = require("dotenv");
dotenv.config({});

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
// config

// PORT
const PORT = process.env.PORT || 5000;

// connection
require("./models");

// ---------------------Routes--------------
const taskRouter = require("./routes/task.routes");

// express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(morgan("dev"));

// Routing
app.get("/", (req, res) => {
  res.send("Hello Task Manager - API");
});

// user
app.use("/api/v1/task", taskRouter);

app.listen(PORT, () => {
  console.log("app is running " + PORT);
});
