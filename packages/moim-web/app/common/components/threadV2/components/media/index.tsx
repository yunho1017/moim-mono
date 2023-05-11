import * as React from "react";
import styled, { css } from "styled-components";
import { MediaPreview } from "common/components/designSystem/media/";
import { px2rem } from "common/helpers/rem";

interface IWrapperProps {
  type: "message" | "comment";
  reverse?: boolean;
}

const getReverseStyle = (reverse?: boolean) =>
  css`
    justify-content: ${reverse ? "flex-end" : "flex-start"};
  `;

const Wrapper = styled.div<IWrapperProps>`
  display: flex;
  justify-content: ${props => getReverseStyle(props.reverse)};

  padding: ${px2rem(4)} ${px2rem(16)} ${px2rem(3)} 0;
  ${props => {
    if (props.type === "message") {
      return css`
        max-width: ${px2rem(320)};
      `;
    }
  }}
`;

export default function Media({
  type,
  reverse,
  ...props
}: React.ComponentProps<typeof MediaPreview> & IWrapperProps) {
  return (
    <Wrapper type={type} reverse={reverse}>
      <MediaPreview {...props} previewWrapperStyle={getReverseStyle(reverse)} />
    </Wrapper>
  );
}
