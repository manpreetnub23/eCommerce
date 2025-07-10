import { useEffect, useState } from "react";
import { getProducts } from "../api/productApi";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import NavBar from "../components/NavBar";
import Navbar from "@/components/Navbar";

export default function HomePage() {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		getProducts().then((data) => setProducts(data.products || []));
	}, []);

	return (
		<div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
			{/* Navbar */}
			<NavBar />
			{/* Products Section */}
			<div className="container mx-auto pt-32 pb-16">
				<h1 className="text-5xl font-extrabold text-center mb-16">
					Our Products
				</h1>
				<div className="grid md:grid-cols-3 gap-10">
					{products.map((product) => (
						<Card
							key={product._id}
							className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl hover:scale-105 transition-transform duration-300"
						>
							<CardContent className="space-y-4 text-white">
								<h2 className="text-2xl font-semibold">{product.name}</h2>
								<p className="text-lg">₹{product.price}</p>
								<p>{product.description}</p>
								<p className="text-gray-300 italic">{product.category}</p>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</div>
	);
}
