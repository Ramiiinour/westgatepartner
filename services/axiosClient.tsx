import axios from "axios";
import { urls } from "../data/custom-data/urls";


export const axiosClient = axios.create({
  baseURL: urls.baseUrl,
});
