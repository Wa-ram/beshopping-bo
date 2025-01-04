import axios from "axios";

export const api = axios.create({
  baseURL:
    process.env.BASE_URL_API || "https://beshopping-api.designtheflow.com/",
  withCredentials: true, // This is required for cookies to be sent
  withXSRFToken: true,
});

// Add request interceptor to include CSRF token
{
  /*api.interceptors.request.use((config) => {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("XSRF-TOKEN"))
    ?.split("=")[1];

  config.headers["X-XSRF-TOKEN"] =
    "eyJpdiI6IjFFWGw3SXR2bFNWZ1hYNWM4ekxvT3c9PSIsInZhbHVlIjoiZTdEdjRKQkJhQ1NIczBpbG9OMmhvTDlaTE1DSENkQUhRcUlMYmQzNE1JMUhQeitLckR1NGwvWnlsclJxZzlnbWxRK0d0bFlKSDZCaW9LdUg3SlBVY214bE9SOXdsSDBDZGhXYnMvMmJ3UlFaWHNrcElUZjRUZXpFRlUxd095L04iLCJtYWMiOiI3NTM1MmEyNDZkNDZjMzE3MGE2NTgwODliMzU0Zjg0ZjM1N2Y0NWI1MTBlYjAyMTBhYzk5ZWMwMjVjZTVkNWE2IiwidGFnIjoiIn0";
  // Log pour vérifier le token
  if (token) {
    console.log("CSRF Token found:", token);
  } else {
    console.warn("CSRF Token not found in cookies.");
  }

  return config;
});*/
}
