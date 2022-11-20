import { Link } from 'react-router-dom';
import { FaRegUserCircle } from 'react-icons/fa';
import React from 'react';
import { useCookies } from 'react-cookie';
import { NavLink } from 'react-router-dom';
import { useOutsideClick } from '../hooks/outsideClick';
import { imgSrcUrl, baseRequestUrl } from "../constants";
import useTimeout from '../hooks/useTimeout';
import axios from 'axios';

function Navbar() {
  const [cookies, setCookie] = useCookies(['loggedIn', 'currentUser']);

  const [displayLinks, setDisplayLinks] = React.useState(false);
  const [profileNavClass, setProfileNavClass] = React.useState('');
  const [profilePic, setProfilePic] = React.useState("");

  React.useEffect(() => {
    if (cookies.loggedIn) {
      getProfilePicUrl();
    }
  }, [])

  const wrapperRef = React.useRef(null);
  useOutsideClick(wrapperRef, () => {
    // setProfileNavClass('hide-animation');
    setDisplayLinks(false);
  });

  const handleProfileClick = () => {
    setDisplayLinks(!displayLinks);
  };

  const getProfilePicUrl = () => {
    axios.get(imgSrcUrl + cookies.currentUser.profilePic)
      .then(result => {
        setProfilePic(result.data.url);
      })
      .catch(error => {
        console.log(error);
      })
  };

  return (
    <nav>
      <Link to="/" className='nav-logo' >
        <img src='/images/mural-logo-long.png' />
      </Link>
      <div className='nav-profile'>
        {cookies.loggedIn ? 
          <img src={profilePic} className='profile-pic' onClick={handleProfileClick} />
          :
          <FaRegUserCircle className='profile-pic' onClick={handleProfileClick} />
        }
        {displayLinks && 
          <div ref={wrapperRef} onClick={() => setDisplayLinks(false)} className={profileNavClass} >
            {cookies.loggedIn ?
              <>
                <NavLink to="/profile" state={{isCurrentUser: true}} >
                  My Profile
                </NavLink>
                <NavLink to="/logout">
                  Logout
                </NavLink>
              </>
              :
              <>
                <NavLink to="/login">
                  Login
                </NavLink>
                <NavLink to="/signUp">
                  Signup
                </NavLink>
              </>
            }
          </div>
        }
      </div>
    </nav>
  );
}

export default Navbar;