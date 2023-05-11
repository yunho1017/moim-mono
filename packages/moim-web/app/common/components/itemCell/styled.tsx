import styled, { css } from "styled-components";

import { px2rem } from "common/helpers/rem";
import { sizeMap } from "./type";
import { B1Regular, B4Regular } from "common/components/designSystem/typos";
import { FlatButton, TextButton } from "common/components/designSystem/buttons";
import {
  HoverSelectedStyleWrapper,
  IHoverSelectedProps,
} from "common/components/designSystem/styles";
import DividerBase from "common/components/divider";

export const RightWrapper = styled.div`
  margin-left: ${px2rem(10)};
`;

export const Title = styled<any>(B1Regular)<{ disabled?: boolean }>`
  color: ${props => props.theme.colorV2.colorSet.grey800};

  ${props =>
    props.disabled &&
    css`
      opacity: 0.4;
    `}
`;
export const SubTitle = styled<any>(B4Regular)<{ disabled?: boolean }>`
  color: ${props => props.theme.colorV2.colorSet.grey300};
  ${props =>
    props.disabled &&
    css`
      opacity: 0.4;
    `}
`;

export const ContentWrapper = styled.div`
  min-width: 0;
  padding: ${px2rem(10)} 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Contents = styled.div`
  ${Title} ~ ${SubTitle} {
    margin-top: ${px2rem(2)};
  }
`;

export interface IWrapperProps extends IHoverSelectedProps {
  size: Moim.DesignSystem.ItemCellSizeMapKey;
  disableRightPadding?: boolean;
}

export const Wrapper = styled(HoverSelectedStyleWrapper)<IWrapperProps>`
  width: 100%;
  height: ${props => px2rem(sizeMap[props.size]?.height!)};
  display: flex;
  align-items: center;
  ${props =>
    !props.disableRightPadding &&
    css`
      padding-right: ${px2rem(16)};
    `}
`;

export const RoundWrapper = styled.div`
  border-radius: 50%;
  overflow: hidden;
`;

export const Divider = styled(DividerBase).attrs(props => ({
  color: props.theme.colorV2.colorSet.grey50,
  height: px2rem(1),
}))``;

export const CheckedButton = styled(TextButton)``;
export const UnCheckedButton = styled(FlatButton)``;
