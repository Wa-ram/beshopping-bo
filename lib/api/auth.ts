import axios from "axios";

const api = axios.create({
  baseURL: "https://beshopping-api.designtheflow.com/",
  // process.env.BASE_URL_API ,
  withCredentials: true, // This is required for cookies to be sent
});

// Add request interceptor to include CSRF token
api.interceptors.request.use((config) => {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("XSRF-TOKEN"))
    ?.split("=")[1];

  console.log(token);

  if (token) {
    config.headers["X-XSRF-TOKEN"] = token;
  }
  return config;
});

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// interface AuthResponse {
//   token: string;
//   user: {
//     id: string;
//     email: string;
//     firstName: string;
//     lastName: string;
//   };
// }

export async function login(credentials: LoginCredentials) {
  // : Promise<AuthResponse>
  const response = await api.post("/api/login", credentials);
  return response.data;
}

export async function register(data: RegisterData) {
  // : Promise<AuthResponse>
  const response = await api.post("/api/register", data);
  return response.data;
}

// Get CSRF cookie - called once on app initialization
export async function getCsrfToken() {
  await api.get("/sanctum/csrf-cookie");
}
