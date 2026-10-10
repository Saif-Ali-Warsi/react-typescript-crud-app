
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type UserFormValues = {
  name: string;
  email: string;
};

type User = UserFormValues & {
  id: number;
};

const userSchema = yup.object({
  name: yup
    .string()
    .trim()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters"),
  email: yup
    .string()
    .trim()
    .required("Email is required")
    .email("Enter a valid email address"),
});

type UserFormWithAxiosProps = {
  onCreateUser: (user: UserFormValues) => Promise<void>;
  onUpdateUser: (
    id: number,
    user: UserFormValues
  ) => Promise<void>;
  selectedUser: User | null;
  onCancelEdit: () => void;
};

function UserFormWithAxios({
  onCreateUser,
  onUpdateUser,
  selectedUser,
  onCancelEdit,
}: UserFormWithAxiosProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UserFormValues>({
    resolver: yupResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  useEffect(() => {
    reset({
      name: selectedUser?.name ?? "",
      email: selectedUser?.email ?? "",
    });
  }, [selectedUser, reset]);

  async function onSubmit(data: UserFormValues) {
    if (selectedUser) {
      await onUpdateUser(selectedUser.id, data);
    } else {
      await onCreateUser(data);
    }

    reset({ name: "", email: "" });
  }

  function handleCancel() {
    reset({ name: "", email: "" });
    onCancelEdit();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>{selectedUser ? "Edit User" : "Create User"}</h2>

      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          placeholder="Enter name"
          {...register("name")}
        />
        {errors.name && <p role="alert">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="Enter email"
          {...register("email")}
        />
        {errors.email && <p role="alert">{errors.email.message}</p>}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting
          ? "Saving..."
          : selectedUser
            ? "Update User"
            : "Create User"}
      </button>

      {selectedUser && (
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      )}
    </form>
  );
}

export default UserFormWithAxios;
