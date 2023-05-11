import styled, { FlattenInterpolation } from "styled-components";
import { useSingleLineStyle } from "../designSystem/styles";

export const WebkitShavedText = styled.div<{
  line: number;
  overrideStyle?: FlattenInterpolation<any>;
}>`
  display: -webkit-box;
  -webkit-line-clamp: ${props => props.line};
  -webkit-box-orient: vertical;
  line-clamp: ${props => props.line};
  overflow: hidden;
  ${props => props.overrideStyle};
`;

export const SingleShavedText = styled.div<{
  overrideStyle?: FlattenInterpolation<any>;
}>`
  display: block;
  ${useSingleLineStyle};
  ${props => props.overrideStyle};
`;

export const ShavedTextWrapper = styled.div<{
  overrideStyle?: FlattenInterpolation<any>;
}>`
  ${props => props.overrideStyle};
`;
