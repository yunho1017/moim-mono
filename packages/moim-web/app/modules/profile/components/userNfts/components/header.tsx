import React from "react";
import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { H8Bold } from "common/components/designSystem/typos";
import { FormattedMessage } from "react-intl";
import { useNativeSecondaryView } from "common/hooks/useSecondaryView";
import { MoimURL } from "common/helpers/url";

import RightIconBase from "@icon/18-rightarrow-g.svg";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled(H8Bold)`
  color: ${props => props.theme.colorV2.colorSet.grey800};

  padding: ${px2rem(11)} ${px2rem(8)} ${px2rem(11)} ${px2rem(16)};
  flex: 1;
  min-width: 0;
`;

export const RightArrow = styled(RightIconBase).attrs(props => ({
  size: "xs",
  touch: 42,
  iconColor: props.theme.colorV2.colorSet.grey300,
}))``;

interface PropsType {
  userId?: string;
  hasNFT: boolean;
}
export const Header: React.FC<PropsType> = React.memo(({ userId, hasNFT }) => {
  const { redirect } = useNativeSecondaryView();

  const handleBackButtonClick = React.useCallback(() => {
    if (hasNFT && userId) {
      redirect(new MoimURL.ProfileNftList({ userId }).toString());
    }
  }, [hasNFT, userId, redirect]);

  return (
    <Wrapper
      onClick={handleBackButtonClick}
      role={hasNFT ? "button" : undefined}
    >
      <Title>
        <FormattedMessage id="nft_list_title" />
      </Title>
      {hasNFT && <RightArrow />}
    </Wrapper>
  );
});
