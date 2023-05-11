import * as React from "react";
import { FormattedMessage } from "react-intl";

import ResponsiveMenu from "common/components/responsiveMenu";
import {
  MenuItem,
  MenuWrapper,
} from "common/components/responsiveMenu/components/menu";

import {
  OPENSEA_BADGE_URL_PREFIX,
  RARIBLE_BADGE_URL_PREFIX,
} from "../../../../constants";

interface IProps
  extends Pick<
    React.ComponentProps<typeof ResponsiveMenu>,
    "open" | "anchorElement" | "onCloseRequest"
  > {
  tokenNumber?: number;
  contractAddress?: string;
  network: Moim.Enums.BlockchainNetwork | null;
}

export default function MoreMenu({
  open,
  anchorElement,
  onCloseRequest,
  contractAddress,
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
            href={`${RARIBLE_BADGE_URL_PREFIX}/${network?.toLowerCase()}/${contractAddress}`}
            target="_blank"
          >
            <FormattedMessage id="cryptobadge_show_more_rarible" />
          </a>
        </MenuItem>
        <MenuItem onClick={close}>
          <a
            href={`${OPENSEA_BADGE_URL_PREFIX}/${symbol}/${contractAddress}`}
            target="_blank"
          >
            <FormattedMessage id="cryptobadge_show_more_opensea" />
          </a>
        </MenuItem>
      </MenuWrapper>
    </ResponsiveMenu>
  );
}
