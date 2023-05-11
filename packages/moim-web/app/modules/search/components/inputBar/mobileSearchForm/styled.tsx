import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { Input as InputBase } from "../styled";
import DialogBase from "@material-ui/core/Dialog";
import withStyles from "@material-ui/core/styles/withStyles";
// icons
import CloseIcon from "@icon/24-close-b.svg";
import SearchIconBase from "@icon/18-search-placeholder-g.svg";
import { useScrollStyle } from "common/components/designSystem/styles";
import { BG_LEVEL_BACKGROUND_CLASS_NAME } from "common/components/designSystem/BGLevel";
import Divider from "common/components/divider";

export const Dialog = withStyles({
  paper: {
    margin: 0,
    borderRadius: 0,
    zIndex: 1001,
  },
})(DialogBase);

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  ${useScrollStyle}
`;

export const StickyWrapper = styled.div.attrs({
  className: BG_LEVEL_BACKGROUND_CLASS_NAME,
})`
  width: 100%;
  position: sticky;
  top: 0;

  z-index: ${props => props.theme.zIndexes.gnbSticky};
`;
export const InputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 ${px2rem(4)};
`;

export const InputContainerDivider = styled(Divider).attrs(props => ({
  color: props.theme.colorV2.colorSet.grey50,
  height: px2rem(4),
}))``;
export const MobileSearchIcon = styled(SearchIconBase).attrs({
  size: "xs",
  touch: "42",
})``;
export const PrimaryColorSearchIcon = styled(SearchIconBase).attrs(props => ({
  size: "xs",
  touch: "42",
  iconColor: props.theme.colorV2.primary.color,
}))``;

export const Input = styled(InputBase)`
  padding: ${px2rem(10)} 0;
`;

export const CloseButton = styled(CloseIcon).attrs({
  size: "s",
  touch: 42,
  role: "button",
})``;

export const Rights = styled.div`
  width: ${px2rem(42)};
`;
