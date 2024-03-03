import React from "react";
import { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

export const Description = ({ currentVideo }) => {
  const [expand, setExpand] = useState(false);

  return (
    <>
      <h1 className="text-3xl text-neutral-300 font-semibold mb-1 my-2">
        {currentVideo.title}
      </h1>
      <p className="tracking-tighter text-neutral-500 text-sm">
        {currentVideo.author}
      </p>
      <div className="mt-3 flex-col items-center justify-center">
        <p className={`text-gray-200 ${expand && "line-clamp-2"}`}>
          {currentVideo.description}
        </p>
        <button
          onClick={() => setExpand((prev) => !prev)}
          className="text-neutral-100 ml-2 focus:outline-none"
        >
          {expand ? (
            <MdKeyboardArrowDown className="w-6 h-6" />
          ) : (
            <MdKeyboardArrowUp className="w-6 h-6" />
          )}
        </button>
      </div>
    </>
  );
};
