import axios from "axios";
import { env } from "../config/env";

const apiClient = axios.create({
  baseURL: env.apiBaseUrl,
});

export default apiClient;