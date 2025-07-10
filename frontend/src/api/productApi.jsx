import axios from "axios";

// Ye hai backend API ka base URL
const API_URL = "http://localhost:3000/api/products/";

// ✅ Get All Products (for homepage and admin dashboard)
export const getProducts = async () => {
	const res = await axios.get(API_URL);
	return res.data;
};

// ✅ Delete Product (for admin dashboard)
export const deleteProduct = async (id) => {
	console.log("delete product function mein bhi aaya hai");
	const res = await axios.delete(`${API_URL}${id}`);
	return res.data;
};

// ✅ Create Product (optional, for future admin panel)
export const createProduct = async (productData) => {
	const res = await axios.post(API_URL, productData);
	return res.data;
};

// ✅ Update Product (optional, for future admin panel)
export const updateProduct = async (id, productData) => {
	const res = await axios.put(`${API_URL}${id}`, productData);
	return res.data;
};
