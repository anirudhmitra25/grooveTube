import React, { useState } from "react";
import { connect } from "react-redux";
import { playVideo, updatePlaylist } from "../store/actions";
import { useNavigate } from "react-router-dom";
import { useRef, useEffect } from "react";
import { Search } from "./Search";
import { Reorder } from "framer-motion";
import { PlayListItem } from "./PlayListItem";

const Playlist = ({ playlist }) => {
  const [searchVal, setSearchVal] = useState("");
  const [data, setData] = useState([]);

  const containerRef = useRef();

  let navigate = useNavigate();

  const handleVideoClick = (video) => {
    setData(playlist);
    setSearchVal("");
    navigate(`/video/${video.id}`);
  };

  useEffect(() => {
    setData(playlist);
  }, [playlist]);

  function onSearchChange(value) {
    let inputString = value.target.value;
    let newData = playlist.filter((ele) =>
      ele.title.toLowerCase().includes(inputString.toLowerCase())
    );

    setData(newData);
    setSearchVal(value.target.value);
  }

  return (
    <>
      <div className="px-6 mb-2">
        <Search onChange={onSearchChange} value={searchVal} />
      </div>
      <div ref={containerRef} className="overflow-auto h-full p-6">
        <Reorder.Group axis="y" values={playlist} onReorder={setData}>
          {data.map((video, index) => (
            <PlayListItem
              video={video}
              index={index}
              handleVideoClick={handleVideoClick}
            />
          ))}
        </Reorder.Group>
      </div>
      <div
        className="bg-gradient-to-t from-neutral-900 from-opacity-90 from-30% via-opacity-80 via-neutral-900 via-20% to-transparent "
        style={{
          position: "relative",
          bottom: "15%",
          height: "20%",
        }}
      ></div>
    </>
  );
};

const mapStateToProps = (state) => ({
  playlist: state.playlist,
  currentVideo: state.currentVideo,
});

const mapDispatchToProps = {
  playVideo,
  updatePlaylist,
};

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);
