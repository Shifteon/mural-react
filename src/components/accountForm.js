import React from 'react';
import getAuthorization from '../utils/getAuthorization';

function AccountForm() {

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const json = await getAuthorization({ username: username, password: password });
    sessionStorage.setItem('jwt', json.accessToken);
    console.log(sessionStorage.getItem('jwt'));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={handleUsernameChange} />
        </label>
        <label>
          Password:
          <input type="password" value={password}  onChange={handlePasswordChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default AccountForm;