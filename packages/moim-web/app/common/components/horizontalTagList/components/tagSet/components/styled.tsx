import styled, { css } from "styled-components";
import { px2rem } from "common/helpers/rem";
import { Label } from "common/components/blockitEditorBase/components/blockitRenderer/components/inputs/checkbox/styled";
import {
  B3RegularStyle,
  B4RegularStyle,
} from "common/components/designSystem/typos";
import { useScrollStyle } from "common/components/designSystem/styles";

export const WrapperStyle = css`
  padding: ${px2rem(5.5)} ${px2rem(16)};

  &:hover {
    background-color: ${props => props.theme.colorV2.colorSet.grey10};
  }
`;

export const TagItemsWrapper = styled.div`
  display: block;
`;

export const TagItems = styled.div`
  ${useScrollStyle}
  max-height: ${px2rem(288)};
  display: flex;
  flex-direction: column;
  padding-bottom: ${px2rem(32)};

  ${Label} {
    ${B3RegularStyle}
    width: 100%;
    color: ${props => props.theme.colorV2.colorSet.grey600};
    margin-left: ${px2rem(18)};
  }
`;

export const TagItemsBarWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0 ${px2rem(16)};
  position: absolute;
  bottom: 0;
  width: 100%;
  height: ${px2rem(32)};
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
  text-align: right;
  padding: 0 ${px2rem(16)};
`;

export const SelectButton = styled.button`
  min-width: fit-content;
  padding: 0 ${px2rem(8)};
  color: ${props => props.theme.colorV2.colorSet.grey300};
  padding: 0;
  ${B4RegularStyle}
`;

export const PopoverStyle = css`
  max-height: ${px2rem(320)};
  min-width: ${px2rem(180)};
  border-radius: ${px2rem(2)};
  padding: ${px2rem(4)} 0;
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
  margin-top: ${px2rem(-2)};
`;

export const BottomSheetHandleStyle = css`
  padding: ${px2rem(5.5)} ${px2rem(16)};
`;
