import axios from "axios";
import React from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { baseRequestUrl } from "../constants";


export const Logout = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["loggedIn", "accessToken"]);

  const requestUrl = baseRequestUrl + 'auth/logout';

  const navigate = useNavigate();

  React.useEffect(() => {
    axios.get(requestUrl, {
      headers: {
        'Authorization': `Bearer ${cookies.accessToken}`
      } 
    })
    .then(result => {
      removeCookie("loggedIn", { path: "/", maxAge: 3600 });
      removeCookie("accessToken", { path: "/", maxAge: 3600 });
      navigate("/");
    })
    .catch(error => {
      console.log(error);
    });
  }, []);

  return (
    <div>
      <h1>You have been logged out</h1>
    </div>
  )
};