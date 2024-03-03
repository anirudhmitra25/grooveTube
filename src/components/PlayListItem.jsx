import React from "react";
import { Reorder } from "framer-motion";

export const PlayListItem = ({ video, handleVideoClick, currentVideoId }) => {
  return (
    <Reorder.Item id={video.id} value={video}>
      <div
        style={{}}
        key={video.id}
        onClick={() => handleVideoClick(video)}
        className="relative mb-5 flex items-center cursor-pointer"
      >
        <img
          src={video.thumb}
          alt={video.title}
          className={`max-w-64 h-32 min-w-48 object-cover rounded-lg shadow-lg ${
            currentVideoId === video.id ? "opacity-50 " : ""
          }`}
        />
        {currentVideoId === video.id && (
          <span className="absolute text-sm font-semibold text-gray-200 bottom-0 mb-3 ml-2">
            Currently Playing
          </span>
        )}
        <div className="flex-col ml-3 self-start">
          <p className="font-semibold text-neutral-100">{video.title}</p>
          <p className="text-gray-300">{video.author}</p>
        </div>
      </div>
    </Reorder.Item>
  );
};
