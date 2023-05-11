import styled, { css } from "styled-components";
import DialogBase from "@material-ui/core/Dialog";
import withStyles from "@material-ui/core/styles/withStyles";

import CloseIconBase from "@icon/24-close-b.svg";

import { MEDIA_QUERY } from "common/constants/responsive";

import { px2rem } from "common/helpers/rem";
import { noScrollBarStyle } from "common/components/designSystem/styles";

export const CloseButton = styled(CloseIconBase).attrs({
  size: "s",
  touch: 24,
  role: "button",
})``;

export const ModalWrapper = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  height: 100vh;
  min-height: 100vh;

  ${noScrollBarStyle}

  @media ${MEDIA_QUERY.ONLY_DESKTOP} {
    height: auto;
  }
`;

export const DefaultPaddingWrapper = styled.div`
  flex: 1;
  position: relative;
  height: 100%;

  @media ${MEDIA_QUERY.ONLY_DESKTOP} {
    margin: ${px2rem(195)} 0;
  }
`;

export const FixedHeightSmallModalLayout = styled.div`
  width: 100%;
  height: 100%;

  @media ${MEDIA_QUERY.ONLY_DESKTOP} {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: ${px2rem(120)} 0;
  }
`;

export const ModalContents = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: scroll;
  padding: 0;

  box-shadow: ${props => props.theme.shadow.whiteElevated};
  background-color: ${props => props.theme.colorV2.colorSet.white1000};

  @media ${MEDIA_QUERY.ONLY_DESKTOP} {
    position: relative;
    width: ${px2rem(455)};
    min-height: ${px2rem(210)};
    padding: ${px2rem(40)};
    overflow: hidden;
    margin: 0 auto;

    border-radius: ${px2rem(8)};
  }
`;

export const Dialog = withStyles({
  paper: {
    margin: 0,
    borderRadius: 0,
    zIndex: 1001,
    width: "100%",
    overflow: "scroll",
  },
  paperScrollPaper: {
    [`@media ${MEDIA_QUERY.EXCEPT_MOBILE}`]: {
      position: "relative",
      width: px2rem(455),
      minHeight: px2rem(210),
      maxHeight: px2rem(678),
      overflow: "hidden",
      borderRadius: px2rem(8),
    },
  },
})(DialogBase);

export const modalContentStyle = css`
  width: 100%;

  box-shadow: ${props => props.theme.shadow.whiteElevated};
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
  border-radius: ${px2rem(8)};
`;
export const FixedHeightSmallModalContentWrapper = styled.div`
  height: ${px2rem(678)};
  overflow: scroll;
  ${modalContentStyle}
`;

export const DynamicHeightSmallModalContentWrapper = styled.div`
  min-height: ${px2rem(210)};
  ${modalContentStyle}
`;

export const dynamicHeightWrapperStyle = css`
  min-height: ${px2rem(210)};
  max-height: ${px2rem(678)};
`;

export const bottomSheetAppBarStyle = css`
  padding: 0 ${px2rem(8)};
`;
