import styled, { FlattenInterpolation } from "styled-components";
import { rgba } from "polished";
// helpers
import { noScrollBarStyle } from "common/components/designSystem/styles";

export const FixedContainer = styled.div<{
  overrideStyle?: FlattenInterpolation<any>;
}>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
  align-content: center;
  justify-content: center;

  background-color: ${props => rgba(props.theme.colorV2.colorSet.grey800, 0.8)};
  z-index: ${props => props.theme.zIndexes.fullscreen + 1};

  ${props => props.overrideStyle};
`;

export const Content = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  margin: auto;
  box-shadow: ${props => props.theme.shadow.whiteElevated};
  background-color: ${props => props.theme.colorV2.colorSet.white1000};

  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  ${noScrollBarStyle}
`;

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;
