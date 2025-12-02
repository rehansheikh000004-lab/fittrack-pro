import axios from "axios";

export default axios.create({
  baseURL: "https://fittrack-pro-backend.onrender.com", // <- your backend URL
});
