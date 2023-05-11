import { px2rem } from "common/helpers/rem";
import styled, { css } from "styled-components";
import { useSingleLineStyle } from "../designSystem/styles";

export const blockWrapStyle = css`
  padding: 0 ${px2rem(16)};
`;

export const contactBlockWrapStyle = css`
  min-width: 0;
  flex: 1;
  ${useSingleLineStyle}
`;

export const Wrapper = styled.div`
  width: 100%;
  height: ${px2rem(36)};
  display: flex;
  align-items: center;
  white-space: pre-line;

  background-color: ${props => props.theme.colorV2.colorSet.grey10};
`;

export const ContactElementWrapper = styled.div`
  min-width: 0;
  flex: 1;
  display: flex;
  align-items: center;
`;

export const CopyrightElementWrapper = styled.div`
  display: flex;
  align-items: center;
`;
