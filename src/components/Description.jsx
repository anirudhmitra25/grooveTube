import React from "react";
export const Description = ({ currentVideo }) => {
  return (
    <>
      <h1 className="text-3xl text-neutral-300 font-semibold mb-1 my-2">
        {currentVideo.title}
      </h1>
      <p className="tracking-tighter text-neutral-500 text-sm">
        {currentVideo.author}
      </p>
      <div className="mt-3">
        <p className="text-gray-200">{currentVideo.description}</p>
      </div>
    </>
  );
};
