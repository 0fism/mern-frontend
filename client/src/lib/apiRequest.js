import axios from "axios";

const apiRequest = axios.create({
    baseURL: "https://mern-backend-uyrq.onrender.com/api",
    withCredentials: true,
});

export default apiRequest; 
