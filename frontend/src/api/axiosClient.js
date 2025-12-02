import axios from "axios";

export default axios.create({
  baseURL: "https://fittrack-pro-s5z6.onrender.com", //  your render URL
  withCredentials: false
});
