import React from "react";
import { useLocation } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { imgSrcUrl, baseRequestUrl } from "../constants";
import { ArtworkPanel } from "../components/artworkPanel";
import axios from "axios";

export const Profile = () => {
  const location = useLocation();
  const { isCurrentUser, username } = location.state;

  const [cookies] = useCookies("currentUser", "accessToken");

  const requestUrl = baseRequestUrl + 'user/artwork/';
  const accessToken = cookies.accessToken;

  const [user, setUser] = React.useState(null);
  const [profilePic, setProfilePic] = React.useState("");
  const [artwork, setArtwork] = React.useState([]);

  React.useEffect(() => {
    console.log(isCurrentUser);
    if (isCurrentUser) {
      setUser(cookies.currentUser);
    }

    if (!user) {
      console.log('bad things will happen');
    }
  }, []);

  React.useEffect(() => {
    if (user) {
      getProfilePicUrl();
      getArtwork();
    }
  }, [user]);

  const getProfilePicUrl = () => {
    axios.get(imgSrcUrl + user.profilePic)
      .then(result => {
        setProfilePic(result.data.url);
      })
      .catch(error => {
        console.log(error);
      })
  };

  const getArtwork = () => {
    axios.get(requestUrl + user.username, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
      .then(result => {
        console.log(result.data);
        setArtwork(result.data.artwork);  
      })
      .catch(error => {
        console.log(error);
      });
  };


  return (
    <div className="profile">
      {user && 
        <>
        <div className="info">
          <img src={profilePic} />
          <div className="text">
            <div>
              <h1>{user.username}</h1>
              <h2>{user.name}</h2>
            </div>
            <p>{user.bio}</p>
            {isCurrentUser &&
              <button>Add Artwork</button>
            }
          </div>
        </div>
        <div className="artwork-section">
          <h1 className="title">Artwork</h1>
          <ArtworkPanel artwork={artwork} />
        </div>
        </>
      }
    </div>
  );
};
