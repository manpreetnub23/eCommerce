const express = require('express')
const dotenv = require('dotenv')
const app = express()
const productRoutes = require('./routes/ProductRoutes')
const paymentRoutes = require("./routes/PaymentRoutes");
const connectDB = require('./config/db');
const cors = require("cors");
app.use(cors());


// load env
dotenv.config();
const PORT = process.env.PORT;

// connect to database. 
connectDB();
app.use(express.json());



app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.use('/api', productRoutes);
// -> /api/productRoutes

app.use("/api/payment", paymentRoutes);
//  -> /api/payment

app.listen(PORT, () => {
    console.log(`product app listening on port ${PORT}`)
})