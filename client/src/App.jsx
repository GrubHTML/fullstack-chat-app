import { useEffect } from "react";
import Form from "./components/Form";
import socket from "./socket/socket";
import AppRouter from "./routes/AppRouter.jsx";

const App = () => {
  useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, []);
  return <AppRouter />;
};

export default App;
