import styled, { css } from "styled-components";
import { px2rem } from "common/helpers/rem";
import { GhostGeneralButton } from "common/components/designSystem/buttons";
import TrashIconBase from "@icon/18-trash-g.svg";
import WishIconBase from "@icon/24-like-2.svg";

export const TrashIcon = styled(TrashIconBase).attrs(props => ({
  size: "xs",
  iconColor: props.theme.colorV2.colorSet.grey800,
}))``;

export const WhiteWishIcon = styled(WishIconBase).attrs(props => ({
  size: "xs",
  iconColor: props.theme.colorV2.colorSet.white1000,
}))``;

export const BlackWishIcon = styled(WishIconBase).attrs(props => ({
  size: "xs",
  iconColor: props.theme.colorV2.colorSet.grey800,
}))``;

export const ThrashButton = styled(GhostGeneralButton).attrs({ size: "s" })`
  width: ${px2rem(32)};
  height: ${px2rem(32)};
  min-width: inherit;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const WishButton = styled(GhostGeneralButton).attrs({ size: "s" })<{
  isFavorite: boolean;
}>`
  width: ${px2rem(32)};
  height: ${px2rem(32)};
  min-width: inherit;
  padding: 0;

  display: flex;
  align-items: center;
  justify-content: center;
  ${props =>
    props.isFavorite &&
    css`
      background-color: ${props.theme.color.red700};
      border-color: ${props.theme.color.red700};
    `}
`;

export const NormalButton = styled(GhostGeneralButton).attrs({ size: "s" })`
  width: 100%;
  flex: 1;
  min-width: 0;
`;
