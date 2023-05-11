import React from "react";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
import EmptyBadgeIconBase from "@icon/48-empty-badge.svg";
import EmptyNFTIconBase from "@icon/48-empty-nft.svg";
import EmptyPositionIconBase from "@icon/48-empty-position.svg";
import EmptyTokenIconBase from "@icon/48-empty-token.svg";
import { B4Regular } from "common/components/designSystem/typos";
import { Spacer } from "common/components/designSystem/spacer";

import { px2rem } from "common/helpers/rem";

const Wrapper = styled.div`
  width: 100%;
  padding: ${px2rem(16)} ${px2rem(16)} ${px2rem(14)};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Text = styled(B4Regular)`
  width: 100%;
  color: ${props => props.theme.colorV2.colorSet.grey300};
  text-align: center;
`;

const EmptyBase: React.FC<{
  icon: React.ReactNode;
  text: string;
}> = React.memo(({ icon, text }) => {
  return (
    <Wrapper>
      {icon}
      <Spacer value={8} />
      <Text>
        <FormattedMessage id={text} />
      </Text>
    </Wrapper>
  );
});

const EmptyPositionIcon = styled(EmptyPositionIconBase).attrs(props => ({
  size: "l",
  touch: 42,
  iconColor: props.theme.colorV2.colorSet.grey50,
}))``;

export const PositionEmpty = React.memo(() => {
  return (
    <EmptyBase
      icon={<EmptyPositionIcon />}
      text="profile_show_position_empty"
    />
  );
});

const EmptyNFTIcon = styled(EmptyNFTIconBase).attrs(props => ({
  size: "l",
  touch: 42,
  iconColor: props.theme.colorV2.colorSet.grey50,
}))``;

export const NFTEmpty = React.memo(() => {
  return <EmptyBase icon={<EmptyNFTIcon />} text="profile_show_nft_empty" />;
});

const EmptyBadgeIcon = styled(EmptyBadgeIconBase).attrs(props => ({
  size: "l",
  touch: 42,
  iconColor: props.theme.colorV2.colorSet.grey50,
}))``;

export const BadgeEmpty = React.memo(() => {
  return (
    <EmptyBase icon={<EmptyBadgeIcon />} text="profile_show_badge_empty" />
  );
});

const EmptyTokenIcon = styled(EmptyTokenIconBase).attrs(props => ({
  size: "l",
  touch: 42,
  iconColor: props.theme.colorV2.colorSet.grey50,
}))``;

export const TokenEmpty = React.memo(() => {
  return (
    <EmptyBase icon={<EmptyTokenIcon />} text="profile_show_token_empty" />
  );
});
