import React from "react";
import axios from "axios";
import { baseRequestUrl } from "../constants";

const SignUp = () => {
  const requestUrl = `${baseRequestUrl}auth/signup`;

  const [username, setUsername]     = React.useState("");
  const [password, setPassword]     = React.useState("");
  const [email, setEmail]           = React.useState("");
  const [name, setName]             = React.useState("");
  const [bio, setBio]               = React.useState("");
  const [profilePic, setProfilePic] = React.useState();

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
      })
      .catch(error => {
        console.log(error);
      })
  };

  return (
    <div className="signup-page">
      <div className="bg-login"></div>
      <form onSubmit={handleSubmit}>
        <img src="/images/mural-logo-stacked.png" />
        <label for="email">
          Email
        </label>
        <input type="text" name="email" value={email} onChange={handleEmailChange} />
        <label>
          Username
          
        </label>
        <input type="text" value={username} onChange={handleUsernameChange} />
        <label>
          Password
          
        </label>
        <input type="password" value={password}  onChange={handlePasswordChange} />
        <label>
          Name
          
        </label>
        <input type="text" value={name}  onChange={handleNameChange} />
        <label>
          Bio
          
        </label>
        <input type="text" value={bio}  onChange={handleBioChange} />
        <label>
          Profile Picture
        
        </label>
        <input type="file" name="profilePic" onChange={handleProfilePicChange} />
        {/* <input type="submit" value="Submit" /> */}
        <button type="submit" >Signup</button>
      </form>
    </div>
  );
};

export default SignUp;