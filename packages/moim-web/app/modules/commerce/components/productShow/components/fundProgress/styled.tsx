import styled, { css } from "styled-components";
import { px2rem } from "common/helpers/rem";
import LineBlock from "common/components/blockitEditorBase/components/blockitRenderer/components/line";
import {
  H4Bold,
  B4Regular,
  B3Regular,
} from "common/components/designSystem/typos";

export const Wrapper = styled.div`
  width: 100%;
  height: fit-content;
  padding: ${px2rem(12)} 0 0;
  display: flex;
  flex-direction: column;
`;

export const Head = styled.div`
  width: 100%;
  display: flex;
  .left,
  .right {
    flex: 1;
    min-width: 0;
    width: 100%;
  }

  .right {
    display: flex;
    align-self: flex-end;
    justify-content: flex-end;
  }
`;

export const AchieveTitle = styled(H4Bold)`
  color: ${props => props.theme.colorV2.accent};
`;

export const AchieveCaption = styled(B4Regular)`
  color: ${props => props.theme.colorV2.colorSet.grey300};
`;

export const ProgressWrapper = styled.div`
  width: 100%;
`;

export const Footer = styled.div`
  width: 100%;
  display: flex;

  .left,
  .right {
    padding: ${px2rem(4)} 0;
    flex: 1;
    min-width: 0;
    width: 100%;
  }

  .right {
    display: flex;
    align-self: flex-end;
    justify-content: flex-end;
  }
`;

export const Participant = styled(B3Regular)`
  cursor: pointer;
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const Progress = styled(LineBlock).attrs(props => ({
  type: "line",
  backgroundColor: props.theme.colorV2.primary.light,
  fillColor: props.theme.colorV2.accent,
  height: 3,
  margin: {
    left: 0,
    right: 0,
    top: 8,
    bottom: 8,
  },
  wrapperStyle: css`
    background-color: transparent;
  `,
}))``;

export const MiddleDotSeparator = styled.span`
  display: inline-block;
  margin: 0 ${px2rem(4)};
`;
