import styled, { css, FlattenInterpolation } from "styled-components";
import { px2rem } from "common/helpers/rem";
import {
  B1RegularStyle,
  B4RegularStyle,
} from "common/components/designSystem/typos";
import { H6 as H6Base } from "../../texts";
import { marginToPadding } from "../../helper/blockitStyleHelpers";

export const Wrapper = styled.div<{
  overrideStyle?: FlattenInterpolation<any>;
  margin?: Moim.Blockit.IBlockitMargin;
}>`
  padding: ${px2rem(8)} 0;
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
  ${props => marginToPadding(props.margin)};
  ${props => props.overrideStyle};
`;

export const InputContainer = styled.div`
  width: 100%;
  padding: ${px2rem(4)} ${px2rem(16)};
`;

export const InputBox = styled.div<{
  hasError?: boolean;
  hasFocus?: boolean;
  isMultiline?: boolean;
}>`
  position: relative;
  display: flex;
  flex-direction: ${props => (props.isMultiline ? "column" : "row")};
  align-items: center;
  width: 100%;
  padding: ${px2rem(10)} ${px2rem(16)};
  border: 1px solid
    ${props =>
      props.hasError
        ? props.theme.color.red700
        : props.hasFocus
        ? props.theme.colorV2.colorSet.grey600
        : props.theme.colorV2.colorSet.grey200};
  border-radius: ${px2rem(4)};

  input,
  textarea {
    width: 100%;
    outline: none;
    border: none;
    resize: vertical;
    ${B1RegularStyle};
  }

  textarea {
    resize: vertical;
    min-height: ${px2rem(88)};
  }

  input::placeholder,
  textarea::placeholder {
    color: ${props => props.theme.colorV2.colorSet.grey300};
  }
`;

export const NumberInputElement = styled.input`
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type="number"] {
    -moz-appearance: textfield;
  }

  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type="number"] {
    -moz-appearance: textfield;
  }
`;

export const CountBox = styled.div<{ isMultiline?: boolean }>`
  text-align: right;
  ${B4RegularStyle};
  color: ${props => props.theme.colorV2.colorSet.grey600};
  user-select: none;

  ${props => {
    if (props.isMultiline) {
      return css`
        width: 100%;
        height: ${px2rem(17)};
      `;
    }
    return css`
      margin-left: ${px2rem(12)};
    `;
  }}
`;

export const DescriptionWrapper = styled.div<{ hasError?: boolean }>`
  padding: 0 ${px2rem(32)};
  ${B4RegularStyle};
  color: ${props =>
    props.hasError
      ? props.theme.color.red700
      : props.theme.colorV2.colorSet.grey300};
`;

export const H6 = styled(H6Base)`
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;
