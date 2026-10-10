import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

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
    .email("Enter valid email"),
});

type UserFormProps = {
  onCreateUser: (user: UserFormValues) => Promise<void>;
  onUpdateUser: (id: number, user: UserFormValues) => Promise<void>;
  selectedUser: User | null;
  onCancelEdit: () => void;
};

function UserForm({
  onCreateUser,
  onUpdateUser,
  selectedUser,
  onCancelEdit,
}: UserFormProps) {
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
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h4>{selectedUser ? "Edit User" : "Create User"}</h4>

        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Enter name"
            {...register("name")}
          />

          {errors.name && <p>{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            placeholder="Enter email"
            {...register("email")}
          />

          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? "Saving..."
              : selectedUser
                ? "Update User"
                : "Create User"}
          </button>
        </div>

        <div>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}

export default UserForm;
