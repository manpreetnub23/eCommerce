# # 🛒 eCommerce Web Application

A full-stack eCommerce platform with user and admin support, built using **MERN stack** with payment gateway integration.

---

## 🔧 Tech Stack

### Frontend:
- React.js
- React Router DOM
- Context API (if used)
- Tailwind CSS / CSS (as applicable)
- LocalStorage for cart
- Razorpay Integration

### Backend:
- Node.js
- Express.js
- MongoDB
- Mongoose
- REST APIs
- Razorpay (Payment Gateway)
- dotenv for env management

---

## 📁 Project Structure

eCommerce/
├── backend/
│ ├── config/
│ │ └── db.js
│ ├── controllers/
│ │ ├── PaymentController.js
│ │ └── ProductController.js
│ ├── models/
│ │ └── ProductModel.js
│ ├── routes/
│ │ ├── PaymentRoutes.js
│ │ └── ProductRoutes.js
│ ├── .env
│ ├── index.js
│ └── package.json
│
├── frontend/
│ ├── public/
│ ├── src/
│ │ ├── api/
│ │ │ ├── paymentApi.js
│ │ │ └── productApi.js
│ │ ├── components/
│ │ │ └── ui/
│ │ │ └── NavBar.jsx
│ │ ├── lib/
│ │ ├── pages/
│ │ │ ├── AdminDashboard.jsx
│ │ │ ├── AdminLogin.jsx
│ │ │ ├── CartPage.jsx
│ │ │ ├── HomePage.jsx
│ │ │ └── ProductDetails.jsx
│ │ ├── utils/
│ │ │ └── razorpay.js
│ │ ├── App.jsx
│ │ ├── index.css
│ │ └── main.jsx
│ ├── components.json
│ ├── eslint.config.js
│ └── package.json
│
├── jsconfig.json
└── README.md


---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
2. Backend Setup


git clone https://github.com/manpreetnub23/eCommerce.git
cd eCommerce

cd backend
npm install

# Create a .env file
touch .env

Add the following to .env:
PORT=5000
MONGO_URI=your_mongo_connection_string
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret

Then run:

npm start

3. Frontend Setup

cd ../frontend
npm install
npm start

📦 Features
🛍️ Product listing

🔍 Product details

🛒 Add to cart (stored in localStorage)

💳 Checkout & Razorpay payment

🧑 Admin dashboard (Login, Product Management)

🔐 Basic route protection via frontend logic

📌 To-Do / Future Scope
Add authentication with JWT or sessions

Role-based access (Admin vs User)

Orders DB and order history

Real user authentication for login/signup

Deploy on Vercel (frontend) & Render/Heroku (backend)

🙋‍♂️ Author
Name: Manpreet Singh

GitHub: @manpreetnub23