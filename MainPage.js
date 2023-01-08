import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Chat from "./Chat";
import Login from "./Login";
import Sidebar from "./Sidebar";
import { useStateValue } from "./StateProvider";
import "./App.css";

function MainPage() {
  const [{ user }, dispatch] = useStateValue();
  return (
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
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
}

export default MainPage;
