const Razorpay = require("razorpay");
const dotenv = require('dotenv');

dotenv.config();

const instance = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET,
});

const createOrder = async (req, res) => {
    const { amount } = req.body;  // ₹ amount from frontend
    try {
        const options = {
            amount: amount * 100, // Amount in paisa
            currency: "INR",
            receipt: "receipt_order_" + new Date().getTime(),
        };
        const order = await instance.orders.create(options);
        res.status(200).json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create order" });
    }
};

module.exports = { createOrder };
