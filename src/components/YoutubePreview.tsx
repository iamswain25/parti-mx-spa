import React from "react";
import getUrls from "get-urls";
import { Box } from "@material-ui/core";
import ReactPlayer from "react-player";
export default function YoutubePreview({ text = "" }: { text?: string }) {
  const videoLinks = React.useMemo(
    () => Array.from(getUrls(text)).filter(ReactPlayer.canPlay),
    [text]
  );
  return (
    <Box height="100%">
      {videoLinks.map((url, i) => (
        <Box className="player-wrapper" key={i}>
          <ReactPlayer
            url={url}
            width="100%"
            height="100%"
            className="react-player"
            controls={true}
          />
        </Box>
      ))}
    </Box>
  );
}
