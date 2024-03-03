import React from "react";
import "./styles/autoplay.css";

const ToggleButton = ({ autoPlay, setAutoPlay }) => {
  const toggleDotClass = autoPlay ? "active" : "";
  return (
    <div className="flex">
      <p className="mr-2 text-gray-200 text-sm">Auto play</p>
      <div className="relative">
        <input
          value={autoPlay}
          onChange={() => setAutoPlay((prev) => !prev)}
          id="autoplay"
          type="checkbox"
          className="hidden"
        />
        <label htmlFor="autoplay">
          <div className="toggle_line w-12 h-6 bg-gray-200 rounded-full shadow-inner"></div>
          <div
            className={`toggle_dot absolute w-5 h-5 bg-white rounded-full shadow inset-y-0 left-0 ${toggleDotClass}`}
          ></div>
        </label>
      </div>
    </div>
  );
};

export default ToggleButton;
