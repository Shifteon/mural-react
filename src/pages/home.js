import React from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { ArtworkPanel } from "../components/artworkPanel";
import { Prompt } from '../components/prompt';
import { baseRequestUrl } from "../constants";
import { Link } from "react-router-dom";

export const Home = () => {
  const [cookies, setCookie] = useCookies(['loggedIn']);

  const requestUrl = baseRequestUrl + 'prompt/';
  const accessToken = cookies.accessToken;

  const [artwork, setArtwork] = React.useState([]);
  const [noArtwork, setNoArtwork] = React.useState(true);

  React.useEffect(() => {
    getArtwork();
  }, []);

  const getArtwork = (promptDate = null) => {
    console.log(sessionStorage.getItem('promptDate'));
    const dateKey = promptDate || sessionStorage.getItem('promptDate')
    axios.get(requestUrl + dateKey, {
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
        setArtwork([]);
        setNoArtwork(true);
      });
  };

  return (
    <div>
    {cookies.loggedIn ?
      <>
        <div>
          <Prompt newArtwork={getArtwork} />
        </div>
        <div>
          {noArtwork &&
          <div className="no-artwork">
            <img src="/images/snorlax-small.png" />
            <h1>No Artwork yet... Be the first to add some!</h1>
          </div>
          }
          <ArtworkPanel artwork={artwork} />
        </div>
      </>
      :
      <>
      <div className="not-loggedin">
        <h1 className="center" >Please login to see todays prompt</h1>
        <Link className="center" to="/login">Login</Link>
        <h2 className="center" >Or create an account</h2>
        <Link className="center" to="/signUp">Create Account</Link>
        <img src="/images/snorlax-thumbs-up.png" />
      </div>
      </>
    }
    </div>
  );
};