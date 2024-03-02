export const playVideo = (videoUrl) => ({
  type: "PLAY_VIDEO",
  payload: videoUrl,
});

export const updatePlaylist = (data) => ({
  type: "UPDATE_PLAYLIST",
  payload: data,
});
