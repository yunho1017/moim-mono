import * as React from "react";
import styled, { css } from "styled-components";
import { px2rem } from "common/helpers/rem";
import BlockitRendererComponent from "common/components/blockitEditorBase/components/blockitRenderer";

interface IWrapperProps {
  type: "message" | "comment";
  reverse?: boolean;
}

const Wrapper = styled.div<IWrapperProps>`
  width: 100%;
  ${props => {
    if (props.type === "message") {
      return css`
        width: ${px2rem(400)};

        @media (min-width: 0) and (max-width: 359px) {
          width: 100%;
        }

        @media (min-width: 360px) and (max-width: 600px) {
          width: ${px2rem(280)};
        }
      `;
    }
  }}
`;

const overrideWrapperStyle = css`
  background-color: transparent;
`;

export interface IBlockitRendererProps extends IWrapperProps {
  blocks: Moim.Blockit.Blocks[];
}

export default function BlockitRenderer({
  type,
  reverse,
  ...props
}: React.ComponentProps<typeof BlockitRendererComponent> & IWrapperProps) {
  return (
    <Wrapper type={type} reverse={reverse}>
      <BlockitRendererComponent
        {...props}
        wrapperStyle={overrideWrapperStyle}
      />
    </Wrapper>
  );
}
