import * as React from "react";

import { FormattedMessage } from "react-intl";

import {
  Wrapper,
  Tip,
  IconWrapper,
  InstargramIcon,
  SlackIcon,
  NaverBandIcon,
  RedditIcon,
  MoreIcon,
} from "./styled";

export default function ShareTip() {
  return (
    <Wrapper>
      <Tip>
        <FormattedMessage id="social_sharing/tip" />
      </Tip>
      <IconWrapper>
        <InstargramIcon />
        <SlackIcon />
        <NaverBandIcon />
        <RedditIcon />
        <MoreIcon />
      </IconWrapper>
    </Wrapper>
  );
}
