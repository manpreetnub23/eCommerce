import axios from "axios";
const API_URL = "http://localhost:3000/api/payment/create-order";

export const createOrder = async (amount) => {
	try {
		const { data } = await axios.post(API_URL, { amount });
		return data;
	} catch (error) {
		console.error("Error creating order:", error);
		throw error;
	}
};
