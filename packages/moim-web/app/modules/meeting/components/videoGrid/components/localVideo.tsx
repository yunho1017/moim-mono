import * as React from "react";
import {
  useApplyVideoObjectFit,
  useAudioVideo,
  useLocalVideo,
  VideoTile,
} from "amazon-chime-sdk-component-library-react";
import styled from "styled-components";
import { BaseSdkProps } from "amazon-chime-sdk-component-library-react/lib/components/sdk/Base";

interface Props extends BaseSdkProps {
  id?: string;
  nameplate?: string;
}

const StyledLocalVideo = styled<any>(VideoTile)`
  ${props => (!props.active ? "display: none" : "")};
`;

export const LocalVideo: React.FC<Props> = ({ nameplate, ...rest }) => {
  const { tileId, isVideoEnabled } = useLocalVideo();
  const audioVideo = useAudioVideo();
  const videoEl = React.useRef<HTMLVideoElement>(null);
  useApplyVideoObjectFit(videoEl);

  React.useEffect(() => {
    if (!audioVideo || !tileId || !videoEl.current || !isVideoEnabled) {
      return;
    }

    audioVideo.bindVideoElement(tileId, videoEl.current);

    return () => {
      const tile = audioVideo.getVideoTile(tileId);
      if (tile) {
        // audioVideo.unbindVideoElement(tileId);
      }
    };
  }, [audioVideo, tileId, isVideoEnabled]);

  return (
    <StyledLocalVideo
      active={isVideoEnabled}
      nameplate={nameplate}
      ref={videoEl}
      {...rest}
    />
  );
};

export default LocalVideo;
