import { Avatar } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AccountContext } from "./AccountProvider";
import db from "./firebase";
import "./SidebarChat.css";

function SidebarChat({ id, name, addNewChat }) {
  const [seed, setSeed] = useState("");
  const [messages, setMessages] = useState("");
  const {account, setAccount} = useContext(AccountContext);
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  useEffect(() => {
    if (id) {
      db.collection("users")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => 
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [id]);

  const createChat = () => {
    const username = prompt("Please enter a name for the chat");
    if (username) {
      // do some clever db stuff
      db.collection("users").add({
        name: username,
      });
    }
  };

  return !addNewChat ? (
    <Link to={`/users/${id}`}>
      <div className="sidebarchat">
        <Avatar /*src={`https://avatars.dicebear.com/api/human/${seed}.svg`}*/ src={account.user.photoURL}/>
        <div className="sidebarchat_info">
          <h2>{name}</h2>
          <p>{messages  [0]?.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h2>Add New Chat</h2>
    </div>
  );
}

export default SidebarChat;
