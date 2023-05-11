import styled, { FlattenInterpolation } from "styled-components";
import { px2rem } from "common/helpers/rem";
import { useScrollStyle } from "common/components/designSystem/styles";
import { marginToPadding } from "../helper/blockitStyleHelpers";

export const Body = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
  min-height: 0;
  display: flex;
  flex-direction: column;

  ${useScrollStyle};
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: ${px2rem(80)};
  padding: ${px2rem(16)};
`;

export const ButtonWrapper = styled.div`
  width: 100%;
  flex: 1;
  > button {
    width: 100%;
  }

  & + & {
    margin-left: ${px2rem(16)};
  }
`;

export const Wrapper = styled.form<{
  overrideStyle?: FlattenInterpolation<any>;
  margin?: Moim.Blockit.IBlockitMargin;
}>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
  ${props => marginToPadding(props.margin)};
  ${props => props.overrideStyle};
`;
