import * as React from "react";
import { FormattedMessage } from "react-intl";
// constant
import {
  OPENSEA_BADGE_URL_PREFIX,
  RARIBLE_BADGE_URL_PREFIX,
} from "../../../../constants";
// utils
// hooks
import useOpenState from "common/hooks/useOpenState";
// components
import ResponsiveMenu from "common/components/responsiveMenu";
import {
  MenuWrapper,
  MenuItem,
} from "common/components/responsiveMenu/components/menu";
// styled
import { IconWrapper, MoreIcon, RetryIcon, Wrapper } from "./styled";
import { getNetworkNameByChainId } from "common/components/cryptobadge/utils";

interface IProps {
  badge: Moim.Cryptobadge.ICryptobadge;
  tokenId?: string;
  isLoadingRefresh: boolean;
  onRetryClick: React.MouseEventHandler<HTMLDivElement>;
}

const CryptobadgeShowHeaderForDesktop: React.FC<IProps> = ({
  badge,
  isLoadingRefresh,
  onRetryClick,
}) => {
  const refMenuButton = React.useRef(null);
  const { isOpen, open, close } = useOpenState(false);
  const network = getNetworkNameByChainId(badge.chainId);

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

  const showMore = React.useMemo(() => !!badge.chainId && !!badge.contract, [
    badge.chainId,
    badge.contract,
  ]);

  const styleProps = {
    backgroundColor: badge.backgroundColor ?? "white",
    textColor: badge.textColor ?? "black",
  };

  return (
    <>
      <Wrapper {...styleProps}>
        {showMore && (
          <IconWrapper ref={refMenuButton} onClick={open}>
            <MoreIcon color={`${badge.textColor}`} />
          </IconWrapper>
        )}
        <IconWrapper onClick={onRetryClick}>
          <RetryIcon
            color={`${badge.textColor}`}
            refreshing={isLoadingRefresh ? "true" : undefined}
          />
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
              href={`${OPENSEA_BADGE_URL_PREFIX}/${symbol}/${badge.contract}`}
              target="_blank"
            >
              <FormattedMessage id="cryptobadge_show_more_opensea" />
            </a>
          </MenuItem>
          <MenuItem onClick={close}>
            <a
              href={`${RARIBLE_BADGE_URL_PREFIX}/${network?.toLowerCase()}/${
                badge.contract
              }`}
              target="_blank"
            >
              <FormattedMessage id="cryptobadge_show_more_rarible" />
            </a>
          </MenuItem>
        </MenuWrapper>
      </ResponsiveMenu>
    </>
  );
};

export default React.memo(CryptobadgeShowHeaderForDesktop);
