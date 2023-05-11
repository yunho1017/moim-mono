import * as React from "react";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
// constant
import { OPENSEA_URL_PREFIX, RARIBLE_URL_PREFIX } from "./constants";
import { MEDIA_QUERY } from "common/constants/responsive";
// helpers
import { px2rem } from "common/helpers/rem";
// hooks
import useOpenState from "common/hooks/useOpenState";
import useIsMobile from "common/hooks/useIsMobile";
// components
import { useOpenSNSShareDialog } from "common/components/snsShareDialog/utils";
import ResponsiveMenu from "common/components/responsiveMenu";
import {
  MenuWrapper,
  MenuItem,
} from "common/components/responsiveMenu/components/menu";

import ShareIconBase from "@icon/24-share-1.svg";
import BlackMoreIcon from "@icon/24-more-b.svg";

const Wrapper = styled.div<{ isMobile: boolean }>`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${px2rem(12)};
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    position: absolute;
    top: ${px2rem(8)};
    right: ${px2rem(10)};
  }
  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    position: relative;
    bottom: ${px2rem(30)};
    display: ${props => (props.isMobile ? "none" : "flex")};
  }
`;

const IconWrapper = styled.div`
  border-radius: 100%;
  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    width: ${px2rem(48)};
    height: ${px2rem(48)};
    border: ${px2rem(1)} solid ${props => props.theme.colorV2.colorSet.grey50};
    transition: opacity 200ms ease-in;

    &:hover {
      opacity: 0.6;
    }
  }
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    width: ${px2rem(30)};
    height: ${px2rem(30)};
    background-color: ${props => props.theme.colorV2.colorSet.white800};
  }
`;

const MoreIcon = styled(BlackMoreIcon).attrs(props => ({
  size: "s",
  role: "button",
  touch: 45,
  iconColor: props.theme.colorV2.colorSet.grey800,
}))``;

const MoreMobileIcon = styled(BlackMoreIcon).attrs(props => ({
  size: "xs",
  role: "button",
  touch: 30,
  iconColor: props.theme.colorV2.colorSet.grey800,
}))``;

const ShareIcon = styled(ShareIconBase).attrs(props => ({
  size: "s",
  touch: 45,
  iconColor: props.theme.colorV2.colorSet.grey800,
}))``;

const ShareMobileIcon = styled(ShareIconBase).attrs(props => ({
  size: "xs",
  touch: 30,
  iconColor: props.theme.colorV2.colorSet.grey800,
}))``;

interface PropsType {
  contractAddress?: string;
  contractName?: string;
  network?: string;
}

const HeaderButtons: React.FC<PropsType> = ({
  contractAddress,
  contractName,
  network,
}) => {
  const isMobile = useIsMobile();
  const refMenuButton = React.useRef(null);
  const { isOpen, open, close } = useOpenState(false);
  const openShareDialog = useOpenSNSShareDialog(location.href);
  const showMore = !!network && !!contractAddress;

  return (
    <>
      <Wrapper isMobile={isMobile}>
        {showMore && (
          <IconWrapper ref={refMenuButton} onClick={open}>
            {isMobile ? <MoreMobileIcon /> : <MoreIcon />}
          </IconWrapper>
        )}
        <IconWrapper onClick={openShareDialog}>
          {isMobile ? <ShareMobileIcon /> : <ShareIcon />}
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
              href={`${OPENSEA_URL_PREFIX}/${contractName
                ?.replace(" - ", " ")
                ?.replace(/\s+/g, "-")
                ?.toLowerCase()}`}
              target="_blank"
            >
              <FormattedMessage id="nft_show_more_opensea" />
            </a>
          </MenuItem>
          <MenuItem onClick={close}>
            <a
              href={`${RARIBLE_URL_PREFIX}/${contractAddress}`}
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
