import Header from "./components/Header";
import UserCard from "./components/UserCard";

type User = {
  id: number;
  name: string;
  email: string;
};

function App() {
  const users: User[] = [
    {
      id: 1,
      name: "Ron",
      email: "ron@example.com",
    },
    {
      id: 2,
      name: "Ken",
      email: "ken@example.com",
    },
  ];

  return (
    <>
      <Header title="I am Header" />

      {users.map((user) => (
        <UserCard key={user.id} user={user}></UserCard>
      ))}
    </>
  );
}

export default App;
