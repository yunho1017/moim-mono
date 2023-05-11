import styled from "styled-components";
import {
  B1Regular,
  H4Bold,
  H8Bold,
} from "common/components/designSystem/typos";
import { DefaultDivider } from "common/components/divider";
import { GhostGeneralButton } from "common/components/designSystem/buttons";
import BackIconBase from "@icon/24-back-b";
import MoreIconBase from "@icon/24-more-b";

import { px2rem } from "common/helpers/rem";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const HeaderTitle = styled(H4Bold)<{ textColor?: string }>`
  color: ${props => props.textColor || props.theme.colorV2.colorSet.grey800};
`;

export const AppbarTitle = styled(H8Bold)<{ textColor?: string }>`
  color: ${props => props.textColor || props.theme.colorV2.colorSet.grey800};
`;

export const Header = styled.div`
  & > ${HeaderTitle} {
    padding: 0 ${px2rem(16)} ${px2rem(8)};
  }
`;

export const PositionDescription = styled(B1Regular)`
  padding: ${px2rem(8)} ${px2rem(16)};
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const LeftButtonWrapper = styled.div``;
export const RightButtonWrapper = styled.div``;

export const MoreIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const BackIcon = styled(BackIconBase).attrs({
  role: "button",
  size: "s",
  touch: 24,
})``;
export const MoreIcon = styled(MoreIconBase).attrs({
  role: "button",
  size: "s",
  touch: 24,
})``;

export const Divider = styled(DefaultDivider)`
  margin-top: ${px2rem(18)};
`;

export const ApplyPositionButtonWrapper = styled.div`
  padding: ${px2rem(8)} ${px2rem(16)};
`;
export const ApplyPositionButton = styled(GhostGeneralButton)`
  width: 100%;
`;
