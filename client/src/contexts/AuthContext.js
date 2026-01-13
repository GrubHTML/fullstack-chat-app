import { createContext } from "react";
export const AuthContext = createContext(null);

// emon ekta faka box (kind of global storage) create korlam jei box er moddhe kono data rakhle er vitorer shob component(tree component->downwards) e sei data gulo pabe without passing the props and it is the solution of props drilling.
/* 
1. createContext - Creates the Context Object
=> What it does:
 - Creates a new Context object (like creating a container/storage box)
 - You only do this ONCE per context
 - It's like declaring "Hey, I'm going to have a storage system called AuthContext"
Analogy: Creating a radio frequency/channel that will broadcast data
*/
