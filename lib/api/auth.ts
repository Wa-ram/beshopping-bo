import { api } from ".";

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  password_confirmation: string;
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
  const response = await api.post("api/login", credentials);
  return response.data;
}

export async function register(data: RegisterData) {
  // : Promise<AuthResponse>
  const response = await api.post("api/register", data);
  return response.data;
}

// Get CSRF cookie - called once on app initialization
export async function getCsrfToken() {
  await api.get("sanctum/csrf-cookie");
}
