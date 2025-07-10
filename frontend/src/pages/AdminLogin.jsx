import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";

export default function AdminLogin() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleLogin = (e) => {
		e.preventDefault();
		if (username === "admin" && password === "admin123") {
			localStorage.setItem("isAdmin", "true");
			navigate("/admin-dashboard");
		} else {
			alert("Wrong credentials!");
		}
	};

	return (
		<div className="bg-gray-900 min-h-screen text-white">
			<Navbar />
			<div className="flex items-center justify-center min-h-[80vh]">
				<form
					onSubmit={handleLogin}
					className="space-y-4 max-w-sm w-full bg-gray-800 p-6 rounded-lg shadow-lg"
				>
					<h2 className="text-2xl font-bold text-center mb-4">Admin Login</h2>
					<Input
						placeholder="Username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
					<Input
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<Button type="submit" className="w-full">
						Login
					</Button>
				</form>
			</div>
		</div>
	);
}
