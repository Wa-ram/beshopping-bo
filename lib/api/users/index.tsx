import { api } from "..";

export async function getUserInfo() {
  // : Promise<AuthResponse>
  const response = await api.get("api/user");
  return response.data;
}
