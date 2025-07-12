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
		);

		if (existingItemIndex !== -1) {
			storedCart[existingItemIndex].quantity += 1;
		} else {
			storedCart.push({
				id: product.id,
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
		return <div className="text-black text-center pt-32">Loading...</div>;

	return (
		<div className="min-h-screen bg-[#f8f8f8] text-black">
			<NavBar />
			<div className="container mx-auto pt-32 pb-16 flex justify-center items-center">
				<div className="bg-white rounded-3xl border border-gray-300 shadow-lg w-[65%] flex overflow-hidden">
					{/* Left Image */}
					<img
						src={`https://picsum.photos/seed/${product._id}/400/400`}
						alt={product.name}
						className="w-1/2 object-cover"
					/>

					{/* Right Content */}
					<div className="p-10 flex flex-col justify-center space-y-4 w-1/2">
						<h1 className="text-3xl font-bold">{product.name}</h1>
						<p className="text-xl font-semibold">₹{product.price}</p>
						<p className="text-gray-600">{product.description}</p>
						<p className="italic text-gray-500">{product.category}</p>
						{/* New About Section */}
						<div className="text-sm text-gray-500 mt-2">
							<strong>About:</strong>
							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
								vulputate odio at sapien tincidunt, non pulvinar neque tempus.
							</p>
							<p>
								Nunc porta, mauris non tincidunt dapibus, ligula augue fermentum
								velit, nec bibendum nisi erat ac enim.
							</p>
						</div>
						<div className="flex gap-4 mt-4">
							<Button
								className="flex-1 bg-black text-white rounded-full hover:bg-gray-800"
								onClick={handleAddToCart}
							>
								Add to Cart
							</Button>
							<Button
								className="flex-1 bg-white border border-black text-black rounded-full hover:bg-gray-200"
								onClick={handleBuyNow}
							>
								Buy Now
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
