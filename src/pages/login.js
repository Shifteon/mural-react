import React from "react";
import { redirect, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import getAuthorization from "../utils/getAuthorization";

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

    navigate("/");
  };

  return (
    <div className="login-page">
      <div className="bg-login"></div>
      <form onSubmit={handleSubmit}>
        <img src="/images/mural-logo-stacked.png" />
        <label>
          Username
          <input type="text" value={username} onChange={handleUsernameChange} />
        </label>
        <label>
          Password
          <input type="password" value={password}  onChange={handlePasswordChange} />
        </label>
        {/* <input type="submit" value="Submit" /> */}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;