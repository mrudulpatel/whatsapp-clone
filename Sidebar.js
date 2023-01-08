import {
  Chat,
  DonutLarge,
  MoreVert,
  SearchOutlined,
} from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import db from "./firebase";
import "./Sidebar.css";
import SidebarChat from "./SidebarChat";
import { useStateValue } from "./StateProvider";

function Sidebar() {
  const [users, setUsers] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  useEffect(() => {
    const unsubscribe = db.collection("users").onSnapshot((snapshot) => {
      setUsers(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <Avatar src={user?.photoURL} />
        <div className="sidebar_headerRight">
          <IconButton>
            <DonutLarge />
          </IconButton>
          <IconButton>
            <Chat />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="sidebar_search">
        <div className="sidebar_searchContainer">
          <SearchOutlined />
          <input type="text" placeholder="Search or start a new chat" />
        </div>
      </div>
      <div className="sidebar_chats">
        <SidebarChat addNewChat />
        {users.map((users) => (
          <SidebarChat key={users.id} id={users.id} name={users.data.name} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
