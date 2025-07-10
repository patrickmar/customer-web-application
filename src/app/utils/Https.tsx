import axios from "axios";
import { get, removeItem } from "./storage";
import AuthConstants from "@/app/config/authConstant";
import { useRouter } from "next/navigation";

// Create an Axios instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASEURL,
});

export const useNavigateAndClearToken = () => {
  const router = useRouter();
  const navigateAndClearToken = () => {
    removeItem(AuthConstants()); // Clear the expired token from local storage
    // Redirect to the login page
    router.push("/auth/login");
    //{ state: { from: location?.pathname }, replace: true}
  };

  return navigateAndClearToken;
};

// Add a request interceptor to add the Authorization header to each request
api.interceptors.request.use(
  (config) => {
    const user = get(AuthConstants());
    const token = user.token;
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

export default api;
