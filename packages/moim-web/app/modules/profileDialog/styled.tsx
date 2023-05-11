import styled, { css } from "styled-components";
import { px2rem } from "common/helpers/rem";

export const JoinButtonWrapper = styled.div`
  margin: 0 ${px2rem(16)};
`;

export const PopoverStyle = css`
  border-radius: ${px2rem(8)};
  margin-top: ${px2rem(4)};
`;

export const BottomSheetHandleStyle = css`
  background-color: ${props => props.theme.colorV2.primary.main} !important;
`;
