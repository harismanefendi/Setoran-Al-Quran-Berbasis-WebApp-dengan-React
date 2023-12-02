import React from "react";

const YouTubeEmbed = ({ embedId }) => (
  <div className="video-responsive">
    <iframe width="853" height="480" src={`https://www.youtube.com/embed/${embedId}`} title="YouTube video player" frameBorder="0" allowFullScreen></iframe>
  </div>
);

export default YouTubeEmbed;
