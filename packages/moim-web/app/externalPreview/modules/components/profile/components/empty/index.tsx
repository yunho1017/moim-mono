import React from "react";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
import EmptyNFTIconBase from "@icon/48-empty-nft.svg";
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

const EmptyNFTIcon = styled(EmptyNFTIconBase).attrs(props => ({
  size: "l",
  touch: 42,
  iconColor: props.theme.colorV2.colorSet.grey50,
}))``;

export const NFTEmpty = React.memo(() => {
  return <EmptyBase icon={<EmptyNFTIcon />} text="profile_show_nft_empty" />;
});
