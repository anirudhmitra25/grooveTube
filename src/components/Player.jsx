import React from "react";
import classNames from "classnames";
import { useState } from "react";
import ToggleButton from "../components/Toggle";

const Player = ({ currentVideo }) => {
  const videoPlayerClasses = classNames();
  const [autoPlay, setAutoPlay] = useState(true);

  return (
    <>
      {currentVideo && (
        <div className="rounded-md flex flex-col justify-between items-end">
          <video
            className="rounded-lg shadow-2xl shadow-neutral-700"
            key={currentVideo.id}
            height={"100%"}
            width={"100%"}
            autoPlay={autoPlay}
            controls
          >
            <source src={currentVideo.url} type="video/mp4" />
          </video>
          <div className="mt-3">
            <ToggleButton autoPlay={autoPlay} setAutoPlay={setAutoPlay} />
          </div>
        </div>
      )}
    </>
  );
};

export default Player;
