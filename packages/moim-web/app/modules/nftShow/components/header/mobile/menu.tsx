import * as React from "react";
import { FormattedMessage } from "react-intl";

import ResponsiveMenu from "common/components/responsiveMenu";
import {
  MenuWrapper,
  MenuItem,
} from "common/components/responsiveMenu/components/menu";

import { OPENSEA_URL_PREFIX, RARIBLE_URL_PREFIX } from "../constants";

interface IProps
  extends Pick<
    React.ComponentProps<typeof ResponsiveMenu>,
    "open" | "anchorElement" | "onCloseRequest"
  > {
  tokenNumber?: number;
  contractAddress?: string;
  symbol: string;
  network: Moim.Community.IBlockchainType;
}

export default function MoreMenu({
  open,
  anchorElement,
  onCloseRequest,
  contractAddress,
  tokenNumber,
  network,
}: IProps) {
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
    <ResponsiveMenu
      open={open}
      anchorElement={anchorElement}
      onCloseRequest={onCloseRequest}
    >
      <MenuWrapper>
        <MenuItem onClick={close}>
          <a
            href={`${RARIBLE_URL_PREFIX}/${network?.toLowerCase()}/${contractAddress}:${tokenNumber}`}
            target="_blank"
          >
            <FormattedMessage id="nft_show_more_rarible" />
          </a>
        </MenuItem>
        <MenuItem onClick={close}>
          <a
            href={`${OPENSEA_URL_PREFIX}/${symbol}/${contractAddress}/${tokenNumber}`}
            target="_blank"
          >
            <FormattedMessage id="nft_show_more_opensea" />
          </a>
        </MenuItem>
      </MenuWrapper>
    </ResponsiveMenu>
  );
}
