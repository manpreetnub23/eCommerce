import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function NavBar() {
	const navigate = useNavigate();
	const [cartCount, setCartCount] = useState(0);

	useEffect(() => {
		const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
		const totalItems = storedCart.reduce((sum, item) => sum + item.quantity, 0);
		setCartCount(totalItems);
	}, []);

	return (
		<nav className="bg-gray-800/80 backdrop-blur-md fixed w-full z-10 top-0 shadow-md">
			<div className="container mx-auto flex items-center justify-between px-6 py-4">
				<div
					className="text-2xl font-bold flex items-center gap-2 hover:cursor-pointer"
					onClick={() => navigate("/")}
				>
					<span role="img" aria-label="cart">
						🌚
					</span>
					<h1>Tough Day</h1>
				</div>
				<div className="flex items-center gap-6">
					<Button
						variant="ghost"
						className="text-white hover:bg-gray-600 hover:text-white transition-colors duration-300"
						onClick={() => navigate("/")}
					>
						Home
					</Button>
					<Button
						variant="ghost"
						className="text-white hover:bg-blue-600 hover:text-white transition-colors duration-300"
						onClick={() => navigate("/admin-dashboard")}
					>
						Admin
					</Button>
					<Button
						variant="ghost"
						className="text-white hover:bg-gray-600 hover:text-white transition-colors duration-300"
					>
						Contact
					</Button>

					{/* Cart Button with Count */}
					<Button
						variant="ghost"
						className="relative text-white hover:bg-green-600 hover:text-white transition-colors duration-300"
						onClick={() => navigate("/cart")}
					>
						Cart
						{cartCount > 0 && (
							<span className="absolute -top-2 -right-2 bg-red-600 rounded-full w-5 h-5 text-xs flex items-center justify-center">
								{cartCount}
							</span>
						)}
					</Button>
				</div>
			</div>
		</nav>
	);
}
