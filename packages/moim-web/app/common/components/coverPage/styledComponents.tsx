import styled, { css } from "styled-components";
import { px2rem } from "common/helpers/rem";
import {
  B1Regular,
  H8Bold,
  B2Regular,
} from "common/components/designSystem/typos";
import CloseIconComponent from "@icon/24-close-w";
import MoreIconComponent from "@icon/24-more-w";
import {
  GhostButton,
  FlatButton,
} from "common/components/designSystem/buttons";
import { MEDIA_QUERY } from "common/constants/responsive";
import {
  enWordKeepAllStyle,
  useScrollStyle,
} from "common/components/designSystem/styles";

export const Wrapper = styled.div`
  position: relative;
  height: 100%;

  --header-height: ${px2rem(44)};
  --cover-image-height: ${px2rem(188)};
  @media ${MEDIA_QUERY.ONLY_DESKTOP} {
    --cover-image-height: ${px2rem(264)};
    --header-height: ${px2rem(42)};
  }

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    ${useScrollStyle};
  }
`;

const containerCenterStyle = css`
  max-width: ${px2rem(720)};
  width: 100%;
  margin: 0 auto;
`;

export const ButtonGroup = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);
  display: flex;
  width: 100%;
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
  padding: ${px2rem(16)};
  ${containerCenterStyle};
  padding-bottom: calc(${px2rem(16)} + env(safe-area-inset-bottom));
`;

export const ButtonItem = styled.div`
  flex: 1;
  & ~ & {
    margin-left: ${px2rem(16)};
  }
`;

export const ActiveButton = styled(FlatButton).attrs({ size: "l" })`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
export const NormalButton = styled(GhostButton).attrs({ size: "l" })`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 ${px2rem(13)};
  height: var(--header-height);
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  z-index: ${props => props.theme.zIndexes.gnbSticky};
  @media ${MEDIA_QUERY.ONLY_DESKTOP} {
    flex-direction: row-reverse;
  }
`;

export const HeaderContent = styled.div<{ show: boolean }>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 300ms opacity;
  opacity: ${props => (props.show ? 1 : 0)};
`;

export const HeaderTitle = styled(H8Bold)`
  margin-left: ${px2rem(8)};
  color: ${props => props.theme.colorV2.colorSet.white1000};
`;

export const MoreIconButton = styled(MoreIconComponent).attrs({
  size: "s",
  touch: 24,
})``;
export const CloseIconButton = styled(CloseIconComponent).attrs({
  size: "s",
  touch: 24,
})``;

export const Container = styled.div`
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
  display: grid;
  padding-bottom: calc(${px2rem(84)} + env(safe-area-inset-bottom));
`;

export const ContainerWrapper = styled.div`
  ${containerCenterStyle}
`;

export const ProfileImage = styled.div<{ show: boolean }>`
  position: relative;
  z-index: ${props => props.theme.zIndexes.default};
  margin-top: ${px2rem(-24)};
  padding: 0 ${px2rem(16)};
  transition: 300ms opacity;
  opacity: ${props => (props.show ? 1 : 0)};
`;

export const groupProfileImageStyle = css`
  border: ${px2rem(2)} solid ${props => props.theme.colorV2.colorSet.white1000};
`;

export const Description = styled(B1Regular)`
  padding: ${px2rem(8)} ${px2rem(16)};
  color: ${props => props.theme.colorV2.colorSet.grey800};
  white-space: pre-line;
  ${enWordKeepAllStyle}
`;

export const Tag = styled(B2Regular)`
  background-color: ${props => props.theme.colorV2.colorSet.grey50};
  padding: ${px2rem(1)} ${px2rem(7)};
  color: ${props => props.theme.colorV2.colorSet.grey800};
  margin-left: ${px2rem(8)};
  margin-top: ${px2rem(12)};
  border-radius: ${px2rem(11)};
  max-width: 100%;
`;

export const TagWrapper = styled.div`
  margin-top: ${px2rem(-12)};
  margin-left: ${px2rem(-8)};
  padding: 0 ${px2rem(16)} ${px2rem(12)};
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;
