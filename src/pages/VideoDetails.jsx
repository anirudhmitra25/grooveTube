import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Playlist from "../components/Playlist";
import Player from "../components/Player";
import { connect } from "react-redux";
import { playVideo } from "../store/actions";
import { Description } from "../components/Description";

const VideoDetails = ({ currentVideo, playVideo, playlist }) => {
  const { videoId } = useParams();

  useEffect(() => {
    const selectedVideo = playlist.filter((video) => video.id == videoId);
    playVideo(selectedVideo[0]);
  }, [videoId]);

  return (
    <div className="font-sans h-screen flex mx-auto px-10 py-5 justify-center">
      <div className="w-3/5">
        <Player currentVideo={currentVideo} />
        {currentVideo && (
          <div className="-mt-5">
            <Description currentVideo={currentVideo} />
          </div>
        )}
      </div>
      <div className="w-1/5 h-4/5">
        <Playlist />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentVideo: state.currentVideo,
  playlist: state.playlist,
});

const mapDispatchToProps = {
  playVideo,
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoDetails);
