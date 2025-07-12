# 🛒 Admin eCommerce Backend

A backend-only admin system for manually managing products and orders.

## ✨ Core Features

- Admin-only login using hardcoded credentials (from `.env`)
- Product creation and order entry via protected routes
- No user registration or advanced auth mechanisms

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB (with Mongoose ODM)
- dotenv for admin credential config

## 📂 Project Structure

/eCommerce
├── server.js
├── config/
│ └── db.js
├── controllers/
│ ├── authController.js (admin login logic)
│ ├── productController.js
│ └── orderController.js
├── models/
│ ├── Admin.js
│ ├── Product.js
│ └── Order.js
├── routes/
│ ├── auth.js
│ ├── product.js
│ └── order.js
└── .env


## 🚀 Setup & Run

1. Clone the repo:
   ```bash
   git clone https://github.com/manpreetnub23/eCommerce.git

cd eCommerce
npm install

ADMIN_USERNAME=youradmin
ADMIN_PASSWORD=yourpassword
MONGO_URI=your_mongo_connection
PORT=5000

npm start

Access endpoints via Postman or browser:

POST /login – admin login

POST /add-product

POST /add-order

GET /products
