// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../src/pages/HomePage";
import AdminLogin from "../src/pages/AdminLogin";
import AdminDashboard from "../src/pages/AdminDashboard";
import CartPage from "./pages/CartPage";
import ProductDetails from "./pages/ProductDetails";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/admin-secret-panel" element={<AdminLogin />} />
				<Route path="/admin-dashboard" element={<AdminDashboard />} />
				<Route path="/product/:id" element={<ProductDetails />} />
				<Route path="/cart" element={<CartPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
