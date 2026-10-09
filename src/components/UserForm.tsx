import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import * as yup from "yup";

type UserFormValues = {
  name: string;
  email: string;
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
};

function UserForm({ onCreateUser }: UserFormProps) {
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

  async function onSubmit(data: UserFormValues) {
    await onCreateUser(data);
    reset();
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h4>Create User</h4>
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
            {isSubmitting ? "Creating user..." : "Create User"}
          </button>
        </div>
      </form>
    </>
  );
}

export default UserForm;
