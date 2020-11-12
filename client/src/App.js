import React, {Fragment, useState, useEffect} from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GoogleLogin from 'react-google-login';

toast.configure();

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = boolean => {
    setIsAuthenticated(boolean);
  };

  async function isAuth(){
  try {
    
    const response = await fetch("http://localhost:5000/auth/is-verify", {
      method: "GET",
      headers: { token: localStorage.token }
    });

    const parseRes = await response.json();

    parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);

  } catch (err) {
    console.error(err.message);
  }
  };



  useEffect(() => {
    isAuth();
  }, []);

  return (
  <Fragment>
    <Router>
    <div className="container">
    <Switch>
      <Route
      exact
      path="/"
      render = {
        props =>
        !isAuthenticated ? ( 
          <Login {...props} setAuth={setAuth} />
        ) : ( 
          <Redirect {...props} to="/dashboard" />
        )
      }
      />
            <Route
            exact
            path="/register"
            render={props =>
                !isAuthenticated ? (
                  <Register {...props} setAuth={setAuth}/>
                ) : (
                    <Redirect to="/" />
                  )
              }
            />
            <Route
              exact
              path="/dashboard"
              render={props =>
                isAuthenticated ? (
                  <Dashboard {...props} setAuth={setAuth}/>
                ) : (
                    <Redirect to="/" />
                )
              }
            />

          </Switch>

    </div>
    </Router>
  </Fragment>
);
};

export default App;