const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes.js");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

const corsOption = {
  origin: function (origin, callback) {
    const urlRegex = /^https?:\/\/.*$/;
    if (!origin || urlRegex.test(origin)) {
      callback(null, true);
    } else {
      callback(new Error("now allowed by cors"));
    }
  },
};

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,DELETE,POST,OPTION,PATCH"
  );
  res.header("Access-Control-Allow-Headers", "X-Requested-With,content-type");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.use(cors(corsOption));

app.use(express.json());

app.use("/api", userRoutes);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
