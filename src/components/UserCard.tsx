type User = {
  id: number;
  name: string;
  email: string;
};

type UserCardProps = {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
};

function UserCard({ user, onEdit, onDelete }: UserCardProps) {
  return (
    <>
      <h2>{user.name}</h2>
      <p>{user.email}</p>

      <button type="button" onClick={() => onEdit(user)}>
        EDIT
      </button>

      <button type="button" onClick={() => onDelete(user.id)}>DELETE</button>
    </>
  );
}

export default UserCard;
