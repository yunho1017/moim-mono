import styled, { css } from "styled-components";
import MenuIconBase from "@icon/24-menu-b.svg";
import LoadingIconBase from "common/components/loading/icon";
import { px2rem } from "common/helpers/rem";
import { H4BoldStyle, H8BoldStyle } from "common/components/designSystem/typos";
import { MEDIA_QUERY } from "common/constants/responsive";
import { useScrollStyle } from "common/components/designSystem/styles";
import { LeftWrapper } from "common/components/appBar/styledComponent";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    padding: ${px2rem(32)} ${px2rem(16)} 0;
  }
`;

export const LoadWrapper = styled.div`
  width: 100%;
  height: ${px2rem(42)};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Loading = styled(LoadingIconBase)``;

export const QuestContainer = styled.div`
  width: 100%;
`;

export const ListContainer = styled.div`
  width: 100%;

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    padding-top: ${px2rem(32)};
    height: 100%;
    flex: 1;
    min-height: 0;
  }

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    padding: ${px2rem(16)};
  }
  ${useScrollStyle}
`;

export const DesktopList = styled.div<{
  minWidth: number;
}>`
  --item-min-width: ${props =>
    props.minWidth ? px2rem(props.minWidth) : undefined};

  display: grid;
  grid-gap: ${px2rem(16)};
  justify-content: center;
  padding-bottom: ${px2rem(64)};

  grid-template-columns: repeat(auto-fill, minmax(var(--item-min-width), 1fr));
`;

export const MobileList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${px2rem(12)};
`;

export const Header = styled.div`
  width: 100%;
  background-color: ${props => props.theme.colorV2.colorSet.white1000};

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    // NOTE: below style should be same to DesktopList. for center positioning.
    display: grid;
    justify-content: center;
    grid-gap: 16px;
    grid-template-columns: ${`repeat(auto-fill, ${px2rem(341)})`};
  }
`;

export const Title = styled.div`
  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    ${H4BoldStyle}
  }
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    ${H8BoldStyle}
  }
`;

export const LeftButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  margin-left: ${px2rem(13)};
`;

export const MenuIcon = styled(MenuIconBase).attrs(props => ({
  size: "s",
  iconColor: props.theme.colorV2.colorSet.grey800,
}))``;

export const SmallDivider = styled.div`
  width: 100%;
  height: ${px2rem(1)};
  background-color: ${props => props.theme.colorV2.colorSet.grey50};
`;

export const LargeDivider = styled.div`
  width: 100%;
  height: ${px2rem(4)};
  background-color: ${props => props.theme.colorV2.colorSet.grey10};
`;

export const AppBarWrapperStyle = css`
  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    ${LeftWrapper} {
      min-width: initial;
    }
  }
`;
