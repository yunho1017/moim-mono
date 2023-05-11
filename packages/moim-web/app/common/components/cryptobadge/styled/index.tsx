import styled from "styled-components";
import { rgba } from "polished";
// constant
import zIndexSet from "app/theme/constants/zIndex";
import { MEDIA_QUERY } from "common/constants/responsive";
import ClaimedIconBase from "@icon/rs-stamp-claimed";
import CompleteIconBase from "@icon/rs-stamp-complete";
// helpers
import { px2rem } from "common/helpers/rem";
// components
import { Divider } from "common/components/itemCell";
import ChipBase from "common/components/chips";
import { FlatGeneralButton } from "common/components/designSystem/buttons";
import { ThemeType } from "common/components/dquestMissionary/component";
import {
  H2BoldStyle,
  H4BoldStyle,
  pB3RegularStyle,
  H10BoldStyle,
  pB3BoldStyle,
  B3RegularStyle,
  H6BoldStyle,
  B4RegularStyle,
} from "common/components/designSystem/typos";

interface IStyleProps {
  backgroundColor?: string;
  textColor?: string;
  useBottomSticky?: boolean;
}

const BADGE_IMAGE_WIDTH_RATIO = 100;
const STATUS_IMAGE_WIDTH_RATIO = BADGE_IMAGE_WIDTH_RATIO * 1.2;

const Z_INDEX_MEDIA_WRAPPER = zIndexSet.wrapper;
const Z_INDEX_MEDIA_DEFAULT = zIndexSet.popover - 1;
const Z_INDEX_MEDIA_HOVER = zIndexSet.modal - 1;
const Z_INDEX_STATUS_IMAGE_WRAPPER = Z_INDEX_MEDIA_DEFAULT + 10;
const Z_INDEX_STATUS_IMAGE_HIDE = zIndexSet.below;

export const BadgeDetailPageWrapper = styled.section<IStyleProps>`
  margin-top: 0;
  ${pB3RegularStyle};
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: ${({ textColor }) => textColor};
  min-height: 100vh;
  padding-bottom: ${props =>
    props.useBottomSticky ? px2rem(120) : px2rem(24)};
  @media ${MEDIA_QUERY.ONLY_DESKTOP} {
    padding: 0 ${px2rem(120)};
  }
`;

export const Container = styled.div`
  padding: ${px2rem(16)};
  @media ${MEDIA_QUERY.ONLY_DESKTOP} {
    padding: ${px2rem(16)} ${px2rem(40)} ${px2rem(90)} ${px2rem(40)};
    max-width: ${px2rem(1400)};
    margin: 0 auto;
  }
`;

export const TopWrapper = styled.div`
  height: fit-content;
  min-height: fit-content;
  @media ${MEDIA_QUERY.ONLY_DESKTOP} {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: ${px2rem(24)};
    margin-bottom: ${px2rem(24)};
    .withStatusMark {
      gap: ${px2rem(40)};
    }
  }
`;

// Head
export const Head = styled.div`
  width: 100%;
  height: fit-content;
  min-height: fit-content;
  display: inline-flex !important;
  position: relative !important;
  @media ${MEDIA_QUERY.ONLY_DESKTOP} {
    width: 50%;
  }
`;

export const StatusImageWrapper = styled.div`
  width: ${BADGE_IMAGE_WIDTH_RATIO}%;
  height: fit-content;
  min-height: fit-content;
  z-index: ${Z_INDEX_STATUS_IMAGE_WRAPPER};
  justify-content: center;
  align-items: center;
  display: flex;
  .statusImageIcon {
    z-index: ${Z_INDEX_STATUS_IMAGE_WRAPPER};
    position: absolute;
    width: ${STATUS_IMAGE_WIDTH_RATIO}%;
    padding: 10%;
  }
  &:hover {
    .statusImageIcon {
      z-index: ${Z_INDEX_STATUS_IMAGE_HIDE};
      display: none;
      opacity: 0;
      transition: opacity 10s;
    }
  }
`;

export const MediaWrapper = styled.div`
  width: 100%;
  height: 100%;
  z-index: ${Z_INDEX_MEDIA_DEFAULT};
  object-fit: contain;
  .withStatusMark {
    opacity: 50%;
  }
  &:hover {
    z-index: ${Z_INDEX_MEDIA_HOVER};
    opacity: 1;
    transition: opacity 10s;
  }
`;

export const ClaimedIcon = ClaimedIconBase;

export const CompleteIcon = CompleteIconBase;

export const BaseBadgeDetailFrame = styled.div<IStyleProps>`
  z-index: ${Z_INDEX_MEDIA_WRAPPER};
  align-items: center;
  border-radius: 0;
  color: ${props => props.textColor};
  background-color: ${props => props.backgroundColor};
  justify-content: center;
  max-height: fit-content;
  width: 100%;
  padding: ${px2rem(24)};
  @media ${MEDIA_QUERY.ONLY_DESKTOP} {
    padding: 0 ${px2rem(24)};
  }
`;

// Body
export const Body = styled.div`
  width: 100%;
  @media ${MEDIA_QUERY.ONLY_DESKTOP} {
    width: calc((100% - ${px2rem(24)}) / 2);
  }
`;

