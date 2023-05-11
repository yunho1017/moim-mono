import styled, { css, FlattenInterpolation } from "styled-components";

import {
  GhostButton,
  GhostGeneralButton,
  FlatButton,
  FlatGeneralButton,
  TextButton,
  TextGeneralButton,
} from "common/components/designSystem/buttons";
import { px2rem } from "common/helpers/rem";
import { marginToPadding } from "../helper/blockitStyleHelpers";

interface IProps extends Omit<Moim.Blockit.IButtonBlockElement, "style"> {
  styleType: "primary" | "general" | "custom";
  overrideStyle?: FlattenInterpolation<any>;
  margin?: Moim.Blockit.IBlockitMargin;
}

export const WrapperStyle = css<IProps>`
background-color: ${props => props.theme.colorV2.colorSet.white1000};

  ${GhostButton},
  ${GhostGeneralButton},
  ${FlatButton},
  ${FlatGeneralButton},
  ${TextButton},
  ${TextGeneralButton} {
    width: 100%;
    ${props =>
      props.styleType === "custom"
        ? css`
            color: ${props.theme.getColorByAlias(props.textColor)};
            background-color: ${props.theme.getColorByAlias(
              props.backgroundColor,
            )};
            border-color: ${props.theme.getColorByAlias(props.outlineColor)};
          `
        : undefined};
  }
  ${props => marginToPadding(props.margin)};
  ${props => props.overrideStyle};
`;

export const LargeWrapper = styled.div<IProps>`
  padding: ${px2rem(16)};
  ${WrapperStyle};
`;

export const MediumWrapper = styled.div<IProps>`
  padding: ${px2rem(12)} ${px2rem(16)};
  ${WrapperStyle};
`;

export const SmallWrapper = styled.div<IProps>`
  padding: ${px2rem(8)} ${px2rem(16)};
  ${WrapperStyle};
`;

export {
  GhostButton,
  GhostGeneralButton,
  FlatButton,
  FlatGeneralButton,
  TextButton,
  TextGeneralButton,
};
