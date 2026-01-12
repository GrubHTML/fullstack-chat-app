import { axiosInstance } from "../api/axiosInstance.js";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

const signupInputSchema = z.object({
  firstname: z
    .string()
    .trim()
    .min(3, { message: "Please enter minimum 3 letters" })
    .max(100, { message: "Name can not be more than 100 letters" }),
  lastname: z
    .string()
    .trim()
    .min(3, { message: "Please enter minimum 3 letters" })
    .max(100, { message: "Name can not be more than 100 letters" }),
  username: z
    .string()
    .trim()
    .min(3, { message: "Please enter minimum 3 letters" })
    .max(100, { message: "Name can not be more than 100 letters" }),
  email: z.email({ message: "Please enter a valid mail" }),
  password: z
    .string()
    .trim()
    .min(8, { message: "Please enter minimum 8 letters" })
    .max(30, { message: "Passwors can not be more than 30 letters" }),
  Profile: z.object({
    avatar: z.string().optional(),
    bio: z
      .string()
      .trim()
      .min(3, { message: "Please enter minimum 3 letters" })
      .max(100, { message: "Passwors can not be more than 100 letters" }),
    address: z
      .string()
      .trim()
      .min(3, { message: "Please enter minimum 3 letters" })
      .max(100, { message: "Passwors can not be more than 100 letters" }),
  }),
});
// const signUpPostAxios = async (formdata) => {
//   const res = await axiosInstance.post("/api/signup", {
//     firstname: formdata.firstname,
//     lastname: formdata.lastname,
//     username: formdata.username,
//     email: formdata.email,
//     password: formdata.password,
//     Profile: formdata.Profile,
//   });
//   return res.data;
// };
const signUpPostAxios = async (formdata) => {
  const res = await axiosInstance.post("/api/signup", formdata);
  return res.data;
};

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupInputSchema),
  });
  const { isPending, error, mutate } = useMutation({
    mutationFn: signUpPostAxios,
  });
  const onSubmit = (data) => {
    console.log("all data", data);
    mutate(data);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-3 justify-center items-center mt-10"
    >
      <input
        className="border-2 mb-1"
        placeholder="Enter your first name"
        {...register("firstname")}
      />
      {errors.firstname?.message}
      <input
        className="border-2 mb-1"
        placeholder="Enter your last name"
        {...register("lastname")}
      />
      {errors.lastname?.message}
      <input
        className="border-2 mb-1"
        placeholder="Enter your username"
        {...register("username")}
      />
      {errors.username?.message}
      <input
        className="border-2 mb-1"
        placeholder="Enter your email"
        {...register("email")}
      />
      {errors.email?.message}
      <input
        className="border-2 mb-1"
        placeholder="Enter your password"
        {...register("password")}
      />
      {errors.password?.message}
      <input
        className="border-2 mb-1"
        placeholder="Enter your biography"
        {...register("Profile.bio")}
      />
      {errors.Profile?.bio?.message}
      <input
        className="border-2 mb-1"
        placeholder="avatar (optional)"
        {...register("Profile.avatar")}
      />
      {errors.Profile?.avatar?.message}
      <input
        className="border-2 mb-1"
        placeholder="Enter your address"
        {...register("Profile.address")}
      />
      {errors.Profile?.address?.message}

      <button disabled={isPending} className="border-2">
        {isPending ? "Creating" : "Sign Up"}
      </button>
      {error && error.response?.data?.message}
      {error && error?.message}
    </form>
  );
};

export default Signup;
