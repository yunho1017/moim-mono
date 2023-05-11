import styled from "styled-components";
import CompleteEngIconBase from "@icon/complete_eng.svg";
import CompleteKrIconBase from "@icon/complete_ko.svg";
import { px2rem } from "common/helpers/rem";
import { MEDIA_QUERY } from "common/constants/responsive";
import ShareIconBase from "@icon/24-share-1.svg";
import { GhostGeneralButton } from "common/components/designSystem/buttons";

const COMPLETE_ICON_SIZE = 200;
const COMPLETE_ICON_MOBILE_SIZE = 170;
export const ROOT_WRAPPER_SIDE_PADDING = 116;

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  flex: 1;
  min-height: 0;

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    min-height: ${px2rem(500)};
    padding: ${px2rem(30)} ${px2rem(ROOT_WRAPPER_SIDE_PADDING)} 0;
  }
`;

export const PaddedWrapper = styled.div`
  position: relative;
  width: 100%;
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    padding: 0 ${px2rem(16)};
  }
`;

export const ContentWrapper = styled.div`
  padding: ${px2rem(8)} 0;
`;

export const LoadingWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

// NOTE: XL size not exists support size, but i need to control original size of SVG
export const CompleteEngIcon = styled(CompleteEngIconBase).attrs({
  size: "xl",
})`
  width: ${px2rem(COMPLETE_ICON_SIZE)};
  height: ${px2rem(COMPLETE_ICON_SIZE)};

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    width: ${px2rem(COMPLETE_ICON_MOBILE_SIZE)};
    height: ${px2rem(COMPLETE_ICON_MOBILE_SIZE)};
  }
`;

export const CompleteKrIcon = styled(CompleteKrIconBase).attrs({
  size: "xl",
})`
  width: ${px2rem(COMPLETE_ICON_SIZE)};
  height: ${px2rem(COMPLETE_ICON_SIZE)};

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    width: ${px2rem(COMPLETE_ICON_MOBILE_SIZE)};
    height: ${px2rem(COMPLETE_ICON_MOBILE_SIZE)};
  }
`;

export const CompleteIconContainer = styled.div`
  width: ${px2rem(COMPLETE_ICON_SIZE)};
  height: ${px2rem(COMPLETE_ICON_SIZE)};
  position: absolute;

  z-index: ${props => props.theme.zIndexes.modal + 1};

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    top: ${px2rem(77)};
    right: ${px2rem(-8)};
  }

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    width: ${px2rem(COMPLETE_ICON_MOBILE_SIZE)};
    height: ${px2rem(COMPLETE_ICON_MOBILE_SIZE)};

    top: ${px2rem(12)};
    right: ${px2rem(10)};
  }
`;

export const ShareButton = styled(GhostGeneralButton).attrs({ size: "l" })`
  min-width: initial;
  padding: 0;
  width: ${px2rem(48)};
  display: flex;
  align-items: center;
  justify-content: center;

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    border-radius: 100%;
    border-color: ${props => props.theme.colorV2.colorSet.grey50};
  }
`;

export const ShareIcon = styled(ShareIconBase).attrs(props => ({
  size: "s",
  iconColor: props.theme.colorV2.colorSet.grey800,
}))``;
