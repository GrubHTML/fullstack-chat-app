import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { axiosInstance } from "../api/axiosInstance.js";
const signinSchema = z.object({
  usernameOrEmail: z
    .string()
    .min(3, "Username বা Email আবশ্যক")
    .refine(
      (val) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || /^[a-zA-Z0-9_]+$/.test(val),
      {
        message: "সঠিক Username বা Email দিন",
      }
    ),

  password: z
    .string()
    .trim()
    .min(8, { message: "password must be atleast 8 character" })
    .max(30, { message: "Can not be more than 30 letter long" }),
});
const inputPostAxios = async (formData) => {
  const res = await axiosInstance.post("/api/signin", {
    usernameOrEmail: formData.usernameOrEmail,
    password: formData.password,
  });
  console.log(res.data);
  return res.data;
};
const Signin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      usernameOrEmail: "",
      password: "",
    },
  });
  const { isPending, error, mutate } = useMutation({
    mutationFn: inputPostAxios,
  });
  const onSubmit = (data) => {
    // console.log("Form Data is valid:", data);
    mutate(data);
  };
  return (
    <form
      className="flex flex-col gap-3 justify-center items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        className="outline"
        placeholder="enter username or email"
        {...register("usernameOrEmail")}
      />
      {errors.usernameOrEmail?.message}
      <input
        className="outline"
        placeholder="enter password"
        type="password"
        {...register("password")}
      />
      {errors.password?.message}

      <button className="border rounded-3xl" disabled={isPending} type="submit">
        {isPending ? "Singing in..." : "Sign IN"}
      </button>
      {/* {error && <p>{error.message}</p>} */}
      {error && <p>{error.response?.data?.message}</p>}
      {/* {error && (
        <p className="text-red-500">
          {error.response?.data?.message || error.message}
        </p>
      )} */}
    </form>
  );
};

export default Signin;
