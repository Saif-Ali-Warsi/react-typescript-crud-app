import { useEffect, useState } from "react";
import Header from "./components/Header";
import UserCard from "./components/UserCard";
import UserForm from "./components/UserForm";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  type User,
  type UserInput,
} from "./services/userService";

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

        const data = await getUsers();

        setUsers(data);
      } catch (error: unknown) {
        const message =
          error instanceof Error ? error.message : "Something went wrong";

        setError(message);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  async function handleCreateUser(userData: UserInput) {
    try {
      setError(null);
      setSuccess(null);

      const createdUser = await createUser(userData);

      setUsers((previousUsers) => [createdUser, ...previousUsers]);

      setSuccess("User created successfully!");
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

      const updatedUser = await updateUser(id, userData);

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

      await deleteUser(id);

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
