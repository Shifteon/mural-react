import axios from "axios";
import React from "react";
import { baseRequestUrl } from "../constants";
import { ArtworkFormModal } from "./artworkFormModal";
import { useCookies } from "react-cookie";

export const Prompt = ({newArtwork}) => {
  const requestUrl = baseRequestUrl + 'prompt/';

  const [cookies] = useCookies();

  const [prompt, setPrompt] = React.useState("Pirates in a shopping mall");
  
  React.useEffect(() => {
    getPrompt();
  }, []);

  const getPrompt = () => {
    axios.get(requestUrl, {
      headers: {
        'Authorization': `Bearer ${cookies.accessToken}`
      }
    })
      .then(result => {
        console.log(result.data.prompt);
        sessionStorage.setItem('promptDate', result.data.prompt.date);
        setPrompt(result.data.prompt.prompt);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className="prompt">
      <div className="bg-prompt"></div>
      <div className="prompt-content">
        <h1>Today's Prompt</h1>
        <h2>{prompt}</h2>
        <ArtworkFormModal fromPrompt={true} newArtwork={newArtwork} />
      </div>
    </div>
  );
};