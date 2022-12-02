import React from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import getAuthorization from "../utils/getAuthorization";
import { Store } from 'react-notifications-component';
import { notificationOptions } from "../constants";

const Login = () => {
  const [cookies, setCookie] = useCookies(["loggedIn", "accessToken", "currentUser"]);

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const navigate = useNavigate();

  React.useEffect(() => {
    if (cookies.loggedIn) {
      navigate('/');
    }
  }, []);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const json = await getAuthorization({ username: username, password: password });
    console.log(json);
    console.log(json);
    if (!isNaN(json)) {
      if (json === 422) {
        Store.addNotification({
          ...notificationOptions,
          title: "Username or Password is Incorrect",
          type: "danger"
        });
      }
      return;
    }
    setCookie('accessToken', json.accessToken, {
      path: '/',
      maxAge: 3600
    });
    setCookie('loggedIn', true, {
      path: '/',
      maxAge: 3600
    });
    setCookie('currentUser', json.user, {
      path: '/',
      maxAge: 3600
    });

    Store.addNotification({
      ...notificationOptions,
      title: "Succesfully Logged In",
      type: "success"
    });

    navigate("/");
  };

  return (
    <div className="login-page">
      <div className="bg-login"></div>
      <form className="login-form" onSubmit={handleSubmit}>
        <img src="/images/mural-logo-stacked.png" />
        <label>
          Username
          <input required type="text" value={username} onChange={handleUsernameChange} />
        </label>
        <label>
          Password
          <input required type="password" value={password} minlength="8" onChange={handlePasswordChange} />
        </label>
        {/* <input type="submit" value="Submit" /> */}
        <button type="submit">Login</button>
        <Link to="/signup">Create Account</Link>
      </form>
    </div>
  );
};

export default Login;