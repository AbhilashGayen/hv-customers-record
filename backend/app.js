const express = require("express");
const mongoose = require("mongoose");

const customerRoutes = require("./routes/customers");
const userRoutes = require("./routes/users");

const app = express();

mongoose
  .connect(
    "mongodb+srv://" +
      process.env.MONGO_ATLAS_Username +
      ":" +
      process.env.MONGO_ATLAS_PW +
      "@cluster0.vqlxn.mongodb.net/hv-customer-records?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
  )
  .then(() => {
    console.log("Connected Established! Connected to mongoDb");
  })
  .catch(() => {
    console.log("Connection Failed! Unable to connect to mongoDB");
  });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/customers", customerRoutes);
app.use("/api/user", userRoutes);

module.exports = app;
