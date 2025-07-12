import { useEffect, useState } from "react";
import { getProducts } from "../api/productApi";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
	const [products, setProducts] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		getProducts().then((data) => setProducts(data.products || []));
	}, []);

	const handleProductClick = (productId) => {
		navigate(`/product/${productId}`);
	};

	return (
		<div className="min-h-screen bg-[#F9F9F9] text-black">
			<NavBar />
			<div className="container mx-auto pt-32 pb-20">
				<h1 className="text-4xl md:text-5xl font-extrabold text-center mb-16">
					Our Collection
				</h1>
				<div className="grid md:grid-cols-3 gap-10">
					{products.map((product) => (
						<Card
							key={product._id}
							className="bg-white rounded-3xl p-6 shadow-lg hover:scale-[1.02] transition duration-300 cursor-pointer"
							onClick={() => handleProductClick(product._id)}
						>
							<CardContent className="space-y-4">
								<img
									src={`https://picsum.photos/seed/${product._id}/400/400`}
									alt={product.name}
									className="rounded-2xl w-full h-48 object-cover"
								/>
								<h2 className="text-2xl font-semibold">{product.name}</h2>
								<p className="text-lg">₹{product.price}</p>
								<p className="text-gray-600">{product.description}</p>
								<Button
									onClick={(e) => {
										e.stopPropagation();
										handleProductClick(product._id);
									}}
									className="w-full bg-black text-white rounded-full hover:bg-gray-800"
								>
									View Details
								</Button>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</div>
	);
}
