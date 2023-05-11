import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { B3Regular } from "common/components/designSystem/typos";

import InstargramIconBase from "@icon/18-instargram.svg";
import SlackIconBase from "@icon/18-slack.svg";
import NaverBandIconBase from "@icon/18-naver-band.svg";
import RedditIconBase from "@icon/18-reddit.svg";
import MoreIconBase from "@icon/18-more-g.svg";

export const Wrapper = styled.div`
  width: 100%;
  margin-top: ${px2rem(8)};
`;

export const Tip = styled(B3Regular)`
  width: 100%;
  height: ${px2rem(42)};
  color: ${props => props.theme.colorV2.colorSet.grey600};
  padding: 0 ${px2rem(16)};
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const IconWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  & > * + * {
    margin-left: ${px2rem(8)};
  }
`;

export const InstargramIcon = styled(InstargramIconBase).attrs({
  role: "button",
  size: "xs",
})``;
export const SlackIcon = styled(SlackIconBase).attrs({
  role: "button",
  size: "xs",
})``;
export const NaverBandIcon = styled(NaverBandIconBase).attrs({
  role: "button",
  size: "xs",
})``;
export const RedditIcon = styled(RedditIconBase).attrs({
  role: "button",
  size: "xs",
})``;
export const MoreIcon = styled(MoreIconBase).attrs(props => ({
  role: "button",
  size: "xs",
  iconColor: props.theme.colorV2.colorSet.grey600,
}))``;
