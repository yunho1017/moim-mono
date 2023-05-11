import * as React from "react";
import { VideoInputDevice } from "amazon-chime-sdk-js";
import { useInView } from "react-intersection-observer";
import { FormattedMessage, useIntl } from "react-intl";
import MicControlButton from "../common/mic";
import VideoControlButton from "../common/video";
import { IProps } from "../..";
import { useDeviceManager } from "app/modules/meeting/components/providers/deviceManager";
import {
  Wrapper,
  LeaveButton,
  LeaveButtonPlacement,
  Content,
  PreviewSection,
  VideoPreviewContainer,
  Title,
  JoinButton,
  MeetingInfoContainer,
  DisclaimerTitle,
  DisclaimerContent,
  DisclaimerHintIcon,
  DisclaimerHint,
  FooterDisclaimer,
  DisclaimerHintContainer,
} from "./styled";

const DisclaimerForPC: React.FC<IProps> = ({
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
          refVideoPreview.current!,
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
        <LeaveButton onClick={onClickExit}>
          <FormattedMessage id="video_chat/screen/button_leave" />
        </LeaveButton>
      </LeaveButtonPlacement>
      <Content>
        <PreviewSection ref={ref}>
          <VideoPreviewContainer isOff={videoIsOffline}>
            <video id="video-preview" ref={refVideoPreview} />
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
          </VideoPreviewContainer>
          <MeetingInfoContainer>
            <Title>{meetingName}</Title>
            <JoinButton onClick={onClickJoin}>
              <FormattedMessage id="button_join" />
            </JoinButton>
          </MeetingInfoContainer>
        </PreviewSection>

        {/* NOTE: TBD <DeviceSettingButtonSection>
          <FormattedMessage id="video_chat_disclaimer_device_setting" />
        </DeviceSettingButtonSection> */}

        <FooterDisclaimer>
          <DisclaimerTitle>
            <FormattedMessage id="video_chat_disclaimer_title" />
          </DisclaimerTitle>
          <DisclaimerContent>
            <FormattedMessage id="video_chat_disclaimer_description" />
          </DisclaimerContent>
          <DisclaimerHintContainer>
            <a
              target="_blank"
              href={intl.formatMessage({
                id: "video_chat_disclaimer_hint_link",
              })}
            >
              <DisclaimerHint>
                <span className="text">
                  <FormattedMessage id="video_chat_disclaimer_hint" />
                </span>
              </DisclaimerHint>
              <DisclaimerHintIcon />
            </a>
          </DisclaimerHintContainer>
        </FooterDisclaimer>
      </Content>
    </Wrapper>
  );
};

export default DisclaimerForPC;
