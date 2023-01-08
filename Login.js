import { Button } from "@mui/material";
import React, { useContext } from "react";
import GoogleLogin from "react-google-login";
import { auth, provider } from "./firebase";
import "./Login.css";
import { actionTypes } from "./reducer";
import { useStateValue } from "./StateProvider";
import { AccountContext } from "./AccountProvider";

function Login() {
  const clientId =
    "921271731237-cvivi0emq2h1qeu783uu63flrlc3k1i5.apps.googleusercontent.com";
  const { account, setAccount } = useContext(AccountContext);
  const [{}, dispatch] = useStateValue();
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        console.log(result);
        setAccount(result);   
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((error) => alert(error.message));
  };
  return (
    <div className="login">
      <div className="login_container">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/langfr-220px-WhatsApp.svg.png"
          alt="logo"
        />
        <div className="login_text">
          <h1>Login To WhatsApp</h1>
        </div>
        <Button onClick={signIn}>Login</Button>
      </div>
    </div>
  );
}

export default Login;
