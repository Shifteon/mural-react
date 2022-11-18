import React from "react";
import { Artwork } from "./artwork";

export const ArtworkPanel = (props) => {
  const artwork = props.artwork;

  return (
    <div className="artwork-panel">
      {artwork.map(a => {
        return (
          <div key={`${a.date}${a.username}`}>
            <Artwork artwork={a} />
          </div>
        )
      })}
    </div>
  );
};