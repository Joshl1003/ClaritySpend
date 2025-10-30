import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://127.0.0.1:8000", // your FastAPI URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
