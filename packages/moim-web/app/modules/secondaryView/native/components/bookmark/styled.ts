import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import {
  B1Regular,
  B4Regular,
  H8Regular,
  H10Bold,
  H4Bold,
} from "common/components/designSystem/typos";
import PrivateIconBase from "@icon/18-lock-b.svg";
import BackIconBase from "@icon/24-back-b";

export const LeftButtonWrapper = styled.div``;

export const PrivateIcon = styled(PrivateIconBase).attrs(props => ({
  size: "xs",
  touch: 18,
  iconColor: props.theme.colorV2.colorSet.grey800,
}))`
  cursor: default;
`;

export const BackIcon = styled(BackIconBase).attrs({
  role: "button",
  size: "s",
  touch: 24,
})``;

export const PriviateIconWrapper = styled.div<{ margin: number }>`
  width: ${px2rem(18)};
  height: ${px2rem(18)};
  margin-left: ${props => px2rem(props.margin)};
  display: flex;
`;

export const HeaderTitle = styled(H8Regular)`
  color: ${props => props.theme.colorV2.colorSet.grey800};
  display: flex;
  align-items: center;
`;

export const ParallaxHeaderTitle = styled(H4Bold)`
  height: ${px2rem(50)};
  color: ${props => props.theme.colorV2.colorSet.grey800};
  display: flex;
  align-items: center;
`;

export const HeaderSubTitle = styled(B4Regular)`
  color: ${props => props.theme.colorV2.colorSet.grey300};
`;

export const Header = styled.div`
  padding: 0 ${px2rem(16)};
`;
export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const TabContentWrapper = styled.div`
  width: 100%;
`;

export const StickyWrapper = styled.div`
  position: sticky;
  top: ${px2rem(45)};
  left: 0;
  right: 0;
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
`;

export const BookmarkCount = styled(H10Bold)`
  height: ${px2rem(34)};
  padding: 0 ${px2rem(16)};
  display: flex;
  align-items: center;
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const EmptyWrapper = styled(B1Regular)`
  width: 100%;
  height: 100%;
  margin-top: ${px2rem(230)};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: ${props => props.theme.colorV2.colorSet.grey600};
`;

export const EmptyEmoji = styled.span`
  font-size: ${px2rem(80)};
  line-height: 1.13;
`;

export const EmptyTitle = styled(B1Regular)`
  color: ${props => props.theme.colorV2.colorSet.grey600};
  margin: ${px2rem(8)} 0 ${px2rem(12)};
`;
