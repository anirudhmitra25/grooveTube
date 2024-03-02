import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { playVideo } from "../store/actions";

const VideoList = ({ playlist }) => {
  return (
    <div className="font-sans h-screen">
      <ul className="flex flex-wrap justify-between mx-auto w-3/4">
        {playlist &&
          playlist.map((video) => (
            <li
              key={video.id}
              className="mb-4 mr-4 w-full sm:w-1/3 lg:w-1/5 hover:transition duration-300 ease-in-out hover:scale-125 cursor-pointer"
            >
              <div className="flex-col justify-items-start max-w-lg min-w-56 my-3">
                <Link to={`/video/${video.id}`} className="block mt-2">
                  <img
                    src={video.thumb}
                    alt={video.title}
                    className="min-w-80 md:min-w-48 sm:min-w-60 h-32 object-cover rounded-md "
                  />
                  <div className="text-lg font-semibold text-neutral-100 mt-3">
                    {video.title}
                  </div>
                  <div className="text-sm text-neutral-400">{video.author}</div>
                </Link>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => ({
  playlist: state.playlist,
  currentVideo: state.currentVideo,
});

const mapDispatchToProps = {
  playVideo,
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoList);
