import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext.js";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("must be inside authcontext provider, wrap it...");

  return context;
};
// oi faka box j banalam sei box er moddhe ki ache seta jana/read korara jnno ei custom hook banaisi. useContext basically reads/consumes the Context.
/*
2. useContext - Reads/Consumes the Context
=> What it does:
- Reads/accesses the current value from an existing Context
- You use this every time you want to get data from the context
- It's like saying "Give me the current value from AuthContext"
Analogy: Tuning your radio to listen to that frequency/channel
 */
