import * as React from "react";
import styled from "styled-components";
import VideoOnIconBase from "@icon/48-video-on.svg";
import VideoOffIconBase from "@icon/48-video-off.svg";
import { px2rem } from "common/helpers/rem";
import { MEDIA_QUERY } from "common/constants/responsive";

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

const OnIcon = styled(VideoOnIconBase).attrs({ size: "l" })``;
const OffIcon = styled(VideoOffIconBase).attrs({ size: "l" })``;

interface IProps {
  isOff: boolean;
  isBlackBackground?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const VideoControlButton: React.FC<IProps> = ({
  isOff,
  isBlackBackground,
  onClick,
}) => (
  <Container
    role="button"
    isOff={isOff}
    isBlackBackground={isBlackBackground}
    onClick={onClick}
  >
    {isOff ? <OffIcon /> : <OnIcon />}
  </Container>
);

export default VideoControlButton;
