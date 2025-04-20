// axiosConfig.js
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:7203",
});

export default instance;
