import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ShoppingCart, User } from "lucide-react";

export default function NavBar() {
	const navigate = useNavigate();
	const [cartCount, setCartCount] = useState(0);

	useEffect(() => {
		const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
		const totalItems = storedCart.reduce((sum, item) => sum + item.quantity, 0);
		setCartCount(totalItems);
	}, []);

	return (
		<nav className="bg-white fixed w-full z-10 top-0 shadow-md">
			<div className="container mx-auto flex items-center justify-between px-6 py-4">
				{/* Logo */}
				<div
					className="text-2xl font-bold text-black flex items-center gap-2 cursor-pointer"
					onClick={() => navigate("/")}
				>
					🌚 TOUGH DAY
				</div>

				{/* Nav Links */}
				<div className="flex items-center gap-8 text-gray-800">
					<button
						className="hover:text-black transition hover:font-semibold hover:cursor-pointer"
						onClick={() => navigate("/")}
					>
						Home
					</button>
					<button
						className="hover:text-black transition hover:font-semibold hover:cursor-pointer"
						onClick={() => navigate("/men")}
					>
						Men
					</button>
					<button
						className="hover:text-black transition hover:font-semibold hover:cursor-pointer"
						onClick={() => navigate("/women")}
					>
						Women
					</button>
					<button
						className="hover:text-black transition hover:font-semibold hover:cursor-pointer"
						onClick={() => navigate("/contact")}
					>
						Contact
					</button>
				</div>

				{/* Icons */}
				<div className="flex items-center gap-4">
					{/* Admin Button */}
					<Button
						variant="ghost"
						onClick={() => navigate("/admin-dashboard")}
						className="rounded-full bg-gray-100 p-2 hover:bg-gray-200 hover:cursor-pointer"
					>
						<User size={20} />
					</Button>

					{/* Cart Button */}
					<Button
						variant="ghost"
						onClick={() => navigate("/cart")}
						className="relative rounded-full  p-2 hover:bg-gray-200 hover:cursor-pointer"
					>
						<ShoppingCart size={20} />
						{cartCount > 0 && (
							<span className="absolute -top-1 -right-1 bg-black text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
								{cartCount}
							</span>
						)}
					</Button>
				</div>
			</div>
		</nav>
	);
}
