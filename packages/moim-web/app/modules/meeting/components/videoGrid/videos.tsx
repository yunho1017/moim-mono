import * as React from "react";
import { useAudioVideo } from "amazon-chime-sdk-component-library-react";
import styled, { css } from "styled-components";
import { px2rem } from "common/helpers/rem";
import useBlinkBehavior from "common/hooks/useBlinkBehavior";
import { MEDIA_QUERY } from "common/constants/responsive";
import LocalVideoBase from "./components/localVideo";
import RemoteVideoBase from "./components/remoteVideo";

const hoveringBorder = css`
  ::before {
    content: "";
    position: absolute;
    top: ${px2rem(2)};
    left: ${px2rem(2)};
    right: ${px2rem(2)};
    bottom: ${px2rem(2)};
    border: ${px2rem(2)} solid ${props => props.theme.colorV2.primary.light};
    z-index: ${props => props.theme.zIndexes.default};
    border-radius: ${px2rem(8)};

    @media ${MEDIA_QUERY.ONLY_MOBILE} {
      border-radius: ${px2rem(4)};
    }
  }

  ::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: ${px2rem(4)} solid ${props => props.theme.colorV2.primary.light};
    border-radius: ${px2rem(8)};

    @media ${MEDIA_QUERY.ONLY_MOBILE} {
      border-radius: ${px2rem(4)};
    }
  }
`;

const RVideo = styled(RemoteVideoBase)<{ isSpeech: boolean }>`
  ${props => props.isSpeech && hoveringBorder}
`;
const LVideo = styled(LocalVideoBase)<{ isSpeech: boolean }>`
  ${props => props.isSpeech && hoveringBorder}
`;

interface IRemoteVideoProps
  extends React.ComponentProps<typeof RemoteVideoBase> {
  attendeeId: Moim.Id;
  disableSpeechBorder?: boolean;
}

export const RemoteVideo: React.FC<IRemoteVideoProps> = ({
  attendeeId,
  disableSpeechBorder,
  ...rest
}) => {
  const { status: isSpeech, onSetAction } = useBlinkBehavior({
    resolveTime: 3000,
  });
  const audioVideo = useAudioVideo();

  React.useEffect(() => {
    if (!audioVideo || !attendeeId) {
      return;
    }

    const callback = (
      _: string,
      volume: number | null,
      __: boolean | null,
      ___: number | null,
    ) => {
      if (Boolean(volume)) {
        onSetAction();
      }
    };

    audioVideo.realtimeSubscribeToVolumeIndicator(attendeeId, callback);

    return () =>
      audioVideo.realtimeUnsubscribeFromVolumeIndicator(attendeeId, callback);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attendeeId, audioVideo]);

  return <RVideo {...rest} isSpeech={!disableSpeechBorder && isSpeech} />;
};

interface ILocalVideoProps extends React.ComponentProps<typeof LocalVideoBase> {
  attendeeId?: Moim.Id;
  disableSpeechBorder?: boolean;
}

export const LocalVideo: React.FC<ILocalVideoProps> = ({
  attendeeId,
  disableSpeechBorder,
  ...rest
}) => {
  const { status: isSpeech, onSetAction } = useBlinkBehavior({
    resolveTime: 3000,
  });
  const audioVideo = useAudioVideo();

  React.useEffect(() => {
    if (!audioVideo || !attendeeId) {
      return;
    }

    const callback = (
      _: string,
      volume: number | null,
      __: boolean | null,
      ___: number | null,
    ) => {
      if (Boolean(volume)) {
        onSetAction();
      }
    };

    audioVideo.realtimeSubscribeToVolumeIndicator(attendeeId, callback);

    return () =>
      audioVideo.realtimeUnsubscribeFromVolumeIndicator(attendeeId, callback);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attendeeId, audioVideo]);

  return <LVideo {...rest} isSpeech={!disableSpeechBorder && isSpeech} />;
};
