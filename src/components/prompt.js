import axios from "axios";
import React from "react";
import { baseRequestUrl } from "../constants";

export const Prompt = () => {
  const requestUrl = baseRequestUrl + 'prompt/';

  const [prompt, setPrompt] = React.useState("Pirates in a shopping mall");
  
  React.useEffect(() => {
    getPrompt();
  }, []);

  const getPrompt = () => {
    axios.get(requestUrl)
      .then(result => {
        console.log(result.data.prompt);
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
        <button>Add Artwork</button>
      </div>
    </div>
  );
};