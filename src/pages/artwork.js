import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";

export const Artwork = () => {
  const [cookies] = useCookies("currentUser");

  const location = useLocation();
  const { artwork, url } = location.state;



  return (
    <div className="full-image">
      <img src={url} alt="User Artwork" />
      <div    className='text'>
        <h1>{artwork.name}</h1>
        <p>{artwork.description}</p>
        <Link to="/profile" state={{
          isCurrentUser: artwork.username == cookies.currentUser.username,
          username: artwork.username
        }} >@{artwork.username}</Link>
      </div>
    </div>
  );
};