import * as React from "react";
import videojs, { VideoJsPlayer, VideoJsPlayerOptions } from "video.js";
import styled from "styled-components";

const Video = styled.video`
  width: 100%;
  height: 100%;
  pointer-events: none;

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const VideoOption: VideoJsPlayerOptions = {
  loop: true,
  autoplay: true,
  muted: true,
  playsinline: true,
  controlBar: false,
  controls: false,
  preload: "metadata",
};

interface IProps {
  src: string;
}

const CarouselVideo: React.FC<IProps> = ({ src }) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const playerRef = React.useRef<VideoJsPlayer>(null);

  React.useLayoutEffect(() => {
    if (videoRef.current) {
      const video = videojs(videoRef.current, VideoOption, () => {
        videojs.log("player is ready");
      });

      (playerRef.current as any) = video;
      video.src(src);
    }
  }, []);

  React.useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        (playerRef.current as any) = null;
      }
    };
  }, [playerRef]);

  return <Video ref={videoRef} src={src} />;
};

export default React.memo(CarouselVideo);
