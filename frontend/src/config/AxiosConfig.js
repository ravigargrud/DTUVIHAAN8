import axios from "axios";

const config = axios.create({
  baseURL: "http://localhost:8000",
});

export default config;
