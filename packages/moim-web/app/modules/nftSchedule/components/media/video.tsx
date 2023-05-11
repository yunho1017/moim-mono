import * as React from "react";
import videojs from "video.js";
import useIsMobile from "common/hooks/useIsMobile";
import { VideoJsGlobalStyle } from "common/components/hlsVideo/styledComponents";
import styled from "styled-components";
interface IVideoPlayerProps {
  options: videojs.PlayerOptions;
}

const initialOptions: videojs.PlayerOptions = {
  controls: true,
  autoplay: true,
  loop: true,
  muted: true,
  fluid: true,
  preload: "auto",
  aspectRatio: "1:1",
};

const VideoWrapper = styled.div``;

const VideoPlayer: React.FC<IVideoPlayerProps> = ({ options }) => {
  const isMobile = useIsMobile();
  const videoNode = React.useRef<HTMLVideoElement>(null);
  const player = React.useRef<videojs.Player | null>(null);

  React.useEffect(() => {
    if (videoNode.current) {
      player.current = videojs(videoNode.current, {
        ...initialOptions,
        ...options,
        autoplay: isMobile ? false : true,
      });
      return () => {
        if (player.current) {
          player.current.dispose();
        }
      };
    }
  }, []);

  return (
    <>
      <VideoJsGlobalStyle />
      <VideoWrapper>
        <video ref={videoNode} className={`video-js vjs-default-skin`} />
      </VideoWrapper>
    </>
  );
};

export default VideoPlayer;
