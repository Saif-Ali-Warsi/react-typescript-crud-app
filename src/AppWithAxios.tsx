
import { useEffect, useState } from "react";
import Header from "./components/Header";
import UserCard from "./components/UserCard";
import UserFormWithAxios from "./components/UserFormWithAxios";

import {
  getUsersWithAxios,
  createUserWithAxios,
  updateUserWithAxios,
  deleteUserWithAxios,
} from "./services/userServiceWithAxios";

import type { User, UserInput } from "./services/userService";

function AppWithAxios() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true);
        setError(null);

        const data = await getUsersWithAxios();
        setUsers(data);
      } catch (error: unknown) {
        const message =
          error instanceof Error
            ? error.message
            : "Something went wrong";

        setError(message);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  async function handleCreateUser(userData: UserInput) {
    setError(null);
    setSuccess(null);

    try {
      const createdUser = await createUserWithAxios(userData);

      setUsers((previousUsers) => [createdUser, ...previousUsers]);
      setSuccess("User created successfully!");
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong";

      setError(message);
      throw error;
    }
  }

  async function handleUpdateUser(
    id: number,
    userData: UserInput
  ) {
    setError(null);
    setSuccess(null);

    try {
      const updatedUser = await updateUserWithAxios(id, userData);

      setUsers((previousUsers) =>
        previousUsers.map((user) =>
          user.id === id ? { ...user, ...updatedUser } : user
        )
      );

      setSelectedUser(null);
      setSuccess("User updated successfully!");
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong";

      setError(message);
      throw error;
    }
  }

  async function handleDeleteUser(id: number) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmed) return;

    setError(null);
    setSuccess(null);

    try {
      await deleteUserWithAxios(id);

      setUsers((previousUsers) =>
        previousUsers.filter((user) => user.id !== id)
      );

      setSuccess("User deleted successfully!");
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong";

      setError(message);
    }
  }

  return (
    <>
      <Header title="React CRUD Application - Axios" />

      <UserFormWithAxios
        onCreateUser={handleCreateUser}
        onUpdateUser={handleUpdateUser}
        selectedUser={selectedUser}
        onCancelEdit={() => setSelectedUser(null)}
      />

      {loading && <p>Loading users...</p>}

      {error && <p role="alert">Error: {error}</p>}

      {success && <p role="status">{success}</p>}

      {!loading && !error && (
        <div>
          {users.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onEdit={setSelectedUser}
              onDelete={handleDeleteUser}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default AppWithAxios;
