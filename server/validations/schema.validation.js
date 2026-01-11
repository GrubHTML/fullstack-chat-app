import { z } from "zod";
export const userValidationSchema = {
  signup: z.object({
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
  }),
  // signin: z.object({
  //   username: z
  //     .string()
  //     .trim()
  //     .min(3, { message: "Please enter minimum 3 letters" })
  //     .max(100, { message: "Name can not be more than 100 letters" }),
  //   email: z.email({ message: "Please enter a valid mail" }),
  //   password: z
  //     .string()
  //     .trim()
  //     .min(8, { message: "Please enter minimum 8 letters" })
  //     .max(30, { message: "Passwors can not be more than 30 letters" }),
  // }),
};
