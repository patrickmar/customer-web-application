import axios from "axios";

// Create an Axios instance
const paystackApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_PAYSTACK_BASEURL,
});

// Add a request interceptor to add the Authorization header to each request
paystackApi.interceptors.request.use(
  (config) => {
    const token = process.env.NEXT_PUBLIC_PAYSTACK_SECRET;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default paystackApi;
