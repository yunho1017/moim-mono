import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { useSingleLineStyle } from "common/components/designSystem/styles";
import { SubMenu as SubMenuBase } from "common/components/listMenu";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

export const Contents = styled.section`
  flex: 1;
  min-width: 0;
  padding-bottom: ${px2rem(24)};

  &::after {
    content: "";
    display: block;
    width: 100%;
    height: calc(${px2rem(47)} + env(safe-area-inset-bottom));
  }
`;

export const NavigationMenu = styled.nav`
  position: relative;
  max-width: ${px2rem(230)};
  margin-right: ${px2rem(15)};
`;

export const SubMenu = styled(SubMenuBase)`
  position: sticky;
  top: ${px2rem(77)};
`;

export const SubMenuContent = styled.span`
  margin-left: ${px2rem(12)};
  ${useSingleLineStyle};
`;

export const SubMenuContainer = styled.a`
  position: relative;
  height: ${px2rem(34)};

  &::before {
    content: "";
    position: absolute;
    width: ${px2rem(2)};
    height: 100%;
    background-color: ${props => props.theme.colorV2.colorSet.grey50};
    left: ${px2rem(16)};
  }

  &:first-of-type {
    &::before {
      border-radius: ${px2rem(2)};
      top: ${px2rem(5)};
      height: calc(100% - ${px2rem(5)});
    }
  }

  &:last-of-type {
    &::before {
      border-radius: ${px2rem(2)};
      bottom: ${px2rem(5)};
      height: calc(100% - ${px2rem(5)});
    }
  }
`;
