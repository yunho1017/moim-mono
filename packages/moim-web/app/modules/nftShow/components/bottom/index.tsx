import React from "react";
import styled from "styled-components";
import { rgba } from "polished";
import { ActionCreators as NftActionCreators } from "app/actions/nft";

import { useActions } from "app/store";
// hooks
import useCurrentGroup from "common/hooks/useCurrentGroup";
import useCurrentHubGroup from "common/hooks/useCurrentHubGroup";
// helpers
import { mintNft } from "app/common/helpers/nft";
import { px2rem } from "common/helpers/rem";
// components
import ShareIconBase from "@icon/24-share-1.svg";
import { useOpenSNSShareDialog } from "common/components/snsShareDialog/utils";
import { Spacer } from "common/components/designSystem/spacer";
import Period from "../top/components/period";
import Button from "./button";

export const BottomWrapper = styled.div`
  display: block;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: ${px2rem(90)};
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
  box-shadow: 0 ${px2rem(2)} ${px2rem(8)} 0
    ${props => rgba(props.theme.colorV2.colorSet.grey800, 0.2)};
  padding: ${px2rem(10)} ${px2rem(16)} ${px2rem(8)};
  z-index: ${props => props.theme.zIndexes.popover};
`;

const Container = styled.div`
  display: flex;
  gap: ${px2rem(12)};
`;

const ButtonWrapper = styled.div`
  flex-grow: 1;
`;

const IconWrapper = styled.div`
  width: ${px2rem(48)};
  height: ${px2rem(48)};
  border-radius: ${px2rem(4)};
  border: ${px2rem(1)} solid ${props => props.theme.colorV2.colorSet.grey50};
  transition: opacity 200ms ease-in;

  &:hover {
    opacity: 0.6;
  }
`;

const ShareIcon = styled(ShareIconBase).attrs(props => ({
  size: "s",
  touch: 45,
  iconColor: props.theme.colorV2.colorSet.grey800,
}))``;

interface PropsType {
  tokenId: string;
  scheduleMintable: boolean;
  mintable: boolean;
  status: Moim.NFT.INftStatus;
  startAt?: number;
  endAt?: number;
}

const Bottom: React.FC<PropsType> = ({
  tokenId,
  scheduleMintable,
  mintable,
  status,
  startAt,
  endAt,
}) => {
  const openShareDialog = useOpenSNSShareDialog(location.href);

  const currentGroup = useCurrentGroup();
  const currentHubGroup = useCurrentHubGroup();

  const { open } = useActions({
    open: NftActionCreators.openMintRedirectLoadingDialog,
  });
  const handleClickMint = React.useCallback(() => {
    open();
    if (currentGroup?.id && currentHubGroup?.id) {
      mintNft(
        currentHubGroup?.id,
        currentGroup?.id,
        window.location.href,
        tokenId,
      );
    }
  }, [currentGroup?.id, currentHubGroup?.id, open, tokenId]);

  return (
    <BottomWrapper>
      <Container>
        <IconWrapper onClick={openShareDialog}>
          <ShareIcon />
        </IconWrapper>
        <ButtonWrapper>
          <Button
            itemMintable={mintable}
            itemStatus={status}
            scheduleMintable={scheduleMintable}
            mintingStartAt={startAt ?? 0}
            mintingEndAt={endAt ?? 0}
            onMint={handleClickMint}
          />
          <Spacer value={7} />
          <Period startAt={startAt} endAt={endAt} />
        </ButtonWrapper>
      </Container>
    </BottomWrapper>
  );
};

export default React.memo(Bottom);
