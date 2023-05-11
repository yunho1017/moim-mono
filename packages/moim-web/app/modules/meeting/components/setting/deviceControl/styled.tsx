import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { FlatButton } from "common/components/designSystem/buttons";

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: ${px2rem(20)};
`;

export const VideoElement = styled.video`
  width: ${px2rem(360)};
  height: ${px2rem(280)};
`;

export const VolumeIndicator = styled.div<{ strength: number }>`
  width: 100%;
  position: relative;
  height: ${px2rem(4)};

  background-color: rgba(0, 0, 0, 0.7);
  overflow: hidden;
  border-radius: ${px2rem(4)};

  ::before {
    transition: width 100ms ease;
    will-change: width;
    content: "";

    position: absolute;
    top: 1px;
    left: 0;
    width: ${props => `${props.strength}%`};
    height: ${px2rem(2)};
    background-color: #33e563;
  }
`;

export const ContentContainer = styled.div`
  width: 100%;
  flex: 1;
  min-height: 0;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  margin-bottom: ${px2rem(40)};
`;

export const SaveButton = styled(FlatButton).attrs({ size: "l" })`
  width: 100%;
`;

export const Footer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;

  width: 100%;
  height: ${px2rem(48)};
`;
