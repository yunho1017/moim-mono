import * as React from "react";
import { FormattedMessage } from "react-intl";
import { InView } from "react-intersection-observer";
import { VideoInputDevice } from "amazon-chime-sdk-js";
import { StaticSelection } from "common/components/designSystem/selection";
import { IOption } from "common/components/designSystem/selection/type";
import { GhostButton } from "common/components/designSystem/buttons";

import testSound from "./testSound";
import {
  Wrapper,
  VolumeIndicator,
  ContentContainer,
  SaveButton,
  Footer,
  VideoElement,
} from "./styled";
import { useDeviceManager } from "../../providers/deviceManager";

export interface IProps {
  onSave(): void;
}

const DeviceControl: React.FC<IProps> = ({ onSave }) => {
  const deviceManager = useDeviceManager();
  const refVideoElement = React.useRef<HTMLVideoElement>(null);
  const [micVolume, setMicVolume] = React.useState(0);

  const refAnalyserId = React.useRef<string | null>(null);

  const startMicPreview = React.useCallback(
    async (pId: Moim.Id) => {
      if (deviceManager.defaultDeviceController) {
        refAnalyserId.current = pId;
        await deviceManager.defaultDeviceController.startAudioInput(pId);
        const analyserNode = deviceManager.defaultDeviceController.createAnalyserNodeForAudioInput();

        if (!analyserNode?.getByteTimeDomainData) {
          return;
        }

        const data = new Uint8Array(analyserNode.fftSize);
        let frameIndex = 0;

        const analyserNodeCallback = (aId: string) => {
          if (frameIndex === 0) {
            analyserNode.getByteTimeDomainData(data);
            const lowest = 0.01;
            let max = lowest;
            data.forEach(f => {
              max = Math.max(max, (f - 128) / 128);
            });
            const normalized =
              (Math.log(lowest) - Math.log(max)) / Math.log(lowest);
            const percent = Math.round(
              Math.min(Math.max(normalized * 100, 0), 100),
            );
            setMicVolume(percent);
          }
          frameIndex = (frameIndex + 1) % 2;
          requestAnimationFrame(() => {
            if (refAnalyserId.current === aId) {
              analyserNodeCallback(aId);
            }
          });
        };

        requestAnimationFrame(() => {
          analyserNodeCallback(pId);
        });
      }
    },
    [deviceManager.defaultDeviceController],
  );

  const startVideoPreview = React.useCallback(
    async (deviceInput: VideoInputDevice) => {
      if (refVideoElement.current) {
        deviceManager.defaultDeviceController?.chooseVideoInputQuality(
          1280,
          720,
          30,
        );
        await deviceManager.defaultDeviceController?.startVideoInput(
          deviceInput,
        );
        deviceManager.defaultDeviceController?.startVideoPreviewForVideoInput(
          refVideoElement.current,
        );
      }
    },
    [deviceManager.defaultDeviceController],
  );

  const startSpeakerPreview = React.useCallback(async (pId: Moim.Id) => {
    testSound(undefined, pId);
  }, []);

  const handleChangeAudioOption = React.useCallback(
    (value: Moim.Id) => {
      deviceManager.selectAudioOutput(value);
    },
    [deviceManager],
  );
  const handleChangeVideoOption = React.useCallback(
    (value: Moim.Id) => {
      deviceManager.selectVideo(value);
      requestAnimationFrame(() => {
        startVideoPreview(value);
      });
    },
    [deviceManager, startVideoPreview],
  );
  const handleChangeMicOption = React.useCallback(
    (value: Moim.Id) => {
      deviceManager.selectAudioInput(value);
      requestAnimationFrame(() => {
        startMicPreview(value);
      });
    },
    [deviceManager, startMicPreview],
  );

  React.useEffect(
    () => () => {
      refAnalyserId.current = null;
      const controller = deviceManager.defaultDeviceController;
      if (controller) {
        if (refVideoElement.current) {
          controller.stopVideoPreviewForVideoInput(refVideoElement.current);
        }
        Promise.all([controller.stopAudioInput(), controller.stopVideoInput()]);
      }
    },
    [],
  );

  if (deviceManager.isLoading) {
    return <div>장치 불러오는중...</div>;
  }

  return (
    <InView
      triggerOnce={true}
      onChange={(inView: boolean) => {
        if (inView) {
          if (deviceManager.selectedVideo && !deviceManager.muteVideo) {
            startVideoPreview(deviceManager.selectedVideo);
          }
          if (
            deviceManager.selectedAudioInput &&
            !deviceManager.muteAudioInput
          ) {
            startMicPreview(deviceManager.selectedAudioInput);
          }
        }
      }}
    >
      <Wrapper>
        <ContentContainer>
          {deviceManager.isDeniedPermission ? (
            <div style={{ color: "red", fontStyle: "italic" }}>
              You should Accept use media devices.
              <a style={{ color: "blue  " }} href="#">
                <u>[권한 변경하는법]</u>
              </a>
            </div>
          ) : null}
          <div>
            <label>Audios</label>
            <StaticSelection
              size="l"
              state="normal"
              selected={deviceManager.selectedAudioOutput}
              isMultiple={false}
              options={deviceManager.audioOutputList.map(
                item =>
                  ({
                    value: item.deviceId,
                    label: item.label,
                  } as IOption),
              )}
              menuPortalTarget={document.body}
              onChange={handleChangeAudioOption}
            />

            <GhostButton
              size="s"
              onClick={() => {
                if (deviceManager.selectedAudioOutput) {
                  startSpeakerPreview(deviceManager.selectedAudioOutput);
                }
              }}
            >
              Sample sound test
            </GhostButton>
          </div>
          <div>
            <label>Videos</label>
            <StaticSelection
              size="l"
              state="normal"
              selected={deviceManager.selectedVideo as any}
              isMultiple={false}
              options={deviceManager.videoList.map(
                item =>
                  ({
                    value: item.deviceId,
                    label: item.label,
                  } as IOption),
              )}
              menuPortalTarget={document.body}
              onChange={handleChangeVideoOption}
            />
            <GhostButton
              size="s"
              onClick={() => {
                if (refVideoElement.current) {
                  if (deviceManager.muteVideo) {
                    if (deviceManager.selectedVideo) {
                      startVideoPreview(deviceManager.selectedVideo);
                    }
                  } else {
                    deviceManager.defaultDeviceController?.stopVideoPreviewForVideoInput(
                      refVideoElement.current,
                    );
                  }
                }

                deviceManager.setMuteVideo(!deviceManager.muteVideo);
              }}
            >
              {deviceManager.muteVideo ? "켜기" : "끄기"}
            </GhostButton>

            <VideoElement
              ref={refVideoElement}
              id="video-preview"
              autoPlay={true}
              muted={true}
            />
          </div>
          <div>
            <label>Mics</label>
            <StaticSelection
              size="l"
              state="normal"
              selected={deviceManager.selectedAudioInput}
              isMultiple={false}
              options={deviceManager.audioInputList.map(
                item =>
                  ({
                    value: item.deviceId,
                    label: item.label,
                  } as IOption),
              )}
              menuPortalTarget={document.body}
              onChange={handleChangeMicOption}
            />

            <GhostButton
              size="s"
              onClick={() => {
                if (refVideoElement.current) {
                  if (deviceManager.muteAudioInput) {
                    if (deviceManager.selectedAudioInput) {
                      deviceManager.defaultDeviceController?.startAudioInput(
                        deviceManager.selectedAudioInput,
                      );
                      startMicPreview(deviceManager.selectedAudioInput);
                    }
                  } else {
                    deviceManager.defaultDeviceController?.stopAudioInput();
                    refAnalyserId.current = null;
                  }
                }

                deviceManager.setMuteAudioInput(!deviceManager.muteAudioInput);
              }}
            >
              {deviceManager.muteAudioInput ? "켜기" : "끄기"}
            </GhostButton>

            <div>
              <VolumeIndicator strength={micVolume} />
            </div>
          </div>
        </ContentContainer>

        <Footer>
          <SaveButton onClick={onSave}>
            <FormattedMessage id="button_ok" />
          </SaveButton>
        </Footer>
      </Wrapper>
    </InView>
  );
};

export default DeviceControl;
