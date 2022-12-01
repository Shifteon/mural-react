import axios from "axios";
import React from "react";
import { baseRequestUrl } from "../constants";
import { ArtworkFormModal } from "./artworkFormModal";
import { useCookies } from "react-cookie";
import Select from 'react-select';

export const Prompt = ({newArtwork}) => {
  const requestUrl = baseRequestUrl + 'prompt/';

  const [cookies] = useCookies();

  const [prompt, setPrompt] = React.useState("Pirates in a shopping mall");
  const [currentPrompt, setCurrentPrompt] = React.useState("");
  const [options, setOptions] = React.useState([]);
  
  React.useEffect(() => {
    getPrompt();
    getPreviousPrompts();
  }, []);

  const getPrompt = () => {
    axios.get(requestUrl, {
      headers: {
        'Authorization': `Bearer ${cookies.accessToken}`
      }
    })
      .then(result => {
        sessionStorage.setItem('promptDate', result.data.prompt.date);
        setPrompt(result.data.prompt.prompt);
        setCurrentPrompt(result.data.prompt.prompt);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const getPreviousPrompts = () => {
    axios.get(requestUrl + 'previous', {
      headers: {
        'Authorization': `Bearer ${cookies.accessToken}`
      }
    })
      .then(result => {
        setOptions(result.data.prompts.map(p => ({label: p.prompt, value: p.date})));
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleSelectChange = (newValue, actionMeta) => {
    setPrompt(newValue.label);
    newArtwork(newValue.value);
  }

  return (
    <div className="prompt">
      <div className="bg-prompt"></div>
      <div className="prompt-content">
        <h1>Today's Prompt</h1>
        <h2>{currentPrompt}</h2>
        <div className="select">
          <h3>Previous Prompts</h3>
          <Select 
          className="prompt-select" 
          options={options}
          onChange={handleSelectChange}
          ></Select>
        </div>
        {prompt == currentPrompt &&
          <ArtworkFormModal fromPrompt={true} newArtwork={newArtwork} />
        }
      </div>
    </div>
  );
};