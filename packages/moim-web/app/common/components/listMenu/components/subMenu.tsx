import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { B1RegularStyle } from "common/components/designSystem/typos";

export const SubMenu = styled.nav`
  display: flex;
  flex-direction: column;
  ${B1RegularStyle};
`;

export const SubMenuItem = styled.div.attrs({ role: "button" })<{
  active?: boolean;
  color?: string;
}>`
  position: relative;
  padding: ${px2rem(5)} ${px2rem(16)};

  flex: 1;
  display: flex;
  position: relative;
  align-items: center;
  color: ${props =>
    props.active
      ? props.theme.colorV2.colorSet.grey800
      : props.theme.colorV2.colorSet.grey600};
  transition: background-color 300ms;

  &:hover {
    background-color: ${props => props.theme.colorV2.colorSet.grey10};
  }

  &::before {
    position: absolute;
    content: "";
    background-color: ${props => props.color || props.theme.colorV2.accent};
    width: ${px2rem(2)};
    height: ${px2rem(24)};
    border-radius: ${px2rem(2)};
    transition: all 300ms;
    opacity: ${props => (props.active ? 1 : 0)};
  }
`;
