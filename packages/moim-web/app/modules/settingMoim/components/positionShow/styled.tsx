import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import {
  B1Regular,
  H8Bold,
  H4Bold,
} from "common/components/designSystem/typos";
import { DefaultDivider } from "common/components/divider";
import AppointMemberIcon from "@icon/24-appointmember-g.svg";
import DismissMemberIcon from "@icon/24-dismissmember-g.svg";
import MenuIcon from "@icon/24-more-b.svg";

export const Wrapper = styled.div``;

export const Header = styled.div`
  display: flex;
  padding: ${px2rem(10)} 0;
`;

export const MenuButtonWrapper = styled.div`
  margin-left: auto;
  margin-right: ${px2rem(12)};
`;

export const MenuButton = styled(MenuIcon).attrs({
  size: "m",
  touch: 24,
  role: "button",
})``;

export const PositionName = styled(H4Bold)<{ textColor?: string }>`
  margin-left: ${px2rem(16)};
  color: ${props => props.textColor || props.theme.colorV2.colorSet.grey800};
`;

export const MoimName = styled(B1Regular)`
  margin-left: ${px2rem(16)};

  color: ${props => props.theme.colorV2.colorSet.grey600};
`;

export const Description = styled(B1Regular)`
  padding: ${px2rem(8)} ${px2rem(16)};
  color: ${props => props.theme.colorV2.colorSet.grey800};
  word-break: break-word;
`;

export const MembersTitle = styled(H8Bold)`
  margin-left: ${px2rem(16)};
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const Divider = styled(DefaultDivider)`
  margin-top: ${px2rem(16)};
`;

export const Buttons = styled.div`
  display: flex;

  * + * {
    margin-left: ${px2rem(18)};
  }
`;

export const AppointMemberButton = styled(AppointMemberIcon).attrs({
  size: "m",
  touch: 24,
})``;

export const DismissMemberButton = styled(DismissMemberIcon).attrs({
  size: "m",
  touch: 24,
})``;
