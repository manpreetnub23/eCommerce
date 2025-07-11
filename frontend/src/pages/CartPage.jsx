import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import NavBar from "@/components/Navbar";
import { handlePayment } from "@/utils/razorpay";

export default function CartPage() {
	const [cart, setCart] = useState([]);

	useEffect(() => {
		const stored = JSON.parse(localStorage.getItem("cart") || "[]");
		setCart(stored);
	}, []);

	const updateLocalStorage = (updatedCart) => {
		localStorage.setItem("cart", JSON.stringify(updatedCart));
		setCart(updatedCart);
	};

	const handleRemove = (index) => {
		const updatedCart = [...cart];
		updatedCart.splice(index, 1);
		localStorage.setItem("cart", JSON.stringify(updatedCart));
		setCart(updatedCart);
	};

	const handleQuantityChange = (id, delta) => {
		const updatedCart = cart.map((item) =>
			item._id === id
				? { ...item, quantity: Math.max(item.quantity + delta, 1) }
				: item
		);
		updateLocalStorage(updatedCart);
	};

	const totalAmount = cart.reduce((sum, item) => {
		return sum + Number(item.price) * Number(item.quantity);
	}, 0);

	// const handleCheckout = () => {
	// 	alert(`Checkout successful! Total ₹${totalAmount}`);
	// 	localStorage.removeItem("cart");
	// 	setCart([]);
	// };

	return (
		<div className="min-h-screen bg-gray-900 text-white">
			<NavBar />
			<div className="container mx-auto pt-32 pb-16">
				<h1 className="text-4xl font-bold mb-10">Your Cart</h1>
				{cart.length === 0 ? (
					<p>Your cart is empty.</p>
				) : (
					<>
						<ul className="space-y-4">
							{cart.map((item) => (
								<li
									key={item._id}
									className="bg-gray-800 p-4 rounded-lg flex items-center justify-between"
								>
									<div>
										<h2 className="text-xl font-semibold">{item.name}</h2>
										<p className="text-gray-400">
											₹{item.price} × {item.quantity} = ₹
											{item.price * item.quantity}
										</p>
									</div>
									<div className="flex items-center gap-2">
										<Button
											variant="outline"
											onClick={() => handleQuantityChange(item._id, -1)}
										>
											-
										</Button>
										<span>{item.quantity}</span>
										<Button
											variant="outline"
											onClick={() => handleQuantityChange(item._id, 1)}
										>
											+
										</Button>
										<Button
											variant="destructive"
											onClick={() => handleRemove(item._id)}
										>
											Remove
										</Button>
									</div>
								</li>
							))}
						</ul>
						<div className="mt-8 text-2xl text-right font-bold">
							Total: ₹{totalAmount}
						</div>
						<Button onClick={() => handlePayment(totalAmount)}>Checkout</Button>
					</>
				)}
			</div>
		</div>
	);
}
