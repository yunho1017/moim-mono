import styled from "styled-components";
import { rgba } from "polished";
import { px2rem } from "common/helpers/rem";
import { H8BoldStyle } from "common/components/designSystem/typos";
import {
  FlatButton,
  GhostButton,
} from "common/components/designSystem/buttons";
import CloseIcon from "@icon/24-close-w.svg";
import { MEDIA_QUERY } from "common/constants/responsive";

export const Container = styled.div`
  position: relative;
  width: 100%;
  padding: ${px2rem(14)} ${px2rem(26)};

  z-index: ${props => props.theme.zIndexes.popover};
  background-color: ${props => props.theme.colorV2.colorSet.white1000};

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
  }

  &::before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: ${props => props.theme.colorV2.colorSet.grey800};
    box-shadow: 0 ${px2rem(2)} ${px2rem(8)} 0
      ${props => rgba(props.theme.colorV2.colorSet.grey800, 0.2)};
    z-index: ${props => props.theme.zIndexes.below};
  }
`;

export const Contents = styled.div`
  display: flex;
  z-index: ${props => props.theme.zIndexes.default};
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: ${px2rem(8)};
  z-index: ${props => props.theme.zIndexes.default};
`;

export const Text = styled.h5`
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    flex: 1;
    min-width: 0;
  }
  ${H8BoldStyle};
  color: ${props => props.theme.colorV2.colorSet.white1000};
`;

export const CloseWrapper = styled.div`
  position: absolute;
  top: ${px2rem(14)};
  right: ${px2rem(26)};
`;

export const CloseButton = styled(CloseIcon).attrs(props => ({
  size: "s",
  role: "button",
  iconColor: props.theme.colorV2.colorSet.white800,
}))`
  z-index: ${props => props.theme.zIndexes.default};
`;

export const RequestButton = styled(FlatButton).attrs({ size: "s" })`
  margin-right: ${px2rem(12)};
`;

export const DismissButton = styled(GhostButton).attrs({
  size: "s",
})`
  border-color: ${props => props.theme.colorV2.colorSet.white1000};
  color: ${props => props.theme.colorV2.colorSet.white1000};
`;
