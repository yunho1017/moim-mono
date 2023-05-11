import styled, { css } from "styled-components";
import { px2rem } from "common/helpers/rem";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const selectionStyle = css`
  padding: 0 0 ${px2rem(8)} 0;
`;
