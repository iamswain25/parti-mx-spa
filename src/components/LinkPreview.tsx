import React from "react";
import getUrls from "get-urls";
import { Box } from "@material-ui/core";
import ReactPlayer from "react-player";
export default function LinkPreview({ text = "" }: { text?: string }) {
  const urls = React.useMemo(() => Array.from(getUrls(text)), [text]);
  return (
    <>
      {urls.map((url, i) =>
        ReactPlayer.canPlay(url) ? (
          <Box className="player-wrapper" key={i} pt={2}>
            <ReactPlayer
              url={url}
              width="100%"
              height="100%"
              className="react-player"
              controls={true}
            />
          </Box>
        ) : null
      )}
    </>
  );
}
