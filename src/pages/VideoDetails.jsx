import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Playlist from "../components/Playlist";
import Player from "../components/Player";
import { connect } from "react-redux";
import { playVideo } from "../store/actions";
import { Description } from "../components/Description";
import { useNavigate } from "react-router-dom";

const VideoDetails = ({ currentVideo, playVideo, playlist }) => {
  const { videoId } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    const selectedVideo = playlist.filter(
      (video) => video.id === parseInt(videoId)
    );
    playVideo(selectedVideo[0]);
  }, [videoId, playlist, playVideo]);

  const handleVideoEnd = () => {
    const currentIndex = playlist.findIndex(
      (video) => video.id === currentVideo.id
    );

    const nextIndex = (currentIndex + 1) % playlist.length;

    const nextVideo = playlist[nextIndex];

    navigate(`/video/${nextVideo.id}`);
  };

  return (
    <section className="font-sans flex lg:flex-row h-max lg:h-full flex-col mx-auto px-10 py-5 justify-center">
      <section className="w-full lg:w-5/6">
        <Player currentVideo={currentVideo} onEnded={handleVideoEnd} />
        {currentVideo && (
          <section className="-mt-5">
            <Description currentVideo={currentVideo} />
          </section>
        )}
      </section>
      <section className="lg:h-4/5 my-5 lg:my-0">
        <Playlist />
      </section>
    </section>
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
