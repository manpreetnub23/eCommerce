// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../src/pages/HomePage";
import AdminLogin from "../src/pages/AdminLogin";
import AdminDashboard from "../src/pages/AdminDashboard";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/admin-secret-panel" element={<AdminLogin />} />
				<Route path="/admin-dashboard" element={<AdminDashboard />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
