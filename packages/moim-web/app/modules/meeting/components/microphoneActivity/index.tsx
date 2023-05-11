// NOTE: from https://github.com/aws/amazon-chime-sdk-component-library-react/blob/main/src/components/sdk/MicrophoneActivity/index.tsx

import * as React from "react";

import {
  useAttendeeAudioStatus,
  useAudioVideo,
} from "amazon-chime-sdk-component-library-react";
import MicVolumeIndicator from "../micVolumeIndicator";

interface Props {
  /** The Chime attendee ID */
  [key: string]: any;
  attendeeId: string;
  hostMuted?: boolean;
}

export const MicrophoneActivity: React.FC<Props> = ({
  attendeeId,
  ...rest
}) => {
  const audioVideo = useAudioVideo();
  const bgEl = React.useRef<HTMLDivElement>(null);
  const { signalStrength, muted } = useAttendeeAudioStatus(attendeeId);

  React.useEffect(() => {
    if (!audioVideo || !attendeeId || !bgEl.current) {
      return;
    }

    const callback = (
      _: string,
      volume: number | null,
      __: boolean | null,
      ___: number | null,
    ) => {
      if (bgEl.current) {
        bgEl.current.style.transform = `scaleY(${volume})`;
      }
    };

    audioVideo.realtimeSubscribeToVolumeIndicator(attendeeId, callback);

    return () =>
      audioVideo.realtimeUnsubscribeFromVolumeIndicator(attendeeId, callback);
  }, [attendeeId]);

  return (
    <MicVolumeIndicator
      {...rest}
      ref={bgEl}
      muted={muted}
      signalStrength={signalStrength}
    />
  );
};

export default MicrophoneActivity;
