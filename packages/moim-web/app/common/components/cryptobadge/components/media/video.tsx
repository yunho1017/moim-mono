import * as React from "react";
import videojs from "video.js";
import { VideoJsGlobalStyle } from "common/components/hlsVideo/styledComponents";
import styled, { FlattenInterpolation } from "styled-components";
interface IVideoPlayerProps {
  options: videojs.PlayerOptions;
  videoStyle?: FlattenInterpolation<any>;
  className?: string;
}

const initialOptions: videojs.PlayerOptions = {
  loop: true,
  autoplay: true,
  muted: true, // NOTE: for mobile autoplay
  playsinline: true,
  controls: true,
  preload: "auto",
  aspectRatio: "1:1",
};

const VideoWrapper = styled.div<{
  overrideStyle?: FlattenInterpolation<any>;
}>`
  .vjs-progress-holder,
  .vjs-seek-to-live-control,
  .vjs-remaining-time,
  .vjs-time-control {
    display: none;
  }
  cursor: zoom-in;
  ${props => props.overrideStyle};
`;

const VideoPlayer: React.FC<IVideoPlayerProps> = ({
  options,
  videoStyle,
  className,
}) => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <VideoJsGlobalStyle />
      <VideoWrapper overrideStyle={videoStyle}>
        <video
          ref={videoNode}
          className={`video-js vjs-default-skin ${className}`}
        />
      </VideoWrapper>
    </>
  );
};

export default VideoPlayer;
