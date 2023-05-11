import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import CloseIconBase from "@icon/36-close.svg";
import QuestionIconBase from "@icon/18-question-red.svg";
import { FlatButton } from "common/components/designSystem/buttons";
import {
  H4Bold,
  H10Bold,
  B3Regular,
  B3RegularStyle,
  B4RegularStyle,
} from "common/components/designSystem/typos";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: ${px2rem(16)};
  position: relative;
`;

export const LeaveButton = styled(CloseIconBase).attrs({
  size: "m",
  role: "button",
})``;

export const LeaveButtonPlacement = styled.div`
  position: sticky;
  top: ${px2rem(16)};
  right: ${px2rem(16)};
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const Title = styled(H4Bold)`
  text-align: center;
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const TitleSection = styled.div`
  width: 100%;
  margin-top: ${px2rem(28)};
  margin-bottom: ${px2rem(24)};
  padding: ${px2rem(8)} ${px2rem(16)};
`;

export const VideoPreviewContainer = styled.div<{ isOff: boolean }>`
  position: relative;
  width: ${px2rem(160)};
  height: ${px2rem(300)};
  border-radius: ${px2rem(8)};
  overflow: hidden;

  .offline {
    position: absolute;
    text-align: center;
    word-break: keep-all;
    top: ${px2rem(68)};
    left: 50%;
    transform: translateX(-50%);
    visibility: ${props => (props.isOff ? "visible" : "hidden")};
    color: ${props => props.theme.colorV2.colorSet.white1000};
    ${B3RegularStyle}
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
    border-radius: ${px2rem(8)};
    object-fit: cover;
    background-color: black;
    z-index: ${props => props.theme.zIndexes.below};
  }
`;

export const VideoPreviewSection = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${px2rem(50)};
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
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 1px ${px2rem(16)};
  .text {
    margin-right: ${px2rem(4)};
  }
  > a{
    display: flex;
    align-items: center;
  }
`;

export const FooterDisclaimer = styled.div`
  width: 100%;
  margin-top: ${px2rem(24)};
  margin-bottom: ${px2rem(4)};
  min-height: ${px2rem(154)};
  padding: ${px2rem(16)} 0;
  border-radius: ${px2rem(8)};
  background-color: ${props => props.theme.colorV2.colorSet.grey10};
  display: flex;
  flex-direction: column;
`;

export const JoinButton = styled(FlatButton).attrs({ size: "l" })`
  width: 100%;
`;

export const JoinButtonSection = styled.div`
  width: 100%;
  padding: ${px2rem(12)} 0 ${px2rem(16)};
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  z-index: ${props => props.theme.zIndexes.gnbSticky};
`;

export const ToggleButton = styled.button.attrs({ role: "button" })`
  position: absolute;
  top: ${px2rem(4)};
  right: ${px2rem(4)};
  width: ${px2rem(36)};
  height: ${px2rem(36)};

  border-radius: 100%;
  background-color: ${props => props.theme.colorV2.colorSet.white700};
`;
