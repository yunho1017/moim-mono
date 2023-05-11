import * as React from "react";
import {
  useApplyVideoObjectFit,
  useAudioVideo,
  VideoTile,
} from "amazon-chime-sdk-component-library-react";
import { BaseSdkProps } from "amazon-chime-sdk-component-library-react/lib/components/sdk/Base";

interface Props
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "css">,
    BaseSdkProps {
  /** The tile ID to bind the video element to */
  tileId: number;
  /** The name to show on the video's nameplate */
  name?: string;
}

export const RemoteVideo: React.FC<Props> = ({
  name,
  className,
  tileId,
  ...rest
}) => {
  const audioVideo = useAudioVideo();
  const videoEl = React.useRef<HTMLVideoElement>(null);
  useApplyVideoObjectFit(videoEl);

  React.useEffect(() => {
    if (!audioVideo || !videoEl.current) {
      return;
    }

    audioVideo.bindVideoElement(tileId, videoEl.current);

    return () => {
      const tile = audioVideo.getVideoTile(tileId);
      if (tile) {
        // audioVideo.unbindVideoElement(tileId);
      }
    };
  }, [audioVideo, tileId]);

  return (
    <VideoTile
      {...rest}
      ref={videoEl}
      nameplate={name}
      className={`ch-remote-video--${tileId} ${className || ""}`}
    />
  );
};

export default RemoteVideo;
