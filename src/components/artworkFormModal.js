import React from "react";
import { baseRequestUrl } from "../constants";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useOutsideClick } from "../hooks/outsideClick";
import useBlockScroll from "../hooks/useBlockScroll";
import { Store } from 'react-notifications-component';
import { notificationOptions } from "../constants";

export const ArtworkFormModal = ({fromPrompt, newArtwork}) => {
  const [cookies] = useCookies("currentUser", "accessToken");

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [artwork, setArtwork] = React.useState();
  const [showForm, setShowForm] = React.useState(false);

  const [blockScroll, allowScroll] = useBlockScroll();

  const requestUrl = baseRequestUrl + 'user/artwork';
  const promptRequestUrl = baseRequestUrl + 'prompt/addArtwork';

  React.useEffect(() => {
    if (showForm) {
      blockScroll();
    } else {
      allowScroll();
    }
  }, [showForm]);

  const wrapperRef = React.useRef(null);
  useOutsideClick(wrapperRef, () => {
    setShowForm(false);
  });

  const handleNameChange = event => {
    setName(event.target.value)
  };

  const handleDescriptionChange = event => {
    setDescription(event.target.value)
  };

  const handleArtworkChange = event => {
    setArtwork(event.target.files[0]);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('artwork', artwork);
    formData.append('username', cookies.currentUser.username);

    if (fromPrompt) {
      formData.append('dateKey', sessionStorage.getItem('promptDate'));
      axios.put(promptRequestUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data; boundary=XXX',
          'Authorization': `Bearer ${cookies.accessToken}`
        }
      })
        .then(response => {
          console.log(response);
          allowScroll();
          setShowForm(false);
          Store.addNotification({
            ...notificationOptions,
            title: "Successfully Added Artwork",
            type: "success"
          });
          newArtwork();
        })
        .catch(error => {
          console.log(error);
          Store.addNotification({
            ...notificationOptions,
            title: "Error Adding Artwork",
            type: "error"
          });
        });
    } else {
      axios.put(requestUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data; boundary=XXX',
          'Authorization': `Bearer ${cookies.accessToken}`
        }
      })
        .then(response => {
          console.log(response);
          allowScroll();
          setShowForm(false);
          Store.addNotification({
            ...notificationOptions,
            title: "Successfully Added Artwork",
            type: "success"
          });
          newArtwork();
        })
        .catch(error => {
          console.log(error);
          Store.addNotification({
            ...notificationOptions,
            title: "Error Adding Artwork",
            type: "error"
          });
        });
    }
  };

  const addArtworkClick = () => {
    setShowForm(true);
  };

  return (
    <>
      <button onClick={addArtworkClick} className="artwork-form-show-btn">Add Artwork</button>
      {
        showForm &&
        <div className="artwork-form">
          <form onSubmit={handleSubmit} ref={wrapperRef}>
            <label htmlFor='name'>Name</label>
            <input required type='text' name='name' onChange={handleNameChange} />
            <label htmlFor='description'>Description</label>
            <input required type='text' name='description' onChange={handleDescriptionChange} />
            <label>Artwork</label>
            <input required type="file" name="artwork" onChange={handleArtworkChange} />
            <button type="submit" className="artwork-form-btn">Add Artwork</button>
          </form>
        </div>
      }
    </>
  );
};