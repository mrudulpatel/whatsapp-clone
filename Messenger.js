import React, { useContext } from "react";
import { AccountContext } from "./AccountProvider";
import ChatBox from "./ChatBox";
import Login from "./Login";

function Messenger() {
  const { account } = useContext(AccountContext);
  return <div>{account ? <ChatBox /> : <Login />}</div>;
}

export default Messenger;
