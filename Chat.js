import {
  AttachFile,
  Camera,
  InsertEmoticon,
  Mic,
  MoreVert,
  SearchOutlined,
} from "@mui/icons-material";
import { Avatar, IconButton, Button } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import "./Chat.css";
import db from "./firebase";
import { useStateValue } from "./StateProvider";
import firebase from "firebase";
import { AccountContext } from "./AccountProvider";
import WebCamCapture from "./WebCamCapture";

function Chat() {
  const history = useHistory();
  const [seed, setSeed] = useState("");
  const [input, setInput] = useState("");
  const [userName, setUserName] = useState("");
  const [messages, setMessages] = useState([]);
  const { userId } = useParams();
  const [{ user }, dispatch] = useStateValue();
  const { account, setAccount } = useContext(AccountContext);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [userId]);

  useEffect(() => {
    if (userId) {
      db.collection("users")
        .doc(userId)
        .onSnapshot((snapshot) => setUserName(snapshot.data().name));

      db.collection("users")
        .doc(userId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [userId]);

  const sendMessage = (e) => {
    e.preventDefault();
    console.log("You typed: ", input);
    db.collection("users").doc(userId).collection("messages").add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };

  const openCamera = () => {
    console.log("Clicked");
    history.push("/capture");
  };

  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar src={account.user.photoURL} />
        <div className="chat_headerInfo">
          <h3>{userName}</h3>
          <p>
            Last seen at
            {new Date(
              messages[messages.length - 1]?.timestamp?.toDate()
            ).toLocaleTimeString()}
          </p>
        </div>
        <div className="chat_headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat_body">
        {messages.map((message) => (
          <p
            className={`chat_message ${
              message.name === user.displayName && "chat_reciever"
            }`}
          >
            <span className="chat_name">{message.name}</span>
            {message.message}
            <span className="chat_timestamp">
              {new Date(message.timestamp?.toDate()).toLocaleTimeString()}
            </span>
          </p>
        ))}
      </div>
      <div className="chat_footer">
        <InsertEmoticon />
        <Button onClick={openCamera}>
          <Camera />
        </Button>
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Type a message"
          />
          <button onClick={sendMessage} type="submit">
            Send
          </button>
        </form>
        <Mic />
      </div>
    </div>
  );
}

export default Chat;
