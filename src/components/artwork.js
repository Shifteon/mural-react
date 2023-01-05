import React from "react";
import axios from "axios";
import { imgSrcUrl } from "../constants";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

export const Artwork = ({ artwork }) => {
  const [cookies] = useCookies("currentUser");

  const [url, setUrl] = React.useState('');
  const [isShown, setIsShown] = React.useState(false);
  const [isTextShown, setIsTextShown] = React.useState(false);

  React.useEffect(() => {
    getUrl();
  }, []);

  React.useEffect(() => {
    setTimeout(() => {
      setIsTextShown(isShown);
    }, 500);
  }, [isShown]);

  const getUrl = () => {
    axios.get(imgSrcUrl + artwork.filekey)
      .then(result => {
        setUrl(result.data.url);
      })
      .catch(error => {
        console.log(error);
      })
  };

  return (
    <div className="single-artwork"
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => { setIsShown(false); setIsTextShown(false) }}
    >
      <Link to="/artwork" state={{artwork: artwork, url: url}}><img src={url} loading='lazy' alt='artwork' /></Link>
      <div    className={`${isShown ? 'display text' : 'text'}`} >
        <h1   className={`${isTextShown ? 'display' : ''}`} >{artwork.name}</h1>
        <p>{artwork.description}</p>
        <Link className={`${isTextShown ? 'display' : ''}`} to="/profile" state={{
          isCurrentUser: artwork.username == cookies.currentUser.username,
          username: artwork.username
        }} >@{artwork.username}</Link>
      </div>
    </div>
  )
};