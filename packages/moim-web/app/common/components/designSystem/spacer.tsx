import * as React from "react";
import styled, { css } from "styled-components";
import { px2rem } from "common/helpers/rem";

interface IProps {
  value: number;
}

const SpacerBase = styled.div<{
  value: number;
  type: "vertical" | "horizontal";
}>`
  ${props => {
    switch (props.type) {
      case "horizontal":
        return css`
          height: ${px2rem(props.value)};
        `;
      case "vertical":
        return css`
          width: ${px2rem(props.value)};
        `;
    }
  }}
`;

export const Spacer: React.FC<IProps> = props => (
  <SpacerBase {...props} type="horizontal"></SpacerBase>
);

export const SpacerVertical: React.FC<IProps> = props => (
  <SpacerBase {...props} type="vertical"></SpacerBase>
);
