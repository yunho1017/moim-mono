import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import {
  B1RegularStyle,
  H4Bold,
  H10Bold,
  B3Regular,
  B4RegularStyle,
} from "common/components/designSystem/typos";

import {
  GhostGeneralButton,
  FlatButton,
} from "common/components/designSystem/buttons";
import QuestionIconBase from "@icon/18-question-red.svg";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: ${px2rem(32)};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const LeaveButton = styled(GhostGeneralButton).attrs({ size: "s" })`
  width: fit-content;
`;

export const LeaveButtonPlacement = styled.div`
  position: absolute;
  top: ${px2rem(32)};
  left: ${px2rem(32)};
`;

export const Content = styled.div`
  width: 100%;
  max-width: ${px2rem(1000)};
  display: flex;
  flex-direction: column;
`;

export const PreviewSection = styled.div`
  width: 100%;
  height: ${px2rem(250)};
  display: flex;
`;

export const VideoPreviewContainer = styled.div<{ isOff: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: ${px2rem(8)};
  flex: 1;
  min-width: 0;
  overflow: hidden;

  .offline {
    position: absolute;
    top: ${px2rem(68)};
    left: 50%;
    transform: translateX(-50%);
    visibility: ${props => (props.isOff ? "visible" : "hidden")};
    color: ${props => props.theme.colorV2.colorSet.white1000};
    ${B1RegularStyle}
  }

  .controls {
    width: 100%;
    position: absolute;
    bottom: ${px2rem(16)};
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    gap: ${px2rem(16)};
    z-index: ${props => props.theme.zIndexes.default};
  }

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: ${px2rem(8)};
    background-color: black;
  }
`;

export const Title = styled(H4Bold)`
  width: 100%;
  text-align: center;
  margin-top: ${px2rem(40)};
  padding: ${px2rem(8)} ${px2rem(16)};
  white-space: pre-line;
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const JoinButton = styled(FlatButton).attrs({ size: "l" })`
  width: 100%;
  max-width: ${px2rem(280)};
  margin-top: ${px2rem(16)};
`;

export const MeetingInfoContainer = styled.div`
  width: 100%;
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const DeviceSettingButtonSection = styled.button.attrs({
  role: "button",
})`
  width: fit-content;
  margin-top: ${px2rem(18)};
  padding: 1px ${px2rem(6)};
  border-radius: ${px2rem(10)};
  border: solid 1px ${props => props.theme.colorV2.colorSet.grey50};
  ${B4RegularStyle}
  color:${props => props.theme.colorV2.colorSet.grey500};
`;

export const DisclaimerTitle = styled(H10Bold)`
  padding: ${px2rem(6)} ${px2rem(16)};
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;
export const DisclaimerContent = styled(B3Regular)`
  width: 100%;
  height: 100%;
  flex: 1;
  min-height: 0;
  padding: ${px2rem(4)} ${px2rem(16)};
  white-space: pre-line;
  color: ${props => props.theme.colorV2.colorSet.grey300};
`;

export const DisclaimerHintIcon = styled(QuestionIconBase).attrs({
  size: "xs",
})``;

export const DisclaimerHint = styled.button.attrs({ role: "button" })`
  ${B4RegularStyle}
  color: ${props => props.theme.color.red700};
`;

export const DisclaimerHintContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 1px ${px2rem(16)};
  .text {
    margin-right: ${px2rem(4)};
  }

  transition: opacity 300ms;
  :hover {
    opacity: 0.6;
  }

  > a {
    display: flex;
    align-items: center;
  }
`;

export const FooterDisclaimer = styled.div`
  width: 100%;
  margin-top: ${px2rem(32)};
  min-height: ${px2rem(154)};
  padding: ${px2rem(16)} ${px2rem(8)};
  border-radius: ${px2rem(8)};
  background-color: ${props => props.theme.colorV2.colorSet.grey10};
  display: flex;
  flex-direction: column;
`;
