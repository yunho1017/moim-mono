import styled, { css } from "styled-components";
import {
  borderRadiusMap,
  fontSizeMap,
  fontWeightMap,
  sizeMap,
  selectedBorderWidthMap,
  selectedBorderRadiusMap,
} from "./size";
import { IProps } from "./";
import { px2rem } from "common/helpers/rem";
import UserPlaceholderIcon from "@icon/36-userplaceholder.svg";
import { CommonBadge } from "common/components/alertBadge";

export const Content = styled.span`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  color: #ffffff; // Fixed color (not use theme)
`;

const ImageStyle = css`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

export const Image = styled.img`
  ${ImageStyle}
`;

export const DefaultImage = styled(UserPlaceholderIcon)`
  ${ImageStyle}
`;

export const Wrapper = styled.div<
  Pick<IProps, "size" | "styles" | "selected"> & { hovered?: boolean }
>`
  display: block;
  position: relative;
  font-size: ${props => px2rem(fontSizeMap.get(props.size)!)};
  font-weight: ${props => fontWeightMap.get(props.size)?.(props.theme)};
  width: ${props => px2rem(sizeMap.get(props.size)!)};
  height: ${props => px2rem(sizeMap.get(props.size)!)};
  border-radius: ${props => px2rem(borderRadiusMap.get(props.size)!)};
  user-select: none;
  ${Content} {
    border-radius: ${props => px2rem(borderRadiusMap.get(props.size)!)};
  }
  transition: padding 170ms ease-in-out;

  ${props =>
    (props.selected || props.hovered) &&
    css`
      box-shadow: inset 0 0 0 ${px2rem(selectedBorderWidthMap.get(props.size)!)}
          ${props.selected
            ? props.theme.colorV2.colorSet.grey600
            : props.theme.colorV2.colorSet.grey50},
        inset 0 0 0 ${px2rem(selectedBorderWidthMap.get(props.size)! * 2)}
          ${props.theme.colorV2.colorSet.white1000};

      padding: ${px2rem(3)};
      ${Content} {
        border-radius: ${px2rem(selectedBorderRadiusMap.get(props.size)!)};

        ${Image}, ${DefaultImage} {
          overflow: hidden;
          border-radius: ${px2rem(selectedBorderRadiusMap.get(props.size)!)};
        }
      }
    `}

  ${props => props.styles};
`;

export const LabelWrapper = Wrapper.withComponent("label");

export const Badge = styled(CommonBadge)`
  position: absolute;
  right: ${px2rem(-3)};
  bottom: ${px2rem(-3)};
  z-index: ${props => props.theme.zIndexes.default};
`;

export const UnreadBadge = styled.div`
  position: absolute;
  right: ${px2rem(-4)};
  bottom: ${px2rem(-4)};
  width: ${px2rem(5)};
  height: ${px2rem(5)};
  z-index: ${props => props.theme.zIndexes.default};
  border-radius: 50%;
`;

export const NewNotificationBadge = styled(UnreadBadge)`
  background-color: ${props => props.theme.colorV2.accent};
`;

export const NewContentsBadge = styled(UnreadBadge)`
  background-color: ${props => props.theme.colorV2.colorSet.grey600};
`;
