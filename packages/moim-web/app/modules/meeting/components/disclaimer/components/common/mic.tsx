import * as React from "react";
import styled, { ThemeContext } from "styled-components";
import MicOffIconBase from "@icon/48-mic-off.svg";
import { px2rem } from "common/helpers/rem";
import { MEDIA_QUERY } from "common/constants/responsive";
import { useDeviceManager } from "app/modules/meeting/components/providers/deviceManager";

const SvgWrapper = styled.svg`
  #myClip {
    will-change: height;
    transform: rotate(180deg);
    transform-origin: center center;
  }
`;

const MicIndicator: React.FC<{ volume: number }> = ({ volume }) => {
  const theme = React.useContext(ThemeContext);
  return (
    <SvgWrapper
      width="48"
      height="48"
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
    >
      <clipPath id="myClip">
        <rect
          x="20"
          y="22"
          width="10"
          height={Math.round(12 * (volume / 100))}
        />
      </clipPath>
      <g fill="none" fill-rule="evenodd">
        <path
          d="M29.91 21.84a.75.75 0 0 1 .742.65l.007.1v.243a6.417 6.417 0 0 1-5.908 6.397l-.001 3.702c0 .452-.336.818-.75.818-.38 0-.693-.308-.743-.707l-.007-.111V29.23a6.417 6.417 0 0 1-5.905-6.167l-.004-.23v-.242a.75.75 0 0 1 1.493-.102l.007.102v.242a4.917 4.917 0 0 0 4.698 4.912l.219.005h.484a4.917 4.917 0 0 0 4.912-4.698l.005-.219v-.242a.75.75 0 0 1 .75-.75zM24 14c1.958 0 3.545 1.637 3.545 3.656v4.688C27.545 24.363 25.958 26 24 26s-3.545-1.637-3.545-3.656v-4.688C20.455 15.637 22.042 14 24 14z"
          fill="#FFF"
        />

        <path
          id="indicator"
          d="M 24 14 C 25.958 14 27.545 15.637 27.545 17.656 L 27.545 22.344 C 27.545 24.363 25.958 26 24 26 C 22.042 26 20.455 24.363 20.455 22.344 L 20.455 17.656 C 20.455 15.637 22.042 14 24 14 Z"
        />
        <use
          clipPath="url(#myClip)"
          href="#indicator"
          fill={theme.colorV2.accent}
        />
      </g>
    </SvgWrapper>
  );
};

const Container = styled.button<{
  isOff: boolean;
  isBlackBackground?: boolean;
}>`
  width: ${px2rem(48)};
  height: ${px2rem(48)};
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 100%;
  background-color: ${props =>
    props.isOff
      ? props.theme.color.red700
      : props.isBlackBackground
      ? props.theme.colorV2.colorSet.white50
      : props.theme.colorV2.colorSet.grey700};

  @media ${MEDIA_QUERY.ONLY_DESKTOP} {
    transition: opacity 300ms ease-in;

    :hover {
      opacity: 0.4;
    }
  }
`;

const OffIcon = styled(MicOffIconBase).attrs({ size: "l" })``;

interface IProps {
  isOff: boolean;
  isBlackBackground?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const MicControlButton: React.FC<IProps> = ({
  isOff,
  isBlackBackground,
  onClick,
}) => {
  const [micVolume, setMicVolume] = React.useState(0);
  const refAnalyserId = React.useRef<string | null>(null);
  const deviceManager = useDeviceManager();

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

  React.useEffect(() => {
    if (deviceManager.selectedAudioInput) {
      if (deviceManager.muteAudioInput) {
        refAnalyserId.current = null;
      } else {
        startMicPreview(deviceManager.selectedAudioInput);
      }
    }
  }, [deviceManager.selectedAudioInput, deviceManager.muteAudioInput]);

  return (
    <Container
      role="button"
      isOff={isOff}
      isBlackBackground={isBlackBackground}
      onClick={onClick}
    >
      {isOff ? <OffIcon /> : <MicIndicator volume={micVolume} />}
    </Container>
  );
};

export default MicControlButton;
