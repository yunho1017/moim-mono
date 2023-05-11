import styled, { FlattenInterpolation } from "styled-components";

export const Wrapper = styled.div<{ draggingStyle: FlattenInterpolation<any> }>`
  position: relative;
  background-color: ${props => props.theme.colorV2.colorSet.white1000};

  ${props => props.draggingStyle}
`;
