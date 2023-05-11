import * as React from "react";
import { FormattedMessage } from "react-intl";
// constant
import { OPENSEA_URL_PREFIX, RARIBLE_URL_PREFIX } from "../constants";
// utils
import { useOpenSNSShareDialog } from "common/components/snsShareDialog/utils";
// hooks
import useOpenState from "common/hooks/useOpenState";
// components
import ResponsiveMenu from "common/components/responsiveMenu";
import {
  MenuWrapper,
  MenuItem,
} from "common/components/responsiveMenu/components/menu";
// styled
import { IconWrapper, MoreIcon, ShareIcon, Wrapper } from "./styled";

interface PropsType {
  contractAddress?: string;
  network?: string;
  tokenNumber?: number;
}

const HeaderButtons: React.FC<PropsType> = ({
  contractAddress,
  network,
  tokenNumber,
}) => {
  const refMenuButton = React.useRef(null);
  const { isOpen, open, close } = useOpenState(false);
  const openShareDialog = useOpenSNSShareDialog(location.href);
  const showMore = React.useMemo(
    () => !!network && !!contractAddress && !!tokenNumber,
    [network, contractAddress, tokenNumber],
  );

  const symbol = React.useMemo(() => {
    switch (network) {
      case "POLYGON": {
        return "matic";
      }
      case "ETHEREUM": {
        return "ethereum";
      }
    }
  }, [network]);

  return (
    <>
      <Wrapper>
        {showMore && (
          <IconWrapper ref={refMenuButton} onClick={open}>
            <MoreIcon />
          </IconWrapper>
        )}
        <IconWrapper onClick={openShareDialog}>
          <ShareIcon />
        </IconWrapper>
      </Wrapper>

      <ResponsiveMenu
        open={isOpen}
        anchorElement={refMenuButton.current}
        onCloseRequest={close}
      >
        <MenuWrapper>
          <MenuItem onClick={close}>
            <a
              href={`${OPENSEA_URL_PREFIX}/${symbol}/${contractAddress}/${tokenNumber}`}
              target="_blank"
            >
              <FormattedMessage id="nft_show_more_opensea" />
            </a>
          </MenuItem>
          <MenuItem onClick={close}>
            <a
              href={`${RARIBLE_URL_PREFIX}/${network?.toLowerCase()}/${contractAddress}:${tokenNumber}`}
              target="_blank"
            >
              <FormattedMessage id="nft_show_more_rarible" />
            </a>
          </MenuItem>
        </MenuWrapper>
      </ResponsiveMenu>
    </>
  );
};

export default React.memo(HeaderButtons);
