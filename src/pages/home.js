import React from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { ArtworkPanel } from "../components/artworkPanel";
import { Prompt } from '../components/prompt';
import { baseRequestUrl } from "../constants";

export const Home = () => {
  const [cookies, setCookie] = useCookies(['accessToken']);

  const requestUrl = baseRequestUrl + 'prompt/';
  const accessToken = cookies.accessToken;

  const [artwork, setArtwork] = React.useState([]);
  const [noArtwork, setNoArtwork] = React.useState(true);

  React.useEffect(() => {
    getArtwork();
  }, []);

  const getArtwork = () => {
    console.log(sessionStorage.getItem('promptDate'));
    axios.get(requestUrl + sessionStorage.getItem('promptDate'), {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
      .then(result => {
        console.log(result.data);
        setArtwork(result.data.artwork);  
        setNoArtwork(false);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div>
      <div>
        <Prompt newArtwork={getArtwork} />
      </div>
      <div>
        {noArtwork &&
          <h1 className="no-artwork" >No Artwork yet... Be the first to add some!</h1>
        }
        <ArtworkPanel artwork={artwork} />
      </div>
    </div>
  );
};