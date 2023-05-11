import React from "react";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
import { connetWithMetamask } from "app/externalPreview/api/nft";
// helper
import { px2rem } from "common/helpers/rem";
// components
import { Spacer } from "common/components/designSystem/spacer";
import {
  GhostButton,
  FlatButton,
} from "common/components/designSystem/buttons";
// icons
import MetamasekIconBase from "@icon/18-social-metamask.svg";
import RedirectLoadingDialog from "../../../../../common/components/redirectLoadingDialog";
import { getCommunityId, getUserToken } from "app/externalPreview/helper";

const Wrapper = styled.div`
  padding: ${px2rem(10)} ${px2rem(16)};
`;

const MetaMaskConnetButton = styled(GhostButton).attrs({
  size: "l",
})`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${px2rem(7)};
  border-radius: ${px2rem(4)};
  border: solid 1px rgba(1, 5, 5, 0.14);
  color: #010505;
`;

const MetamasekIcon = styled(MetamasekIconBase).attrs({
  size: "xs",
})``;

const MintButton = styled(FlatButton).attrs({ size: "l" })<{
  disabled?: boolean;
}>`
  width: 100%;
  background-color: var(--external-main-color);
  color: #fff;
  cursor: ${props => (props.disabled ? "default !important" : "pointer")};
`;

interface IProps {
  userId: string;
  hasWalletAddress: boolean;
}

const Buttons: React.FC<IProps> = ({ userId, hasWalletAddress }) => {
  const communityId = getCommunityId();
  const tokenId = getUserToken();

  const [openLoadingDialog, setLoadingDialogStatus] = React.useState<boolean>(
    false,
  );

  const handleClickButton = React.useCallback(() => {
    setLoadingDialogStatus(true);
    connetWithMetamask(window.location.href).then(result => {
      if (result?.location) window.location.href = result.location;
    });
  }, []);

  const handleClickMintButton = React.useCallback(() => {
    window.location.href = `/communities/${communityId}/user/${userId}/minting?token=${tokenId}`;
  }, [communityId, tokenId, userId]);

  return (
    <>
      <Wrapper>
        {!hasWalletAddress && (
          <>
            <MetaMaskConnetButton onClick={handleClickButton}>
              <FormattedMessage id="button_connect_with_metamask" />
              <MetamasekIcon />
            </MetaMaskConnetButton>
            <Spacer value={8} />
          </>
        )}
        {hasWalletAddress && (
          <MintButton onClick={handleClickMintButton}>
            <FormattedMessage id="button_go_to_user_nft_mint_page" />
          </MintButton>
        )}
      </Wrapper>
      <RedirectLoadingDialog
        open={openLoadingDialog}
        onClose={() => setLoadingDialogStatus(true)}
      />
    </>
  );
};

export default React.memo(Buttons);
