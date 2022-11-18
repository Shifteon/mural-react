import React from "react";
import axios from "axios";
import { imgSrcUrl } from "../constants";

export const Artwork = ({ artwork }) => {
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
      <img src={url} loading='lazy' />
      <div  className={`${isShown ? 'display' : ''}`} >
        <h1 className={`${isTextShown ? 'display' : ''}`} >{artwork.name}</h1>
        <p  className={`${isTextShown ? 'display' : ''}`} >{artwork.description}</p>
      </div>
    </div>
  )
};