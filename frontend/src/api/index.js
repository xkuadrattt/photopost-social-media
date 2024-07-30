import axios from "axios";

const axiosInit = axios.create({
	baseURL: "http://localhost:3000/api",
	timeout: 18000,
	headers: {
		Authorization: "Bearer",
		"Content-Type": "application/json",
	},
});

export default axiosInit;
