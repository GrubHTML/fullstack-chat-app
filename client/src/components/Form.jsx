import { useEffect, useState } from "react";
import socket from "../socket/socket";

const Form = () => {
  const [myName, setMyName] = useState("");
  const [myText, setMyText] = useState("");
  const [frontMessages, setFrontMessages] = useState([]);
  const [myRoom, setMyRoom] = useState("");

  useEffect(() => {
    socket.on("chat", (message) => {
      setFrontMessages((prevMsg) => [...prevMsg, message]);
    });
    return () => {
      socket.off("chat");
    };
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    // console.log("info: ", myName, myRoom, myText);
    socket.emit("chat", { myName, myText, myRoom });
    // setMyRoom("");
    setMyText("");
  }
  return (
    <>
      {" "}
      <div>
        <h2 className="text-xl mx-10">Messages: </h2>
        <div className="bg-red-100 rounded-xl p-4 mt-4 mb-10 mx-10">
          {frontMessages.length > 0 ? (
            frontMessages.map((myValue, myIndex) => (
              <p key={myIndex}>
                <span className="me-2 font-bold">{myValue.myName}:</span>
                <span>{myValue.myText}</span>
              </p>
            ))
          ) : (
            <p>No Messages available!</p>
          )}
        </div>
      </div>
      <form action="" className="flex justify-center items-center flex-col">
        <div className="mb-5">
          <label htmlFor="" className="me-2">
            Enter Room Name:
          </label>
          <input
            type="text"
            className="border"
            value={myRoom}
            onChange={(e) => {
              setMyRoom(e.target.value);
            }}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="" className="me-2">
            Enter Your Name:
          </label>
          <input
            type="text"
            className="border"
            value={myName}
            onChange={(e) => {
              setMyName(e.target.value);
            }}
          />
        </div>

        <div>
          <label htmlFor="" className="me-2">
            Enter Your Message:
          </label>
          <textarea
            name=""
            className="border"
            value={myText}
            onChange={(e) => {
              setMyText(e.target.value);
            }}
          ></textarea>
        </div>
        <button className="border" onClick={(e) => handleSubmit(e)}>
          Send
        </button>
      </form>
    </>
  );
};

export default Form;
