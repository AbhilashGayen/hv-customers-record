const express = require("express");
const authCheck = require("../middleware/authCheck");

const CustomerController = require("../controllers/customers");

const router = express.Router();

router.get("", authCheck, CustomerController.getCustomers);

router.get("/:id", authCheck, CustomerController.getCustomer);

router.post("/create", authCheck, CustomerController.createCustomer);

router.put("/update/:id", authCheck, CustomerController.updateCustomer);

router.delete("/delete/:id", authCheck, CustomerController.deleteCustomer);

module.exports = router;
