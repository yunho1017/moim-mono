import styled from "styled-components";
import { B1Regular } from "common/components/designSystem/typos";

import PinnedIconBase from "@icon/18-pinsolid.svg";
import UnPinnedIconBase from "@icon/18-unpin-g.svg";
import { px2rem } from "common/helpers/rem";

export const PinnedIcon = styled(PinnedIconBase).attrs(props => ({
  size: "xs",
  touch: 42,
  iconColor: props.theme.colorV2.colorSet.grey300,
}))``;

export const UnPinnedIcon = styled(UnPinnedIconBase).attrs(props => ({
  size: "xs",
  touch: 42,
  iconColor: props.theme.colorV2.colorSet.grey300,
}))``;

export const Title = styled(B1Regular)``;

export const ButtonWrapper = styled.div`
  display: flex;
`;

export const Wrapper = styled.div`
  padding-left: ${px2rem(16)};
`;
