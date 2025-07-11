import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductById } from "../api/productApi";
import { Button } from "@/components/ui/button";
import NavBar from "@/components/Navbar";

export default function ProductDetails() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [product, setProduct] = useState(null);

	useEffect(() => {
		getProductById(id).then((data) => {
			setProduct(data.product);
		});
	}, [id]);

	const handleAddToCart = () => {
		const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
		const existingItemIndex = storedCart.findIndex(
			(item) => item.name === product.name
		); // Use unique field here

		if (existingItemIndex !== -1) {
			storedCart[existingItemIndex].quantity += 1;
		} else {
			storedCart.push({
				id: product.id, // Use id if available
				name: product.name,
				price: Number(product.price),
				quantity: 1,
			});
		}

		localStorage.setItem("cart", JSON.stringify(storedCart));
		alert("Added to cart!");
	};

	const handleBuyNow = () => {
		let cart = JSON.parse(localStorage.getItem("cart") || "[]");
		cart.push(product);
		localStorage.setItem("cart", JSON.stringify(cart));
		navigate("/cart");
	};

	if (!product)
		return <div className="text-white text-center pt-32">Loading...</div>;

	return (
		<div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
			<NavBar />
			<div className="container mx-auto pt-32 pb-16 flex justify-center items-center">
				<div className="bg-white/10 backdrop-blur-md p-10 rounded-2xl border border-white/20 shadow-2xl max-w-md w-full text-center space-y-6">
					<h1 className="text-4xl font-extrabold">{product.name}</h1>
					<p className="text-2xl text-green-400">₹{product.price}</p>
					<p className="text-lg">{product.description}</p>
					<p className="italic text-gray-300">{product.category}</p>
					<div className="flex gap-4">
						<Button className="flex-1" onClick={handleAddToCart}>
							Add to Cart
						</Button>
						<Button
							className="flex-1 bg-white text-black hover:bg-gray-300"
							onClick={handleBuyNow}
						>
							Buy Now
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
