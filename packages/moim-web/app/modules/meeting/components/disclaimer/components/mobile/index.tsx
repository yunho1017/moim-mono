import * as React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useInView } from "react-intersection-observer";
import { VideoInputDevice } from "amazon-chime-sdk-js";
import { useDeviceManager } from "app/modules/meeting/components/providers/deviceManager";
import MicControlButton from "../common/mic";
import VideoControlButton from "../common/video";
import { IProps } from "../..";
import {
  Wrapper,
  LeaveButton,
  LeaveButtonPlacement,
  TitleSection,
  Title,
  VideoPreviewContainer,
  VideoPreviewSection,
  FooterDisclaimer,
  DisclaimerTitle,
  DisclaimerContent,
  DisclaimerHint,
  DisclaimerHintIcon,
  JoinButton,
  JoinButtonSection,
  ToggleButton,
} from "./styled";

const DisclaimerForMobile: React.FC<IProps> = ({
  meetingName,
  onClickJoin,
  onClickExit,
}) => {
  const intl = useIntl();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 1 });
  const refVideoPreview = React.useRef<HTMLVideoElement>(null);
  const deviceManager = useDeviceManager();

  const videoIsOffline = React.useMemo(
    () =>
      deviceManager.muteVideo ||
      !deviceManager.videoList.length ||
      !deviceManager.selectedVideo,
    [
      deviceManager.muteVideo,
      deviceManager.selectedVideo,
      deviceManager.videoList.length,
    ],
  );

  const startVideoPreview = React.useCallback(
    async (deviceInput: VideoInputDevice) => {
      if (refVideoPreview.current) {
        deviceManager.defaultDeviceController?.chooseVideoInputQuality(
          1280,
          720,
          30,
        );
        await deviceManager.defaultDeviceController?.startVideoInput(
          deviceInput,
        );
        deviceManager.defaultDeviceController?.startVideoPreviewForVideoInput(
          refVideoPreview.current,
        );
      }
    },
    [deviceManager.defaultDeviceController],
  );

  const handleClickMicControl = React.useCallback(() => {
    deviceManager.setMuteAudioInput(!deviceManager.muteAudioInput);
  }, [deviceManager]);

  const handleClickVideoControl = React.useCallback(() => {
    if (deviceManager.muteVideo) {
      if (deviceManager.selectedVideo) {
        startVideoPreview(deviceManager.selectedVideo);
      }
    } else {
      if (refVideoPreview.current) {
        deviceManager.defaultDeviceController?.stopVideoPreviewForVideoInput(
          refVideoPreview.current,
        );
      }
    }
    deviceManager.setMuteVideo(!deviceManager.muteVideo);
  }, [deviceManager, startVideoPreview]);

  React.useLayoutEffect(() => {
    if (
      inView &&
      !deviceManager.muteVideo &&
      !deviceManager.isLoading &&
      deviceManager.selectedVideo
    ) {
      startVideoPreview(deviceManager.selectedVideo);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, deviceManager.isLoading, deviceManager.selectedVideo]);

  return (
    <Wrapper>
      <LeaveButtonPlacement>
        <LeaveButton onClick={onClickExit} />
      </LeaveButtonPlacement>
      <TitleSection>
        <Title>{meetingName}</Title>
      </TitleSection>

      <VideoPreviewSection ref={ref}>
        <VideoPreviewContainer isOff={videoIsOffline}>
          <video
            id="video-preview"
            ref={refVideoPreview}
            playsInline={true}
            autoPlay={true}
            muted={true}
          />
          <div className="offline">
            <FormattedMessage id="video_chat/video_offline" />
          </div>
          <div className="controls">
            <MicControlButton
              isOff={
                deviceManager.muteAudioInput ||
                !deviceManager.audioInputList.length ||
                !deviceManager.selectedAudioInput
              }
              isBlackBackground={videoIsOffline}
              onClick={handleClickMicControl}
            />
            <VideoControlButton
              isOff={videoIsOffline}
              isBlackBackground={videoIsOffline}
              onClick={handleClickVideoControl}
            />
          </div>
          {/* // NOTE: TBD */}
          {false && (
            <ToggleButton
              onClick={() => {
                deviceManager.toggleMobileVideoInput();
              }}
            >
              {deviceManager.currentMobileInputStatus === "front" ? "F" : "B"}
            </ToggleButton>
          )}
        </VideoPreviewContainer>
      </VideoPreviewSection>

      <FooterDisclaimer>
        <DisclaimerTitle>
          <FormattedMessage id="video_chat_disclaimer_title" />
        </DisclaimerTitle>
        <DisclaimerContent>
          <FormattedMessage id="video_chat_disclaimer_description" />
        </DisclaimerContent>
        <DisclaimerHint>
          <a
            target="_blank"
            href={intl.formatMessage({
              id: "video_chat_disclaimer_hint_link",
            })}
          >
            <span className="text">
              <FormattedMessage id="video_chat_disclaimer_hint" />
            </span>
            <DisclaimerHintIcon />
          </a>
        </DisclaimerHint>
      </FooterDisclaimer>

      <JoinButtonSection>
        <JoinButton onClick={onClickJoin}>
          <FormattedMessage id="button_join" />
        </JoinButton>
      </JoinButtonSection>
    </Wrapper>
  );
};

export default DisclaimerForMobile;
