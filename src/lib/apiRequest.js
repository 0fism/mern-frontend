import axios from "axios";

const apiRequest = axios.create({
    // baseURL: "https://mern-backend-uyrq.onrender.com/api",
    baseURL: "http://13.215.173.134:8080/api/",
    // baseURL: "http://localhost:8080/api",
    withCredentials: true,
});

export default apiRequest; 
