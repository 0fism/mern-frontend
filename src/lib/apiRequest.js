import axios from "axios";

const apiRequest = axios.create({
    baseURL: "https://mern-backend-uyrq.onrender.com/api",
    // baseURL: "http://localhost:8080/api",
    withCredentials: true,
});

export default apiRequest; 
