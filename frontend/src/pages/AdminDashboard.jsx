import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	getProducts,
	deleteProduct,
	createProduct,
	updateProduct,
} from "../api/productApi";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";

const productSchema = z.object({
	name: z.string().min(1, "Product name is required"),
	price: z
		.number({ invalid_type_error: "Price must be a number" })
		.min(0, "Price cannot be negative"),
	description: z.string().min(1, "Description is required"),
	category: z.string().min(1, "Category is required"),
});

export default function AdminDashboard() {
	const navigate = useNavigate();
	const [products, setProducts] = useState([]);
	const [showForm, setShowForm] = useState(false);
	const [editingProduct, setEditingProduct] = useState(null);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(productSchema),
		defaultValues: {
			name: "",
			price: "",
			description: "",
			category: "",
		},
	});

	useEffect(() => {
		if (localStorage.getItem("isAdmin") !== "true") {
			navigate("/admin-secret-panel");
		} else {
			fetchProducts();
		}
	}, []);

	const fetchProducts = async () => {
		const data = await getProducts();
		setProducts(data.products || []);
	};

	const handleDelete = async (id) => {
		await deleteProduct(id);
		fetchProducts();
	};

	const handleLogout = () => {
		localStorage.removeItem("isAdmin");
		navigate("/");
	};

	const onSubmit = async (data) => {
		if (editingProduct) {
			// Update existing product
			await updateProduct(editingProduct._id, data);
			setEditingProduct(null);
		} else {
			// Create new product
			await createProduct(data);
		}
		reset();
		setShowForm(false);
		fetchProducts();
	};

	return (
		<div className="bg-gray-900 min-h-screen text-white">
			<Navbar />
			<div className="container mx-auto py-10 pt-24">
				<div className="flex justify-between items-center mb-8">
					<h1 className="text-3xl font-bold">Admin Dashboard</h1>
					<Button onClick={handleLogout}>Logout</Button>
				</div>

				<Button
					className="mb-6"
					onClick={() => {
						setShowForm((prev) => !prev);
						setEditingProduct(null);
						reset();
					}}
				>
					{showForm ? "Cancel" : "Add New Product"}
				</Button>

				{showForm && (
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="bg-gray-800 p-6 rounded-lg shadow-md mb-10 space-y-4"
					>
						<h2 className="text-2xl font-bold mb-4">
							{editingProduct ? "Edit Product" : "Add New Product"}
						</h2>

						<div>
							<Input
								placeholder="Product Name"
								{...register("name")}
								className={errors.name ? "border-red-500" : ""}
							/>
							{errors.name && (
								<p className="text-red-500 text-sm">{errors.name.message}</p>
							)}
						</div>

						<div>
							<Input
								placeholder="Price"
								type="number"
								step="0.01"
								{...register("price", { valueAsNumber: true })}
								className={errors.price ? "border-red-500" : ""}
							/>
							{errors.price && (
								<p className="text-red-500 text-sm">{errors.price.message}</p>
							)}
						</div>

						<div>
							<Textarea
								placeholder="Description"
								{...register("description")}
								className={errors.description ? "border-red-500" : ""}
							/>
							{errors.description && (
								<p className="text-red-500 text-sm">
									{errors.description.message}
								</p>
							)}
						</div>

						<div>
							<Input
								placeholder="Category"
								{...register("category")}
								className={errors.category ? "border-red-500" : ""}
							/>
							{errors.category && (
								<p className="text-red-500 text-sm">
									{errors.category.message}
								</p>
							)}
						</div>

						<Button type="submit" className="w-full">
							{editingProduct ? "Update Product" : "Create Product"}
						</Button>
					</form>
				)}

				<div className="grid md:grid-cols-2 gap-6">
					{products.map((product, index) => (
						<Card
							key={`${product._id}-${index}`}
							className="shadow-lg bg-gray-800"
						>
							<CardContent className="p-4 space-y-2 text-gray-200">
								<h2 className="text-xl font-semibold">{product.name}</h2>
								<p>₹{product.price}</p>
								<p>{product.description}</p>
								<p className="italic text-gray-400">{product.category}</p>
								<div className="flex gap-3">
									<Button
										variant="destructive"
										onClick={() => handleDelete(product._id)}
									>
										Delete
									</Button>
									<Button
										variant="secondary"
										onClick={() => {
											setEditingProduct(product);
											setShowForm(true);
											reset(product);
										}}
									>
										Edit
									</Button>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</div>
	);
}
