import React from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { ArtworkPanel } from "../components/artworkPanel";
import { Prompt } from '../components/prompt';
import { baseRequestUrl } from "../constants";

export const Home = () => {
  const [cookies, setCookie] = useCookies(['user']);

  const requestUrl = baseRequestUrl + 'prompt/1062022';
  const accessToken = cookies.accessToken;

  const [artwork, setArtwork] = React.useState([]);

  React.useEffect(() => {
    getArtwork();
  }, []);

  const getArtwork = () => {
    axios.get(requestUrl, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
      .then(result => {
        console.log(result.data);
        setArtwork(result.data.artwork);  
      })
      .catch(error => {
        console.log('error');
      });
  };

  return (
    <div>
      <div>
        <Prompt />
      </div>
      <div>
        <ArtworkPanel artwork={artwork} />
      </div>
    </div>
  );
};