interface IAdditionalButtonProps
  extends React.ComponentProps<typeof FlatGeneralButton> {
  selectedTheme: ThemeType;
}

export const WhiteListChip = styled(ChipBase)<{
  mainColor: string;
  chipColor: string;
}>`
  background-color: ${props => rgba(props.chipColor, 0.86)};
  color: ${props => (props.mainColor === "black" ? "white" : "black")};
`;

export const BadgeInfoWrapper = styled.div<IStyleProps>`
  word-break: break-word;
  text-align: left;
  color: ${props => props.textColor};
  @media ${MEDIA_QUERY.ONLY_DESKTOP} {
    margin-bottom: ${px2rem(20)};
  }
`;

export const BadgeNameWrapper = styled.div`
  ${H4BoldStyle};
  width: 100%;
  padding: ${px2rem(8)} 0;
  opacity: 86%;
  @media ${MEDIA_QUERY.ONLY_DESKTOP} {
    ${H2BoldStyle};
    width: 100%;
  }
`;

export const IssuerWrapper = styled.div`
  ${B3RegularStyle};
  opacity: 86%;
  padding-bottom: ${px2rem(8)};
  span.issuer-name {
    ${H10BoldStyle};
  }
`;

export const DividerWrapper = styled.div<IStyleProps>`
  width: 100%;
  padding: ${px2rem(8)} 0;
  height: ${px2rem(17)};
  .divider {
    background-color: ${props => props.textColor};
    opacity: 6%;
  }
`;

export const PropertiesWrapper = styled.div<IStyleProps>`
  color: ${props => props.textColor};
  opacity: 86%;
  ${pB3RegularStyle};
  .propertyValue {
    ${pB3BoldStyle};
  }
  ul {
    li {
      color: ${props => props.textColor};
      height: 40px;
      padding: ${px2rem(20)};
      margin-bottom: ${px2rem(10)};
      border-radius: 5px;
      border: solid 1px ${props => props.textColor}1f;
      list-style: none;
      display: flex;
      align-items: center;
      justify-content: space-between;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  @media ${MEDIA_QUERY.ONLY_DESKTOP} {
    color: ${props => props.textColor};
    margin-bottom: ${px2rem(24)};
    ul {
      display: block;
      li {
        height: 54px;
        width: calc(50% - 10px);
        margin-right: 20px;
        display: inline-flex;
        &:nth-child(2n) {
          margin-right: 0;
        }
      }
    }
  }
`;

export const GuideTitle = styled.div<IStyleProps>`
  ${H6BoldStyle};
  color: ${props => props.textColor};
  opacity: 86%;
  padding: ${px2rem(8)} 0;
  @media ${MEDIA_QUERY.ONLY_DESKTOP} {
    padding: ${px2rem(20)} 0;
  }
`;

export const Foot = styled.div``;

export const RegularButton = styled(FlatGeneralButton).attrs<
  IAdditionalButtonProps
>(props => ({
  size: "l",
  loaderColor:
    props.selectedTheme === "black"
      ? props.theme.themeMode.lightPalette.colorSet.white800
      : props.theme.themeMode.lightPalette.colorSet.grey800,
}))<IAdditionalButtonProps>`
  width: 100%;
  flex: 1;
  min-width: 0;
  color: ${props =>
    props.selectedTheme === "black"
      ? props.theme.themeMode.lightPalette.colorSet.white800
      : props.theme.themeMode.lightPalette.colorSet.grey800};
  background-color: ${props =>
    props.selectedTheme === "black"
      ? props.theme.themeMode.lightPalette.colorSet.grey800
      : props.theme.themeMode.lightPalette.colorSet.white800};
`;

export const WinnerNameWrapper = styled.div<{ mainColor?: string }>`
  width: 100%;
  border-radius: ${px2rem(8)};
  background-color: ${props =>
    props.mainColor
      ? rgba(props.mainColor, 0.02)
      : props.theme.colorV2.colorSet.grey50};
  padding: ${px2rem(20)};
  text-align: center;
  margin: ${px2rem(24)} 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
`;

export const Winner = styled.div`
  ${B4RegularStyle};
  margin-bottom: ${px2rem(8)};
`;

export const UserName = styled.div`
  ${H4BoldStyle};
  overflow-x: hidden;
  text-overflow: ellipsis;
  margin: ${px2rem(8)} 0;
  padding: 0 ${px2rem(16)};
`;

export const WinnerAddress = styled.div`
  ${B4RegularStyle};
`;

export const MobileSectionDividerWrapper = styled.div`
  height: ${px2rem(40)};
  padding: ${px2rem(16)} 0;
  @media ${MEDIA_QUERY.ONLY_DESKTOP} {
    display: none;
  }
`;

export const MobileSectionDivider = styled(Divider)<IStyleProps>`
  position: absolute;
  left: 0;
  width: 100vw;
  height: ${px2rem(8)};
  background-color: ${({ textColor }) => textColor};
  opacity: 2%;
  @media ${MEDIA_QUERY.ONLY_DESKTOP} {
    display: none;
  }
`;
