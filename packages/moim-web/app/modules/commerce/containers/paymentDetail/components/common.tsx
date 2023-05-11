import * as React from "react";
import styled, { css } from "styled-components";

import { px2rem } from "common/helpers/rem";
import {
  B3Regular,
  H8Bold,
  H9BoldStyle,
} from "common/components/designSystem/typos";

export const Wrapper = styled.div`
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
  border-radius: ${px2rem(4)};
  border: solid ${px2rem(1)} ${props => props.theme.colorV2.colorSet.grey50};
  padding: ${px2rem(8)} 0;

  & + & {
    margin-top: ${px2rem(12)};
  }

  &:last-of-type {
    margin-top: ${px2rem(12)};
  }
`;

export const Title = styled(H8Bold)`
  padding: ${px2rem(10)} ${px2rem(16)} ${px2rem(8)};
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

const SectionWrapper = styled.div`
  padding: ${px2rem(6)} ${px2rem(16)};
  display: flex;
  align-items: flex-start;
  gap: ${px2rem(4)};
`;
const SectionTitle = styled(B3Regular)<{ maxWidth?: number }>`
  color: ${props => props.theme.colorV2.colorSet.grey500};
  width: ${props => px2rem(props.maxWidth ?? 85)};
`;

const SectionContents = styled(B3Regular)<{
  textAlign?: "left" | "right";
  isBold?: boolean;
}>`
  color: ${props => props.theme.colorV2.colorSet.grey800};
  flex: 1;
  min-width: 0;
  text-align: ${props => props.textAlign ?? "left"};
  ${props =>
    props.isBold &&
    css`
      color: ${props.theme.colorV2.colorSet.grey800};
      ${H9BoldStyle}
    `}
`;

export function Section({
  title,
  contents,
  titleOption,
  contentsOption,
}: {
  title: React.ReactNode;
  contents?: React.ReactNode;
  titleOption?: {
    maxWidth?: number;
  };
  contentsOption?: {
    textAlign?: "left" | "right";
    isBold?: boolean;
  };
}) {
  return (
    <SectionWrapper>
      <SectionTitle maxWidth={titleOption?.maxWidth}>{title}</SectionTitle>
      <SectionContents
        textAlign={contentsOption?.textAlign}
        isBold={contentsOption?.isBold}
      >
        {contents}
      </SectionContents>
    </SectionWrapper>
  );
}
