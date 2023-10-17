import axios from "axios";

const baseUrl = "http://localhost:5000/api";

export const axiosRequest = axios.create({
  baseURL: baseUrl,
});

// export const userRequest = axios.create({
//   baseURL: baseUrl,
//   headers: { token: `Bearer ${token}` },
// });
