import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { DefaultDivider } from "common/components/divider";

export const Wrapper = styled.div`
  width: 100%;
  height: fit-content;
  padding-top: ${px2rem(16)};
`;

export const Divider = styled(DefaultDivider)``;
