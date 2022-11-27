import React from "react";
import axios from "axios";
import { baseRequestUrl } from "../constants";
import { useNavigate } from "react-router-dom";
import { Store } from 'react-notifications-component';
import { notificationOptions } from "../constants";

const SignUp = () => {
  const requestUrl = `${baseRequestUrl}auth/signup`;

  const [username, setUsername]     = React.useState("");
  const [password, setPassword]     = React.useState("");
  const [email, setEmail]           = React.useState("");
  const [name, setName]             = React.useState("");
  const [bio, setBio]               = React.useState("");
  const [profilePic, setProfilePic] = React.useState();

  const usernameRef = React.useRef();

  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleEmailChange = event => {
    setEmail(event.target.value);
  };

  const handleNameChange = event => {
    setName(event.target.value)
  };

  const handleBioChange = event => {
    setBio(event.target.value);
  };

  const handleProfilePicChange = event => {
    setProfilePic(event.target.files[0]);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const formData = new FormData();
    formData.append('email', email);
    formData.append('username', username);
    formData.append('password', password);
    formData.append('name', name);
    formData.append('bio', bio);
    formData.append('profilePic', profilePic);

    axios.put(requestUrl, formData, {
      headers: {
        'Content-Type': 'multipart/form-data; boundary=XXX'
      }
    })
      .then(response => {
        console.log(response);
        Store.addNotification({
          ...notificationOptions,
          title: "Succesfully Created Account",
          type: "success"
        });
        navigate('/login');
      })
      .catch(error => {
        console.log(error);
        const errors = error.response.data.data;
        for (const e of errors) {
          if (e.param == 'username') {
            usernameRef.current.style = `border-color: red;`
          }
          Store.addNotification({
            ...notificationOptions,
            title: "Error Creating Account",
            message: `${e.msg}`,
            type: "danger"
          });
        }
      })
  };

  return (
    <div className="signup-page">
      <div className="bg-login"></div>
      <form onSubmit={handleSubmit} className='signup-form' >
        <img src="/images/mural-logo-stacked.png" />
        <h2>Account Info</h2>
        <div>
          <label htmlFor="email">
            Email
          </label>
          <input required type="text" name="email" value={email} onChange={handleEmailChange} />
          <label>
            Username
            
          </label>
          <input required type="text" value={username} onChange={handleUsernameChange} ref={usernameRef} />
          <label>
            Password
            
          </label>
          <input required type="password" value={password} onChange={handlePasswordChange} />
        </div>
        <h2>Profile Info</h2>
        <div>
          <label>
            Name
            
          </label>
          <input required type="text" value={name}  onChange={handleNameChange} />
          <label>
            Bio
            
          </label>
          <input required type="text" value={bio}  onChange={handleBioChange} />
          <label>
            Profile Picture
          
          </label>
          <input required type="file" name="profilePic" onChange={handleProfilePicChange} />
        </div>
        {/* <input type="submit" value="Submit" /> */}
        <button type="submit" >Signup</button>
      </form>
    </div>
  );
};

export default SignUp;