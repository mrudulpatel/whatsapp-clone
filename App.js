import React, { useContext, useState } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import AccountProvider from "./AccountProvider";
import "./App.css";
import Chat from "./Chat";
import Login from "./Login";
import Sidebar from "./Sidebar";
import { useStateValue } from "./StateProvider";
import WebCamCapture from "./WebCamCapture";

function App() {
  // const { account } = useContext(AccountContext);
  const [{ user }, dispatch] = useStateValue();
  return (
    <div className="app">
      <AccountProvider>
        <div>
          {!user ? (
            <Login />
          ) : (
            <div className="app_body">
              <Router>
                <Sidebar />
                <Switch>
                  <Route path="/users/:userId">
                    <Chat />
                  </Route>
                  <Route path="/"></Route>
                  <Route path="/capture">
                    <WebCamCapture />
                  </Route>
                </Switch>
              </Router>
            </div>
          )}
        </div>
      </AccountProvider>
    </div>
  );
}

export default App;
