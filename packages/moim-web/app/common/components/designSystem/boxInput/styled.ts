import styled, { css, FlattenInterpolation } from "styled-components";
import PlusIconBase from "@icon/18-add-g.svg";
import MinusIconBase from "@icon/18-minus-g.svg";
import { px2rem } from "common/helpers/rem";
import { B1RegularStyle, B3RegularStyle, B4Regular } from "../typos";
import { useSingleLineStyle } from "../styles";

import { InputStatusType, BoxInputSizeType, BoxInputType } from "./type";

export const textareaStyle = css`
  border: none;
  resize: none;
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const TextInput = styled.input`
  flex: 1;
  min-width: 0;
  height: 100%;
  border: none;
  color: ${props => props.theme.colorV2.colorSet.grey800};

  &::placeholder {
    color: ${props => props.theme.colorV2.colorSet.grey300};
  }

  -moz-appearance: textfield;
  ::-webkit-inner-spin-button {
    display: none;
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const NumberInput = styled.input`
  flex: 1;
  min-width: 0;
  height: 100%;
  border: none;
  color: ${props => props.theme.colorV2.colorSet.grey800};
  text-align: center;
  -moz-appearance: textfield;
  ::-webkit-inner-spin-button {
    display: none;
    -webkit-appearance: none;
    margin: 0;
  }

  &::placeholder {
    color: ${props => props.theme.colorV2.colorSet.grey300};
  }
`;

export const BoxInputWrapper = styled.div<{
  size: BoxInputSizeType;
  type: BoxInputType;
  disabled: boolean;
  overrideStyle?: FlattenInterpolation<any>;
}>`
  display: flex;
  align-items: center;
  margin: ${px2rem(4)} 0;
  padding: 0 ${px2rem(16)};
  border-radius: ${px2rem(4)};
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
  border: ${px2rem(1)} solid ${props => props.theme.colorV2.colorSet.grey200};



  ${props => {
    if (props.type === "MultiLine") {
      return css`
        flex-direction: column;
        align-items: initial;
        min-height: ${px2rem(88)};
        max-height: ${px2rem(148)};
        padding: ${px2rem(10)} ${px2rem(16)};
        ${B1RegularStyle}
      `;
    }
    switch (props.size) {
      case "Large":
        return css`
          height: ${px2rem(42)};
          ${B1RegularStyle}
        `;

      case "Small":
        return css`
          height: ${px2rem(32)};
          ${B3RegularStyle}
        `;
    }
  }}

  ${props =>
    props.disabled &&
    css`
      background-color: ${props.theme.colorV2.colorSet.grey10};
      border: none;

      textarea {
        background-color: transparent;
        color: ${props.theme.colorV2.colorSet.grey300};
      }

      ${TextInput} {
        background-color: transparent;
        color: ${props.theme.colorV2.colorSet.grey300};
      }
    `}

    ${props => props.overrideStyle};
`;

export const BoxNumberInputWrapper = styled.div<{
  size: BoxInputSizeType;
  disabled: boolean;
  overrideStyle?: FlattenInterpolation<any>;
}>`
  display: flex;
  align-items: center;
  margin: ${px2rem(4)} 0;
  padding: 0 ${px2rem(2)};
  border-radius: ${px2rem(4)};
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
  border: ${px2rem(1)} solid ${props => props.theme.colorV2.colorSet.grey200};


  ${props => {
    switch (props.size) {
      case "Large":
        return css`
          height: ${px2rem(42)};
          ${B1RegularStyle}
        `;

      case "Small":
        return css`
          height: ${px2rem(32)};
          ${B3RegularStyle}
        `;
    }
  }}

  ${props =>
    props.disabled &&
    css`
      ${NumberInput} {
        background-color: transparent;
        color: ${props.theme.colorV2.colorSet.grey300};
      }
    `}

  ${props => props.overrideStyle};
`;

export const PlusIcon = styled(PlusIconBase).attrs(props => ({
  size: "xs",
  touch: 30,
  iconColor: props.disabled
    ? props.theme.colorV2.colorSet.grey300
    : props.theme.colorV2.colorSet.grey800,
}))<{ disabled?: boolean }>``;
export const MinusIcon = styled(MinusIconBase).attrs(props => ({
  size: "xs",
  touch: 30,
  iconColor: props.disabled
    ? props.theme.colorV2.colorSet.grey300
    : props.theme.colorV2.colorSet.grey800,
}))<{ disabled?: boolean }>``;

export const BoxInputNumberSideButton = styled.button`
  width: ${px2rem(30)};
  height: ${px2rem(30)};
  display: flex;
  align-items: center;
  justify-content: center;

  :disabled {
    opacity: 0.4;
    pointer-events: none;
    cursor: not-allowed;
  }
`;

export const BoxInputRight = styled.div`
  color: ${props => props.theme.colorV2.colorSet.grey600};
  max-width: ${px2rem(60)};
  ${useSingleLineStyle}
`;

export const HelperText = styled(B4Regular)`
  padding-left: ${px2rem(16)};
  color: ${props => props.theme.colorV2.colorSet.grey300};
`;

export const Wrapper = styled.div<{ status: InputStatusType }>`
  ${props => {
    switch (props.status) {
      case "Inactive":
        return css`
          ${BoxInputWrapper},
          ${BoxNumberInputWrapper} {
            border-color: ${props.theme.colorV2.colorSet.grey200};
          }
        `;
      case "Focused":
        return css`
          ${BoxInputWrapper},
          ${BoxNumberInputWrapper} {
            border-color: ${props.theme.colorV2.colorSet.grey600};
          }
        `;
      case "Error":
        return css`
          ${BoxInputWrapper},
          ${BoxNumberInputWrapper} {
            border-color: ${props.theme.color.red700};
          }

          ${HelperText} {
            color: ${props.theme.color.red700};
          }
          ${BoxInputRight} {
            color: ${props.theme.color.red700};
          }
        `;
    }
  }}
`;
