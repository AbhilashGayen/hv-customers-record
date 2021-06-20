const express = require("express");
const UserController = require("../controllers/user");
const authCheck = require("../middleware/authCheck");

const router = express.Router();

router.get("/user", authCheck, UserController.getCurrentUser);

router.post("/signup", UserController.createUser);

router.post("/login", UserController.userLogin);

module.exports = router;
