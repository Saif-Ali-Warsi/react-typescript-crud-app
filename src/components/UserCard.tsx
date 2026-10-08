type User = {
  id: number;
  name: string;
  email: string;
};

type UserCardProps = {
  user: User;
};

function UserCard({ user }: UserCardProps) {
  return (
    <>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </>
  );
}

export default UserCard;
