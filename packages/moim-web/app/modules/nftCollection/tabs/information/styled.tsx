import styled from "styled-components";
import { px2rem } from "common/helpers/rem";

export const InformationWrapper = styled.div`
  display: flex;
  gap: 0 ${px2rem(24)};
`;

export const Left = styled.div`
  width: calc(100% - ${px2rem(344)});
  max-width: ${px2rem(823)};
  display: flex;
  flex-direction: column;
  gap: ${px2rem(24)} 0;
`;

export const Right = styled.div`
  width: ${px2rem(320)};
`;
