import { useEffect, useState } from "react";
import Header from "./components/Header";
import UserCard from "./components/UserCard";
import UserForm from "./components/UserForm";

type User = {
  id: number;
  name: string;
  email: string;
};

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users",
        );

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data: User[] = await response.json();

        setUsers(data);
      } catch (error: unknown) {
        const message =
          error instanceof Error ? error.message : "Something Went Wrong";

        setError(message);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  async function handleCreateUser(userData: { name: string; email: string }) {
    try {
      setError(null);
      setSuccess(null);

      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to create User");
      }

      const createdUser: User = await response.json();

      setUsers((previousUsers) => [createdUser, ...previousUsers]);

      setSuccess("User Created Successfully!");
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";

      setError(message);
      throw error;
    }
  }

  async function handleUpdateUser(
    id: number,
    userData: { name: string; email: string },
  ) {
    try {
      setError(null);
      setSuccess(null);

      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "json/application",
          },
          body: JSON.stringify(userData),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      const updatedUser: User = await response.json();

      setUsers((previouseUsers) =>
        previouseUsers.map((user) =>
          user.id === id ? { ...user, ...updatedUser } : user,
        ),
      );

      setSelectedUser(null);

      setSuccess("User updated successfully!");
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";

      setError(message);
      throw error;
    }
  }

  async function handleDeleteUser(id: number) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?",
    );

    if (!confirmed) {
      return;
    }

    try {
      setError(null);
      setSuccess(null);

      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      setUsers((previousUsers) =>
        previousUsers.filter((user) => user.id !== id),
      );

      setSuccess("User deleted successfully!");
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";

      setError(message);
    }
  }

  return (
    <>
      <Header title="I am Header" />

      {loading && <p>Loading Users...</p>}

      {error && <p className="error-msg"> Error: {error} </p>}

      {success && <p className="success-msg">{success}</p>}

      <UserForm
        onCreateUser={handleCreateUser}
        onUpdateUser={handleUpdateUser}
        selectedUser={selectedUser}
        onCancelEdit={() => setSelectedUser(null)}
      ></UserForm>

      {!loading && !error && (
        <div>
          {users.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onEdit={setSelectedUser}
              onDelete={handleDeleteUser}
            ></UserCard>
          ))}
        </div>
      )}
    </>
  );
}

export default App;
