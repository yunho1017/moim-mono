import { px2rem } from "common/helpers/rem";
import styled from "styled-components";

export const RootWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  flex: 1;
  min-height: 0;

  overflow-y: auto;
  will-change: scroll-position;
`;

export const ContentContainer = styled.div`
  width: 100%;
  max-width: ${px2rem(1200)};
  padding-bottom: ${px2rem(120)};
`;
