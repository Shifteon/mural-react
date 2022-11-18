import { Link } from 'react-router-dom';
import { FaRegUserCircle } from 'react-icons/fa';
import React from 'react';
import { useCookies } from 'react-cookie';

function Navbar() {
  const [cookies, setCookie] = useCookies(['user']);

  const [displayLinks, setDisplayLinks] = React.useState(false);

  const handleProfileClick = () => {
    setDisplayLinks(!displayLinks);
  };

  return (
    <nav>
      <Link to="/">
        Home
      </Link>
      <div className='nav-profile'>
        <FaRegUserCircle className='profile-pic' onClick={handleProfileClick} />
        {displayLinks && 
          <div>
            {cookies.loggedIn ?
              <>
                <Link to="/profile">
                  My Profile
                </Link>
                <Link to="/logout">
                  Logout
                </Link>
              </>
              :
              <>
                <Link to="/login">
                  Login
                </Link>
                <Link to="/signUp">
                  Signup
                </Link>
              </>
            }
          </div>
        }
      </div>
    </nav>
  );
}

export default Navbar;