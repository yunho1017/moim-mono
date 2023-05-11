import * as React from "react";
import videojs from "video.js";
import { VideoJsGlobalStyle } from "common/components/hlsVideo/styledComponents";
import styled, { FlattenInterpolation } from "styled-components";
interface IVideoPlayerProps {
  options: videojs.PlayerOptions;
  videoStyle?: FlattenInterpolation<any>;
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

const VideoWrapper = styled.div<{
  overrideStyle?: FlattenInterpolation<any>;
}>`
  ${props => props.overrideStyle};
`;

const VideoPlayer: React.FC<IVideoPlayerProps> = ({ options, videoStyle }) => {
  const videoNode = React.useRef<HTMLVideoElement>(null);
  const player = React.useRef<videojs.Player | null>(null);

  React.useEffect(() => {
    if (videoNode.current) {
      player.current = videojs(videoNode.current, {
        ...initialOptions,
        ...options,
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
      <VideoWrapper overrideStyle={videoStyle}>
        <video ref={videoNode} className={`video-js vjs-default-skin`} />
      </VideoWrapper>
    </>
  );
};

export default VideoPlayer;
