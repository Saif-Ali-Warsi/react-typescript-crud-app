const API_URL = "https://jsonplaceholder.typicode.com/users";

export type User = {
  id: number;
  name: string;
  email: string;
};

export type UserInput = {
  name: string;
  email: string;
};

export async function getUsers(): Promise<User[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  return response.json();
}

export async function createUser(userData: UserInput): Promise<User> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error("Failed to create user");
  }

  return response.json();
}

export async function updateUser(
  id: number,
  userData: UserInput,
): Promise<User> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error("Failed to update user");
  }

  return response.json();
}

export async function deleteUser(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete user");
  }
}
