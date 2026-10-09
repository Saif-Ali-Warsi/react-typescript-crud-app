import { useEffect, useState } from "react";
import Header from "./components/Header";
import UserCard from "./components/UserCard";

type User = {
  id: number;
  name: string;
  email: string;
};

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          "https://jsonplaceholder.typicode.com/usqers",
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

  return (
    <>
      <Header title="I am Header" />
      
      {loading && <p>Loading Users...</p>}

      {error && <p> Error: {error} </p>}


      {!loading && !error && (
        <div>
          {users.map((user) => (
            <UserCard key={user.id} user={user}></UserCard>
          ))}
        </div>
      )}
    </>
  );
}

export default App;
