const express = require("express");
const CustomerController = require("../controllers/customers");

const router = express.Router();

router.get("", CustomerController.getCustomers);

router.get("/:id", CustomerController.getCustomer);

router.post("/create", CustomerController.createCustomer);

router.put("/update/:id", CustomerController.updateCustomer);

router.delete("/delete/:id", CustomerController.deleteCustomer);

module.exports = router;
