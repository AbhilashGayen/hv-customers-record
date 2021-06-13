const express = require("express");
const mongoose = require("mongoose");

const Customer = require("./models/customer");

const app = express();

mongoose
  .connect(
    "mongodb+srv://AbhilashGayen:JmRvUhtO63q2hm1M@cluster0.vqlxn.mongodb.net/hv-customer-records?retryWrites=true&w=majority",
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

app.post("/api/customers", (req, res, next) => {
  const customer = new Customer({
    name: req.body.name,
    location: req.body.location,
    phone: req.body.phone,
    contactPerson: req.body.contactPerson,
    contactRole: req.body.contactRole,
    internalComment: req.body.internalComment,
    internalRepresentative: req.body.internalRepresentative,
    priority: req.body.priority,
    isMailSent: req.body.isMailSent,
  });
  customer.save().then((result) => {
    res.status(201).json({
      message: "Customes addded!",
      customerId: result._id,
    });
  });
});

app.get("/api/customers", (req, res, next) => {
  Customer.find().then((data) => {
    res.status(200).json({
      message: "Customers fetched succeddfully",
      customers: data,
    });
  });
});

app.delete("/api/customers/:id", (req, res, next) => {
  Customer.deleteOne({ _id: req.params.id }).then((result) => {
    res.status(200).json({
      message: "Customes deleted!",
    });
  });
});

app.put("/api/customers/:id", (req, res, next) => {
  const customer = new Customer({
    _id: req.params.id,
    name: req.body.name,
    location: req.body.location,
    phone: req.body.phone,
    contactPerson: req.body.contactPerson,
    contactRole: req.body.contactRole,
    internalComment: req.body.internalComment,
    internalRepresentative: req.body.internalRepresentative,
    priority: req.body.priority,
    isMailSent: req.body.isMailSent,
  });
  Customer.updateOne({ _id: req.params.id }, customer)
    .then((result) => {
      if (result.n > 0) {
        res
          .status(200)
          .json({ message: "Update Successful!", customer: customer });
      } else {
        res.status(401).json({ message: "Not Authorized!" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Couldn't Update Customer!",
      });
    });
});

module.exports = app;
