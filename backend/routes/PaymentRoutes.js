const express = require("express");
const router = express.Router();
// const { createOrder } = require("../controllers/PaymentController");
const { createOrder } = require("../controllers/PaymentController")

router.post("/create-order", createOrder);

module.exports = router;
