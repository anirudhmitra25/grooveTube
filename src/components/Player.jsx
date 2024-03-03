import React, { useState, useRef, useEffect } from "react";
import ToggleButton from "../components/Toggle";
import { FaRegPlayCircle } from "react-icons/fa";
import { FaRegPauseCircle } from "react-icons/fa";
import { MdOutlineReplay10 } from "react-icons/md";
import { MdOutlineForward10 } from "react-icons/md";
import { IoMdVolumeHigh } from "react-icons/io";
import { MdFullscreen, MdFullscreenExit } from "react-icons/md";

const Player = ({ currentVideo, onEnded }) => {
  const videoRef = useRef(null);
  const [autoPlay, setAutoPlay] = useState(true);
  const [progress, setProgress] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [hoveredTime, setHoveredTime] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [volume, setVolume] = useState(1);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  useEffect(() => {
    if (videoRef && videoRef.current) {
      videoRef.current.currentTime = 0;
    }
    setProgress(0);
    setSpeed(1);
  }, [currentVideo]);

  const handleVideoEnded = () => {
    if (onEnded && autoPlay) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      onEnded();
    }
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  const handleProgress = (e) => {
    if (isNaN(e.target.duration)) return;

    const currentTime = e.target.currentTime;
    const duration = e.target.duration;

    const newProgress = (currentTime / duration) * 100;

    setProgress(newProgress);
  };

  const handlePlayPause = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };

  const handleSpeedChange = (newSpeed) => {
    setSpeed(newSpeed);
    videoRef.current.playbackRate = newSpeed;
  };

  const handleProgressBarClick = (e) => {
    const progressBar = e.currentTarget;
    const { left, width } = progressBar.getBoundingClientRect();
    const mouseX = e.clientX - left;
    const percentage = (mouseX / width) * 100;
    const seekTime = (percentage * videoRef.current.duration) / 100;

    videoRef.current.currentTime = seekTime;
  };

  const handleMouseMove = (e) => {
    const progressBar = e.currentTarget;
    const { left, width } = progressBar.getBoundingClientRect();
    const mouseX = e.clientX - left;
    const percentage = (mouseX / width) * 100;
    const time = (percentage * videoRef.current.duration) / 100;

    setHoveredTime(time);
  };

  const handleMouseLeave = () => {
    setHoveredTime(null);
  };

  const handleFullScreenToggle = () => {
    if (!isFullScreen) {
      const element = videoRef.current;

      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    }

    setIsFullScreen(!isFullScreen);
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    videoRef.current.volume = newVolume;
  };

  const handleRewind = () => {
    videoRef.current.currentTime -= 10;
  };

  const handleFastForward = () => {
    videoRef.current.currentTime += 10;
  };

  return (
    <>
      {currentVideo && (
        <div className="relative rounded-md flex flex-col justify-between items-end">
          <video
            ref={videoRef}
            id="video-player"
            className="rounded-lg shadow-2xl shadow-neutral-700"
            key={currentVideo.id}
            onTimeUpdate={handleProgress}
            height={"100%"}
            width={"100%"}
            autoPlay={autoPlay}
            onEnded={handleVideoEnded}
          >
            <source src={currentVideo.url} type="video/mp4" />
          </video>
          {videoRef.current && (
            <>
              <div
                id="controls"
                className="p-5 absolute bottom-5 left-0 w-full transition-opacity duration-300 ease-linear group-hover:opacity-100 z-50"
              >
                <div
                  id="progress-bar"
                  className="h-1 w-full bg-white cursor-pointer mb-4"
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  onClick={handleProgressBarClick}
                >
                  <div
                    style={{
                      width: `${progress}%`,
                    }}
                    id="progress-indicator"
                    className="h-full bg-red-500 transition-all duration-500 ease-in-out"
                  ></div>
                  {hoveredTime !== null && (
                    <div
                      className="absolute top-0 left-0 transform -translate-x-1/2 -translate-y-full bg-black text-white px-1 rounded-md text-xs"
                      style={{
                        left: `${
                          (hoveredTime / videoRef.current.duration) * 100
                        }%`,
                      }}
                    >
                      {formatTime(hoveredTime)}
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center justify-between mb-3">
                    <button
                      id="rewind"
                      className="transition-all duration-100 ease-linear hover:scale-125"
                    >
                      <MdOutlineReplay10
                        onClick={handleRewind}
                        className="text-white text-xl sm:text-3xl mx-1"
                      />
                    </button>
                    <button
                      id="play-pause"
                      onClick={handlePlayPause}
                      className="transition-all duration-100 ease-linear hover:scale-125"
                    >
                      {videoRef.current.paused ? (
                        <FaRegPlayCircle className="text-white text-xl sm:text-3xl mx-1" />
                      ) : (
                        <FaRegPauseCircle className="text-white text-xl sm:text-3xl mx-1" />
                      )}
                    </button>
                    <button
                      id="fast-forward"
                      className="transition-all duration-100 ease-linear hover:scale-125"
                    >
                      <MdOutlineForward10
                        onClick={handleFastForward}
                        className="text-white text-xl sm:text-3xl mx-1"
                      />
                    </button>
                    {!isNaN(videoRef.current.duration) && (
                      <div className="text-white text-sm sm:text-xl mx-2">
                        {formatTime(videoRef.current.currentTime)}
                        {" / "}
                        {formatTime(videoRef.current.duration)}
                      </div>
                    )}
                  </div>

                  <div className="flex">
                    <div className="flex items-center mr-2">
                      <select
                        value={speed}
                        onChange={(e) =>
                          handleSpeedChange(parseFloat(e.target.value))
                        }
                        className="bg-transparent border border-gray-300 text-neutral-100 text-sm rounded-lg "
                      >
                        <option value={0.5}>0.5x</option>
                        <option value={0.75}>0.75x</option>
                        <option value={1}>1x</option>
                        <option value={1.25}>1.25x</option>
                        <option value={1.5}>1.5x</option>
                        <option value={2}>2x</option>
                      </select>
                    </div>
                    <div className="relative top-1">
                      <button
                        id="volume"
                        className="transition-all duration-100 ease-linear hover:scale-125"
                      >
                        <IoMdVolumeHigh
                          onClick={() => setShowVolumeSlider((prev) => !prev)}
                          className="text-white text-xl sm:text-3xl"
                        />
                      </button>
                      {showVolumeSlider && (
                        <div className="absolute bottom-16 transform -rotate-90 origin-bottom">
                          <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={volume}
                            onChange={(e) =>
                              handleVolumeChange(parseFloat(e.target.value))
                            }
                          />
                        </div>
                      )}
                    </div>

                    <button
                      id="full-screen"
                      className="transition-all duration-100 ease-linear hover:scale-125"
                      onClick={handleFullScreenToggle}
                    >
                      {isFullScreen ? (
                        <MdFullscreenExit className="text-white text-xl sm:text-3xl" />
                      ) : (
                        <MdFullscreen className="text-white text-xl sm:text-3xl" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <ToggleButton autoPlay={autoPlay} setAutoPlay={setAutoPlay} />
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Player;
