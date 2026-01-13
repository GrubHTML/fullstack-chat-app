import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth.js";
import { z } from "zod";
import { axiosInstance } from "../api/axiosInstance.js";
import { useNavigate } from "react-router";
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

  return res.data;
};
const Signin = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); //useAuth(): Your custom hook - gets the login function to update auth context
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
    onSuccess: (data) => {
      // onSuccess runs when API call succeeds
      login(data.user, data.token); // update authContext with user info and token(comming from bckend send it as parameter of the function)
      navigate("/dashboard"); // redirects to dashboard page
    },
  });
  const onSubmit = (data) => {
    // when form is submitted and pass the validation this function runs. It triggers the muitation(API Call) with the form data
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
        {...register("usernameOrEmail")} // spreads all necessary props(onChange, onBlu, ref, name) onto the input. And connects this input to the form state
      />
      {/* Shows validation error if there is one and Optional chaining (?.) prevents errors if no error exists */}
      {errors.usernameOrEmail?.message}
      <input
        className="outline"
        placeholder="enter password"
        type="password"
        {...register("password")}
      />
      {errors.password?.message}

      {/* Button disabled while API call is in progress (prevents double-submission*/}
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
