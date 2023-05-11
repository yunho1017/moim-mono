import * as React from "react";
import styled from "styled-components";
import ShareIconBase from "@icon/24-share-1.svg";
import { px2rem } from "common/helpers/rem";
import { useOpenSNSShareDialog } from "common/components/snsShareDialog/utils";

const Wrapper = styled.div``;

const IconWrapper = styled.div`
  width: ${px2rem(48)};
  height: ${px2rem(48)};
  border-radius: 100%;
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

const HeaderButtons = () => {
  const openShareDialog = useOpenSNSShareDialog(location.href);

  return (
    <Wrapper>
      <IconWrapper onClick={openShareDialog}>
        <ShareIcon />
      </IconWrapper>
    </Wrapper>
  );
};

export default React.memo(HeaderButtons);
