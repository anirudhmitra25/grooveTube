import React from "react";
import { Reorder } from "framer-motion";
import { IoIosReorder } from "react-icons/io";

export const PlayListItem = ({ video, index, handleVideoClick }) => {
  return (
    <Reorder.Item id={index} value={video}>
      <ul className="playlist">
        {/* <IoIosReorder className="w-10 h-10" color="white" /> */}
        <li key={video.id}>
          <div
            onClick={() => handleVideoClick(video)}
            className="mb-5 flex-col items-center text-center cursor-pointer"
          >
            <img
              src={video.thumb}
              alt={video.title}
              className="max-w-64 h-32 min-w-48 object-cover rounded-lg mx-auto shadow-lg"
            />
            <div className="flex-col justify-content-center mt-2">
              <p className="font-semibold text-neutral-100">{video.title}</p>
              <p className="text-gray-300">{video.author}</p>
            </div>
          </div>
        </li>
      </ul>
    </Reorder.Item>
  );
};
