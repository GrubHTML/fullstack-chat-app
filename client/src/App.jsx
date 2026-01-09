import { useEffect } from "react";
import Form from "./components/Form";
import socket from "./socket/socket";

const App = () => {
  useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <div>
      <h1 className="text-3xl font-bold text-center my-10">
        Welcome to Mini Chat!
      </h1>
      <Form />
    </div>
  );
};

export default App;
