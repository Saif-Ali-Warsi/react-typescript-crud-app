type User = {
  id: number;
  name: string;
  email: string;
};

type UserCardProps = {
  user: User;
  onEdit: (user: User) => void;
};

function UserCard({ user, onEdit }: UserCardProps) {
  return (
    <>
      <h2>{user.name}</h2>
      <p>{user.email}</p>

      <button type="button" onClick={() => onEdit(user)}>EDIT</button>
    </>
  );
}

export default UserCard;
