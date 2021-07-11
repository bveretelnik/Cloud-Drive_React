import React from "react";
import Signup from "./components/Auth/Signup/Signup";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Auth/Login/Login";
import PrivateRoute from "./components/PrivateRoute";

import Profile from "./components/Auth/Profile/Profile";
import Dashboard from "./components/Drive/Dashboard/Dashboard";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          {/* Drive */}
          <PrivateRoute exact path="/" component={Dashboard} />
          <PrivateRoute exact path="/folder/:folderId" component={Dashboard} />

          {/* Profile */}
          <PrivateRoute path="/user" component={Profile} />

          {/* Auth */}
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
