import axios from "axios";
import type { User, UserInput } from "./userService";

const API_URL = "https://jsonplaceholder.typicode.com/users";

export async function getUsersWithAxios(): Promise<User[]> {
  const response = await axios.get<User[]>(API_URL);

  return response.data;
}

export async function createUserWithAxios(userData: UserInput): Promise<User> {
  const response = await axios.post<User>(API_URL, userData);

  return response.data;
}
