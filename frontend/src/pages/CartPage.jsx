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

	const handleRemove = (id) => {
		const updatedCart = cart.filter((item) => String(item.id) !== String(id));
		updateLocalStorage(updatedCart);
	};

	const handleQuantityChange = (id, delta) => {
		const updatedCart = cart.map((item) =>
			String(item.id) === String(id)
				? { ...item, quantity: Math.max(item.quantity + delta, 1) }
				: item
		);
		updateLocalStorage(updatedCart);
	};

	const totalAmount = cart.reduce((sum, item) => {
		const price = Number(item.price);
		const quantity = Number(item.quantity);
		return sum + price * quantity;
	}, 0);

	return (
		<div className="min-h-screen bg-white text-black">
			<NavBar />
			<div className="container mx-auto pt-32 pb-16">
				<h1 className="text-4xl font-bold mb-10">Your Cart</h1>
				{cart.length === 0 ? (
					<p>Your cart is empty.</p>
				) : (
					<>
						<ul className="space-y-6">
							{cart.map((item) => (
								<li
									key={item._id}
									className="bg-gray-100 p-6 rounded-lg flex items-center gap-6 shadow-md min-h-[180px]"
								>
									<img
										src={
											item.image ||
											`https://picsum.photos/seed/${item._id}/400/400`
										}
										alt={item.name}
										className="w-28 h-28 rounded object-cover"
									/>
									<div className="flex-1">
										<h2 className="text-xl font-semibold">{item.name}</h2>
										<p className="text-gray-600 mb-2">
											₹{item.price} × {item.quantity} = ₹
											{item.price * item.quantity}
										</p>
										<p className="italic text-sm text-gray-500">
											Lorem ipsum dolor sit amet, consectetur adipiscing elit.
											Vivamus luctus justo sed tortor tincidunt, ac pharetra
											nisl luctus.
										</p>
									</div>
									<div className="flex flex-col items-center gap-2">
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
										</div>
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
						<div className="mt-10 flex justify-end items-center gap-4 text-xl font-bold">
							<span>Total: ₹{totalAmount}</span>
							<Button onClick={() => handlePayment(totalAmount)}>
								Checkout
							</Button>
						</div>
					</>
				)}
			</div>
		</div>
	);
}
