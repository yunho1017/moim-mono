import * as React from "react";
import { FormattedMessage } from "react-intl";
// constant
import {
  OPENSEA_BADGE_URL_PREFIX,
  RARIBLE_BADGE_URL_PREFIX,
} from "../../../../constants";
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
import { IconWrapper, MoreIcon, RetryIcon, ShareIcon, Wrapper } from "./styled";
import { getNetworkNameByChainId } from "common/components/cryptobadge/utils";
import { getCertificate_node_Certificate } from "@vingle/cryptobadge-sdk";

interface IProps {
  certificate: getCertificate_node_Certificate;
  badge: Moim.Cryptobadge.ICryptobadge;
  isLoadingRefresh: boolean;
  onRetryClick: React.MouseEventHandler<HTMLDivElement>;
}

const CryptobadgeShowHeaderForDesktop: React.FC<IProps> = ({
  certificate,
  badge,
  isLoadingRefresh,
  onRetryClick,
}) => {
  const refMenuButton = React.useRef(null);
  const { isOpen, open, close } = useOpenState(false);
  const openShareDialog = useOpenSNSShareDialog(location.href);

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
    backgroundColor: certificate.backgroundColor ?? "white",
    textColor: certificate.textColor ?? "black",
  };

  return (
    <>
      <Wrapper {...styleProps}>
        {showMore && (
          <IconWrapper ref={refMenuButton} onClick={open}>
            <MoreIcon color={`${certificate.textColor}`} />
          </IconWrapper>
        )}
        <IconWrapper onClick={openShareDialog}>
          <ShareIcon color={`${certificate.textColor}`} />
        </IconWrapper>
        <IconWrapper onClick={onRetryClick}>
          <RetryIcon
            color={`${certificate.textColor}`}
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
