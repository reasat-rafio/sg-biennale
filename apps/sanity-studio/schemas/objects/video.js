const Video = {
  name: "video",
  title: "Video",
  type: "object",
  fields: [
    {
      name: "video_webm",
      type: "file",
      title: "WebM",
      accept: "video/webm",
    },
    {
      name: "video_mp4",
      type: "file",
      title: "MP4 - MPEG4",
      accept: "video/mp4",
    },
  ],
};

export default Video;
