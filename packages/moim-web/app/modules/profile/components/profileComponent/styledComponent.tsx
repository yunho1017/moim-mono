import styled from "styled-components";
import { B2Regular, H10Bold } from "common/components/designSystem/typos";

import { px2rem } from "common/helpers/rem";
import { enWordKeepAllStyle } from "common/components/designSystem/styles";

export const Wrapper = styled.div`
  height: 100%;
`;
export const Body = styled.div`
  height: 100%;
`;

export const UserWalletAddress = styled(H10Bold)`
  padding: ${px2rem(4)} ${px2rem(16)};
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const BioWrapper = styled.div`
  padding: ${px2rem(8)} ${px2rem(16)};
`;

export const UserBio = styled(B2Regular)`
  color: ${props => props.theme.colorV2.colorSet.grey600};
  white-space: pre-line;
  ${enWordKeepAllStyle}
`;

export const Section = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const SectionTitle = styled.div`
  padding: ${px2rem(11)} ${px2rem(16)};
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;
