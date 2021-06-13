const Customer = require("../models/customer");

exports.getCustomers = (req, res, next) => {
  Customer.find((error, data) => {
    if (error) {
      return next(error);
    }
    res.json(data);
  });
};

exports.getCustomer = (req, res, next) => {
  Customer.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
};

exports.createCustomer = (req, res, next) => {
  Customer.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    }
    res.json(data);
  });
};

exports.updateCustomer = (req, res, next) => {
  Customer.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error);
      }
      res.json(data);
      console.log("Data updated successfully");
    }
  );
};

exports.deleteCustomer = (req, res, next) => {
  Customer.findByIdAndDelete(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    }
    res.status(200).json({
      msg: data,
    });
  });
};
